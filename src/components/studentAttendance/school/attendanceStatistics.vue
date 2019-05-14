<template>
  <div class="wrap attendanceStatistics">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : > 学生考勤 > <span class="font-cl-blue">考勤统计</span></p>
    </div>
    <p class="mt10">
      <span>学年：</span>
      <el-select v-model="year" placeholder="请选择">
        <el-option
          v-for="item in academic_year_list"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span>月份：</span>
      <el-select v-model="months" placeholder="请选择">
        <el-option
          v-for="(item,index) in months_list"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <span>班级：</span>
      <el-select v-model="class_id" placeholder="请选择">
        <el-option
          v-for="item in classes"
          :key="item.center_class_id"
          :label="item.center_class__name"
          :value="item.center_class_id">
        </el-option>
      </el-select>
      <span class="padding-left-30"><el-button type="primary" @click="getList">搜索</el-button></span>
    </p>
    <template>
      <el-table
        class="mt26"
        :data="tableData"
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
          label="学生姓名"
          width="180">
          <template slot-scope="scope">
            <a class="font-cl-blue" @click="attendanceDetail(scope.row)">{{ scope.row.student_name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="should_att"
          label="应出勤天数">
        </el-table-column>
        <el-table-column
          prop="att_num"
          label="实际出勤天数">
        </el-table-column>
        <el-table-column
          prop="personal_num"
          label="事假">
        </el-table-column>
        <el-table-column
          prop="sick_num"
          label="病假">
        </el-table-column>
        <el-table-column
          prop="with_family"
          label="休学">
        </el-table-column>
        <el-table-column
          label="出勤率">
          <template slot-scope="scope">
            <span>{{scope.row.attendance_rate}}%</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--  弹框  -->
    <el-dialog class="assign-permissions" title="考勤详细概况" :visible.sync="detail" width="50%">
      <el-container class="school-attendance">
        <el-aside width="100%">
          <div class="local-month">
            <span class="font-size-20 bold">{{student_name}} </span><span style="margin: 10px">|</span>
            应出勤天数：<span class="font-size-20 orange">{{should_att}}</span> 个工作日 ；
            实际出勤天数：<span class="font-size-20 orange">{{att_num}}</span> 个工作日 ；
            出勤率：<span class="font-size-20 orange">{{attendance_rate}}%</span>
          </div>
          <div style="width:80%;margin:0 auto">
            <div class="mt10 text-align-center">
              <calendar ref="calendar"
                        :markDateMore='arr'
              ></calendar>
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
                <span style="background-color:#9fa8da" class="calendar-suqre"></span>
                <span class="mr26">休学</span>
              </div>
            </div>
          </div>
        </el-aside>
      </el-container>
      <span slot="footer" class="dialog-footer text-align-center">
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import Calendar from 'vue-calendar-component'
  export default {
    data() {
      return {
        value: '-所有-',
        year: '',
        months: '',
        class_id: '',
        academic_year_list: [],
        months_list: [],
        classes: [],
        tableData: [],
        detail: false,
        student_name: '',
        should_att: '',
        att_num: '',
        attendance_rate: '',
        arr: [
          {
            date: "2019/5/1",
            className: "mark1"
          },
          {
            date: "2019/5/13",
            className: "mark2"
          }
        ]
      }
    },
    components: {
      Calendar
    },
    mounted: function () {
      this.getClass()
    },
    watch: {
      year() {
        for (var i = 0; i < this.academic_year_list.length; i++) {
          if(this.year === this.academic_year_list[i].id) {
            this.months_list = this.academic_year_list[i].months
          }
        }
      }
    },
    methods: {
      getClass: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/info_list/', {}).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status === 1) {
              this.academic_year_list = res.data.data.academic_year_list
              this.classes = res.data.data.classes
              this.year = this.academic_year_list[0].id
              this.months = this.academic_year_list[0].months[12]
              this.class_id = this.classes[0].center_class_id
              this.getList()
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getList: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/annotate/?class_id=' + this.class_id + '&attendance_date=' + this.months + '&page=1', {}).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status === 1) {
              this.tableData = res.data.data.pages.results
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onSubmit() {
        console.log('submit!')
      },
      attendanceDetail: function (obj) {
        this.detail = true
        this.student_name = obj.student_name
        this.should_att = obj.should_att
        this.att_num = obj.att_num
        this.attendance_rate = obj.attendance_rate
        this.attendance = obj.attendance
        console.log(obj)
        this.$nextTick(()=> {
          console.log(this.$refs.calendar)
          this.$refs.calendar.ChoseMonth(this.months)
        });
      }
    }
  }
</script>
<style scoped>
  /*表格内容居中*/
  .attendanceStatistics >>> .el-table td, .attendanceStatistics >>> .el-table th {
    text-align: center;
  }

  .attendanceStatistics >>> .el-dialog__footer {
    text-align: center;
  }

  .attendanceStatistics .local-month {
    background-color: rgba(255, 152, 0, 0.14);
    padding: 15px;
    color: #101010;
    border: 1px solid #e3e3e3;
  }

  .attendanceStatistics .calendar-datail {
    border: 1px solid #bbb;
    color: #101010;
    margin-top: 20px;
    padding: 10px;
  }

  .attendanceStatistics .calendar-suqre {
    display: inline-block;
    width: 10px;
    height: 10px;
  }

  .attendanceStatistics .new-calendar-modal >>> .school-calendar {
    padding: 10px 10px 10px 100px;
  }

  .attendanceStatistics >>> .wh_container {
    width: 100%;
    display: inline-block;
    margin: 0 auto;
    border: 1px solid #d9d9d9;
  }

  .attendanceStatistics >>> .wh_content:nth-child(2) {
    background-color: #f7f7f7;
    border: 1px solid #d9d9d9;
  }

  .attendanceStatistics >>> .wh_content_all[data-v-2ebcbc83] {
    background-color: #fff;
  }

  .attendanceStatistics >>> .wh_item_date {
    color: #101010;
    font-size: 12px;
  }

  .attendanceStatistics >>> .wh_content_item {
    color: #101010;
    font-size: 12px;
  }

  .attendanceStatistics >>> .wh_content {
    padding: 0;
  }

  .attendanceStatistics >>> .wh_top_changge li {
    color: #101010;
  }

  .attendanceStatistics >>> .wh_container {
    max-width: 100%;
  }

  .attendanceStatistics >>> .mark1 {
    background-color: orange;
  }

  .attendanceStatistics >>> .mark2 {
    background-color: blue;
  }
</style>

