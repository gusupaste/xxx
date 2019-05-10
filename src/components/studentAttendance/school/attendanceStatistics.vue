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
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
      <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
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
          prop="no"
          label="学号"
          min-width="30">
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
          prop="class"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="day_1"
          label="应出勤天数">
        </el-table-column>
        <el-table-column
          prop="day_2"
          label="实际出勤天数">
        </el-table-column>
        <el-table-column
          prop="famliyLeave"
          label="事假">
        </el-table-column>
        <el-table-column
          prop="sickLeave"
          label="病假">
        </el-table-column>
        <el-table-column
          prop="schoolLeave"
          label="休学">
        </el-table-column>
        <el-table-column
          prop="rate"
          label="出勤率">
        </el-table-column>
      </el-table>
    </template>
    <!--  弹框  -->
    <el-dialog class="assign-permissions" title="考勤详细概况" :visible.sync="detail" width="50%">
      <el-container class="school-attendance">
        <el-aside width="100%">
          <div class="local-month">
            <span> 学生A </span><span style="margin: 10px">|</span>应出勤天数：<span class="red">20</span>个工作日 ； 4月已过 <span class="red">16 </span> 个工作日 ； 当月有 <span
            class="red">21  </span> 个工作日
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
      <span slot="footer" class="dialog-footer text-align-center">
        <el-button @click="detail = false">取 消</el-button>
          <el-button type="success" @click="detail = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  /*表格内容居中*/
  .attendanceStatistics >>> .el-table td, .attendanceStatistics >>> .el-table th {
    text-align: center;
  }
  .attendanceStatistics >>> .el-dialog__footer {
    text-align: center;
  }
  .attendanceStatistics .local-month {
    background-color:rgba(255, 152, 0, 0.14);
    padding: 15px;
    color:#101010;
    border: 1px solid #e3e3e3;
  }
  .attendanceStatistics  .calendar-datail{
    border: 1px solid #bbb;
    color: #101010;
    margin-top: 20px;
    padding: 10px;
  }
  .attendanceStatistics .calendar-suqre {
    display: inline-block;
    width:10px;
    height:10px;
  }
  .attendanceStatistics .new-calendar-modal >>> .school-calendar {
    padding: 10px 10px 10px 100px;
  }
  .attendanceStatistics  >>> .wh_container {
    width: 100%;
    display: inline-block;
    margin: 0 auto;
    border: 1px solid #d9d9d9;
  }
  .attendanceStatistics >>> .wh_content:nth-child(2) {
    background-color: #f7f7f7;
    border: 1px solid #d9d9d9;
  }
  .attendanceStatistics  >>> .wh_content_all[data-v-2ebcbc83] {
    background-color: #fff;
  }
  .attendanceStatistics  >>> .wh_item_date {
    color:#101010;
    font-size: 12px;
  }
  .attendanceStatistics  >>> .wh_content_item {
    color:#101010;
    font-size: 12px;
  }
  .attendanceStatistics  >>> .wh_content {
    padding: 0;
  }
  .attendanceStatistics >>> .wh_top_changge li {
    color:#101010;
  }
  .attendanceStatistics >>> .wh_container {
    max-width: 100%;
  }

</style>
<script>
  import Calendar from 'vue-calendar-component';

  export default {
    data() {
      return {
        value: '-所有-',
        year: '',
        class_id: '',
        academic_year_list: [],
        classes: [],
        detail: false,
        tableData: []
      }
    },
    components: {
      Calendar
    },
    mounted: function () {
      this.getClass()
    },
    methods: {
      getClass: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/info_list/', {
        }).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status === 1) {
              console.log(res.data.data)
              this.academic_year_list = res.data.data.academic_year_list
              this.classes = res.data.data.classes
              this.year = this.academic_year_list[0].id
              this.class_id = this.classes[0].center_class_id
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      onSubmit () {
        console.log('submit!')
      },
      attendanceDetail: function () {
        this.detail = true
      }
    }
  }
</script>
