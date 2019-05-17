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
        <el-select v-model="student_id">
          <el-option
            v-for="item in students_info"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-model="formLabelAlign.name" type="primary">搜索</el-button>
      </el-form-item>

    </el-form>

    <el-container class="school-attendance mt10">
      <el-aside width="100%">
        <p>考勤详细概况：</p>
        <div class="local-month mt10">
          <span class="font-size-20 bold">{{student_name}} </span><span style="margin: 10px">|</span>
          应出勤天数：<span class="font-size-20 orange">{{should_att}}</span> 个工作日 ；
          实际出勤天数：<span class="font-size-20 orange">{{att_num}}</span> 个工作日 ；
          出勤率：<span class="font-size-20 orange">{{attendance_rate}}%</span>
        </div>
        <div style="width:80%;margin:0 auto">
          <div class="mt10 text-align-center">
            <calendar ref="calendar"
            :markDateMore='attendance'></calendar>
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
    background-color: #f28e91;
  }

  .attendanceDetail >>> .mark2 {
    background-color: #ffcc80;
  }

  .attendanceDetail >>> .mark3 {
    background-color: #c5e1a5;
  }

  .attendanceDetail >>> .mark4 {
    background-color: #9fa8da;
  }
</style>
<script>
import Calendar from 'vue-calendar-component'

export default {
  data () {
    return {
      date: new Date(),
      class_id: Number(this.$route.params.id),
      class_name: this.$route.query.class_name,
      student_id: 0,
      student_name: '',
      students_info: [],
      attendance_rate: '',
      att_num: 0,
      should_att: 0,
      attendance: [],
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
    this.getDetailInfo()
  },
  methods: {
    getDetailInfo: function () {
      if (this.student_id === 0) {
        this.student_id = ''
      }
      this.$axios.get('/api/hq/hq_attendance/detail_info/?class_id=' + this.class_id + '&student_id=' + this.student_id).then(res => {
        this.loading = false
        if (res.status == 200 && res.data.status == 1) {
          this.students_info = res.data.data.students_info
          this.student_id = this.students_info[0].id
          this.student_name = this.students_info[0].name
          this.should_att = res.data.data.should_att
          this.att_num = res.data.data.att_num
          this.attendance_rate = res.data.data.attendance_rate
          var arr = res.data.data.attendance
          var months = document.getElementById('span_date').innerHTML
          var year = months.substr(0, 4)
          var month = months.substr(5, 2)
          if (month < 10) {
            month = months.substr(6, 1)
          }
          for (var i = 0; i < arr.length; i++) {
            var son = new Object()
            son.date = year + '/' + month + '/' + (i + 1)
            if (arr[i] === '1') {
              son.className = 'mark1'
            } else if (arr[i] === '2') {
              son.className = 'mark2'
            } else if (arr[i] === '3') {
              son.className = 'mark3'
            } else if (arr[i] === '4') {
              son.className = 'mark4'
            } else {
              son.className = 'mark0'
            }
            this.attendance.push(son)
          }
        } else {

        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
