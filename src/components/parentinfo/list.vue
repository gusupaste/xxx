<template>
  <div class="parentinfo wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE :<span class="font-cl-blue">家长信息</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <el-form label-width="100px" inline>
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
            <el-select v-model="brand" @change="brandChangeFun">
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
            <el-select v-model="school">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in school_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人级别：">
            <el-select v-model="level">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in EmergencyContactGrade_options"
                :key="item.id"
                :label="item.text"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索：">
            <el-input v-model="searchText" placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getParentList">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-list">
        <el-table
          :data="parent_list"
          stripe
          border
          show-header
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            prop="name"
            label="家长姓名">
          </el-table-column>
          <el-table-column
            prop="student_name"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="通讯地址">
          </el-table-column>
          <el-table-column
            prop="zip_code"
            label="邮编">
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮件">
          </el-table-column>
          <el-table-column
            prop="home_phone"
            label="家庭电话">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="emergency_contact_grade_name"
            label="紧急联系级别">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="账号设置">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button class="red" type="text" size="small" @click="editParentInfo(scope.row)">
                <span class="el-icon-edit-outline" style="font-size: 20px;color: #ED6C2E;"></span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="修改家长资料" :visible.sync="editbrandVisible" width="780px" class="editParent">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="家长姓名" prop="name">
              <el-input v-model="ruleForm.name" maxlength="20" placeholder="请填写姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关系" prop="relationship">
              <el-select v-model="ruleForm.relationship" placeholder="请选择关系">
                <el-option
                  v-for="item in Relationship_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国籍" prop="nationality">
              <el-select v-model="ruleForm.nationality" placeholder="请选择国籍">
                <el-option
                  v-for="item in Country_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="工作单位">
              <el-input v-model="ruleForm.employer" maxlength="100" placeholder="请填写工作单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担任职位">
              <el-input v-model="ruleForm.position" maxlength="15" placeholder="请填写担任职位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮件">
              <el-input v-model="ruleForm.email" maxlength="30" placeholder="请填写电子邮件"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="办公电话">
              <el-input v-model="ruleForm.office_phone" maxlength="20" placeholder="请填写办公电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="移动电话" prop="telephone">
              <el-input v-model="ruleForm.telephone" maxlength="20" placeholder="请填写移动电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭电话" prop="home_phone">
              <el-input v-model="ruleForm.home_phone" maxlength="20" placeholder="请填写家庭电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="紧急联系级别" label-width="110">
              <el-select v-model="ruleForm.emergency_contact_grade" placeholder="紧急联系人级别">
                <el-option
                  v-for="item in EmergencyContactGrade_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首选联系方式" label-width="110">
              <el-select v-model="ruleForm.primary_contact_way" placeholder="请选择首选联系方式">
                <el-option
                  v-for="item in PrimaryContactWay_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="家长第一语言" label-width="110">
              <el-select v-model="ruleForm.primary_language" placeholder="请选择学生第一语言">
                <el-option
                  v-for="item in Language_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学生第二语言" label-width="110">
              <el-select v-model="ruleForm.other_language" placeholder="请选择学生第二语言">
                <el-option
                  v-for="item in Language_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <hr><br>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="checked">设置账号</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号" label-width="40">
              <span>{{ tel_phone }}(默认手机号)</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <span>123456</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelParentInfo">取 消</el-button>
          <el-button type="success" @click="saveEditParent">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  .parentinfo .header p{
    font-size: 14px;
  }
  .parentinfo{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .parentinfo .content{
    min-height: 20px;
    width: 100%;
    margin-top: 10px;
  }
  .parentinfo el-select{
    width: 10%;
  }
  .parentinfo .select-header{
    margin-bottom: 20px;
  }
  .parentinfo >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .parentinfo >>> .el-dialog__footer{
    text-align: center;
  }
</style>
<script>
export default {
  data(){
    return {
      int_url:'/api/common/select/intercity_list/',/*城际*/
      area_url:'/api/common/select/area_list/',/*区域*/
      city_url:'/api/common/select/city_list/',/*省市*/
      brand_url:'/api/common/select/hq_list/',/*品牌*/
      school_url:'/api/common/select/center_list/',/*校园*/
      allOptions_url:'/api/common/select/all_list/',/*紧急联系级别*/
      parent_url:'/api/guardian/guardian/',
      add_par_info:'/api/student/guardian/',
      intercity_list:[],
      area_list:[],
      city_list: [],
      brand_list: [],
      school_list: [],
      EmergencyContactGrade_options:[],
      Language_options:[],
      Relationship_options:[],
      PrimaryContactWay_options:[],
      Country_options:[],
      intercity:'',
      area:'',
      city:'',
      brand:'',
      school:'',
      level:'',
      searchText:'',
      parent_list:[],
      editbrandVisible:false,
      editForm:{},
      rules:{},
      checked:false,
      ruleForm: {
        student:this.$route.params.id,
        name: '',
        relationship: '',
        nationality: '',
        employer: '',
        position: '',
        email: '',
        office_phone: '',
        telephone: '',
        home_phone:'',
        emergency_contact_grade:'',
        primary_contact_way:'',
        primary_language:'',
        other_language:'',
      },
      edit_id:'',
      tel_phone:'',
    }
  },
  mounted:function(){
    this.getIntercityList();
    this.getAreaList();
    this.getCityList();
    this.getBrandList();
    this.getSchoolList();
    this.getAllPotions();
    this.getCountryPotions();
    this.getParentList();
  },
  methods:{
    editParentInfo:function(obj){
      this.editbrandVisible = true;
      this.tel_phone = obj.telephone;
      this.edit_id = obj.id;
      this.ruleForm.student = obj.student;
      this.ruleForm.name = obj.name;
      this.ruleForm.relationship = parseInt(obj.relationship);
      this.ruleForm.nationality = parseInt(obj.nationality);
      this.ruleForm.employer = obj.employer;
      this.ruleForm.position = obj.position;
      this.ruleForm.email = obj.email;
      this.ruleForm.office_phone = obj.office_phone;
      this.ruleForm.telephone = obj.telephone;
      this.ruleForm.home_phone = obj.home_phone;
      this.ruleForm.emergency_contact_grade = parseInt(obj.emergency_contact_grade);
      this.ruleForm.primary_contact_way = parseInt(obj.primary_contact_way);
      this.ruleForm.primary_language = parseInt(obj.primary_language);
      this.ruleForm.other_language = parseInt(obj.other_language);
    },
    cancelParentInfo:function(){
      this.editbrandVisible = false;
      this.ruleForm.student = '';
      this.ruleForm.name = '';
      this.ruleForm.relationship = '';
      this.ruleForm.nationality = '';
      this.ruleForm.employer = '';
      this.ruleForm.position = '';
      this.ruleForm.email = '';
      this.ruleForm.office_phone = '';
      this.ruleForm.telephone = '';
      this.ruleForm.home_phone = '';
      this.ruleForm.emergency_contact_grade = '';
      this.ruleForm.primary_contact_way = '';
      this.ruleForm.primary_language = '';
      this.ruleForm.other_language = '';
    },
    interChangeFun:function(){
      this.school = '';
      this.getSchoolList(this.intercity,this.city,this.area,this.brand);
    },
    areaChangeFun:function () {
      this.city = '';
      this.school = '';
      this.getCityList();
      this.getSchoolList();
    },
    brandChangeFun:function(){
      this.getSchoolList();
    },
    /*城际*/
    getIntercityList:function () {
      var _this = this;
      _this.$axios.get(this.int_url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.intercity_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*区域*/
    getAreaList:function () {
      var _this = this;
      _this.$axios.get(this.area_url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.area_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*省市*/
    getCityList:function () {
      var _this = this;
      var url = '';
      if(this.area !== ''){
        url = this.city_url + '?area_id=' + this.area;
      }else{
        url = this.city_url;
      }
      _this.$axios.get(url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.city_list = [];
          this.city_list = res.data.results;
          this.city = '';
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*品牌*/
    getBrandList:function () {
      var _this = this;
      _this.$axios.get(this.brand_url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.brand_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*校园*/
    /*intercity_id 城际，province_id 省份，area_code 区域code,hq_id 品牌*/
    getSchoolList:function () {
      this.intercity,this.city,this.area,this.brand
      var _this = this;
      var url = this.school_url;
      var params = {};
      if(this.intercity !== ''){
        params.intercity_id = this.intercity;
      }
      if(this.city !== ''){
        params.province_id = this.city;
      }
      if(this.area !== ''){
        params.area_id = this.area;
      }
      if(this.brand !== ''){
        params.hq_id = this.brand;
      }
      _this.$axios.get(url,{
        params:params
      }).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.school_list = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getParentList:function () {
      var _this = this;
      var url = this.parent_url;
      var params = {};
      if(this.intercity !== ''){
        params.intercity_id=this.intercity;
      }
      if(this.area !== ''){
        params.province_id=this.area;
      }
      if(this.city !== ''){
        params.intercity_id=this.city;
      }
      if(this.brand !== ''){
        params.intercity_id=this.brand;
      }
      if(this.school !== ''){
        params.intercity_id=this.school;
      }
      if(this.level !== ''){
        params.intercity_id=this.level;
      }
      if(this.searchText !== ''){
        params.searchText=this.searchText;
      }
      _this.$axios.get(url,{
        params:params
      }).then(res=>{
        if(res.status == 200 && res.data.status_code == 1) {
          this.parent_list = res.data.paginated_dict.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    /*联系人级别*/
    getAllPotions:function(){
      var _this = this;
      var data = {
        types:["Relationship","PrimaryContactWay","EmergencyContactGrade","Language"]
      };
      _this.$axios.post(this.allOptions_url,data).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          var options = res.data.results;
          for(var x in options){
            if(options[x].list_name === 'Language'){
              this.Language_options.push(options[x]);
            }else if(options[x].list_name === 'EmergencyContactGrade'){
              this.EmergencyContactGrade_options.push(options[x]);
            }else if(options[x].list_name === 'Relationship'){
              this.Relationship_options.push(options[x]);
            }else if(options[x].list_name === 'PrimaryContactWay'){
              this.PrimaryContactWay_options.push(options[x]);
            }
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getCountryPotions:function(){
      var _this = this;
      var data = {
        types:["Country"]
      };
      _this.$axios.post(this.allOptions_url,data).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.Country_options = res.data.results;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //编辑家长信息
    saveEditParent:function () {
      var url = this.add_par_info + this.edit_id + '/';
      if(this.checked !== false){
        this.ruleForm.create_user = this.checked;
      }else{
        this.$delete(this.ruleForm,'create_user');//vue方法
      }
      console.log(this.ruleForm);
      this.$axios.put(url,this.ruleForm).then(res=>{
        if(res.status == 200){
          this.$message({
            type:'success',
            message:'编辑成功！'
          })
          this.editbrandVisible = false;
          this.getParentList();
          this.cancelParentInfo();
          this.edit_id = '';
        }else{
          this.$message.error('编辑失败');
        }
      }).catch(err=>{

      })
    },
  },
}
</script>
