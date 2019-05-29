<template>
  <div class="wrap discountApplication">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE ：财务处理 > <span class="font-cl-blue">折扣申请</span></p>
    </div>
    <div class="clearfix mt26">
      <div class="mt10">
        <span>学年：</span>
        <el-select v-model="year" placeholder="请选择学年">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in year_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="padding-left-30">班级：</span>
        <el-select v-model="class_val">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in class_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="padding-left-30">状态：</span>
        <el-select v-model="typeValue">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in status_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="padding-left-30">搜索：</span>
        <el-input v-model="searchText" placeholder="请输入学生姓名" class="search_input"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="getList">搜索</el-button></span>
      </div>
      <div class="right mt10 cur mb10" @click="$router.push('/financemanagement/adddiscountApplication')">
        <i class="orange fa fa-plus font-size-20"></i>
        <span class="font-cl-blue">新增折扣申请</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="student_name"
        label="学生姓名">
      </el-table-column>
      <el-table-column
        prop="center_class_name"
        label="所在班级">
      </el-table-column>
      <el-table-column
        prop="discount_type_name"
        label="折扣类型">
      </el-table-column>
      <el-table-column
        label="正价">
        <template slot-scope="scope">
          {{ scope.row.amount + scope.row.actual_amount }}
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="折扣">
      </el-table-column>
      <el-table-column
        prop="actual_amount"
        label="折后金额">
        <!--<template slot-scope="scope">
          {{ scope.row.actual_amount - scope.row.amount }}
        </template>-->
      </el-table-column>
      <el-table-column
        prop="apply_date"
        label="申请日期">
      </el-table-column>
      <el-table-column
        prop="form_status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <i class="fa fa-search orange font-size-20 ml10 cur" @click="routerPush(scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev,pager, next, jumper"
      next-text="下一页"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :total="total" class="page">
    </el-pagination>
  </div>
</template>
<style scoped>
  .discountApplication {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
</style>
<script>
  export default {
    data() {
      return {
        pagesize:10,
        currentPage:1,
        total:1,
        value: "",
        tableData: [],
        year_url: '/api/common/select/academic_year_list/', /*学年*/
        klass_url: '/api/common/select/class_list/', /*班级*/
        status_list: [
          {
            id: 0,
            name: '待审批'
          },
          {
            id: 1,
            name: '已批准'
          },
          {
            id: 2,
            name: '已拒绝'
          },
        ],
        list_url: '',
        year_list: [],
        class_list: [],
        year: '',
        class_val: '',
        typeValue: '',
        searchText: '',
      }
    },
    created() {
      this.getYearList();
      this.getClassList();
      this.getList();
    },
    methods: {
      handleCurrentChange:function(currentPage){
        this.currentPage=currentPage;
      },
      routerPush: function (obj) {
        var status = 0;
        if (obj.form_status === '待审批') {
          status = 0;
        } else if (obj.form_status === '已批准') {
          status = 1;
        } else {
          status = 2;
        }
        this.$router.push('/financemanagement/discountApplicationDetail/' + obj.form_id + '/' + status);
      },
      /*学年*/
      getYearList: function () {
        var _this = this;
        var url = this.year_url;
        _this.$axios.get(url).then(res => {
          _this.loading = false;
          if (res.status == 200 && res.data.status_code == 1) {
            this.year_list = res.data.results;
            /*for (var x in this.year_list) {
              if (this.year_list[x].is_selected == 1) {
                this.year = this.year_list[x].id;
              }
            }*/
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*班级*/
      getClassList: function () {
        var _this = this;
        _this.$axios.get(this.klass_url).then(res => {
          _this.loading = false;
          if (res.status == 200 && res.data.status_code == 1) {
            this.class_list = res.data.results;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*列表*/
      getList: function () {
        var _this = this;
        var index1 = this.year;
        var index2 = this.class_val;
        var index3 = this.typeValue;
        if (this.year === '') {
          index1 = -1;
        }
        if (this.class_val === '') {
          index2 = -1;
        }
        if (this.typeValue === '') {
          index3 = -1;
        }
        var url = '/api/discount/discount_management/?is_hq=0&academic_year_id=' + index1
          + '&center_class_id=' + index2 + '&type=' + index3 + '&student_name=' + this.searchText + '&page=' + this.currentPage;
        _this.$axios.get(url).then(res => {
          _this.loading = false;
          if (res.status == 200 && res.data.status_code == 1) {
            this.tableData = res.data.data.results;
            this.total=res.data.data.count;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*getList(){
          var _this = this;
          /!*this.$axios.get('/api/finance/bill/')
          .then(res=>{
              console.log(res.data.data)
              this.tableData = res.data.data.bill_li
          })*!/
      }*/
    },
    watch: {
      currentPage(){
        this.getList(this.currentPage)
      }
    },
  }
</script>

