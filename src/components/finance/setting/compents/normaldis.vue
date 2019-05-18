<template>
  <div>
    <div class="select-header" style="min-height: 35px;">
            <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
                <i class="icon-font fa fa-calendar-plus-o"></i>
                <span class="orange font-size-14">新增折扣类型</span>
            </span>
    </div>
    <el-table
      :data="usualDiscountList"
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
        min-width="20">
        <template slot-scope="scope">
          <el-button type="text" @click="showDiscountVisible = true">查看详情</el-button>
          <span style="color: #999999">|</span>
          <el-button style="color: orange" type="text" @click="addNewDiscount(1)">编辑</el-button>
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
        type: 0,
        usualDiscountList: [],
        pagesize: 10,
        currentPage: 1,
        total: 1,
        showDiscountVisible: false
      }
    },
    mounted: function () {
      this.getUsualDiscountList(1)
    },
    watch: {
      currentPage() {
        this.getUsualDiscountList(this.currentPage)
      }
    },
    methods: {
      getUsualDiscountList: function (val) {
        this.currentPage = val
        this.$axios.get('/api/discount/discount_type_management/?type=' + this.type + '&size=' + this.pagesize + '&page=' + this.currentPage)
          .then(res => {
            if (res.status === 200) {
              if (res.data.status_code === 1) {
                this.usualDiscountList = res.data.data.results
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

