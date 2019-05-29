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
      <el-button v-if="permission['student-attendance-campus']['attendance_confirm'] && verify_status === 0"
                 @click="attendanceSure(0)" type="warning">确 定
      </el-button>
      <el-button v-else-if="permission['student-attendance-campus']['attendance_confirm'] && verify_status === 1"
                 @click="cancelSure" type="info">取消确定
      </el-button>
      <el-button v-else-if="permission['student-attendance-campus']['attendance_verify'] && verify_status !== 2"
                 @click="attendanceSure(1)" type="warning">核 对
      </el-button>
      <el-button v-else-if="permission['student-attendance-campus']['attendance_verify'] && verify_status === 2"
                  type="info">已 核 对
      </el-button>
      <el-button v-else-if="permission['student-attendance-campus']['student-attendance-revision']"
                 type="success" @click="attendanceSave">保 存
      </el-button>
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
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-select v-if="permission['student-attendance-campus']['attendance_confirm'] && verify_status === 0" v-model="scope.row.status" placeholder="请选择">
              <el-option
                v-for="item in status_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span v-else-if="permission['student-attendance-campus']['attendance_confirm'] && verify_status !== 0 && scope.row.status === 0">出勤</span>
            <span v-else-if="permission['student-attendance-campus']['attendance_confirm'] && verify_status !== 0 && scope.row.status === 2">病假</span>
            <span v-else-if="permission['student-attendance-campus']['attendance_confirm'] && verify_status !== 0 && scope.row.status === 3">事假</span>
            <el-select v-if="permission['student-attendance-campus']['attendance_verify'] && verify_status !== 2" v-model="scope.row.status" placeholder="请选择">
              <el-option
                v-for="item in status_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span v-else-if="permission['student-attendance-campus']['attendance_verify'] && verify_status === 2 && scope.row.status === 0">出勤</span>
            <span v-else-if="permission['student-attendance-campus']['attendance_verify'] && verify_status === 2 && scope.row.status === 2">病假</span>
            <span v-else-if="permission['student-attendance-campus']['attendance_verify'] && verify_status === 2 && scope.row.status === 3">事假</span>
            <el-select v-if="permission['student-attendance-campus']['student-attendance-revision']" v-model="scope.row.status" placeholder="请选择">
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

  .attendanceDaily >>> .el-input__inner {
    width: inherit;
  }
</style>
<script>
  import Calendar from 'vue-calendar-component';

  export default {
    data() {
      return {
        attendance_date: '',
        clearable: false,
        class_id: '',
        classList: [],
        total: 0,
        present: 0,
        absent: 0,
        verify_status: 0,
        attendanceList: [],
        is_confirmed: false,
        status_list: [
          {
            id: 0,
            name: '出勤'
          },
          /*{
            id:1,
            name: '休学'
          },*/
          {
            id: 2,
            name: '病假'
          },
          {
            id: 3,
            name: '事假'
          }
        ],
        detail: false,
        sure: true,
        pendingCheck: false,
        check: false,
        save: false,
        student_ids_temp: [],
        permission: this.$cookies.get('userInfo').user_permissions
      }
    },
    components: {
      Calendar
    },
    mounted: function () {
      this.getClass()
      this.attendance_date = this.$options.filters['formatDate'](new Date())
    },
    methods: {
      successTip(message) {
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
          this.attendanceList = res.data.data.students
          this.verify_status = res.data.data.verify_status
        }).catch(err => {
          console.log(err)
        })
      },
      attendanceDetail: function () {
        this.detail = true
      },
      attendanceSure: function (num) {
        this.loading = true
        this.$axios.post('api/attendance/students_attendance/confirm_or_verify/', {
          student_list: this.attendanceList,
          record_date: this.attendance_date,
          class_id: this.class_id,
          action_type: num
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            console.log(res.data)
            if (res.data.status === 1) {
              this.successTip("提交成功")
              this.getAttendanceList()
            } else {
              this.$message.warning(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      cancelSure: function () {
        this.loading = true
        this.$axios.post('/api/attendance/students_attendance/cancel_confirm/', {
          record_date: this.attendance_date,
          class_id: this.class_id
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            console.log(res.data)
            if (res.data.status === 1) {
              this.getAttendanceList()
            } else {
              this.$message.warning(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      attendanceSave: function () {
        this.loading = true
        this.$axios.post('api/attendance/students_attendance/update_attendance/', {
          student_list: this.attendanceList,
          record_date: this.attendance_date,
          class_id: this.class_id,
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            console.log(res.data)
            if (res.data.status === 1) {
              this.successTip("提交成功")
              this.getAttendanceList()
            } else {
              this.$message.warning(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
