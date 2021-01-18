<template>
<div>
    <el-card class="box-card">
        <div>
            <!--搜索框-->
            <el-input placeholder="请输入搜索内容" v-model="input" clearable style="width:240px">
            </el-input>
            <!--搜索按钮-->
            <el-button plain @click="search"><i class="el-icon-search"></i></el-button>
            <!--添加商品按钮-->
            <el-button type="primary" style="margin-left:40px" @click="goto">添加商品</el-button>
        </div>

        <!--中间表格-->
        <el-table :data="commodity.goods" style="width: 100%; margin-top:40px" border>
            <el-table-column label="#" type="index">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="180" align="center">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格(元)" align="center">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" width="180" align="center">
            </el-table-column>
            <el-table-column prop="add_time" label="创建时间" width="180" align="center">
                <template slot-scope="scope">
                    {{scope.row.goods_time}}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑商品dialog-->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="商品名称" prop="goods_name">
                    <el-input v-model.trim="ruleForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                    <el-input type="number" v-model.trim="ruleForm.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                    <el-input type="number" v-model.trim="ruleForm.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                    <el-input type="number" v-model.trim="ruleForm.goods_weight"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--页码-->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 30, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="commodity.total">
            </el-pagination>
        </div>
    </el-card>
</div>
</template>

<script>
import {
    createNamespacedHelpers
} from "vuex";
let goodsModule = createNamespacedHelpers("goods");
let {
    mapState: goodsState,
    mapActions: goodsActions
} = goodsModule;
export default {
    name: '',
    props: {},
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 10,
            input: '',
            currentPage: 1,
            dialogVisible: false,
            ruleForm: {
                goods_name: '',
                goods_price: '',
                goods_number: '',
                goods_weight: '',
            },
            //表单验证规则=============================================================================
            rules: {
                goods_name: [{
                    required: true,
                    message: '商品名称不能为空',
                    trigger: 'blur'
                }],
                goods_price: [{
                    required: true,
                    message: '商品价格不能为空',
                    trigger: 'blur'
                }],
                goods_number: [{
                    required: true,
                    message: '商品数量不能为空',
                    trigger: 'blur'
                }],
                goods_weight: [{
                    required: true,
                    message: '商品重量不能为空',
                    trigger: 'blur'
                }]
            },
        }
    },
    components: {},
    methods: {
        ...goodsActions(['getGoodsList', 'queryGoods', 'delGoods']),
        //跳路由到添加商品开始--------------------------------------------------------
        goto() {
            this.$router.push('/addGoods')
        },
        //跳路由到添加商品结束--------------------------------------------------------
        //关闭编辑dialog并发请求开始--------------------------------------------------
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => {});
        },
        //关闭编辑dialog并发请求结束--------------------------------------------------
        //获取表格数据开始------------------------------------------------------------
        getData() {
            //获取表格数据
            this.getGoodsList({
                query: this.query,
                pagenum: this.pagenum,
                pagesize: this.pagesize
            })
        },
        //获取表格数据结束----------------------------------------------
        //搜索商品开始--------------------------------------------------
        search() {
            this.getGoodsList({
                query: this.input,
                pagenum: this.pagenum,
                pagesize: this.pagesize
            })
        },
        //搜索商品结束--------------------------------------------------
        //编辑商品开始--------------------------------------------------
        handleEdit(index, row) {
            this.dialogVisible = true
            this.ruleForm.goods_name = row.goods_name
            this.ruleForm.goods_price = row.goods_price
            this.ruleForm.goods_number = row.goods_number
            this.ruleForm.goods_weight = row.goods_weight
            console.log(index, row);

        },
        //编辑商品结束--------------------------------------------------
        //删除商品开始--------------------------------------------------
        handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.delGoods({
                    id: row.goods_id,
                    query: this.query,
                    pagenum: this.pagenum,
                    pagesize: this.pagesize
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //删除商品结束--------------------------------------------------
        //分页开始----------------------------------------------------
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.getData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.getData()
        },
        //分页结束----------------------------------------------------
    },
    mounted() {
        //获取表格数据
        this.getData()
    },
    computed: {
        //得到发请求的数据
        ...goodsState(['commodity'])
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
    width: 100%;
}
</style>
