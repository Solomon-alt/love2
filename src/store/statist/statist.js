import api from '../../http/api'
import { Message } from 'element-ui'

export default {
    //开启命名空间
    namespaced: true,
    state: {
        reports: []
    },
    mutations: {
        setReports(state, data) {
            state.reports = data
        }
    },
    actions: {
        //时间统计的折线图----------------------------------------------------------
        async getStatistics({ commit }, _) {
            let res = await api.getStatistics(_)
            console.log(res.data);
            if (res.meta.status === 200) {
                commit('setReports', res.data)
            } else {
                Message.error(res.meta.msg)
            }
        }
    },
}