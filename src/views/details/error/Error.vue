<template>
<div>
    <div class="error">
        <img src="../../../assets/error.svg">
    </div>
    <ul>
        <li>
            <h1>404</h1>
        </li>
        <li>抱歉,你访问页面的页面不存在或正在开发中</li>
        <li>
            <el-button type="primary" class="btn" @click="handle">返回上一页</el-button>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {}
    },
    components: {},
    methods: {
        handle(){
            this.$router.go(-1)
        }
    },
    mounted() {},
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.error,
ul {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 430px;
    height: 360px;
}

.error {
    left: 350px;

    img {
        width: 100%;
        height: 100%;
    }
}

ul {
    left: 850px;

    li {
        list-style: none;

        h1 {
            margin: 80px 0 40px 0;
        }

        .btn {
            margin-top: 50px;
        }
    }
}
</style>
