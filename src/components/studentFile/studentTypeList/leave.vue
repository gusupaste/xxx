<template>
  <div class="student_leave">
      <div class="formwrap">
        <el-form label-width="80px" inline>
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
          <el-form-item label="学年：">
            <el-select v-model="year" placeholder="请选择活动区域">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in year_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型："><!--暂时不做-->
            <el-select v-model="in_type" placeholder="请选择活动区域">
              <el-option value="" label="全部"></el-option>
              <el-option label="在校" value="in"></el-option>
              <el-option label="休学" value="out"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学日期：">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input  v-model="searchText" placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="getStudentList">搜索</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div class="studentFileList clearfix">
          <div class="studentFileCard left" v-for="(item , index) in student_list " :key="index" @click="$router.push('/studentFile/studentFileDetail/'+item.id)">
            <div style="padding:20px">
              <div class="avatar inline-block">
                <img src="../../../assets/img/logo.png" alt="">
              </div>
              <div class="card-content inline-block">
                <p>
                  <span style="font-size:15px;font-weight:600">{{ item.name }}</span>
                  <i style="font-size:15px;color:#ff7f7f" class="fa fa-times-circle"></i>
                </p>
                <p>出生日期：{{ item.date_of_birth }}</p>
                <p>学号：{{ item.student_no }}</p>
                <p>所在校园：{{ item.center_name }}</p>
              </div>
            </div>
            <div class="card-footer clearfix">
                <span class="left" style="border-right: 1px solid #fff;">
                    <p>入学日期</p>
                    <p>{{ item.enter_date }}</p>
                </span>
              <span class="left">
                    <p>离园日期</p>
                    <p>{{ item.leave_date || '---' }}</p>
                </span>
            </div>
          </div>
      </div>
      <el-pagination
          background
          layout="prev,pager, next, jumper"
          :current-page="currentPage"
          :page-size="10"
          @current-change="changePage"
          :total="total">
        </el-pagination>
  </div>
</template>
<style scoped>
  .student_leave >>> .el-form-item__label{
    padding: 0;
  }
  .student_leave >>> .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
    width: 383px;
  }
  .student_leave .studentFileList {
    margin-top: 20px;
  }
  .student_leave .el-form-item {
    margin-bottom: 10px;
  }
  .student_leave .studentFileCard {
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
  .student_leave .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .student_leave .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .student_leave .studentFileCard .card-footer{
    background-color: #999;
    padding: 10px;
    font-size: 12px;
    color:#fff;
  }
  .student_leave .studentFileCard .card-footer span {
    display: inline-block;
    text-align: center;
    width: 49%;
    line-height: 17px;
  }
  .student_leave .studentFileCard  img{
    width: 100px;
    height: 100px;
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
    year_list: {
      type:Array,
      request:true,
    },
    student_list: {
      type:Array,
      request:true,
    },
    activeTabs:{
      type:String,
      request:true,
    },
    total:{
      type:Number,
      request:true,
    }
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
      dateValue: [],
      selectDisable:'',
      searchText:'',
      year:'',
      in_type:'',
      currentPage:1,
    }
  },
  methods:{
    changePage(val){
      this.currentPage = val;
    },
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
      var centresId = []
      centresId.push(this.school);
      var data={
        student_type:'Graduation',/*离园*/
        center_ids:centresId,
        class_id:this.class_val,
        date_from:this.dateValue[0],
        date_to:this.dateValue[1],
        gender:this.gender,
        condition:this.searchText,
        page:this.currentPage
      }
      this.$emit('getStudentList',data);
    }
  },
  watch: {
    activeTabs: {
      handler(newValue, oldValue) {
        if(newValue === 'fourth'){
          this.getStudentList();
        }
      },
      deep: true
    },
    currentPage(){
      this.getStudentList()
    }
  }
}
</script>
