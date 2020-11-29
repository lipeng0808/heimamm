import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入页面
import Login from '@/views/login/Login.vue'
import Layout from '@/views/layout/Index.vue'
import Welcome from '@/views/layout/welcome/Index.vue'
import Chart from '@/views/layout/chart/Index.vue'
import User from '@/views/layout/user/Index.vue'
import Question from '@/views/layout/question/Index.vue'
import EnterPrice from '@/views/layout/enterPrise/Index.vue'
import Subject from '@/views/layout/subject/Index.vue'
import NotFound from '@/views/404/NotFound.vue'


const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: 'Login'
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/chart',
    children: [{
        path: 'chart',
        component: Chart
      },
      {
        path: 'user',
        component: User
      },
      {
        path: 'question',
        component: Question
      },
      {
        path: 'enterPrice',
        component: EnterPrice
      },
      {
        path: 'subject',
        component: Subject
      },
      {
        path: '*',
        component: NotFound
      },
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router