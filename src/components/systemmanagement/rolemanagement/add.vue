<template>
  <div class="rolemanagementadd wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">新增角色</span></p>
    </div>
    <div class="content">
      <p>
        <span>角色名称：</span>
        <el-input v-model="rolename" placeholder="请输入"></el-input>
      <hr hidden>
      <span>角色描述：</span>
      <el-input v-model="roledesc" placeholder="请输入"></el-input>
      </p>
      <hr class="line-solid">
      <p>被赋予该角色的系统用户：<a class="orange " @click="addUser"><i class="fa fa-plus"></i>&nbsp;添加用户</a></p>
      <template>
        <el-table
          :data="userCheckList"
          border
          empty-text=" "
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
      <div class="footer-btn">
        <button class="btn bg-grey" style="margin: 50px" @click="back">取消</button>
        <button class="btn bg-green" @click="saveRole">保存</button>
      </div>
    </div>
    <!--添加 弹框-->
    <el-dialog title="添加用户" :visible.sync="adduser" width="50%" style="padding: 30px 60px;">
      <p class="dialog-title">
        <span>员工姓名：</span>
        <el-input type="text" v-model="display_name" placeholder="请输入"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span></p>
      <template>
        <el-table
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
          empty-text=" "
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="display_name"
            label="员工姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </template>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="adduser = false">取 消</el-button>
          <el-button type="success" @click="checkedUser">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rolename: '',
        roledesc: '',
        adduser: false,
        display_name: '',
        userList: [],
        userCheckListVal: [],
        userCheckList: [],
        boxData: [],
        checkedValue: [],
        permissions_ids: []
      }
    },
    mounted: function () {
      this.getSystemPermission();
    },
    watch: {
      checkedValue: function (new_v, old_v) {
        this.permissions_ids = this.checkedValue;
      }
    },
    methods: {
      getSystemPermission: function () {
        this.loading = true;
        var url = 'http://134.175.93.59:8000/api/user/permissions_management/';
        this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjQyMTY2ODgsImVtYWlsIjoiIn0.GkEafYnVxpwQM6PrvFWzwlaNVUmpFl3QDbX9nQd6F8M',
          }
        }).then(res => {
          this.loading = false;
          if (res.data.status == 1) {
            this.boxData = res.data.data;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      addUser: function () {
        this.adduser = true;
        this.searchList();
      },
      handleSelectionChange(val) {
        this.userCheckListVal = val;
      },
      searchList: function () {
        this.loading = true;
        var url = 'http://134.175.93.59:8000/api/user/users_management/all_users/?display_name=' + this.display_name;
        this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjQyMTY2ODgsImVtYWlsIjoiIn0.GkEafYnVxpwQM6PrvFWzwlaNVUmpFl3QDbX9nQd6F8M',
          }
        }).then(res => {
          this.loading = false;
          if (res.data.status == 1) {
            this.userList = res.data.data;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      checkedUser: function () {
        this.adduser = false
        this.userCheckList = this.userCheckListVal
      },
      saveRole: function () {
        this.loading = true
        let newList = []
        var oldList = this.userCheckList
        for (var i = 0; i < oldList.length; i++) {
          newList.push(oldList[i].id)
        }
        var url = 'http://134.175.93.59:8000/api/user/roles_management/'
        this.$axios.post(url, {
          name: this.rolename,
          description: this.roledesc,
          status: this.$route.query.status,
          user_ids: newList,
          permissions_ids: this.permissions_ids
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
      handleChange: function (val) {
        var liList = document.getElementsByName('selectColor')
        for (var i = 0; i < liList.length; i++) {
          liList[i].style.color = ''
          for (var j = 0; j < val.length; j++) {
            if (i === val[j]) {
              liList[i].style.color = 'orange'
              break
            }
          }
        }
      },
      back: function () {
        this.$router.push({name: 'rolemanagement'})
      }
    }
  }
</script>

<style scoped>

  .rolemanagementadd .line-solid {
    width: 100%;
    text-align: center;
    color: #ccc;
  }

  .rolemanagementadd p {
    padding: 10px 0;
  }

  /*手风琴样式*/
  .rolemanagementadd >>> .el-collapse-item__arrow {
    display: none;
  }

  .rolemanagementadd >>> .el-collapse-item__header {
    height: 30px;
    border: 0;
  }

  .rolemanagementadd >>> .el-collapse {
    margin: 0 20px;
    border: 0;
  }

  .rolemanagementadd >>> .el-collapse-item__wrap {
    border: 0;
  }

  /*表格内容居中*/
  .rolemanagementadd >>> .el-table td, .rolemanagementadd >>> .el-table th {
    text-align: center;
  }

  .rolemanagementadd .footer-btn {
    text-align: center;
  }

  .rolemanagementadd >>> .el-input {
    width: 164px;
  }
</style>
