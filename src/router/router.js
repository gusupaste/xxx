import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/homepage/home'
import login from '@/components/login/login'

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
      path: '/home',
      name: 'home',
      component: Home,
      meta: { auth: false, keepAlive: false },
      children:[
        
      ]
    },  
  ]
})
