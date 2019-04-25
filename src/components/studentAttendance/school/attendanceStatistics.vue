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
    <el-form class="mt10" label-width="80px" :model="formLabelAlign" inline="">
      <el-form-item label="学年">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="formLabelAlign.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
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
        formLabelAlign: {
          year: '2018-01',
          region: '',
          type: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
