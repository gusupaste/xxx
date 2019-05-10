<template>
  <div class='academicyear wrap'>
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">学年定义</span></p>
    </div>
    <div class="content">
      <el-col class="box-margin" :span="7">
        <el-card shadow="always">
          <div class="div-add-button" @click="addDialog(0)">
            <br><span class="el-icon-circle-plus-outline"></span><p>新增学年</p>
            </div>
        </el-card>
      </el-col>
      <el-col class="box-margin" :span="7" v-for="item in acad_yearlist">
        <el-card shadow="always">
          <div class="div-box-term">
            <p class="font-cl-blue">{{ item.start_year }} -- {{ item.end_year }}学年<i class="fa fa-pencil-square-o orange right" @click="addDialog(1,item)"></i></p>
            <p class="font-size-12">{{ item.total_year_range }}</p>
            <hr class="line-solid"/>
            <ul class="ul-color">
              <li><span>上学期：{{ item.first_term_range }}</span></li>
              <br>
              <li><span>下学期：{{ item.second_term_range }}</span></li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </div>
    <!--新增学年 弹框-->
    <el-dialog :title="title" :visible.sync="addacademicYear" width="600px" style="padding: 30px 60px;">
      <el-form label-width="80px" :model="rulesForm" ref="rulesForm" :rules="rules">
        <el-form-item label="学年名:" required>
          <el-col :span="8">
            <el-form-item prop="start_year">
              <el-date-picker v-model="rulesForm.start_year"
                              value-format="yyyy"
                              type="year"
                              :disabled="yearDisableFlag"
                              placeholder="选择年"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line text-align-center" :span="2">-</el-col>
          <el-col :span="8">
            <el-input v-model="rulesForm.end_year" type="text" maxlength="100" disabled="disabled"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上学期：" required>
          <el-col :span="8">
            <el-form-item prop="first_term_start">
              <el-date-picker type="date" placeholder="选择日期"
                              :picker-options="pickerOptionsStart"
                              value-format="yyyy-MM-dd"
                              :disabled="firstStart"
                              v-model="rulesForm.first_term_start" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line text-align-center" :span="2">-</el-col>
          <el-col :span="8">
            <el-form-item prop="first_term_end">
              <el-date-picker type="date"
                              :picker-options="pickerOptionsEnd"
                              value-format="yyyy-MM-dd"
                              :disabled="firstEnd"
                              placeholder="选择日期" v-model="rulesForm.first_term_end" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="下学期：" required>
          <el-col :span="8">
            <el-form-item prop="second_term_start">
              <el-date-picker type="date"
                              :picker-options="pickerOptionsStart2"
                              value-format="yyyy-MM-dd"
                              :disabled="secondStart"
                              placeholder="选择日期" v-model="rulesForm.second_term_start" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line text-align-center" :span="2">-</el-col>
          <el-col :span="8">
            <el-form-item prop="second_term_end">
              <el-date-picker type="date"
                              :picker-options="pickerOptionsEnd2"
                              value-format="yyyy-MM-dd"
                              :disabled="secondEnd"
                              placeholder="选择日期" v-model="rulesForm.second_term_end" style="width: 100%;"></el-date-picker>
              </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="rulesForm.remarks" type="textarea" maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="canael">取 消</el-button>
          <el-button type="success" @click="saveAcadYear('rulesForm')">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        list_url:'http://192.168.1.197:8000/api/common/academic_year/',
        title:'新增学年',
        acad_yearlist:[],
        addacademicYear: false,
        rulesForm:{
          start_year:'',
          end_year:'',
          first_term_start:'',
          first_term_end:'',
          second_term_start:'',
          second_term_end:'',
          remarks:'',
        },
        pickerOptionsStart: {
          disabledDate: time => {
            let startYear = this.rulesForm.start_year + '-01-01';
            let endDateVal = this.rulesForm.first_term_end;
            let endYear = endDateVal || (this.rulesForm.start_year+1) + '-12-31';
            if (endDateVal) {
              return time.getTime() < (new Date(startYear).getTime() - 1  * 60 * 60 * 1000) || time.getTime() > new Date(endYear).getTime();
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let startYear = this.rulesForm.start_year + '-01-01';
            let endDateVal = this.rulesForm.first_term_end;
            let beginDateVal = this.rulesForm.first_term_start;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() + 1  * 60 * 60 * 1000
              );
            }
          }
        },
        pickerOptionsStart2: {
          disabledDate: time => {
            let endDateVal = this.rulesForm.second_term_end;
            let startDateVal = this.rulesForm.first_term_end || this.rulesForm.first_term_start;;
            if (endDateVal) {
              return (new Date(startDateVal).getTime() + 1  * 60 * 60 * 1000 > time.getTime()
                || time.getTime() > new Date(endDateVal).getTime() - 1  * 60 * 60 * 1000);
            }
          }
        },
        pickerOptionsEnd2: {
          disabledDate: time => {
            let beginDateVal = this.rulesForm.second_term_start;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() + 1  * 60 * 60 * 1000
              );
            }
          }
        },
        yearDisableFlag:false,
        firstStart:true,
        firstEnd:true,
        secondStart:true,
        secondEnd:true,
        editId:'',
        rules:{
          start_year: [
            { required: true, message: '请选择时间', trigger: 'change' },
          ],
          first_term_start: [
            { required: true, message: '开始日期不能为空', trigger: 'change' },
          ],
          first_term_end: [
            {  required: true, message: '结束日期不能为空', trigger: 'change' },
          ],
          second_term_start: [
            { required: true, message: '开始日期不能为空', trigger: 'change' },
          ],
          second_term_end: [
            { required: true, message: '结束日期不能为空', trigger: 'change' },
          ],
        },

      };
    },
    mounted:function(){
      this.getYearList();
    },
    methods: {
      canael:function(){
        this.addacademicYear = false
        this.rulesForm.start_year='';
        this.rulesForm.end_year='';
        this.rulesForm.first_term_start='';
        this.rulesForm.first_term_end='';
        this.rulesForm.second_term_start='';
        this.rulesForm.second_term_end='';
        this.rulesForm.remarks='';
      },
      saveAcadYear:function(formName){
        var _this = this;
        console.log(this.rulesForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.yearDisableFlag == false){
              _this.$axios.post(this.list_url,this.rulesForm).then(res=>{
                if(res.data.status_code == 1) {
                  _this.$message({
                    type:'success',
                    message:'保存成功！'
                  })
                  this.canael();
                  this.getYearList();
                } else {
                  _this.$message({
                    type:'warning',
                    message:res.data.message,
                  })
                }
              }).catch(err=>{
                // console.log(err.message)
              })
            }else{
              var url = this.list_url + this.editId +'/';
              _this.$axios.put(url,this.rulesForm).then(res=>{
                if(res.data.status_code == 1) {
                  _this.$message({
                    type:'success',
                    message:'编辑成功！'
                  })
                  this.canael();
                  this.getYearList();
                } else {
                  _this.$message({
                    type:'warning',
                    message:res.data.message,
                  })
                }
              }).catch(err=>{
                // console.log(err.message)
              })
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getYearList(){
        var _this = this;
        _this.$axios.get(this.list_url).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            this.acad_yearlist = res.data.academic_year_list;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      addDialog: function (num,obj) {
        if(num === 0){
          this.title = '新增学年'
          this.yearDisableFlag = false;
        }else{
          this.yearDisableFlag = true;
          this.editId = obj.id;
          this.title = '编辑学年'
          this.rulesForm.start_year = obj.start_year.toString();
          this.rulesForm.end_year = obj.end_year;
          this.rulesForm.first_term_start = obj.first_term_start;
          this.rulesForm.first_term_end = obj.first_term_end;
          this.rulesForm.second_term_start = obj.second_term_start;
          this.rulesForm.second_term_end = obj.second_term_end;
          this.rulesForm.remarks = obj.remarks;
        }
          this.addacademicYear = true;
      }
    },
    watch:{
      'rulesForm.start_year'(newValue, oldValue){
        if(newValue === ''){
          this.rulesForm.end_year = '';
          this.firstStart=true;
          this.firstEnd=true;
          this.secondStart=true;
          this.secondEnd=true;
        }else{
          this.rulesForm.end_year = parseInt(newValue) + 1;
          this.firstStart=false;
          this.firstEnd=false;
          this.secondStart=false;
          this.secondEnd=false;
        }
      }
    },
  }
</script>

<style scoped>
  .academicyear {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .academicyear .header p {
    font-size: 14px;
  }
  .academicyear .div-add-button{
    cursor: pointer;
    width: 100%;
    text-align: center;
    color: #0b6289;
    height: 150px;
  }
  .academicyear .el-icon-circle-plus-outline{
    font-size: 70px;
  }
  .academicyear .box-margin{
    margin: 10px 50px 20px 0;
  }
  .academicyear .div-box-term{
    width: 100%;
    text-align: left;
    height: 150px;
  }
  .academicyear .line-solid{
    width: 100%;
    text-align: center;
    margin: 10px 0;
    color: #ccc;
  }
  .academicyear .ul-color{
    margin: 20px;
    color: #ccc;
  }
  .academicyear .ul-color span{
    color: black;
  }
  .academicyear >>>.el-dialog__footer{
    text-align: center;
  }
  .academicyear >>>.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: auto;
  }

</style>
