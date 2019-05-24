<template>
    <div class="basicInfo  clearfix">
        <div class="clearfix">
            <div  class="text-align-center left">
                <div class="" style="width:30%">

                </div>
                <el-form :model="studentInfo" :rules="rules" ref="studentInfo" class="demo-ruleForm" inline="" style="text-align:left">
                    <el-form-item label="头像：" prop="name" label-width="150px" >
                        <el-upload
                            class="avatar-uploader"
                            style="vertical-align:middle"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <br>
                    <el-form-item label="姓名：" prop="name" label-width="150px" >
                        <el-input v-model="studentInfo.name" disabled="disabled" placeholder="请填写姓名" class="w250_input"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称：" label-width="150px">
                        <el-input v-model="studentInfo.nick_name" placeholder="请填写昵称" class="w250_input">
                        </el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="入园日期：" prop="enter_date" label-width="150px" style="text-align:left">
                            <el-date-picker type="date" placeholder="选择首次缴费日期" class="w250_input" v-model="studentInfo.enter_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="首次缴费日期：" label-width="150px" style="text-align:left">
                            <el-date-picker type="date" placeholder="选择首次缴费日期" class="w250_input" v-model="studentInfo.first_pay_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <br>
                    <el-form-item label="证件类型：" prop="certificate_type" label-width="150px">
                        <el-select v-model="studentInfo.certificate_type" placeholder="请选择证件类型" class="w250_input">
                          <el-option
                            v-for="item in CertificateType_options"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号：" prop="certificate_no" label-width="150px">
                        <el-input v-model="studentInfo.certificate_no" placeholder="请填写证件号" class="w250_input"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="属性：" label-width="150px">
                        <el-checkbox-group v-model="newType">
                        <el-checkbox label="is_employee_child" name="type">转园生</el-checkbox>
                        <el-checkbox label="is_owner" name="type">业主</el-checkbox>
                        <el-checkbox label="has_siblings_in_eton" name="type">享受兄弟姐妹折扣</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <br>
                    <el-form-item label="国籍：" label-width="150px" class="w250_input">
                        <el-select v-model="studentInfo.nationality" placeholder="请选择国籍">
                          <el-option
                            v-for="item in Country_options"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="宗教信仰：" label-width="150px" class="w250_input">
                        <el-select v-model="studentInfo.religion" placeholder="请选择宗教信仰">
                          <el-option
                            v-for="item in Belief_options"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="出生日期：" prop="date_of_birth" label-width="150px" class="w250_input">
                            <el-date-picker type="date" placeholder="请选择出生日期" v-model="studentInfo.date_of_birth" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="性别：" prop="gender" label-width="150px">
                        <el-select v-model="studentInfo.gender" placeholder="请选择性别" class="w250_input">
                          <el-option label="男" value="M"></el-option>
                          <el-option label="女" value="F"></el-option>
                        </el-select>
                    </el-form-item>
                    <br>
                    <!--<el-form-item label="意向入学信息**：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                      <el-input v-model="studentInfo.name" placeholder="请填写意向入学信息" class="w250_input"></el-input>
                    </el-form-item>-->
                    <br>
                    <el-form-item label="所在班级：" label-width="150px" class="enroll-info">
                        <el-select v-model="preferred_grade_type_name" disabled="disabled"></el-select>
                        <el-select v-model="preferred_class_type_name" disabled="disabled"></el-select>
                        <el-select v-model="studentInfo.preferred_class" placeholder="">
                          <el-option
                            v-for="item in class_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <br>
                    <!--<el-form-item label="拟入学学年**：" prop="enter_date" label-width="150px" style="text-align:left">
                      <el-select v-model="studentInfo.academic_year" placeholder="请选择学年">
                      <el-option value="" label="全部"></el-option>
                      <el-option
                        v-for="item in year_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="拟入学日期**：" prop="enter_date" label-width="150px" style="text-align:left">
                      <el-date-picker type="date" placeholder="选择拟入学日期" class="w250_input" v-model="studentInfo.enter_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>-->
                    <br>
                    <el-form-item label="学生第一语言：" label-width="150px" class="w250_input">
                          <el-select v-model="studentInfo.primary_language" placeholder="请选择学生第一语言">
                            <el-option
                              v-for="item in Language_options"
                              :key="item.id"
                              :label="item.text"
                              :value="item.id">
                            </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="学生第二语言：" label-width="150px" class="w250_input">
                            <el-select v-model="studentInfo.other_language" placeholder="请选择学生第二语言">
                              <el-option
                                v-for="item in Language_options"
                                :key="item.id"
                                :label="item.text"
                                :value="item.id">
                              </el-option>
                            </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="特长：" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" v-model="studentInfo.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址：" prop="address" label-width="150px" class="enroll-info">
                      <el-select class="select-region" v-model="p_city_id" placeholder="省" @change="proinit(1)">
                        <el-option v-for="pro in provinceList" :label="pro.city_name" :value="pro.id" :key="pro.id"></el-option>
                      </el-select>
                      <el-select class="select-region" v-model="c_city_id" placeholder="市" @change="proinit(2)">
                        <el-option v-for="city in cityList" :label="city.city_name" :value="city.id" :key="city.id"></el-option>
                      </el-select>
                      <el-select class="select-region" v-model="studentInfo.town" placeholder="区">
                        <el-option v-for="town in townList" :label="town.city_name" :value="town.id" :key="town.id"></el-option>
                      </el-select>
                      <el-input v-model="studentInfo.address" style="width: auto;" placeholder="请输入详细地址" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编：" label-width="150px">
                            <el-input v-model="studentInfo.zip_code" placeholder="请输入邮编"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey mr26">取消</button>
            <button class="btn bg-green" @click="submitForm('studentInfo')">保存</button>
        </div>
    </div>
