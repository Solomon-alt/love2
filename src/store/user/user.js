import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
    // 开启命名空间 
    namespaced: true,
    state: {
        users: [],
        lists: [],
        addUsers: [],
    },
    mutations: {
        setUsers(state, data) {
            state.users = data
        },
        setLists(state, data) {
            state.lists = data
        },
        addUsers(state, data) {
            state.addUsers = data
        },
    },
    actions: {
        // 发请求
        // 登录 每一个action的方法都有两个参数 第一个是store 第二个是请求的参数
        // store可以解构为commit dispatch
        async login(_, params) {
            let res = await api.login(params)
            if (res.meta.status === 200) {
                // 请求成功 存用户 跳转路由 提示用户
                localStorage.setItem('user', JSON.stringify(res.data))
                localStorage.setItem('token', res.data.token)
                Message.success('登录成功')
                router.push('/')
            } else {
                Message.error(res.meta.msg)
            }
        },
        async getUsers({ commit }, params) {
            let res = await api.getUsers(params)
            console.log(res.data);
            if (res.meta.status === 200) {
                commit('setUsers', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        async getLeftTab({ commit }, params) {
            let res = await api.getLeftTab(params)
            if (res.meta.status === 200) {
                commit('setLists', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        async addUsers({ commit }, params) {
            let res = await api.addUsers(params)
            console.log(res.data);
            if (res.meta.status === 201) {
                commit('addUsers', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //修改用户状态
        async modifyUsers(_, parms) {
            let res = await api.modifyUsers(parms)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //编辑用户提交
        async edit(_, parms) {
            let res = await api.edit(parms)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除用户
        async del(_, parms) {
            let res = await api.del(parms)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //分配用户角色-----------------------------------------------------------
        async putUserRoles(_, params) {
            let res = await api.putUserRoles(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        }
        //----------------------------------------------------------------------
    },
}