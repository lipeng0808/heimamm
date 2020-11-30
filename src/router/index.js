import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import {
  getToken
} from '@/utils/token'

// 导入页面
import Login from '@/views/login/Login.vue'
import Layout from '@/views/layout/Index.vue'
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

// 权限控制,判断是否为登录状态
/**
 * @description:beforeEach()方法
 * @param {to,from,next} 
 *  to: 去到哪个页面路由
 *  from: 从哪个路由页面过来
 *  next: 是否通过
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = getToken()
    if (token) {
      next()
    } else {
      router.path('/login')
    }
  }
})



export default router