<template>
<div>
    <el-table :data="right" border stripe>
        <el-table-column label="#" align="center" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center">
        </el-table-column>
        <el-table-column prop="tag" label="标签" align="center">
            <template slot-scope="scope">             
                <el-tag v-if="scope.row.level==0"  disable-transitions>一级</el-tag>                          
                <el-tag v-if="scope.row.level==1" type="success" disable-transitions>二级</el-tag>                          
                <el-tag v-if="scope.row.level==2" type="warning" disable-transitions>三级</el-tag>                          
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import {
    createNamespacedHelpers
} from 'vuex'
let powerModule = createNamespacedHelpers("power");
let {
    mapState: powerState,
    mapActions: powerActions
} = powerModule;
export default {
    name: '',
    props: {},
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                tag: '家'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                tag: '公司'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                tag: '公司'
            }]
        }
    },
    components: {

    },
    methods: {
      ...powerActions(["rightList"]),
        formatter(row) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        }
    },
    mounted() {
      this.rightList('list')
    },
    computed: {
      ...powerState(["right"]),
    },
    watch: {}
}
</script>

<style lang='scss' scoped>

</style>
