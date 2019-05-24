import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
    // 设置属性
    state: {
        user_Info: {},
        user_Token:"",
        intercitylist:[],
        areaList:{},
    },

    // 获取属性的状态
    getters: {
        intercitylist: state => state.intercitylist,
        areaList: state => state.areaList,
    },

    // 设置属性状态
    mutations: {
        getArea(state) {

        },
        getIntercity(state) {

        },
    },

    // 应用mutations
    actions: {
        getArea({commit}) {
            commit('getArea')
        },
        getIntercity({ commit }) {
             commit('getIntercity')
        },
    }
})
export default store