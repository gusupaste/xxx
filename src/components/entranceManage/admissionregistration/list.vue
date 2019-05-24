<template>
    <div class="admissionRegistrationlist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 入学管理 > <span class="font-cl-blue">预备生入园登记</span></p>
      </div>
      <div class="content">
        <div class="select-header">
          <el-input v-model="input" placeholder="输入学号、学生姓名或者学生卡号" class="search_input"></el-input>
          <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
        </div>
        <div class="list-content">
          <div class="studentFileCard left" v-for="(item , index) in list " :key="index">
            <div style="padding:20px" @click="$router.push('/studentFile/studentFileDetail/9')">
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
              <el-select v-model="nameSelect" @change="operationSelect(nameSelect)" placeholder="--请选择--" style="width: 60%;">
                <el-option
                  v-for="item in operations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="预备生入园登记" :visible.sync="operationVisible" width="750px">
        <el-form ref="operationForm" :model="operationForm" :rules="rules" label-width="80px">
          <div class="oper-div">
            <span class="title-span">学生基本信息</span>
            <hr>
            <el-row>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">姓名:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">所属校园:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">学年计划:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">年龄:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">意向班级:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">缴费区间:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">性别:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">主教老师:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">预计入学日期:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="oper-div">
            <span class="title-span">入园登记</span>
            <br><hr><br>
            <el-form-item label="入园日期">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="安排入班">
              <el-select v-model="nameSelect" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="value1">
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="operationVisible = false">取 消</el-button>
          <el-button type="success">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="early_title" :visible.sync="earlyVisible" width="750px">
        <el-form ref="operationForm" :model="operationForm" :rules="rules" label-width="80px">
          <div class="oper-div">
            <span class="title-span">学生基本信息</span><hr>
            <el-row>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">姓名:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">所属校园:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">学年计划:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">年龄:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">意向班级:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">缴费区间:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">性别:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">主教老师:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">预计入学日期:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="oper-div">
            <span class="title-span">联系人信息</span><hr>
            <el-table
              :data="chargeTableDate"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="code"
                label="家长姓名">
              </el-table-column>
              <el-table-column
                prop="name"
                label="关系">
              </el-table-column>
              <el-table-column
                prop="name"
                label="国籍">
              </el-table-column>
              <el-table-column
                prop="name"
                label="移动电话">
              </el-table-column>
              <el-table-column
                prop="name"
                label="家庭电话">
              </el-table-column>
              <el-table-column
                prop="name"
                label="办公室电话">
              </el-table-column>
              <el-table-column
                prop="name"
                label="电子邮件">
              </el-table-column>
              <el-table-column
                prop="name"
                label="首选联系方式">
              </el-table-column>
              <el-table-column
                prop="name"
                label="首选联系方式">
              </el-table-column>
              <el-table-column
                prop="name"
                label="紧急联系方式">
              </el-table-column>
            </el-table>
          </div>
          <div class="oper-div">
            <span class="title-span">提前入学申请</span><hr>
            <el-form-item label="提前入园日期" label-width="120">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="申请原因">
              <el-radio-group v-model="radio2">
                <el-radio :label="3">休假</el-radio>
                <el-radio :label="6">身体原因</el-radio>
                <el-radio :label="9" style="display: inline-block">其他</el-radio>
              </el-radio-group>
              <el-input type="text" style="width: auto;display: inline-block"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="earlyVisible = false">取 消</el-button>
          <el-button type="success">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="预备生离园登记" :visible.sync="leaveVisible" width="750px">
        <el-form ref="operationForm" :model="operationForm" :rules="rules" label-width="80px">
          <div class="oper-div">
            <span class="title-span">学生基本信息</span><hr>
            <el-row>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">姓名:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">所属校园:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">学年计划:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">年龄:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">意向班级:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels">缴费区间:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">性别:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">主教老师:</span>
                  <span>迪小贝</span>
                </p>
                <p class="lable-p">
                  <span class="labels" style="width: 90px;">预计入学日期:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
            </el-row>
          </div>
          <div class="oper-div">
            <span class="title-span">离园登记</span>
            <hr>
            <el-row>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">离园申请:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">离园访谈:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
              <el-col :span="8">
                <p class="lable-p">
                  <span class="labels">所在学年:</span>
                  <span>迪小贝</span>
                </p>
              </el-col>
            </el-row>
            <el-form-item label="离园日期">
              <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="离园原因">
              <el-radio-group v-model="radio2">
                <el-radio :label="3">居所搬迁/父母工作调动</el-radio><br>
                <el-radio :label="6">家庭变故</el-radio><br>
                <el-radio :label="9">生病</el-radio><br>
                <el-radio :label="12">其他</el-radio>
              </el-radio-group>
              <el-select v-model="nameSelect" @change="operationSelect(nameSelect)" placeholder="--请选择--" style="width: 180px;">
                <el-option
                  v-for="item in operations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input style="width: 180px;"></el-input>
            </el-form-item>
          </div><hr>
          <p style="font-size: 10px;color: red;line-height: 20px;">*1.请确认该学生所有缺勤转备用金都已完成,否则不可提交离园登记</p>
          <p style="font-size: 10px;color: red;line-height: 20px;">&nbsp;2.一旦离园登记结束,该学生自动转为离园生状态</p>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="leaveVisible = false">取 消</el-button>
          <el-button @click="leaveShowVisible = true;leaveVisible = false">缺勤转备用金</el-button>
          <el-button type="success">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="预备生离园登记" :visible.sync="leaveShowVisible" width="450px" class="leaveShow">
        <span class="dialog-body">该学生存在未完成的缺勤转备用金,请先完成再进行离园登记</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="leaveShowVisible = false">缺勤转备用金</el-button>
          <el-button @click="leaveShowVisible = false" type="success">知道了</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        radio2:'',
        early_title:'提前入学申请',
        earlyVisible:false,
        leaveVisible:false,
        leaveShowVisible:false,
        nameSelect:[],
        operations:[{
          value: 1,
          label: '入园登记'
        }, {
          value: 2,
          label: '提前入学申请'
        }, {
          value: 3,
          label: '推迟入学申请'
        }, {
          value: 4,
          label: '离园登记'
        }],
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
        operation_title:'预备生入园登记',
        operationVisible:false,
        operationForm:{

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
      },
      operationSelect:function(val){
        if(val === 1){
          this.operationVisible = true;
        }else if(val === 2){
          this.early_title = '预备生提前入学申请';
          this.earlyVisible = true;
        }else if(val === 3){
          this.early_title = '预备生推迟入学申请';
          this.earlyVisible = true;
        }else{
          this.leaveVisible = true;
        }
      },
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
  .admissionRegistrationlist .labels{
    width: 60px;
    float: left;
    text-align: right;
  }
  .admissionRegistrationlist .lable-p{
    line-height: 40px;
  }
  .admissionRegistrationlist >>> .el-dialog__footer{
    text-align: center;
  }
  .admissionRegistrationlist hr{
    margin: 10px 0px;
    border: 0;
    border-bottom: 1px solid #ddd;
  }
  .admissionRegistrationlist >>> .el-dialog__body{
    padding: 0px 20px 20px 20px;
  }
  .admissionRegistrationlist .title-span{
    color: #333333;
    font-weight: bold;
  }
  .admissionRegistrationlist .oper-div{
    margin: 20px 0;
  }
  .admissionRegistrationlist >>> .el-radio{
    line-height: 3;
  }
  .admissionRegistrationlist .leaveShow .dialog-body{
    text-align: center !important;
    line-height: 120px;
    margin-left: 80px;
  }
</style>
