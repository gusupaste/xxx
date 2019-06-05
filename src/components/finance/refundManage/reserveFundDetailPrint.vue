<template>
  <div class="billDetailSc wrap">
    <div class="content-top">系统备用金结转账单</div>
    <div class="clearfix">
      <el-col :span="24" class="card-type">
        <el-card shadow="always">
          <p class="bold" style="border-bottom:1px solid #bbb">
              <span class="mr26">制单人：{{bill_info.created_by}}</span>
              <span class="mr26">制单日期：{{bill_info.date_created}}</span>
              <span class="mr26">状态：
                  <span>{{bill_info.bill_status}}</span>
              </span>
          </p>
          <p style="line-height: 40px;">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">申请学校：{{bill_info.center_name}}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">申请人：{{bill_info.student_name}}</div>
              </el-col>
            </el-row>
          </p>
          <p style="line-height: 40px;">
            <el-row :gutter="24">
              <template>
                <el-col :span="8">
                  <div class="grid-content bg-purple">申请班级：{{bill_info.student.student_class}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">申请日期：{{bill_info.leave_date}}
                  </div>
                </el-col>
              </template>
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
    <div class="mt26 tableList">
      <p>退费明细（标准项目）：</p>
      <el-table
        class="mt10"
        :data="tableData"
        border
        ref="mutitable"
        style="width: 100%">
        <el-table-column
          label="学生信息">
          <el-table-column
            prop="student_no"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="student_name"
            label="姓名">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="学费退费">
          <el-table-column
            prop="pay_method"
            label="缴费类型">
          </el-table-column>
          <el-table-column
            prop="month_pay"
            label="（折合）单价（元/月）">
          </el-table-column>
          <el-table-column
            prop="absence_total_days"
            label="本月请假/缺勤天数">
          </el-table-column>
          <el-table-column
            prop="absence_days"
            label="可退转计数">
          </el-table-column>
          <el-table-column
            label="学费应退金额">
            <template slot-scope="scope">
              <span>{{scope.row.refund_money}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="餐费退费">
          <el-table-column
            prop="meal_month_pay"
            label="餐费退转单价">
          </el-table-column>
          <el-table-column
            prop="meal_refund_money"
            label="餐费应退金额">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="合计">
          <el-table-column
            prop="sub_total"
            label="应退转金额小计">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        id:this.$route.params.id,
        bill_info:{
          student:{}
        },
        approve_history:[]
      }
    },
    mounted() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        var _this = this
        this.$axios.get('/api/finance/reserve_fund_for_attendance/'+this.id+'/leave_reserve_fund_detail/')
          .then(res => {
            _this.bill_info = res.data.data;
            _this.approve_history = res.data.data.approve_data;
            _this.tableData = [res.data.data];
            console.log(res.data)
          })
      }
    }
  }
</script>

<style scoped>
  .billDetailSc .content-top {
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0px 10px 20px;
    top: 20px;
    left: -5px;
    position: relative;
    border-radius: 3px;
    color: #3E7193;
  }

  .billDetailSc .card-type {
    line-height: 30px;
  }

  .billDetailSc .el-card__body {
    padding: 30px 70px 10px 70px;
  }

  .billDetailSc .tableList {
    color: #101010;
  }

  .billDetailSc >>> .el-date-editor.el-input, .billDetailSc >>> .el-date-editor.el-input__inner {
    width: 145px;
  }
</style>
