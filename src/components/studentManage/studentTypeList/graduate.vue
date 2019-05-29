<template>
  <div class="student_graduate">
      <div class="formwrap">
        <el-form ref="form" :model="form" label-width="60px" inline>
          <el-form-item label="班级：">
            <el-select v-model="class_val">
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
            <el-select v-model="gender" placeholder="请选择学生性别">
              <el-option value="" label="全部"></el-option>
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学年：">
            <el-select v-model="year" placeholder="请选择学年">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in year_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学日期：">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input v-model="searchText" placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getStudentList()">搜索</el-button>
          </el-form-item>
        </el-form>

      </div>
      <div class="studentFileList">
          <div class="studentFileCard" v-for="(item , index) in student_list " :key="index" @click="$router.push('/studentFile/studentFileDetail/'+item.id)">
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
                    <p>入园日期</p>
                    <p>{{ item.enter_date }}</p>
                </span>
                <span class="center">
                    <p>毕业日期</p>
                    <p>----</p>
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
  .student_graduate >>> .el-form-item__label{
    padding: 0;
  }
  .student_graduate >>> .el-pagination{
    white-space: pre-line;
  }
  .student_graduate .studentFileList {
    margin-top: 20px;
  }
  .student_graduate .el-form-item {
    margin-bottom: 10px;
  }
  .student_graduate .studentFileCard {
    cursor: pointer;
    margin-right: 1%;
    margin-bottom: 40px;
    border: 1px solid #bbb;
    width: 32%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    -moz-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    display: inline-block;
  }
  .student_graduate .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .student_graduate .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .student_graduate .studentFileCard .card-footer{
    background-color: #999;
    padding: 10px;
    font-size: 12px;
    color:#fff;
  }
  .student_graduate .studentFileCard .card-footer span {
    display: inline-block;
    text-align: center;
    width: 49%;
    line-height: 17px;
  }
  .student_graduate .studentFileCard  img{
    width: 80px;
    height: 80px;
  }
</style>
<script>
export default {
  props:{
    class_list: {
      type:Array,
        request:true,
    },
    student_list: {
      type:Array,
        request:true,
    },
    year_list: {
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
      class_val:'',
      gender:'',
      year:'',
      in_type:'',
      dateValue:[],
      currentPage:1,
      searchText:'',
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
  methods:{
    changePage(val){
      this.currentPage = val;
    },
    getStudentList:function () {
      var data={
        student_type:'Abort',/*在校生*/
        class_id:this.class_val,
        date_from:this.dateValue[0],
        date_to:this.dateValue[1],
        gender:this.gender,
        condition:this.searchText,
        page:this.currentPage
      }
      this.$emit('getStudentList',data);
    },
  },
  watch: {
    activeTabs: {
      handler(newValue, oldValue) {
        if(newValue === 'second'){
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
