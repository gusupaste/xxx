<template>
  <div class="reservefund wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">备用金管理</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <template v-if="permission['finance']['reserve-fund-management-hq']">
          <span>城际：</span>
          <el-select v-model="intercity_id">
            <el-option value="" label="全部" aria-selected="true"></el-option>
            <el-option
              v-for="item in intercity_list"
              :key="item.id"
              :label="item.dept_name"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="padding-left-30">区域：</span>
          <el-select v-model="area_id">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in area_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="padding-left-30">省市：</span>
          <el-select v-model="city_id">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in city_list"
              :key="item.city_id"
              :label="item.city_name"
              :value="item.city_id">
            </el-option>
          </el-select>
          <span class="padding-left-30">品牌：</span>
          <el-select v-model="brand_id">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in brand_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="padding-left-30">校园：</span>
          <el-select v-model="school_id">
            <el-option value="" label="全部"></el-option>
            <el-option
              v-for="item in school_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span class="padding-left-30">班级：</span>
          <el-select v-model="class_year_id" placeholder="请选择" :disabled="selectDisable">
            <el-option value="" label="全部" aria-selected="true"></el-option>
            <el-option
              v-for="item in class_year_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <p class="mt10">
          <span>学年：</span>
          <el-select v-model="academic_year_id" placeholder="请选择">
            <el-option
              v-for="item in year_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <template v-if="permission['finance']['reserve-fund-management-campus']">
            <span class="padding-left-30">班级：</span>
            <el-select v-model="class_year_id" placeholder="请选择">
              <el-option value="" label="全部" aria-selected="true"></el-option>
              <el-option
                v-for="item in class_year_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          <span class="padding-left-30">学生姓名：</span>
          <el-input v-model="search_name" placeholder="请输入学生姓名" class="search_input"></el-input>
          <span class="padding-left-30"><el-button type="primary" @click="getList(1)">搜索</el-button></span>
          <template v-if="permission['finance']['reserve-fund-management-campus']">
            <!--<span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/create-reservefund')">
              <i class="icon-font fa fa-calendar-plus-o"></i>
              <span class="font-cl-blue font-size-14">推迟入园转备用金</span>
          </span>-->
            <span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/create-reserve/0')">
            <i class="icon-font fa fa-calendar-plus-o"></i>
            <span class="font-cl-blue font-size-14">缺勤请假转备用金</span>
        </span>
          </template>
        </p>
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
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        permission: this.$cookies.get('userInfo').user_permissions,
        year_list: [],
        class_year_list: [],
        tableDate: [],
        intercity_list: [],
        area_list: [],
        city_list: [],
        brand_list: [],
        school_list: [],
        academic_year_id: '',
        class_year_id: '',
        search_name: '',
        intercity_id: '',
        area_id: '',
        city_id: '',
        brand_id: '',
        school_id: '',
        selectDisable: true,
        center_id: this.$cookies.get('userInfo').center['id'],
        pagesize: 10,
        currentPage: 1,
        total: 1,
      }
    },
    mounted: function () {
      this.getYearList()
      if (this.center_id === undefined) {
        this.getIntercityList()
        this.getAreaList()
        this.getCityList(0)
        this.getBrandList()
        this.getSchoolList('', '', '', '')
      } else {
        this.getYearClassList(this.center_id)
      }
    },
    watch: {
      // currentPage() {
      //   this.getList(this.currentPage)
      // },
      intercity_id() {
        this.school_id = ''
        this.getSchoolList(this.intercity_id, this.city_id, this.area_id, this.brand_id)
      },
      area_id() {
        this.school_id = ''
        this.getCityList(this.area)
        this.getSchoolList(this.intercity_id, this.city_id, this.area_id, this.brand_id)
      },
      city_id() {
        this.school_id = ''
        this.getSchoolList(this.intercity_id, this.city_id, this.area_id, this.brand_id)
      },
      brand_id() {
        this.school_id = ''
        this.getSchoolList(this.intercity_id, this.city_id, this.area_id, this.brand_id)
      },
      school_id: {
        handler(newValue, oldValue) {
          if (newValue === '') {
            this.class_year_id = ''
            this.selectDisable = true;
          } else {
            this.selectDisable = false;
            this.class_year_id = ''
            this.getYearClassList(this.school_id)
          }
        }
      },
      academic_year_id() {
        this.getList(1)
      },
      class_year_id() {
        this.getList(1)
      }
    },
    methods: {
      /*城际*/
      getIntercityList: function () {
        this.$axios.get('/api/common/select/intercity_list/')
          .then(res => {
            this.intercity_list = res.data.results;
          }).catch(err => {
          console.log(err)
        })
      },
      /*区域*/
      getAreaList: function () {
        this.$axios.get('/api/common/select/area_list/')
          .then(res => {
            this.area_list = res.data.results
          }).catch(err => {
          console.log(err)
        })
      },
      /*省市*/
      getCityList: function (code) {
        var url = '/api/common/select/city_list/'
        if (code !== 0) {
          url = '/api/common/select/city_list/' + '?area_id=' + code
        }
        this.$axios.get(url).then(res => {
          this.city_list = []
          this.city_list = res.data.results
          this.city = ''
        }).catch(err => {
          console.log(err)
        })
      },
      /*品牌*/
      getBrandList: function () {
        this.$axios.get('/api/common/select/hq_list/').then(res => {
          this.brand_list = res.data.results;
        }).catch(err => {
          console.log(err)
        })
      },
      /*校园*/
      /*intercity_id 城际，province_id 省份，area_code 区域code,hq_id 品牌*/
      getSchoolList: function (intercity_id, province_id, area_id, hq_id) {
        var url = '/api/common/select/center_list/' + '?intercity_id=' + intercity_id + '&province_id=' + province_id + '&area_id=' + area_id + '&hq_id=' + hq_id;
        this.$axios.get(url).then(res => {
          this.school_list = res.data.results
        }).catch(err => {
          console.log(err)
        })
      },
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
          }).catch(err => {
          console.log(err)
        })
      },
      /*学年下的班级*/
      getYearClassList: function (school) {
        this.$axios.get('/api/common/select/class_list/?center_id=' + school)
          .then(res => {
            this.class_year_list = res.data.results
            this.getList(1)
          }).catch(err => {
          console.log(err)
        })
      },
      getList: function (val) {
        this.currentPage = val
        this.$axios.get('/api/finance/reserved_fund/', {
          params:{
            center_id: this.school_id,
            center_name: '',
            intercity_id: this.intercity_id,
            hq_id: this.brand_id,
            province_id: this.city_id,
            academic_year_id: this.academic_year_id,
            class_id: this.class_year_id,
            search_str: this.search_name,
            page: this.currentPage,
            size: this.pagesize

          }
        })
          .then(res => {
            this.tableDate = res.data.results
            this.total = res.data.count
          }).catch(err => {

        })
      },
      editSchool: function (param, index) {
        if (index === 0) {
          this.$router.push('/financemanagement/pendingApprovalRecord');
        } else {
          this.$router.push('/financemanagement/usageRecord');
        }
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.getList(currentPage)
      },
    }
  }
</script>

<style scoped>
  .reservefund {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .reservefund .bold {
    font-weight: bold;
    color: black;
  }

  .reservefund .select-header, .reservefund .list-content {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .reservefund .el-select {
    width: 10%;
  }

  .reservefund >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    text-align: center !important;
  }

  .reservefund >>> .el-input__inner {
    width: -webkit-fill-available;
    height: 32px !important;
  }
</style>
