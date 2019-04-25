<template>
    <div class="wrap attendanceSurvey">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">学生考勤</span></p>
        </div>
        <el-form class="mt10" label-width="80px" :model="formLabelAlign" inline="">
            <el-form-item label="城际：">
                <el-select v-model="formLabelAlign.name"></el-select>
            </el-form-item>
            <el-form-item label="区域：">
                <el-select v-model="formLabelAlign.name"></el-select>
            </el-form-item>
            <el-form-item label="省市：">
                <el-select v-model="formLabelAlign.name"></el-select>
            </el-form-item>
            <el-form-item label="品牌：">
                <el-select v-model="formLabelAlign.name"></el-select>
            </el-form-item>
            <el-form-item label="校园">
                <el-select v-model="formLabelAlign.name"></el-select>
            </el-form-item>
            <el-form-item>
                <el-button v-model="formLabelAlign.name" type="primary">搜索</el-button>
            </el-form-item>

        </el-form>
        
        <el-container class="school-attendance mt10">
            <el-aside width="70%">
                <p>考勤详细概况：</p>
                <div class="local-month mt10">
                    当月出勤率：<span class="red">0%   </span> ； 4月已过 <span class="red">16 </span> 个工作日   ；  当月有 <span class="red">21  </span> 个工作日
                </div>
                 <el-table
                    class="mt10"
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="班级"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="应到学生数"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="当前实际签到数">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="出勤率">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作">
                        <template slot-scope="scope">
                            <router-link to="/studentattendance/detail/9">
                                <i class="fa fa-search green font-size-20 cur"></i>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-aside>
            <el-main width="20%">
                <p>当月校日历：</p>
                <div class="mt10">
                    <calendar></calendar>
                </div>
                <div class="calendar-datail">
                    <p>考勤日期说明</p>
                    <div>
                        <span style="background-color:#e51c23" class="calendar-suqre"></span>
                        <span class="mr26">请假</span>
                        <span style="background-color:#ff9800" class="calendar-suqre"></span>
                        <span class="mr26">补登</span>
                        <span style="background-color:#8BC34A" class="calendar-suqre"></span>
                        <span class="mr26">正常出勤</span>
                    </div>
                </div>
            </el-main>
        </el-container>
        <div>
            
            
            
        </div>
    </div>
</template>
<style scoped>
    .attendanceSurvey .el-form {
        border-bottom: 1px solid #ccc;
    }
    .attendanceSurvey .local-month {
        background-color:rgba(255, 152, 0, 0.14);
        padding: 15px;
        color:#101010;
        border: 1px solid #e3e3e3;
    }
     .attendanceSurvey  .calendar-datail{
        border: 1px solid #bbb;
        color: #101010;
        margin-top: 20px;
        padding: 10px;
    }
    .attendanceSurvey .calendar-suqre {
       display: inline-block;
       width:10px;
       height:10px;
    }
    .attendanceSurvey .new-calendar-modal >>> .school-calendar {
        padding: 10px 10px 10px 100px;
    }
    .attendanceSurvey  >>> .wh_container {
        width: 100%;
        display: inline-block;
        margin: 0 auto;
        border: 1px solid #d9d9d9;
    }
    .attendanceSurvey >>> .wh_content:nth-child(2) {
        background-color: #f7f7f7;
        border: 1px solid #d9d9d9;
    }
    .attendanceSurvey  >>> .wh_content_all[data-v-2ebcbc83] {
        background-color: #fff;
    }
    .attendanceSurvey  >>> .wh_item_date {
       color:#101010;
       font-size: 12px;
    }
    .attendanceSurvey  >>> .wh_content_item {
       color:#101010;
       font-size: 12px;
    }
    .attendanceSurvey  >>> .wh_content {
       padding: 0;
    }
    .attendanceSurvey >>> .wh_top_changge li {
        color:#101010;
    }
</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    data(){
        return {
            formLabelAlign: {
            name: '',
            region: '',
            type: ''
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    components:{
        Calendar
    },
    methods:{
         onSubmit() {
            console.log('submit!');
      }
    }
}
</script>
