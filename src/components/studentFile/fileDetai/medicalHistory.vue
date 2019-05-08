<template>
    <div class="medicalHistory">
        <p>医疗病史：</p>
        <el-table
        class="mt26"
            :data="tableList"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="疾病名称">
            </el-table-column>
            <el-table-column
            prop="date"
            label="患病日期">
            </el-table-column>
            <el-table-column
            prop="medical_advice"
            label="医疗建议/说明">
            </el-table-column>
            <el-table-column
            prop="doctor_name"
            label="家庭医生">
            </el-table-column>
            <el-table-column
            prop="doctor_phone"
            label="联系电话">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <i class="fa fa-pencil green font-size-20 cur" @click="editMed(scope.row)"></i>
                <i class="fa fa-trash red font-size-20 ml10 cur" @click="deleteMed(scope.row)"></i>
              </template>
            </el-table-column>
        </el-table>
        <div class="mt26">
            <p class="recordHead">如果孩子有下列疾病，请详细填写相关信息</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="mt26">
                <el-form-item label="疾病名称：" prop="name" label-width="150px">
                  <el-select v-model="ruleForm.name" placeholder="疾病名称">
                    <el-option v-for="med in medica_options" :label="med" :value="med" :key="med"></el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="患病/诊断日期：" label-width="150px" style="text-align:left">
                    <el-date-picker value-format="yyyy-MM-dd" placeholder="请选择患病/诊断日期" v-model="ruleForm.date"></el-date-picker>
                </el-form-item>
                <el-form-item label="医疗建议/说明：" label-width="150px" style="width:100%" class="speciality">
                    <el-input type="textarea" maxlength="100" placeholder="请输入患病/诊断日期" v-model="ruleForm.medical_advice"></el-input>
                </el-form-item>
                <el-form-item label="家庭/主治医师：" prop="doctor_name" label-width="150px" style="text-align:left">
                     <el-input v-model="ruleForm.doctor_name" placeholder="请输入家庭/主治医师" maxlength="20" style="width:20%"></el-input>
                </el-form-item>
                 <el-form-item label="联系电话：" prop="doctor_phone" label-width="150px" style="text-align:left">
                     <el-input v-model="ruleForm.doctor_phone" placeholder="请输入联系电话" maxlength="20" style="width:20%"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey mr26">取消</button>
            <button class="btn bg-green" @click="submitForm('ruleForm')">保存</button>
        </div>
    </div>
</template>
<style scoped>
  .medicalHistory >>> .el-input__inner{
    width: auto;
  }
</style>
<script>
export default {
    data(){
        return {
            tableList: [],
            medica_options:[
              '贫血症Anemia',
              '阑尾炎Appendicitis',
              '哮喘Asthma',
              '骨裂Bone Fracture',
              '水痘Chickenpox',
              '糖尿病Diabetes',
              '白喉Diphtheria',
              '耳部感染Ear Infection',
              '湿疹Eczema',
              '癫痫症Epilepsy',
              '腺体热Glandular Fever',
              '干草热Hay Fever',
              '心脏病或心脏杂音Heart disease/Heart Murmur',
              '其他'
            ],
            post_url:'http://192.168.199.157:8000/api/student/medical/',
            ruleForm:{
                student:this.$route.params.id,
                id:'',
                name:'',
                medical_advice:'',
                date:'',
                doctor_name:'',
                doctor_phone:""
            },
            rules: {
              name: [
                { required: true, message: '请选择名称', trigger: 'change' }
              ],
              /*medical_advice: [
                { required: true, message: '请选择接种次数', trigger: 'change' }
              ],
              date: [
                { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
              ],*/
            }
        }
    },
    mounted:function(){
        this.getList();
    },
    methods:{
      getList:function () {
          var _this = this;
          this.$axios.get(this.post_url,{
            params:{
              student:this.$route.params.id,
            }
          }).then(res=>{
            _this.tableList = res.data.results;
          }).catch(err=>{
            console.log(err)
          })
      },
      editMed:function(obj){
          this.ruleForm.student = this.$route.params.id;
          this.ruleForm.id = obj.id;
          this.ruleForm.name = obj.name;
          this.ruleForm.medical_advice = obj.medical_advice;
          this.ruleForm.date = obj.date;
          this.ruleForm.doctor_name = obj.doctor_name;
          this.ruleForm.doctor_phone = obj.doctor_phone;
      },
      cancelMed:function(){
        this.ruleForm.student = this.$route.params.id;
        this.ruleForm.id = '';
        this.ruleForm.name = '';
        this.ruleForm.medical_advice = '';
        this.ruleForm.date = '';
        this.ruleForm.doctor_name = '';
        this.ruleForm.doctor_phone = '';
      },
      deleteMed:function(obj){
          this.$axios.delete(this.post_url + obj.id +'/').then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'删除成功！'
              })
              this.getList();
            }else{
              this.$message.error('删除失败');
            }
          }).catch(err=>{
            console.log(err)
          })
      },
      submitForm:function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if(this.ruleForm.id === ''){
              this.$axios.post(this.post_url,this.ruleForm).then(res=>{
                if(res.status == 200){
                  this.$message({
                    type:'success',
                    message:'保存成功！'
                  })
                  this.getList();
                  this.cancelMed();
                }else{
                  this.$message.error('保存失败');
                }
              }).catch(err=>{
                console.log(err)
              })
            }else{
              this.$axios.put(this.post_url + this.ruleForm.id +'/',this.ruleForm).then(res=>{
                if(res.status == 200){
                  this.$message({
                    type:'success',
                    message:'编辑成功！'
                  })
                  this.getList();
                  this.cancelMed();
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
      }
    }
}
</script>
