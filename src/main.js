// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
// 导入vue-echarts插件
import ECharts from 'vue-echarts/components/ECharts'
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-event-calendar/dist/style.css' ;
import vueEventCalendar from 'vue-event-calendar';
import App from './App';
import router from './router/router';
import store from './store/store';
import axios from 'axios';
import './assets/css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import * as custom from './assets/js/filter';
import VueCookies from 'vue-cookies'
import 'echarts/lib/chart/pie'
Vue.component('chart', ECharts)
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.use(ElementUI);
Vue.use(vueEventCalendar, {locale: 'en',color: '#4fc08d'});
Vue.use(VueCookies)
Vue.prototype.$axios = axios;
/**请求拦截器 */
Vue.config.productionTip = false
axios.interceptors.request.use(
  config => {
    config.baseURL = 'http://192.168.1.197:8000';
    config.headers.post['Content-Type'] = 'application/json;utf-8';
    config.headers.common['Authorization'] = "jwt "+VueCookies.get('token') || '';
    // config.headers.common["If-Modified-Since"] = 0;
    return config;
  },
  error => {
    return Promise.reject(error);
  });
/**返回拦截器 */
axios.interceptors.response.use(function (response) {

  return response
}, function (error) {
  if (error.response.status == 401){
    Vue.prototype.$message({
      type: 'error',
      message: '登陆超时，请重新登陆'
    });
    router.replace({
      name: 'login'
    });
  }
  return Promise.reject(error)
})

/**登录检测 */
router.beforeEach((to, from, next) => {
  // 检测路由配置中是否有requiresAuth这个meta属性
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断是否已登录
    if (VueCookies.get('token') !== null) {
      next();
      return;
    } else {
      // 未登录则跳转到登录界面
      next('/login');
    }

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
