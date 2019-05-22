<template>
    <div class="billMakingDetail wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 账单制作 > <span class="font-cl-blue">账单信息</span></p>
      </div>
        <div class="content-top">制单信息（预制订单）</div>
        <div class="clearfix">
            <el-col :span="24" class="card-type">
                <el-card shadow="always">
                <p class="" style="border-bottom:1px solid #bbb">
                    <span class="mr26">制单人：{{bill_info.creator}}</span>
                    <span class="mr26">制单日期：{{bill_info.billing_date}}</span>
                    <span class="mr26">状态：
                        <span v-if="bill_info.status === 0" class="green">草稿</span>
                        <span v-if="bill_info.status === 1" class="green">已确认</span>
                        <span v-if="bill_info.status === 2" class="green">待批</span>
                        <span v-if="bill_info.status === 3" class="green">已批准</span>
                        <span v-if="bill_info.status === 4" class="red">已拒绝</span>
                    </span>
                </p>
                <p class="">
                    <el-row :gutter="20">
                        <el-col :span="5"><div class="grid-content bg-purple">账单编号：{{bill_info.bill_no}}</div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple">应缴金额：¥{{bill_info.amount}}</div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple">账单余额：¥0</div></el-col>
                    </el-row></p>
                <p>
                    <el-row :gutter="20">
                        <el-col :span="5"><div class="grid-content bg-purple">学生姓名：{{bill_info.student_name}}</div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple">所在校园：{{bill_info.center_name}}</div></el-col>
                        <el-col :span="5"><div class="grid-content bg-purple">所在班级：{{bill_info.klass_name}}</div></el-col>
                    </el-row>
                </p>
                <p>
                <el-row :gutter="20">
                    <el-col :span="5"><div class="grid-content bg-purple">入学日期：{{bill_info.enter_date}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">缴费账期：{{bill_info.center_class_year}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">费用应缴日期：{{bill_info.planned_payment_date}}</div></el-col>
                </el-row>
                </p>
                </el-card>
            </el-col>
        </div>
        <div class="mt26 tableList" style="display:none">
            <p class="title-style">审批记录：</p>
            <el-table
                class="mt10"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="审批节点"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="审批角色"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="审批结果">
                </el-table-column>
                <el-table-column
                prop="address"
                label="审批意见">
                </el-table-column>
                <el-table-column
                prop="address"
                label="审批日期">
                </el-table-column>
            </el-table>
        </div>
        <div class="mt26 tableList">
            <p class="title-style">费用分摊明细：</p>
            <el-table
                class="mt10"
                :data="tableData"
                border
                stripe
                style="width: 100%">
                <el-table-column
                prop="charging_policy_name"
                label="费用类型"
                width="">
                </el-table-column>
                <el-table-column
                prop="subject_name"
                label="费用科目"
                width="">
                </el-table-column>
                <el-table-column
                prop="payment_method"
                label="缴费方式">
                </el-table-column>
                <el-table-column
                prop="address"
                label="缴费区间">
                    <template slot-scope="scope">
                        {{scope.row.effective_begin_date}}——{{scope.row.effective_end_date}}
                    </template>
                </el-table-column>
                <el-table-column
                prop="price"
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
            </el-table>
        </div>
        <div class="mt26" style="text-align:right;">
            <span>合计：
                <span class="red bold font-size-20">{{bill_info.actual_amount}}</span>
            </span>
        </div>
        <div class="count_total" style="text-align:right;display:none">
            <span>正价应收合计：
                <span class="red bold">27280 .00</span>
            </span>
            <span class="ml10">折扣应收合计：
                <span class="red bold">27280 .00</span>
            </span>
            <span class="ml10">已收金额合计：
                <span class="red bold">27280 .00</span>
            </span>
            <span class="ml10">当期余额：
                <span class="red bold">27280 .00</span>
            </span>
        </div>
        <div class="mt26 tableList" style="display:none">
            <p class="title-style">缴费记录：</p>
            <el-table
                class="mt10"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="缴费日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="缴费金额"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="备用金抵扣">
                </el-table-column>
                <el-table-column
                prop="address"
                label="收款人">
                </el-table-column>
                <el-table-column
                prop="address"
                label="费用状态">
                </el-table-column>
                <el-table-column
                prop="address"
                label="折扣">
                </el-table-column>
                <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <i class="fa fa-search green font-size-14"></i>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
            <button v-if="permission['finance']['bill-editor'] && bill_info.status === 0" class="btn bg-green">编辑</button>
            <button v-if="permission['finance']['bill-editor'] && bill_info.status === 0"  class="btn bg-dark-orange">缴费</button>
        </div>
    </div>
</template>
<style scoped>
  .billMakingDetail .content-top{
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
  .billMakingDetail .card-type {
      line-height: 30px;
  }
  .billMakingDetail .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .billMakingDetail .tableList {
      color:#101010;
  }
  .billMakingDetail .count_total {
      background-color: rgba(255,152,0,.14);
      height: 35px;
      padding: 10px;
      line-height: 35px;
  }
</style>
<script>
export default {
    data(){
        return {
            bill_info:{},
            tableData: [],
            permission : this.$cookies.get('userInfo').user_permissions,
            id:this.$route.params.id
        }
    },
    created () {
        this.getInfo();
    },
    methods: {
        getInfo(){
            console.log()
            var _this = this;
            this.$axios.get('/api/finance/bill/'+this.id+'/info_single_bill/')
            .then(res=>{
                console.log(res.data)
                _this.bill_info = res.data.data.bill_info;
                _this.tableData = res.data.data.billitem_li;
            })
        }
    }
}
</script>
