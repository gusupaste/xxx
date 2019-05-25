<template>
  <div class="rolemanagementadd wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">新增角色</span></p>
    </div>
    <div class="content">
      <p>
        <span class="red">*&nbsp;</span><span>角色名称：</span>
        <el-input :class="{border_red: error_border_rolename}" v-model="rolename" placeholder="请输入"></el-input>
      <div class="mb10" :style="error_message_rolename"><span
        style="visibility: hidden"><span>*&nbsp;</span>角色名称：</span>
        <span class="red">请输入角色名称</span></div>
      <hr hidden>
      <span style="visibility: hidden">*&nbsp;</span><span>角色描述：</span>
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
          <el-collapse-item :name="index" >
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
                    <input type="checkbox" :disabled="scope.row.type !== 2 && scope.row.type != permission_status" v-model="checkedValue" :value="scope.row.id"/>
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
        <span class="padding-left-30"><el-button type="primary" @click="searchList(1)">搜索</el-button></span></p>
      <template>
        <el-table
          ref="multipleTable"
          :data="userList"
          tooltip-effect="dark"
          style="width: 100%"
          empty-text=" "
          @select="openDetails">
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
        <el-pagination
          background
          layout="prev,pager, next, jumper"
          next-text="下一页"
          :page-size="pagesize"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
          :total="total" class="page">
        </el-pagination>
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
        userCheckListVal: [],
        userCheckListValAll: [],
        userCheckList: [],
        adduser: false,
        display_name: '',
        userList: [],
        boxData: [],
        checkedValue: [],
        permissions_ids: [],
        id: 0,
        error_message_rolename: {
          display: 'none'
        },
        error_border_rolename: false,
        currentPage: 1,
        pagesize: 10,
        total: 1,
        role_type:0,
        addUserList:[],
        permission_status:Number(this.$route.query.status)
      }
    },
    created: function () {
      this.id = Number(this.$route.query.id);
      this.permission_status == 1 ? this.role_type = 3:this.role_type = 2;
      console.log(this.role_type)
      if (this.id !== 0) {
        this.getRole()
      }
      this.getSystemPermission()
    },
    watch: {
      checkedValue: function () {
        this.permissions_ids = this.checkedValue
      },
      currentPage: function () {
        this.searchList(this.currentPage)
      }
    },
    methods: {
      getRole: function () {
        this.loading = true
        var url = '/api/user/roles_management/' + this.id + '/role_info/'
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
          this.loading = false;
          if (res.data.status_code === 1) {
            res.data.data.forEach(item=>{
              if(item.type == 2 || item.type == this.permission_status){
                this.boxData.push(item)
              }
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      addUser: function () {
        this.searchList(1)
        this.adduser = true
        /*var arrList = [];
        for (var i = 0; i < this.userList.length; i++) {
          for (var j = 0; j < this.userCheckList.length; j++) {
            if (this.userList[i].id === this.userCheckList[j].id) {
              arrList.push(this.userList[i])
              break
            }
          }
        }
        this.toggleSelection(arrList)*/
      },
      searchList: function (val) {
        this.loading = true
        this.currentPage = val
        var url = '/api/user/users_management/all_users/?display_name=' + this.display_name + '&page=' + this.currentPage + '&size=' + this.pagesize + '&role_type=' + this.role_type
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.userList = res.data.data.results
            this.total = res.data.data.count;
            var arrList = [];
            for (var i = 0; i < this.userList.length; i++) {
              for (var j = 0; j < this.userCheckListValAll.length; j++) {
                if (this.userList[i].id === this.userCheckListValAll[j].id) {
                  arrList.push(this.userList[i])
                  break
                }
              }
            }
            this.toggleSelection(arrList)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      toggleSelection(rows) {  // 这里是点击时 切换选中的行
        this.$nextTick(() => {   // 延迟回调
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            });
            // toggleRowSelection : 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
          } else {
            this.$refs.multipleTable.clearSelection()
            // clearSelection : 用于多选表格，清空用户的选择
          }
        })
      },
      openDetails:function (row) {
        this.userCheckListVal = row;
        var index = row.length-1;
        this.userCheckListValAll.push(row[index]);
      },
      /*handleSelectionChange(val) {
        console.log();
        var flag = false;
        var index = -1;
        for(var x in val){
          for(var y in this.userCheckListValAll){
            if(val[x].id == this.userCheckListValAll[y]){
              flag = true;
              index = x;
            }
          }
        }
        if(flag == false && index != -1){
          this.userCheckListValAll.push(val[index]);
        }
          /!*this.userCheckListValAll.push(val[index]);*!/
        console.log(this.userCheckListValAll)
        /!*this.userCheckListVal = val*!/
        /!*console.log(this.userCheckListVal);*!/
        /!*this.addUserList.push(this.userCheckListVal);*!/
        /!*console.log(this.addUserList);*!/
        /!*this.userCheckListValAll = this.userCheckListValAll.concat(this.userCheckListVal);*!/
      },*/
      checkedUser: function () {
        this.adduser = false;
        this.userCheckList = [];
        this.userCheckList = this.userCheckList.concat(this.userCheckListValAll);
      },
      saveRole: function () {
        this.loading = true
        if (this.rolename === "") {
          this.error_message_rolename = {display: 'block'}
          this.error_border_rolename = true
          return
        }
        let newList = []
        var oldList = this.userCheckList
        for (var i = 0; i < oldList.length; i++) {
          newList.push(oldList[i].id)
        }
        var url = ''
        if (this.id === 0) {
          url = '/api/user/roles_management/'
        } else {
          url = '/api/user/roles_management/' + this.id + '/update_role/'
        }
        this.$axios.post(url, {
          name: this.rolename,
          description: this.roledesc,
          status: this.$route.query.status,
          user_ids: newList,
          permissions_ids: this.permissions_ids
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
    width: 145px;
  }

  .rolemanagementadd .border_red >>> .el-input__inner {
    border-color: red;
  }
</style>
