<template>
  <div class="studentFile">
      <div class="formwrap">
        <el-form ref="form" :model="form" label-width="100px" inline>
          <el-form-item label="城际：">
            <el-select v-model="intercity" @change="allChangeFun">
              <el-option value="" label="全部" aria-selected="true"></el-option>
              <el-option
                v-for="item in intercity_list"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select v-model="area" @change="areaChangeFun">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in area_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省市：">
            <el-select v-model="city" @change="allChangeFun">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in city_list"
                :key="item.id"
                :label="item.city_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-select v-model="brand" @change="allChangeFun">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in brand_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="校园：">
            <el-select v-model="school" @change="schoolChangeFun">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in school_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级：">
            <el-select v-model="class_val" v-bind:disabled="selectDisable">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in class_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生性别：">
            <el-select v-model="gender" placeholder="请选择活动区域">
              <el-option value="" label="全部"></el-option>
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学日期：">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getStudentList">搜索</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div class="studentFileList">
          <div class="studentFileCard left" v-for="(item,index) in student_list " :key="index" @click="$router.push('/studentFile/studentFileDetail/9')">
            <div style="padding:30px 20px">
              <div class="avatar inline-block">
                <img src="../../../assets/img/logo.png" alt="">
              </div>
              <div class="card-content inline-block">
                  <p>
                    <span style="font-size:15px;font-weight:600">{{ item.name }}</span>
                    <i style="font-size:15px;color:#ff7f7f" class="fa fa-times-circle"></i>
                  </p>
                  <p>学号：{{ item.student_no }}</p>
                  <p>出生日期：{{ item.date_of_birth }}</p>
                  <p>意向学年：{{ item.preferred_academic_year }}</p>
                  <p>意向信息：{{ item.preferred_info }}</p>
                  <p>拟入学日期：{{ item.preferred_admission_date }}</p>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>
<style scoped>
  .studentFile .formwrap {
    margin-top: 20px;
  }
  .studentFile .studentFileList {
    margin-top: 20px;
  }
  .studentFile .el-form-item {
    margin-bottom: 10px;
  }
  .studentFile .studentFileCard {
    cursor: pointer;
    margin-right: 2%;
    margin-bottom: 40px;
    border: 1px solid #bbb;
    width: 30%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    -moz-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
  }
  .studentFile .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .studentFile .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .studentFile .studentFileCard  img{
    width: 100px;
    height: 100px;
  }
  .studentDiscount >>> .el-tabs__active-bar {
      background-color:#f17128 !important;
      height: 3px;
  }
  .studentDiscount >>> .el-tabs__item {
      height: 40px;
  }
  .studentDiscount >>> .el-tabs__nav {
      float: none;
      width: 50%;
      margin: 0 auto;

  }
  .studentDiscount >>> .el-tabs__header {
      border-bottom: 2px solid #ccc;
  }
  .studentDiscount >>> .el-tabs__nav-wrap {
      width: 50%;
      margin: 0 auto;
  }
  .studentDiscount >>> .el-tab-pane {
      border: none;
  }
</style>
<script>
export default {
  data(){
    return {
      int_url:'http://192.168.199.157:8000/api/common/select/intercity_list/',/*城际*/
      area_url:'http://192.168.199.157:8000/api/common/select/area_list/',/*区域*/
      city_url:'http://192.168.199.157:8000/api/common/select/city_list/',/*省市*/
      brand_url:'http://192.168.199.157:8000/api/common/select/hq_list/',/*品牌*/
      school_url:'http://192.168.199.157:8000/api/common/select/center_list/',/*校园*/
      klass_url:'http://192.168.199.157:8000/api/common/select/class_list/?center_id=',/*班级*/
      student_url:'http://192.168.199.157:8000/api/student/student/student_list/',/*学生*/
      intercity_list:[],
      intercity:'',
      area_list:[],
      area:'',
      city_list:[],
      city:'',
      brand_list:[],
      brand:'',
      school_list:[],
      school:'',
      class_list:[],
      class_val:'',
      klass:'',
      gender:'',
      dateValue: '',
      student_list:[],
      selectDisable:'',
      list:[1,2,3,4,5,6,7,81,],
      form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
      }
    }
  },
  mounted:function(){
    this.getIntercityList();
    this.getAreaList();
    this.getCityList(0);
    this.getBrandList();
    this.getSchoolList();
    this.getStudentList();
  },
  methods:{
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
        url = this.city_url + '?area_code=' + code;
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
    getSchoolList:function (intercity_id,province_id,area_code,hq_id) {
      var _this = this;
      var url = this.school_url + '?intercity_id=' + this.intercity + '&province_id=' + this.city + '&area_code=' + this.area + '&hq_id=' + this.brand;
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
    getClassList:function () {
      var _this = this;
      var url = this.klass_url + this.school;
      _this.$axios.get(url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.class_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*获取学生*/
    getStudentList:function () {
      console.log(this.dateValue);
      var _this = this;
      var url = this.student_url;
      var school_ids = [3];
      _this.$axios.post(url,
      {
        student_type:'Prepare',
        center_ids:school_ids,
        class_id:this.class_val,
        date_from:'2018-01-01',
        date_to:'2020-01-01',
        gender:"",
        condition:"",
      }).then(res=>{
        if(res.status == 200 && res.data.status == 1) {
          this.student_list = res.data.results.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    areaChangeFun:function () {
      this.getCityList(this.area);
      this.getSchoolList(this.intercity,this.city,0,this.brand);
    },
    /*intercity_id 城际，province_id 省份，area_code 区域code,hq_id 品牌*/
    allChangeFun:function () {
      this.getSchoolList(this.intercity,this.city,this.area,this.brand);
    },
    schoolChangeFun:function () {
      console.log(this.school);
      if(this.school === ''){
        this.selectDisable = true;
      }else{
        this.getClassList();
        this.selectDisable = false;
      }
    },
  },
}
</script>
