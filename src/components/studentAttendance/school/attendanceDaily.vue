<template>
  <div class="wrap attendanceDaily">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : > 学生考勤 > <span class="font-cl-blue">每日考勤</span></p>
    </div>
    <p class="mt10">
      <span>日期：</span>
      <el-input
        placeholder="请选择日期"
        suffix-icon="el-icon-date">
      </el-input>
      <span>班级：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
    </p>
    <div class="local-month">
      在校学生总数：<span class="orange">20</span>人 ； 学生出勤人数 <span class="red">20 </span> 人 ； 学生缺勤人数 <span
      class="green">1  </span> 人
      <el-button v-if="sure" @click="attendanceSure" type="warning">确 定</el-button>
      <el-button v-if="pendingCheck" type="info">待核对</el-button>
      <el-button v-if="check" @click="attendanceCheck" type="warning">核 对</el-button>
      <el-button v-if="save" type="success">保 存</el-button>
    </div>
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
          prop="attendanceDate"
          label="考勤日期">
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="arrivalDate"
          label="到校日期">
        </el-table-column>
        <el-table-column
          prop="temperature_school"
          label="体温">
        </el-table-column>
        <el-table-column
          prop="departureDate"
          label="离开时间">
        </el-table-column>
        <el-table-column
          prop="temperature_family"
          label="体温">
        </el-table-column>
        <el-table-column
          prop="surrogate"
          label="接送人">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
        value: '-所有-',
        detail: false,
        sure: true,
        pendingCheck: false,
        check: false,
        save: false,
        options: [{
          value: '123',
          label: '333'
        },
          {
            value: '456',
            label: '666'
          }],
        tableData: [{
          no: '1001',
          name: 'rthj',
          attendanceDate: '2018/01/01',
          class: '（1）',
          arrivalDate: '2018/01/01',
          temperature_school: '--',
          departureDate: '2018/01/01',
          temperature_family: '--',
          surrogate: '--',
          status: '77%'
        }, {
          no: '1002',
          name: 'ruk',
          attendanceDate: '2018/01/01',
          class: '（1）',
          arrivalDate: '2018/01/01',
          temperature_school: '--',
          departureDate: '2018/01/01',
          temperature_family: '--',
          surrogate: '--',
          status: '77%'
        }, {
          no: '1003',
          name: 'ruk',
          attendanceDate: '2018/01/01',
          class: '（1）',
          arrivalDate: '2018/01/01',
          temperature_school: '--',
          departureDate: '2018/01/01',
          temperature_family: '--',
          surrogate: '--',
          status: '77%'
        },
          {
            no: '1004',
            name: 'ruk',
            attendanceDate: '2018/01/01',
            class: '（1）',
            arrivalDate: '2018/01/01',
            temperature_school: '--',
            departureDate: '2018/01/01',
            temperature_family: '--',
            surrogate: '--',
            status: '77%'
          },
          {
            no: '1005',
            name: 'ruk',
            attendanceDate: '2018/01/01',
            class: '（1）',
            arrivalDate: '2018/01/01',
            temperature_school: '--',
            departureDate: '2018/01/01',
            temperature_family: '--',
            surrogate: '--',
            status: '77%'
          },
          {
            no: '1006',
            name: 'ruk',
            attendanceDate: '2018/01/01',
            class: '（1）',
            arrivalDate: '2018/01/01',
            temperature_school: '--',
            departureDate: '2018/01/01',
            temperature_family: '--',
            surrogate: '--',
            status: '77%'
          },
          {
            no: '1007',
            name: 'ruk',
            attendanceDate: '2018/01/01',
            class: '（1）',
            arrivalDate: '2018/01/01',
            temperature_school: '--',
            departureDate: '2018/01/01',
            temperature_family: '--',
            surrogate: '--',
            status: '77%'
          }
        ]
      }
    },
    components: {
      Calendar
    },
    methods: {
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
