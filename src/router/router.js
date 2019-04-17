import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/home'
import login from '@/components/login/login'
import Brandmanagement from '@/components/systemmanagement/brandmanagement/list'
import School from '@/components/school/index'
import Schoollist from '@/components/school/schoollist/list'
import Intercitylist from '@/components/school/intercitylist/list'

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
      path: '/school',/*校园*/
      name: 'school',
      component: School,
      children:[
        {
          path: '/intercity-list',
          name: 'intercity-list',
          component: Intercitylist
        },
        {
          path: '/school-list',
          name: 'school-list',
          component: Schoollist
        }
      ]
    },
    {
      path: '/school/school-list',
      name: 'school-list',
      component: Schoollist,
      meta: { auth: false, keepAlive: false },
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
