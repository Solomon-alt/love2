<template>
  <div>
    <el-card class="box-card">
      <!--  ============================================================================================================================ -->
      <!-- 頂部按鈕 -->
      <el-button type="primary" style="margin: 20px">主要按钮</el-button>
      <!--  ============================================================================================================================ -->
      <!-- 表格 -->
      <el-table
        :data="getGoods"
        style="width: 100%"
        row-key="cat_id"
        border
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="#" type="index" align="center">
        </el-table-column>
        <el-table-column prop="cat_name" label="分類名稱" align="center">
        </el-table-column>
        <el-table-column label="是否有效" align="center">
          <i class="el-icon-success" style="color: #87ceeb"></i>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0">一級</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level === 1"
              >二級</el-tag
            >
            <el-tag type="warning" v-if="scope.row.cat_level === 2"
              >三級</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit"
              >編輯</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!--  ============================================================================================================================ -->
      <!-- 編輯彈出的dialog -->
      <el-dialog title="編輯分類" :visible.sync="dialogVisible" width="30%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="分類名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let goodsModule = createNamespacedHelpers("goods");
let { mapState: goodsState, mapActions: goodsActions } = goodsModule;
export default {
  name: "",
  props: {},
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
        row:'',
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
      },
    };
  },
  components: {},
  methods: {
    ...goodsActions(["goodsList", "deleGdoods","editCommit"]),

    //獲取列表數據----------------------------------------------------------------------------------------------------------
    getData() {
      this.goodsList({
        type: 3,
      });
    },

    //表格操作------------------------------------------------------------------------------------------------------------
    //編輯
    handleEdit(index, row) {
      console.log(index, row);
      this.ruleForm.name = row.cat_name
      this.row = row
      this.dialogVisible = true;    
    },
    //確定編輯
    sure(){
      console.log(this.ruleForm.name);
      this.editCommit({
        id: this.row.cat_id, 
        cat_name:this.ruleForm.name
      })
      this.dialogVisible = false
    },
    //刪除
    handleDelete(index, row) {
      console.log(index, row);
      this.deleGdoods({
        id: row.cat_id,
      });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...goodsState(["getGoods"]),
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box-card {
  margin-top: 20px;
}
</style>