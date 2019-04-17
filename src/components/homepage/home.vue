<template>
    <div class='homePage_menu'>
        <div class="clearfix" style="background-color: #0b6289">
          <div class="head-menu">
            <img src="/static/img/logo.png" alt="">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">校园</template>
                <el-menu-item index="2-1">城际列表</el-menu-item>
                <el-menu-item index="2-2">校园列表</el-menu-item>
                <el-menu-item index="2-3">校园折扣预算</el-menu-item>
                <el-menu-item index="2-4">校园招生目标数</el-menu-item>
                <el-menu-item index="2-5">校园收入目标</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">学生档案</el-menu-item>
            <el-menu-item index="4">家长信息</el-menu-item>
            <el-menu-item index="5">学生考勤</el-menu-item>
            <el-submenu index="6">
              <template slot="title">财务处理</template>
              <el-menu-item index="6-1">收费账单</el-menu-item>
              <el-menu-item index="6-2">退费账单</el-menu-item>
              <el-menu-item index="6-3">备用金管理</el-menu-item>
              <el-menu-item index="6-4">学生折扣</el-menu-item>
              <el-menu-item index="6-5">家长业务申请查询</el-menu-item>
              <el-menu-item index="6-6">财务设置</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">系统管理</template>
              <el-menu-item index="7-1">品牌管理</el-menu-item>
              <el-menu-item index="7-2">学年定义</el-menu-item>
              <el-menu-item index="7-3">结算区间定义</el-menu-item>
              <el-menu-item index="7-4">流程定义</el-menu-item>
              <el-menu-item index="7-5">用户管理</el-menu-item>
              <el-menu-item index="7-6">角色管理</el-menu-item>
              <el-menu-item index="7-7">校日历管理</el-menu-item>
            </el-submenu>
            </el-menu>
            <div class="userInfo"> 
              <span>集团端XXX，你好</span>
              <i class="orange el-icon-remove-outline"></i>
            </div>
          </div>
        </div>
    </div>
</template>
<style lang="">
  .homePage_menu .head-menu {
    margin: 0 auto;
    width: 90%;
    min-width: 1200px;
    position: relative;
    height: 60px;
  }
  .homePage_menu .head-menu img {
    position: absolute;
    left: 0;
    width: 150px;
    z-index: 999;
    top: 10px;
  }
  .homePage_menu .el-menu.el-menu--horizontal {
    border-bottom:none;
    background-color: #0b6289 !important;
    position: absolute;
    left: 180px;
  }
  .homePage_menu .el-menu-item {
    background-color: #0b6289 !important;
    width: 100px;
  }
  .homePage_menu .el-submenu__title {
    background-color: #0b6289 !important;
  }
  .homePage_menu .userInfo {
    color: #fff;
    height: 60px;
    line-height: 60px;
    position: absolute;
    right: 0;
  }
  .homePage_menu .is-active {
    background-color: #f17128 !important;
    border-bottom: none !important;
    color:#fff !important;
  }
  .homePage_menu .is-active .el-submenu__title {
    background-color: #f17128 !important;
    border-bottom: none !important;
    color:#fff !important;
  }
  /* .el-menu--popup-bottom-start {
    margin-top:0 !important;
    background-color: #fff !important;
    border:1px solid #f17128 !important;
    color:#fff !important;
  }
  .el-menu--popup-bottom-start li{
    margin-top:0 !important;
    background-color: #fff !important;
    color:#101010 !important;
    text-align: center;
    border-bottom: 1px solid #bbb;
  } */
</style>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>