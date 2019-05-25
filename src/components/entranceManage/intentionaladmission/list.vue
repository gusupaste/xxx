<template>
  <div class="intentionalAdmissionlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 入学管理 > <span class="font-cl-blue">意向入学缴费</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <span>搜索：</span>
        <el-input v-model="input" placeholder="输入学号、学生姓名或者学生卡号" class="search_input"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="getList(1)">搜索</el-button></span>
      </div>
        <div class="list-content">
          <el-table
            :data="tableDate"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 10px;">
            <el-table-column
              prop="name"
              label="学生姓名">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="date_of_birth"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="preferred_class"
              label="申请就读班级">
            </el-table-column>
            <el-table-column
              prop="preferred_date"
              label="计划入学时间">
            </el-table-column>
            <el-table-column
              prop="customer_name"
              label="联系人">
            </el-table-column>
            <el-table-column
              prop="customer_phone"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="start_trial_date"
              label="创建日期">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                  <router-link  :to="'/financemanagement/createDiscount/?id='+scope.row.bill_id" v-if="scope.row.bill_id && scope.row.bill_show">
                    <span style="padding:0 20px;border-right:1px solid #e3e3e3">
                        <i class="fa fa-pencil font-size-20 orange"></i>
                    </span>
                  </router-link>
                <router-link  to="" v-if="scope.row.bill_id && !scope.row.bill_show">
                    <span style="padding:0 20px;border-right:1px solid #e3e3e3">
                        <i class="fa fa-pencil font-size-20 grey"></i>
                    </span>
                </router-link>
                  <router-link to="/financemanagement/createDiscount" v-if="!scope.row.bill_id">
                    <span style="padding:0 20px;border-right:1px solid #e3e3e3">
                        <i class="fa fa-pencil font-size-20 orange"></i>
                    </span>
                  </router-link>

                <router-link :to="'/financemanagement/dollar/'+scope.row.bill_id" v-if=" scope.row.bill_show">
                    <span style="padding:0 20px;">
                        <i class="fa fa-dollar font-size-20 green"></i>
                    </span>
                </router-link>
                <router-link to="" v-if=" !scope.row.bill_show">
                    <span style="padding:0 20px;">
                        <i class="fa fa-dollar font-size-20 grey"></i>
                    </span>
                </router-link>
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
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableDate: [],
        input: '',
        pagesize: 10,
        currentPage: 1,
        total: 1,
      };
    },
    mounted: function () {
      this.getList(1);
    },
    watch: {
      currentPage () {
        this.getList(this.currentPage)
      }
    },
    methods: {
      getList: function (val) {
        this.currentPage = val
        this.$axios.get('/api/student/student/student_list/?size=' + this.pagesize + '&page=' + this.currentPage, {
          params: {
            student_type: 'Potential',
            condition: this.input
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.tableDate = res.data.results.results
            this.total = res.data.results.count
          }
        }).catch(err => {
          console.log(err)
        })
      },
      editSchool: function (param, index) {
        this.$router.push('/financemanagement/billDetail');
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
    }
  }
</script>

<style scoped>
  .intentionalAdmissionlist {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .intentionalAdmissionlist .bold {
    font-weight: bold;
    color: black;
  }

  .intentionalAdmissionlist .content {
    margin-top: 10px;
  }

  .intentionalAdmissionlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }

  .intentionalAdmissionlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    text-align: center;
  }
</style>
