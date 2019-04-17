<template>
    <div class='homePage'>
        <div>
            <img src="/static/img/logo.png" alt="" class="left">
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
              <el-submenu index="3">
                <template slot="title">学生档案</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">家长信息</template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
                <el-menu-item index="4-3">选项3</el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">学生考勤</template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项2</el-menu-item>
                <el-menu-item index="5-3">选项3</el-menu-item>
              </el-submenu>
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
<!--        <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        </el-menu>
        </div>
    </div>
</template>
<style lang="">

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
