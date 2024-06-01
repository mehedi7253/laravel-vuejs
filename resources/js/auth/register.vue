<template>
    <h3>Registration Page</h3>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/profile">Profile</router-link> |


    <br/>
    <div class="container">
        <div class="row">
            <form @submit.prevent="userRegister" method="post">
                <label>Name:</label>
                <input type="text" v-model="user.name">
                <br/>
                <label>Email:</label>
                <input type="email" v-model="user.email"><br/>
                <label>Password:</label>
                <input type="password" v-model="user.password"><br/>
                <label>Confirm Password:</label>
                <input type="password" v-model="user.password_confirmation"><br/>
                <button type="submit" name="submit" value="submit">submit</button>
            </form>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                user:{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
                },
                error: {},
            }
        },

        methods:{
            userRegister(){
                axios.post('api/register',this.user)
                   .then(response=>{
                        console.log(response);
                    })
                   .catch(error=>{
                        console.log(error);
                    })
            }
        }
    }
</script>
