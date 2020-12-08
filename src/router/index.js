import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import {
  getToken
} from '@/utils/token'

// 导入页面
// import Login from '@/views/login/Login.vue'
// import Layout from '@/views/layout/Index.vue'
// import Chart from '@/views/layout/chart/Index.vue'
// import User from '@/views/layout/user/Index.vue'
// import Question from '@/views/layout/question/Index.vue'
// import EnterPrice from '@/views/layout/enterPrise/Index.vue'
// import Subject from '@/views/layout/subject/Index.vue'
// import NotFound from '@/views/404/NotFound.vue'
// import Welcome from '@/views/layout/welcome/Index.vue'

// 设置路由懒加载
const Login = () => import('@/views/login/Login.vue')
const Layout = () => import('@/views/layout/Index.vue')
const Chart = () => import('@/views/layout/chart/Index.vue')
const User = () => import('@/views/layout/user/Index.vue')
const Question = () => import('@/views/layout/question/Index.vue')
const EnterPrice = () => import('@/views/layout/enterPrise/Index.vue')
const Subject = () => import('@/views/layout/subject/Index.vue')
const NotFound = () => import('@/views/404/NotFound.vue')
const Welcome = () => import('@/views/layout/welcome/Index.vue')


const routes = [{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
    }
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/welcome',
    meta: {
      roles: ['超级管理员', '管理员', '老师', '学生']
    },
    children: [{
        path: 'welcome',
        component: Welcome,
        meta: {
          title: '首页',
          fullPath: "/layout/welcome",
          icon: 'el-icon-s-promotion',
          roles: ['超级管理员', '管理员', '老师', '学生']
        }
      },
      {
        path: 'chart',
        component: Chart,
        meta: {
          title: '数据预览',
          fullPath: "/layout/chart",
          icon: 'el-icon-pie-chart',
          roles: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'user',
        component: User,
        meta: {
          title: '用户列表',
          fullPath: "/layout/user",
          icon: 'el-icon-user',
          roles: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'enterPrice',
        component: EnterPrice,
        meta: {
          title: '企业列表',
          fullPath: "/layout/enterPrice",
          icon: 'el-icon-office-building',
          roles: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'question',
        component: Question,
        meta: {
          title: '题库列表',
          fullPath: "/layout/question",
          icon: 'el-icon-edit-outline',
          roles: ['超级管理员', '管理员', '老师', '学生']
        }
      },

      {
        path: 'subject',
        component: Subject,
        meta: {
          title: '学科列表',
          fullPath: "/layout/subject",
          icon: 'el-icon-notebook-2',
          roles: ['超级管理员', '管理员', '老师']
        }
      }
    ]
  },
  {
    path: '/',
    redirect: 'Login'
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: '404页'
    }
  }
]

const router = new VueRouter({
  routes
})

// 权限控制,判断是否为登录状态
// 导航前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 登录页面直接放行
    next()
  } else {
    const token = getToken()
    if (token) {
      // 登录了
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  }
})

// 后置守卫
router.afterEach(to => {

  document.title = to.meta.title || '黑马面面'
})

export default router