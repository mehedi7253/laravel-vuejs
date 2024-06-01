import { createStore } from "vuex"

export default createStore({
    state: {
        token: localStorage.getItem('token') || '',
        user:{},
    },

    mutations:{
        SET_TOKEN(state, token){
            state.token = token;
            localStorage.setItem('token', token);
        },
        SET_USER(state, user){
            state.user = user;
        },
        RemoveToken(state, token){
            state.token = '';
            localStorage.removeItem('token');
        }
    },

    actions:{
        async login({commit}, credentials)
        {
            try{
                const response = await axios.post('/api/login', credentials);
                commit('SET_TOKEN', response.data.access_token);
                commit('SET_USER', response.data.user);
            } catch(error){
                console.log(error);
            }
        },
        logout({commit}){
            commit('RemoveToken');
            commit('SET_USER', {});
        }
    },
    getters:{
        isAuthenticated(state){
            return!!state.token;
        },
        user(state){
            return state.user;
        }
    }
})
