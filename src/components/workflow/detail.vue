<template>
  <div class="discountApplicationDetail wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 工作流 > <span class="font-cl-blue">审批详情</span></p>
    </div>
    <p class="black mt26 clearfix" style="padding-bottom:15px;border-bottom:1px solid #bbb" v-if="detilCode === 'RB'">
      <span class="left"><span>折扣</span>申请学生：{{ student_name }}</span>
      <span class="right ">
              <span>状态：</span>
              <span v-if="form_status === 0" class="orange">审批中</span>
              <span v-if="form_status === 1" class="green">已通过</span>
              <span v-if="form_status === 2" class="red">已拒绝</span>
          </span>
    </p>
    <div class="clearfix mt26" v-if="detilCode === 'RB'">
      <el-col :span="24" class="card-type">
        <el-card shadow="always" class="clearfix">
          <p class="baseInfo">&nbsp;</p>
          <div style="width:90%" class="left">
            <p class="" style="border-bottom:1px solid #bbb">
              <el-row :gutter="20">
                <el-col :span="5"><div class="grid-content bg-purple">拟入学日期：{{ entry_date }}</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">拟缴费日期：{{ prepare_pay_date }}</div></el-col>
                <el-col :span="10"><div class="grid-content bg-purple">学费正价：{{ policy }} - {{ subject }} - {{ price }}元</div></el-col>
              </el-row>
            </p>
          </div>
        </el-card>
      </el-col>
    </div>
    <div v-for="(item,index) in discount_form_item">
      <div class="content-top" v-if="detilCode === 'CPF'"><!--{{ item.discount_type__name }}-->制单信息（预制订单）</div>
      <div class="content-top" v-if="detilCode === 'RB'">{{ item.discount_type__name }}</div>
      <div class="content-top" v-if="detilCode === 'PRB' || detilCode === 'LB'">{{ item.application.application_name }}</div>
      <div class="clearfix">
        <el-col :span="24" class="card-type">
          <el-card shadow="always" class="clearfix">
            <p class="baseInfo">&nbsp;</p>
            <div style="width:90%" class="left">
              <p style="border-bottom:1px solid #bbb" v-if="detilCode === 'RB'">
                <!--<el-row :gutter="20" v-if="detilCode === 'PRB' || detilCode === 'LB'">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">拟入学日期：{{ entry_date }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">拟缴费日期：{{ prepare_pay_date }}</div>
                  </el-col>
                  <el-col :span="10">
                    <div class="grid-content bg-purple">学费正价：{{ policy }} - {{ subject }} - {{ amount }}元</div>
                  </el-col>
                </el-row>-->
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">申请折扣：{{ item.rate_or_price }}
                      <span v-if="item.discount_type__condition_status === 1">元</span>
                      <span v-if="item.discount_type__condition_status === 0">%</span></div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" v-if="detilCode === 'RB'">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">备注：— —/03/01</div>
                  </el-col>
                </el-row>
              </p>
              <p style="border-bottom:1px solid #bbb;font-weight: bold;" v-if="detilCode === 'CPF'">
                <el-row :gutter="24">
                  <el-col :span="3">
                    <div class="grid-content bg-purple">制单人：{{ item.creator }}</div></el-col>
                  <el-col :span="3">
                    <div class="grid-content bg-purple">制单日期：{{ item.billing_date }}</div>
                  </el-col>
                  <el-col :span="3">
                    <div class="grid-content bg-purple">状态：{{ item.status }}</div>
                  </el-col>
                </el-row>
              </p>
              <p style="border-bottom:1px solid #bbb" v-if="detilCode === 'CPF'">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">账单编号：{{ item.bill_no }}</div></el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">应缴金额：{{ item.amount }}</div>
                  </el-col>
                  <!--<el-col :span="8">
                    <div class="grid-content bg-purple">账单余额：{{ item.student.student_class }}</div>
                  </el-col>-->
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">学生姓名：{{ item.student_name }}</div></el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">所在校园：{{ item.center_name }}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">所在班级：{{ item.klass_name }}</div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">入学日期：{{ item.enter_date }}</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">缴费账单：{{ item.klass_year }}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">费用缴费日期：{{ item.planned_payment_date }}</div></el-col>
                </el-row>
              </p>
              <p style="border-bottom:1px solid #bbb;font-weight: bold;" v-if="detilCode === 'PRB' || detilCode === 'LB'">
                <el-row :gutter="24" v-if="detilCode === 'PRB' || detilCode === 'LB'">
                  <el-col :span="3">
                    <div class="grid-content bg-purple">制单人：{{ item.bill.creator_name }}</div></el-col>
                  <el-col :span="3">
                    <div class="grid-content bg-purple">制单日期：{{ item.application.create_date }}</div>
                  </el-col>
                  <el-col :span="3">
                    <div class="grid-content bg-purple">状态：{{ item.bill.status }}</div>
                  </el-col>
                </el-row>
              </p>
              <p style="border-bottom:1px solid #bbb" v-if="detilCode === 'PRB' || detilCode === 'LB'">
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">学生姓名：{{ item.student.name }}</div></el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">学号：{{ item.student.student_no }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">所在班级：{{ item.student.student_class }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">学生当前状态：{{ item.student.status_str }}</div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">最后出勤日期：{{ item.application.effective_date }}</div></el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">申请退费日期：{{ item.application.create_date }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">学年：{{ item.application.academic_year }}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">单据申请信息：{{ item.application.application_name }}</div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">离园原因：{{ item.bill.leave_reason }}</div></el-col>
                </el-row>
              </p>
              <p>
                <el-row :gutter="20" v-if="detilCode === 'RB'">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">相关附件：</div>
                  </el-col>
                </el-row>
                <!--<el-row :gutter="20" v-for="(item,index) in tableData" :key="index">
                  <el-col :span="5"><a download="download" class="grid-content bg-purple"
                                       href="../../../assets/img/logo.png">员工子女折扣申请表.pdf</a></el-col>
                </el-row>-->
              </p>
            </div>
          </el-card>
        </el-col>
      </div>
    </div>
    <div class="clearfix mt26" v-if="detilCode === 'RB'">
      <el-col :span="24" class="card-type">
        <el-card shadow="always" class="clearfix">
          <p class="baseInfo">&nbsp;</p>
          <div style="width:90%" class="left">
            <p class="" style="border-bottom:1px solid #bbb">
              <el-row :gutter="20">
                <el-col :span="5"><div class="grid-content bg-purple">应缴总额：{{ price }}元</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">优惠金额：{{ amount }}元</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">折后总额：{{ actual_amount }}元</div></el-col>
              </el-row>
            </p>
          </div>
        </el-card>
      </el-col>
    </div>

    <div class="mt26 tableList" v-if="detilCode === 'PRB' || detilCode === 'LB'">
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
    <div class="mt26 tableList"  v-if="detilCode === 'PRB' || detilCode === 'LB'">
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
    <div class="mt26 tableList"  v-if="detilCode === 'PRB' || detilCode === 'LB'">
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

    <div v-if="detilCode === 'CPF'">
      <div class="mt26 tableList">
        <p class="font-size-14 bold">账单明细信息：</p>
        <el-table
          class="mt10"
          :data="billitem_li"
          border
          style="width: 100%">
          <el-table-column
            prop="subject_category"
            label="费用类型">
          </el-table-column>
          <el-table-column
            prop="subject_name"
            label="费用科目">
          </el-table-column>
          <el-table-column
            prop="payment_method"
            label="缴费方式">
          </el-table-column>
          <el-table-column
            prop="address"
            label="缴费区间"
            width="250">
            <template slot-scope="scope">
              {{scope.row.effective_begin_date}}——{{scope.row.effective_end_date}}
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="正价应收">
          </el-table-column>
          <el-table-column
            prop="rate"
            label="折扣">
          </el-table-column>
          <el-table-column
            prop="actual_amount"
            label="折后应收">
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注说明">
          </el-table-column>
        </el-table>
      </div>
      <div class="price_wrap">
          <span>
            正价应收合计：<b class="red font-size-16">{{bill_info.amount}}</b>
          </span>
        <span>
            折扣应收合计：<b class="red font-size-16">{{bill_info.actual_amount}}</b>
          </span>
        <span>
            已收金额合计：<b class="red font-size-16">{{bill_info.pay_amount}}</b>
          </span>
      </div>
      <div class="mt26 tableList">
        <p class="font-size-14 bold">历史账单：</p>
        <el-table
          class="mt10"
          :data="bill_history"
          border
          style="width: 100%">
          <el-table-column
            prop="billing_date"
            label="缴费日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="actual_amount"
            label="缴费金额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="reserved_fund_use"
            label="备用金抵扣">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="收款人">
          </el-table-column>
          <el-table-column
            prop="bill_status"
            label="费用状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
          </el-table-column>
        </el-table>
      </div>
      <div class="mt26 tableList" style="line-height:30px" >
        <p class="font-size-14 bold">缴费信息：</p>
        <div v-for="item in billpayment_method_li" :key="item.id">
          <p>缴费明细：{{item.payment_method}}：￥{{item.amount}}
            <!--<p>备用金抵扣：￥23000</p>-->
          <p>缴费回单单号：{{item.payment_no}}</p>
          <hr>
        </div>
        <p>备用金抵扣：{{ bill_info.reserved_fund_use }}</p>
      </div>
      <div class="mt26 tableList">
        <p class="font-size-14 bold">费用分摊明细：</p>
        <el-table
          class="mt10"
          :data="billpay_item_li"
          border
          style="width: 100%">
          <el-table-column
            prop="subject_category"
            label="费用类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="subject"
            label="费用科目"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="正价">
          </el-table-column>
          <el-table-column
            prop="rate"
            label="折扣">
          </el-table-column>
          <el-table-column
            prop="paid_amount"
            label="折后应收">
          </el-table-column>
          <!-- <el-table-column
          prop="address"
          label="欠费">
          <template slot-scope="scope">
            0
          </template>
          </el-table-column> -->
          <el-table-column
            prop="reserved_fund_used"
            label="备用金">
          </el-table-column>
          <el-table-column
            prop="actual_pay"
            label="实收">
          </el-table-column>
          <!-- <el-table-column
            prop="address"
            label="本期余额">
            <template slot-scope="scope">
              0
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="mt26 tableList" style="line-height:30px">
        <p class="font-size-14 bold">相关附件：</p>
        <el-table
          class="mt10"
          :data="billpay_attach_li"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="附件"
            width="180">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="上传用户">
          </el-table-column>
          <el-table-column
            prop="date_created"
            label="上传日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button class="red" type="text" size="small" @click="deleteFile(scope.row.id)">
                <span class="el-icon-delete" style="font-size: 20px;"></span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="mt26 tableList">
      <p>审批记录：</p>
      <el-table
        class="mt10"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="approve_level"
          label="审批节点"
          width="180">
        </el-table-column>
        <el-table-column
          prop="approve_user_role_name"
          label="审批角色"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status_name"
          label="审批结果">
          <template slot-scope="scope">
            <el-select v-if="scope.row.is_vailded" v-model="select_status">
              <el-option v-for="item in select_option"
                         :value="item.id" :key="item.id" :label="item.name"
              ></el-option>
            </el-select>
            <span v-else>{{scope.row.status_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审批意见">
          <template slot-scope="scope">
            <el-input v-if="scope.row.is_vailded" v-model="remark">{{scope.row.remark}}</el-input>
            <span v-else>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审批日期">
          <template slot-scope="scope">
            <span v-if="scope.row.is_vailded">{{date | formatDate}}</span>
            <span v-else>{{scope.row.date_created}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt26 text-align-center">
      <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
      <button v-show="status === 0 && form_status === 0" class="btn bg-green" @click="save">提交</button>
    </div>
  </div>
</template>
<style scoped>
  .discountApplicationDetail .content-top {
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

  .discountApplicationDetail .card-type {
    line-height: 40px;
  }

  .discountApplicationDetail .el-card__body {
    padding: 30px 70px 10px 10px;
  }

  .discountApplicationDetail .el-card__body:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }

  .discountApplicationDetail .price_wrap {
    height: 50px;
    margin-top: 15px;
    background-color: rgba(255, 152, 0, 0.14);
    text-align: right;
    line-height: 50px;
    color: #101010;
  }
  .discountApplicationDetail .price_wrap span{
    display: inline-block;
    margin-right: 20px;
  }

  .discountApplicationDetail .tableList {
    color: #101010;
  }

  .discountApplicationDetail .baseInfo {
    width: 5%;
    font-weight: 600;
    float: left;
    margin-right: 10px;
  }
</style>
<script>
  export default {
    data() {
      return {
        detilCode:this.$route.query.formKindCode,
        status: Number(this.$route.query.status),
        formId: this.$route.query.formId,
        formKindId: Number(this.$route.query.formKindId),
        approveLevel: Number(this.$route.query.approveLevel),
        form_status: 0,
        tableData: [],
        select_status: 1,
        select_option: [
          {
            id: 1,
            name: '同意'
          },
          {
            id: 2,
            name: '拒绝'
          }
        ],
        remark: '',
        date: new Date(),
        student_name:'',
        actual_amount:'',
        prepare_pay_date:'',
        entry_date:'',
        discount_form_item:[],
        policy:'',
        subject:'',
        price:'',
        amount:'',
        billitem_li:[],
        billpay_attach_li: [],
        billpay_item_li: [],
        billpayment_method_li: [],
        bill_info:{},
        fileList:[],
        bill_history:[],
        bill: {}
      }
    },
    mounted: function () {
      this.getDetail();
      if(this.detilCode === 'RB'){//RB 折扣
        this.getDiscount();
      }else if(this.detilCode === 'PRB'){//PRB 预备生离园退费
        this.getPRBDiscount();
      }else if(this.detilCode === 'LB'){//LB 在校生离园退费
        this.getPRBDiscount();
      }
      else if(this.detilCode === 'CPF'){//CPF 账单制作
        this.getCPFDiscount();
      }
    },
    methods: {
      /*账单*/
      getCPFDiscount:function () {
        var _this = this;
        this.loading = true
        var url = '/api/finance/bill/'+this.formId+'/pay_all/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            this.discount_form_item = [];
            this.discount_form_item.push(res.data.bill_info);
            this.bill_history = res.data.bill_history;
            this.billitem_li = res.data.billitem_li;
            this.billpay_item_li = res.data.billpay_item_li;
            this.billpay_attach_li = res.data.billpay_attach_li;
            this.billpayment_method_li = res.data.billpayment_method_li;
            /*this.student_name = res.data.data.student_name;
            this.amount = res.data.data.amount;
            this.actual_amount = res.data.data.actual_amount;
            this.prepare_pay_date = res.data.data.prepare_pay_date;
            this.entry_date = res.data.data.entry_date;
            this.policy = res.data.data.policy;
            this.subject = res.data.data.subject;
            this.price = res.data.data.price;*/
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*折扣*/
      getDiscount:function () {
        var _this = this;
        this.loading = true
        var url = '/api/discount/discount_management/'+this.formId+'/get_discount_info/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.discount_form_item = res.data.data.discount_form_item;
            this.student_name = res.data.data.student_name;
            this.amount = res.data.data.amount;
            this.actual_amount = res.data.data.actual_amount;
            this.prepare_pay_date = res.data.data.prepare_pay_date;
            this.entry_date = res.data.data.entry_date;
            this.policy = res.data.data.policy;
            this.subject = res.data.data.subject;
            this.price = res.data.data.price;
          }
        }).catch(err => {
          console.log(err)
        })
      },

      getDetail: function () {
        var url = ''
        if (this.status === 0) {
          url = '/api/workflow/workflow_management/approve_info/?form_id=' + this.formId + '&form_kind_id=' + this.formKindId
        } else {
          url = '/api/workflow/workflow_management/apply_info/?form_id=' + this.formId + '&form_kind_id=' + this.formKindId
        }
        this.loading = true
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.tableData = res.data.data
            this.form_status = res.data.form_status
          }
        }).catch(err => {
          console.log(err)
        })
      },
      save: function () {
        console.log(this.select_status)
        console.log(this.remark)
        console.log(this.formId)
        console.log(this.formKindId)
        console.log(this.approveLevel)
        this.loading = true
        this.$axios.post('/api/workflow/workflow_management/', {
          status: this.select_status,
          remark: this.remark,
          form_id: this.formId,
          form_kind_id: this.formKindId,
          approve_level: this.approveLevel
        }).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.getDetail()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      back: function () {
        this.$router.push({name: 'workflowList'})
      },
      /*在校生、预备生离园退费*/
      getPRBDiscount:function () {
        var _this = this;
        this.loading = true
        var url = '/api/finance/refund/'+this.formId+'/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status == 1) {
            this.discount_form_item = [];
            this.discount_form_item.push(res.data.data);
            this.bill = res.data.data.bill;
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>
