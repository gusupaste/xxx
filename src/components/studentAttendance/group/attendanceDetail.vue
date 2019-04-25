<template>
    <div class="wrap attendanceDetail">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 学生考勤 > <span class="font-cl-blue">考勤详情</span></p>
        </div>
        <el-form class="mt10" label-width="120px" :model="formLabelAlign" inline="">
            <el-form-item label="考勤日期：">
                <span>2019/09/09</span>
            </el-form-item>
            <el-form-item label="班级：">
                <span>2019/09/09</span>
            </el-form-item>
            <el-form-item label="学生：">
                <el-select v-model="formLabelAlign.name"></el-select>
            </el-form-item>
            <el-form-item>
                <el-button v-model="formLabelAlign.name" type="primary">搜索</el-button>
            </el-form-item>

        </el-form>
        
        <el-container class="school-attendance mt10">
            <el-aside width="100%">
                <p>考勤详细概况：</p>
                <div class="local-month mt10">
                    当月出勤率：<span class="red">0%   </span> ； 4月已过 <span class="red">16 </span> 个工作日   ；  当月有 <span class="red">21  </span> 个工作日
                </div>
                <div style="width:80%;margin:0 auto">
                    <div class="mt10 text-align-center">
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
                </div>
            </el-aside>
            
        </el-container>
        <div>
            
            
            
        </div>
    </div>
</template>
<style scoped>
    .attendanceDetail .el-form {
        border-bottom: 1px solid #ccc;
    }
    .attendanceDetail .local-month {
        background-color:rgba(255, 152, 0, 0.14);
        padding: 15px;
        color:#101010;
        border: 1px solid #e3e3e3;
    }
     .attendanceDetail  .calendar-datail{
        border: 1px solid #bbb;
        color: #101010;
        margin-top: 20px;
        padding: 10px;
    }
    .attendanceDetail .calendar-suqre {
       display: inline-block;
       width:10px;
       height:10px;
    }
    .attendanceDetail .new-calendar-modal >>> .school-calendar {
        padding: 10px 10px 10px 100px;
    }
    .attendanceDetail  >>> .wh_container {
        width: 100%;
        display: inline-block;
        margin: 0 auto;
        border: 1px solid #d9d9d9;
    }
    .attendanceDetail >>> .wh_content:nth-child(2) {
        background-color: #f7f7f7;
        border: 1px solid #d9d9d9;
    }
    .attendanceDetail  >>> .wh_content_all[data-v-2ebcbc83] {
        background-color: #fff;
    }
    .attendanceDetail  >>> .wh_item_date {
       color:#101010;
       font-size: 12px;
    }
    .attendanceDetail  >>> .wh_content_item {
       color:#101010;
       font-size: 12px;
    }
    .attendanceDetail  >>> .wh_content {
       padding: 0;
    }
    .attendanceDetail >>> .wh_top_changge li {
        color:#101010;
    }
    .attendanceDetail >>> .wh_container {
        max-width: 100%;
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
