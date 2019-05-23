<template>
  <div class="discountlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">学生折扣</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <span>城际：</span>
        <el-select v-model="intercity" @change="allChangeFun">
          <el-option value="" label="全部" aria-selected="true"></el-option>
          <el-option
            v-for="item in intercity_list"
            :key="item.id"
            :label="item.dept_name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">区域：</span>
        <el-select v-model="area" @change="areaChangeFun">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in area_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">省市：</span>
        <el-select v-model="city" @change="allChangeFun">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in city_list"
            :key="item.id"
            :label="item.city_name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">品牌：</span>
        <el-select v-model="brand" @change="allChangeFun">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in brand_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">校园：</span>
        <el-select v-model="school">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in school_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">折扣类型：</span>
        <el-select v-model="dis_type" placeholder="请选择">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in type_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
      </div>
      <div class="list-content">
        <el-tabs v-model="activeName" @tab-click="tabClick(activeName)">
          <el-tab-pane label="审核通过" name="first">
            <!--<el-table
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
                prop="form_status"
                label="折扣类型">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="正价">
              </el-table-column>
              <el-table-column
                label="折扣">
                <template slot-scope="scope">
                  {{ scope.row.amount - scope.row.actual_amount }}
                </template>
              </el-table-column>
              <el-table-column
                prop="actual_amount"
                label="优惠金额合计">
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
            </el-table>-->
          </el-tab-pane>
          <el-tab-pane label="审核中" name="second">
            <!--<el-table
              :data="tableData1"
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
                prop="form_status"
                label="折扣类型">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="正价">
              </el-table-column>
              <el-table-column
                label="折扣">
                <template slot-scope="scope">
                  {{ scope.row.amount - scope.row.actual_amount }}
                </template>
              </el-table-column>
              <el-table-column
                prop="actual_amount"
                label="优惠金额合计">
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
            </el-table>-->
          </el-tab-pane>
          <el-tab-pane label="被驳回" name="third">
            <!--<el-table
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
                prop="form_status"
                label="折扣类型">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="正价">
              </el-table-column>
              <el-table-column
                label="折扣">
                <template slot-scope="scope">
                  {{ scope.row.amount - scope.row.actual_amount }}
                </template>
              </el-table-column>
              <el-table-column
                prop="actual_amount"
                label="优惠金额合计">
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
            </el-table>-->
          </el-tab-pane>
        </el-tabs>
        <el-table
          :data="tableData1"
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
            prop="form_status"
            label="折扣类型">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="正价">
          </el-table-column>
          <el-table-column
            label="折扣">
            <template slot-scope="scope">
              {{ scope.row.amount - scope.row.actual_amount }}
            </template>
          </el-table-column>
          <el-table-column
            prop="actual_amount"
            label="优惠金额合计">
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        int_url:'/api/common/select/intercity_list/',/*城际*/
        area_url:'/api/common/select/area_list/',/*区域*/
        school_url:'/api/common/select/center_list/',/*校园*/
        city_url:'/api/common/select/city_list/',/*省市*/
        brand_url:'/api/common/select/hq_list/',/*品牌*/
        dis_type_url:'/api/discount/discount_type_management/get_exist_discount_type/?type=0',
        getList_url:'/api/discount/discount_management/?is_hq=1&discount_type=',
        intercity_list:[],
        area_list:[],
        school_list:[],
        type_list:[],
        city_list:[],
        brand_list:[],
        city:'',
        brand:'',
        dis_type:'',
        school:'',
        intercity:'',
        area:'',
        nameSelect:[],
        activeName:'first',
        activeIndex:'1',
        tableData1:[],
      };
    },
    mounted:function(){
      this.getIntercityList();
      this.getAreaList();
      this.getSchoolList('','');
      this.getTypeList();
      this.getCityList();
      this.getBrandList();
      this.getStudentInfo(1);
    },
    methods: {
      routerPush:function (obj) {
        var status = 0;
        if(this.activeName === 'second'){
          status = 0;
        }else if(this.activeName === 'first'){
          status = 1;
        }else{
          status = 2;
        }
        this.$router.push('/financemanagement/dismissed/'+obj.form_id+'/'+status);
      },
      tabClick:function (name) {
        if(name === 'first'){
          this.getStudentInfo(1);
        }else if(name === 'second'){
          this.getStudentInfo(0);
        }else{
          this.getStudentInfo(2);
        }
      },
      areaChangeFun:function () {
        this.getCityList();
        this.getSchoolList();
      },
      /*intercity_id 城际，province_id 省份，area_code 区域code,hq_id 品牌*/
      allChangeFun:function () {
        this.getSchoolList;
      },
      /*城际*/
      getIntercityList:function () {
        var _this = this;
        _this.$axios.get(this.int_url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.intercity_list = res.data.results;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /*区域*/
      getAreaList:function () {
        var _this = this;
        _this.$axios.get(this.area_url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.area_list = res.data.results;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /*省市*/
      getCityList:function () {
        var _this = this;
        var url = '';
        if(this.area !== 0){
          url = this.city_url + '?area_id=' + this.area;
        }else{
          url = this.city_url;
        }
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.city_list = [];
            this.city_list = res.data.results;
            this.city = '';
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /*品牌*/
      getBrandList:function () {
        var _this = this;
        _this.$axios.get(this.brand_url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.brand_list = res.data.results;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /*校园*/
      getSchoolList:function () {
        var _this = this;
        var url = this.school_url + '?intercity_id=' + this.intercity + '&area_id=' + this.area;
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.school_list = res.data.results;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /*状态*/
      getTypeList:function () {
        var _this = this;
        _this.$axios.get(this.dis_type_url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.type_list = res.data.data;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getStudentInfo:function (type) {
        var _this = this;
        var d_type = -1;
        if(this.dis_type !== ''){
          d_type = this.dis_type;
        }
        var url = this.getList_url+ d_type +'&type='+type+'&center_id='+this.school+
          '&province_id='+this.city+'&area_id='+this.area+'&intercity_id='+this.intercity+'&hq_id='+this.brand;
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.tableData1 = res.data.data.results;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      handleClose (){

      },
      handleSelect(){

      },
      searchList: function() {

      }
    }
  }
</script>

<style scoped>
  .discountlist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .discountlist .bold{
    font-weight: bold;
    color: black;
  }
  .discountlist .select-header,.refundlist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .discountlist .el-select{
    width: 10%;
  }
  .discountlist >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .discountlist >>> .el-tabs__item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .discountlist >>> .new-calendar-modal .el-table td, .el-table th.is-leaf{
    border-bottom: none !important;
  }
  .discountlist >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .discountlist >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .discountlist >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .discountlist >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .discountlist >>> #tab-first{
    margin-left: -200px;
  }
  .discountlist >>> .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .discountlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  .discountlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
</style>
