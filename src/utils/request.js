/**
 * @description:axios的配置
 * @param {axios} 
 * @return: 
 */
// 导入axios
import Vue from 'vue'
import axios from 'axios'

// 设置基地址
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
// 允许axios请求携带cookies,看后台需求
axios.defaults.withCredentials = true

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response.data);
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


// 在Vue原型中,添加axios
Vue.prototype.$axios = axios