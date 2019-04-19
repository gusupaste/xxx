<template>
    <div class='brandmanagement'>
      <div class="header">
        <p>YOU ARE HERE : 系统管理 >> <span>品牌管理</span></p>
      </div>
      <div class="brandmanagement-content">
        <div class="content-top">
          <div class="top">
            <span class="top-span">班级项目：</span>
            <el-button class="el-button" type="primary" @click="manageBrand(-1)">管理</el-button><br>
            <span class="top-span-bot">双语班 ； 国际班 ； 慧智班 ； 慧乐班 ；慧智双语班级 ； 慧智普通班  </span>
          </div>
          <div class="top">
            <span class="top-span">年级项目：</span>
            <el-button class="el-button" type="primary" @click="manageBrand(0)">管理</el-button><br>
            <span class="top-span-bot">国际班；双语班；</span>
          </div>
        </div>
        <div class="content">
          <div class="intercity-list">
            <el-card class="box-card">
              <span class="el-icon-circle-plus-outline span-button" @click="addDialog"></span>
            </el-card>
          </div>
          <div class="intercity-list">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="city-name font-cl-blue">智慧班</span>
                <el-button type="text" @click="editbrandVisible = true">编辑</el-button>
              </div>
              <ul>
                <li v-for="o in 2" :key="o" style="border-bottom: 1px solid #ddd">
                    <span class="el-card-li">班级项目：<span>国际班</span></span>
                    <span class="el-card-li">双语班；智慧版</span>
                </li>
              </ul>
            </el-card>
          </div>
        </div>
      </div>
      <el-dialog title="新增品牌" :visible.sync="addbrandVisible" width="50%" style="padding: 30px 60px;">
        <el-form label-width="80px">
          <el-form-item label="品牌名称">
            <el-input v-model="brandName" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addbrandVisible = false">取 消</el-button>
          <el-button type="success" @click="addbrandVisible = false">保 存</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑品牌" :visible.sync="editbrandVisible" width="70%">
        <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
          <el-form-item label="品牌名称">
            <el-input v-model="editForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
          </el-form-item>
          <el-table
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="日期"
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editbrandVisible = false">取 消</el-button>
          <el-button type="success" @click="editbrandVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="manageTitle" :visible.sync="brandManageVisible" width="70%">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            :label="columnLabel1"
            width="155">
            <template slot-scope="scope">
              <el-input v-model="scope.row.no" placeholder="请输入内容" v-if="scope.row.edit === false"></el-input>
              <span v-if="scope.row.edit === true">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="columnLabel2"
            width="220">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容" v-if="scope.row.edit === false"></el-input>
              <span v-if="scope.row.edit === true">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button v-show="scope.row.id" @click="editManage(scope.row)" type="text" size="small"><span class="el-icon-edit"></span></el-button>
              <el-button @click="deleteButton(scope.row)" type="text" size="small"><span class="el-icon-delete"></span></el-button>
            </template>
          </el-table-column>
          <el-th class="addClassButton">
            <i class="fa fa-plus-square" aria-hidden="true" @click="addClassButton" style="padding: 15px;">&nbsp;&nbsp;新增班级类型</i>
          </el-th>
        </el-table>
        <div class="addClassButton">
          <i class="fa fa-plus-square" aria-hidden="true" @click="addClassButton" style="padding: 15px;">&nbsp;&nbsp;新增班级类型</i>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="brandManageVisible = false">取 消</el-button>
          <el-button type="success" @click="brandManageVisible = false">保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<style>
  .brandmanagement{
    padding: 10px 40px;
    margin: 0;
  }
  .brandmanagement .header p{
    font-size: 14px;
    margin: 10px 0px;
  }
  .brandmanagement{
    padding: 0px 40px;
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .brandmanagement .content-top{
    min-height: 120px;
    border: 1px solid #ddd;
    margin: 10px 0px;
    padding: 10px;
    text-align: left;
  }
  .brandmanagement .top-span{
    color: #006287;
  }
  .brandmanagement .top-span-bot{
    color: #A0A0A0;
    font-size: 10px;
    line-height: 40px;
  }
  .brandmanagement .content-top .el-button{
    padding: 5px 10px;
    font-size: 10px;
    background-color: #ED6C2E;
    border-color: #ED6C2E;
  }
  .brandmanagement .intercity-list{
    width: 210px;
    height: 300px;
    display: inline-block;
    margin-right: 2%;
  }
  .brandmanagement .intercity-list:last-child{
    margin-right: 0;
  }
  .brandmanagement .intercity-li{
    border: 1px solid #ddd;
    padding: 5px 20px;
    border-radius: 50px;
    background-color: #ddd;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .brandmanagement .el-card{
    width: 180px;
    height: 280px;
    padding: 0 20px;
  }
  .brandmanagement .el-card .el-button--text{
    float: right;
    margin-top: 5px;
    padding: 0;
  }
  .brandmanagement .el-card__header{
    padding: 10px 0px;
  }
  .brandmanagement .el-card__body {
    padding: 0px 0px;
    overflow: auto;
    height: 185px;
  }
  .brandmanagement .el-card__body ul{
    color: #A0A0A0;
    list-style: inside;
  }
  .brandmanagement .el-card__body ul li{
    border-bottom:1px solid #ddd;
  }
  .brandmanagement .span-button{
    font-size: 70px;
    text-align: center;
    margin-top: 80px;
    margin-left: 55px;
    cursor: pointer;
  }
  .brandmanagement .el-dialog__body {
    color: #606266;
    font-size: 14px;
  }
  .brandmanagement .el-input__inner{
    width: 80%;
  }
  .brandmanagement .el-dialog__footer{
    text-align: center;
  }
  .brandmanagement .e-card-p{
    line-height: 30px;
    background-color: #ddd;
    padding: 5px;
  }
  .brandmanagement .el-card-li{
    font-size: 8px;
    color: #A0A0A0;
  }
  .brandmanagement .el-card-li span{
    color: #333333;
    font-weight: bold;
  }
  .brandmanagement .el-table--enable-row-transition .el-table__body td,.brandmanagement .el-table th>.cell{
    text-align: center;
  }
  .brandmanagement .addClassButton{
    width: 99.7%;
    border-top: 0px !important;
    border: 1px solid #EBEEF5;
    color: #ED6C2E;
  }
  .brandmanagement .addClassButton i{
    cursor: pointer;
  }
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
   padding: 0 !important;
  }
