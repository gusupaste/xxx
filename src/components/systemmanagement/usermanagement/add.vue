<template>
  <div class="addusermanagement wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">新增用户</span></p>
    </div>
    <div class="header-top">
      <div>
        <p class="bold_black">账号设置：</p>
        <div class="content">
          <el-form class="account_set" :inline="true" :label-position="labelPosition" label-width="150px">
            <el-form-item class="mt10" label="用户名：">
              <el-input v-model="display_name"></el-input>
            </el-form-item>
            <el-form-item class="mt10" label="登陆名：">
              <el-input v-model="username"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="密码：">
              <el-input v-model="password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input v-model="respassword" type="password"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="FirstName：">
              <el-input v-model="first_name"></el-input>
            </el-form-item>
            <el-form-item label="LastName：">
              <el-input v-model="last_name"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="Email：">
              <el-input v-model="email"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所属组织：">
              <el-input></el-input>
            </el-form-item>
            <i class="fa fa-plus-square-o orange" @click="addOrganization" style="margin-top: 18px"></i> -->
            <br>
            <el-form-item label="权限选择：">
              <el-radio :disabled="disabled" @change="changepermission" v-model="permission_chose"  :label="3">校园</el-radio>
              <el-radio :disabled="disabled" @change="changepermission" v-model="permission_chose"  :label="2">总部</el-radio>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content_top">
        <p class="bold_black">该用户被赋予的系统角色：</p>
        <div class="content">
          <el-table
            ref="multipleTable"
            :data="roleList"
            border
            tooltip-effect="dark"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @selection-change="userIdsChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="角色名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              min-width="250">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <i class="fa fa-search" @click="assignPermissions(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="content_top" v-if="permission_chose == 2">
        <p class="bold_black">管辖幼儿园：</p>
        <div class="content padding-20">
          <el-checkbox-group v-model="schoolIds" @change="schoolIdsChange">
            <el-checkbox v-for="(item,index)  in schoolList" :key="index" :label="item.id" style="min-width: 230px">
              【<span>{{item.code}}</span>】<span>{{item.name}}</span></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="content_top" v-if="permission_chose == 3">
        <p class="bold_black">管辖幼儿园：</p>
        <div class="content padding-20">
          <el-radio-group v-model="schoolid"  @change="schoolIdsChange2">
            <el-radio v-for="(item,index)  in schoolList" :key="index" :label="item.id" style="min-width: 230px">
              【<span>{{item.code}}</span>】<span>{{item.name}}</span></el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="footer-btn">
        <button class="btn bg-grey" style="margin: 50px" @click="back">取消</button>
        <button class="btn bg-green" @click="save">保存</button>
      </div>
    </div>
    <!--添加 弹框-->
    <el-dialog title="添加组织" :visible.sync="addorganization" width="50%" style="padding: 30px 60px;">
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="addorganization = false">取 消</el-button>
          <el-button type="success" @click="addorganization = false">保 存</el-button>
        </span>
    </el-dialog>
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
                      <input type="checkbox" disabled="true" v-model="checkedValue" :value="scope.row.id"/>
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
</template>

