<template>
    <div class="allergyStudentRecord">
        <p>过敏记录：</p>
       <el-table
            class="mt26"
            :data="tableList"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="过敏类型"
            width="180">
            </el-table-column>
            <el-table-column
            prop="details"
            label="医疗建议/说明"
            width="180">
            </el-table-column>
            <el-table-column
            prop="action_taken"
            label="处理建议">
            </el-table-column>
           <el-table-column
             label="操作">
             <template slot-scope="scope">
               <el-button type="text"class="red" @click="editAll(scope.row)">
                 <i class="fa fa-pencil green cur"></i>
               </el-button>
               <el-button type="text"class="red" @click="deleteVisible = true;deleteId = scope.row.id">
                 <i class="fa fa-trash red cur"></i>
               </el-button>
               <!--<i class="fa fa-pencil green font-size-20 cur" @click="editAll(scope.row)"></i>
               <i class="fa fa-trash red font-size-20 ml10 cur" @click="deleteAll(scope.row)"></i>-->
             </template>
           </el-table-column>
        </el-table>
        <p style="line-height: 35px;">
          <el-button type="text"class="red" @click="ruleFormShow = true" v-bind:disabled="ruleFormShow === true">
            <i class="el-icon-circle-plus font-size-14 cur">添加过敏记录</i>
          </el-button>
        </p>
        <div class="mt26" v-if="ruleFormShow">
            <p class="recordHead">添加/编辑过敏记录</p>
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" class="mt26">
                <el-form-item label="过敏类型：" prop="name" label-width="150px">
                  <el-select v-model="ruleForm.name" placeholder="请选择过敏类型">
                    <el-option v-for="tyep in type_options" :label="tyep" :value="tyep" :key="tyep"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="症状说明：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" placeholder="请输入症状说明" maxlength="100" v-model="ruleForm.details"></el-input>
                </el-form-item>
                <el-form-item label="处理建议：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" placeholder="请输入处理建议"  maxlength="100" v-model="ruleForm.action_taken"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="mt26 text-align-center" v-if="ruleFormShow">
            <button class="btn bg-grey mr26" @click="cancelAll">取消</button>
            <button class="btn bg-green" @click="submitForm('ruleForm')">保存</button>
        </div>
      <el-dialog title="确认删除" :visible.sync="deleteVisible" width="400px">
        <p class="mt26 text-align-center">确认删除该条记录？</p>
        <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="deleteVisible = false">取 消</el-button>
          <el-button class="bg-green bd-green white" type="success" @click="deleteAll">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<style scoped>

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
            deleteId:'',
            deleteVisible:false,
            ruleFormShow:false,
            tableList: [],
            type_options:['食物过敏','药物过敏','其他'],
            ruleForm:{
                student:this.$route.params.id,
                id:'',
                name:'',
                action_taken:'',
                details:'',
            },
            rules: {
              name: [
                {required: true, message: '请选择过敏类型', trigger: 'change'}
              ],
            },
            post_url:'/api/student/allergy/',
        }
    },
    /*mounted:function(){
      this.getList();
    },*/
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
      editAll:function(obj){
        this.ruleFormShow = true;
        this.ruleForm.student = this.$route.params.id;
        this.ruleForm.id = obj.id;
        this.ruleForm.name = obj.name;
        this.ruleForm.action_taken = obj.action_taken;
        this.ruleForm.details = obj.details;
      },
      cancelAll:function(){
        this.ruleFormShow = false;
        this.ruleForm.student = this.$route.params.id;
        this.ruleForm.id = '';
        this.ruleForm.name = '';
        this.ruleForm.action_taken = '';
        this.ruleForm.details = '';
      },
      deleteAll:function(){
        this.ruleFormShow = false;
        this.$axios.delete(this.post_url + this.deleteId +'/').then(res=>{
          if(res.status == 200){
            this.$message({
              type:'success',
              message:'删除成功！'
            })
            this.deleteVisible = false;
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
                  this.cancelAll();
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
                  this.cancelAll();
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
    },
    mounted:function(){
      if(localStorage.getItem('studentTabName') === 'sixth'){
        this.getList();
      }
    },
    watch:{
      activeName: {
        handler(newValue, oldValue) {
          if(newValue === 'sixth'){
            this.getList();
          }
        },
        deep: true
      },
    }
}
</script>
