<template>
  <div class="schooldetail clearfix wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > 校园列表 > <span class="font-cl-blue">校园概况</span></p>
    </div>
    <div class="content clearfix">
      <div class="content-top">{{schoolInfo.name}}</div>
      <el-col :span="24" style="line-height:2">
        <el-card shadow="always">
          <p class="bold">基本信息</p>
          <p class="bold">校园名称：{{schoolInfo.name}}(英文全称:{{schoolInfo.other_name}};中文简称:{{schoolInfo.short_name}};英文简称:{{schoolInfo.other_short_name}})</p>
          <p><el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属区域：</span><span>{{schoolInfo.area_name}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属城市：</span><span>{{schoolInfo.city_name}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">园长：</span><span>{{schoolInfo.principal_name}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>校园编码：</span><span>{{schoolInfo.code}}</span></div></el-col>
          </el-row>
          </p>
          <p>
          <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><span>通讯地址：</span><span>{{schoolInfo.province_name}}{{schoolInfo.city_name}}{{schoolInfo.town_name}}{{schoolInfo.address}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">邮编：</span><span>{{schoolInfo.zip_code}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">电话：</span><span>{{schoolInfo.telephone}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">传真：</span><span>{{schoolInfo.fax}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>电子邮箱：</span><span>{{schoolInfo.email}}</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">网址：</span><span>{{schoolInfo.website}}</span></div></el-col>
          </el-row>
          </p>
        </el-card>
      </el-col>
    </div>
    <div class="mt26">
        <el-tabs v-model="activeName"  stretch>
          <el-tab-pane label="开班情况" name="first">
            <div v-for="classtype in classTypeList" :key="classtype.id">
                  <div class="firstTab">
                      <span class="className">{{classtype.name}}</span>
                      <span style="cursor:pointer" @click="viewSchoolCalendar(classtype)">
                        <i class="icon-font fa fa-calendar-minus-o"></i>校日历
                      </span>
                      <span style="cursor:pointer" @click="dialogFormVisible=true">
                        <i class="icon-font el-icon-circle-plus-outline"></i>新增班级
                      </span>
                    </div>
                    <div>
                      <el-table
                        :data="classtype.class_list"
                        border
                        empty-text='没有找到记录！'
                        style="width: 100%;margin-top:20px">
                        <el-table-column
                          fixed
                          prop="name"
                          label="班级名称">
                        </el-table-column>
                        <el-table-column
                          prop="nick_name"
                          label="昵称">
                        </el-table-column>
                        <el-table-column
                          prop="start_date"
                          label="开设时间">
                        </el-table-column>
                        <el-table-column
                          prop="status"
                          label="班级状态">
                        </el-table-column>
                        <el-table-column
                          prop="capacity"
                          label="最大学生数">
                        </el-table-column>
                        <el-table-column
                          prop="current_student_no"
                          label="当前学生数">
                        </el-table-column>
                        <el-table-column
                          prop="prepare_student_no"
                          label="预备生数">
                        </el-table-column>
                        <el-table-column
                          prop="max_teacher"
                          label="师资标配数">
                        </el-table-column>
                        <el-table-column
                          width="200"
                          prop="stu"
                          label="主班老师">
                          <template slot-scope="scope">
                            <div class="inline-block">
                              <el-button class="teacher-wrap">
                                <span>王老师</span>
                                <i class="fa fa-minus-circle red cur"></i>
                              </el-button>
                            </div>
                            <i style="vertical-align:middle" class="fa fa-plus-square-o font-size-20 blue cur"></i>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template slot-scope="scope">
                            <i class="fa fa-pencil green font-size-20 cur" @click="editClass(scope.row)"></i>
                            <i class="fa fa-trash red font-size-20 ml10 cur" @click="deleteClass(scope.row)"></i>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
            </div>
            
          </el-tab-pane>
          <el-tab-pane label="基础设施" name="second">
              <div style="padding:0 20px">
                  <p>校园建筑面积：<span class="orange bold">{{schoolInfo.built_up_area}}</span>平方米</p>
                  <p>使用面积：<span class="orange bold">{{schoolInfo.usage_area}}</span>平方米</p>
                  <p>产权：{{schoolInfo.built_up_type_name}}</p>
                  <p>是否自建：{{schoolInfo.owner_type_name}}</p>
                  <p>经度：{{schoolInfo.longitude}}</p>
                  <p>维度：{{schoolInfo.latitude}}</p>
                  <p>最大开班数：{{schoolInfo.max_class_no}}</p>
                  <p>当前开班数：{{schoolInfo.current_class_no}}</p>
              </div>
          </el-tab-pane>
          <el-tab-pane label="银行账户" name="third">
              <div style="padding:20px 20px;line-height:24px" v-for="(item,index) in schoolInfo.bank_list" :key="index">
                  <p>账号：{{item.account_no}}</p>
                  <p>账号名称（中文）：{{item.account_name}}</p>
                  <p>SWIFT代码：{{item.swift_code}}</p>
                  <p>账号名称（英文）：{{item.other_account_name}}</p>
                  <p>开户银行（中文）：{{item.bank_name}}</p>
                  <p>开户银行（英文）：{{item.other_bank_name}}</p>
              </div>
          </el-tab-pane>
        </el-tabs>
    </div>
    <!-- 新增班级 -->
    <el-dialog title="新增班级" :visible.sync="dialogFormVisible"
      width="70%">
      <el-form :model="addform" :rules="addrules" ref="addform" :inline="true">
        <el-form-item label="新增方式：" :label-width="formLabelWidth">
          <el-select v-model="addform.addtype" auto-complete="off" class="w250_input">
              <el-option value="手工新增">手工新增</el-option>
              <el-option value="根据批复的开班申请创建">根据批复的开班申请创建</el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="中文名称：" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addform.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" :label-width="formLabelWidth">
           <el-input v-model="addform.nick_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="英文名称：" :label-width="formLabelWidth">
            <el-input v-model="addform.other_name" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="班级类型：" :label-width="formLabelWidth" prop="class_type">
            <el-select v-model="addform.class_type" placeholder="请选择">
              <el-option v-for="cla in selectTypeList" :label="cla.name" :value="cla.id" :key="cla.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级：" :label-width="formLabelWidth" prop="grade_type">
            <el-select v-model="addform.grade_type" placeholder="请选择">
              <el-option v-for="grade in selectGradeList" :label="grade.name" :value="grade.id" :key="grade.id"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="开设时间：" :label-width="formLabelWidth" prop="start_date">
            <el-date-picker
              value-format="yyyy-MM-dd"
              style="width:164px"
              v-model="addform.start_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班级状态：" :label-width="formLabelWidth" prop="status">
            <el-select v-model="addform.status" placeholder="请选择">
              <el-option label="open" value="0"></el-option>
              <el-option label="close" value="1"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="满班学生数：" :label-width="formLabelWidth" prop="capacity">
            <el-input v-model="addform.capacity" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="师资标配数：" :label-width="formLabelWidth" prop="max_teacher">
            <el-input v-model="addform.max_teacher" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="是否需要家具：" :label-width="formLabelWidth">
            <el-select v-model="addform.need_furniture" placeholder="请选择">
              <el-option label="需要" :value="0"></el-option>
              <el-option label="不需要" :value="1"></el-option>
              <el-option label="部分需要" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要教具：" :label-width="formLabelWidth">
            <el-select v-model="addform.need_teaching_aid" placeholder="请选择">
              <el-option label="需要" :value="0"></el-option>
              <el-option label="不需要" :value="1"></el-option>
              <el-option label="部分需要" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="班级描述：" :label-width="formLabelWidth" style="width:100%">
            <el-input type="textarea" v-model="addform.remarks" style="min-width:600px"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top:0">
          <el-button @click="dialogFormVisible=false" style="background-color:#bbb;color:#fff" >取 消</el-button>
          <el-button type="primary" class="white bg-green" style="border-color:#8bc34a" @click="saveClass('addform')">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑班级 -->
    <el-dialog title="编辑班级" :visible.sync="editClassDialog"
      width="70%">
      <el-form :model="editform" :rules="editrules" ref="editform" :inline="true">
        <el-form-item label="新增方式：" :label-width="formLabelWidth">
          <el-select v-model="editform.addtype" auto-complete="off" class="w250_input">
              <el-option value="手工新增">手工新增</el-option>
              <el-option value="根据批复的开班申请创建">根据批复的开班申请创建</el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="中文名称：" :label-width="formLabelWidth" prop="name">
            <el-input v-model="editform.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" :label-width="formLabelWidth">
           <el-input v-model="editform.nick_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="英文名称：" :label-width="formLabelWidth">
            <el-input v-model="editform.other_name" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="班级类型：" :label-width="formLabelWidth" prop="class_type">
            <el-select v-model="editform.class_type" placeholder="请选择">
              <el-option v-for="cla in selectTypeList" :label="cla.name" :value="cla.id" :key="cla.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级：" :label-width="formLabelWidth" prop="grade_type">
            <el-select v-model="editform.grade_type" placeholder="请选择">
              <el-option v-for="grade in selectGradeList" :label="grade.name" :value="grade.id" :key="grade.id"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="开设时间：" :label-width="formLabelWidth" prop="start_date">
            <el-date-picker
              value-format="yyyy-MM-dd"
              style="width:164px"
              v-model="editform.start_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班级状态：" :label-width="formLabelWidth" prop="status">
            <el-select v-model="editform.status" placeholder="请选择">
              <el-option label="open" :value="0"></el-option>
              <el-option label="close" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="满班学生数：" :label-width="formLabelWidth" prop="capacity">
            <el-input v-model="editform.capacity" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="师资标配数：" :label-width="formLabelWidth" prop="max_teacher">
            <el-input v-model="editform.max_teacher" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="是否需要家具：" :label-width="formLabelWidth">
            <el-select v-model="editform.need_furniture" placeholder="请选择">
              <el-option label="需要" :value="0"></el-option>
              <el-option label="不需要" :value="1"></el-option>
              <el-option label="部分需要" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要教具：" :label-width="formLabelWidth">
            <el-select v-model="editform.need_teaching_aid" placeholder="请选择">
              <el-option label="需要" :value="0"></el-option>
              <el-option label="不需要" :value="1"></el-option>
              <el-option label="部分需要" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="班级描述：" :label-width="formLabelWidth" style="width:100%">
            <el-input type="textarea" v-model="editform.remarks" style="min-width:600px"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top:0">
          <el-button @click="editClassDialog=false" style="background-color:#bbb;color:#fff">取 消</el-button>
          <el-button type="primary" class="white bg-green" style="border-color:#8bc34a" @click="sureUpdate('editform')">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 删除班级 -->
    <el-dialog
      title="删除班级"
      :visible.sync="deleteDialog"
      width="30%">
      <div class="text-align-center mt26">
        是否确定删除班级
        <span class="udline font-cl-blue">【{{delete_name}}】？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <div slot="footer" class="dialog-footer mt26">
          <el-button @click="deleteDialog=false" style="background-color:#bbb;color:#fff">取 消</el-button>
          <el-button type="primary" class="white bg-green" style="border-color:#8bc34a" @click="sureDelete">保 存</el-button>
      </div>
      </span>
    </el-dialog>
    <!-- 添加老师 -->
      <el-dialog
          width="30%"
          class="chose-person"
          title="添加老师"
          :visible.sync="addinnerVisible"
          append-to-body>
          <p style="font-size:16px">{{schoolInfo.name}}</p>
          <p class="mt10">
            <span>搜索：</span>
            <el-input v-model="searchPerson" style="width:164px"></el-input>
            <el-button type="primary" @click="getPerson">搜索</el-button>
          </p>
          <el-table
            class="mt10"
            ref="multipleTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="selection"
              label="选择"
              width="100">
            </el-table-column>
            <el-table-column
              property="name"
              label="员工姓名"
              width="120">
            </el-table-column>
            <el-table-column
              property="email"
              label="职位">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next, jumper"
            :page-size="1"
            :current-page="currentPage"
            :total="count">
          </el-pagination>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addinnerVisible = false" class="bg-grey white">取 消</el-button>
            <el-button type="success" @click="checkedPerson">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<style scoped>
    .schooldetail >>> .el-dialog__header{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: 12px !important;
        border-bottom: 1px solid #d5d5d5;
    }
    .schooldetail >>> .el-dialog__title{
        font-size: 14px;
    }
    .schooldetaill >>> .el-dialog{
        min-width: 600px;
    }
    .schooldetail >>> .dialog-footer{
        margin-top: 50px;
        text-align: center;
    }
    .schooldetail {
      color: rgba(160, 160, 160, 1);
      text-align: left;
    }
    .schooldetail .firstTab {
      margin-top: 10px;
      height: 40px;
      line-height: 40px;
    }
    .schooldetail .className {
      padding:6px 16px;
      font-size: 16px;
      font-weight: 600;
      color:#3683a0;
      border: 2px solid #3683a0;
      border-radius: 20px;
    }
    .schooldetail .icon-font {
      color:#f17128;
      font-size: 20px;
      margin-left: 20px;
      margin-right: 5px;
      font-weight: 600;
    }
    .schooldetail >>> .el-tabs__nav-wrap {
      width: 50%;
      margin:0 auto;
    }
    .schooldetail >>> .has-gutter th {
        background-color: #f5f5f5 !important;
      }
    .schooldetail >>> .el-tabs__active-bar {
      background-color:#f17128;
      height: 3px;;
    }
    .schooldetail >>> .el-tabs__item.is-active {
      color:#f17128;
      font-weight: 600;
    }
    .schooldetail >>> .el-tabs__item:hover {
      color:#f17128;
      font-weight: 600;
    }
    .schooldetail >>> .el-tabs__nav-wrap::after {
      display: none;
    }
    .schooldetail >>> .el-tabs__header {
      border-bottom: 2px solid #dedede;
    }

    .schooldetail .content-top{
      font-weight: 600;
      background-color: #DCECF3;
      width: 15%;
      padding: 10px 0 10px 20px;
      position: relative;
      top: 20px;
      left: -5px;
      border-radius: 3px;
      color: #3E7193;
    }
    .schooldetail .content-margin{
      margin-left: 15%;
    }
    .schooldetail >>> td , .schooldetail >>> th {
      text-align: center;
    }
    .schooldetail >>> .el-textarea__inner {
        width: 600px;
        min-height: 100px !important;
    }
    .schooldetail .teacher-wrap {
       width: 76px;
       height: 27px;
       padding: 0;
       margin:10px 10px 0 0;
    }
  </style>

<script>
  export default {
    components: {
    },
    data() {
      return {
        searchPerson:'',
        /**老师分页 */
        count:1,
        delete_name:'',
        delete_id:'',
        edit_id:'',
        currentPage:1,
        total:1,
        dialogFormVisible:false,
        editClassDialog:false,
        deleteDialog:false,
        addinnerVisible:false,
        activeName: 'first',
        school_id:this.$route.params.id,
        schoolInfo:{},
        multipleSelection: [],
        addform: {},
        editform: {},
        addrules: {
          name: [
            { required: true, message: '请输入中文名称', trigger: 'blur' },
          ],
          capacity: [
            { required: true, message: '请输入满班学生数', trigger: 'blur' },
          ],
          max_teacher: [
            { required: true, message: '请输入师资标配数', trigger: 'blur' },
          ],
          grade_type: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ],
          class_type: [
            { required: true, message: '请选择班级类型', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择班级状态', trigger: 'change' }
          ],
          start_date: [
            { type: 'string', required: true, message: '请选择开设时间', trigger: 'change' }
          ]
        },
        editrules: {
          name: [
            { required: true, message: '请输入中文名称', trigger: 'blur' },
          ],
          capacity: [
            { required: true, message: '请输入满班学生数', trigger: 'blur' },
          ],
          max_teacher: [
            { required: true, message: '请输入师资标配数', trigger: 'blur' },
          ],
          grade_type: [
            { required: true, message: '请选择年级', trigger: 'change' }
          ],
          class_type: [
            { required: true, message: '请选择班级类型', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择班级状态', trigger: 'change' }
          ],
          start_date: [
            { type: 'string', required: true, message: '请选择开设时间', trigger: 'change' }
          ]
        },
        classTypeList:[],
        selectTypeList:[],
        selectGradeList:[],
        tableData: [],
        tableData2: [],
        formLabelWidth: '120px'
      };
    },
    mounted () {
        this.getSchoolInfo();
        this.getClass();
        this.getClassType();
    },
    methods: {
      getSchoolInfo(){
        var _this = this;
        this.$axios.get('/api/center/center/'+this.school_id+'/base_information/')
        .then(res=>{
          _this.schoolInfo = res.data.data;
          console.log(res)
        }).catch(err=>{

        })
      },
      deleteClass(item){
        this.deleteDialog=true;
        this.delete_name = item.name;
        this.delete_id = item.id;
      },
      editClass(item){   
        this.delete_name = item.name;
        this.edit_id = item.id;
        var _this = this;
        this.$axios.get('/api/center/class/'+item.id+'/view_detail/')
        .then(res=>{
          console.log(res)
          _this.editform = res.data.detail;
          _this.editClassDialog=true;
        }).catch(err=>{

        })
      },
      sureUpdate(formName){   
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.put('/api/center/class/'+this.edit_id+'/',this.editform)
            .then(res=>{
              console.log(res)
              if(res.data.status_code === 1){
                _this.$message({
                  type:'success',
                  message:'编辑班级成功！'
                });
                _this.editClassDialog = false;
                _this.getClass();
              }
            }).catch(err=>{

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      sureDelete(item){
        var _this = this;
        this.$axios.delete('/api/center/class/'+this.delete_id+'/')
        .then(res=>{
          if(res.data.status_code == 1){
            _this.$message({
              type:'success',
              message:'删除班级成功！'
            });
            _this.deleteDialog = false;
            _this.getClass();
          }
        }).catch(err=>{

        })
      },
      getClass(){
        var _this = this;
        this.$axios.get('/api/center/class/?center_id='+this.school_id)
        .then(res=>{
          console.log(res)
          _this.classTypeList = res.data.class_type_list;
        }).catch(err=>{

        })
      },
      getClassType(){
        var _this = this;
        this.$axios.get('/api/center/select/class_type_list/?center_id='+this.school_id)
        .then(res=>{
          console.log(res)
          _this.selectTypeList = res.data.results;
        }).catch(err=>{

        })
        this.$axios.get('/api/center/select/grade_type_list/?center_id='+this.school_id)
        .then(res=>{
          console.log(res)
          _this.selectGradeList = res.data.results;
        }).catch(err=>{

        })
      },
      saveClass(formName){
        var _this = this;
        this.addform.center = this.school_id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/center/class/',this.addform)
            .then(res=>{
              if(res.data.status_code === 1){
                _this.$message({
                  type:'success',
                  message:'新增班级成功！'
                });
                _this.dialogFormVisible = false;
                _this.getClass();
              }
            }).catch(err=>{

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
        
      },
      getPerson(){

      },
      checkedPerson(){

      },
      viewSchoolCalendar(item){
        this.$router.push('/school/SchoolViewClendar/'+item.id)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>
