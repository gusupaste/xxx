<template>
    <div class="dismissed wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 学生折扣 > <span class="font-cl-blue">折扣详情</span></p>
      </div>
      <p class="black mt26 clearfix" style="padding-bottom:15px;border-bottom:1px solid #bbb">
        <span class="left font-size-14 bold">折扣申请学生：{{ student_name }}</span>
        <span class="right" v-if="this.$route.params.status === '0'">
              <span>状态：</span>
              <span class="green">审核中</span>
          </span>
        <span class="right" v-if="this.$route.params.status === '1'">
              <span>状态：</span>
              <span class="green">已批准</span>
          </span>
        <span class="right" v-if="this.$route.params.status === '2'">
              <span>状态：</span>
              <span class="red">已拒绝</span>
          </span>
      </p>
      <div class="clearfix mt26">
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
      <!--<div v-for="(item,index) in discount_form_item">
        <div class="content-top">{{ item.discount_type__name }}</div>
        <div class="clearfix">
            <el-col :span="24" class="card-type">
                <el-card shadow="always" class="clearfix">
                    <p class="baseInfo">基本信息</p>
                    <div style="width:90%" class="left">
                        <p class="bold" style="border-bottom:1px solid #bbb">
                            <span class="mr26">折扣申请学生：曹旭</span>
                            <span class="mr26">状态：
                                <span>已确认</span>
                            </span>
                        </p>
                        <p class="bold" style="border-bottom:1px solid #bbb">
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">拟入学日期：-12</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">拟入学日期：.00</div></el-col>
                                <el-col :span="10"><div class="grid-content bg-purple">学费正价：政策名称—学费科目—10000元.00</div></el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">申请折扣：20%</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">应缴总额：10000元</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">优惠金额：2000元</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">折后总额：8000元</div></el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">备注：— —/03/01</div></el-col>
                            </el-row>
                        </p>
                        <p>
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">相关附件：</div></el-col>
                            </el-row>
                            &lt;!&ndash;<el-row :gutter="20" v-for="(item,index) in tableData" :key="index">
                                <el-col :span="5"><a download="download" class="grid-content bg-purple" href="../../../assets/img/logo.png">员工子女折扣申请表.pdf</a></el-col>
                            </el-row>&ndash;&gt;
                        </p>
                    </div>
                </el-card>
            </el-col>
        </div>
      </div>-->
      <div v-for="(item,index) in discount_form_item">
        <div class="content-top">{{ item.discount_type__name }}</div>
        <div class="clearfix">
          <el-col :span="24" class="card-type">
            <el-card shadow="always" class="clearfix" style="padding:20px">
              <p class="baseInfo">&nbsp;</p>
              <div style="width:90%" class="left">
                <p class="" style="border-bottom:1px solid #bbb">
                  <el-row :gutter="20">
                    <el-col :span="5"><div class="grid-content bg-purple">申请折扣：{{ item.rate_or_price }}
                      <span v-if="item.discount_type__condition_status === 1">元</span>
                      <span v-if="item.discount_type__condition_status === 0">%</span></div></el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="5"><div class="grid-content bg-purple">备注：{{ item.remark }}</div></el-col>
                  </el-row>
                </p>
                <p>
                  <el-row :gutter="20">
                    <el-col :span="5"><div class="grid-content bg-purple">相关附件：</div></el-col>
                  </el-row>
                  <!--<el-row :gutter="20" v-for="(item,index) in tableData" :key="index">
                    <el-col :span="5"><a download="download" class="grid-content bg-purple" href="../../../assets/img/logo.png">员工子女折扣申请表.pdf</a></el-col>
                  </el-row>-->
                </p>
              </div>
            </el-card>
          </el-col>
        </div>
      </div>
      <div class="clearfix mt26">
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
        <div class="mt26 text-align-center">
                <button class="btn bg-grey" @click="cancel">返回</button>
          <!--<button class="btn bg-green">提交</button>-->
        </div>
    </div>
</template>
<style scoped>
  .dismissed .content-top{
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
  .dismissed .card-type {
      line-height: 40px;
  }
  .dismissed .el-card__body {
      padding: 30px 70px 10px 10px;
  }
  .dismissed .el-card__body:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
}
  .dismissed .tableList {
      color:#101010;
  }
  .dismissed .baseInfo {
      width: 5%;
      font-weight: 600;
      float: left;
      margin-right: 10px;
  }
</style>
<script>
export default {
    data(){
        return {
          student_name:'',
          amount:'',
          actual_amount:'',
          prepare_pay_date:'',
          entry_date:'',
          discount_form_item:[],
          policy:'',
          subject:'',
          tableData: [],
          price:'',
        }
    },
    mounted:function () {
      this.getInfo();
    },
    methods:{
      cancel:function () {
        this.$router.push('/financemanagement/discount');
      },
      getInfo:function(){
        var _this = this;
        var url = '/api/discount/discount_management/'+this.$route.params.id+'/get_discount_info/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.student_name = res.data.data.student_name;
            this.amount = res.data.data.amount;
            this.actual_amount = res.data.data.actual_amount;
            this.prepare_pay_date = res.data.data.prepare_pay_date;
            this.entry_date = res.data.data.entry_date;
            this.discount_form_item = res.data.data.discount_form_item;
            this.policy = res.data.data.policy;
            this.subject = res.data.data.subject;
            this.price = res.data.data.price;
            this.tableData = res.data.data.form_approve_data;
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
}
</script>
