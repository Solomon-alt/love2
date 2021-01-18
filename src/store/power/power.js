import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    namespaced: true,
    state: {
        roles: [],
        right: [],
    },
    mutations: {
        setRolesList(state, data) {
            state.roles = data
        },
        setRight(state, data) {
            state.right = data
        }
    },
    actions: {
        //获取角色列表
        async roleList({ commit }, params) {
            let res = await api.roleList(params)
            console.log(res.data);
            if (res.meta.status === 200) {
                commit('setRolesList', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //增加角色
        async addRoles(_, params) {
            let res = await api.addRoles(params)
            console.log(res);
            if (res.meta.status === 201) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除角色
        async delRoles(_, params) {
            let res = await api.delRoles(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //编辑提交角色
        async editRoles(_, params) {
            let res = await api.editRoles(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //权限列表
        async rightList({ commit }, params) {
            let res = await api.rightList(params)
            console.log(res.data);
            if (res.meta.status === 200) {
                commit('setRight', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //角色授權---------------------------------------------------------------------
        async rolePower({ dispatch }, params) {
            let res = await api.rolePower(params)
            if (res.meta.status === 200) {
                dispatch('roleList', params)
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //------------------------------------------------------------------------------------------------------
        //删除角色指定权限
        async deleteRight({ dispatch }, params) {
            let res = await api.deleteRight(params)
            if (res.meta.status === 200) {
                dispatch('roleList')
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        }
    },
}