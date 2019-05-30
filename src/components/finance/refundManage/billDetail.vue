<template>
    <div class="billDetail wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">退费管理</span></p>
      </div>
        <div class="content-top">{{bill.bill_type}}</div>
        <div class="clearfix">
            <el-col :span="24" class="card-type">
                <el-card shadow="always">
                <p class="bold" style="border-bottom:1px solid #bbb">
                    <span class="mr26">制单人：{{bill.creator_name}}</span>
                    <span class="mr26">制单日期：{{application.create_date}}</span>
                    <span class="mr26">状态：
                        <span>{{bill.status}}</span>
                    </span>
                </p>
                <p>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">学生姓名：{{student.name}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学号：{{student.student_no}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">所在班级：{{student.student_class}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学生当前状态：{{student.status_str}}</div></el-col>
                </el-row>
                </p>
                <p>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">最后出勤日期：{{application.effective_date}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">申请退费日期：{{application.create_date}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学年：{{application.academic_year}}</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">单据申请信息：{{application.application_name}}</div></el-col>
                </el-row>
                </p>
                <p>
                  <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple">离园原因：{{bill.leave_reason}}</div></el-col>
                  </el-row>
                </p>
                </el-card>
            </el-col>
        </div>
        <div class="mt26 tableList">
            <p>审批记录：</p>
            <el-table
                class="mt10"
                :data="approve_history"
                border
                style="width: 100%">
                <el-table-column
                prop="approve_level"
                label="审批节点"
                width="180">
                </el-table-column>
                <el-table-column
                prop="approve_user_name"
                label="审批角色"
                width="180">
                </el-table-column>
                <el-table-column
                prop="status_name"
                label="审批结果">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="审批意见">
                </el-table-column>
                <el-table-column
                prop="date_created"
                label="审批日期">
                </el-table-column>
            </el-table>
        </div>
        <div class="mt26 tableList">
            <p>退费明细（标准项目）：</p>
            <el-table
                class="mt10"
                :data="bill.items"
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
                  {{scope.row.effective_begin_date}} — {{scope.row.effective_end_date}}
                </template>
                </el-table-column>
                <el-table-column
                prop="pay_month"
                label="校日历总数">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="折前价">
                </el-table-column>
                <el-table-column
                prop="actual_amount"
                label="折后价">
                </el-table-column>
                <el-table-column
                prop="price"
                label="单价">
                </el-table-column>
              </el-table-column>
              <el-table-column label="需退费情况描述">
                <el-table-column
                  prop="remained_days"
                  label="剩余校日历总数">
                </el-table-column>
                <el-table-column
                  prop="refund_count"
                  label="应退计数">
                </el-table-column>
                <el-table-column
                  prop="deduction_price"
                  label="折扣单价">
                </el-table-column>
                <el-table-column
                  prop="balance_amount"
                  label="扣款">
                </el-table-column>
                <el-table-column
                  prop="subtotal"
                  label="应退转金额小计">
                </el-table-column>
              </el-table-column>
            </el-table>
            <div class="price_wrap">
              <span>
                备用金：<b class="red font-size-16">{{bill.reserved_fund_amount}}</b>
              </span>
            </div>
        </div>
        <div class="mt26 tableList">
          <p>制度外退费（其他扣款/退费项目明细）：</p>
          <el-table
            class="mt10"
            :data="bill.refund_items"
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
          </el-table>
          <hr><p class="right">实际应退金额合计：<span class="red bold font-size-16">{{total}}</span></p>
        </div>
        <div class="mt26 tableList">
          <p>相关附件：</p>
          <el-table
            class="mt10"
            :data="tableData"
            border
            style="width: 100%">
              <el-table-column
                prop="date"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="附件名称">
              </el-table-column>
              <el-table-column
                prop="address"
                label="上传用户">
              </el-table-column>
              <el-table-column
                prop="address"
                label="上传日期">
              </el-table-column>
          </el-table>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
        </div>
    </div>
</template>
<style scoped>
  .billDetail .content-top{
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
  .billDetail .card-type {
      line-height: 30px;
  }
  .billDetail .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .billDetail .tableList {
      color:#101010;
  }
  .billDetail hr {
    margin: 10px 0;
    border: 0px;
    border-bottom: 1px solid #ddd;
  }
  .billDetail .price_wrap {
      height: 50px;
      margin-top: 15px;
      background-color: #fff;
      text-align: right;
      line-height: 50px;
      color: #101010;
  }
  .billDetail .price_wrap span{
     display: inline-block;
     margin-right: 20px;
  }
</style>
<script>
export default {
    data(){
        return {
            tableData: [],
            id:this.$route.params.id,
            bill:{},
            student:{},
            application:{},
            approve_history:[],
            total:0
        }
    },
    created () {
      this.getInfo()
    },
    methods: {
      getInfo(){
        var _this = this;
        this.$axios.get('/api/finance/refund/'+this.id+'/')
        .then(res=>{
          console.log(res.data)
          _this.bill = res.data.data.bill;
          _this.student = res.data.data.student;
          _this.application = res.data.data.application;
          _this.approve_history = res.data.data.approve_history;
          _this.bill.refund_items.forEach(item=>{
            _this.total += Number(item.amount)
          });
        })
      }
    },
    computed: {
    }
}
</script>
