<template>
    <div class="wrap viewClendar">
        <div class="header">
            <p class="local_path_style">You Are Here  ：校园 > 校园列表 > 开班概况 > <span class="font-cl-blue">查看校日历</span></p>
        </div>
        <div class="school-name mt10">
            校园名称：北京朝阳幼儿园
        </div>
        <div style="margin-top:20px">
            <span>班级类型：</span>
            <el-select v-model="value" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <span style="margin-left:20px">学年：</span>
            <el-select v-model="value" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </div>
        <div>
            <Calendar
                v-for="(i,index) in list"
                :key='index'
                v-on:choseDay="clickDay"
                v-on:changeMonth="changeDate"
                v-on:isToday="clickToday"
                :sundayStart="true"
                ></Calendar>
        </div>
        <div class="calendar-datail">
            <p>校日历日期说明</p>
            <div>
                <span style="background-color:#e51c23" class="calendar-suqre"></span>
                <span class="mr26">休息日</span>
                <span style="background-color:#ff9800" class="calendar-suqre"></span>
                <span class="mr26">职业发展日</span>
                <span style="background-color:#8BC34A" class="calendar-suqre"></span>
                <span class="mr26">寒暑假</span>
            </div>
        </div>
        <div style="margin-top:20px;text-align:center">
            <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
        </div>
    </div>
</template>
<style scoped>
    .viewClendar >>> .wh_container {
        width: 20%;
        margin-right: 4%;
        margin-top: 20px;
        display: inline-block;
        border: 1px solid #d9d9d9;
        /* padding: 5px; */
    }
    .viewClendar >>> .wh_content:nth-child(2) {
        background-color: #f7f7f7;
        border: 1px solid #d9d9d9;
    }
    .viewClendar >>> .wh_content_all[data-v-2ebcbc83] {
        background-color: #fff;
    }
    .viewClendar >>> .wh_item_date {
       color:#101010;
       font-size: 12px;
    }
    .viewClendar >>> .wh_content_item {
       color:#101010;
       font-size: 12px;
    }
    .viewClendar >>> .wh_content {
       padding: 0;
    }
    .viewClendar >>> .wh_content_all[data-v-2ebcbc83] li{
        color:#101010;
        font-size: 12px;
    }
    .viewClendar >>> .calendar-datail{
        border: 1px solid #bbb;
        margin-top: 20px;
        padding: 10px;
    }
    .viewClendar >>> .calendar-suqre {
       display: inline-block;
       width:10px;
       height:10px;
    }
</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    data(){
        return {
            list:[1,2,3,4,5,6,7,8,9,10,11,12],
            value:'shanghai'
        }
    },
    components: {
        Calendar
  }
}
</script>
