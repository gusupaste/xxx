// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-event-calendar/dist/style.css' ;
import vueEventCalendar from 'vue-event-calendar';
import App from './App';
import router from './router/router';
import store from './store/store';
import axios from 'axios';
import '../static/css/main.css'


Vue.use(ElementUI);
Vue.use(vueEventCalendar, {locale: 'en',color: '#4fc08d'});
Vue.prototype.$axios = axios;

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  // 检测路由配置中是否有requiresAuth这个meta属性
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断是否已登录
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    // 未登录则跳转到登录界面
    next('/login');
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
