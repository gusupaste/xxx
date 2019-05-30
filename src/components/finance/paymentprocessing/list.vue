<template>
    <div class="paymentprocessing wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">缴费处理</span></p>
      </div>
      <div class="content">
        <div class="list-content">
          <div class="select-header">
            <span>学年：</span>
            <el-select v-model="searchForm.academic_year_id" placeholder="请选择" >
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in academic_year_li" :value="item.id" :key="item.id" :label="item.year"></el-option>
            </el-select>
            <span class="ml20">账单类型：</span>
            <el-select v-model="searchForm.bill_type" placeholder="请选择" >
              <el-option label="全部" value=""></el-option>
              <el-option label="入园账单" value="0"></el-option>
              <el-option label="系统备用金结转账单" value="1"></el-option>
              <el-option label="转班补交账单" value="2"></el-option>
              <el-option label="离园账单" value="3"></el-option>
              <el-option label="预备生离园账单" value="4"></el-option>
              <el-option label="终止服务账单" value="5"></el-option>
              <el-option label="推迟入园账单" value="6"></el-option>
              <el-option label="提前入园账单" value="7"></el-option>
              <el-option label="否决账单" value="8"></el-option>
            </el-select>
            <span class="ml20">账单状态：</span>
            <el-select v-model="searchForm.bill_status" placeholder="请选择" >
              <el-option label="全部" value=""></el-option>
              <el-option label="待审批" value="待审批"></el-option>
              <el-option label="已确认" value="已确认"></el-option>
              <el-option label="已批准" value="已批准"></el-option>
              <el-option label="已拒绝" value="已拒绝"></el-option>
            </el-select>
            <span class="ml20">学生：</span>
            <el-input v-model="searchForm.search_str" class="search_input" placeholder="输入学生名称" style="width: 220px;"></el-input>
            <span class="padding-left-30"><el-button type="primary" @click="searchList(1)">搜索</el-button></span>
          </div>
          <el-table
            ref="multipleTable"
            :data="chargeTableDate"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection">
            </el-table-column>
            <el-table-column
              prop="bill_type"
              label="账单类型">
            </el-table-column>
            <el-table-column
              prop="student_name"
              label="学生姓名">
            </el-table-column>
            <el-table-column
              prop="academic_year"
              label="学年">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="折前金额">
            </el-table-column>
            <el-table-column
              prop="actual_amount"
              label="折后金额">
            </el-table-column>
            <el-table-column
              prop="pay_amount"
              label="缴费金额">
            </el-table-column>
            <el-table-column
              prop="reserved_fund"
              label="使用备用金金额">
            </el-table-column>
            <el-table-column
              prop="billing_date"
              label="缴费日期">
            </el-table-column>
            <el-table-column
              prop="bill_status"
              label="状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button class="red" type="text" size="small" @click="editSchool(scope.row)">
                  <span class="el-icon-edit-outline" style="font-size: 20px;color: #ED6C2E;"></span>
                </el-button>
                <span style="color: #999999">|</span>
                <el-button class="red" type="text" size="small" @click="showInfo(scope.row)">
                  <span class="el-icon-search" style="font-size: 20px;color: #ED6C2E;"></span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              class="mt26"
              background
              :current-page="searchForm.page"
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next,jumper"
              :total="count">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        academic_year_li:[],
        count:0,
        searchForm:{
          academic_year_id:'',
          bill_type:'',
          bill_status:'',
          search_str:'',
          page:1,
          size:10,
          center_id:this.$cookies.get('userInfo').center.id,
        },
        chargeTableDate:[]
      };
    },
    created () {
      this.searchInfo();
      this.searchList(1);
    },
    methods: {
      handleSelectionChange(){

      },
      handleCurrentChange(val){
        this.searchList(val)
      },
      editSchool(val){
        this.$router.push('/financemanagement/payBillDetail/'+val.id)
      },
      showInfo(val){
        this.$router.push('/financemanagement/billInfo/'+val.id)
      },
      searchList(id){
        this.searchForm.page = id;
        this.$axios.get('/api/finance/bill/payed_bill/',{
          params:this.searchForm
        }).then(res=>{
          console.log(res.data)
          this.chargeTableDate = res.data.bill_li;
          this.count = res.data.count;
        })
      },
      searchInfo(){
            this.$axios.get('/api/finance/bill/search_info/',{
                params:{
                    center_id:this.searchForm.center_id
                }
            })
            .then(res=>{
                this.academic_year_li = res.data.data.academic_year_li;
            })
        },

    },
    watch:{
    },
  }
</script>

<style scoped>
  .paymentprocessing{
    text-align: left;
  }
  .paymentprocessing >>> .search_input .el-input__inner{
    width: 100%;
  }
  .paymentprocessing .bold{
    font-weight: bold;
    color: black;
  }
  .paymentprocessing .list-content{
    margin-top: 20px;
  }
  .paymentprocessing .select-header,.paymentprocessing .list-content{
    width: 100%;
    min-height: 50px;
  }
  .paymentprocessing >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .paymentprocessing >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .paymentprocessing >>> .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .paymentprocessing >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .paymentprocessing >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .paymentprocessing >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .paymentprocessing >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .paymentprocessing >>> #tab-first{
     margin-left: -350px;
   }
  .paymentprocessing >>> .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .paymentprocessing .el-textarea{
    width: 95% !important;
  }
  .paymentprocessing .el-radio__input{
    line-height: 3.5 !important;
  }
  .paymentprocessing >>> .el-dialog__footer{
    text-align: center;
  }
  .paymentprocessing .deleteFee >>> .el-dialog__body{
    text-align: center;
  }
  .paymentprocessing .discountDialog .el-checkbox-group{
    display: -webkit-box;
  }
  .paymentprocessing .discountShow .el-form-item{
    margin-bottom: 0px !important;
  }
  .paymentprocessing .discountShow .el-form-item__label{
    width: 120px !important;
  }
  .paymentprocessing .discountShow >>> .el-form-item__content{
    display: -webkit-box;
    margin-left: 120px !important;
  }
  .paymentprocessing >>> .discountShow .el-dialog__body{
    padding-top: 5px !important;
  }
  .paymentprocessing .select-header, .settinglist .list-content{
    min-height: 50px;
  }
  .paymentprocessing .policyClass{
    width: 100%;
    min-height: 50px;
  }
  .paymentprocessing .policyClass p{
    color: #333333;
    font-size: 15px;
    font-weight: bold;
  }
  .paymentprocessing .policyClass span{
    color: #bbbbbb;
    font-size: 10px;
  }
  .paymentprocessing .policyClass .button_color{
    border-color: #006287;
    color: #006287;
  }
  .paymentprocessing .copyPolicyShow .el-select{
    width: 80%;
  }
  .paymentprocessing >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .paymentprocessing >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
</style>
