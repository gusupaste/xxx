<template>
    <div class="settinglist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">退费管理</span></p>
      </div>
      <div class="content" style="margin-top: 15px">
        <div class="select-header">
          <span>学年：</span>
          <el-select v-model="searchForm.academic_year_id" placeholder="请选择" >
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in academic_year_li" :value="item.id" :key="item.id" :label="item.year"></el-option>
          </el-select>
          <span style="margin-left: 10px">班级：</span>
          <el-select v-model="searchForm.class_id" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
              <el-option v-for="item in class_li" :value="item.id" :key="item.id" :label="item.class_name"></el-option>
          </el-select>
          <span style="margin-left: 10px">账单状态：</span>
          <el-select v-model="searchForm.bill_status" placeholder="请选择" >
              <el-option label="全部" value=""></el-option>
              <el-option label="待审批" value="待审批"></el-option>
              <el-option label="已批准" value="已批准"></el-option>
              <el-option label="已拒绝" value="已拒绝"></el-option>
          </el-select>
          <span style="margin-left: 20px">搜索：</span>
          <el-input v-model="searchForm.search_name" placeholder="输入学号、学生姓名" style="width: auto"></el-input>
          <span><el-button type="primary" @click="searchList(1)">搜索</el-button></span>
          <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
              <i class="icon-font fa fa-calendar-plus-o"></i>
              <span class="font-cl-blue font-size-14" >毕业/离园退费账单</span>
          </span>
          <span class="right" style="cursor:pointer" @click="addNewDiscount(1)">
              <i class="icon-font fa fa-calendar-plus-o"></i>
              <span class="font-cl-blue font-size-14" >预备生退费账单</span>
          </span>
        </div>
        <div class="list-content">
          <el-table
            :data="chargeTableDate"
            border
            stripe
            show-header
            style="width: 100%;">
            <el-table-column
            width="200"
              label="账单号">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showRefundInfo(scope.row)">{{scope.row.bill_no}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="bill_type_str"
              label="账单类型">
            </el-table-column>
            <el-table-column
              prop="student_no"
              label="学号">
            </el-table-column>
            <el-table-column
              prop="student_name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="klass"
              label="所在班级">
            </el-table-column>
            <el-table-column
              prop="refund_amount"
              label="退费金额（不包含备用金）">
            </el-table-column>
            <el-table-column
              prop="billing_date"
              label="创建日期">
            </el-table-column>
            <el-table-column
              prop="creator_name"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="status_str"
              label="账单状态">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="操作">
              <template slot-scope="scope">
                <router-link v-if="scope.row.bill_type_str != '系统备用金结转账单'" target="_blank" :to="{name:'refund-detail-print',params:{id:scope.row.id}}">
                  <span class="fa fa-print green" style="font-size: 20px;"></span>
                </router-link>
                <!-- <router-link v-if="scope.row.bill_type_str == '系统备用金结转账单'" target="_blank" :to="{name:'refund-detail-print',params:{id:scope.row.id}}">
                  <span class="fa fa-print green" style="font-size: 20px;"></span>
                </router-link> -->
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
        class_li:[],
        count:0,
        searchForm:{
          academic_year_id:'',
          class_id:'',
          bill_status:'',
          search_name:'',
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
      showRefundInfo(param) {
        if(param.bill_type_str == '系统备用金结转账单'){
          this.$router.push('/financemanagement/refund-detail/'+param.id);
        } else {
          this.$router.push('/financemanagement/refund-detail/'+param.id);
        }
        
      },
      handleCurrentChange(val){
        this.searchList(val)
      },
      searchInfo(){
            this.$axios.get('/api/finance/bill/search_info/',{
                params:{
                    center_id:this.searchForm.center_id
                }
            })
            .then(res=>{
              console.log(res.data)
                this.academic_year_li = res.data.data.academic_year_li;
                this.class_li = res.data.data.class_li;
            })
      },
      searchList(id){
        this.searchForm.page = id;
        this.$axios.get('/api/finance/refund/', {
          params:{
            academic_year_id: this.searchForm.academic_year_id,
            class_id: this.searchForm.class_id,
            search_str: this.searchForm.search_name,
            status: this.searchForm.bill_status,
            page: this.searchForm.page,
            size: 10,
          }
        })
        .then(res=>{
          this.chargeTableDate = res.data.results;
          this.count = res.data.count;
        })
      },
      addNewDiscount(val){;
        val == 1 ? this.$router.push('/financemanagement/preparatory-student') : this.$router.push('/financemanagement/leave-student')
      }
    },
  }
</script>

<style scoped>
  .settinglist{
    text-align: left;
  }
  .settinglist .select-header{
    line-height: 50px;
  }
  .settinglist .select-header,.settinglist .list-content{
    width: 100%;
    min-height: 50px;
  }
  .settinglist .select-header >>> .el-select{
    width: 10%;
  }
  .settinglist .select-header >>> .el-input__inner{
    width: inherit;
  }
</style>
