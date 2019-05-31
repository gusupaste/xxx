<template>
  <div class="student_class">
      <div class="formwrap">
        <el-form label-width="80px" inline>
          <el-form-item label="城际：">
            <el-select v-model="intercity" @change="interChangeFun">
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
            <el-select v-model="city" @change="interChangeFun">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in city_list"
                :key="item.city_id"
                :label="item.city_name"
                :value="item.city_id">
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
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input  v-model="searchText" placeholder="输入学号、学生姓名" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search_Fun">搜索</el-button>
          </el-form-item>
          <!--<el-form-item>
            <span class="ml10" @click="studentVisiable = true">
              <i class="fa fa-plus-square icon-font"></i>
              <span class="font-size-14 orange">维护计划毕业生</span>
            </span>
          </el-form-item>-->
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
  .student_class >>> .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
    width: 383px;
  }
  .student_class .studentFileList {
    margin-top: 20px;
  }
  .student_class .el-form-item {
    margin-bottom: 10px;
  }
  .student_class .studentFileCard {
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
    width: 33%;
    line-height: 17px;
  }
  .student_class .studentFileCard  img{
    width: 100px;
    height: 100px;
  }
</style>
<script>
import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item.vue'

export default {
  components: {ElFormItem},
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
      currentPage:1,
      studentVisiable:false,
      leveForm:{

      },
      rules:{},
      data: [
        {
          key:1,
          label:'学生1'
        },{
          key:2,
          label:'学生2'
        },
      ],
      value: [1, 4]
    }
  },
  methods:{
    search_Fun:function () {
      this.currentPage=1;
      this.getStudentList();
    },
    changePage(val){
      this.currentPage = val;
    },
    areaChangeFun:function () {
      this.city = '';
      this.school = '';
      this.$emit('getCityList',this.area);
      this.$emit('getSchoolList',this.intercity,this.city,this.area,this.brand);
    },
    interChangeFun:function(){
      this.school = '';
      this.$emit('getSchoolList',this.intercity,this.city,this.area,this.brand);
    },
    /*intercity_id 城际，province_id 省份，area_code 区域code,hq_id 品牌*/
    allChangeFun:function () {
      /*this.schoolChangeFun();*/
      this.school = '';
      this.$emit('getSchoolList',this.intercity,this.city,this.area,this.brand);
    },
    schoolChangeFun:function () {
      if(this.school !== ''){
        this.$emit('getClassList',this.school);
      }
    },
    getStudentList:function () {
      /*var centresId = []
      centresId.push(this.school);*/
      var data={
        intercity_id:this.intercity,
        area_id:this.area,
        province_id:this.city,
        hq_id:this.brand,
        student_type:'Graduating',/*毕业班学生*/
        center_id:this.school,
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
        if(newValue === 'fifth'){
          this.getStudentList();
        }
      },
      deep: true
    },
    school:{
      handler(newValue, oldValue) {
        if(newValue === ''){
          this.selectDisable = true;
          this.class_val = '';
        }else{
          this.selectDisable = false;
          this.class_val = '';
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