</style>
<script>
  export default {
    components: {
    },
    data() {
      return {
        klass:'',
        addbrandVisible: false,
        editbrandVisible: false,
        brandManageVisible: false,
        brandName: '',
        editStyleObj:{
          background: '#ffffff',
          border: '0px'
        },
        unEditStyleObj:{
          background: '#f5f7fa',
          border: '1px solid #E4E7ED',
          color: '#C0C4CC',
        },
        editForm:{
          id:'',
          name:'',
          klass:'',
          grade:'',
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        manageTitle:'班级管理',
        tableData: [{
          id: 1,
          no:'1',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          edit: true,
        }, {
          id: 2,
          no:'2',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          edit: true,
        }, {
          id: 3,
          no:'3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          edit: true,
        }, {
          id: 4,
          no:'4',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          edit: true,
        }],
        columnLabel1:'班级类型编码',
        columnLabel2:'班级类型',
        multipleSelection:'',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addDialog: function () {
        this.addbrandVisible = true;
        this.brandName = '';
      },
      manageBrand: function (flag) {
        this.brandManageVisible = true;
        if(flag == -1){
          this.manageTitle = '班级管理';
          this.columnLabel1 = '班级类型编码';
          this.columnLabel2 = '班级类型';
        }else{
          this.manageTitle = '年级管理';
          this.columnLabel1 = '年级类型编码';
          this.columnLabel2 = '年级类型';
        }
      },
      addClassButton: function(){
        const obj = {
          id:'',
          no:'',
          name: '',
          address: '',
          edit: false,
        }
        this.tableData.push(obj);
      },
      editManage:function(obj){
        const index = this.tableData.findIndex(item => item.id === obj.id);
        this.tableData[index].edit = false;
      },
      deleteButton: function(obj){
        this.tableData.splice(this.tableData.findIndex(item => item.id === obj.id), 1);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClick(row) {
        console.log(row);
      }
    }
  }
</script>
