<template>
<div>
    <!--卡片布局-->
    <el-card class="box-card">
        <!--顶部搜索-->
        <div style="margin:20px">
            <!--输入框-->
            <el-input placeholder="请输入搜索内容" v-model="input" clearable style="width:320px;">
            </el-input>
            <!--搜索按钮-->
            <el-button icon="el-icon-search"></el-button>
        </div>

        <!--表格内容-->
        <el-table ref="filterTable" :data="getData.goods" style="width: 100%" border>
            <el-table-column align="center" label="#" type="index">
            </el-table-column>
            <el-table-column align="center" prop="order_number" label="订单编号">
            </el-table-column>
            <el-table-column align="center" prop="order_price" label="订单价格">
            </el-table-column>
            <el-table-column align="center" label="是否付款">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.order_pay === '0'" type='danger' disable-transitions>已付款</el-tag>
                    <el-tag v-else type='success' disable-transitions>未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="is_send" label="是否发获">
            </el-table-column>
            <el-table-column align="center" label="下单时间">
                <template slot-scope="scope">
                    <div>{{scope.row.goods_time}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button size="mini" type="success" icon="el-icon-location-information" @click="handleLocal(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 15, 20, 30]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="getData.total">
            </el-pagination>
        </div>
        
        <!--编辑地址Dialog-->
        <el-dialog title="编辑地址" :visible.sync="dialogVisible" width="30%">
            
        </el-dialog>
    </el-card>
</div>
</template>

<script>


import {
    createNamespacedHelpers
} from 'vuex'
let orderModule = createNamespacedHelpers("order");
let {
    mapState: orderState,
    mapActions: orderActions
} = orderModule;
export default {
    name: '',
    props: {},
    data() {
        return {
            pagenum: 1, //进入页面页码
            pagesize: 5, //初始页面每一页显示条数
            input: '', //输入框的值
            currentPage: 1, //当前页码
            dialogVisible: false, //dialog默认隐藏
           timer:''
        }
    },
    components: {},
    methods: {
        ...orderActions(['getOrder']),
        //进入页面时获取订单数据------------------------------------------------------------------------------------
        orderList() {
            this.getOrder({
                query: '',
                pagenum: this.pagenum,
                pagesize: this.pagesize,
                user_id: '',
                pay_status: '',
                is_send: '',
                order_fapiao_title: '',
                order_fapiao_company: '',
                order_fapiao_content: '',
                consignee_addr: ''
            })
        },
        //获取时间--------------------------------------------------------------------------------------------------
           
        //编辑地址--------------------------------------------------------------------------------------------------
        handleEdit(index, row) {
            console.log(index, row);
            this.dialogVisible = true
        },
        //物流信息--------------------------------------------------------------------------------------------------
        handleLocal(index, row) {
            console.log(index, row);
        },
        //分页-------------------------------------------------------------------------------------------------------
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.orderList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val
            this.orderList()
        },

    },
    mounted() {
        this.orderList()
        // console.log();
    },
    computed: {
        ...orderState(['getData'])
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
}
</style>
