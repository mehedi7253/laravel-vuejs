import 'bootstrap';

import axios from 'axios';
window.axios = axios;
import auth from './store/auth';


// axios.defaults.baseURL = process.env.VUE_APP_API_URL;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(config => {
    const token = store.getters.getToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

