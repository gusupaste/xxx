<template>
    <div class="payBillDetail wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 缴费处理 > <span class="font-cl-blue">缴费</span></p>
      </div>
        <div class="content-top">制单信息（预制订单）</div>
        <div class="clearfix">
            <el-col :span="24" class="card-type">
                <el-card shadow="always">
                <p class="" style="border-bottom:1px solid #bbb">
                    <span class="mr26">制单人：{{bill_info.creator}}</span>
                    <span class="mr26">制单日期：{{bill_info.billing_date}}</span>
                    <span class="mr26">状态：
                        <span v-if="bill_info.status_id == 0 || bill_info.status_id == 2" class="orange">{{bill_info.status}}</span>
                        <span v-if="bill_info.status_id == 1" class="green">{{bill_info.status}}</span>
                        <span v-if="bill_info.status_id == 4" class="red">{{bill_info.status}}</span>
                    </span>
                </p>
                <p class="">
                    <el-row :gutter="20">
                        <el-col :span="6"><div class="grid-content bg-purple">账单编号：{{bill_info.bill_no}}</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">应缴金额：¥{{bill_info.amount}}</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">账单余额：¥0.00</div></el-col>
                    </el-row></p>
                <p>
                    <el-row :gutter="20">
                        <el-col :span="6"><div class="grid-content bg-purple">学生姓名：{{bill_info.student_name}}</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">所在校园：{{bill_info.center_name}}</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">所在班级：{{bill_info.klass_name}}</div></el-col>
                    </el-row>
                </p>
                <p>
                <el-row :gutter="20">
                    <el-col :span="6"><div class="grid-content bg-purple">入学日期：{{bill_info.enter_date}}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">缴费账期：{{bill_info.klass_year}}</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">费用应缴日期：{{bill_info.planned_payment_date}}</div></el-col>
                </el-row>
                </p>
                </el-card>
            </el-col>
        </div>
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
              <p>备用金抵扣：￥23000</p>
              <p>缴费回单单号：{{item.payment_no}}</p>
          </div>
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
                <el-table-column
                prop="address"
                label="欠费">
                <template slot-scope="scope">
                  0
                </template>
                </el-table-column>
                <el-table-column
                prop="reserved_fund_used"
                label="备用金">
                </el-table-column>
              <el-table-column
                prop="actual_pay"
                label="实收">
              </el-table-column>
              <el-table-column
                prop="address"
                label="本期余额">
                <template slot-scope="scope">
                  0
                </template>
              </el-table-column>
            </el-table>
        </div>
        <div class="mt26 tableList" style="line-height:30px">
          <p class="font-size-14 bold">相关附件：</p>
          <p style="color: red;font-size: 10px">请将客户刷卡或银行原始票据的扫描件作为附件上传系统，以便审批人对相关信息进行审核审计</p>
          <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :on-success="successUpload"
              :headers="header"
              name="billpay_attach_file"
              :file-list="billpay_attach_li">
            <span>上传附件：</span>
            <el-button size="small bg-orange bd-orange" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip"></div>
          </el-upload>
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
        <div class="mt26 text-align-center">
          <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
          <button v-if="bill_info.status_id === 1" class="btn bg-green" @click="submit">提交</button>
        </div>
    </div>
</template>
<style scoped>
  .payBillDetail .content-top{
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
  .payBillDetail .card-type {
      line-height: 30px;
  }
  .payBillDetail .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .payBillDetail .tableList {
      color:#101010;
  }
  .payBillDetail >>>.el-upload-list {
      display: none;
  }
  .payBillDetail .price_wrap {
      height: 50px;
      margin-top: 15px;
      background-color: rgba(255, 152, 0, 0.14);
      text-align: right;
      line-height: 50px;
      color: #101010;
  }
  .payBillDetail .price_wrap span{
     display: inline-block;
     margin-right: 20px;
  }
  .payBillDetail .bg-orange:hover {
    color:#fff;
    border:1px solid #f17128;
    background-color:#f17128;
  }
  .payBillDetail .bg-orange:focus {
    color:#fff;
    border:1px solid #f17128;
    background-color:#f17128;
  }
</style>
<script>
export default {
  data(){
        return {
            id:this.$route.params.id,
            action:"http://etonkids.taidii.cn/api/finance/bill/"+this.$route.params.id+"/upload_billpay_attach/",
            tableData: [],
            bill_history: [],
            billitem_li: [],
            billpay_attach_li: [],
            billpay_item_li: [],
            billpayment_method_li: [],
            bill_info:{},
            fileList:[],
            header:{
              "Authorization":"jwt "+this.$cookies.get('token')
            }
        }
    },
    created () {
      this.getInfo()
    },
    methods:{
      getInfo(){
        this.$axios.get('/api/finance/bill/'+this.id+'/pay_all/')
        .then(res=>{
          this.bill_info = res.data.bill_info;
          this.bill_history = res.data.bill_history;
          this.billitem_li = res.data.billitem_li;
          this.billpay_item_li = res.data.billpay_item_li;
          this.billpay_attach_li = res.data.billpay_attach_li;
          this.billpayment_method_li = res.data.billpayment_method_li;
        })
      },
      editSchool(){

      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
        console.log(file)
      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      successUpload(response, file, fileList){
        this.$message({
          type:'success',
          message:'上传成功！'
        })
        this.getInfo();
      },
      submit(){
        var _this = this;
        this.$axios.post('/api/finance/bill/'+this.id+'/approve_bill/')
        .then(res=>{
          console.log(res.data)
          if(res.data.status === 1){
            this.$router.push('/financemanagement/paymentprocessing')
          }
        })
      },
      deleteFile(val){
        this.$axios.post('/api/finance/bill/del_billpay_attach/',{
          del_ids:[val]
        }).then(res=>{
            this.$message({
            type:'success',
            message:'删除成功！'
          })
          this.getInfo();
        })
      }
    }
}
</script>
