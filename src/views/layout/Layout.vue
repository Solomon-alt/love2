<template>
<div class="box">
    <!--顶部公共路由-->
    <div class="top">
        <top></top>
    </div>
    <!--侧边公共路由-->
    <div class="sidebar">
        <side :lists="lists" v-if="lists.length>0"></side>
    </div>
    <!--菜单栏公共路由-->
    <div class="menu">
        <menus></menus>
    </div>
    <!-- 每个页面单独拥有部分 -->
    <div class="common">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import {
    createNamespacedHelpers
} from "vuex";
let userModule = createNamespacedHelpers("user");
let {
    mapState: userState,
    mapActions: userActions
} = userModule;

import top from "../../components/layout/topPublicRouter";
import side from "../../components/layout/sidebarPubicRouter";
import menus from "../../components/layout/Menus";
export default {
    name: "",
    props: {},
    data() {
        return {};
    },
    components: {
        top,
        side,
        menus,
    },
    methods: {
        ...userActions(["getLeftTab"]),
    },
    mounted() {
        this.getLeftTab();
    },
    computed: {
        ...userState(["lists"]),
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.box {
    overflow: hidden;
}

.top {
    position: fixed;
    top: 0;
    z-index: 10;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #fff;
}

.sidebar {
    position: fixed;
    top: 80px;
    left: 0;
    width: 250px;
    height: calc(100vh - 80px);
    border-right: 1px solid #e6e6e6;
}

.menu {
    width: calc(100vw - 200px);
    margin: 80px 0 0 250px;
    top: 80px;
    left: 250px;
    border-top: 1px solid #e6e6e6;
    height: 65px;
}

.common {
    width: calc(100vw - 350px);
    min-height: calc(100vh - 147px);
    border-top: 1px solid #e6e6e6;
    margin-left: 300px;
}
</style>
