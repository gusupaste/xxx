<template>
    <div class="parentInfo">
        <p>家长信息：</p>
        <el-table
            class="mt26"
            :data="parentlist"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="家长姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="relationship_name"
            label="关系">
            </el-table-column>
            <el-table-column
            prop="nationality_name"
            label="国籍">
            </el-table-column>
            <el-table-column
            prop="telephone"
            label="移动电话">
            </el-table-column>
            <el-table-column
            prop="home_phone"
            label="家庭电话">
            </el-table-column>
            <el-table-column
            prop="office_phone"
            label="办公室电话">
            </el-table-column>
            <el-table-column
            prop="email"
            label="电子邮件">
            </el-table-column>
            <el-table-column
            prop="primary_contact_way_name"
            label="首选联系方式">
            </el-table-column>
            <el-table-column
            prop="emergency_contact_grade_name"
            label="紧急联系级别">
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作">
              <template slot-scope="scope">
                <el-button type="text"class="red" @click="editParentInfo(scope.row)" v-bind:disabled="ruleFormShow === true">
                  <i class="fa fa-pencil green cur"></i>
                </el-button>
                <el-button type="text"class="red" @click="deleteParentInfo(scope.row.id)">
                  <i class="fa fa-trash red cur"></i>
                </el-button>
                <!--<i class="fa fa-pencil green font-size-20 cur" @click="editParentInfo(scope.row)" ></i>-->
                <!--<i class="fa fa-trash red font-size-20 ml10 cur" @click="deleteParentInfo(scope.row.id)"></i>-->
              </template>
            </el-table-column>
        </el-table>
        <p style="line-height: 35px;">
          <el-button type="text"class="red" @click="ruleFormShow = true" v-bind:disabled="ruleFormShow === true">
            <i class="el-icon-circle-plus font-size-14 cur">添加家长</i>
          </el-button>
        </p>
        <div v-if="ruleFormShow">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm mt26" inline="" style="text-align:left" >
            <el-form-item label="家长姓名：" prop="name" label-width="150px" >
              <el-input v-model="ruleForm.name" maxlength="20" placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="关系：" prop="relationship" label-width="150px">
              <el-select v-model="ruleForm.relationship" placeholder="请选择关系">
                <el-option
                  v-for="item in Relationship_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国籍：" prop="nationality" label-width="150px">
              <el-select v-model="ruleForm.nationality" placeholder="请选择国籍">
                <el-option
                  v-for="item in Country_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作单位：" label-width="150px">
              <el-input v-model="ruleForm.employer" maxlength="100" placeholder="请填写工作单位"></el-input>
            </el-form-item>
            <el-form-item label="担任职位：" label-width="150px">
              <el-input v-model="ruleForm.position" maxlength="15" placeholder="请填写担任职位"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件：" label-width="150px">
              <el-input v-model="ruleForm.email" maxlength="30" placeholder="请填写电子邮件"></el-input>
            </el-form-item>
            <el-form-item label="办公电话：" label-width="150px">
              <el-input v-model="ruleForm.office_phone" maxlength="20" placeholder="请填写办公电话"></el-input>
            </el-form-item>
            <el-form-item label="移动电话：" prop="telephone" label-width="150px">
              <el-input v-model="ruleForm.telephone" maxlength="20" placeholder="请填写移动电话"></el-input>
            </el-form-item>
            <el-form-item label="家庭电话：" prop="home_phone" label-width="150px">
              <el-input v-model="ruleForm.home_phone" maxlength="20" placeholder="请填写家庭电话"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="紧急联系人级别：" label-width="150px">
              <el-select v-model="ruleForm.emergency_contact_grade" placeholder="紧急联系人级别">
                <el-option
                  v-for="item in EmergencyContactGrade_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="首选联系方式：" label-width="150px">
              <el-select v-model="ruleForm.primary_contact_way" placeholder="请选择首选联系方式">
                <el-option
                  v-for="item in PrimaryContactWay_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="家长第一语言：" label-width="150px">
              <el-select v-model="ruleForm.primary_language" placeholder="请选择学生第一语言">
                <el-option
                  v-for="item in Language_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学生第二语言：" label-width="150px">
              <el-select v-model="ruleForm.other_language" placeholder="请选择学生第二语言">
                <el-option
                  v-for="item in Language_options"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="mt26 text-align-center">
            <button class="btn bg-grey mr26" @click="cancelParentInfo">取消</button>
            <button class="btn bg-green" @click="addParentInfo('ruleForm')">保存</button>
          </div>
        </div>
    </div>
