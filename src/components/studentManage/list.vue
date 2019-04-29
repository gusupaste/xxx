<template>
  <div class="studentlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">学生管理</span></p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="在校生" name="first">
        <in-school></in-school>
      </el-tab-pane>
      <el-tab-pane label="毕业生" name="second">
        <graduate></graduate>
      </el-tab-pane>
      <el-tab-pane label="离园生" name="third">
        <leave></leave>
      </el-tab-pane>
      <el-tab-pane label="毕业班学生" name="fourth">
        <graduating-class></graduating-class>
      </el-tab-pane>
      <el-tab-pane label="学生统计" name="fifth">
        <statistics-class></statistics-class>
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
  methods:{
    handleClick(tab, event) {
        // console.log(tab, event);
      }
  }
}
</script>
