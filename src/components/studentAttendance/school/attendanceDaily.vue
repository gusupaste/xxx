<template>
  <div class="wrap attendanceDaily">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : > 学生考勤 > <span class="font-cl-blue">每日考勤</span></p>
    </div>
    <p class="mt10 mb10">
      <span>日期：</span>
      <el-date-picker
        v-model="attendance_date"
        type="date"
        value-format="yyyy-MM-dd"
        :clearable="clearable"
        placeholder="选择日期">
      </el-date-picker>
      <span class="padding-left-30">班级：</span>
      <el-select v-model="class_id" placeholder="请选择">
        <el-option
          v-for="item in classList"
          :key="item.id"
          :label="item.center_class__name"
          :value="item.id">
        </el-option>
      </el-select>
      <span class="padding-left-30"><el-button type="primary" @click="getAttendanceList">搜索</el-button></span>
    </p>
    <div class="local-month">
      在校学生总数：<span class="orange">{{total}}</span>人 ； 学生出勤人数 <span class="red">{{present}} </span> 人 ； 学生缺勤人数 <span
      class="green">{{absent}}  </span> 人
      <el-button v-if="permission['student-attendance-campus']['attendance_confirm'] && status === 0" @click="attendanceSure" type="warning">确 定</el-button>
      <el-button v-else-if="permission['student-attendance-campus']['attendance_confirm'] && status === 1" @click="cancelSure" type="info">取消确认</el-button>
      <el-button v-else-if="permission['student-attendance-campus']['attendance_verify'] && status === 2" @click="attendanceCheck" type="warning">核 对</el-button>
      <span v-else-if="permission['student-attendance-campus']['attendance_verify']"></span>
      <el-button v-else type="success" @click="attendanceSure">保 存</el-button>
    </div>
    <template>
      <el-table
        class="mt26"
        :data="attendanceList"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="student_no"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="学生姓名">
          <template slot-scope="scope">
            <a class="font-cl-blue" @click="attendanceDetail">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="考勤日期">
          <template slot-scope="scope">
            <span>{{scope.row.attendance_date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="班级">
          <template slot-scope="scope">
            <span>{{scope.row.class_name}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column
          prop="arrivalDate"
          label="到校日期">
          <template slot-scope="scope">
            <span>&#45;&#45;</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="temperature_school"
          label="体温">
          <template slot-scope="scope">
            <span>&#45;&#45;</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="departureDate"
          label="离开时间">
          <template slot-scope="scope">
            <span>&#45;&#45;</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="temperature_family"
          label="体温">
          <template slot-scope="scope">
            <span>&#45;&#45;</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="surrogate"
          label="接送人">
          <template slot-scope="scope">
            <span>&#45;&#45;</span>
          </template>
        </el-table-column>-->
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span name="select_present" hidden>{{scope.row.status}}</span>
            <span v-if="is_confirmed">{{scope.row.status}}</span>
            <el-select v-else v-model="scope.row.status" placeholder="请选择">
              <el-option
                v-for="item in status_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<style scoped>
  .attendanceDaily {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  /*表格内容居中*/
  .attendanceDaily >>> .el-table td, .attendanceDaily >>> .el-table th {
    text-align: center;
  }

  .attendanceDaily >>> .el-input {
    width: 145px;
  }

  .attendanceDaily .local-month {
    background-color: rgba(255, 152, 0, 0.14);
    padding: 15px;
    color: #101010;
    border: 1px solid #e3e3e3;
  }

  .attendanceDaily .local-month >>> .el-button {
    height: 0;
    float: right;
  }
  .attendanceDaily >>> .el-input__inner{
    width:inherit;
  }
</style>
<script>
  import Calendar from 'vue-calendar-component';

  export default {
    data() {
      return {
        attendance_date: new Date(),
        clearable: false,
        class_id: '',
        classList: [],
        total: 0,
        present: 0,
        absent: 0,
        attendanceList: [],
        attendance_date_name: '',
        is_confirmed: false,
        status_list: [
          {
            id:0,
            name: '出勤'
          },
          /*{
            id:1,
            name: '休学'
          },*/
          {
            id:2,
            name: '病假'
          },
          {
            id:3,
            name: '事假'
          }
        ],
        detail: false,
        sure: true,
        pendingCheck: false,
        check: false,
        save: false,
        student_ids_temp: [],
        permission: {},
      }
    },
    components: {
      Calendar
    },
    mounted: function () {
      this.getClass()
      this.permission = this.$cookies.get('userInfo').user_permissions
    },
    methods: {
      successTip (message) {
        this.$message({
          message: message,
          type: 'success',
          center: true
        });
      },
      getClass: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/classes/').then(res => {
          this.loading = false
          if (res.data.status === 1) {
            this.classList = res.data.data.classes
            this.class_id = this.classList[0].id
            this.getAttendanceList()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getAttendanceList: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/?class_id=' + this.class_id + '&attendance_date=' + this.attendance_date
        ).then(res => {
          this.loading = false
          this.total = res.data.data.total
          this.present = res.data.data.present
          this.absent = res.data.data.absent
          /*this.attendance_date_name = res.data.data.attendance_date*/
          this.attendanceList = res.data.data.students
          /*if(res.data.data.is_verified == true && res.data.data.is_confirmed == true){

          }*/
          /*for (var i = 0; i < this.attendanceList.length; i++) {
            this.student_ids_temp.push(this.attendanceList[i].id)
          }
          this.is_confirmed = res.data.data.is_confirmed
          if (this.is_confirmed) {
            this.sureSave()
          }*/
        }).catch(err => {
          console.log(err)
        })
      },
      onSubmit() {
        console.log('submit!')
      },
      attendanceDetail: function () {
        this.detail = true
      },
      attendanceSure: function () {
        var temp = []
        var selectPresent = document.getElementsByName('select_present')
        for (var i = 0; i < selectPresent.length; i++) {
          temp.push(selectPresent[i].innerHTML)
        }
        this.loading = true
        this.$axios.post('/api/attendance/students_attendance/', {
          student_ids: this.student_ids_temp,
          student_status_list: temp,
          record_date: this.attendance_date_name,
          class_id: this.class_id,
          is_confirmed: true,
          is_verified: false
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            console.log(res.data)
            if (res.data.status === 1) {
              this.sureSave()
              this.successTip("提交成功")
            } else {
              this.$message.warning(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      sureSave: function () {
        this.sure = false
        this.pendingCheck = true
        this.check = false
        this.save = false
        this.is_confirmed = true
      },
      cancelSure: function () {
        this.loading = true
        this.$axios.post('/api/attendance/students_attendance/cancel_confirm/', {
          record_date: this.attendance_date_name,
          class_id: this.class_id
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            console.log(res.data)
            if (res.data.status === 1) {
              this.sure = true
              this.pendingCheck = false
              this.check = false
              this.save = false
              this.is_confirmed = false
            } else {
              this.$message.warning(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })

      },
      attendanceCheck: function () {
        this.sure = false
        this.pendingCheck = false
        this.check = false
        this.save = false
      }
    }
  }
</script>
