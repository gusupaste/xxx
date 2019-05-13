<template>
    <div class="chargelist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">收费账单</span></p>
      </div>
      <div class="content">
        <div class="select-header">
          <el-form v-model="searchform" inline>
            <el-form-item label="城际：" >
                <el-select v-model="searchform.intercity_id" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in intercityList"
                    :key="item.id"
                    :label="item.dept_name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域：" >
                <el-select v-model="searchform.area_id" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="省市：" >
                <el-select v-model="searchform.province_id" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.city_name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌：" >
                <el-select v-model="searchform.hq_id" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="校园：" >
                <el-select v-model="searchform.center_id" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学年：" >
                <el-select v-model="searchform.academic_year_id" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in yearList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级：" >
                <el-select v-model="searchform" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in intercityList"
                    :key="item.id"
                    :label="item.dept_name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账单类型：" >
                <el-select v-model="searchform" placeholder="请选择">
                  <el-option value="" label="所有"></el-option>
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
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="搜索：">
                <el-input v-model="searchform.input" placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchList">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="list-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="确认账单" name="first">
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="账单号"
                  width="150">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editSchool(scope.row,1)">{{scope.row.code}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="学生姓名"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="所在班级"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="账单类型"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="opening_date"
                  label="实际应收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="leader"
                  label="实际实收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="telephone"
                  label="制单人"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="status_name"
                  label="制单日期">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="待审核账单" name="second">
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="账单号"
                  width="150">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editSchool(scope.row,1)">{{scope.row.code}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="学生姓名"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="所在班级"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="账单类型"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="opening_date"
                  label="实际应收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="leader"
                  label="实际实收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="telephone"
                  label="制单人"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="status_name"
                  label="制单日期">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nameSelect:[],
        searchform:{
              intercity_id:'',
              area_id:'',
              province_id:'',
              hq_id:'',
              center_id:'',
              academic_year_id:'',
              date_from:'',
              date_to:'',
              page:1,
              size:10
        },
        options: [],
        billType:[
          {
            id:0,
            name:"入园账单"
          },
          {
            id:1,
            name:"系统备用金结转账单"
          },
          {
            id:2,
            name:"转班补交账单"
          },
          {
            id:3,
            name:"离园账单"
          },
          {
            id:4,
            name:"预备生离园账单"
          },
          {
            id:5,
            name:"终止服务账单"
          },
          {
            id:6,
            name:"推迟入园账单"
          },
          {
            id:7,
            name:"应该是提前入园账单"
          },
          {
            id:8,
            name:"否决账单"
          },
          
        ],
        value1:'',
        value2:'',
        input:'',
        activeName:'first',
        chargeTableDate:[],
        areaList:[],
        yearList:[],
        intercityList:[],
        brandList:[],
        cityList:[],
        schoolList:[],
        searchform:{},
        areaList:[],
      };
    },
    created(){
      this.getArea();
      this.getYear();
      this.getIntercity();
      this.getBrand();
      this.getcity_list();
      this.getSchool();
    },
    methods: {
      handleClose (){

      },
      handleClick (){

      },
      getSchool(){
            var _this = this;
            this.$axios.get('/api/common/select/center_list/',{
                params:{
                    area_id:this.searchform.area_id,
                    hq_id:_this.searchform.hq_id,
                    intercity_id:_this.searchform.intercity_id,
                    province_id:_this.searchform.province_id,
                }
            })
            .then(res=>{
                _this.schoolList = res.data.results;
            });
        },
      getcity_list(){
            var _this = this;
            this.$axios.get('/api/common/select/city_list/',{
              params:{
                area_id:_this.searchform.area_id
              }
            }).then(res=>{
              _this.cityList = res.data.results;
            }).catch(err=>{
            console.log(err)
          })
        },
      getBrand(){
          var _this = this;
          _this.$axios.get('/api/common/select/hq_list/',)
          .then(res=>{
            _this.brandList = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getIntercity(){
          var _this = this;
          this.$axios.get('/api/common/intercity/',).then(res=>{
            console.log(res.data)
            _this.intercityList = res.data.intercity_list;
            // _this.form.intercity_id = res.data.intercity_list[0].id;
          }).catch(err=>{
            console.log(err)
        })
      },
      getArea(){
          var _this = this;
          _this.$axios.get('/api/common/select/area_list/',)
          .then(res=>{
            _this.areaList = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                console.log(res.data)
                _this.yearList = res.data.results;
                _this.yearList.forEach(item => {
                    if(item.is_selected === 1){
                        _this.academic_year_id = item.id;
                    }
                });
            })
        },
      searchList: function() {

      },
      editSchool:function (param,index) {
          this.$router.push('/financemanagement/billDetail');
      }
    }
  }
</script>

<style scoped>
  .chargelist{
    color: rgba(160, 160, 160, 1);
    /* text-align: left; */
  }
  .chargelist .bold{
    font-weight: bold;
    color: black;
  }
  .chargelist >>> .select-header,.chargelist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .chargelist >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .chargelist >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .chargelist >>> .el-table td, .el-table th{
    text-align: center;
  }
  .chargelist >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .chargelist >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .chargelist >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .chargelist >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .chargelist >>> #tab-first{
    margin-left: -150px;
  }
  .chargelist .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .chargelist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
  .chargelist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
</style>
