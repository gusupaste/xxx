<template>
  <div class='revenuetarget wrap'>
    <div class="header">
      <p>YOU ARE HERE : 校园 >> <span class="font-cl-blue">校园收入目标</span></p>
      <p><span>城际：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">区域：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">校园：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">学年：</span>
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
      <el-table
        :data="tableData"
        border
        show-header
        show-summary
        style="width: 100%">
        <el-table-column
          prop="code"
          label="编号"
          min-width="30">
        </el-table-column>
        <el-table-column
          prop="name"
          label="校园名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="month_1"
          label="2018/09"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_2"
          label="2018/10"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_3"
          label="2018/10"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_4"
          label="2018/11"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_5"
          label="2018/12"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_6"
          label="2019/1"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_7"
          label="2019/2"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_8"
          label="2019/3"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_9"
          label="2019/4"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_10"
          label="2019/5"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_11"
          label="2019/6"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="month_total"
          label="合计"
          min-width="60">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="30">
          <template slot-scope="scope">
            <i @click="editDialog" class="fa fa-pencil-square-o orange"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, slot"
        prev-text="上一页"
        next-text="下一页"
        :total="1000" class="page">
        <div class="div-page"><input class="el-input__inner input-page" type="text"/><div class="div-page-sure">确定</div></div>
      </el-pagination>
    </div>
    <!--编辑 弹框-->
    <el-dialog title="编辑折扣" :visible.sync="editDiscount" width="50%" style="padding: 30px 60px;">
      <el-form label-width="120px" :model="formLabelAlign">
        <el-form-item label="学年:">
          <!--<el-input v-model="formLabelAlign.year" maxlength="15" style="width: 60%" readonly=""></el-input>-->
          <span>{{formLabelAlign.year}}</span>
        </el-form-item>
        <el-form-item label="校园编码:">
          <!--<el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>-->
          <span>{{formLabelAlign.code}}</span>
        </el-form-item>
        <el-form-item label="学校名称:">
          <span>{{formLabelAlign.schoolName}}</span>
        </el-form-item>
        <el-form-item label="折扣类型:">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣预算:">
          <el-input type="text" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="editDiscount = false">取 消</el-button>
          <el-button type="success" @click="editDiscount = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
        value: '-所有-',
        tableData: [{
          code: '1001',
          name: '北京首府校园',
          month_1: '10',
          month_2: '13',
          month_3: '7',
          month_4: '8',
          month_5: '12',
          month_6: '10',
          month_7: '10',
          month_8: '3',
          month_9: '17',
          month_10: '5',
          month_11: '15',
          month_total: '110'
        },
          {
            code: '1001',
            name: '北京首府校园',
            month_1: '10',
            month_2: '13',
            month_3: '7',
            month_4: '8',
            month_5: '12',
            month_6: '10',
            month_7: '10',
            month_8: '3',
            month_9: '17',
            month_10: '5',
            month_11: '15',
            month_total: '110'
          }],
        editDiscount: false,
        formLabelAlign: {
          year:'2018-01-01',
          code:'1001',
          schoolName:'XXXXXXXXXXXXX'
        }
      }
    },
    methods:{
      editSchool:function () {

      },
      editDialog: function () {
        this.editDiscount = true;
      }
    }
  }
</script>

<style>
  .revenuetarget {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .revenuetarget p {
    margin: 10px;
  }

  .revenuetarget .header p {
    font-size: 14px;
  }

  .revenuetarget .el-button--text {
    background: 0 0;
    padding: 10px;
    border-radius: 25px;
    width: 80px;
    background-color: #0b6289;
    color: white;
    margin: 0 5px;
  }
  /*分页样式*/
  .revenuetarget .page{
    text-align: center;
    padding: 30px;
  }
  .revenuetarget .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: orange;
  }
  .revenuetarget .div-page{
    display: -webkit-inline-box;
    width: 70px;
    text-align: left;
    height: auto;
    margin-left: 5px;
  }
  .revenuetarget .div-page .input-page{
    height: 28px;
    width: 60%;
    padding: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .revenuetarget .div-page .div-page-sure{
    height: 26px;
    line-height: 26px;
    border: 1px solid #ccc;
    padding: 0 10px;
    margin-left: -32px;
    color: #606266;
    font-size: 12px;
    border-radius: 2px;
  }
  /*表格内容居中*/
  .revenuetarget .el-table td,.revenuetarget .el-table th{
    text-align: center;
  }
  .revenuetarget .el-dialog__footer{
    text-align: center;
  }

</style>
