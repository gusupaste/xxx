<template>
  <div>
    <div class="select-header" style="min-height: 35px;line-height: 35px;margin-bottom: 10px;">
                <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="orange font-size-14">新增折扣类型</span>
              </span>
    </div>
    <el-table
      :data="enrollmentDiscountList"
      border
      stripe
      show-header
      style="width: 100%;">
      <el-table-column
        prop="name"
        label="折扣类型"
        min-width="40">
      </el-table-column>
      <el-table-column
        prop="start_date"
        label="生效日期"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="end_date"
        label="失效日期"
        min-width="60">
      </el-table-column>
      <el-table-column
        label="缴费区间"
        min-width="80">
        <template slot-scope="scope">
          <span>{{scope.row.pay_start_date}}至{{scope.row.pay_end_date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="centers"
        label="适用校园"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="mutexs"
        label="互斥折扣"
        min-width="80">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="40">
        <template slot-scope="scope">
          <el-button style="color: orange" type="text" size="small" @click="addNewDiscount(1)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="pager, next, jumper"
      next-text="下一页"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :total="total" class="page">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        type: 1,
        enrollmentDiscountList: [],
        pagesize: 10,
        currentPage: 1,
        total: 1
      }
    },
    mounted: function () {
      this.getEnrollmentDiscountList(1)
    },
    watch: {
      currentPage () {
        this.getEnrollmentDiscountList(this.currentPage)
      }
    },
    methods: {
      getEnrollmentDiscountList: function (val) {
        this.currentPage = val
        this.$axios.get('/api/discount/discount_type_management/?type=' + this.type + '&size=' + this.pagesize + '&page=' + this.currentPage)
          .then(res => {
            if (res.status === 200) {
              if (res.data.status_code === 1) {
                this.enrollmentDiscountList = res.data.data.results
                this.total = res.data.data.count
              } else {
                alert(res.data.message)
              }
            }
          }).catch(err => {
          console.log(err)
        })
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      }
    }
  }
</script>

