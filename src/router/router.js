import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/home'
import login from '@/components/login/login'
import Brandmanagement from '@/components/systemmanagement/brandmanagement/list'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/systemmanagement/brand-management',/*品牌管理*/
      name: 'brand-management',
      component: Brandmanagement,
      meta: { auth: false, keepAlive: false },
      children:[

      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { auth: false, keepAlive: false },
      children:[

      ]
    },
  ]
})
