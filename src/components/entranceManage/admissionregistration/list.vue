<template>
    <div class="admissionRegistrationlist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 入学管理 > <span class="font-cl-blue">预备生入园登记</span></p>
      </div>
      <div class="content">
        <div class="select-header">
          <el-input v-model="input" placeholder="输入学号、学生姓名或者学生卡号" style="width: 25%;"></el-input>
          <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
        </div>
        <div class="list-content">
          <div class="studentFileCard left" v-for="(item , index) in list " :key="index">
            <div style="padding:20px">
              <div class="avatar inline-block">
                <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o" aria-hidden="true"></i>
              </div>
              <div class="card-content inline-block">
                <p>
                  <span style="font-size:15px;font-weight:600">学生A</span>
                  <!--<i style="font-size:15px;color:#ff7f7f;" class="fa fa-mars" aria-hidden="true"></i>-->
                  <i style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
                </p>
                <p>出生日期：1020/11/09</p>
                <p>意向学年：00000</p>
                <p>意向信息：北京校园</p>
                <p>拟入学日期：1020/11/09</p>
              </div>
            </div>
            <div class="card-footer clearfix">
              <span>执行操作</span>
              <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 60%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nameSelect:[],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1:'',
        value2:'',
        input:'',
        activeName:'first',
        chargeTableDate:[
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
          },
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
          }
        ],
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
        },
      };
    },
    methods: {
      handleClose (){

      },
      searchList: function() {

      },
      editSchool:function (param,index) {
          this.$router.push('/financemanagement/billDetail');
      }
    }
  }
</script>

<style scoped>
  .admissionRegistrationlist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .admissionRegistrationlist .bold{
    font-weight: bold;
    color: black;
  }
  .admissionRegistrationlist .content{
    margin-top: 10px;
  }
  .admissionRegistrationlist .list-content{
    margin-top: 15px;
  }
  .admissionRegistrationlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
  .admissionRegistrationlist .studentFileCard {
    cursor: pointer;
    margin-right: 5%;
    margin-bottom: 40px;
    border: 1px solid #ECECEC;
    width: 27%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    -moz-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
  }
  .admissionRegistrationlist .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .admissionRegistrationlist .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .admissionRegistrationlist .studentFileCard .card-footer{
    background-color: #ECECEC;
    padding: 10px;
    font-size: 12px;
    color:#fff;
  }
  .admissionRegistrationlist .studentFileCard .card-footer span {
    display: inline-block;
    text-align: center;
    width: 28%;
    line-height: 17px;
  }
  .admissionRegistrationlist .studentFileCard  img{
    width: 100px;
    height: 100px;
  }
  /*.intentionalAdmissionlist >>> .select-header,.intentionalAdmissionlist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .intentionalAdmissionlist >>> .el-select{
    width: 10%;
  }
  .intentionalAdmissionlist >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .intentionalAdmissionlist >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .intentionalAdmissionlist >>> .el-table td, .el-table th{
    text-align: center;
  }
  .intentionalAdmissionlist >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .intentionalAdmissionlist >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .intentionalAdmissionlist >>> #tab-first{
    margin-left: -150px;
  }
  .intentionalAdmissionlist .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
  .intentionalAdmissionlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  */
</style>
