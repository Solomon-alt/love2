import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from 'dayjs'

export default {
    namespaced: true,
    state: {
        getGoods: [],
        commodity: [],
    },
    mutations: {
        setGoods(state, data) {
            state.getGoods = data
        },
        setCommodity(state, data) {
            state.commodity = data
        }
    },
    actions: {
        //商品分类数据列表----------------------------------------------------------------
        async goodsList({ commit }, params) {
            let res = await api.goodsList(params)
            console.log(res.data);
            if (res.meta.status === 200) {
                commit('setGoods', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //商品列表数据----------------------------------------------------------------
        async getGoodsList({ commit }, params) {
            let res = await api.getGoodsList(params)
            console.log(res.data.goods);
            if (res.meta.status === 200) {
                res.data.goods.map(item => {
                    item.goods_time = dayjs(item.create_time).format("YYYY-MM-DD  hh:mm:ss")
                })
                commit('setCommodity', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //通过id查询数据----------------------------------------------------------------
        async queryGoods(_, params) {
            let res = await api.queryGoods(params)
            console.log(res.data);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除商品----------------------------------------------------------------------------
        async delGoods({ dispatch }, params) {
            let res = await api.delGoods(params)
            console.log(res);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                    // this.getGoodsList()
                dispatch('getGoodsList', params)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //删除商品分类----------------------------------------------------------------------------
        async deleGdoods({ dispatch }, params) {
            let res = await api.deleGdoods(params)
            if (res.meta.status === 200) {
                dispatch('goodsList', params)
                Message.success(res.meta.msg)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //--------------------------------------------------------------------------------------------------
        //编辑提交分类
        async editCommit({ dispatch }, params) {
            let res = await api.editCommit(params)
            if (res.meta.status === 200) {
                Message.success(res.meta.msg)
                dispatch('goodsList', params)
            } else {
                Message.error(res.meta.msg)
            }
        }
    },
}