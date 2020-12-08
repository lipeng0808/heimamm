import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义的是仓库中要操作的数据
    state: {
        count: 100,
        userInfo: {}
    },
    // 通过commit 触发同步的mutations方法
    // 同步操作: this.$store.commit('方法名',payload)
    mutations: {
        add(state, num) {
            state.count += num
        },
        sum(state, num) {
            state.count -= num
        },

        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    // getters: 方法
    getters: {
        getData: state => {
            return state.count
        },
        getUserInfo: state => {
            return state.userInfo
        }
    },

    // 通过dispatch 触发异步的actions方法
    // actions 不能直接操作state数据,
    // 异步操作: this.$store.dispatch('方法名',payload)
    actions: {
        minus(context, payload) {
            setTimeout(() => {
                context.commit('sum', payload)
            }, 1000)
        }
    }
})

export default store

//         : 状态===数据
//  payload: 载荷===参数