import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('../views/login/Login.vue'),
    meta: {
        title: '登录页'
    }
}, {
    path: '*',
    component: () =>
        import ('../views/details/error/Error.vue'),
    meta: {
        title: '404'
    }
}, {
    path: '',
    component: Layout,
    children: [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: '首页'
        }
    }, {
        path: '/goods',
        name: 'goods',
        component: () =>
            import ('../views/details/commodityManagement/Goods.vue'),
        meta: {
            title: '商品列表',
            icon: 'el-icon-info'
        }
    }, {
        path: '/addGoods',
        name: 'addGoods',
        component: () =>
            import ('../views/details/commodityManagement/addGoods.vue'),
        meta: {
            title: '添加商品'
        }
    }, {
        path: '/params',
        name: 'params',
        component: () =>
            import ('../views/details/commodityManagement/Params.vue'),
        meta: {
            title: '分类参数'
        }
    }, {
        path: '/categories',
        name: 'categories',
        component: () =>
            import ('../views/details/commodityManagement/Categories.vue'),
        meta: {
            title: '商品分类'
        }
    }, {
        path: '/orders',
        name: 'orders',
        component: () =>
            import ('../views/details/orderManagement/Orders.vue'),
        meta: {
            title: '订单列表'
        }
    }, {
        path: '/roles',
        name: 'roles',
        component: () =>
            import ('../views/details/rightsManagement/Roles.vue'),
        meta: {
            title: '角色列表'
        }
    }, {
        path: '/rights',
        name: 'rights',
        component: () =>
            import ('../views/details/rightsManagement/Rights.vue'),
        meta: {
            title: '角色列表'
        }
    }, {
        path: '/users',
        name: 'users',
        component: () =>
            import ('../views/details/userManagement/Users.vue'),
        meta: {
            title: '用户管理'
        }
    }, {
        path: '/reports',
        name: 'reports',
        component: () =>
            import ('../views/details/dataStatistics/Reports.vue'),
        meta: {
            title: '数据列表'
        }
    }, ]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


//路由守卫
router.beforeEach((to, _, next) => {
    console.log(to.meta.icon);
    //设置白名单
    let whitePath = ['/login']
        //设置页面标题
    document.title = to.meta.title
    let name = localStorage.getItem('user')
        //路由判断
    if (whitePath.includes(to.path)) { //判断用户要去的界面是否是白名单界面如果是则直接进入下一界面
        next()
    } else { //白名单中不包含用户要去的界面,判断本地是否储存用户名
        // if (name) { //本地储存有用户名也直接进入下一界面
        //     next()
        // } else { //本地未储存则跳到登录界面
        //     next('login')
        // }
        name ? next() : next('login')
    }
    next()
})
export default router