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
            <span class="ml10 cur" @click="studentVisiable = true;
            getDialogStudentList(class_year_id);new_graduating = [];
            new_non_graduating = [];">
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
      :page-size="9"
      @current-change="changePage"
      :total="total">
    </el-pagination>
    <el-dialog title="计划毕业生维护" :visible.sync="studentVisiable" width="650px">
      <el-form ref="leveForm" :model="leveForm" :rules="rules" label-width="80px">
        <p style="line-height: 30px;">您可以为每一个学年选择即将毕业的学生,作为毕业班学生的管理</p>
        <el-row>
          <el-col :span="8">
            <el-form-item label="学年：" label-width="auto">
              <el-select v-model="academic_year_id" placeholder="请选择" @change="getClassList(academic_year_id)">
                <el-option
                  v-for="item in year_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级：" label-width="auto">
              <el-select v-model="class_year_id" placeholder="请选择" @change="getDialogStudentList(class_year_id)">
                <el-option
                  v-for="item in class_year_list"
                  :key="item.id"
                  :label="item.center_class__name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-transfer v-model="value"
                       :data="data"
                       :titles="['当前在校生', '计划毕业生']"
                       @change="handleChange"></el-transfer>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="studentVisiable = false">取 消</el-button>
          <el-button type="success" @click="saveStudentD()">保 存</el-button>
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
      academic_year_id:'',
      year_list:[],
      class_year_id:'',
      class_year_list:[],
      class_val: '',
      gender: '',
      dateValue: [],
      currentPage: 1,
      studentVisiable: false,
      leveForm: {},
      rules: {},
      data: [],
      value: [],
      searchText: '',
      non_graduating:[],
      graduating:[],
      new_non_graduating:[],/*是从右边换到左边的人*/
      new_graduating:[],/*是从左边换到右边的人*/
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
    handleChange(value, direction, movedKeys) {
      if(direction === 'right'){//向右移动
        for(var y in movedKeys){
          var flag = false;
          for(var x in this.graduating){
            if(this.graduating[x].id === movedKeys[y]){
              flag = true;
            }
          }
          if(flag === false){
            this.new_graduating.push(movedKeys[y]);
          }
          for(var z in this.new_non_graduating){
            if(this.new_non_graduating[z] === movedKeys[y]){
              this.new_non_graduating.splice(z,1);
            }
          }
        }
      }else{//向左移动
        for(var y in movedKeys){
          var flag = false;
          for(var x in this.non_graduating){
            if(this.non_graduating[x].id === movedKeys[y]){
              flag = true;
            }
          }
          if(flag === false){
            this.new_non_graduating.push(movedKeys[y]);
          }
          for(var k in this.new_graduating){
            if(this.new_graduating[k] === movedKeys[y]){
              this.new_graduating.splice(k,1);
            }
          }
        }
      }
    },
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
    /*学年*/
    getYearList: function () {
      this.$axios.get('/api/common/select/academic_year_list/')
        .then(res => {
          this.year_list = res.data.results
          for (var x in this.year_list) {
            if (this.year_list[x].is_selected === 1) {
              this.academic_year_id = this.year_list[x].id
            }
          }
          this.getClassList(this.academic_year_id);
        }).catch(err => {
        console.log(err)
      })
    },
    /*学年下的班级*/
    getClassList:function(id){
      var url = '/api/center/select/center_class_year_list/?academic_year_id=' + id;
      this.$axios.get(url).then(res=>{
        this.class_year_list = res.data.results;
        this.class_year_id = this.class_year_list[0].id;
        this.getDialogStudentList(this.class_year_id);
      }).catch(err=>{
        console.log(err)
      })
    },
    /*/api/student/student/graduating_student_list/*/
    getDialogStudentList:function(id){
      var url = '/api/student/student/graduating_student_list/?class_id=' + id;
      this.$axios.get(url).then(res=>{
        this.non_graduating = res.data.non_graduting;
        this.graduating = res.data.graduating;
        var data = res.data.non_graduting;
        this.data = [];
        for(var x in data){
          var obj = {};
          obj.key = data[x].id;
          obj.label = data[x].name;
          this.data.push(obj);
        }
        var values = res.data.graduating;
        this.value = [];
        for(var y in values){
          this.value.push(values[y].id);
          var obj = {};
          obj.key = values[y].id;
          obj.label = values[y].name;
          this.data.push(obj);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    saveStudentD:function () {
      if(this.new_non_graduating.length === 0 || this.new_graduating.length === 0){
        this.studentVisiable = false;
        return false;
      }
      var data = {};
      data.non_graduating = this.new_non_graduating;
      data.graduating = this.new_graduating;
      this.$axios.post('/api/student/student/save_graduating_students/',data).then(res => {
        if (res.status == 200) {
          this.$message({
            type: 'success',
            message: '保存成功！'
          })
          this.studentVisiable = false;
        } else {
          this.$message.error('保存失败');
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
  watch: {
    activeTabs: {
      handler(newValue, oldValue) {
        if(newValue === 'fourth'){
          this.getStudentList();
          this.getYearList();
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
