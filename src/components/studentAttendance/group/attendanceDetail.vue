<template>
  <div class="wrap attendanceDetail">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 学生考勤 > <span class="font-cl-blue">考勤详情</span></p>
    </div>
    <el-form class="mt10" label-width="120px" :model="formLabelAlign" inline="">
      <el-form-item label="考勤日期：">
        <span id="span_date">{{date | formatDate}}</span>
      </el-form-item>
      <el-form-item label="班级：">
        <span>{{class_name}}</span>
      </el-form-item>
      <el-form-item label="学生：">
        <el-select v-model="student_id" @change="getDetailInfo">
          <el-option
            v-for="item in students_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-container class="school-attendance mt10">
      <el-aside width="100%">
        <p>考勤详细概况：</p>
        <div class="local-month mt10">
          <!--<span class="font-size-20 bold">{{student_name}} </span><span style="margin: 10px">|</span>-->
          应出勤天数：<span class="font-size-20 orange">{{should_att}}</span> 个工作日 ；
          实际出勤天数：<span class="font-size-20 orange">{{att_num}}</span> 个工作日 ；
          出勤率：<span class="font-size-20 orange">{{attendance_rate}}</span>
        </div>
        <div style="width:80%;margin:0 auto">
          <div class="mt10 text-align-center">
            <calendar ref="calendar"
                      :markDateMore='attendance'></calendar>
          </div>
          <div class="calendar-datail">
            <p>考勤状态说明</p>
            <div>
              <span style="background-color:#f28e91" class="calendar-suqre"></span>
              <span class="mr26">事假</span>
              <span style="background-color:#ffcc80" class="calendar-suqre"></span>
              <span class="mr26">病假</span>
              <span style="background-color:#c5e1a5" class="calendar-suqre"></span>
              <span class="mr26">正常出勤</span>
              <!--<span style="background-color:#9fa8da" class="calendar-suqre"></span>
              <span class="mr26">休学</span>-->
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
  .attendanceDetail {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .attendanceDetail .el-form {
    border-bottom: 1px solid #ccc;
  }

  .attendanceDetail .local-month {
    background-color: rgba(255, 152, 0, 0.14);
    padding: 15px;
    color: #101010;
    border: 1px solid #e3e3e3;
  }

  .attendanceDetail .calendar-datail {
    border: 1px solid #bbb;
    color: #101010;
    margin-top: 20px;
    padding: 10px;
  }

  .attendanceDetail .calendar-suqre {
    display: inline-block;
    width: 10px;
    height: 10px;
  }

  .attendanceDetail .new-calendar-modal >>> .school-calendar {
    padding: 10px 10px 10px 100px;
  }

  .attendanceDetail >>> .wh_container {
    width: 100%;
    display: inline-block;
    margin: 0 auto;
    border: 1px solid #d9d9d9;
  }

  .attendanceDetail >>> .wh_content:nth-child(2) {
    background-color: #f7f7f7;
    border: 1px solid #d9d9d9;
  }

  .attendanceDetail >>> .wh_content_all[data-v-2ebcbc83] {
    background-color: #fff;
  }

  .attendanceDetail >>> .wh_item_date {
    color: #101010;
    font-size: 12px;
  }

  .attendanceDetail >>> .wh_content_item {
    color: #101010;
    font-size: 12px;
  }

  .attendanceDetail >>> .wh_content {
    padding: 0;
  }

  .attendanceDetail >>> .wh_top_changge li {
    color: #101010;
  }

  .attendanceDetail >>> .wh_container {
    max-width: 100%;
  }
  .attendanceDetail >>> .mark0 {
    background-color: white;
  }

  .attendanceDetail >>> .mark1 {
    background-color: #c5e1a5;
  }

  .attendanceDetail >>> .mark2 {
    background-color: #ffcc80;
  }

  .attendanceDetail >>> .mark3 {
    background-color: #f28e91;
  }

  .attendanceDetail >>> .mark4 {
    background-color: #9fa8da;
  }
</style>
<script>
  import Calendar from 'vue-calendar-component'

  export default {
    data() {
      return {
        date: new Date(),
        class_id: this.$route.params.id,
        class_name: this.$route.query.class_name,
        student_id: '',
        student_name: '',
        students_list:'',
        students_info: [],
        attendance_rate: '',
        att_num: 0,
        should_att: 0,
        attendance: [],
        getStudentAtt_url:'/api/attendance/students_attendance/student_attendance_annotate/?',
        student_url:'/api/center/select/students_for_center_class_year/?center_class_year_id=1',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      }
    },
    components: {
      Calendar
    },
    mounted: function () {
      this.getStudentInfo();
      /*this.getDetailInfo();*/
    },
    methods: {
      getStudentInfo: function () {
        this.$axios.get('/api/center/select/students_for_center_class_year/?center_class_year_id=' + this.class_id).then(res => {
          this.loading = false
          if (res.status == 200 && res.data.status_code == 1) {
            this.students_list = res.data.results;
            this.student_id = res.data.results[0].id;
            this.getDetailInfo();
          }else{
          }
        }).catch(err => {
          console.log(err)
        })
    },
      getDetailInfo: function () {
          var url = this.getStudentAtt_url+ 'class_id='+ this.class_id +'&student_id='+this.student_id;
          this.$axios.get(url, {}).then(res => {
            this.loading = false
            if (res.status === 200) {
              this.should_att = res.data.report_data.passed_workday;
              this.att_num = res.data.report_data.present;
              this.attendance_rate = res.data.report_data.present_rate;

              var dates = res.data.day_list;
              for(var x in dates){
                var data = {};
                data.date = dates[x].date;
                if(dates[x].className === -1){
                  data.className = 'mark0';
                }else if(dates[x].className === 0){//出勤绿色
                  data.className = 'mark1';
                }else if(dates[x].className === 2){//病假黄色
                  data.className = 'mark2';
                }else if(dates[x].className === 3){//事假红色
                  data.className = 'mark3';
                }
                this.attendance.push(data);
              }
              this.$nextTick(() => {
                this.$refs.calendar.ChoseMonth(this.months)
              });
              this.detail = true
            }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
