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
      <span class="ml10">班级：</span>
      <el-select v-model="class_id" placeholder="请选择">
        <el-option
          v-for="item in classList"
          :key="item.center_class_id"
          :label="item.center_class__name"
          :value="item.center_class_id">
        </el-option>
      </el-select>
      <span class="padding-left-30"><el-button type="primary" @click="getAttendanceList">搜索</el-button></span>
    </p>
    <div class="local-month">
      在校学生总数：<span class="orange">{{total}}</span>人 ； 学生出勤人数 <span class="red">{{present}} </span> 人 ； 学生缺勤人数 <span class="green">{{absent}}  </span> 人
      <el-button v-if="sure" @click="attendanceSure" type="warning">确 定</el-button>
      <el-button v-if="pendingCheck" type="info">待核对</el-button>
      <el-button v-if="check" @click="attendanceCheck" type="warning">核 对</el-button>
      <el-button v-if="save" type="success">保 存</el-button>
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
          label="学号"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="学生姓名"
          width="180">
          <template slot-scope="scope">
            <a class="font-cl-blue" @click="attendanceDetail">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="考勤日期">
          <template slot-scope="scope">
            <span>{{attendance_date_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="班级">
          <template slot-scope="scope">
            <span>{{class_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="arrivalDate"
          label="到校日期">
          <template slot-scope="scope">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="temperature_school"
          label="体温">
          <template slot-scope="scope">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="departureDate"
          label="离开时间">
          <template slot-scope="scope">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="temperature_family"
          label="体温">
          <template slot-scope="scope">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="surrogate"
          label="接送人">
          <template slot-scope="scope">
            <span>--</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template>
            <el-select v-model="status_value" placeholder="请选择">
              <el-option
                v-for="item in status_list"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<style scoped>
  /*表格内容居中*/
  .attendanceDaily >>> .el-table td, .attendanceDaily >>> .el-table th {
    text-align: center;
  }

  .attendanceDaily >>> .el-input {
    width: 164px;
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
</style>
<script>
  import Calendar from 'vue-calendar-component';

  export default {
    data() {
      return {
        attendance_date: new Date(),
        clearable: false,
        class_id: '',
        class_name: '',
        classList: [],
        total: 0,
        present: 0,
        absent: 0,
        attendanceList: [],
        attendance_date_name: '',
        status_value: '',
        status_list: [
          {
            name: '出勤'
          },
          {
            name: '休学'
          },
          {
            name: '事假'
          },
          {
            name: '病假'
          }
        ],
        detail: false,
        sure: true,
        pendingCheck: false,
        check: false,
        save: false
      }
    },
    components: {
      Calendar
    },
    mounted: function () {
      this.getClass()
      this.status_value = this.status_list[0].name
    },
    methods: {
      getClass: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/classes/').then(res => {
          this.loading = false
          if (res.data.status === 1) {
            this.classList = res.data.data.classes
            this.class_id = this.classList[0].center_class_id
            this.getAttendanceList()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getAttendanceList: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/?class_id=' + this.class_id + '&attendance_date=' + this.attendance_date).then(res => {
          this.loading = false
          if (res.data.status === 1) {
            this.total = res.data.data.total
            this.present = res.data.data.present
            this.absent = res.data.data.absent
            this.attendance_date_name = res.data.data.attendance_date
            this.class_name = res.data.data.center_class[0].name

            /*res.data.data.is_confirmed*/
            this.attendanceList = res.data.data.students
          }
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
        this.sure = false
        this.pendingCheck = true
        this.check = false
        this.save = false
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
