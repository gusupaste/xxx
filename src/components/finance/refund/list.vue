<template>
  <div class="refundlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">退费账单</span></p>
    </div>
    <div class="content">
      <el-form inline :model="searchform" class="mt10 mb10">
        <el-form-item label="城际：">
            <el-select v-model="searchform.intercity_id" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in intercityList"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="区域：">
            <el-select v-model="searchform.area_id" placeholder="请选择">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省市：">
            <el-select v-model="searchform.province_id" placeholder="请选择">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in cityList"
                :key="item.city_id"
                :label="item.city_name"
                :value="item.city_id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="品牌：">
            <el-select v-model="searchform.hq_id" placeholder="请选择">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校园：">
            <el-select v-model="searchform.center_id" placeholder="请选择">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学年：">
            <el-select v-model="searchform.academic_year_id" placeholder="请选择">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in yearList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班级：">
            <el-select v-model="searchform.class_id" placeholder="请选择" v-bind:disabled="selectDisable">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账单类型：">
            <el-select v-model="searchform.bill_type_id" placeholder="请选择">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in billType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="起止日期：">
            <el-date-picker
              v-model="searchform.date_from"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="搜索：">
            <el-input v-model="searchform.search_str" placeholder="输入学号、学生姓名" class="search_input"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="searchList(1);">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="list-content mt20">
        <el-tabs v-model="status" @tab-click="handleClick">
          <el-tab-pane label="已批准" name="1"></el-tab-pane>
          <el-tab-pane label="待审批" name="2"></el-tab-pane>
          <el-tab-pane label="已拒绝" name="3"></el-tab-pane>
        </el-tabs>
        <el-table
          :data="countList"
          border
          stripe
          show-header
          style="width: 100%;margin-top: 10px;">
          <el-table-column
              label="账单号">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showRefundInfo(scope.row)">{{scope.row.bill_no}}</el-button>
              </template>
          </el-table-column>
          <!-- <el-table-column
            prop="bill_no"
            label="账单号"
            width="150">
          </el-table-column> -->
          <el-table-column
            prop="billing_date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="bill_type_str"
            label="账单类型">
          </el-table-column>
          <el-table-column
            prop="student_name"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="student_no"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="klass"
            label="所在班级">
          </el-table-column>
          <el-table-column
            prop="refund_amount"
            label="实退金额">
          </el-table-column>
          <el-table-column
            prop="creator_name"
            label="制单人">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <router-link target="_blank" :to="{name:'refund-detail-print',params:{id:scope.row.id}}">
                <span class="fa fa-print" style="font-size: 20px;color: #ED6C2E;"></span>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev,pager, next, jumper"
          :current-page="searchform.page"
          :page-size="10"
          @current-change="changePage"
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
        selectDisable:'',
        searchform: {
          intercity_id: '',
          area_id: '',
          province_id: '',
          hq_id: '',
          center_id: '',
          academic_year_id: '',
          date_from: '',
          date_to: '',
          class_id: '',
          bill_type_id: '',
          search_str: '',
          page: 1,
          size: 10,
          status: '已批准'
        },
        status: '1',
        count: 1,
        count2: 1,
        billType: [
          {
            id: 0,
            name: "入园账单"
          },
          {
            id: 1,
            name: "系统备用金结转账单"
          },
          {
            id: 2,
            name: "转班补交账单"
          },
          {
            id: 3,
            name: "离园账单"
          },
          {
            id: 4,
            name: "预备生离园账单"
          },
          {
            id: 5,
            name: "终止服务账单"
          },
          {
            id: 6,
            name: "推迟入园账单"
          },
          {
            id: 7,
            name: "应该是提前入园账单"
          },
          {
            id: 8,
            name: "否决账单"
          },

        ],
        activeName: 'first',
        chargeTableDate: [],
        areaList: [],
        yearList: [],
        intercityList: [],
        brandList: [],
        cityList: [],
        schoolList: [],
        classList: [],
        countList: [],
        pendingcountList: [],
      };
    },
    created() {
      this.getArea();
      this.getYear();
      this.getIntercity();
      this.getBrand();
      this.getcity_list();
      this.getSchool();
      this.searchList(1);
    },
    methods: {
      showRefundInfo(param) {
        this.$router.push('/financemanagement/refund-detail/'+param.id);
      },
      handleClose() {

      },
      handleClick(tab, event) {
        this.searchform.status = tab.label;
        this.searchList(1);
      },
      getSchool() {
        var _this = this;
        this.$axios.get('/api/common/select/center_list/', {
          params: {
            area_id: _this.searchform.area_id,
            hq_id: _this.searchform.hq_id,
            intercity_id: _this.searchform.intercity_id,
            province_id: _this.searchform.province_id,
          }
        })
          .then(res => {
            _this.schoolList = res.data.results;
            if(this.searchform.center_id !== ''){
              _this.getClass();
            }
          });
      },
      getcity_list() {
        var _this = this;
        this.$axios.get('/api/common/select/city_list/', {
          params: {
            area_id: _this.searchform.area_id
          }
        }).then(res => {
          _this.cityList = res.data.results;
        }).catch(err => {
        })
      },
      getBrand() {
        var _this = this;
        _this.$axios.get('/api/common/select/hq_list/',)
          .then(res => {
            _this.brandList = res.data.results;
          }).catch(err => {
        })
      },
      changePage(val) {
        this.searchList(val);
      },
      getIntercity() {
        var _this = this;
        this.$axios.get('/api/common/intercity/',).then(res => {
          _this.intercityList = res.data.intercity_list;
          // _this.form.intercity_id = res.data.intercity_list[0].id;
        }).catch(err => {
        })
      },
      getArea() {
        var _this = this;
        _this.$axios.get('/api/common/select/area_list/',)
          .then(res => {
            _this.areaList = res.data.results;
          }).catch(err => {
        })
      },
      getYear() {
        var _this = this;
        this.$axios.get('/api/common/select/academic_year_list/')
          .then(res => {
            _this.yearList = res.data.results;
            _this.yearList.forEach(item => {
              if (item.is_selected === 1) {
                _this.academic_year_id = item.id;
              }
            });
          })
      },
      getClass() {
        var _this = this;
        var class_list = [];
        /*this.schoolList.forEach(item => {
          class_list.push(item.id)
        })*/

        this.$axios.get('/api/common/select/class_list/', {
          params: {
            center_id: this.searchform.center_id
          }
        })
          .then(res => {
            _this.classList = res.data.results;
          })
      },
      searchList(val) {
        var _this = this;
        var class_list = [];
        if (this.searchform.class_id == "") {
          this.classList.forEach(item => {
            class_list.push(item.id)
          })
        } else {
          class_list.push(this.searchform.class_id)
        }
        this.searchform.page = val;
        this.$axios.get('/api/finance/refund/', {
          params:{
            academic_year_id: this.searchform.academic_year_id,
            class_id: this.searchform.class_id,
            search_str: this.searchform.search_str,
            status: this.searchform.status,
            bill_type: this.searchform.bill_type_id,
            date_from: this.searchform.date_from[0],
            date_to: this.searchform.date_from[1],
            center_id:this.searchform.center_id,
            center_name:'',
            intercity_id:this.searchform.intercity_id,
            hq_id:this.searchform.hq_id,
            province_id:this.searchform.province_id,
            area_id:this.searchform.area_id,
            page: this.searchform.page,
            size: 10,
          }
        }).then(res => {
          _this.countList = res.data.results;
          _this.count = res.data.count;
        })
      },
      editSchool(param, index) {
        this.$router.push('/financemanagement/billDetail');
      }
    },
    watch: {
      'searchform.area_id'() {
        this.getcity_list();
        this.searchform.center_id = "";
        this.searchform.province_id = "";
      },
      'searchform.intercity_id'() {
        this.getSchool();
        this.searchform.center_id = "";
      },
      'searchform.hq_id'() {
        this.getSchool();
        this.searchform.center_id = "";
      },
      'searchform.area_id'() {
        this.getcity_list();
        this.getSchool();
        this.searchform.province_id = "";
        this.searchform.center_id = "";
      },
      'searchform.province_id'() {
        this.getSchool();
        this.searchform.center_id = "";
      },
      'searchform.center_id': {
        handler(newValue, oldValue) {
          if(newValue === ''){
            this.selectDisable = true;
            this.searchform.class_id = "";
          }else{
            this.selectDisable = false;
            this.getClass();
            this.searchform.class_id = "";
          }
        },
        deep: true
      },
    }
  }
</script>

<style scoped>
  .refundlist {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .refundlist .bold {
    font-weight: bold;
    color: black;
  }

  .refundlist .select-header, .refundlist .list-content {
    width: 100%;
    min-height: 50px;
  }

  .refundlist >>> .el-tabs__item {
    width: 150px;
    text-align: center;
  }

  .refundlist >>> .el-tabs__item.is-active {
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }

  .refundlist >>> .el-table td, .el-table th {
    text-align: center;
  }

  .refundlist >>> .el-tabs__active-bar {
    background-color: #ED6C2E;
    width: 0px !important;
  }

  .refundlist >>> .el-tabs__item:hover {
    color: #ED6C2E;
  }

  .refundlist >>> .el-tabs__item {
    padding: 0 0 !important;
  }

  .refundlist >>> .el-tabs__nav-scroll {
    padding-left: 33%;
  }

  .refundlist >>> #tab-first {
    margin-left: -150px;
  }

  .refundlist .el-tabs__active-bar is-top {
    width: 0px !important;
  }

  .refundlist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }

  .refundlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    text-align: center !important;
  }
</style>
