/**
 * @description:axios的配置
 * @param {axios} 
 * @return: 
 */
// 导入axios
import Vue from 'vue'
import axios from 'axios'


// 设置基地址
axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'
// 允许axios请求携带cookies,看后台需求
axios.defaults.withCredentials = true
// 在Vue原型中,添加axios
Vue.prototype.$axios = axios