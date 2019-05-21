<template>
  <div>
    <div class='homePage_menu' >
        <div class="clearfix" style="background-color: #0b6289">
          <div class="head-menu">
            <img src="../../assets/img/logo.png" alt="">
            <div class="menuwrap" style="width:890px">
              <el-menu
                :default-active="$route.path"
                @select="handleSelect"
                class="el-menu-demo"
                mode="horizontal"

                background-color="#0b6289"
                text-color="#fff"
                active-text-color="#fff"
                router>
            <!-- 首页 -->
            <el-menu-item index="/home" route="/home" >首页</el-menu-item>
            <!-- 入学管理 -->
            <el-submenu index="/entranceManage" v-if="permission['enrollment-management']['enrollment-management-show']">
              <template slot="title">入学管理</template>
              <el-menu-item index="/entranceManage/intentional-admission" route="/entranceManage/intentional-admission">意向入学缴费</el-menu-item>
              <el-menu-item index="/entranceManage/admission-registration" route="/entranceManage/admission-registration">预备生入园登记</el-menu-item>
            </el-submenu>
            <!-- 校园 -->
            <el-submenu index="/school" v-if="permission.campus['campus-show']">
                <template slot="title">校园</template>
                <el-menu-item index="/school/intercity-list" route="/school/intercity-list">城际列表</el-menu-item>
                <el-menu-item index="/school/school-list" route="/school/school-list">校园列表</el-menu-item>
                <el-menu-item index="/school/discountbudget-list" route="/school/discountbudget-list">校园折扣预算</el-menu-item>
                <el-menu-item index="/school/enrollmentnumber-list" route="/school/enrollmentnumber-list">校园招生目标数</el-menu-item>
                <el-menu-item index="/school/revenuetarget-list" route="/school/revenuetarget-list">校园收入目标</el-menu-item>
            </el-submenu>
            <!-- 学生档案 -->
            <el-menu-item v-if="permission['student-archives']['student-archives-show']" index="/studentFile/studentFileList" route="/studentFile/studentFileList">学生档案</el-menu-item>
            <!-- 家长信息 -->
            <el-menu-item v-if="permission['parent-information']['parent-information-show']" index="/parentInfo" route="/parentInfo">家长信息</el-menu-item>
            <!-- 学生考勤集团 -->
            <el-menu-item v-if="permission['student-attendance-hq']['student-attendance-hq-show']" index="/studentattendance/survey" route="/studentattendance/survey">学生考勤</el-menu-item>
            <!-- 学生考勤校园 -->
            <el-submenu index="5" v-if="permission['student-attendance-campus']['student-attendance-campus-show']">
              <template slot="title">学生考勤</template>
              <el-menu-item index="/studentattendance/attendanceDaily" route="/studentattendance/attendanceDaily">每日考勤</el-menu-item>
              <el-menu-item index="/studentattendance/attendanceStatistics" route="/studentattendance/attendanceStatistics">考勤统计</el-menu-item>
            </el-submenu>
            <!-- 财务处理 -->
            <el-submenu index="6" v-if="permission['finance']['finance-show']">
              <template slot="title">财务处理</template>
              <el-menu-item index="/financemanagement/charge" route="/financemanagement/charge">收费账单</el-menu-item>
              <el-menu-item index="/financemanagement/policy" route="/financemanagement/policy">收费政策(校园)</el-menu-item>
              <el-menu-item index="/financemanagement/billMaking" route="/financemanagement/billMaking">账单制作(校园)</el-menu-item>
              <el-menu-item index="/financemanagement/paymentprocessing" route="/financemanagement/paymentprocessing">缴费处理(校园)</el-menu-item>
              <el-menu-item index="/financemanagement/refund" route="/financemanagement/refund">退费账单</el-menu-item>
              <el-menu-item index="/financemanagement/discountApplication" route="/financemanagement/discountApplication">折扣申请</el-menu-item>
              <el-menu-item index="/financemanagement/reservefund" route="/financemanagement/reservefund">备用金管理</el-menu-item>
              <el-menu-item index="/financemanagement/reservefund-school" route="/financemanagement/reservefund-school">备用金管理(校园)</el-menu-item>
              <el-menu-item index="/financemanagement/discount" route="/financemanagement/discount">学生折扣</el-menu-item>
              <el-menu-item index="/financemanagement/parentbusinessapplication" route="/financemanagement/parentbusinessapplication">家长业务申请查询</el-menu-item>
              <el-menu-item index="/financemanagement/setting" route="/financemanagement/setting">财务设置</el-menu-item>
              <el-menu-item index="/financemanagement/revenueList" route="/financemanagement/revenueList">收入确认</el-menu-item>
              <el-menu-item index="/financemanagement/refund-manage" route="/financemanagement/refund-manage">退费管理（校园）</el-menu-item>
            </el-submenu>
            <!-- 工作流 -->
            <el-menu-item v-if="permission['workflow']['workflow-show']" index="/workflow/list" route="/workflow/list">工作流</el-menu-item>
            <!-- 学生管理 -->
            <el-menu-item v-if="permission['student-management']['student-management-show']" index="/studentManage/student-list" route="/studentManage/student-list">学生管理</el-menu-item>
            <!-- 系统管理 -->
            <el-submenu index="7" v-if="permission['system-management']['system-management-show']">
              <template slot="title">系统管理</template>
              <el-menu-item index="/systemmanagement/brand-management" route="/systemmanagement/brand-management">品牌管理</el-menu-item>
              <el-menu-item index="/systemmanagement/academic-year" route="/systemmanagement/academic-year">学年定义</el-menu-item>
              <el-menu-item index="/systemmanagement/settlement-area" route="/systemmanagement/settlement-area">结算区间定义</el-menu-item>
              <el-menu-item index="/systemmanagement/processDefinition" route="/systemmanagement/processDefinition">流程定义</el-menu-item>
              <el-menu-item index="/systemmanagement/usermanagement" route="/systemmanagement/usermanagement">用户管理</el-menu-item>
              <el-menu-item index="/systemmanagement/rolemanagement" route="/systemmanagement/rolemanagement">角色管理</el-menu-item>
              <el-menu-item index="/schoolCalendarList" route="/schoolCalendarList">校日历管理</el-menu-item>
            </el-submenu>
            <!-- 校日历 -->
            <el-menu-item v-if="permission['school-calendar']['school-calendar-show']" index="/newschoolCalendar" route="/newschoolCalendar">校日历</el-menu-item>
            </el-menu>
            </div>
            <div class="userInfo bg-dark-blue">
              <span>
                {{name}}，你好
              </span>
              <i style="cursor:pointer" class="orange fa fa-power-off font-size-20" @click="logout"></i>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      active:"",
      name:'',
      permission:{}
    }
  },
  created(){
    this.getActive();
    this.getInfo();
  },
  methods:{
      /**登出 */
      logout(){
        this.$cookies.remove('token');
        this.$cookies.remove('userInfo');
        this.$cookies.remove('key');
        this.$router.push('/login');
      },
      getActive(){
        if(this.$cookies.get('key') !== null) {
          this.active =  this.$cookies.get('key');
        } else {
          this.active = '/home';
        }
      },
      getInfo(){
          console.log(this.$cookies.get('userInfo'))
        if(this.$cookies.get('userInfo') !== null) {
          this.name =  this.$cookies.get('userInfo').fullname;
          this.permission =  this.$cookies.get('userInfo').user_permissions;
        }
      },
      success(res){
        this.premission = res;
      },
      handleSelect(key, keyPath) {
        localStorage.removeItem('tabName');
        console.log(key,keyPath)
        this.$cookies.set('key',key);
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
  .homePage_menu .menuwrap {
    border-bottom:none;
    position: absolute;
    left: 180px;
    width: 800px;
    overflow: auto;
  }
  .homePage_menu .el-menu.el-menu--horizontal {
    /* width: 10000px; */
  }
  .homePage_menu .el-menu-item ,.el-submenu{
    width: 90px;
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
  .homePage_menu .userInfo span {
    font-size: 14px;
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
