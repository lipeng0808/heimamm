// 导入axios
import Vue from 'vue'
import axios from 'axios'
// import router from '@/router'
import {
    getToken,
    // removeToken
} from './token'


// 设置基地址
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 允许axios请求携带cookies,看后台需求
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 获取token
    const token = getToken()
    // 判断
    if (token) {
        config.headers.token = token
    }
    return config;
}, function (error) {

    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {

    // 对响应数据做点什么   
    return response.data;

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 在Vue原型中,添加axios
Vue.prototype.$axios = axios