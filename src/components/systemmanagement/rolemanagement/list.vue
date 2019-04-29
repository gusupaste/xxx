<template>
  <div class="rolemanagement wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">角色管理</span></p>
    </div>
    <div class="header-top">
      <div class="list-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总部" name="first">
            <span class="right"><el-button class="orange" type="text" @click="addRole"><i
              class="fa fa-plus-square"></i>&nbsp;新增角色</el-button></span>
            <el-table
              :data="roleList"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="name"
                label="角色名称">
              </el-table-column>
              <el-table-column
                prop="description"
                label="角色描述">
                <template slot-scope="scope">
                  <a class="font-cl-blue" @click="editRole">{{scope.row.description}}</a>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="校园" name="second">
            <span class="right"><el-button class="orange" type="text" @click="addRole"><i
              class="fa fa-plus-square"></i>&nbsp;新增角色</el-button></span>
            <el-table
              :data="roleList"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="name"
                label="角色名称">
              </el-table-column>
              <el-table-column
                prop="description"
                label="角色描述">
                <template slot-scope="scope">
                  <a class="font-cl-blue" @click="editRole">{{scope.row.description}}</a>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first',
        status: 0,
        roleList: [],
      }
    },
    mounted: function () {
      this.getRoleList()
    },
    methods: {
      addRole: function () {
        this.$router.push({name: 'rolemanagement-add', query: {status: this.status}})
      },
      getRoleList: function () {
        this.loading = true;
        var url = 'http://134.175.93.59:8000/api/user/roles_management/?status=' + this.status;
        this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjQyMTY2ODgsImVtYWlsIjoiIn0.GkEafYnVxpwQM6PrvFWzwlaNVUmpFl3QDbX9nQd6F8M',
          }
        }).then(res => {
          this.loading = false
          if (res.data.status === 1) {
            this.roleList = res.data.data
            console.log(this.roleList)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleClick: function (obj) {
        this.status = obj.index
        this.getRoleList()
      }
    }
  }
</script>

<style scoped>
  .rolemanagement {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .rolemanagement >>> .select-header, .rolemanagement .list-content {
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }

  .rolemanagement >>> .el-select {
    width: 10%;
  }

  .rolemanagement >>> .el-tabs__item {
    width: 150px;
    text-align: center;
  }

  .rolemanagement >>> .el-tabs__item.is-active {
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }

  .rolemanagement >>> .el-table td, .el-table th {
    text-align: center;
  }

  .rolemanagement >>> .el-tabs__active-bar {
    background-color: #ED6C2E;
    width: 0px !important;
  }

  .rolemanagement >>> .el-tabs__item:hover {
    color: #ED6C2E;
  }

  .rolemanagement >>> .el-tabs__item {
    padding: 0 0 !important;
  }

  .rolemanagement >>> .el-tabs__nav-scroll {
    padding-left: 50%;
  }

  .rolemanagement >>> #tab-first {
    margin-left: -150px;
  }

  .rolemanagement .el-tabs__active-bar is-top {
    width: 0px !important;
  }

  .rolemanagement >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }

  .rolemanagement >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    text-align: center !important;
  }

  .rolemanagement >>> .el-input__inner {
    width: -webkit-fill-available;
  }
</style>
