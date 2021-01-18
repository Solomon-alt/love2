<template>
<div>
    <!--整体背景-->
    <div class="background">
        <!--中间登录卡片-->
        <div class="card">
            <!--标题栏-->
            <h1>欢迎来到小爱后台管理系统</h1>
            <!--表单验证-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                <!--用户名验证-->
                <el-form-item label="请输入用户名:" prop="username" class="box">
                    <el-input v-model="ruleForm.username" class="username"></el-input>
                </el-form-item>
                <!--密码验证-->
                <el-form-item label="请输入密码:" prop="password" class="box">
                    <el-input v-model="ruleForm.password" type="password" class="username"></el-input>
                </el-form-item>
            </el-form>
            <div class="remind">特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
            <el-button type="primary" class="btn" @click="submit">立即登录</el-button>
        </div>
    </div>
</div>
</template>

<script>
 import {createNamespacedHelpers} from 'vuex'
 let userModule = createNamespacedHelpers('user')
 let {mapActions: userActions} = userModule

export default {
    name: "",
    props: {},
    components: {},
    data() {
        return {
            //双向绑定username和passwor
            ruleForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 10,
                        message: "长度在 1 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                password: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur",
                }, ]
            },
        };
    },
    methods: {
         ...userActions(['login']),
        submit() {
         this.login({
           username: this.ruleForm.username,
           password: this.ruleForm.password
         })
        }
    },
    mounted() {},
    watch: {},
    computed: {},
};
</script>

<style lang="scss" scoped>
.background {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url(../../assets/background.svg);
    background-size: cover;
    background-repeat: no-repeat;

    .card {
        width: 600px;
        height: 400px;
        background: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 20px #ccc;

        h1 {
            text-align: center;
            line-height: 80px;
            height: 80px;
            border-bottom: 1px solid #ebeef5;
        }

        .box {
            margin-top: 40px;

            .username {
                width: 400px;
                margin-left: 40px;
            }
        }

        .remind {
            text-align: center;
            line-height: 40px;
        }

        .btn {
            display: block;
            margin: 20px auto;
        }
    }
}
</style>
