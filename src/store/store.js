import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
    // 设置属性
    state: {
        isLogin: false,
    },

    // 获取属性的状态
    getters: {
        //获取登录状态
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    },

    // 设置属性状态
    mutations: {
        //保存登录状态
        userStatus(state, flag) {
            state.isLogin = flag
        },
        auth_request(state) {
            state.status = 'loading';
        },
        auth_success(state, token, user) {
            state.status = 'success';
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.token = '';
        },
    },

    // 应用mutations
    actions: {
        //获取登录状态
        Login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                const token = 'token1234'
                const user = 'useeeee'
                localStorage.setItem('token', token)
                // 每次请求接口时，需要在headers添加对应的Token验证
                // axios.defaults.headers.common['Authorization'] = token
                // 更新token
                commit('auth_success', token, user)
                this.$router.push({ path: '/test' })
                // resolve(resp)
                // 向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
                // axios.post('login', user)
                //     .then(resp => {
                //         const token = resp.data.token
                //         const user = resp.data.user
                //         localStorage.setItem('token', token)
                //         // 每次请求接口时，需要在headers添加对应的Token验证
                //         axios.defaults.headers.common['Authorization'] = token
                //         // 更新token
                //         commit('auth_success', token, user)
                //         resolve(resp)
                //     })
                //     .catch(err => {
                //         commit('auth_error')
                //         localStorage.removeItem('token')
                //         reject(err)
                //     })
            })
        },
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                axios.get('Logout')
                    .then(response => {
                        removeIsLogin()
                        localStorage.removeItem('loginUsername');
                        // 移除之前在
                        axios
                        头部设置的token, 现在将无法执行需要token的事务
                        delete axios.defaults.headers.common['Authorization'];
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})
export default store