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
    <el-dialog title="详情页面" class="el-dialog-table" :visible.sync="detaildialog" width="50%">
      <table class="table">
        <tbody>
        <tr>
          <td colspan="4">学生信息</td>
        </tr>
        <tr>
          <td>学生姓名<span class="red">*</span></td>
          <td>史诗</td>
          <td>所在校园<span class="red">*</span></td>
          <td>金坛碧水华庭校园</td>
        </tr>
        <tr>
          <td>所在班级<span class="red">*</span></td>
          <td>大三班</td>
          <td>班级主讲</td>
          <td><el-input placeholder="请输入"></el-input></td>
        </tr>
        <tr>
          <td>学生状态</td>
          <td colspan="3">
            <el-radio-group v-model="radio">
              <el-radio :lable="1">预备生</el-radio>
              <el-radio :lable="2">在校生</el-radio>
              <el-radio :lable="3">离园生</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="4">申请人/家长信息</td>
        </tr>
        <tr>
          <td>申请人姓名<span class="red">*</span></td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>申请人身份<span class="red">*</span></td>
          <td><el-radio-group v-model="radio">
            <el-radio :lable="1">家长</el-radio>
            <el-radio :lable="2">校园人员</el-radio>
          </el-radio-group></td>
        </tr>
        <tr>
          <td>家长姓名<span class="red">*</span></td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>与学生关系<span class="red">*</span></td>
          <td><el-radio-group v-model="radio">
            <el-radio :lable="1">父亲</el-radio>
            <el-radio :lable="2">母亲</el-radio>
            <el-radio :lable="3">其他</el-radio>
          </el-radio-group></td>
        </tr>
        <tr>
          <td>联系电话</td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>手机号码<span class="red">*</span></td>
          <td><el-input placeholder="请输入"></el-input></td>
        </tr>
        <tr>
          <td>邮件地址<span class="red">*</span></td>
          <td colspan="3"><el-input placeholder="请输入"></el-input></td>
        </tr>
        <tr>
          <td colspan="4">申请信息</td>
        </tr>
        <tr>
          <td rowspan="2">申请类别<span class="red">*</span></td>
          <td rowspan="2"><el-radio-group v-model="radio">
            <el-radio :lable="1">离园退费</el-radio>
            <el-radio :lable="2">中止用餐</el-radio>
            <el-radio :lable="3">用餐变更</el-radio>
            <el-radio :lable="3">中止校车</el-radio>
            <el-radio :lable="3">校车变更</el-radio>
            <el-radio :lable="3">班级变更</el-radio>
            <el-radio :lable="3">休学申请</el-radio>
            <el-radio :lable="3">转园申请</el-radio>
          </el-radio-group></td>
          <td >申请原因<span class="red">*</span></td>
          <td><el-checkbox-group v-model="checkList">
            <el-checkbox label="毕业"></el-checkbox>
            <el-checkbox label="居所搬迁/工作调动/家庭其他原因"></el-checkbox>
            <el-checkbox label="路途遥远"></el-checkbox>
            <el-checkbox label="出国"></el-checkbox>
            <el-checkbox label="孩子太小/生病"></el-checkbox>
            <el-checkbox label="转公立园/国际学校"></el-checkbox>
            <el-checkbox label="教师更好频繁"></el-checkbox>
            <el-checkbox label="教师水平低/态度不好/蒙氏不专业"></el-checkbox>
            <el-checkbox label="缺外教/外教更换/外教水平差"></el-checkbox>
            <el-checkbox label="课程不系统"></el-checkbox>
            <el-checkbox label="孩子学不到知识"></el-checkbox>
            <el-checkbox label="孩子英语能力没有提高"></el-checkbox>
            <el-checkbox label="校园真题服务质量/服务意识"></el-checkbox>
            <el-checkbox label="园长能力/态度"></el-checkbox>
            <el-checkbox label="校园安全/班级看管"></el-checkbox>
            <el-checkbox label="饮食"></el-checkbox>
            <el-checkbox label="家园沟通"></el-checkbox>
            <el-checkbox label="缺校车/校车线路"></el-checkbox>
          </el-checkbox-group></td>
        </tr>
        <tr>
          <td>起止日期</td>
          <td><el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker></td>
        </tr>
        <tr>
          <td>变更/离园日期<span class="red">*</span></td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>提交日期</td>
          <td>3/14/2019</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3"><textarea></textarea></td>
        </tr>
        </tbody>
      </table>
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
        this.getStudentInfo()
      },
      getStudentInfo: function () {
        this.$axios.get('/api/application/student_info/210518143/')
          .then(res => {
            this.intercityList = res.data.intercity_list
          }).catch(err => {

        })
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

  .parentbusinessapplication .el-dialog-table table{
    border: 2px #ccc solid;
    border-collapse: collapse;
    width: 100%;
  }
  .parentbusinessapplication .el-dialog-table td{
    border: 2px #ccc solid;
    padding: 5px;
    min-width: 100px;
  }
  .parentbusinessapplication .el-dialog-table textarea{
    width: 80%;
    min-height: 200px;
  }
  .parentbusinessapplication .el-dialog-table >>> .el-date-editor.el-input,.parent >>> .el-date-editor.el-input__inner{
    width: 145px;
    height: 32px;
  }
</style>