</template>
<style scoped>
    .parentInfo th ,.parentInfo td {
        text-align: center !important;
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
    data(){
        return {
            ruleFormShow:false,
            parentlist: [],
            Language_options:[],
            EmergencyContactGrade_options:[],
            Relationship_options:[],
            PrimaryContactWay_options:[],
            Country_options:[],
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
            editFlag:false,
            imageUrl: '',
            allOptions_url:'/api/common/select/all_list/',
            add_par_info:'/api/student/guardian/',
            rules: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                relationship: [
                    { required: true, message: '请选择关系', trigger: 'change' }
                ],
                nationality: [
                    { required: true, message: '请选择国籍', trigger: 'change' }
                ],
                telephone: [
                    { required: true, message: '请填写移动电话', trigger: 'blur' }
                ],
                home_phone: [
                    { required: true, message: '请填写家庭电话', trigger: 'blur' }
                ],
            }
        }
    },
    /*mounted:function(){
        this.getAllPotions();
        this.getCountryPotions();
        this.getParentList();
    },*/
    mounted:function(){
      if(localStorage.getItem('tabName') === 'second'){
        this.getAllPotions();
        this.getCountryPotions();
        this.getParentList();
      }
    },
    watch:{
      activeName: {
        handler(newValue, oldValue) {
          if(newValue === 'second'){
            this.getAllPotions();
            this.getCountryPotions();
            this.getParentList();
          }
        },
        deep: true
      },
    },
    methods:{
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
        editParentInfo:function(obj){
          this.ruleFormShow = true;
          this.edit_id = obj.id;
          this.ruleForm.student = this.$route.params.id;
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
        deleteParentInfo:function(id){
          this.ruleFormShow = false;
          this.$axios.delete(this.add_par_info + id +'/').then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'删除成功！'
              })
              this.getParentList();
            }else{
              this.$message.error('删除失败');
            }
          }).catch(err=>{

          })
        },
        addParentInfo:function(formName){
          this.$refs[formName].validate(valid => {
            if (valid) {
              var _this = this;
              if(this.edit_id === ''){
                _this.$axios.post(this.add_par_info,this.ruleForm).then(res=>{
                  if(res.status == 200){
                    this.$message({
                      type:'success',
                      message:'保存成功！'
                    })
                    this.ruleFormShow = false;
                    this.getParentList();
                    this.cancelParentInfo();
                  }else{
                    this.$message.error('保存失败');
                  }
                }).catch(err=>{
                  console.log(err)
                })
              }else{
                var url = this.add_par_info + this.edit_id + '/'
                this.$axios.put(url,this.ruleForm).then(res=>{
                  if(res.status == 200){
                    this.$message({
                      type:'success',
                      message:'编辑成功！'
                    })
                    this.ruleFormShow = false;
                    this.getParentList();
                    this.cancelParentInfo();
                    this.edit_id = '';
                  }else{
                    this.$message.error('编辑失败');
                  }
                }).catch(err=>{

                })
              }
            }else {
              return false;
            }
          })
        },
        cancelParentInfo:function(){
          this.ruleFormShow = false;
          this.ruleForm.student = this.$route.params.id;
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
        getParentList:function () {
            var _this = this;
            var url = this.add_par_info + '?student=' + this.$route.params.id;
            this.$axios.get(url).then(res=>{
              _this.parentlist = res.data.results;
            }).catch(err=>{
              console.log(err)
            })
          }
        },
}
</script>
