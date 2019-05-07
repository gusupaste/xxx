import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
    // 设置属性
    state: {
        user_Info: {},
        user_Token:"",
        intercitylist:[],
        areaList:[],
    },

    // 获取属性的状态
    getters: {
        intercitylist: state => state.intercitylist,
        areaList: state => state.areaList,
    },

    // 设置属性状态
    mutations: {
        getArea(state) {
            var _this = this;
            _this.$axios.get('/api/common/select/area_list/', )
                .then(res => {
                    // _this.intercitylist = res.data.results;
                    state.areaList = res.data
                }).catch(err => {
                    console.log(err)
                })
        },
        getIntercity() {
            var _this = this;
            this.$axios.get('/api/common/intercity/', ).then(res => {
                state.intercitylist = res.data
            }).catch(err => {
                console.log(err)
            })
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