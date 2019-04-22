<template>
  <div class="usermanagement wrap">
    <div class="header">
      <p>YOU ARE HERE : 系统管理 >> <span class="font-cl-blue">用户管理</span></p>
      <p><span>角色：</span>
        <el-select style="width: 150px" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">搜索：</span>
        <el-input style="width: 250px" type="text" placeholder="请输入"></el-input>
        <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
        <span class="right"><el-button class="orange" type="text" @click="addUser"><i class="fa fa-plus-square"></i>&nbsp;新增用户</el-button></span>
      </p>
      <el-table
        :data="tableList"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="account"
          label="登陆账号">
        </el-table-column>
        <el-table-column
          prop="organization"
          label="所属组织">
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属角色">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <i @click="editDialog" class="fa fa-pencil-square-o orange"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        class:'',
        tableList: [{
          id: '1',
          username: '用户1',
          account: 'user@hhhhh.com',
          organization: '国家机构',
          role: '第一个角色',
        },
          {
            id: '1',
            username: '用户2',
            account: 'user@hhhhh.com',
            organization: '国家机构3',
            role: '第一个角色吧',
          },
          {
            id: '1',
            username: '用户3',
            account: 'user@hhhhh.com',
            organization: '教育机构',
            role: '第二个角色',
          }
        ]
      }
    },
    methods: {
      addUser:function () {
        this.$router.push({name: 'usermanagement-add'});
      }
    }
  }
</script>

<style>
  .usermanagement {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .usermanagement p {
    margin: 10px;
  }

  .usermanagement .header p {
    font-size: 14px;
  }
  .usermanagement .el-table td,.usermanagement .el-table th{
    text-align: center;
  }
  .usermanagement .el-dialog__footer{
    text-align: center;
  }
</style>
