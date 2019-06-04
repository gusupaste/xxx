<template>
    <div class="homeView">
        <div class='big-bg'>
            <div class="logo_name">北京伊顿教育集团管理系统</div>
        </div>
        <div class="wrap clearfix" style="min-width:1200px">
            <div class="user_search_wrap left">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="学生查询" name="first">
                        <div>
                            <student-list></student-list>
                        </div> 
                        <div class="to_do-list">
                            <work-flow></work-flow>    
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="家长查询" name="second">
                        <parent></parent>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="school_calendar left">
                <school-calendar></school-calendar>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .homeView .big-bg {
        background:url('../../assets/img/login-bg.png') no-repeat;
        width: 100%;
        height: 150px;
        background-position:0 -374px;
        position: relative;
        line-height: 150px;
        color:#fff;
        font-size: 35px;
        letter-spacing: 5px;
    }
    .homeView .user_search_wrap {
        width: 70%;
        text-align: left;
    }
    .homeView .logo_name {
        font-size: 24px;
    }
    .homeView >>>.w250_input .el-input__inner{
      width: 165px !important;
    }
    .homeView >>> .school_calendar {
        text-align: left;
        margin-left: 2%;
        width: 315px;
    }
    .homeView >>> .wh_content_item {
        width: 35px !important;
        height: 30px;
    }
    .homeView >>>.viewAll{
        text-align: center;
        height: 36px;
        line-height: 36px;
        background-color: #fafafa;
        border-top: 1px solid #ccc;
        cursor: pointer;
    }
    .homeView >>>.wh_other_dayhide{
        display: none;
    }
    .homeView >>> .calendar_border{
        border: 1px solid #ccc;
        -webkit-box-shadow: #ccc 0px 0px 3px;
        -moz-box-shadow: #ccc 0px 0px 3px;
        box-shadow: #ccc 0px 0px 3px;
        margin-top: 10px;
        font-size: 12px !important;
    }
    .homeView >>> .cal-wrapper{
       width: 100%;
       padding: 0;
    }
    .homeView >>> .wh_content:nth-child(2){
       background-color: #fff !important;
       border:none !important;
    }
    .homeView >>> .wh_content:nth-child(2) .wh_content_item{
       color:#28779a !important;
    }
    .homeView >>> .wh_top_changge {
       display: none !important;
    }
    .homeView >>> .cal-body{
       padding: 0 30px;
    }
    .homeView >>> .wh_container{
       border:none !important;
       min-width: 250px !important;
       min-height: 250px !important;
    }
    .homeView >>>.dates  .date-num{
       font-size: 12px !important;
       line-height: 30px;
    }
    .homeView >>>.calendar_border  img{
       width: 100%;
       margin: 0 auto;
    }
    .homeView >>> .cal-header{
      display: none;
    }
    .homeView >>> .el-form-item{
      margin-bottom: 10px;
    }
    .homeView >>>.calendarYear {
        text-align: center;
        margin-top: 20px;
        font-weight: 600;
        font-size: 16px;
    }
    .homeView >>>.calendarMonth {
        font-size: 30px;
        color:#f17128;
        text-align: center;
        margin-top: 5px;
    }
    .homeView >>> .el-table__empty-text {
        color:#E51C23;
        width: 98%;
        text-align: left;
    }
    .homeView >>> .has-gutter >>> th {
        background-color: #f5f5f5;
    }
    .homeView >>> .to_do-list {
        border-top: 1px solid #ccc;
        padding-top: 20px;
        margin-top: 10px;
    }
</style>
<script>
import parent from "./components/parentList";
import workFlow from "./components/workFlow";
import schoolCalendar from "./components/schoolCalendar";
import studentList from "./components/studentList";
export default {
    data() {
        return {
            activeName: 'first',
        }
    },
    created () {

    },
    methods:{
        handleClick(tab, event) {
        // console.log(tab, event);
        }
    },
    components:{
        parent,
        workFlow,
        schoolCalendar,
        studentList
    },
    computed: {
    }
}
</script>