<script>
  export default {
    data() {
      return {
        display_name: '',
        username: '',
        password: '',
        respassword: '',
        first_name: '',
        last_name: '',
        email: '',
        labelPosition: 'right',
        addorganization: false,
        roleList: [],
        userIds: [],
        headquartersLength: 0,
        schoolList: [],
        schoolIds: [],
        assignpermissions: false,
        rolename: '',
        roledesc: '',
        userCheckList: [],
        boxData: [],
        checkedValue: [],
        id: 0,
        permission_chose:3,
        schoolid:'',
        disabled:false
      }
    },
    mounted: function () {
      this.id = Number(this.$route.query.id)
      if (this.id !== 0) {
        this.getUser();
        this.disabled = true;
      }else{
        this.getRoleList(1)
      }
      this.getSchoolList()
    },
    methods: {
      getUser: function () {
        this.loading = true
        var url = '/api/user/users_management/' + this.id + '/user_info/'
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            var data = res.data.data
            this.display_name = data.display_name
            this.username = data.username
            this.permission_chose = data.account_type
            this.password = data.password
            this.respassword = data.password
            this.first_name = data.first_name
            this.last_name = data.last_name
            this.email = data.email
            this.display_name = data.display_name
            this.schoolIds = data.centers
            this.schoolid = data.centers[0]
            this.headquartersLength = data.roles.hq_roles.length
            this.roleList = this.roleList.concat(data.roles.hq_roles)
            this.roleList = this.roleList.concat(data.roles.center_roles)
            var arrList = []
            for (var i = 0; i < this.roleList.length; i++) {
              if (this.roleList[i].status === 1) {
                arrList.push(this.roleList[i])
              }
            }
            this.toggleSelection(arrList)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toggleSelection(rows) {  // 这里是点击时 切换选中的行
        this.$nextTick(() => {   // 延迟回调
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, true);
            });
            // toggleRowSelection : 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
          } else {
            this.$refs.multipleTable.clearSelection();
            // clearSelection : 用于多选表格，清空用户的选择
          }
        })
      },
      getRoleList: function (status) {
        this.loading = true
        var url = '/api/user/roles_management/?status=' + status
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            if (status === 0) {
              this.headquartersLength = res.data.data.length
            }
            this.roleList = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getSchoolList: function () {
        this.loading = true
        var url = '/api/user/get_centers/'
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.schoolList = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      tableRowClassName({row, rowIndex}) {
        // if (rowIndex < this.headquartersLength) {
        //   return 'warning-row'
        // }
        // return ''
      },
      userIdsChange(val) {
        this.userIds = []
        for (var i = 0; i < val.length; i++) {
          this.userIds.push(val[i].id)
        }
      },
      schoolIdsChange(val) {
        this.schoolIds = val
      },
      schoolIdsChange2(val) {
        this.schoolIds = [val];
      },
      changepermission(val) {
        this.schoolIds = [];
        if(val == 2) {
          this.getRoleList(0)
        } else {
          this.getRoleList(1)
        }
        
      },
      addOrganization: function () {
        this.addorganization = true
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
        var url = '/api/user/permissions_management/';
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.boxData = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      save: function () {
        this.loading = true
        if (this.password !== this.respassword) {
          alert("确认密码不一样")
          return
        }
        var url = ''
        if (this.id === 0) {
          url = '/api/user/users_management/'
        } else {
          url = '/api/user/users_management/' + this.id + '/update_users/'
        }
        this.$axios.post(url, {
          display_name: this.display_name,
          username: this.username,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          organization_list: [],
          account_type: this.permission_chose,
          role_list: this.userIds,
          center_list: this.schoolIds
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status_code === 1) {
              alert('保存成功')
              this.back()
            } else {
              alert(res.data.message)
            }

          }
        }).catch(err => {
          console.log(err)
        })
      },
      back: function () {
        this.$router.push({name: 'usermanagement'})
      },
      handleChange: function (val) {
        var liList = document.getElementsByName('selectColor');
        for (var i = 0; i < liList.length; i++) {
          liList[i].style.color = '';
          for (var j = 0; j < val.length; j++) {
            if (i === val[j]) {
              liList[i].style.color = 'orange';
              break;
            }
          }
        }
      },
    }
  }
</script>

<style scoped>
  .addusermanagement {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .addusermanagement .header-top {
    margin-top: 10px;
  }

  .addusermanagement .header-top p {
    font-size: 14px;
  }

  .addusermanagement .content {
    border: 1px solid #ccc;
  }

  .addusermanagement .account_set .el-form-item {
    margin-bottom: 10px;
  }

  .addusermanagement .el-table_1_column_3 .cell {
    text-align: left;
    padding-left: 40px;
  }

  .addusermanagement .el-table td, .addusermanagement .el-table th {
    text-align: center;
  }

  .addusermanagement i {
    cursor: pointer;
  }

  .addusermanagement .el-dialog__footer {
    text-align: center;
  }

  .addusermanagement .padding-20 {
    padding: 40px;
  }

  .addusermanagement .margin-10 {
    margin: 10px;
  }

  .addusermanagement .footer-btn {
    text-align: center;
  }

  .addusermanagement .content_top {
    margin-top: 40px;
  }

  .addusermanagement >>> .el-table .warning-row {
    background: #f9f9f9;
  }

  /*手风琴样式*/
  .addusermanagement >>> .el-collapse-item__arrow {
    display: none;
  }

  .addusermanagement >>> .el-collapse-item__header {
    height: 30px;
    border: 0;
  }

  .addusermanagement >>> .el-collapse {
    margin: 0 20px;
    border: 0;
  }

  .addusermanagement >>> .el-collapse-item__wrap {
    border: 0;
  }

  .addusermanagement .active {
    color: orange;
  }
</style>
