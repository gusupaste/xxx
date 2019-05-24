<template>
    <div class="preparatoryStudent wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 退费管理 > <span class="font-cl-blue">新增预备生退费账单</span></p>
      </div>
        <div class="content-top">新增预备生退费账单</div>
        <div class="clearfix">
            <el-col :span="24" class="card-type">
                <el-card shadow="always">
                <p>
                <el-row>
                  <el-col :span="4"><div class="grid-content bg-purple">学生：
                    <span class="red" style="cursor:pointer" @click="addStudentVisible = true">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                      <span class="font-size-14">添加</span>
                    </span>
                  </div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">学生姓名：{{studentInfo.name}}</div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">学号：{{studentInfo.student_no}}</div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">所在班级：{{studentInfo.student_class}}</div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">学生当前状态：{{studentInfo.status_str}}</div></el-col>
                </el-row>
                </p>
                <p>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">最后出勤日期：
                    <el-date-picker
                      style="width: 10%;"
                      v-model="otherInfo.effective_date"
                      align="right"
                      type="date"
                      disabled
                      placeholder="选择日期">
                    </el-date-picker>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">申请退费日期：
                    <el-date-picker
                      disabled
                      style="width: 10%;"
                      v-model="otherInfo.create_date"
                      align="right"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学年：
                    <!-- <el-select  v-model="nameSelect" placeholder="请选择">
                      <el-option v-for="item in academic_year_li" :key="item.id" :value="item.id" :label="item.year"></el-option>
                    </el-select> -->
                    <el-input disabled v-model="otherInfo.academic_year"></el-input>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">单据申请信息：
                    <el-select v-model="addForm.application_id" placeholder="请选择">
                      <el-option v-for="item in billInfo" :label="item.application_name" :key="item.id" :value="item.id"></el-option>
                    </el-select>
                  </div></el-col>
                </el-row>
                </p>
                <p>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">离园原因：
                        <el-radio-group v-model="addForm.leave_reason">
                          <el-radio label="居所搬迁/父母工作调动">居所搬迁/父母工作调动</el-radio>
                          <el-radio label="家庭变故">家庭变故</el-radio>
                          <el-radio label="生病">生病</el-radio>
                          <el-radio label="毕业">毕业</el-radio>
                        </el-radio-group>
                      </div>
                      <div class="grid-content bg-purple">其他：
                          <el-input v-model="addForm.reason_remark"></el-input>
                      </div>
                    </el-col>
                  </el-row>
                </p>
                <p>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">是否已领物品：
                          <el-radio :label="true" v-model="is_thing" >是</el-radio>
                          <el-radio :label="false" v-model="is_thing" >否</el-radio>
                      </div>
                    </el-col>
                  </el-row>
                </p>
                </el-card>
            </el-col>
        </div>
        <div class="mt26 tableList">
            <p>退费明细（标准项目）：</p>
            <p class="remarks">1.在学籍起始日之前提出，扣除半个月学费。剩余费用退还，在入学起始日之后提出退园，按缺勤请假规定执行</p>
            <p class="remarks">2.新生物品费相关项目以学校实际物品领用情况酌情处理，如果发生物品领用，请按物品价格相应扣款</p>
            <el-table
                class="mt10"
                :data="subjectList"
                border
                style="width: 100%">
              <el-table-column label="已缴费情况描述">
                <el-table-column
                prop="subject_name"
                label="缴费项目">
                </el-table-column>
                <el-table-column
                prop="payment_method_name"
                label="缴费方式">
                </el-table-column>
                <el-table-column
                prop="address"
                label="起止日期">
                <template slot-scope="scope">
                  {{scope.row.effective_begin_date}} —— {{scope.row.effective_end_date}}
                </template>
                </el-table-column>
                <el-table-column
                prop="pay_month"
                label="校日历总数">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="实际应缴费用">
                </el-table-column>
                <el-table-column
                prop="actual_amount"
                label="缴费金额">
                </el-table-column>
                <el-table-column
                prop="price"
                label="单价">
                </el-table-column>
              </el-table-column>
              <el-table-column class="is_dark" label="需退费情况描述">
                <el-table-column
                  prop="deduction_amount"
                  label="扣款">
                </el-table-column>
                <el-table-column
                  prop="sub_total"
                  label="应退转金额小计">
                </el-table-column>
              </el-table-column>
            </el-table>
            <div class="price_wrap">
              <span>
                备用金：<b class="red font-size-16">{{otherInfo.reserved_fund_amount}}</b>
              </span>
            </div>
        </div>
        <div class="mt26 tableList">
          <p>制度外退费（其他扣款/退费项目明细）
            <span class="red" style="cursor:pointer" @click="addProjectVisible = true">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
              <span class="font-size-14">添加项目</span>
            </span>
          </p>
          <el-table
            class="mt10"
            :data="addForm.refund_items"
            border
            style="width: 100%">
              <el-table-column
                prop="refund_direct"
                label="扣款/退款">
              </el-table-column>
              <el-table-column
                prop="item"
                label="项目名称">
              </el-table-column>
              <el-table-column
                prop="remarks"
                label="情况说明">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="金额小计">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <i @click="deleteRefund(scope.row)" class="fa fa-trash red font-size-20 cur"></i>
                </template>
              </el-table-column>
          </el-table>
          <div class="price_wrap">
              <span>
                实际应退金额合计：<b class="red font-size-16">{{addForm.refund_amount}}</b>
              </span>
            </div>
        </div>
        <div class="mt26 tableList">
          <p>相关附件：
            <el-upload
              style="display: initial;"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :file-list="fileList">
              <el-button size="small" type="primary"><span class="el-icon-upload2" style="font-weight: bold"></span>上传</el-button>
            </el-upload></p>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
            <button class="btn bg-green" @click="submitForm">提交</button>
        </div>
      <add-project @addSubject="addSubject" v-if="addProjectVisible"></add-project>

      <add-student @getStudent="getStudent" v-if="addStudentVisible" :status="status"></add-student>
    </div>
