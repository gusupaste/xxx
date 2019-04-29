<template>
  <div id="app">
    <div class='homePage_menu' v-if="this.$route.name !== 'login'">
        <div class="clearfix" style="background-color: #0b6289">
          <div class="head-menu">
            <img src="./assets/img/logo.png" alt="">
            <el-menu
                :default-active="$route.path"
                @select="handleSelect"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#0b6289"
                text-color="#fff"
                active-text-color="#fff"
                router>
              <el-menu-item index="/home" route="/home" >首页</el-menu-item>
            <el-submenu index="/entranceManage" >
              <template slot="title">入学管理</template>
              <el-menu-item index="/entranceManage/intentional-admission" route="/entranceManage/intentional-admission">意向入学缴费</el-menu-item>
              <el-menu-item index="/entranceManage/admission-registration" route="/entranceManage/admission-registration">预备生入园登记</el-menu-item>
            </el-submenu>
            <el-submenu index="/school" >
                <template slot="title">校园</template>
                <el-menu-item index="/school/intercity-list" route="/school/intercity-list">城际列表</el-menu-item>
                <el-menu-item index="/school/school-list" route="/school/school-list">校园列表</el-menu-item>
                <el-menu-item index="/school/discountbudget-list" route="/school/discountbudget-list">校园折扣预算</el-menu-item>
                <el-menu-item index="/school/enrollmentnumber-list" route="/school/enrollmentnumber-list">校园招生目标数</el-menu-item>
                <el-menu-item index="/school/revenuetarget-list" route="/school/revenuetarget-list">校园收入目标</el-menu-item>
            </el-submenu>
              <el-menu-item index="/studentFile/studentFileList" route="/studentFile/studentFileList">学生档案</el-menu-item>
              <el-menu-item index="/parentInfo" route="/parentInfo">家长信息</el-menu-item>
              <el-menu-item index="/studentattendance/survey" route="/studentattendance/survey">学生考勤</el-menu-item>
            <el-submenu index="5">
              <template slot="title">学生考勤(2)</template>
              <el-menu-item index="/studentattendance/attendanceDaily" route="/studentattendance/attendanceDaily">每日考勤</el-menu-item>
              <el-menu-item index="/studentattendance/attendanceStatistics" route="/studentattendance/attendanceStatistics">考勤统计</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">财务处理</template>
              <el-menu-item index="/financemanagement/charge" route="/financemanagement/charge">收费账单</el-menu-item>
              <el-menu-item index="/financemanagement/policy" route="/financemanagement/policy">收费政策(校园)</el-menu-item>
              <el-menu-item index="/financemanagement/billMaking" route="/financemanagement/billMaking">账单制作(校园)</el-menu-item>
              <el-menu-item index="/financemanagement/paymentprocessing" route="/financemanagement/paymentprocessing">缴费处理(校园)</el-menu-item>
              <el-menu-item index="/financemanagement/refund" route="/financemanagement/refund">退费账单</el-menu-item>
              <el-menu-item index="/financemanagement/discountApplication" route="/financemanagement/discountApplication">折扣申请</el-menu-item>
              <el-menu-item index="/financemanagement/reservefund" route="/financemanagement/reservefund">备用金管理</el-menu-item>
              <el-menu-item index="/financemanagement/discount" route="/financemanagement/discount">学生折扣</el-menu-item>
              <el-menu-item index="/financemanagement/parentbusinessapplication" route="/financemanagement/parentbusinessapplication">家长业务申请查询</el-menu-item>
              <el-menu-item index="/financemanagement/setting" route="/financemanagement/setting">财务设置</el-menu-item>
            </el-submenu>
              <el-menu-item index="/workflow" route="/workflow">工作流</el-menu-item>
              <el-menu-item index="/studentManage/student-list" route="/studentManage/student-list">学生管理</el-menu-item>
            <el-submenu index="7">
              <template slot="title">系统管理</template>
              <el-menu-item index="/systemmanagement/brand-management" route="/systemmanagement/brand-management">品牌管理</el-menu-item>
              <el-menu-item index="/systemmanagement/academic-year" route="/systemmanagement/academic-year">学年定义</el-menu-item>
              <el-menu-item index="/systemmanagement/settlement-area" route="/systemmanagement/settlement-area">结算区间定义</el-menu-item>
              <el-menu-item index="/systemmanagement/processDefinition" route="/systemmanagement/processDefinition">流程定义</el-menu-item>
              <el-menu-item index="/systemmanagement/usermanagement" route="/systemmanagement/usermanagement">用户管理</el-menu-item>
              <el-menu-item index="/systemmanagement/rolemanagement" route="/systemmanagement/rolemanagement">角色管理</el-menu-item>
              <el-menu-item index="/schoolCalendarList" route="/schoolCalendarList">校日历管理</el-menu-item>
            </el-submenu>
            </el-menu>
            <div class="userInfo">
              <span>集团端
                {{premission}}
                ，你好</span>
              <i style="cursor:pointer" class="orange el-icon-remove-outline" @click="logout"></i>
            </div>
          </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      active:localStorage.getItem('active') || '/home',
      premission: 8,
    }
  },
  mounted(){
    this.user_info();
  },
  methods:{
    user_info(){
        var pk = this.$store.state.user_Info.pk;
        if(!pk){
          // this.$store.state.user_Info = JSON.parse(localStorage.getItem('user_Info'));
          // this.$store.state.user_Token = localStorage.getItem('user_Token');
          // this.premission = this.$store.state.user_Info.type;
        }
      },

      logout(){
        this.$cookies.remove('token');
        this.$cookies.remove('userInfo');
        this.$router.push('/login');
      },
      success(res){
        this.premission = res;
      },
       handleSelect(key, keyPath) {
         localStorage.removeItem('tabName');
        //  localStorage.setItem('active',key);
        console.log(key, keyPath);
      }
  }
}
</script>

<style>
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
    position: absolute;
    left: 180px;
  }
  .homePage_menu .el-menu-item ,.el-submenu{
    width: 100px;
  }
  .el-submenu__icon-arrow , .el-icon-arrow-down {
    display: none;
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
  }
  .homePage_menu .is-active .el-submenu__title {
    background-color: #f17128 !important;
    border-bottom: none !important;
  }
  .el-menu--popup-bottom-start {
    margin-top:0 !important;
    background-color: #fff !important;
    border:1px solid #f17128 !important;
    color:#fff !important;
    border-top: 0 !important;
    padding: 0 10px;
  }
  .el-menu--popup-bottom-start li{
    margin-top:0 !important;
    background-color: #fff !important;
    color:#666 !important;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title {
    color:#f17128 !important;
  }
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
    min-width: 0;
  }
</style>
