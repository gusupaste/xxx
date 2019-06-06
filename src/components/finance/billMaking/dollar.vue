<template>
    <div class="dollar wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 账单制作 > <span class="font-cl-blue">缴费</span></p>
      </div>
        <div class="clearfix mt10">
            <el-form>
                <el-form-item label="应收金额：" label-width="120px">
                     ¥{{info.actual_amount}}
                </el-form-item>
                <el-form-item label="备用金金额：" label-width="120px">
                     ¥{{reserved_fund}}
                </el-form-item>
                <el-form-item label="" label-width="120px">
                    <span class="red">可以使用备用金抵扣收费，是否使用备用金？</span>
                    <br>
                    <el-checkbox  v-model="value">是，使用备用金</el-checkbox> <el-input  @input="editfund" v-model="use_fund" style="width:200px"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="收费情况：" label-width="120px">
                    <!--<el-table
                        :data="payData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="data"
                        label="支付方式">
                        <template slot-scope="scope">
                            支付金额
                        </template>
                        </el-table-column>
                        <el-table-column
                        v-for="(item,index) in method_lsit"
                        :key="item.id"
                        :label="item.name">
                        <template slot-scope="scope" >
                            <el-input v-model="addform.pay_method_list[index].amount" maxlength="10" oninput ="value=value.replace(/[^0-9.]/g,'')" class="pay_input"></el-input>
                        </template>
                        </el-table-column>
                    </el-table>-->
                  <table style="width: 100%;text-align: center">
                    <tr>
                      <td>支付方式</td>
                      <td v-for="(item,index) in method_lsit" :key="index">{{ item.name }}</td>
                    </tr>
                    <tr>
                      <td>支付金额</td>
                      <td v-for="(item,index) in method_lsit" :key="index">
                        <el-input v-model="addform.pay_method_list[index].amount" maxlength="10" oninput ="value=value.replace(/[^0-9.]/g,'')" class="pay_input"></el-input>
                      </td>
                    </tr>
                    <tr>
                      <td>银行回执单号</td>
                      <td v-for="(item,index) in method_lsit" :key="index">
                        <el-input v-model="addform.pay_method_list[index].payment_no" oninput ="value=value.replace(/[^0-9.]/g,'')" class="pay_input"></el-input>
                      </td>
                    </tr>
                  </table>
                </el-form-item>
                <el-form-item label="实收金额：" label-width="120px">
                     ¥{{act_amount}}
                </el-form-item>
                <el-form-item label="备用金抵扣：" label-width="120px">
                     ¥{{use_fund}}
                </el-form-item>
                <el-form-item label="合计：" label-width="120px">
                     <span class="bold font-size-20 red "> ¥{{addform.pay_amount}}</span>
                </el-form-item>
                <el-form-item label="" label-width="120px">
                     <span v-if="left_money>0">合计缴费金额大于应收金额，多余{{left_money}}元将自动结转进备用金</span>
                </el-form-item>
            </el-form>
        </div>
        <p class="title-style mt26">费用分摊明细：</p>
        <div class=" tableList">
            <el-table
                class="mt10"
                :data="tableData"
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
                prop="amount"
                label="正价">
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
                prop="address"
                label="备用金">
                <template slot-scope="scope" >
                    <span v-if="scope.row.can_reserved_fund === 1">
                        <el-input v-model="addform.bill_item_list[scope.$index].reserve_fund_used" oninput ="value=value.replace(/[^0-9.]/g,'')" class="pay_input"></el-input>
                    </span>

                </template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="实收">
                <template slot-scope="scope" >
                    <el-input v-model="addform.bill_item_list[scope.$index].pay_amount" oninput ="value=value.replace(/[^0-9.]/g,'')" class="pay_input"></el-input>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="line-under">

        </div>
        <el-form class="mt26" style="border:none">
            <el-form-item label="其他补充信息：" label-width="120px">

            </el-form-item>
            <el-form-item label="开票需求：" label-width="120px">
                 <el-checkbox  v-model="is_invoice_if" label="1">是</el-checkbox>
            </el-form-item>
            <el-form-item label="发票标题：" label-width="120px">
                 <el-input  v-model="addform.invoice_title"></el-input>
            </el-form-item>
            <el-form-item label="可开票据金额：" label-width="120px">
                <el-input v-model="addform.invoice_amount"></el-input>
            </el-form-item>
            <el-form-item label="备注：" label-width="120px">
                 <el-input  v-model="addform.invoice_remark" type="textarea" style="width:500px">是</el-input>
            </el-form-item>
        </el-form>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey" @click="$router.push('/financemanagement/billMaking')">返回</button>
            <button class="btn bg-green" @click="saveInfo">提交</button>

        </div>
    </div>
