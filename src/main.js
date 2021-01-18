import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts-v2'
import echarts from 'echarts'


// use: 里面传入一个方法或者对象 这个方法名必须叫install 或者这个对象里面有个属性是install方法
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')