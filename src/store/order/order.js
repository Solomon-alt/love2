import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from 'dayjs'


export default {
    //开启命名空间
    namespaced: true,
    state: {
        getData: []
    },
    mutations: {
        setData(state, data) {
            state.getData = data
        }
    },
    actions: {
        //订单数据列表-----------------------------------------------------
        async getOrder({ commit }, params) {
            let res = await api.getOrder(params)
            console.log(res.data.goods);
            if (res.meta.status === 200) {
                res.data.goods.map(item=>{
                    item.goods_time = dayjs.unix(item.create_time).format("YYYY-MM-DD  hh:mm:ss")
                })
                commit('setData', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        },
        //查看物流信息------------------------------------------------------
    },
}