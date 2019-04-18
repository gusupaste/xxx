import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
    // 设置属性
    state: {
        user_Info: {

        },
        user_Token:"",
        area:{
            
        }
    },

    // 获取属性的状态
    getters: {
        isLoggedIn(){
            return true
        },
        getArea(){
            return state.area
        }
    },

    // 设置属性状态
    mutations: {
        newArea(state){
            state.area = {x:1,b:2}
        }
    },

    // 应用mutations
    actions: {
        //获取登录状态
        getArea(context) {
            context.commit('newArea')
        }
    }
})
export default store