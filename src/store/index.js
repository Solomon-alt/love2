import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import goods from './goods/goods'
import power from './power/power'
import statist from './statist/statist'
import order from './order/order'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        goods,
        power,
        statist,
        order,
    }
})