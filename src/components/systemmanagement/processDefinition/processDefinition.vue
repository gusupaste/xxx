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
                       @change="getValue($event,define.id,list.id,define.level_no)">
              <el-option v-for="(role,index) in Roles" :key="index" :label="role.name" :value="role.id"></el-option>
            </el-select>
            <span style="color: #A0A0A0" v-show="define.id !== 0"><i class="fa fa-long-arrow-right"></i></span>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
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
        ]
      }
    },
    mounted: function () {
      this.getRoles()
      this.getWorkflowDefine()
    },
    methods: {
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
      getValue: function (value, id, defineId, no) {
        if (value === 0) {
          /*删除*/
        this.loading = true
          this.$axios.post('/api/workflow/workflow_define/' + id + '/del_define/', {
          }).then(res => {
            this.loading = false
            if (res.status === 200) {
              if(res.data.status_code === 1) {
                this.getWorkflowDefine()
                alert('刪除成功')
              } else {
                alert(res.data.message)
              }
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
            if(id === 0) {
              /*添加*/
              this.loading = true
              this.$axios.post('/api/workflow/workflow_define/' + defineId + '/create_define/', {
                role_id: value,
                level_no: no
              }).then(res => {
                this.loading = false
                if (res.status === 200) {
                  if(res.data.status_code === 1) {
                    this.getWorkflowDefine()
                    alert('保存成功')
                  } else {
                    alert(res.data.message)
                  }
                }
              }).catch(err => {
                console.log(err)
              })
            } else {
              /*修改*/
              this.loading = true
              this.$axios.post('/api/workflow/workflow_define/' + id + '/update_define/', {
                role_id: value
              }).then(res => {
                this.loading = false
                if (res.status === 200) {
                  if(res.data.status_code === 1) {
                    alert('修改成功')
                  } else {
                    alert(res.data.message)
                  }
                }
              }).catch(err => {
                console.log(err)
              })
            }
        }
      }
    }
  }
</script>
