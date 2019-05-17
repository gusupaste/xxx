<template>
    <div class="immunologicalRecord">
        <p>免疫记录：</p>
        <el-table
        class="mt26"
            :data="tableList"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="疫苗">
            </el-table-column>
            <el-table-column
            prop="first_vaccination_date"
            label="第一次接种">
            </el-table-column>
            <el-table-column
            prop="second_vaccination_date"
            label="第二次接种">
            </el-table-column>
            <el-table-column
            prop="third_vaccination_date"
            label="第三次接种">
            </el-table-column>
            <el-table-column
            prop="fourth_vaccination_date"
            label="第四次接种">
            </el-table-column>
            <el-table-column
            prop="fifth_vaccination_date"
            label="第五次接种">
            </el-table-column>
            <el-table-column
              label="操作">
                <template slot-scope="scope">
                  <el-button type="text" class="red" @click="editPre(scope.row)">
                    <i class="fa fa-pencil green cur"></i>
                  </el-button>
                  <el-button type="text"class="red" @click="deleteVisible = true;deleteId = scope.row.id">
                    <i class="fa fa-trash red cur"></i>
                  </el-button>
                  <!--<i class="fa fa-pencil green font-size-20 cur" @click="editPre(scope.row)"></i>
                  <i class="fa fa-trash red font-size-20 ml10 cur" @click="deletePre(scope.row)"></i>-->
                </template>
            </el-table-column>
        </el-table>
        <p style="line-height: 35px;">
          <el-button type="text"class="red" @click="ruleFormShow = true" v-bind:disabled="ruleFormShow === true">
            <i class="el-icon-circle-plus font-size-14 cur">添加疫苗接种记录</i>
          </el-button>
        </p>
        <div class="mt26" v-if="ruleFormShow">
            <p class="recordHead">添加/编辑疫苗接种记录</p>
            <el-form :model="form" :rules="rules" ref="form" class="mt26">
                <el-form-item label="疫苗名称：" prop="name" label-width="150px">
                    <el-select v-model="form.name" placeholder="疫苗名称">
                      <el-option v-for="name in nameList" :label="name" :value="name" :key="name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接种次数：" prop="frequ" label-width="150px">
                    <el-select v-model="form.frequ" placeholder="请选择" @change="frequChange">
                      <el-option v-for="fre in frequencyList" :label="fre.name" :value="fre.id" :key="fre.id"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="接种时间：" prop="date" label-width="150px" style="text-align:left">
                    <el-date-picker type="date" value-format="yyyy-MM-dd"
                                    placeholder="选择接种日期" v-model="form.date"></el-date-picker>
                </el-form-item>
                 <el-form-item label="是否接种：" label-width="150px" style="text-align:left">
                     <el-radio v-model="form.radio" label="1">是</el-radio>
                     <el-radio v-model="form.radio" label="0">否</el-radio>
                </el-form-item>
                <el-form-item style="text-align: center">
                  <button class="btn bg-grey mr26" @click="cacelImmune">取消</button>
                  <button type="primary" class="btn bg-green" @click="saveImmune('form')">保存</button>
                </el-form-item>
            </el-form>
        </div>
      <el-dialog title="确认删除" :visible.sync="deleteVisible" width="400px">
        <p class="mt26 text-align-center">确认删除该条记录？</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="success" @click="deletePre">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<style scoped>
    .immunologicalRecord .recordHead {
        border-bottom: 1px solid #bbb;
        color:#101010;
        font-size: 16px;
        font-weight: 600;
        padding: 10px;
    }
    .immunologicalRecord >>> .el-input__inner{
      width: auto;
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
            deleteId:'',
            deleteVisible:false,
            ruleFormShow:false,
            nameList:['小儿麻痹症(TOPV-Tri-Oral-Polio-Vaccine)',
              '白喉百日咳破伤风(白百破)Diphtheria Pertussis Tetanus(DPT)',
              '白喉破伤风Purified Diphtheria Tetanus(DT)',
              '麻疹,腮腺炎,风疹(MMR)',
              '甲型肝炎Hepatitis A(HepA)',
              '乙型肝炎Hepatitis B(HepB)',
              '日本脑炎(乙脑)Japanese B Encephalitis(JEV)',
              '狂犬疫苗Rabies(RAB)',
              '肺结核Tuberculosis疫苗(B.G.G)',
              '肺结核Tuberculosis检验(PPD/曼托试验)',
              '伤寒Typhoid',
              '其他'
            ],
            frequencyList:[
              {
                id:'first_vaccination_date',
                name:'第一次（1st）',
              },
              {
                id:'second_vaccination_date',
                name:'第二次（2nd）',
              },
              {
                id:'third_vaccination_date',
                name:'第三次（3rd）',
              },
              {
                id:'fourth_vaccination_date',
                name:'第四次（4th）',
              },
              {
                id:'fifth_vaccination_date',
                name:'第五次（5th）',
              },
            ],
            list_url:'/api/student/vaccination/',
            tableList: [],
            form:{
                id:'',
                name:'',
                frequ:'',
                date:'',
                radio:"1"
            },
            rules: {
              name: [
                { required: true, message: '请选择疫苗名称', trigger: 'change' }
              ],
              frequ: [
                { required: true, message: '请选择接种次数', trigger: 'change' }
              ],
              date: [
                { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
              ],
            },
            changeTime:[],
        }
    },
    /*mounted:function(){
        this.getList();
    },*/
    methods:{
        getList:function () {
            var _this = this;
            this.$axios.get(this.list_url,{
              params:{
                student:this.$route.params.id,
              }
            }).then(res=>{
              _this.tableList = res.data.results;
            }).catch(err=>{
              console.log(err)
            })
        },
        saveImmune:function (formName) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              var _this = this;
              var data = {
                student:this.$route.params.id,
                name:this.form.name,
              };
              if(this.form.frequ === 'first_vaccination_date'){
                data.first_vaccination_date = this.form.date;
                data.first_status = this.form.radio;
              }else if(this.form.frequ === 'second_vaccination_date'){
                data.second_vaccination_date = this.form.date;
                data.second_status = this.form.radio;
              }else if(this.form.frequ === 'third_vaccination_date'){
                data.third_vaccination_date = this.form.date;
                data.third_status = this.form.radio;
              }else if(this.form.frequ === 'fourth_vaccination_date'){
                data.fourth_vaccination_date = this.form.date;
                data.fourth_status = this.form.radio;
              }else if(this.form.frequ === 'fifth_vaccination_date'){
                data.fifth_vaccination_date = this.form.date;
                data.fifth_status = this.form.radio;
              }
              if(this.form.id === ''){
                this.$axios.post(this.list_url,data).then(res=>{
                  if(res.status == 200){
                    this.$message({
                      type:'success',
                      message:'保存成功！'
                    })
                    this.ruleFormShow = false;
                    this.cacelImmune();
                    this.getList();
                  }else{
                    this.$message.error('保存失败');
                  }
                }).catch(err=>{
                  console.log(err)
                })
              }else{
                this.$axios.put(this.list_url + this.form.id +'/',data).then(res=>{
                  if(res.status == 200){
                    this.$message({
                      type:'success',
                      message:'编辑成功！'
                    })
                    this.ruleFormShow = false;
                    this.getList();
                    this.cacelImmune();
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
        cacelImmune:function(){
          this.ruleFormShow = false;
          this.form.id='';
          this.form.name='';
          this.form.frequ='';
          this.form.date='';
          this.form.radio='1';
        },
        frequChange:function () {
            var index = this.changeTime.findIndex(item => item.name === this.form.frequ, 1);
            if(index != -1){
              this.form.date=this.changeTime[index].date;
              this.form.radio=this.changeTime[index].radio;
            }else{
              this.form.date='';
              this.form.radio='1';
            }

        },
        editPre:function (obj) {
            this.changeTime = [];
            this.ruleFormShow=true;
            this.form.name=obj.name;
            this.form.id=obj.id;
            if(obj.fifth_vaccination_date !== "" && obj.fifth_vaccination_date !== null){
              var ct = {};
              ct.name = 'fifth_vaccination_date';
              ct.date = obj.fifth_vaccination_date;
              this.form.frequ='fifth_vaccination_date';
              this.form.date=obj.fifth_vaccination_date;
              if(obj.fifth_status == true){
                this.form.radio='1';
                ct.radio = '1';
              }else{
                this.form.radio='0';
                ct.radio = '0';
              }
              this.changeTime.push(ct);
            }
            if(obj.fourth_vaccination_date !== "" && obj.fourth_vaccination_date !== null){
              var ct = {};
              ct.name = 'fourth_vaccination_date';
              ct.date = obj.fourth_vaccination_date;
              this.form.frequ='fourth_vaccination_date';
              this.form.date=obj.fourth_vaccination_date;
              if(obj.fourth_status == true){
                this.form.radio='1';
                ct.radio = '1';
              }else{
                this.form.radio='0';
                ct.radio = '0';
              }
              this.changeTime.push(ct);
            }
            if(obj.third_vaccination_date !== "" && obj.third_vaccination_date !== null){
              var ct = {};
              ct.name = 'third_vaccination_date';
              ct.date = obj.third_vaccination_date;
              this.form.frequ='third_vaccination_date';
              this.form.date=obj.third_vaccination_date;
              if(obj.third_status == true){
                this.form.radio='1';
                ct.radio = '1';
              }else{
                this.form.radio='0';
                ct.radio = '0';
              }
              this.changeTime.push(ct);
            }
            if(obj.second_vaccination_date !== "" && obj.second_vaccination_date !== null){
              var ct = {};
              ct.name = 'second_vaccination_date';
              ct.date = obj.second_vaccination_date;
              this.form.frequ='second_vaccination_date';
              this.form.date=obj.second_vaccination_date;
              if(obj.second_status == true){
                this.form.radio='1';
                ct.radio = '1';
              }else{
                this.form.radio='0';
                ct.radio = '0';
              }
              this.changeTime.push(ct);
            }
            if(obj.first_vaccination_date !== "" && obj.first_vaccination_date !== null){
              var ct = {};
              ct.name = 'first_vaccination_date';
              ct.date = obj.first_vaccination_date;
              this.form.frequ='first_vaccination_date';
              this.form.date=obj.first_vaccination_date;
              if(obj.first_status == true){
                this.form.radio='1';
                ct.radio = '1';
              }else{
                this.form.radio='0';
                ct.radio = '0';
              }
              this.changeTime.push(ct);
            }
        },
        deletePre:function () {
            this.ruleFormShow = false;
            this.$axios.delete(this.list_url + this.deleteId +'/').then(res=>{
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
    },
    mounted:function(){
      if(localStorage.getItem('tabName') === 'third'){
        this.getList();
      }
    },
    watch:{
      activeName: {
        handler(newValue, oldValue) {
          if(newValue === 'third'){
            this.getList();
          }
        },
        deep: true
      },
    },
}
</script>
