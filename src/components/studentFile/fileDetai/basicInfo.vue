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
                    <el-form-item label="属性：" prop="type"  label-width="150px">
                        <el-checkbox-group v-model="studentInfo.type">
                        <el-checkbox label="转园生" name="type"></el-checkbox>
                        <el-checkbox label="业主" name="type"></el-checkbox>
                        <el-checkbox label="享受兄弟姐妹折扣" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <br>
                    <el-form-item label="国籍：" prop="region" label-width="150px" class="w250_input">
                        <el-select v-model="studentInfo.nationality" placeholder="请选择国籍">
                          <el-option
                            v-for="item in Country_options"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="宗教信仰：" prop="region" label-width="150px" class="w250_input">
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
                    <el-form-item label="意向入学信息：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                      <el-input v-model="studentInfo.name" placeholder="请填写姓名" class="w250_input"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="所在班级：" prop="class_info" label-width="150px" class="enroll-info">
                        <el-select v-model="studentInfo.region" prop="year" placeholder="" disabled="disabled">

                        </el-select>
                        <el-select v-model="studentInfo.region" prop="grade" placeholder="" disabled="disabled">

                        </el-select>
                        <el-select v-model="studentInfo.region" prop="klass" placeholder="">

                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="拟入学学年：" prop="enter_date" label-width="150px" style="text-align:left">
                      <el-date-picker type="date" placeholder="选择拟入学学年" class="w250_input" v-model="studentInfo.enter_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="拟入学日期：" prop="enter_date" label-width="150px" style="text-align:left">
                      <el-date-picker type="date" placeholder="选择拟入学日期" class="w250_input" v-model="studentInfo.enter_date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <br>
                    <el-form-item label="学生第一语言：" prop="date1" label-width="150px" class="w250_input">
                          <el-select v-model="studentInfo.primary_language" placeholder="请选择学生第一语言">
                            <el-option
                              v-for="item in Language_options"
                              :key="item.id"
                              :label="item.text"
                              :value="item.id">
                            </el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="学生第二语言：" prop="date1" label-width="150px" class="w250_input">
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
                    <el-form-item label="特长：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" v-model="studentInfo.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址：" prop="address" label-width="150px" class="enroll-info">
                      <el-select class="select-region" v-model="studentInfo.p_city_id" placeholder="省" @change="proinit(1)">
                        <el-option v-for="pro in provinceList" :label="pro.city_name" :value="pro.city_id" :key="pro.id"></el-option>
                      </el-select>
                      <el-select class="select-region" v-model="c_city_id" placeholder="市" @change="proinit(2)">
                        <el-option v-for="city in cityList" :label="city.city_name" :value="city.city_id" :key="city.id"></el-option>
                      </el-select>
                      <el-select class="select-region" v-model="town_id" placeholder="区">
                        <el-option v-for="town in townList" :label="town.city_name" :value="town.id" :key="town.id"></el-option>
                      </el-select>
                      <el-input v-model="studentInfo.address" style="width: auto;" placeholder="请输入详细地址" maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编：" prop="date1" label-width="150px" class="">
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
  data() {
    return {
      student_id:this.$route.params.id,
      imageUrl: '',
      rules: {
          name: [
              { required: true, message: '请填写姓名', trigger: 'blur' }
          ],
          enter_date: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
          ],
          certificate_type: [
              { required: true, message: '请选择证件类型', trigger: 'blur' }
          ],
          certificate_no: [
              { required: true, message: '请填写证件号', trigger: 'blur' }
          ],
          date_of_birth: [
              { type: 'date', required: true, message: '请选择出生日期', trigger: 'blur' }
          ],
          gender: [
              { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
      },
      student_url:'http://192.168.199.157:8000/api/student/student/'+this.$route.params.id+'/view_detail/',
      allOptions_url:'http://192.168.199.157:8000/api/common/select/all_list/',
      city_url:'http://192.168.199.157:8000/api/common/select/city_list/',/*省市*/
      studentInfo:{
      },
      city_list:[],
      Language_options:[],/*语言*/
      Belief_options:[],/*宗教*/
      Country_options:[],/*国家*/
      CertificateType_options:[],/*证件*/
      provinceList:[],
      cityList:[],
      townList:[],
      c_city_id:'',
      town_id:'',
    }
  },
  /*mounted:function(){
    this.getStudentInfo();
    this.getOptions();
    this.getCountryOptions();
    this.getIntercity_list();
  },*/
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
    getcity_list(){
      var _this = this;
      this.$axios.get(this.city_url,{
        params:{
          level:2,
          father_id:_this.studentInfo.p_city_id
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
        this.studentInfo.c_city_id = "";
        this.studentInfo.town_id = "";
      } else {
        this.studentInfo.town_id = "";
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
          this.studentInfo = res.data.detail;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
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
    'studentInfo.p_city_id'(){
      this.getcity_list();
    },
    'c_city_id'(){
      this.gettown_list();
    },
  }
}
</script>
