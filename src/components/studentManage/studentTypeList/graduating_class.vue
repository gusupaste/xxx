<template>
  <div class="student_class">
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
            <el-input v-model="searchText" placeholder="输入学号、学生姓名" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getStudentList()">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <span class="ml10" @click="studentVisiable = true">
              <i class="fa fa-plus-square icon-font"></i>
              <span class="font-size-14 orange">维护计划毕业生</span>
            </span>
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
                    <i v-if="item.gender ==='男生'" style="font-size:15px;color:#51a5ff;" class="fa fa-mars" aria-hidden="true"></i>
                    <i v-if="item.gender ==='女生'" style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
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
                <span class="left">
                    <p>计划毕业日期</p>
                    <p>{{ item.leave_date }}</p>
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
    <el-dialog title="计划毕业生维护" :visible.sync="studentVisiable" width="650px">
      <el-form ref="leveForm" :model="leveForm" :rules="rules" label-width="80px">
        <p style="line-height: 30px;">您可以为每一个学年选择即将毕业的学生,作为毕业班学生的管理</p>
        <el-row>
          <el-col :span="8">
            <el-form-item label="学年：" label-width="auto">
              <el-select>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级：" label-width="auto">
              <el-select>

              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-transfer v-model="value"
                       :data="data"
                       :titles="['当前在校生', '计划毕业生']"></el-transfer>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="studentVisiable = false">取 消</el-button>
          <el-button type="success" @click="saveLeave('leveForm')">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  .student_class >>> .el-form-item__label{
    padding: 0;
  }
  .student_class >>> .el-transfer-panel{
    width:250px;
  }
  .student_class >>> .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
    font-size: 14px;
  }
  .student_class >>> .el-transfer__button{
    height: 35px;
  }
  .student_class >>> .el-pagination{
    white-space: pre-line;
  }
  .student_class .studentFileList {
    margin-top: 20px;
  }
  .student_class .el-form-item {
    margin-bottom: 10px;
  }
  .student_class .studentFileCard {
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
  .student_class .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .student_class .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .student_class .studentFileCard .card-footer{
    background-color: #999;
    padding: 10px;
    font-size: 12px;
    color:#fff;
  }
  .student_class .studentFileCard .card-footer span {
    display: inline-block;
    text-align: center;
    width: 49%;
    line-height: 17px;
  }
  .student_class .studentFileCard  img{
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
      class_val: '',
      gender: '',
      dateValue: [],
      currentPage: 1,
      studentVisiable: false,
      leveForm: {},
      rules: {},
      data: [
        {
          key: 1,
          label: '学生1'
        }, {
          key: 2,
          label: '学生2'
        },
      ],
      value: [1, 4],
      searchText: '',
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
        student_type:'Graduating',
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
