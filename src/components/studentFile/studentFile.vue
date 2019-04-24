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
  /* .studentFile >>> .el-tabs__nav-wrap {
      width: 80%;
      margin: 0 auto;
  } */
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
    Preparatory
  },
  methods:{
    handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
