<template>
  <div class="workflowDetail clearfix wrap">
    adsadsdsad
   <!-- <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > 校园列表 > <span class="font-cl-blue">校园概况</span></p>
    </div>-->
    <!--<div class="content clearfix">
      <div class="content-top">北京理都校园</div>
      <el-col :span="24" style="line-height:2">
        <el-card shadow="always">
          <p class="bold">基本信息</p>
          <p class="bold">校园名称：北京首府校园(英文全称:xxxxxxxx;中文简称:xxxxxxxx;英文简称:xxxxxxxxxx)</p>
          <p><el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属区域：</span><span>华北地区</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属城市：</span><span>北京市</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">园长：</span><span>李园长</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>校园编码：</span><span>1001</span></div></el-col>
          </el-row>
          </p>
          <p>
            <el-row :gutter="20">
              <el-col :span="4"><div class="grid-content bg-purple"><span>通讯地址：</span><span>北京市</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">邮编：</span><span>123456</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">电话：</span><span>18809876543</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">传真：</span><span>xxxxxxxx</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span>电子邮箱：</span><span>xxxxxxxx</span></div></el-col>
              <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">网址：</span><span>www.taidii.com</span></div></el-col>
            </el-row>
          </p>
        </el-card>
      </el-col>
    </div>-->
  </div>
</template>

<style scoped>
  .workflowDetail >>> .el-dialog__header{
    background-color: #f5f5f5;
    padding: 15px;
    font-size: 12px !important;
    border-bottom: 1px solid #d5d5d5;
  }
  .workflowDetail >>> .el-dialog__title{
    font-size: 14px;
  }
  .workflowDetaill >>> .el-dialog{
    min-width: 600px;
  }
  .workflowDetail >>> .dialog-footer{
    margin-top: 50px;
    text-align: center;
  }
  .workflowDetail {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .workflowDetail .bold {
    font-weight: bold;
    color: black;
  }
  .workflowDetail .firstTab {
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
  }
  .workflowDetail .className {
    padding:6px 16px;
    font-size: 16px;
    font-weight: 600;
    color:#3683a0;
    border: 2px solid #3683a0;
    border-radius: 20px;
  }
  .workflowDetail .icon-font {
    color:#f17128;
    font-size: 20px;
    margin-left: 20px;
    margin-right: 5px;
    font-weight: 600;
  }
  .workflowDetail >>> .el-tabs__nav-wrap {
    width: 50%;
    margin:0 auto;
  }
  .workflowDetail >>> .has-gutter th {
    background-color: #f5f5f5 !important;
  }
  .workflowDetail >>> .el-tabs__active-bar {
    background-color:#f17128;
    height: 3px;;
  }
  .workflowDetail >>> .el-tabs__item.is-active {
    color:#f17128;
    font-weight: 600;
  }
  .workflowDetail >>> .el-tabs__item:hover {
    color:#f17128;
    font-weight: 600;
  }
  .workflowDetail >>> .el-tabs__nav-wrap::after {
    display: none;
  }
  .workflowDetail >>> .el-tabs__header {
    border-bottom: 2px solid #dedede;
  }

  .workflowDetail .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    position: relative;
    top: 20px;
    left: -5px;
    border-radius: 3px;
    color: #3E7193;
  }
  .workflowDetail .content-margin{
    margin-left: 15%;
  }
  .workflowDetail >>> td , .workflowDetail >>> th {
    text-align: center;
  }
  .workflowDetail >>> .el-textarea__inner {
    width: 600px;
    min-height: 100px !important;
  }
</style>

<script>
  export default {
    components: {
    },
    data() {
      return {
        dialogFormVisible:false,
        editClassDialog:false,
        deleteDialog:false,
        activeName: 'first',
        form: {
          name: '手工新增',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }],
        tableData2: [],
        formLabelWidth: '120px'
      };
    },
    methods: {

    }
  }
</script>
