<template>
  <div class="wrap attendanceStatistics">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : > 学生考勤 > <span class="font-cl-blue">考勤统计</span></p>
    </div>
    <p class="mt10">
      <span>学年：</span>
      <el-select v-model="year" placeholder="请选择学年">
        <el-option value="" label="全部"></el-option>
        <el-option
          v-for="item in year_list"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span>月份：</span>
      <el-select v-model="months" placeholder="请选择">
        <el-option
          v-for="(item,index) in months_list"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <span>班级：</span>
      <el-select v-model="class_id" placeholder="请选择">
        <el-option
          v-for="item in classes"
          :key="item.id"
          :label="item.center_class__name"
          :value="item.id">
        </el-option>
      </el-select>
      <span class="padding-left-30"><el-button type="primary" @click="getList(1)">搜索</el-button></span>
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
          prop="class_name"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="total"
          label="应出勤天数">
        </el-table-column>
        <el-table-column
          prop="present"
          label="实际出勤天数">
        </el-table-column>
        <el-table-column
          prop="personal"
          label="事假">
        </el-table-column>
        <el-table-column
          prop="sick"
          label="病假">
        </el-table-column>
        <el-table-column
          prop="absent"
          label="缺勤">
        </el-table-column>
        <el-table-column
          label="出勤率">
          <template slot-scope="scope">
            <span>{{scope.row.present_rate}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="pager, next, jumper"
        next-text="下一页"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="total" class="page">
      </el-pagination>
    </template>
    <!--  弹框  -->
    <el-dialog class="assign-permissions" title="考勤详细概况" :visible.sync="detail" width="50%">
      <el-container class="school-attendance">
        <el-aside width="100%">
          <div class="local-month">
            <span class="font-size-20 bold">{{student_name}} </span><span style="margin: 10px">|</span>
            应出勤天数：<span class="font-size-20 orange">{{should_att}}</span> 个工作日 ；
            实际出勤天数：<span class="font-size-20 orange">{{att_num}}</span> 个工作日 ；
            出勤率：<span class="font-size-20 orange">{{attendance_rate}}</span>
          </div>
          <div style="width:80%;margin:0 auto">
            <div class="mt10 text-align-center">
              <calendar ref="calendar"
                        :markDateMore='attendance'
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
        attendance: [],
        pagesize: 10,
        currentPage: 1,
        total: 1,
        year_url:'/api/common/select/academic_year_list/',/*学年*/
        month_url:'/api/common/select/months_for_academic_year/?academic_year_id=',
        getList_url:'/api/attendance/students_attendance/annotate/?attendance_date=',
        year_list:[],
      }
    },
    components: {
      Calendar
    },
    mounted: function () {
      this.getYearList(1);
      /*this.getClass();
      this.getList();*/
    },
    watch: {
      year: {
        handler(newValue, oldValue) {
          this.getMonth(this.year,0);
        },
        deep: true
      },
      currentPage () {
        this.getList(this.currentPage)
      }
    },
    methods: {
      /*学年*/
      getYearList:function (i) {
        var _this = this;
        var url = this.year_url;
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.year_list = res.data.results;
            for(var x in this.year_list){
              if(this.year_list[x].is_selected == 1){
                this.year = this.year_list[x].id;
                this.getMonth(this.year,i);
              }
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getMonth(year,index){
        var _this = this;
        var url = this.month_url + year;
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.months_list = res.data.results;
            var flag = false;
            for(var x in this.months_list){
              if(this.months_list[x].is_selected == 1){
                this.months = this.months_list[x].value;
                flag = true;
              }
            }
            if(flag == false){
              this.months = this.months_list[0].value;
            }
          }
          this.getClass(index);
        }).catch(err=>{
          console.log(err)
        })
      },
      getClass: function (index) {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/classes/?academic_year_id='+this.year).then(res => {
          this.loading = false
          if (res.data.status === 1) {
            this.classes = res.data.data.classes;
            if(this.classes.length > 0){
              this.class_id = this.classes[0].id
            }else{
              this.class_id = '';
            }
            if(index === 1){
              this.getList();
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*getClass: function () {
        this.loading = true
        this.$axios.get('/api/attendance/students_attendance/info_list/').then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status === 1) {
              this.academic_year_list = res.data.data.academic_year_list
              this.classes = res.data.data.classes
              this.year = this.academic_year_list[0].id
              this.months = this.academic_year_list[0].months[0]
              this.class_id = this.classes[0].center_class_id
              this.getList(1)
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },*/
      getList: function (val) {
        this.loading = true
        this.currentPage = val
        /*this.$axios.get('/api/attendance/students_attendance/annotate/?class_id=' + this.class_id + '&attendance_date='
          + this.months + '&page=' + this.currentPage, {}).then(res => {*/
        var url = this.getList_url+ this.year +'&class_id='+ this.class_id;
        this.$axios.get(url, {}).then(res => {
          this.loading = false
          if (res.status === 200) {
            if (res.data.status === 1) {
              this.tableData = res.data.data.results
              this.total = res.data.data.count
            } else {
              alert(res.data.message)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
      attendanceDetail: function (obj) {
        this.detail = true
        this.student_name = obj.student_name
        this.should_att = obj.total
        this.att_num = obj.present
        this.attendance_rate = obj.present_rate
        var year = this.months.substr(0, 4)
        var month = this.months.substr(5, 2)
        if (month < 10) {
          month = this.months.substr(6, 1)
        }
        var arr = obj.attendance
        for (var i = 0; i < arr.length; i++) {
          var son = new Object
          //alert(this.months.substr(8, 2))
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
        this.$nextTick(() => {
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
  .attendanceStatistics >>> .mark0 {
    background-color: white;
  }

  .attendanceStatistics >>> .mark1 {
    background-color: #f28e91;
  }

  .attendanceStatistics >>> .mark2 {
    background-color: #ffcc80;
  }

  .attendanceStatistics >>> .mark3 {
    background-color: #c5e1a5;
  }

  .attendanceStatistics >>> .mark4 {
    background-color: #9fa8da;
  }
</style>
