<template>
  <div class="studentlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">学生管理</span></p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="在校生" name="first">
        <in-school :class_list="class_list"
                   :student_list="student_list"
                   :activeTabs="activeName"
                    @getStudentList="getStudentList"></in-school>
      </el-tab-pane>
      <el-tab-pane label="毕业生" name="second">
        <graduate :class_list="class_list"
                  :student_list="student_list"
                  :activeTabs="activeName"
                  :year_list="year_list"
                  @getStudentList="getStudentList"></graduate>
      </el-tab-pane>
      <el-tab-pane label="离园生" name="third">
        <leave :class_list="class_list"
               :student_list="student_list"
               :activeTabs="activeName"
               @getStudentList="getStudentList"></leave>
      </el-tab-pane>
      <el-tab-pane label="毕业班学生" name="fourth">
        <graduating-class :class_list="class_list"
                          :student_list="student_list"
                          :activeTabs="activeName"
                          @getStudentList="getStudentList"></graduating-class>
      </el-tab-pane>
      <el-tab-pane label="学生统计" name="fifth">
        <statistics-class :class_list="class_list"
                          :student_list="student_list"
                          :activeTabs="activeName"
                          @getStudentList="getStudentList"></statistics-class>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped>
  .studentlist >>> .el-tabs__active-bar {
        background-color:#f17128 !important;
        height: 3px;
  }
  .studentlist >>> .el-tabs__item {
      height: 40px;
      width: 200px;
      text-align: center;
  }
  .studentlist >>> .el-tabs__nav {
      float: none;
      width: 80%;
      margin: 0 auto;

  }
  .studentlist >>> .el-tabs__header {
      border-bottom: 2px solid #ccc;
  }

  .studentlist >>> .el-tab-pane {
      border: none;
  }
</style>
<script>
import InSchool from './studentTypeList/inschool';
import Leave from './studentTypeList/leave';
import Graduate from './studentTypeList/graduate';
import GraduatingClass from './studentTypeList/graduating_class';
import StatisticsClass from './studentTypeList/statistics_class';
export default {
  data(){
    return {
         activeName: 'first',
         klass_url:'http://192.168.1.197:8000/api/common/select/class_list/?center_id=3',/*班级*/
         student_url:'http://192.168.1.197:8000/api/student/student/student_list/',/*学生*/
         year_url:'http://192.168.1.197:8000/api/common/select/academic_year_list/',/*学年*/
         class_list:[],
         year_list:[],
         student_list:[],
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
  components:{
    Graduate,
    Leave,
    GraduatingClass,
    InSchool,
    StatisticsClass
  },
  mounted:function(){
    this.getClassList();
  },
  methods:{
    handleClick(tab, event) {
        // console.log(tab, event);
    },
    /*班级*/
    getClassList:function () {
      var _this = this;
      _this.$axios.get(this.klass_url).then(res=>{
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
    /*获取学生*/
    getStudentList:function (data) {
      var _this = this;
      var url = this.student_url;
      _this.$axios.get(url,{
        params:{
          student_type:data.student_type,
          class_id:data.class_id,
          date_from:data.date_from,
          date_to:data.date_to,
          gender:data.gender,
          condition:data.condition,
        }
      }).then(res=>{
        if(res.status == 200 && res.data.status == 1) {
          this.student_list = res.data.results.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  }
}
</script>
