<template>
  <div class="parentbusinessapplication wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">家长业务申请查询</span></p>
    </div>
    <div class="header-top">
      <p><span >城际：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="ml20">区域：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="ml20">校园：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="ml20">申请类型：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="ml20">申请日期：</span>
        <el-date-picker class="date_style" type="date" placeholder="选择日期"></el-date-picker>
        <span>到</span>
        <el-date-picker class="date_style" type="date" placeholder="选择日期"></el-date-picker>
        <span class="ml20">状态：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="ml20">学生信息：</span>
        <el-input type="text" placeholder="请输入"  class="search_input" style="width:220px"></el-input>
        <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
      </p>
      <el-table
      class="mt26"
        :data="tableList"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="no"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="student_status"
          label="学生状态">
        </el-table-column>
        <el-table-column
          prop="business_type"
          label="业务类型">
        </el-table-column>
        <el-table-column
          prop="parent_name"
          label="家长姓名">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="update_date"
          label="变更日期">
        </el-table-column>
        <el-table-column
          prop="apply_date"
          label="申请日期">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="applicationDetail(scope.row)" class="font-cl-blue" type="text" size="small">详情
            </el-button>
            <span style="color: #EBEEF5">|</span>
            <el-button @click="applicationCancel(scope.row)" class="orange" type="text" size="small">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑 弹框-->
    <el-dialog title="详情页面" :visible.sync="detaildialog" width="50%">

      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="detaildialog = false">取 消</el-button>
          <el-button type="success" @click="detaildialog = false">保 存</el-button>
        </span>
    </el-dialog>
    <!--作废 弹框-->
    <el-dialog title="作废业务申请" :visible.sync="canceldialog" width="50%">
      <div class="text-align-center">
        <span>是否确定要作废此业务申请？</span>
      </div>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="canceldialog = false">取 消</el-button>
          <el-button type="success" @click="canceldialog = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: '-所有-',
        detaildialog: false,
        canceldialog: false,
        options: [],
        tableList: []
      }
    },
    methods: {
      applicationDetail: function () {
        this.detaildialog = true
      },
      applicationCancel: function () {
        this.canceldialog = true
      }
    }
  }
</script>

<style scoped>
  .parentbusinessapplication {
    text-align: left;
  }

  .parentbusinessapplication .header-top {
    margin-top: 10px;
  }

  .parentbusinessapplication .header-top p {
    font-size: 14px;
  }
 
  .parentbusinessapplication >>> .el-select{
    margin-bottom: 10px;
  }
  .parentbusinessapplication >>> .el-input{
    width: 145px;
    height: 32px;
  }

  /*表格内容居中*/
  .parentbusinessapplication >>> .el-table td, .parentbusinessapplication >>> .el-table th {
    text-align: center;
  }

  .parentbusinessapplication >>> .el-dialog__footer {
    text-align: center;
  }
  .parentbusinessapplication >>> .search_input .el-input__inner{
    width: 100%;
  }
</style>
