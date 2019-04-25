<template>
  <div class="wrap attendanceStatistics">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : > 学生考勤<span class="font-cl-blue">考勤统计</span></p>
    </div>
    <p class="mt10">
      <span>学年：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
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
        </el-table-column><el-table-column
        prop="famliyLeave"
        label="事假">
      </el-table-column><el-table-column
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
  </div>
</template>
<style scoped>


</style>
<script>
  export default {
    data () {
      return {
        value: '-所有-',
         options: [{
          value: '123',
          label: '333'
        },{
          value: '456',
          label: '666'
        }],
        tableData: [{
          no: '1001',
          name: 'rthj',
          class: '（1）',
          day_1: '13',
          day_2: '23',
          famliyLeave: '2',
          sickLeave: '3',
          schoolLeave: '1',
          rate: '77%'
        },{
          no: '1002',
          name: 'ruk',
          class: '（2）',
          day_1: '13',
          day_2: '23',
          famliyLeave: '2',
          sickLeave: '3',
          schoolLeave: '1',
          rate: '100%'
        }]
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
