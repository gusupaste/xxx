<template>
  <div class="usermanagement wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">用户管理</span></p>
    </div>
    <div class="header-top">
      <p><span>角色：</span>
        <el-select v-model="value" @change="roleType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.type"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">搜索：</span>
        <el-input type="text" v-model="display_name" placeholder="请输入用户名"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="getUserList(1)">搜索</el-button></span>
        <span class="right">
          <el-button class="orange" type="text" @click="addUser(0)">
            <i class="fa fa-plus-square font-size-20"></i>
            &nbsp;
            <span style="font-size:14px">新增用户</span>
            </el-button>
        </span>
      </p>
      <el-table
        :data="userList"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="display_name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="username"
          label="登陆账号">
        </el-table-column>
        <el-table-column
          label="所属组织">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.organizations" :key="index">{{item.name}}<br></span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属角色">
          <template slot-scope="scope">
            <a class="font-cl-blue" v-for="(item,index) in scope.row.roles"
            :key="index"
               @click="assignPermissions(item.id)">{{item.name}}<br></a>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <i @click="addUser(scope.row.id)" class="fa fa-pencil-square-o orange font-size-20"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="pager, next, jumper"
        next-text="下一页"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="total" class="page">
      </el-pagination>
      <!--角色权限分配 弹框-->
      <el-dialog class="assign-permissions" title="角色权限分配" :visible.sync="assignpermissions" width="50%">
        <div class="dialog_content">
          <p>
            <span>角色名称：</span><span>{{rolename}}</span>
          <hr hidden>
          <span>角色描述：</span><span>{{roledesc}}</span>
          </p>
          <hr class="line-solid">
          <p>被赋予该角色的系统用户：</p>
          <template>
            <el-table
              :data="userCheckList"
              border
              style="width: 100%">
              <el-table-column
                prop="display_name"
                label="用户名">
              </el-table-column>
              <el-table-column
                prop="username"
                label="登陆账号">
              </el-table-column>
            </el-table>
          </template>
          <p>该角色所需的系统权限：</p>
          <el-collapse :data="boxData" @change="handleChange">
            <div v-for="(item,index) in boxData" :key="index">
              <el-collapse-item :name="index">
                <template slot="title">
                  <li style="line-height: 0" name="selectColor">{{item.name}}</li>
                </template>
                <div>
                  <el-table :data="item.permissions" border style="width: 100%">
                    <el-table-column prop="name" label="权限">
                    </el-table-column>
                    <el-table-column prop="description" label="申明">
                    </el-table-column>
                    <el-table-column label="允许">
                      <template slot-scope="scope">
                        <input type="checkbox" v-model="checkedValue" :value="scope.row.id"/>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </div>
          </el-collapse>
        </div>
        <span slot="footer" class="dialog-footer text-align-center">
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        options: [
          {
            type: '-所有-',
            value: -1
          },
          {
            type: '总部',
            value: 2
          },
          {
            type: '校园',
            value: 3
          }],
        display_name: '',
        type: -1,
        assignpermissions: false,
        userList: [],
        rolename: '',
        roledesc: '',
        userCheckList: [],
        boxData: [],
        checkedValue: [],
        pagesize: 10,
        currentPage: 1,
        total: 1
      }
    },
    mounted: function () {
      this.getUserList(1)
      this.value = this.options[0].value
    },
    watch: {
      currentPage () {
        this.getUserList(this.currentPage)
      }
    },
    methods: {
      addUser: function (id) {
        var type = 'add';
        if(id === 0){
          type = 'add';
        }else{
          type = 'edit';
        }
        this.$router.push({name: 'usermanagement-add', query: {id: id,type:type}})
      },
      roleType: function (val) {
        this.type = val
        this.getUserList(1)
      },
      getUserList: function (val) {
        this.loading = true
        this.currentPage = val
        var url = '/api/user/users_management/?display_name=' + this.display_name + '&role_type=' + this.type + '&organization_id=-1&page=' + this.currentPage + '&size=' + this.pagesize
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            console.log(res.data.data)
            this.userList = res.data.data.results
            this.total = res.data.data.count
          }
        }).catch(err => {
          console.log(err)
        })
      },
      assignPermissions: function (id) {
        this.getRole(id)
        this.getSystemPermission()
        this.assignpermissions = true
      },
      getRole: function (id) {
        this.loading = true
        var url = '/api/user/roles_management/' + id + '/role_info/'
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.rolename = res.data.role_data.name
            this.roledesc = res.data.role_data.description
            this.userCheckList = res.data.user_list
            this.checkedValue = res.data.permission_list
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getSystemPermission: function () {
        this.loading = true
        var url = '/api/user/permissions_management/'
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.boxData = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleChange: function (val) {
        var liList = document.getElementsByName('selectColor')
        for (var i = 0; i < liList.length; i++) {
          liList[i].style.color = ''
          for (var j = 0; j < val.length; j++) {
            if (i === val[j]) {
              liList[i].style.color = 'orange'
              break;
            }
          }
        }
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
    }
  }
</script>

<style scoped>
  .usermanagement {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .usermanagement .header-top {
    margin-top: 10px;
  }

  .usermanagement .header-top p {
    font-size: 14px;
  }

  .usermanagement .dialog_content p {
    padding: 10px 0;
  }

  .usermanagement .el-table td, .usermanagement .el-table th {
    text-align: center;
  }

  .usermanagement >>> .el-dialog__footer {
    text-align: center;
  }

  .usermanagement >>> .el-input {
    width: 164px;
    height: 36px;
  }

  .usermanagement >>> .el-select {
    margin-bottom: 10px;
  }

  .usermanagement .line-solid {
    width: 100%;
    text-align: center;
    color: #ccc;
  }

  .usermanagement .assign-permissions >>> .el-dialog__body {
    padding: 0 20px;
  }

  .usermanagement i {
    cursor: pointer;
  }

  /*手风琴样式*/
  .usermanagement >>> .el-collapse-item__arrow {
    display: none;
  }

  .usermanagement >>> .el-collapse-item__header {
    height: 30px;
    border: 0;
  }

  .usermanagement >>> .el-collapse {
    margin: 0 20px;
    border: 0;
  }

  .usermanagement >>> .el-collapse-item__wrap {
    border: 0;
  }

  .usermanagement .active {
    color: orange;
  }

  /*表格内容居中*/
  .usermanagement >>> .el-table td, .usermanagement >>> .el-table th {
    text-align: center;
  }
</style>
