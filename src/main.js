import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins/element.js'

// 导入axios
import '@/utils/request'

// 引入全局样式
import '@/assets/styles/base.less'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')