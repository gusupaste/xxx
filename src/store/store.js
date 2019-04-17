import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
    // 设置属性
    state: {
        user_Info: {

        },
        user_Token:"",
    },

    // 获取属性的状态
    getters: {
        
    },

    // 设置属性状态
    mutations: {
        //保存登录状态

    },

    // 应用mutations
    actions: {
        //获取登录状态
        
    }
})
export default store