</template>
<style scoped>
    .basicInfo .speciality >>> .el-textarea__inner {
        width: 800px;
        min-height: 150px !important;
    }
    .basicInfo >>> .avatar-uploader .el-upload {
        /* border: 2px dashed #bbb; */
        border-radius: 2px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .basicInfo >>> .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .basicInfo >>> .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 220px;
        line-height: 220px;
        text-align: center;
    }
    .basicInfo .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<script>
export default {
  props:{
    activeName:{
      type:String,
      request:true,
    }
  },
  data() {
    return {
      student_id:this.$route.params.id,
      imageUrl: '',
      rules: {
          name: [
              { required: true, message: '请填写姓名', trigger: 'blur' }
          ],
          enter_date: [
              { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          certificate_type: [
              { required: true, message: '请选择证件类型', trigger: 'blur' }
          ],
          certificate_no: [
              { required: true, message: '请填写证件号', trigger: 'blur' }
          ],
          date_of_birth: [
              {  required: true, message: '请选择出生日期', trigger: 'blur' }
          ],
          gender: [
              { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
      },
      student_url:'/api/student/student/'+this.$route.params.id+'/view_detail/',
      allOptions_url:'/api/common/select/all_list/',
      city_url:'/api/common/select/city_list/',/*省市*/
      year_url:'/api/common/select/academic_year_list/',/*学年*/
      saveStudent:'/api/student/student/'+this.$route.params.id+'/',
      newType:['is_employee_child'],
      preferred_grade_type_name:'',
      preferred_class_type_name:'',
      studentInfo:{
        name: '',
        nick_name: '',
        enter_date: '',
        first_pay_date: '',
        certificate_type: '',
        certificate_no: '',
        nationality: '',
        religion: '',
        date_of_birth: '',
        gender: '',
        is_employee_child: 0,
        is_owner: 0,
        has_siblings_in_eton: 0,
        primary_language: '',
        other_language: '',
        remark: '',
        town: '',
        address: '',
        zip_code: '',
        preferred_class: 1,
      },
      city_list:[],
      class_list:[],
      Language_options:[],/*语言*/
      Belief_options:[],/*宗教*/
      Country_options:[],/*国家*/
      CertificateType_options:[],/*证件*/
      year_list:[],
      provinceList:[],
      cityList:[],
      townList:[],
      p_city_id:'',
      c_city_id:'',
      town_id:'',
    }
  },
  mounted:function(){
    /*if(localStorage.getItem('tabName') === 'first'){*/
      this.getOptions();
      this.getCountryOptions();
      this.getIntercity_list();
      this.getYearList();
      this.getStudentInfo();
    /*}*/
  },
  methods:{
    /*省份*/
    getIntercity_list(){
      var _this = this;
      this.$axios.get(this.city_url,{
        params:{
          level:1
        }
      }).then(res=>{
        _this.provinceList = res.data.results;
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
    getcity_list(){
      var _this = this;
      this.$axios.get(this.city_url,{
        params:{
          level:2,
          father_id:_this.p_city_id
        }
      }).then(res=>{
        _this.cityList = res.data.results;
      }).catch(err=>{
        console.log(err)
      })
    },
    gettown_list(){
      var _this = this;
      this.$axios.get(this.city_url,{
        params:{
          level:3,
          father_id:_this.c_city_id
        }
      }).then(res=>{
        _this.townList = res.data.results;
      }).catch(err=>{

      })
    },
    proinit(type){
      if(type === 1){
        this.c_city_id = "";
        this.studentInfo.town = "";
      } else {
        this.studentInfo.town = "";
      }
    },
    getOptions:function(){
      var _this = this;
      var data = {
        types:["CertificateType","Belief","Language"]
      };
      _this.$axios.post(this.allOptions_url,data).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          var options = res.data.results;
          for(var x in options){
            if(options[x].list_name === 'Language'){
              this.Language_options.push(options[x]);
            }else if(options[x].list_name === 'Belief'){
              this.Belief_options.push(options[x]);
            }else if(options[x].list_name === 'CertificateType'){
              this.CertificateType_options.push(options[x]);
            }
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getCountryOptions:function(){
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
    getStudentInfo:function(){
      var _this = this;
      _this.$axios.get(this.student_url).then(res=>{
        _this.loading = false;
        if(res.status == 200 && res.data.status_code == 1) {
          this.class_list = res.data.detail.class_list;
          this.studentInfo.name = res.data.detail.name;
          this.studentInfo.nick_name = res.data.detail.nick_name;
          this.studentInfo.enter_date = res.data.detail.enter_date;
          this.studentInfo.first_pay_date = res.data.detail.first_pay_date;
          this.studentInfo.certificate_type = parseInt(res.data.detail.certificate_type);
          this.studentInfo.certificate_no = res.data.detail.certificate_no;
          this.studentInfo.nationality = parseInt(res.data.detail.nationality);
          this.studentInfo.religion = parseInt(res.data.detail.religion);
          this.studentInfo.date_of_birth = res.data.detail.date_of_birth;
          this.studentInfo.gender = res.data.detail.gender;
          this.studentInfo.is_employee_child = res.data.detail.is_employee_child;
          this.studentInfo.is_owner = res.data.detail.is_owner;
          this.studentInfo.has_siblings_in_eton = res.data.detail.has_siblings_in_eton;
          this.studentInfo.primary_language = res.data.detail.primary_language;
          this.studentInfo.other_language = res.data.detail.other_language;
          this.studentInfo.remark = res.data.detail.remark;
          this.studentInfo.town = res.data.detail.town;
          this.studentInfo.address = res.data.detail.address;
          this.studentInfo.zip_code = res.data.detail.zip_code;
          this.studentInfo.preferred_class = res.data.detail.preferred_class;
          this.preferred_grade_type_name = res.data.detail.preferred_grade_type_name;
          this.preferred_class_type_name = res.data.detail.preferred_class_type_name;
          this.newType = [];
          this.town_id = '';
          var falsg = false;
          if(res.data.detail.is_employee_child == 1){
            this.newType.push('is_employee_child');
            falsg = true;
          }
          if(res.data.detail.is_owner == 1){
            this.newType.push('is_owner');
            falsg = true;
          }
          if(res.data.detail.has_siblings_in_eton == 1){
            this.newType.push('has_siblings_in_eton');
            falsg = true;
          }
          if(falsg === false){
            this.newType.push('is_employee_child');
          }
          this.p_city_id = res.data.detail.province_city.province;
          /*this.getcity_list();*/
          this.c_city_id = res.data.detail.province_city.city;
          /*this.gettown_list();*/
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for(var x in this.newType){
            if(this.newType[x] === 'is_employee_child'){
              this.studentInfo.is_employee_child = 1;
            }
            if(this.newType[x] === 'is_owner'){
              this.studentInfo.is_owner = 1;
            }
            if(this.newType[x] === 'has_siblings_in_eton'){
              this.studentInfo.has_siblings_in_eton = 1;
            }
          }
          console.log(this.studentInfo);
          this.$axios.put(this.saveStudent,this.studentInfo).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
              /*this.getOptions();
              this.getCountryOptions();
              this.getIntercity_list();
              this.getYearList();*/
              this.getStudentInfo();
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            this.$message.error('编辑失败');
          })
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  watch: {
    'p_city_id'(){
      this.getcity_list();
    },
    'c_city_id'(){
      this.gettown_list();
    },
    activeName: {
      handler(newValue, oldValue) {
        if(newValue === 'first' || localStorage.getItem('tabName') === 'first'){
          this.getOptions();
          this.getCountryOptions();
          this.getIntercity_list();
          this.getYearList();
          this.getStudentInfo();
        }
      },
      deep: true
    },
  }
}
</script>