</template>
<style scoped>
  .preparatoryStudent .content-top{
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
  .preparatoryStudent >>> .el-card__body {
      padding: 30px 70px 10px 70px;
      line-height: 40px;
  }
  .preparatoryStudent .tableList {
      color:#101010;
  }
  .preparatoryStudent .el-input {
      width:auto;
  }
  .preparatoryStudent hr {
    margin: 10px 0;
    border: 0px;
    border-bottom: 1px solid #ddd;
  }
  .preparatoryStudent .remarks{
    color: #999999;
    font-size: 12px;
    line-height:24px;
  }
  .preparatoryStudent .price_wrap {
      height: 50px;
      margin-top: 15px;
      background-color: #fff;
      text-align: right;
      line-height: 50px;
      color: #101010;
  }
  .preparatoryStudent .price_wrap span{
     display: inline-block;
     margin-right: 20px;
  }
</style>
<script>
import addProject from './addPreject';
import addStudent from './addStudent';
export default {
  components:{
    addProject,
    addStudent,
  },
    data(){
        return {
          center_id:this.$cookies.get('userInfo').center.id,
          radio2:'',
          fileList:[],
          academic_year_li:[],
          addForm:{
            application_id:'',
            bill_type: "PRB",
            refund_items:[],
            refund_amount:0,
            reason_remark:''
          },
          billInfo:[],
          subjectList:[],
          refundList:[],
          otherInfo:{
            reserved_fund_amount:0
          },
          student_id:'',
          studentInfo:{},
          is_thing:true,
          status:'Prepare',
          addProjectVisible:false,
          addStudentVisible:false,
        }
    },
    created () {
        this.searchInfo()
    },
    methods: {
      getStudentInfo(val){
        var _this = this;
        this.$axios.get('/api/finance/refund/student_info',{
          params:{
            student_id:this.student_id
          }
        }).then(res=>{
          _this.studentInfo = res.data.data;
        })
      },
      getBillfo(val){
        var _this = this;
        this.$axios.get('/api/finance/refund/leave_apply_records/',{
          params:{
            student_id:this.student_id
          }
        }).then(res=>{
          _this.billInfo = res.data.data;
        })
      },
      getOtherfo(){
        var _this = this;
        this.$axios.get('/api/finance/refund/prepare_refund_info/',{
          params:{
            application_id:this.addForm.application_id
          }
        }).then(res=>{
          _this.subjectList = [];
          _this.refundList = [];
          _this.otherInfo = res.data.data;
          res.data.data.bills.forEach(item=>{
            item.items.forEach(ele=>{
              _this.subjectList.push(ele);
            })
            item.refund_items.forEach(ele2=>{
              _this.refundList.push(ele2);
            })
          });
          console.log(_this.subjectList)
        })
      },
      getStudent(val){
        this.student_id = val;
        this.getStudentInfo(val)
        this.getBillfo(val)
      },
      addSubject(val){
        this.addForm.refund_items.push(val);
        this.getRefund_amount();
      },
      submitForm(){
        var _this = this;
        this.subjectList.forEach(item=>{
          item.balance_amount = item.deduction_amount
        })
        this.addForm.items = this.subjectList;
        console.log(this.addForm)
        this.$axios.post('/api/finance/refund/add_refund_bill/',{
          bill:this.addForm
        }).then(res=>{
          if(res.data.data.status === 1){
            _this.$router.push('/financemanagement/refund-manage')
          }
        })
      },
      deleteRefund(val){
        var index = this.addForm.refund_items.indexOf(val);
        this.addForm.refund_items.splice(index,1);
        this.getRefund_amount();
      },
      getRefund_amount(){
        this.addForm.refund_amount = 0;
        this.addForm.refund_items.forEach(item=>{
          this.addForm.refund_amount += Number(item.amount)
        })
      },
      searchInfo(){
            var _this = this;
            this.$axios.get('/api/finance/bill/search_info/',{
                params:{
                    center_id:this.center_id
                }
            })
            .then(res=>{
                _this.academic_year_li = res.data.data.academic_year_li;
            })
        },
    },
    watch: {
      'addForm.application_id'(){
        this.getOtherfo()
      }
    }
}
</script>
