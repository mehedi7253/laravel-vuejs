import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'

import Home from './Home.vue'
import About from './About.vue'
import Register from "./auth/register.vue"
import Login from "./auth/login.vue"
import Profile from "./auth/profile.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    component: Profile,
        meta: {
            middleware: "auth"
        }
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.middleware == "guest") {
        if (store.state.auth.authenticated) {
            next({ name: "dashboard" })
        }
        next()
    } else {
        if (store.state.auth.authenticated) {
            next()
        } else {
            next({ name: "login" })
        }
    }
});

export default router;

