<template>
  <div class="chargelist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">收费账单</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <el-form class="mb10" :model="searchform" inline>
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
            <el-select v-model="searchform.class_id" placeholder="请选择" :disabled="class_disable">
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
            <el-input v-model="searchform.search_str" placeholder="输入学号、学生姓名或者学生卡号" class="search_input"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="searchList(1);">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="list-content" style="margin-top:20px">
        <el-table
          :data="countList"
          border
          stripe
          show-header
          style="width: 100%;margin-top: 10px;">
          <el-table-column
            prop="bill_no"
            label="账单号"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editSchool(scope.row)">{{scope.row.bill_no}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="student_name"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="class"
            label="所在班级">
          </el-table-column>
          <el-table-column
            prop="bill_type"
            label="账单类型">
          </el-table-column>
          <el-table-column
            prop="actual_amount"
            label="实际应收">
          </el-table-column>
          <el-table-column
            prop="actual_pay"
            label="实际实收">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="制单人">
          </el-table-column>
          <el-table-column
            prop="billing_date"
            label="制单日期">
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
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="确认账单" name="first">
            <el-table
              :data="countList"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="bill_no"
                label="账单号"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="editSchool(scope.row,1)">{{scope.row.bill_no}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="student_name"
                label="学生姓名"
                width="130">
              </el-table-column>
              <el-table-column
                prop="class"
                label="所在班级"
                width="130">
              </el-table-column>
              <el-table-column
                prop="bill_type"
                label="账单类型"
                width="130">
              </el-table-column>
              <el-table-column
                prop="actual_amount"
                label="实际应收"
                width="130">
              </el-table-column>
              <el-table-column
                prop="actual_pay"
                label="实际实收"
                width="130">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="制单人"
                width="130">
              </el-table-column>
              <el-table-column
                prop="billing_date"
                label="制单日期">
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
          </el-tab-pane>
          <el-tab-pane label="待审核账单" name="second">
            <el-table
              :data="pendingcountList"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="bill_no"
                label="账单号"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="editSchool(scope.row,1)">{{scope.row.bill_no}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="student_name"
                label="学生姓名"
                width="130">
              </el-table-column>
              <el-table-column
                prop="class"
                label="所在班级"
                width="130">
              </el-table-column>
              <el-table-column
                prop="bill_type"
                label="账单类型"
                width="130">
              </el-table-column>
              <el-table-column
                prop="actual_amount"
                label="实际应收"
                width="130">
              </el-table-column>
              <el-table-column
                prop="actual_pay"
                label="实际实收"
                width="130">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="制单人"
                width="130">
              </el-table-column>
              <el-table-column
                prop="billing_date"
                label="制单日期">
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="prev,pager, next, jumper"
              :current-page="searchform.page2"
              :page-size="10"
              @current-change="changePage2"
              :total="count2">
            </el-pagination>
          </el-tab-pane>
        </el-tabs> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        class_disable:'',
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
          size: 10
        },
        count: 1,
        count2: 1,
        billType: [
          {
            id: 0,
            name: "入园账单"
          },
          /*{
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
          }
          {
            id: 6,
            name: "推迟入园账单"
          },,*/
          {
            id: 7,
            name: "提前入园账单"
          },
          /*{
            id: 8,
            name: "否决账单"
          },*/

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
      this.searchList(1)
    },
    methods: {
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
      changePage2(val) {
        /*this.searchList2(val);*/
      },
      getIntercity() {
        var _this = this;
        this.$axios.get('/api/common/intercity/',).then(res => {
          _this.intercityList = res.data.intercity_list;
          // _this.form.intercity_id = res.data.intercity_list[0].id;
        }).catch(err => {
          console.log(err)
        })
      },
      getArea() {
        var _this = this;
        _this.$axios.get('/api/common/select/area_list/',)
          .then(res => {
            _this.areaList = res.data.results;
          }).catch(err => {
          console.log(err)
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
        this.$axios.get('/api/common/select/class_list/', {
          params: {
            center_id: this.searchform.center_id
          }
        })
          .then(res => {
            _this.classList = res.data.results;
            _this.searchList(1);
            /*_this.searchList2(1);*/
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
        this.$axios.post('/api/finance/bill/hq_bill/?page='+this.searchform.page,
        {
            academic_year_id: this.searchform.academic_year_id,
            bill_type_id: this.searchform.bill_type_id,
            search_str: this.searchform.search_str,
            start_date: this.searchform.date_from[0],
            end_date: this.searchform.date_from[1],
            class_id: this.searchform.class_id,
            center_id:this.searchform.center_id,
            size: 10,
        }).then(res => {
          console.log(res.data)
          _this.countList = res.data.bill_li;
          _this.count = res.data.count;
        })
      },
      searchList2(val) {
        var _this = this;
        var class_list = [];
        if (this.searchform.class_id == "") {
          this.classList.forEach(item => {
            class_list.push(item.id)
          })
        } else {
          class_list.push(this.searchform.class_id)
        }

        this.searchform.page2 = val;
        this.$axios.post('/api/finance/bill/hq_bill_pd/',
        {
            academic_year_id: this.searchform.academic_year_id,
            bill_type_id: this.searchform.bill_type_id,
            search_str: this.searchform.search_str,
            start_date: this.searchform.date_from[0],
            end_date: this.searchform.date_from[1],
            class_li: JSON.stringify(class_list),
            page: this.searchform.page2,
            size: 10,
        }).then(res => {
          _this.pendingcountList = res.data.bill_li;
          _this.count2 = res.data.count;
        })
      },
      editSchool: function (param) {
        // console.log(param);
        this.$router.push('/financemanagement/billDetail/'+param.id);
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
            this.class_disable = true;
            this.searchform.class_id = "";
          }else{
            this.class_disable = false;
            this.getClass();
            this.searchform.class_id = "";
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .chargelist {
    color: rgba(160, 160, 160, 1);
    /* text-align: left; */
  }

  .chargelist .bold {
    font-weight: bold;
    color: black;
  }

  .chargelist >>> .select-header, .chargelist .list-content {
    width: 100%;
    /* min-height: 50px; */
    margin-top: 10px;
  }

  .chargelist >>> .el-tabs__item {
    width: 150px;
    text-align: center;
  }

  .chargelist >>> .el-tabs__item.is-active {
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }

  .chargelist >>> .el-table td, .el-table th {
    text-align: center;
  }

  .chargelist >>> .el-tabs__active-bar {
    background-color: #ED6C2E;
    width: 0px !important;
  }

  .chargelist >>> .el-tabs__item:hover {
    color: #ED6C2E;
  }

  .chargelist >>> .el-tabs__item {
    padding: 0 0 !important;
  }

  .chargelist >>> .el-tabs__nav-scroll {
    padding-left: 50%;
  }

  .chargelist >>> #tab-first {
    margin-left: -150px;
  }

  .chargelist .el-tabs__active-bar is-top {
    width: 0px !important;
  }

  .chargelist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }

  .chargelist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    text-align: center !important;
  }
</style>
