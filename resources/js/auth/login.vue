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
            <form action="javascript:void(0)" class="row" method="post">
                <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group col-12">
                    <label for="email" class="font-weight-bold">Email</label>
                    <input type="text" v-model="auth.email" name="email" id="email" class="form-control">
                </div>
                <div class="form-group col-12 my-2">
                    <label for="password" class="font-weight-bold">Password</label>
                    <input type="password" v-model="auth.password" name="password" id="password" class="form-control">
                </div>
                <div class="col-12 mb-2">
                    <button type="submit" :disabled="processing" @click="login" class="btn btn-primary btn-block">
                        {{ processing ? "Please wait" : "Login" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

    export default{
        name: "login",
        data(){
            return{
                auth:{
                    email:"",
                    password:""
                },
                validationErrors:{},
                processing:false
            }
        },

        methods:{
            ...mapActions({
                signIn: 'auth/login',
            }),
            async login(){
                this.processing = true;
                await axios.get('/sanctum/csrf-cookie')
                await axios.post('/api/login',this.auth).then(({data})=>{
                    this.signIn()
                }).catch(({response})=>{
                    if(response.status===422){
                        this.validationErrors = response.data.errors
                    }else{
                        this.validationErrors = {}
                        alert(response.data.message)
                    }
                }).finally(()=>{
                    this.processing = false
                })
            }
        }
    }
</script>
