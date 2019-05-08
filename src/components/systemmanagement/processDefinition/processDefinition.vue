<template>
    <div class="wrap processDefinition">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">流程定义</span></p>
        </div>
        <el-table
        class="mt26"
            :data="workflowDefineList"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="流程名称"
            width="180">
            </el-table-column>
            <el-table-column
            label="审批流程">
              <template slot-scope="scope">
                  <el-select class="left" v-model="value" placeholder="请选择">
                    <el-option v-for="role in Roles" :key="role.id" :label="role.name" :value="role.id">
                    </el-option>
                  </el-select>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="" scoped>

</style>
<script>
export default {
    data() {
        return {
          value: '-请选择-',
          workflowDefineList: [],
          Roles: [
            {
              id: 0,
              name: '-请选择-'
            }
          ]
        }
    },
  mounted: function () {
    this.getWorkflowDefine()
    this.getRoles()
  },
  methods: {
    getWorkflowDefine: function () {
      this.loading = true
      var url = '/api/workflow/workflow_define/'
      this.$axios.get(url).then(res => {
        this.loading = false
        if (res.data.status_code === 1) {
          this.workflowDefineList = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getRoles: function () {
      this.loading = true
      var url = '/api/user/get_roles/'
      this.$axios.get(url).then(res => {
        this.loading = false
        if (res.data.status_code === 1) {
          this.Roles = this.Roles.concat(res.data.data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
