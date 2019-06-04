<template>
  <div class="student_inschool">
      <div class="formwrap">
        <el-form label-width="60px" inline>
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
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input v-model="searchText" placeholder="输入学号、学生姓名" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getStudentList()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="studentFileList">
        <div class="studentFileCard" v-for="(item , index) in student_list "
             :key="index">
          <div style="padding:15px" @click="$router.push('/studentManage/student-detail/' + item.id)">
            <div class="avatar inline-block">
              <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o" aria-hidden="true"></i>
            </div>
            <div class="card-content inline-block">
              <p>
                <span style="font-size:15px;font-weight:600">{{ item.name }}</span>
                <i v-if="item.gender ==='男生'" style="font-size:15px;color:#51a5ff;" class="fa fa-mars" aria-hidden="true"></i>
                <i v-if="item.gender ==='女生'" style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
              </p>
              <p>出生日期：{{ item.date_of_birth }}</p>
              <p>学号：{{ item.student_no }}</p>
              <p>所在校园：{{ item.center_name }}</p>
              <p>入园时间：{{ item.enter_date }}</p>
            </div>
          </div>
          <div class="card-footer clearfix">
            <span>执行操作</span>
            <el-dropdown trigger="click" @command="handleCommand($event,item.id,index)">
              <span class="el-dropdown-link">
                <el-input :value="item.selectType" class="cur" placeholder="请选择"></el-input>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">入园登记</el-dropdown-item>
                <el-dropdown-item command="2">毕业、离园登记</el-dropdown-item>
                <el-dropdown-item command="3">终止服务</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--<el-select v-model="item.selectType" @change="operationSelect(item.selectType,item.id)" placeholder="&#45;&#45;请选择&#45;&#45;">
              <el-option
                v-for="item in operations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
          </div>
        </div>
      </div>
    <div>
      <el-pagination
        background
        layout="prev,pager, next, jumper"
        :current-page="currentPage"
        :page-size="9"
        @current-change="changePage"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="入园登记" :visible.sync="operationVisible" width="750px">
      <el-form ref="reulsForm" :model="reulsForm" :rules="rules" label-width="80px">
        <div class="oper-div">
          <span class="title-span">学生基本信息</span>
          <hr>
          <el-row>
            <el-col :span="7">
              <p class="lable-p">
                <span class="labels">学号：</span>
                <span>{{ studentInfo.student_no }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">出生日期：</span>
                <span>{{ studentInfo.date_of_birth }}</span>
              </p>
            </el-col>
            <el-col :span="7">
              <p class="lable-p">
                <span class="labels">姓名：</span>
                <span>{{ studentInfo.name }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">报名日期：</span>
                <span>{{ studentInfo.sign_up_date }}</span>
              </p>
            </el-col>
            <el-col :span="10">
              <p class="lable-p">
                <span class="labels">性别：</span>
                <span>{{ studentInfo.gender }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">入园日期：</span>
                <span>{{ studentInfo.enter_date }}</span>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <p class="lable-p">
                <span class="labels">学年计划：</span>
                <span>{{ studentInfo.academic_year }}</span>
              </p>
            </el-col>
            <el-col :span="17">
              <p class="lable-p">
                <span class="labels">所属校园：</span>
                <span>{{ studentInfo.center }}</span>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <p class="lable-p">
                <span class="labels">缴费区间：</span>
                <span>{{ studentInfo.date_range }}</span>
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="oper-div">
          <span class="title-span">学年历史：</span>
          <hr>
          <el-table
            :data="yearlist"
            border
            stripe
            show-header
            style="width: 100%;">
            <el-table-column
              prop="academic_year"
              label="学年">
            </el-table-column>
            <el-table-column
              prop="class_name"
              label="所在班级">
            </el-table-column>
            <el-table-column
              prop="sign_up_date"
              label="报名日期">
            </el-table-column>
            <el-table-column
              prop="in_class_date"
              label="入学日期">
            </el-table-column>
            <el-table-column
              prop="out_class_date"
              label="截止日期">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
            </el-table-column>
          </el-table>
        </div>
        <div class="oper-div">
          <span class="title-span">入园登记</span>
          <br><hr><br>
          <el-form-item label="学年：" prop="academic_year">
            <el-select v-model="reulsForm.academic_year" @change="changeAcadYear(reulsForm.academic_year)" placeholder="请选择学年">
              <el-option
                v-for="item in year_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="安排入班：" required>
            <el-col :span="7">
              <el-form-item prop="status">
                <el-select v-model="reulsForm.status" placeholder="请选择">
                  <el-option v-for="fre in classList" :label="fre.name" :value="fre.id" :key="fre.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="class_obj">
                <el-select v-model="reulsForm.class_obj" placeholder="请选择">
                  <el-option
                    v-for="item in in_class_list"
                    :key="item.id"
                    :label="item.center_class__name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item label="报名日期：" prop="sign_up_date">
                <el-date-picker
                  v-model="reulsForm.sign_up_date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="入学日期：" prop="in_class_date">
                <el-date-picker
                  v-model="reulsForm.in_class_date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="截止日期：" prop="out_class_date">
                <el-date-picker
                  v-model="reulsForm.out_class_date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注：">
            <el-input type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="reulsForm.remarks">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="operationVisible = false">取 消</el-button>
          <el-button class="bg-green bd-green white" type="success" @click="saveInputSchool('reulsForm')">保 存</el-button>
        </span>
    </el-dialog>
    <el-dialog title="在校生离园登记" :visible.sync="leaveVisible" width="750px">
      <el-form ref="leveForm" :model="leveForm" :rules="rules" label-width="80px">
        <div class="oper-div">
          <span class="title-span">学生基本信息</span>
          <hr>
          <el-row>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">姓名:</span>
                <span>{{ studentInfo.name }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">学年计划:</span>
                <span>{{ studentInfo.academic_year }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">年龄:</span>
                <span>{{ studentInfo.age }}&nbsp;</span>
              </p>
              <p class="lable-p">
                <span class="labels">所在班级:</span>
                <span>{{ studentInfo.preferred_class }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 90px;">性别:</span>
                <span>{{ studentInfo.gender }}&nbsp;</span>
              </p>
              <!--<p class="lable-p">
                <span class="labels" style="width: 90px;">预计入学日期:</span>
                <span>{{ studentInfo.enter_date }}</span>
              </p>-->
            </el-col>
            <el-col :span="8">
              <!--<p class="lable-p">
                <span class="labels">缴费区间:</span>
                <span>{{ studentInfo.date_range }}</span>
              </p>-->
            </el-col>
            <el-col :span="16">
              <p class="lable-p">
                <span class="labels">所属校园:</span>
                <span>{{ studentInfo.center }}</span>
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
                <span>{{ studentRemark }}</span>
              </p>
            </el-col>
            <!--<el-col :span="8">
              <p class="lable-p">
                <span class="labels">离园访谈:</span>
                <span>迪小贝</span>
              </p>
            </el-col>-->
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">所在学年:</span>
                <span>{{ studentInfo.academic_year }}</span>
              </p>
            </el-col>
          </el-row>
          <el-form-item label="离园日期：" prop="leave_date">
            <el-date-picker
              v-model="leveForm.leave_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离园原因：" prop="leave_reason">
            <el-radio v-model="leveForm.leave_reason" label="居所搬迁/父母工作调动"></el-radio><br>
            <el-radio v-model="leveForm.leave_reason" label="家庭变故"></el-radio><br>
            <el-radio v-model="leveForm.leave_reason" label="生病"></el-radio><br>
            <el-radio v-model="leveForm.leave_reason" label="其他"></el-radio>
            <!--<el-select v-model="leveForm.leave_reason" placeholder="&#45;&#45;请选择&#45;&#45;" style="width: 180px;">
              <el-option
                v-for="item in operations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
            <el-input style="width: 180px;" v-model="otherText"></el-input>
          </el-form-item>
        </div><hr>
        <p style="font-size: 10px;color: red;line-height: 20px;">*1.请确认该学生所有缺勤转备用金都已完成,否则不可提交离园登记</p>
        <p style="font-size: 10px;color: red;line-height: 20px;">&nbsp;&nbsp;2.一旦离园登记结束,该学生自动转为离园生状态</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="leaveVisible = false">取 消</el-button>
          <el-button @click="transferReserveForAbsenteeism">缺勤转备用金</el-button>
          <el-button type="success" @click="saveLeave('leveForm')">保 存</el-button>
        </span>
    </el-dialog>
    <el-dialog title="在校生离园登记" :visible.sync="leaveShowVisible" width="450px" class="leaveShow">
      <span class="dialog-body">该学生存在未完成的缺勤转备用金,请先完成再进行离园登记</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="transferReserveForAbsenteeism">缺勤转备用金</el-button>
          <el-button @click="leaveShowVisible = false" type="success">知道了</el-button>
        </span>
    </el-dialog>
    <el-dialog title="在校生终止服务" :visible.sync="earlyVisible" width="850px">
      <el-form ref="reulsForm3" :model="reulsForm3" :rules="rules" label-width="80px">
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
                <el-select v-model="reulsForm3.class_obj" placeholder="请选择">
                </el-select>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 90px;">申请终止日期:</span>
                <el-date-picker
                  v-model="reulsForm3.status"
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
          <el-form-item label="申请原因说明：" label-width="90">
            <el-input type="textarea"
                      style="width: 88%;"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="reulsForm3.academic_year">
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
          <el-button class="bg-grey bd-grey white" @click="earlyVisible = false">取 消</el-button>
          <el-button class="bg-green bd-green white" type="success">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  .student_inschool >>> .el-form-item__label{
    padding: 0;
  }
  .student_inschool >>> .el-pagination{
    white-space: pre-line;
  }
  .student_inschool .studentFileList {
    margin-top: 20px;
  }
  /*.student_inschool .el-form-item {
    margin-bottom: 10px;
  }*/
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
    display: inline-block;
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
    width: 80px;
    height: 80px;
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
    margin-right: 10px;
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
  .student_inschool >>> .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: auto;
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
    activeTabs:{
      type:String,
      request:true,
    },
    year_list:{
      type:Array,
      request:true,
    },
    total:{
      type:Number,
      request:true,
    }
  },
  data(){
    return {
      command_type:'',
      leveForm:{
        name:'',
        leave_reason: '',
        leave_date: '',
      },
      class_val:'',
      gender:'',
      in_type:'',
      dateValue:[],
      searchText:'',
      reulsForm: {
        academic_year:'',
        student:'',
        class_obj:'',
        status:'',
        sign_up_date:'',
        in_class_date:'',
        out_class_date:'',
        remarks:'',
      },
      rules:{
        academic_year: [
          { required: true, message: '请选择学年', trigger: 'change' }
        ],
        class_obj: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ],
        sign_up_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        in_class_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        out_class_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        leave_reason: [
          { required: true, message: '请选择离园原因', trigger: 'change' }
        ],
        leave_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
      },
      reulsForm2: {
        radio2:'',
        student:'',
        class_obj:'',
      },
      reulsForm3: {
        academic_year:'',
        student:'',
        class_obj:'',
        status:'',
        sign_up_date:'',
        in_class_date:'',
        out_class_date:'',
        remarks:'',
      },
      leaveShowVisible:false,
      operationVisible:false,
      leaveVisible:false,
      earlyVisible:false,
      classList:[
        {
          id:'In',
          name:'就读'
        },
        {
          id:'ExchangeOut',
          name:'转出'
        },
        {
          id:'Prepare',
          name:'预分班'
        },
      ],
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
      chargeTableDate:[],
      year_url:'',
      class_url:'/api/center/select/center_class_year_list/',
      input_school:'/api/student/student_management/create_enrollment_registration/',
      in_class_list:[],
      yearlist: [],
      otherText:'',
      studentInfo:{},
      studentRemark:'',
      preferred_academic_year:'',
      studentId:'',
      currentPage:1,
      student_id:'',
    }
  },
  mounted:function(){
    this.getStudentList();
  },
  methods:{
    changePage(val){
      this.currentPage = val;
    },
    saveLeave:function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var x = this.leveForm.leave_reason;
          if(this.leveForm.leave_reason === '其他'){
            x = this.otherText;
          }
          var obj = {
            name:this.studentInfo.name,
            leave_reason: x,
            leave_date: this.leveForm.leave_date,
          };
          this.$axios.put('/api/student/prepare_list_student/'+this.studentId + '/',obj).then(res => {
            if (res.data.status == 0) {
              this.leaveVisible = false;
              this.leaveShowVisible = true;
            } else {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
              this.leaveVisible = false;
              this.getStudentList();
              // this.$message.error('保存失败');
            }
          }).catch(err => {
            //this.$message.error('未缴纳备用金');
              // this.leaveVisible = false;
              // this.leaveShowVisible = true;
          })
        }else{
          return false;
        }
      })
    },
    changeAcadYear:function(id){
      this.reulsForm.class_obj = '';
      this.getClassList(id);
    },
    getYearHistory:function (id) {
      var _this = this;
      this.$axios.get('/api/student/student/'+id+'/academic_year_history/').then(res=>{
        _this.yearlist = res.data.results;
      }).catch(err=>{
        console.log(err)
      })
    },
    getClassList:function(id){
      var url = this.class_url + '?academic_year_id=' + id;
      this.$axios.get(url).then(res=>{
        this.in_class_list = res.data.results;
      }).catch(err=>{
        console.log(err)
      })
    },
    getStudentInfo:function(id){
      var _this = this;
      var url = '/api/student/student_management/'+id+'/view_detail/';
      _this.$axios.get(url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.studentInfo = res.data.detail;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getStudentList:function () {
      var data={
        student_type:'Formal',/*在校生*/
        class_id:this.class_val,
        date_from:this.dateValue[0],
        date_to:this.dateValue[1],
        gender:this.gender,
        condition:this.searchText,
        page:this.currentPage
      }
      this.$emit('getStudentList',data);
    },
    handleCommand:function(val,id,index){
      this.student_id = id;
      if(val === '1'){
        this.student_list[index].selectType = '入园登记';
        this.getYearHistory(id);
        this.getStudentInfo(id);
        this.operationVisible = true;
        this.reulsForm.academic_year = '';
        this.reulsForm.student = id;
        this.reulsForm.class_obj = '';
        this.reulsForm.status = '';
        this.reulsForm.sign_up_date = '';
        this.reulsForm.in_class_date = '';
        this.reulsForm.out_class_date = '';
        this.reulsForm.remarks = '';
      }else if(val === '2'){
        this.student_list[index].selectType = '毕业、离园登记';
        this.leaveVisible = true;
        this.getStudentInfo(id);
      }else if(val === '3'){
        this.student_list[index].selectType = '终止服务';
        this.earlyVisible = true;
      }
      this.studentId = id;
    },
    /*保存入学登记*/
    saveInputSchool:function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(this.input_school, this.reulsForm).then(res => {
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
              this.getYearHistory(this.reulsForm.student);
              this.operationVisible = false;
            } else {
              this.$message.error('保存失败');
            }
          }).catch(err => {
            console.log(err)
          })
        }else{
          return false;
        }
      })
    },
    transferReserveForAbsenteeism: function () {
       this.$axios.get('/api/finance/reserve_fund_for_attendance/leave_reserve_fund/', {
          params: {
            leave_date: this.date,
            student_id: this.student_id
          }
        })
          .then(res => {
            if (res.data.status === 1) {
              if (this.studentInfo.pay_bill) {
                  this.leaveVisible = false;
                  this.leaveShowVisible = true;
                } else {
                  this.$router.push('/financemanagement/create-reserve/1?id=' + this.studentId)
                }
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(err => {

        })
      
    }
  },
  watch: {
    activeTabs: {
      handler(newValue, oldValue) {
        if(newValue === 'first'){
          this.getStudentList();
        }
      },
      deep: true
    },
    currentPage(){
      this.getStudentList()
    }
  }
}
</script>
