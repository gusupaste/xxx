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
            <el-form-item label="所属组织：">
              <el-input></el-input>
            </el-form-item>
            <i class="fa fa-plus-square-o orange" @click="addOrganization" style="margin-top: 18px"></i>
          </el-form>
        </div>
      </div>
      <div class="content_top">
        <p class="bold_black">该用户被赋予的系统角色：</p>
        <div class="content">
          <el-table
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
                <i class="fa fa-search"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="content_top">
        <p class="bold_black">管辖幼儿园：</p>
        <div class="content padding-20">
          <el-checkbox-group v-model="schoolIds" @change="schoolIdsChange">
            <el-checkbox v-for="(item) in schoolList" :label="item.id" style="min-width: 230px">
              【<span>{{item.code}}</span>】<span>{{item.name}}</span></el-checkbox>
          </el-checkbox-group>
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
      }
    },
    mounted: function () {
      if (this.$route.query.id !== 0) {
        this.getUser()
      }
      this.getRoleList(0)
      this.getRoleList(1)
      this.getSchoolList()
    },
    methods: {
      getUser: function () {
        this.loading = true
        var url = 'http://134.175.93.59:8000/api/user/users_management/' + this.$route.query.id + '/user_info/'
        this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjQyMTY2ODgsImVtYWlsIjoiIn0.GkEafYnVxpwQM6PrvFWzwlaNVUmpFl3QDbX9nQd6F8M',
          }
        }).then(res => {
          this.loading = false
          if (res.data.status === 1) {
            var data = res.data.data
            this.display_name = data.display_name
            this.username = data.username
            this.password = data.password
            this.respassword = data.password
            this.first_name = data.first_name
            this.last_name = data.last_name
            this.email = data.email
            this.display_name = data.display_name
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getRoleList: function (status) {
        this.loading = true;
        var url = 'http://134.175.93.59:8000/api/user/roles_management/?status=' + status;
        this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjQyMTY2ODgsImVtYWlsIjoiIn0.GkEafYnVxpwQM6PrvFWzwlaNVUmpFl3QDbX9nQd6F8M',
          }
        }).then(res => {
          this.loading = false
          if (res.data.status === 1) {
            if (status === 0) {
              this.headquartersLength = res.data.data.length
            }
            this.roleList = this.roleList.concat(res.data.data)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getSchoolList: function () {
        this.loading = true;
        var url = 'http://134.175.93.59:8000/api/user/get_centers/';
        this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjQyMTY2ODgsImVtYWlsIjoiIn0.GkEafYnVxpwQM6PrvFWzwlaNVUmpFl3QDbX9nQd6F8M',
          }
        }).then(res => {
          this.loading = false
          if (res.data.status === 1) {
            this.schoolList = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex < this.headquartersLength) {
          return 'warning-row'
        }
        return ''
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
      addOrganization: function () {
        this.addorganization = true;
      },
      save: function () {
        this.loading = true
        if (this.password !== this.respassword) {
          alert("确认密码不一样")
          return
        }
        var url = ''
        if (this.$route.query.id === "0") {
          url = 'http://134.175.93.59:8000/api/user/users_management/'
        } else {
          url = 'http://134.175.93.59:8000/api/user/users_management/' + this.$route.query.id + '/update_users/'
        }
        this.$axios.post(url, {
          display_name: this.display_name,
          username: this.username,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          organization_list: [],
          account_type: 0,
          role_list: this.userIds,
          center_list: this.schoolIds
        }, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjQyMTY2ODgsImVtYWlsIjoiIn0.GkEafYnVxpwQM6PrvFWzwlaNVUmpFl3QDbX9nQd6F8M',
          }
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            alert('保存成功')
            this.back()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      back: function () {
        this.$router.push({name: 'usermanagement'})
      }
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
</style>
