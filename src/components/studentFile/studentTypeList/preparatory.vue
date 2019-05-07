<template>
  <div class="studentFile">
      <div class="formwrap">
        <el-form label-width="100px" inline>
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
            <el-input v-model="searchText" placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
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
  props: {
    intercity_list: {
      type:Array,
      request:true,
    },
    area_list: {
      type:Array,
      request:true,
    },
    city_list: {
      type:Array,
      request:true,
    },
    brand_list: {
      type:Array,
      request:true,
    },
    school_list: {
      type:Array,
      request:true,
    },
    class_list: {
      type:Array,
        request:true,
    },
  },
  data(){
    return {
      intercity:'',
      area:'',
      city:'',
      brand:'',
      school:'',
      class_val:'',
      klass:'',
      gender:'',
      dateValue: '',
      student_list:[],
      selectDisable:'',
      searchText:'',
    }
  },
  mounted:function(){
    this.getStudentList();
  },
  methods:{
    areaChangeFun:function () {
      this.$emit('getCityList',this.area);
      this.$emit('getSchoolList',this.intercity,this.city,0,this.brand);
    },
    /*intercity_id 城际，province_id 省份，area_code 区域code,hq_id 品牌*/
    allChangeFun:function () {
      this.$emit('getSchoolList',this.intercity,this.city,this.area,this.brand);
    },
    schoolChangeFun:function () {
      if(this.school === ''){
        this.selectDisable = true;
      }else{
        this.$emit('getClassList',this.school);
        this.selectDisable = false;
      }
    },
    getStudentList:function () {
      var data={
        student_type:'Prepare',
        center_ids:[],
        class_id:this.class_val,
        date_from:'2018-01-01',
        date_to:'2020-01-01',
        gender:this.gender,
        condition:this.searchText,
      }
      this.$emit('getStudentList',data);
    }
  },
}
</script>
