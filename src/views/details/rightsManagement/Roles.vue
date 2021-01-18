<template>
  <div>
    <el-button
      type="primary"
      style="margin: 10px 0 20px 20px"
      @click="dialogVisible = true"
      >添加角色</el-button
    >
    <!--添加角色的dialog-->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>

      <el-form :model="form">
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.role" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="roles"
      style="width: 100%"
      border
      stripe
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div v-if="scope.row.children.length > 0">
            <div
              v-for="item in scope.row.children"
              :key="item.id"
              style="display: flex; align-item: center; position: relative"
            >
              <el-tag
                closable
                style="
                  margin-top: 10px;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                "
                @close="deletroles(item, scope.row)"
              >
                {{ item.authName }}
              </el-tag>
              <div style="margin: 50px 50px">
                <div
                  v-for="item in item.children"
                  :key="item.id"
                  style="margin-left: 150px; position: relative"
                >
                  <div>
                    <el-tag
                      closable
                      style="
                        margin-top: 10px;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                      "
                      type="success"
                      @close="deletroles(item, scope.row)"
                    >
                      {{ item.authName }}
                    </el-tag>
                  </div>
                  <div>
                    <div
                      v-for="item in item.children"
                      :key="item.id"
                      style="margin-left: 350px"
                    >
                      <div>
                        <el-tag
                          closable
                          style="margin-top: 20px"
                          type="warning"
                          @close="deletroles(item, scope.row)"
                        >
                          {{ item.authName }}
                        </el-tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>你没有权限</div>
        </template>
      </el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="职位" prop="roleName" align="center">
      </el-table-column>
      <el-table-column label="描述" prop="roleDesc" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="handleDistrib(scope.$index, scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--编辑dialog-->

    <el-dialog
      title="编辑角色"
      :visible.sync="dialogFormVisible"
      width="30%"
      :show-close="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名" prop="rolesName">
          <el-input v-model="ruleForm.rolesName"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限dialog -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="40%">
      <el-tree
        :data="right"
        show-checkbox
        node-key="id"
        :default-expanded-keys="arr"
        :default-checked-keys="arr"
        default-expand-all
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="sures">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let powerModule = createNamespacedHelpers("power");
let { mapState: powerState, mapActions: powerActions } = powerModule;

export default {
  name: "",
  props: {},
  data() {
    return {
      arr: "",
      defaultProps: {
        children: "children",
        label: "authName",
      },
      dialogVisible: false,
      dialogFormVisible: false,
      dialogVisible1: false,
      ids: "",
      ida: "",
      idb: "",
      form: {
        role: "",
        name: "",
      },
      ruleForm: {
        name: "",
        rolesName: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        rolesName: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  components: {},
  methods: {
    ...powerActions([
      "roleList",
      "addRoles",
      "delRoles",
      "editRoles",
      "rightList",
      "rolePower",
      "deleteRight",
    ]),
    handle2(e) {
      console.log(e.row.children);
    },
    sure() {
      this.addRoles({
        roleName: this.ruleForm.name,
        roleDesc: this.form.role,
      });
      this.dialogVisible = false;
      this.roleList(), (this.ruleForm.name = null), (this.form.role = null);
    },
    handle() {
      console.log(1111);
    },
    handleEdit(row) {
      this.ida = row.id;
      this.ruleForm.rolesName = row.roleName;
      this.dialogFormVisible = true;
      console.log(this.ida, this.ruleForm.rolesName);
    },

    handleSure() {
      this.editRoles({
        id: this.ida,
        roleName: this.ruleForm.rolesName,
        roleDesc: this.form.role,
      });
      this.dialogFormVisible = false;
    },

    handleDelete(row) {
      this.ids = row.id;
      console.log(this.ids);
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delRoles({
            id: this.ids,
          });
          this.roleList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleDistrib(index, row) {
      console.log(index, row);
      this.idb = row.id;
      this.rightList("tree");
      let arr = [];
      row.children.map((item) => {
        item.children.map((itema) => {
          itema.children.map((itemb) => {
            arr.push(itemb.id);
          });
        });
      });
      this.arr = arr;
      this.dialogVisible1 = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //-------------------------------------------------------------------------------------------
    //確定授權
    sures() {
      console.log(this.$refs.tree.getCheckedKeys().toString());
      this.rolePower({
        roleId: this.idb,
        rids: this.$refs.tree.getCheckedKeys().toString(),
      });
      this.dialogVisible1 = false;
    },
    //刪除角色制定權限----------------------------------------------------------------------------
    deletroles(item, e) {
      console.log(item);
      console.log(e);
      this.deleteRight({
        roleId: e.id,
        rightId: item.id,
      });
    },
  },
  mounted() {
    this.roleList();
  },
  computed: {
    ...powerState(["roles", "right"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
