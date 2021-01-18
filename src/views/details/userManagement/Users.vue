<template>
<div>
    <!--搜索框类容-->
    <div class="ipt">
        <el-input placeholder="请输入内容" v-model.trim="input" clearable style="width:395px">
        </el-input>
        <el-button plain @click="seekId"><i class="el-icon-search"></i></el-button>
        <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
    </div>
    <!--表格类容-->
    <el-table :data="users.users" border>
        <el-table-column label="#" align="center" type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
            <template slot-scope="scope">
                <el-switch active-color="#409eff" inactive-color="#dcdfe6" v-model="scope.row.mg_state" @change="change(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑角色" placement="top">
                    <el-button size="mini" type="primary" @click="compile(scope.row)"><i class="el-icon-edit"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除角色" placement="top">
                    <el-button size="mini" type="danger" @click="remove(scope.row)"><i class="el-icon-delete"></i></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
                    <el-button size="mini" type="warning" @click="allot(scope.row)"><i class="el-icon-setting"></i></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <!--分页类容-->
    <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="users.total">
        </el-pagination>
    </div>
    <!--dialog类容-->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%" lock-scroll center :close-on-press-escape="false" :close-on-click-modal="false" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
                <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handle">确 定</el-button>
        </span>
    </el-dialog>
    <!--修改时弹出的dialog-->
    <el-dialog title="编辑用户" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose1" :show-close="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" disabled label-width="100px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="邮箱" prop="email1">
                <el-input v-model="ruleForm.email1"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="handleOne()">确 定</el-button>
        </span>
    </el-dialog>
    <!--分配角色弹出的dialog-->
    <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
        <ul>
            <li>当前用户:{{username}}</li>
            <li>当前角色:{{role}}</li>
        </ul>
        <!--分配角色弹出的dialog中的下拉弹框-->
        <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px">
            <el-form-item>
                <el-select v-model="form.region" placeholder="请选择">
                    <el-option value="两个黄鹂鸣翠柳"></el-option>
                    <el-option value="一行白鹭上青天"></el-option>
                    <el-option value="窗含西岭千秋雪"></el-option>
                    <el-option value="门泊东吴万里船"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
        </span>
    </el-dialog>
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

export default {
    name: "",
    props: {},
    components: {},
    data() {
        return {
            ids: '',
            currpage: 1,
            currentPage4: 1,
            pagenum: 1,
            pagesize: 5,
            query: "",
            input: "",
            input1: "",
            phone: '',
            role: '',
            dialogVisible: false,
            dialogVisible1: false,
            dialogVisible2: false,
            username: '',
            ida: '',
            form: {
                region: '',
            },
            ruleForm: {
                username: "",
                password: "",
                email: "",
                email1: "",
                mobile: "",
                name: '',
                phone: '',
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }, ],
                username: [{
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                }, ],
                password: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur",
                }, ],
                email: [{
                    required: true,
                    message: "请输入邮箱",
                    trigger: "blur",
                }, ],
                email1: [{
                    required: true,
                    message: "请输入邮箱",
                    trigger: "blur",
                }, ],
                mobile: [{
                    required: true,
                    message: "请输入电话号码",
                    trigger: "blur",
                }, ],
                phone: [{
                    required: true,
                    message: "请输入电话号码",
                    trigger: "blur",
                }, ],
            },
        };
    },
    methods: {
        ...userActions(["getUsers", "addUsers", "modifyUsers", "edit", "del",'putUserRoles']),
        // 分配角色
        sure() {
            this.form.region="",
            console.log(this.form.region)
            this.dialogVisible2 = false
        },
        allot(e) {
            this.dialogVisible2 = true,
                console.log(e)
            this.ida = e.id
            console.log(this.ida);
            this.username = e.username
            this.role = e.role_name
        },
        remove(e) {
            console.log(e)
            this.del({
                id: e.id
            })
            this.useralist();
        },
        handleOne() {
            this.edit({
                    id: this.ids
                }),
                this.dialogVisible1 = false
        },
        compile(e) {
            this.dialogVisible1 = true,
                this.ruleForm.phone = e.mobile
            this.ruleForm.email1 = e.email
            this.ruleForm.name = e.username
            this.ids = (e.id)
        },
        handleClose2(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => {});
        },
        handleClose1(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => {});
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.useralist();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.useralist();
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(() => {
                    done();
                })
                .catch(() => {});
        },

        handle() {
            (this.dialogVisible = false),
            this.addUsers({
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                email: this.ruleForm.email,
                mobile: this.ruleForm.mobile,
            });
        },
        //查询表格
        seekId() {
            this.query = this.input;
            this.useralist();
        },
        change(data) {
            this.modifyUsers({
                uId: data.id,
                type: data.mg_state,
            })
            console.log(data)
        },
        useralist() {
            this.getUsers({
                query: this.query,
                pagenum: this.pagenum,
                pagesize: this.pagesize,
            });
        },
    },
    mounted() {
        this.useralist();
    },
    watch: {},
    computed: {
        ...userState(["users"]),
    },
};
</script>

<style lang="scss" scoped>
.ipt {
    height: 50px;
    margin: 25px 30px;
}

li {
    list-style: none;
    margin-top: 20px;
}
</style>
