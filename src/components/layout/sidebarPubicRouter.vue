<template>
<div>
    <el-menu router default-active="$router.path" class="el-menu-vertical-demo" background-color="#fff" text-color="#000" active-text-color="#15AAFB" unique-opened>
        <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu v-for="(item, index) in lists" :key="index" :index="item.path">
            <template class="img">
                <span slot="title"><i class=to.meta.icon></i>{{ item.authName }}</span>
            </template>
            <el-menu-item-group v-for="itema in item.children" :key="itema.id">
                <el-menu-item :index="itema.path">
                    <span slot="title">{{ itema.authName }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</div>
</template>

<script>
export default {
    name: "",
    props: {
        lists: {
            type: Array,
        },
    },
    data() {
        return {};
    },
    components: {},
    methods: {
        goto(path) {
            this.$router.push(path);
        },
    },
    mounted() {},
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped></style>
