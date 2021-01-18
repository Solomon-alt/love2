<template>
<div>
    <el-card class="box-card">
        <div ref="myChart" :style="{width: '100%', height: '500px'}"></div>
    </el-card>
</div>
</template>

<script>
import {
    createNamespacedHelpers
} from "vuex";
let statistModule = createNamespacedHelpers("statist");
let {
    mapState: statistState,
    mapActions: statistActions
} = statistModule;
export default {
    name: '',
    props: {},
    data() {
        return {

        }
    },
    components: {},
    methods: {
        ...statistActions(["getStatistics"]),
        drawLine() {
            let chart = this.$refs.myChart
            let myChart = this.$echarts.init(chart)
            myChart.setOption(this.reports)
        }

    },
    mounted() {
        this.getStatistics()      
    },
    computed: {
        ...statistState(["reports"])
    },
    watch: {
        reports(){
            this.drawLine()
        }
    }
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
}
</style>
