<template>
  <div class="studentFile">
      <div class="formwrap">
        <el-form ref="form" :model="form" label-width="100px" inline>
          <el-form-item label="城际：">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="校园：">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生性别：">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学日期：">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">&nbsp;至&nbsp;</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >搜索</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div class="studentFileList">
          <div class="studentFileCard left" v-for="(item , index) in list " :key="index" @click="$router.push('/studentFile/studentFileDetail/9')">
            <div style="padding:30px 20px">
              <div class="avatar inline-block">
                <img src="../../../assets/img/logo.png" alt="">
              </div>
              <div class="card-content inline-block">
                  <p>
                    <span style="font-size:15px;font-weight:600">学生A</span>
                    <i style="font-size:15px;color:#ff7f7f" class="fa fa-times-circle"></i>
                  </p>
                  <p>出生日期：1020/11/09</p>
                  <p>意向学生：00000</p>
                  <p>意向信息：北京丽都校园 双语小二班 </p>
                  <p>拟入学日期：2019/04/01</p>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>
<style scoped>
  .studentFile .formwrap {
    margin-top: 20px;
  }
  .studentFile .studentFileList {
    margin-top: 20px;
  }
  .studentFile .el-form-item {
    margin-bottom: 10px;
  }
  .studentFile .studentFileCard {
    cursor: pointer;
    margin-right: 2%;
    margin-bottom: 40px;
    border: 1px solid #bbb;
    width: 30%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    -moz-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
  }
  .studentFile .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .studentFile .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .studentFile .studentFileCard  img{
    width: 100px;
    height: 100px;
  }
  .studentDiscount >>> .el-tabs__active-bar {
      background-color:#f17128 !important;
      height: 3px;
  }
  .studentDiscount >>> .el-tabs__item {
      height: 40px;
  }
  .studentDiscount >>> .el-tabs__nav {
      float: none;
      width: 50%;
      margin: 0 auto;

  }
  .studentDiscount >>> .el-tabs__header {
      border-bottom: 2px solid #ccc;
  }
  .studentDiscount >>> .el-tabs__nav-wrap {
      width: 50%;
      margin: 0 auto;
  }
  .studentDiscount >>> .el-tab-pane {
      border: none;
  }
</style>
<script>
export default {
  data(){
    return {
      tol_url:'http://127.0.0.1:8000/api/',
      list:[1,2,3,4,5,6,7,81,],
        form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods:{
    /*城际*/
    getIntercityList:function () {

    },
  },
}
</script>
