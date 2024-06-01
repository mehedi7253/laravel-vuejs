<template>
    <h3>Login Page</h3>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/profile">Profile</router-link> |


    <br/>
    <div class="container">
        <div class="row">
            <form @submit.prevent="login" method="post">
                <label>Email:</label>
                <input type="email" v-model="email"><br/>
                <label>Password:</label>
                <input type="password" v-model="password"><br/>
                <button type="submit" name="submit" value="submit">Login</button>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

    export default{
        data(){
            return{
                email:'',
                password:'',
                error: {},
            }
        },

        methods:{
            ...mapActions(['login']),
            async login(){
                await this.login({ email: this.email, password: this.password});
                this.$router.push('/profile');
            }
        }
    }
</script>
