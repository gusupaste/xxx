import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/homeView'
import login from '@/components/login/login'
import Systemmanagement from '@/components/systemmanagement/index'
import Brandmanagement from '@/components/systemmanagement/brandmanagement/list'
import Academicyear from '@/components/systemmanagement/academicyear/list'
import School from '@/components/school/index'
import Intercitylist from '@/components/school/intercitylist/list'
import Schoollist from '@/components/school/schoollist/list'
import SchoolViewClendar from '@/components/school/schoollist/viewClendar'
import Schooldetail from '@/components/school/schoollist/detail'
import Schooladd from '@/components/school/schoollist/add'
import Schooledit from '@/components/school/schoollist/edit'
import SchoolCalendarList from '@/components/systemmanagement/SchoolCalendar/list'
import addNewTemplate from '@/components/systemmanagement/SchoolCalendar/addNewTemplate'
import editTemplate from '@/components/systemmanagement/SchoolCalendar/editTemplate'
import Settlementarea from '@/components/systemmanagement/settlementarea/list'
import EditSettlementarea from '@/components/systemmanagement/settlementarea/edit'
import Addsettlementarea from '@/components/systemmanagement/settlementarea/add'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {requiresAuth: true, keepAlive: false},
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/systemmanagement',/*系统管理*/
      name: 'systemmanagement',
      component: Systemmanagement,
      children: [
        {
          path: '/systemmanagement/brand-management',
          name: 'brand-management',
          component: Brandmanagement
        },
        {
          path: '/systemmanagement/academic-year',
          name: 'academic-year',
          component: Academicyear
        },
        {
          path: '/systemmanagement/settlement-area',
          name: 'settlement-area',
          component: Settlementarea
        },
        {
          path: '/systemmanagement/edit-settlement-area/:id',
          name: 'edit-settlement-area',
          component: EditSettlementarea
        },
        {
          path: '/systemmanagement/addsettlementarea',
          name: 'Addsettlementarea',
          component: Addsettlementarea
        },
      ]
    },
    {
      path: '/school',/*校园*/
      name: 'school',
      component: School,
      children: [
        {
          path: '/school/intercity-list',
          name: 'intercity-list',
          component: Intercitylist
        },
        {
          path: '/school/school-list',
          name: 'school-list',
          component: Schoollist
        },
        {
          path: '/school/school-detail/:id',
          name: 'school-detail',
          component: Schooldetail
        },
        {
          path: '/school/school-add',
          name: 'school-add',
          component: Schooladd
        },
        {
          path: '/school/school-edit/:id',
          name: 'school-edit',
          component: Schooledit
        },
        {
          path: '/school/SchoolViewClendar/:id',
          name: 'SchoolViewClendar',
          component: SchoolViewClendar
        }
      ]
    },
    {
      path: '/schoolCalendarList',
      name: 'schoolCalendarList',
      component: SchoolCalendarList,
      meta: { requiresAuth: true, keepAlive: false },

    },
    {
      path: '/schoolCalendarList/addNewTemplate',
      name: 'addNewTemplate',
      component: addNewTemplate,
      meta: { requiresAuth: true, keepAlive: false },
    },
    {
      path: '/schoolCalendarList/editTemplate/:id',
      name: 'editTemplate',
      component: editTemplate,
      meta: { requiresAuth: true, keepAlive: false },
    }
  ]
})
