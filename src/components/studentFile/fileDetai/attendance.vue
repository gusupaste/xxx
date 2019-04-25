<template>
    <div class="school-attendance">
        <p>考勤详细概况：</p>
        <div class="local-month mt10">
            当月出勤率：<span class="red">0%   </span> ； 4月已过 <span class="red">16 </span> 个工作日   ；  当月有 <span class="red">21  </span> 个工作日
        </div>
        <div class="text-align-center">
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
</template>
<style lang="" scoped>
    .school-attendance .local-month {
        background-color:rgba(255, 152, 0, 0.14);
        padding: 15px;
        color:#101010;
        border: 1px solid #e3e3e3;
    }
     .school-attendance  .calendar-datail{
        border: 1px solid #bbb;
        color: #101010;
        margin-top: 20px;
        padding: 10px;
    }
    .school-attendance .calendar-suqre {
       display: inline-block;
       width:10px;
       height:10px;
    }
    .school-attendance .new-calendar-modal >>> .school-calendar {
        padding: 10px 10px 10px 100px;
    }
    .school-attendance  >>> .wh_container {
        width: 80%;
        
        display: inline-block;
        margin: 0 auto;
        border: 1px solid #d9d9d9;
        /* padding: 5px; */
    }
    .school-attendance  >>> .wh_content:nth-child(2) {
        background-color: #f7f7f7;
        border: 1px solid #d9d9d9;
    }
    .school-attendance  >>> .wh_content_all[data-v-2ebcbc83] {
        background-color: #fff;
    }
    .school-attendance  >>> .wh_item_date {
       color:#101010;
       font-size: 12px;
    }
    .school-attendance  >>> .wh_content_item {
       color:#101010;
       font-size: 12px;
    }
    .school-attendance  >>> .wh_content {
       padding: 0;
    }
    .school-attendance >>> .wh_top_changge li {
        color:#101010;
    }
</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    data() {
        return {
            
        }
    },
    components:{
        Calendar
    }
}
</script>