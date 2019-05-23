<template>
  <div class="discountApplicationDetail wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 工作流 > <span class="font-cl-blue">审批详情</span></p>
    </div>
    <p class="black mt26 clearfix" style="padding-bottom:15px;border-bottom:1px solid #bbb">
      <span class="left"><span v-if="detilCode === 'RB'">折扣</span>申请学生：{{ student_name }}</span>
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
                <el-col :span="10"><div class="grid-content bg-purple">学费正价：{{ policy }} - {{ subject }} - {{ amount }}元</div></el-col>
              </el-row>
            </p>
          </div>
        </el-card>
      </el-col>
    </div>
    <div v-for="(item,index) in discount_form_item">
      <div class="content-top">员工子女折扣</div>
      <div class="clearfix">
        <el-col :span="24" class="card-type">
          <el-card shadow="always" class="clearfix">
            <p class="baseInfo">&nbsp;</p>
            <div style="width:90%" class="left">
              <p class="" style="border-bottom:1px solid #bbb">
                <!--<el-row :gutter="20">
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
                  <!--<el-col :span="5">
                    <div class="grid-content bg-purple">应缴总额：{{ amount }}元</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">优惠金额：{{ amount - actual_amount }}元</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">折后总额：{{ actual_amount }}元</div>
                  </el-col>-->
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="5">
                    <div class="grid-content bg-purple">备注：— —/03/01</div>
                  </el-col>
                </el-row>
              </p>
              <p>
                <el-row :gutter="20">
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
                <el-col :span="5"><div class="grid-content bg-purple">应缴总额：{{ amount }}元</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">优惠金额：{{ amount - actual_amount }}元</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">折后总额：{{ actual_amount }}元</div></el-col>
              </el-row>
            </p>
          </div>
        </el-card>
      </el-col>
    </div>
    <!--<div class="content-top">园长折扣</div>
    <div class="clearfix">
      <el-col :span="24" class="card-type">
        <el-card shadow="always" class="clearfix">
          <p class="baseInfo">&nbsp;</p>
          <div style="width:90%" class="left">
            <p class="" style="border-bottom:1px solid #bbb">
              <el-row :gutter="20">
                <el-col :span="5">
                  <div class="grid-content bg-purple">拟入学日期：-12</div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">拟入学日期：.00</div>
                </el-col>
                <el-col :span="10">
                  <div class="grid-content bg-purple">学费正价：政策名称—学费科目—10000元.00</div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="5">
                  <div class="grid-content bg-purple">申请折扣：20%</div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">应缴总额：10000元</div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">优惠金额：2000元</div>
                </el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">折后总额：8000元</div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="5">
                  <div class="grid-content bg-purple">备注：— —/03/01</div>
                </el-col>
              </el-row>
            </p>
            <p>
              <el-row :gutter="20">
                <el-col :span="5">
                  <div class="grid-content bg-purple">相关附件：</div>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-for="(item,index) in tableData" :key="index">
                <el-col :span="5"><a download="download" class="grid-content bg-purple"
                                     href="../../../assets/img/logo.png">员工子女折扣申请表.pdf</a></el-col>
              </el-row>
            </p>
          </div>
        </el-card>
      </el-col>
    </div>-->
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
      <button class="btn bg-grey" @click="back">返回</button>
      <button v-show="status === 0" class="btn bg-green" @click="save">提交</button>
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
        formId: Number(this.$route.query.formId),
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
      }
    },
    mounted: function () {
      this.getDetail();
      if(this.detilCode === 'RB'){
        this.getDiscount();
      }
    },
    methods: {
      /*折扣*/
      getDiscount:function () {
        var _this = this;
        this.loading = true
        var url = '/api/discount/discount_management/'+this.formId+'/get_discount_info/';
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
            /*this.tableData = res.data.data.form_approve_data;*/
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
      }
    }
  }
</script>
