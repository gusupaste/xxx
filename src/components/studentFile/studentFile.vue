<template>
  <div class="studentFile wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">学生档案</span></p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="预备生" name="first">
          <preparatory></preparatory>
      </el-tab-pane>
      <el-tab-pane label="在校生" name="second">
        <in-school></in-school>
      </el-tab-pane>
      <el-tab-pane label="毕业生" name="third">
        <graduate></graduate>
      </el-tab-pane>
      <el-tab-pane label="中途离园生" name="fourth">
        <leave></leave>
      </el-tab-pane>
      <el-tab-pane label="毕业班学生" name="fifth">
        <graduating-class></graduating-class>
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
      searchText:'',
    }
  },
  components:{
    Graduate,
    Leave,
    GraduatingClass,
    InSchool,
    Preparatory
  },
  methods:{
    handleClick(tab, event) {
        // console.log(tab, event);
      }
  }
}
</script>
