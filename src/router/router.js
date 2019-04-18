import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/homeView'
import login from '@/components/login/login'
import Brandmanagement from '@/components/systemmanagement/brandmanagement/list'
import School from '@/components/school/index'
import Schoollist from '@/components/school/schoollist/list'
import Schooldetail from '@/components/school/schoollist/detail'
import Schooladd from '@/components/school/schoollist/add'
import Schooledit from '@/components/school/schoollist/edit'
import Intercitylist from '@/components/school/intercitylist/list'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
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
          path: '/school/intercity-list',
          name: 'intercity-list',
          component: Intercitylist
        },
        {
          path: '/school/school-list',
          name: 'school-list',
          component: Schoollist,
        },
        {
          path: '/school/school-detail',
          name: 'school-detail',
          component: Schooldetail
        },
        {
          path: '/school/school-add',
          name: 'school-add',
          component: Schooladd
        },
        {
          path: '/school/school-edit',
          name: 'school-edit',
          component: Schooledit
        }
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
