<template>
  <div class="wrap processDefinition">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">流程定义</span></p>
    </div>
    <table>
      <thead>
      <tr>
        <th style="width: 20%">流程名称</th>
        <th>审批流程</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list,list_index) in workflowDefineList" :key="list_index">
        <td>{{list.name}}</td>
        <td>
          <span class="left mr10" v-for="(define,define_index) in list.form_approve_defines" :key="define_index">
            <el-select v-model="define.role_id"
                       placeholder="请选择"
                       @change="changeValue($event,define.id,list.id,define.level_no)">
              <el-option v-for="(role,index) in Roles" :key="index" :label="role.name" :value="role.id"></el-option>
            </el-select>
            <span style="color: #A0A0A0" v-show="define.id !== 0"><i class="fa fa-long-arrow-right"></i></span>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    <!--删除弹框-->
    <el-dialog title="删除节点" :visible.sync="canceldialog" width="30%">
      <div class="text-align-center" style="margin: 50px">
        <span>清空审批节点后,该审批节点后面的节点均会删除,确定清空吗? </span>
      </div>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="cancelDelete">取 消</el-button>
          <el-button type="success" @click="sureDelete">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style lang="" scoped>
  .processDefinition table {
    border: 1px #ccc solid;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }

  .processDefinition th {
    border: 1px #ccc solid;
    padding: 10px;
    min-width: 100px;
    color: #101010;
    background-color: #f5f5f5;
  }

  .processDefinition td {
    border: 1px #ccc solid;
    padding: 10px;
    color: #3B3B3B;
    min-width: 100px;
  }
</style>
<script>
  export default {
    data() {
      return {
        workflowDefineList: [],
        Roles: [
          {
            id: 0,
            name: '-请选择-'
          }
        ],
        canceldialog: false,
        delete_id: 0
      }
    },
    mounted: function () {
      this.getRoles()
      this.getWorkflowDefine()
    },
    methods: {
      successTip(message) {
        this.$message({
          message: message,
          type: 'success',
          center: true
        });
      },
      getWorkflowDefine: function () {
        this.loading = true
        var url = '/api/workflow/workflow_define/'
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            var list = res.data.data
            for (var i = 0; i < list.length; i++) {
              var no = list[i].form_approve_defines.length
              no++
              var arr = {id: 0, role_id: 0, level_no: no}
              list[i].form_approve_defines.push(arr)
            }
            this.workflowDefineList = list
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
      },
      saveDefine: function (defineId, value, no, roleName) {
        this.loading = true
        this.$axios.post('/api/workflow/workflow_define/' + defineId + '/create_define/', {
          role_id: value,
          role_name: roleName,
          level_no: no
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status_code === 1) {
              this.getWorkflowDefine()
              this.successTip("保存成功")
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      updateDefine: function (id, value, roleName) {
        this.loading = true
        this.$axios.post('/api/workflow/workflow_define/' + id + '/update_define/', {
          role_id: value,
          role_name: roleName
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status_code === 1) {
              this.successTip("修改成功")
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      deleteDefine: function (id) {
        this.loading = true
        this.$axios.post('/api/workflow/workflow_define/' + id + '/del_define/', {}).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status_code === 1) {
              this.getWorkflowDefine()
              this.successTip("刪除成功")
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      changeValue: function (value, id, defineId, no) {
        var roleName = ''
        for (var i = 0; i < this.Roles.length; i++) {
          if(this.Roles[i].id === value) {
            roleName = this.Roles[i].name
          }
        }
        if (value === 0) {
          /*删除*/
          this.canceldialog = true
          this.delete_id = id
        } else {
          if (id === 0) {
            /*添加*/
            this.saveDefine(defineId, value, no, roleName)
          } else {
            /*修改*/
            this.updateDefine(id, value, roleName)
          }
        }
      },
      sureDelete: function () {
        this.deleteDefine(this.delete_id)
        this.canceldialog = false
        this.delete_id = 0
      },
      cancelDelete: function () {
        this.getWorkflowDefine()
        this.canceldialog = false
        this.delete_id = 0
      }
    }
  }
</script>
