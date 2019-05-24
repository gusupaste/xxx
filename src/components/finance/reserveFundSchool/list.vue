<template>
  <div class="discountlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">备用金管理</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <span style="margin-left: 10px">学年：</span>
        <el-select v-model="academic_year_id" placeholder="请选择">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in year_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">班级：</span>
        <el-select v-model="class_id" placeholder="请选择">
          <el-option
            v-for="item in class_list"
            :key="item.id"
            :label="item.center_class__name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="margin-left: 20px">学生姓名：</span>
        <el-input v-model="search_name" placeholder="请输入学生姓名" class="search_input"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="getList">搜索</el-button></span>
        <!--<span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/create-reservefund')">
            <i class="icon-font fa fa-calendar-plus-o"></i>
            <span class="font-cl-blue font-size-14">推迟入园转备用金</span>
        </span>-->
        <span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/create-reserve')">
            <i class="icon-font fa fa-calendar-plus-o"></i>
            <span class="font-cl-blue font-size-14">缺勤请假转备用金</span>
        </span>
      </div>
      <div class="list-content">
        <el-table
          :data="tableDate"
          border
          stripe
          show-header
          style="width: 100%;margin-top: 10px;">
          <el-table-column
            prop="student_no"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="student_class"
            label="所在班级">
          </el-table-column>
          <el-table-column
            label="初期余额">
            <el-table-column
              label="普惠">
              <template slot-scope="scope">
                <span>{{scope.row.puhui.init}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="非普惠">
              <template slot-scope="scope">
                <span>{{scope.row.not_puhui.init}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="本学年结转额">
            <el-table-column
              label="普惠">
              <template slot-scope="scope">
                <span>{{scope.row.puhui.exchange}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="非普惠">
              <template slot-scope="scope">
                <span>{{scope.row.not_puhui.exchange}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="本学年待批使用">
            <el-table-column
              label="普惠">
              <template slot-scope="scope">
                <span>{{scope.row.puhui.pending}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="非普惠">
              <template slot-scope="scope">
                <span>{{scope.row.not_puhui.pending}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="本学年已使用">
            <el-table-column
              label="普惠">
              <template slot-scope="scope">
                <span>{{scope.row.puhui.used}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="非普惠">
              <template slot-scope="scope">
                <span>{{scope.row.not_puhui.used}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="可用余额">
            <el-table-column
              label="普惠">
              <template slot-scope="scope">
                <span>{{scope.row.puhui.available}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="非普惠">
              <template slot-scope="scope">
                <span>{{scope.row.not_puhui.available}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small">待批记录</el-button>&nbsp;&nbsp;&nbsp;|
              <el-button type="text" size="small">使用记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        year_list: [],
        academic_year_id: '',
        class_list: [],
        class_id: '',
        tableDate: [],
        search_name: ''
      }
    },
    mounted: function () {
      this.getYearList()
    },
    watch: {
      academic_year_id() {
        this.class_id = ''
        this.getClassList()
      },
      class_id() {
        this.getList()
      }
    },
    methods: {
      /*学年*/
      getYearList: function () {
        this.$axios.get('/api/common/select/academic_year_list/')
          .then(res => {
            this.year_list = res.data.results
            for (var x in this.year_list) {
              if (this.year_list[x].is_selected === 1) {
                this.academic_year_id = this.year_list[x].id
              }
            }
            this.getClassList()
          }).catch(err => {
          console.log(err)
        })
      },
      /*班级*/
      getClassList: function () {
        this.$axios.get('/api/attendance/students_attendance/classes/?academic_year_id=' + this.academic_year_id)
          .then(res => {
            this.class_list = res.data.data.classes
            this.class_id = this.class_list[0].id
            this.getList()
          }).catch(err => {
          console.log(err)
        })
      },
      getList: function () {
        this.$axios.get('/api/finance/reserved_fund/', {
          params: {
            academic_year_id: this.academic_year_id,
            class_id: this.class_id,
            search_name: this.search_name
          }
        })
          .then(res => {
            this.tableDate = res.data.results
          }).catch(err => {

        })
      },
      editSchool: function (param, index) {
        if (index === 0) {
          this.$router.push('/financemanagement/pendingApprovalRecord');
        } else {
          this.$router.push('/financemanagement/usageRecord');
        }
      }
    }
  }
</script>

<style scoped>
  .discountlist {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .discountlist .bold {
    font-weight: bold;
    color: black;
  }

  .discountlist .select-header, .refundlist .list-content {
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
    line-height: 50px;
  }

  .discountlist .el-select {
    width: 10%;
  }

  .discountlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    text-align: center !important;
  }

  .discountlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
</style>
