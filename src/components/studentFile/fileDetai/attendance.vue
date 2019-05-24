<template>
    <div class="school-attendance">
        <p>考勤详细概况：</p>
        <div class="local-month mt10">
          <!--<span class="font-size-20 bold">{{student_name}} </span><span style="margin: 10px">|</span>
          应出勤天数：<span class="font-size-20 orange">{{should_att}}</span> 个工作日 ；
          实际出勤天数：<span class="font-size-20 orange">{{att_num}}</span> 个工作日 ；
          出勤率：<span class="font-size-20 orange">{{attendance_rate}}</span>-->

          当月出勤率：<span class="red">{{attendance_rate}}</span> ； 当月已过
          <span class="red">{{att_num}}</span> 个工作日   ；  当月有
          <span class="red">{{should_att}}</span> 个工作日
        </div>
        <div class="text-align-center">
          <calendar ref="calendar"
                    :markDateMore='attendance'
          ></calendar>
        </div>
        <div class="calendar-datail">
            <p>考勤日期说明</p>
            <div>
                <!--<span style="background-color:#e51c23" class="calendar-suqre"></span>
                <span class="mr26">请假</span>
                <span style="background-color:#ff9800" class="calendar-suqre"></span>
                <span class="mr26">补登</span>
                <span style="background-color:#8BC34A" class="calendar-suqre"></span>
                <span class="mr26">正常出勤</span>-->
              <span style="background-color:#f28e91" class="calendar-suqre"></span>
              <span class="mr26">事假</span>
              <span style="background-color:#ffcc80" class="calendar-suqre"></span>
              <span class="mr26">病假</span>
              <span style="background-color:#c5e1a5" class="calendar-suqre"></span>
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
    .school-attendance >>> .mark0 {
       background-color: white;
     }

    .school-attendance >>> .mark1 {
      background-color: #c5e1a5;
    }

    .school-attendance >>> .mark2 {
      background-color: #ffcc80;
    }

    .school-attendance >>> .mark3 {
      background-color: #f28e91;
    }

    .school-attendance >>> .mark4 {
      background-color: #9fa8da;
    }

</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    props:{
      activeName:{
        type:String,
        request:true,
      }
    },
    data() {
        return {
          student_id:this.$route.params.id,
          attendance_rate:'',
          att_num:'',
          should_att:'',
          attendance:[],
        }
    },
    components:{
        Calendar
    },
    mounted:function(){
      if(localStorage.getItem('tabName') === 'seventh'){
        this.getStudentAttend();
      }
    },
    methods:{
      getStudentAttend:function () {
        var date = new Date();
        var month = date.getMonth()+1;
        var x = month;
        if(month < 10){
          x = '0' + month;
        }
        var att_date = date.getFullYear() + '-' + x + '-01';
        var url = '/api/attendance/students_attendance/student_attendance_annotate/?student_id='+this.student_id+'&attendance_date='+att_date;
        this.$axios.get(url, {}).then(res => {
          this.loading = false;
          this.should_att = res.data.report_data.total_workday
          this.att_num = res.data.report_data.passed_workday
          this.attendance_rate = res.data.report_data.present_rate;
          if (res.status === 200) {
            var dates = res.data.day_list;
            for(var x in dates){
              var data = {};
              data.date = dates[x].date;
              if(dates[x].className === -1){
                data.className = 'mark0';
              }else if(dates[x].className === 0){
                data.className = 'mark1';
              }else if(dates[x].className === 1){
                data.className = 'mark2';
              }else if(dates[x].className === 2){
                data.className = 'mark3';
              }else if(dates[x].className === 3){
                data.className = 'mark4';
              }
              this.attendance.push(data);
            }
            this.$nextTick(() => {
              this.$refs.calendar.ChoseMonth(this.months)
            });
          }
        }).catch(err => {
          console.log(err)
        })
      },
    },
    watch:{
      activeName: {
        handler(newValue, oldValue) {
          if(newValue === 'seventh'){
            this.getStudentAttend();
          }
        },
        deep: true
      },
    }
}
</script>