</template>
<style scoped>
  .dollar .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    border-radius: 3px;
    color: #3E7193;
  }
  .dollar .card-type {
      line-height: 30px;
  }
  .dollar .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .dollar .tableList {
      color:#101010;
  }
  .dollar .el-form-item {
     margin-bottom: 10px;
  }
  .dollar .el-form {
     padding:20px;
     border:1px solid #CCCCCC;
  }
  .dollar .head-detail {
     background-color: #ccc;
     color: #101010;
     height: 40px;
     line-height: 40px;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
  .dollar >>> .el-form th {
      background-color: #fff;
  }
  .dollar .line-under {
      height: 20px;
      border-bottom: 1px solid #bbb;
  }
  .dollar .pay_input>>> .el-input__inner {
     width: 90px;
  }
  /*.dollar tr td{
    border: 1px solid #ddd;
  }*/
</style>
<script>
export default {
    data(){
        return {
            value:false,
            tableData: [],
            use_fund:'',
            method_lsit:[],
            showmoney:false,
            addform:{
                status: 1,
                pay_amount: 0,
                pay_method_list: [],
                reserve_fund_used: 0,
                remarks: "",
                bill_item_list:[],
                is_invoice:0,
                invoice_title:'',
                invoice_amount:'',
                invoice_remark:'',
            },
            is_invoice_if:false,
            act_amount:0,
            priceData:[],
            info:{},
            reserved_fund:'',
            payData:[/*{
              data: '支付金额',
              method_lsit:[],
            },
              {
                data: '银行回执单号',
                zero_lsit:[],
              }*/]
        }
    },
    created () {
        this.getInfo();
        this.getpaymethod();
    },
    methods: {
        getInfo(){
            var _this = this;
            this.$axios.get('/api/finance/bill/'+this.$route.params.id+'/pay_info/')
            .then(res=>{
                if(res.data.status !=0){
                _this.info = res.data.bill_info;
                _this.reserved_fund = res.data.reserved_fund;
                res.data.billitem_li.forEach(item=>{
                    item.bill_item_id = item.id
                });
                _this.tableData = res.data.billitem_li;
                _this.addform.bill_item_list = res.data.billitem_li;
                _this.gettotal()
                // _this.tableData = res.data.bill_history;
                }
            })
        },
        editfund(val){
            this.use_fund = this.use_fund.replace(/[^0-9.]/g,'');
            if(this.use_fund !== ""){
                this.value = true;
            } else {
                this.value = false;
            }
        },
        saveInfo(){
            var _this = this;
            if(this.is_invoice_if){
                this.addform.is_invoice = 1;
                if (!(this.addform.invoice_title || this.addform.invoice_amount || this.addform.invoice_remark)) {
                    this.$message({
                        type:'error',
                        message:'开票需求需补充完整'
                    })
                    return
                }
            } else {
                this.addform.is_invoice = 0;
            }
            this.addform.reserve_fund_used = this.use_fund;
            var payment_me_list = [];
            this.addform.pay_method_list.forEach(item=>{
                if(!item.amount){
                    this.$set(item,'amount',"");
                } else {
                    if(!item.payment_no){
                        payment_me_list.push(item)
                    }
                }
                
            });

            if(payment_me_list.length >0){
                this.$message.error('请填写银行回执单号');
                return
            };
            
            if(this.addform.pay_amount < this.info.actual_amount){
                this.$message({
                    type:'error',
                    message:'实收金额应大于等于应收金额'
                })
                return
            };
            
            var act_total = 0;
            var reserve_fund_total = 0;
            var filter_list = [];
            this.addform.bill_item_list.forEach(item=>{
                if(!item.reserve_fund_used){
                    this.$set(item,'reserve_fund_used','');
                }
                reserve_fund_total += Number(item.reserve_fund_used)
                if(Number(item.reserve_fund_used)+Number(item.pay_amount) != item.actual_amount){
                    console.log(item)
                    filter_list.push(item);    
                }
            });
            if(filter_list.length>0){
                this.$message({
                    type:'error',
                    message:'实收加备用金必须等于折后应收'
                })
                return 
            }
            if(reserve_fund_total != this.use_fund){
                this.$message({
                    type:'error',
                    message:'备用金相加应等于已使用备用金'
                })
                return
            }
            this.$axios.post('/api/finance/bill/'+this.$route.params.id+'/pay_bill/',this.addform)
            .then(res=>{
                if(res.data.status === 1){
                    _this.$message({
                        type:'success',
                        message:'缴费成功！'
                    });
                    _this.$router.push('/financemanagement/billMaking');
                } else {
                    _this.$message({
                        type:'error',
                        message:res.data.error
                    });
                }
            })
        },
        getpaymethod(){
            var _this = this;
            this.$axios.get('/api/finance/bill/show_billpaymethod/')
            .then(res=>{
                _this.method_lsit = res.data.billpaymethod_list;
                _this.$set(_this.addform,'pay_method_list',res.data.billpaymethod_list);
            })
        },
        gettotal(){
            this.addform.pay_amount = 0;
            this.addform.pay_method_list.forEach(item=>{
                if(item.amount){
                    this.addform.pay_amount += item.amount-0;
                }
            });
            this.act_amount = this.addform.pay_amount;
            this.addform.pay_amount = this.addform.pay_amount + (this.use_fund-0);
        }
    },
    watch: {
        'addform.pay_method_list':{
           handler() {
               this.gettotal();
            },
            deep: true
        },
        use_fund(){
            if(this.use_fund > this.reserved_fund){
                this.use_fund = this.reserved_fund;
            }
            this.gettotal();
        }
    },
    computed: {
        left_money(){
            return (this.addform.pay_amount-this.info.actual_amount).toFixed(2)
        }
    },
}
</script>
