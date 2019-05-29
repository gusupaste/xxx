<template>
  <div class="studentFile wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">学生档案</span></p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="预备生" name="first">
          <preparatory :intercity_list="intercity_list"
                       :total="total"
                       :area_list="area_list"
                       :city_list="city_list"
                       :brand_list="brand_list"
                       :school_list="school_list"
                       :class_list="class_list"
                       :student_list="student_list"
                       :activeTabs="activeName"
                       @getCityList="getCityList"
                       @getSchoolList="getSchoolList"
                       @getClassList="getClassList"
                       @getStudentList="getStudentList"></preparatory>
      </el-tab-pane>
      <el-tab-pane label="在校生" name="second">
        <in-school :intercity_list="intercity_list"
                   :area_list="area_list"
                   :city_list="city_list"
                   :total="total"
                   :brand_list="brand_list"
                   :school_list="school_list"
                   :class_list="class_list"
                   :student_list="student_list"
                   :activeTabs="activeName"
                   @getCityList="getCityList"
                   @getSchoolList="getSchoolList"
                   @getClassList="getClassList"
                   @getStudentList="getStudentList"></in-school>
      </el-tab-pane>
      <el-tab-pane label="毕业生" name="third">
        <graduate :intercity_list="intercity_list"
                  :area_list="area_list"
                  :city_list="city_list"
                  :brand_list="brand_list"
                  :school_list="school_list"
                  :class_list="class_list"
                  :total="total"
                  :student_list="student_list"
                  :year_list="year_list"
                  :activeTabs="activeName"
                  @getCityList="getCityList"
                  @getSchoolList="getSchoolList"
                  @getClassList="getClassList"
                  @getStudentList="getStudentList"></graduate>
      </el-tab-pane>
      <el-tab-pane label="中途离园生" name="fourth">
        <leave :intercity_list="intercity_list"
               :area_list="area_list"
               :city_list="city_list"
               :brand_list="brand_list"
               :school_list="school_list"
               :class_list="class_list"
               :total="total"
               :student_list="student_list"
               :year_list="year_list"
               :activeTabs="activeName"
               @getCityList="getCityList"
               @getSchoolList="getSchoolList"
               @getClassList="getClassList"
               @getStudentList="getStudentList"></leave>
      </el-tab-pane>
      <el-tab-pane label="毕业班学生" name="fifth">
        <graduating-class :intercity_list="intercity_list"
                          :area_list="area_list"
                          :city_list="city_list"
                          :brand_list="brand_list"
                          :school_list="school_list"
                          :class_list="class_list"
                          :total="total"
                          :student_list="student_list"
                          :activeTabs="activeName"
                          @getCityList="getCityList"
                          @getSchoolList="getSchoolList"
                          @getClassList="getClassList"
                          @getPage="getPage"
                          @getStudentList="getStudentList"></graduating-class>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
  .studentFile >>> .el-tabs__active-bar {
        background-color:#f17128 !important;
        height: 3px;
  }
  .studentFile >>> .el-tabs__item {
      height: 40px;
      width: 200px;
      text-align: center;
  }
  .studentFile >>> .el-tabs__nav {
      float: none;
      width: 80%;
      margin: 0 auto;

  }
  .studentFile >>> .el-input{
    width: auto;
  }
  .studentFile >>> .el-tabs__header {
      border-bottom: 2px solid #ccc;
  }

  .studentFile >>> .el-tab-pane {
      border: none;
  }
</style>
<script>
import Leave from './studentTypeList/leave';
import Graduate from './studentTypeList/graduate';
import GraduatingClass from './studentTypeList/graduating_class';
import Preparatory from './studentTypeList/preparatory';
import InSchool from './studentTypeList/inschool';
export default {
  data(){
    return {
      activeName: 'first',
      int_url:'/api/common/select/intercity_list/',/*城际*/
      area_url:'/api/common/select/area_list/',/*区域*/
      city_url:'/api/common/select/city_list/',/*省市*/
      brand_url:'/api/common/select/hq_list/',/*品牌*/
      school_url:'/api/common/select/center_list/',/*校园*/
      klass_url:'/api/common/select/class_list/?center_id=',/*班级*/
      year_url:'/api/common/select/academic_year_list/',/*班级*/
      student_url:'/api/student/student/student_list/',/*学生*/
      intercity_list:[],
      area_list:[],
      city_list:[],
      brand_list:[],
      school_list:[],
      class_list:[],
      year_list:[],
      student_list:[],
      total:0,
      page:1
    }
  },
  components:{
    Graduate,
    Leave,
    GraduatingClass,
    InSchool,
    Preparatory
  },
  mounted:function(){
    this.getIntercityList();
    this.getAreaList();
    this.getCityList(0);
    this.getBrandList();
    this.getSchoolList('','','','');
    this.getYearList();
  },
  methods:{
    handleClick(tab, event) {
      // console.log(tab, event);
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
    getCityList:function (code) {
      var _this = this;
      var url = '';
      if(code !== 0){
        url = this.city_url + '?area_id=' + code;
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
    /*intercity_id 城际，province_id 省份，area_code 区域code,hq_id 品牌*/
    getSchoolList:function (intercity_id,province_id,area_id,hq_id) {
      var _this = this;
      var url = this.school_url + '?intercity_id=' + intercity_id + '&province_id=' + province_id + '&area_id=' + area_id + '&hq_id=' + hq_id;
      _this.$axios.get(url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.school_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*班级*/
    getClassList:function (school) {
      var _this = this;
      var url = this.klass_url + school;
      _this.$axios.get(url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.class_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*学年*/
    getYearList:function () {
      var _this = this;
      var url = this.year_url;
      _this.$axios.get(url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.year_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getPage(val){
      console.log(val)
    },
    /*获取学生*/
    getStudentList:function (data) {
      var _this = this;
      var url = this.student_url;
      var obj = {};
      if(data.intercity_id !== ''){
        obj.intercity_id = data.intercity_id;
      }
      if(data.province_id !== ''){
        obj.province_id = data.province_id;
      }
      if(data.area_id !== ''){
        obj.area_id = data.area_id
      }
      if(data.hq_id !== ''){
        obj.hq_id = data.hq_id
      }
      if(data.center_id !== ''){
        obj.center_id = data.center_id
      }
      if(data.class_id !== ''){
        obj.class_id = data.class_id
      }
      if(data.date_from !== ''){
        obj.date_from = data.date_from;
      }
      if(data.date_to !== ''){
        obj.date_to = data.date_to;
      }
      if(data.gender !== ''){
        obj.gender = data.gender
      }
      if(data.condition !== ''){
        obj.condition = data.condition
      }
      obj.student_type = data.student_type;
      obj.page = data.page
      _this.$axios.get(url,{
        params:obj
          /*{
          student_type:data.student_type,
          center_ids:data.center_ids,
          class_id:data.class_id,
          date_from:data.date_from,
          date_to:data.date_to,
          gender:data.gender,
          condition:data.condition,
          page:data.page
        }*/
      }).then(res=>{
        if(res.status == 200 && res.data.status == 1) {
          this.student_list = res.data.results.results;
          this.total = res.data.results.count;
        }
      }).catch(err=>{
        console.log(err)
      })
      /*_this.$axios.post(url,data).then(res=>{
        if(res.status == 200 && res.data.status == 1) {
          this.student_list = res.data.results.results;
        }
      }).catch(err=>{
        console.log(err)
      })*/
    },
  },
}
</script>
