<template>
  <div class="billDetailSc wrap">
    <p class="local_path_style">You Are Here ：财务处理 > 备用金管理 > <span class="font-cl-blue">缺勤请假转备用金</span></p>
    <div class="content-top">缺勤请假转备用金</div>
    <div class="clearfix">
      <el-col :span="24" class="card-type">
        <el-card shadow="always">
          <p style="line-height: 40px;">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">申请学校：{{userInfo.center.name}}</div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">申请人：{{userInfo.fullname}}</div>
              </el-col>
            </el-row>
          </p>
          <p style="line-height: 40px;">
            <el-row :gutter="24">
              <template v-if="single_status === 1">
                <el-col :span="8">
                  <div class="grid-content bg-purple">申请日期：
                    <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="date"
                      type="date"
                      @change="getSingleStudent"
                      placeholder="申请日期">
                    </el-date-picker>
                  </div>
                </el-col>
              </template>
              <template v-else>
                <el-col :span="8">
                  <div class="grid-content bg-purple">申请班级：
                    <el-select v-model="searchForm.center_class_id">
                      <el-option v-for="item in class_li" :key="item.id" :label="item.class_name"
                                 :value="item.id"></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">申请月份：
                    <el-date-picker
                      value-format="M"
                      @change="change"
                      v-model="searchForm.month"
                      type="month"
                      :picker-options="pickerOptions"
                      start-placeholder="开始月份">
                    </el-date-picker>
                  </div>
                </el-col>

              </template>
            </el-row>
          </p>
        </el-card>
      </el-col>
    </div>
    <div class="mt26 tableList">
      <el-table
        class="mt10"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        ref="mutitable"
        style="width: 100%">
        <el-table-column
          label="学生信息">
          <el-table-column
            type="selection">
          </el-table-column>
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
              <span>{{scope.row.refund_money.current_month}}</span>
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
    <div class="mt26 text-align-center">
      <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
      <button class="btn bg-green" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        class_li: [],
        searchForm: {
          month: '',
          center_class_id: ''
        },
        mutitable: [],
        userInfo: this.$cookies.get('userInfo'),
        single_status: Number(this.$route.params.status),
        date: '',
        student_id: this.$route.query.id,
        pickerOptions: {}
      }
    },
    mounted() {
      this.tableData = []
      this.date = this.$options.filters['formatDate'](new Date())
      if (this.single_status === 0) {
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime() > new Date().setMonth(new Date().getMonth() - 1)
          }
        }
        this.searchInfo()
      } else {
        this.getSingleStudent()
      }
    },
    methods: {
      getSingleStudent: function () {
        this.$axios.get('/api/finance/reserve_fund_for_attendance/leave_reserve_fund/', {
          params: {
            leave_date: this.date,
            student_id: this.student_id
          }
        })
          .then(res => {
            if (res.data.status === 1) {
              this.tableData.push(res.data.data)
              console.log(this.tableData)
            } else {

            }
          }).catch(err => {

        })
      },
      getInfo() {
        var _this = this
        this.$axios.get('/api/finance/reserve_fund_for_attendance/student_list/', {
          params: this.searchForm
        })
          .then(res => {
            if (res.data.status == 1) {
              _this.tableData = res.data.data
            } else {
              _this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
      },
      handleSelectionChange(val) {
        this.mutitable = val
      },
      submit() {
        var _this = this
        if (this.mutitable.length === 0) {
          this.$message({
            type: 'error',
            message: '请选择学生！'
          })
          return
        }
        this.mutitable.forEach(item => {
          item.center_class_id = this.searchForm.center_class_id
          item.month = this.searchForm.month
          item.amount = item.sub_total
          item.leave_date = this.date
        })
        this.$axios.post('/api/finance/reserve_fund_for_attendance/add/', {
          bills: this.mutitable
        })
          .then(res => {
            if (res.data.status === 1) {
              _this.$router.push('/financemanagement/reservefund')
            }
          })
      },
      searchInfo() {
        this.$axios.get('/api/finance/bill/search_info/', {
          params: {
            center_id: this.userInfo.center.id
          }
        })
          .then(res => {
            this.class_li = res.data.data.class_li
          })
      },
    },
    watch: {
      searchForm: {
        handler() {
          if (this.searchForm.month !== '' && this.searchForm.center_class_id !== '') this.getInfo()

        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .billDetailSc .content-top {
    font-weight: 600;
    background-color: #DCECF3;
    width: fit-content;
    padding: 8px 20px 8px 20px;
    margin: 20px 0px;
    /*position: relative;*/
    top: 20px;
    left: -5px;
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
