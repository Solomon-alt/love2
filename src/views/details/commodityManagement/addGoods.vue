<template>
<div>
    <el-card class="box-card">
        <div class="box">
            <!--左侧导航栏-->

            <div class="sideBar">
                <el-tabs tab-position="left" v-model="activeName" class="tab">
                    <el-tab-pane label="基本信息" name="0"></el-tab-pane>
                    <el-tab-pane label="商品参数" name="1"></el-tab-pane>
                    <el-tab-pane label="商品属性" name="2"></el-tab-pane>
                    <el-tab-pane label="商品图片" name="3"></el-tab-pane>
                    <el-tab-pane label="商品类容" name="4"></el-tab-pane>
                </el-tabs>
            </div>
            <!--右侧类容框-->
            <div class="content">
                <!--顶部信息框-->

                <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
                </el-alert>
                <!--步骤条-->

                <div class="steps">
                    <el-steps :active="active" finish-status="success">
                        <el-step title="基本信息"></el-step>
                        <el-step title="商品参数"></el-step>
                        <el-step title="商品属性"></el-step>
                        <el-step title="商品图片"></el-step>
                        <el-step title="商品类容"></el-step>
                        <el-step title="完成"></el-step>
                    </el-steps>
                </div>
                <!--基本信息表单-->
                <div v-if="active===0">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model.trim="ruleForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-if="ruleForm.goods_name.length===0" v-model.trim="ruleForm.goods_price" disabled></el-input>
                            <el-input type="number" v-else v-model.trim="ruleForm.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-if="ruleForm.goods_price.length===0" v-model.trim="ruleForm.goods_weight" disabled></el-input>
                            <el-input type="number" v-else v-model.trim="ruleForm.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_num">
                            <el-input v-if="ruleForm.goods_weight.length===0" v-model.trim="ruleForm.goods_num" disabled></el-input>
                            <el-input type="number" v-else v-model.trim="ruleForm.goods_num"></el-input>
                        </el-form-item>
                    </el-form>
                    <!--Cascader 级联选择器-->
                    <div style="padding-left:32px; font-size:14px; color:#606266">
                        商品分类<el-cascader v-if="ruleForm.goods_num.length===0" :options="options" v-model="options.value" clearable style="margin-left:10px" disabled></el-cascader>
                        <el-cascader v-else :options="options" v-model="options.value" clearable style="margin-left:10px"></el-cascader>
                    </div>
                </div>

                <!--下一步按钮-->

                <div style="margin: 30px 0 0 98px; height:30px">
                    <el-button v-if="options.value&&options.value.length!==0" type="success" @click="handle">下一步</el-button>
                </div>
            </div>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {
            activeName: 0,
            active: 0,
            ruleForm: {
                goods_name: '',
                goods_price: '',
                goods_weight: '',
                goods_num: '',
            },
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
                goods_weight: [{
                    required: true,
                    message: '商品重量不能为空',
                    trigger: 'blur'
                }],
                goods_num: [{
                    required: true,
                    message: '商品数量不能为空',
                    trigger: 'blur'
                }],
            },
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }]
        }
    },
    components: {},
    methods: {
        handle() {
            console.log(this.options.value, this.active)
            if (this.active++ > 5) this.active = 0;
        },
    },
    mounted() {
        console.log(this.activeName)
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 20px;
    width: 100%;

    .box {
        display: flex;

        .sideBar {
            position: relative;
            width: 175px;
            height: 620px;

            .tab {
                position: absolute;
                top: 50%;
                transform: translateY(-50%)
            }
        }

        .content {
            flex: 1;

            .steps {
                margin: 30px 0;
            }
        }
    }

}
</style>
