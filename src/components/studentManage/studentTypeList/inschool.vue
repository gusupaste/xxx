<template>
  <div class="student_inschool">
      <div class="formwrap">
        <el-form ref="form" :model="form" label-width="100px" inline>
          <el-form-item label="班级：">
            <el-select v-model="class_val">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in class_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生性别：">
            <el-select v-model="gender" placeholder="请选择学生性别">
              <el-option value="" label="全部"></el-option>
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型："><!--暂时不做-->
            <el-select v-model="in_type" placeholder="请选择活动区域">
              <el-option value="" label="全部"></el-option>
              <el-option label="在校" value="in"></el-option>
              <el-option label="休学" value="out"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学日期：">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input v-model="searchText" placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="studentFileList">
        <div class="studentFileCard left" v-for="(item , index) in list " :key="index">
          <div style="padding:15px" @click="$router.push('/studentManage/student-detail/1')">
            <div class="avatar inline-block">
              <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o" aria-hidden="true"></i>
            </div>
            <div class="card-content inline-block">
              <p>
                <span style="font-size:15px;font-weight:600">学生A</span>
                <i style="font-size:14px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
              </p>
              <p>出生日期：1020/11/09</p>
              <p>学号：00000</p>
              <p>所在校园：北京校园-小一班</p>
              <p>入学时间：1020/11/09<span>入圆时间：1020/11/09</span></p>
            </div>
          </div>
          <div class="card-footer clearfix">
            <span>执行操作</span>
            <el-select v-model="nameSelect" @change="operationSelect(nameSelect)" placeholder="--请选择--">
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
    <el-dialog title="入园登记" :visible.sync="operationVisible" width="750px">
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
          <span class="title-span">学年历史：</span>
          <hr>
          <el-table
            :data="chargeTableDate"
            border
            stripe
            show-header
            style="width: 100%;">
            <el-table-column
              prop="code"
              label="学年">
            </el-table-column>
            <el-table-column
              prop="name"
              label="所在班级">
            </el-table-column>
            <el-table-column
              prop="intercity_name"
              label="报名日期">
            </el-table-column>
            <el-table-column
              prop="intercity_name"
              label="入学日期">
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="截止日期">
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="状态">
            </el-table-column>
          </el-table>
        </div>
        <div class="oper-div">
          <span class="title-span">入园登记</span>
          <br><hr><br>
          <el-form-item label="学年">
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
            <el-select v-model="nameSelect" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="报名日期">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入学日期">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止日期">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
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
    <el-dialog title="在校生终止服务" :visible.sync="earlyVisible" width="850px">
      <el-form ref="operationForm" :model="operationForm" :rules="rules" label-width="80px">
        <div class="oper-div">
          <span class="title-span">终止服务：</span><hr>
          <el-row>
            <el-col :span="6">
              <p class="lable-p">
                <span class="labels">姓名:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p class="lable-p">
                <span class="labels">学号:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p class="lable-p">
                <span class="labels">所在班级:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
            <el-col :span="6">
              <p class="lable-p">
                <span class="labels">入学日期:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 90px;">终止费用类型:</span>
                <el-select v-model="nameSelect" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 90px;">申请终止日期:</span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 110px;">可退转金额合计:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
          </el-row>
          <el-form-item label="申请原因说明" label-width="90">
            <el-input type="textarea"
                      style="width: 88%;"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="value1">
            </el-input>
          </el-form-item>
        </div>
        <div class="oper-div">
          <span class="title-span">缴费记录</span><hr>
          <el-table
            :data="chargeTableDate"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 10px;">
            <el-table-column
              prop="code"
              label="费用类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="费用科目">
            </el-table-column>
            <el-table-column
              prop="name"
              label="缴费区间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="校日历总数（月数）">
            </el-table-column>
            <el-table-column
              prop="name"
              label="月度单价">
            </el-table-column>
            <el-table-column
              prop="name"
              label="缴费金额">
            </el-table-column>
            <el-table-column
              prop="name"
              label="缴费日期">
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="earlyVisible = false">取 消</el-button>
          <el-button type="success">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  .student_inschool .formwrap {
    margin-top: 20px;
  }
  .student_inschool .studentFileList {
    margin-top: 20px;
  }
  .student_inschool .el-form-item {
    margin-bottom: 10px;
  }
  .student_inschool .studentFileCard {
    cursor: pointer;
    margin-right: 1%;
    margin-bottom: 40px;
    border: 1px solid #bbb;
    width: 32%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    -moz-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
  }
  .student_inschool .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .student_inschool .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .student_inschool .studentFileCard .card-footer{
    background-color: #999;
    padding: 10px;
    font-size: 12px;
    color:#fff;
  }
  .student_inschool .studentFileCard .card-footer span {
    display: inline-block;
    text-align: center;
    width: 33%;
    line-height: 17px;
  }
  .student_inschool .studentFileCard  img{
    width: 100px;
    height: 100px;
  }
  .student_inschool hr{
    margin: 10px 0px;
    border: 0;
    border-bottom: 1px solid #ddd;
  }
  .student_inschool .labels{
    width: 60px;
    float: left;
    text-align: right;
  }
  .student_inschool .lable-p{
    line-height: 40px;
  }
  .student_inschool .oper-div{
    margin-bottom: 20px;
  }
  .student_inschool >>> .el-radio{
    line-height: 3;
  }
</style>
<script>
export default {
  props:{
    class_list: {
      type:Array,
      request:true,
    },
    student_list: {
      type:Array,
      request:true,
    },
  },
  data(){
    return {
      class_val:'',
      gender:'',
      in_type:'',
      dateValue:'',
      searchText:'',
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
      operationVisible:false,
      leaveVisible:false,
      earlyVisible:false,
      operations:[
        {
          value:1,
          label:'入学登记'
        },
        {
          value:2,
          label:'毕业、离园登记'
        },
        {
          value:3,
          label:'终止服务'
        },
      ],
      nameSelect:'',
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
    }
  },
  methods:{
    getStudentList(){

    },
    operationSelect:function(val){
      if(val === 1){
        this.operationVisible = true;
      }else if(val === 2){
        this.leaveVisible = true;
      }else if(val === 3){
        this.earlyVisible = true;
      }
    },
  }}
</script>
