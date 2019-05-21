<template>
  <div class="schooledit wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > 校园列表 > <span class="font-cl-blue">新增校园</span></p>
    </div>
    <p class="bold mt10">请输入新校园的相关系统,并保存提交,带*号的为必填字段。</p>
    <el-form :inline="true"   :label-position="labelPosition" label-width="120px" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline ">
    <div class="content">
      
      <div class="body-content">
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础信息</div>
        <hr class="line-solid">
        <div class="item-wrap">
          <el-form-item label="校园名称(中文):" prop="name">
            <el-input  v-model.trim="formInline.name" placeholder="请输入" maxlength="50" ></el-input>
          </el-form-item>
          <el-form-item label="简称(中文):" prop="short_name">
            <el-input v-model.trim="formInline.short_name" placeholder="请输入" maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="校园名称(英文):">
            <el-input v-model="formInline.other_name" placeholder="请输入" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="简称(英文):">
            <el-input v-model="formInline.other_short_name" placeholder="请输入" maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="校园类型:" prop="hq">
            <el-select v-model="formInline.hq" placeholder="请输入">
              <el-option v-for="(item,index) in schoolType" :key="index" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="园长:">
            <el-input disabled v-model="formInline.principal_name" maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="开园日期:" prop="opening_date">
            <el-date-picker @change="changeDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="formInline.opening_date" type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="当前状态:" prop="status">
            <el-select v-model="formInline.status" placeholder="请输入">
                <el-option label="筹备中" value="0">筹备中</el-option>
                <el-option label="开园" value="1">开园</el-option>
                <el-option label="关园" value="2">关园</el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="地址：" style="margin-right:0" prop="p_city_id">
            <el-select   class="select-region" v-model="formInline.p_city_id" placeholder="省" @change="proinit(1)">
              <el-option v-for="pro in provinceList" :label="pro.city_name" :value="pro.city_id" :key="pro.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-right:0" prop="c_city_id">
            <el-select  class="select-region" v-model="formInline.c_city_id" placeholder="市" @change="proinit(2)">
              <el-option v-for="city in cityList" :label="city.city_name" :value="city.city_id" :key="city.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-right:0" prop="town_id">
            <el-select class="select-region" v-model="formInline.town_id" placeholder="区">
              <el-option v-for="town in townList" :label="town.city_name" :value="town.id" :key="town.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="address">
            <el-input v-model="formInline.address"  placeholder="请输入详细地址" maxlength="100"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="邮政编码:">
            <el-input v-model="formInline.zip_code" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="所属城际:">
            <el-select v-model="formInline.intercity" placeholder="请输入">
              <el-option v-for="item in intercityList" :label="item.dept_name" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="联系电话:" prop="telephone">
            <el-input v-model.number="formInline.telephone"  placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="传真:">
            <el-input v-model="formInline.fax" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="网址:">
            <el-input v-model="formInline.website" placeholder="请输入" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件:">
            <el-input v-model="formInline.email" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="纬度:">
            <el-input v-model="formInline.latitude" placeholder="请输入" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="经度:">
            <el-input v-model="formInline.longitude" placeholder="请输入" maxlength="15"></el-input>
          </el-form-item>
        </div>
          
        

        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础设备信息</div>
        <hr class="line-solid">
        <div class="item-wrap">
          <el-form-item label="最大班级数:">
            <el-input v-model="formInline.max_class_no" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="满园学生数:">
            <el-input v-model="formInline.student_capacity" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="建筑面积:" class="append_type">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'');value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" v-model="formInline.built_up_area" placeholder="请输入">
              <span slot="suffix">平方米</span>
            </el-input>
          </el-form-item>
          <el-form-item label="使用面积:" class="append_type">
            <el-input oninput="value=value.replace(/[^0-9.]/g,'');value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')" v-model="formInline.usage_area" placeholder="请输入">
              <span slot="suffix">平方米</span>
            </el-input>
          </el-form-item>
          <br>
          <el-form-item label="是否自建:" prop="built_up_type">
            <el-select v-model="formInline.built_up_type"  placeholder="请选择">
              <el-option v-for="own in build_type_list" :label="own.text" :value="own.id" :key="own.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产权:" prop="owner_type">
            <el-select v-model="formInline.owner_type"  placeholder="请选择">
              <el-option v-for="build in owner_type_list" :label="build.text" :value="build.id" :key="build.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
          

        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;银行账户</div>
        <hr class="line-solid">
       
          <!--定义一组组件-->
          <div v-for="(item,index) in formInline.bank_list" :key="item.id" class="count-list">
            <div>
                <div class="mt26"></div>
                <div class="span-color">账户{{index+1}}:</div>
                <div class="item-wrap">
                  <el-form-item label="账号:">
                  <el-input v-model="item.account_no" placeholder="请输入" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="账户名称(中文):">
                  <el-input v-model="item.account_name" placeholder="请输入" maxlength="50"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="SWIFT代码:">
                  <el-input v-model="item.swift_code" placeholder="请输入" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="账户名称(英文):">
                  <el-input v-model="item.other_account_name" placeholder="请输入"  maxlength="100"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="开户银行(中文):">
                  <el-input v-model="item.bank_name" placeholder="请输入" maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="开户银行(英文):">
                  <el-input v-model="item.other_bank_name" placeholder="请输入" maxlength="100"></el-input>
                </el-form-item>
                <div class="delete_count">
                    <i class="fa fa-trash red font-size-20 cur" @click.prevent="removeDomain(item)"></i>
                </div>
                </div>
            </div>
            <div>
                
            </div>
          </div>
          <div class="span-color"><a class="icon-circle-add" @click="add_Account"><i class="fa fa-plus-circle"></i> 新增账户</a></div>

        <div style="margin-top: 50px"></div>
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;备注说明</div>
        <hr class="line-solid">
       
          <div class="item-wrap remark">
            <el-form-item label="备注:" style="width:100%">
              <el-input type="textarea" v-model="formInline.remarks" maxlength="100"></el-input>
            </el-form-item>
          </div>
          <div class="mt26 text-align-center">
            <el-button type="info" @click="$router.go(-1)">取消</el-button>
            <el-button type="success" @click="submitForm('formInline')">保存</el-button>
          </div>
      </div>
    </div>
    </el-form>
  </div>
</template>

<script>
   export default {
    data() {
      return {
        text:{
            account_no:'',
            account_name:'',
            other_account_name:'',
            bank_name:'',
            other_bank_name:'',
            swift_code:'',
          },
        schoolType:[],
        build_type_list:[],
        owner_type_list:[],
        labelPosition: 'right',
        formInline: {
          name:'',
          address:'',
          built_up_area:'',
          built_up_type:'',
          code:'',
          created_by:'',
          created_by_str:'',
          email:'',
          fax:'',
          hq:'',
          hq_name:'',
          id:'',
          intercity:'',
          intercity_name:'',
          latitude:'',
          longitude:'',
          max_class_no:'',
          opening_date:'',
          other_name:'',
          other_short_name:'',
          other_vendor_id:'',
          owner_type:'',
          remarks:'',
          short_name:'',
          status:'',
          status_name:'',
          student_capacity:'',
          taidii_key:'',
          telephone:'',
          town_id:'',
          update_by:'',
          update_by_str:'',
          usage_area:'',
          users:'',
          website:'',
          c_city_id:'',

          zip_code:'',
          bank_list:[{
            account_no:'',
            account_name:'',
            other_account_name:'',
            bank_name:'',
            other_bank_name:'',
            swift_code:'',
          }]
        },
        provinceList:[],
        cityList:[],
        townList:[],
        intercityList:[],
        rules: {
          name: [
            { required: true, message: '请输入校园名称', trigger: 'blur' },
          ],
          short_name: [
            { required: true, message: '请输入校园简称', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
          ],
          telephone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            { type:'number',message: '请输入数字', trigger: 'blur' }
          ],
          hq: [
            { required: true, message: '请选择校园类型', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择当前状态', trigger: 'change' }
          ],
          p_city_id: [
            { required: true, message: '请选择省/市', trigger: 'change' }
          ],
          c_city_id: [
            { required: true, message: '请选择市', trigger: 'change' }
          ],
          town_id: [
            { required: true, message: '请选择区', trigger: 'change' }
          ],
          built_up_type: [
            { required: true, message: '请选择是否自建', trigger: 'change' }
          ],
          owner_type: [
            { required: true, message: '请选择产权', trigger: 'change' }
          ],
          opening_date: [
            { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
          ],
        },
        school_id:this.$route.params.id
      }
    },
    created () {
        this.getSchoolType();
        this.getIntercity_list();
        this.getbuildtype();
    },
    methods:{
      getbuildtype(){
        var _this = this;
        this.$axios.post('/api/common/select/all_list/',{
            types:['BuildupType','OwnerType']
        })
        .then(res=>{
          console.log(res.data)
          res.data.results.forEach((item,index)=>{
            if(item.list_name === "BuildupType") {
              _this.build_type_list.push(item)
            } else if (item.list_name === "OwnerType") {
              _this.owner_type_list.push(item)
            }
          })
        }).catch(err=>{
          console.log(err)
        })
      },
      proinit(type){
        if(type === 1){
          this.formInline.c_city_id = "";
          this.formInline.town_id = "";
        } else {
          this.formInline.town_id = "";
        }
      },
      add_Account(){
        this.formInline.bank_list.push({
            account_no:'',
            account_name:'',
            other_account_name:'',
            bank_name:'',
            other_bank_name:'',
            swift_code:'',
          });
        console.log(this.formInline.bank_list)
      },
      submitForm(formName) {
        var _this = this;
        console.log(_this.formInline)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$axios.post('/api/center/center/',_this.formInline)
            .then(res=>{
              console.log(res)
            if(res.data.status_code == 1) {
              _this.$message({
                type:'success',
                message:'新增成功！'
              })
               _this.$router.go(-1);
            } else {
              // console.log(res.data.message)
            }
           
          }).catch(err=>{
            // console.log(err.message)
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getSchoolType(){
        var _this = this;
        this.$axios.get('/api/common/select/hq_list/',{
        }).then(res=>{
          _this.schoolType = res.data.results;
        }).catch(err=>{
        console.log(err)
      })
      },
      getIntercity_list(){
          var _this = this;
          this.$axios.get('/api/common/select/city_list/',{
            params:{
              level:1
            }
          }).then(res=>{
            _this.provinceList = res.data.results;
          }).catch(err=>{
          console.log(err)
        })
        this.$axios.get('/api/common/intercity/',).then(res=>{
            _this.intercityList = res.data.intercity_list;
          }).catch(err=>{
          console.log(err)
        })
      },
      getcity_list(){
        var _this = this;
        this.$axios.get('/api/common/select/city_list/',{
          params:{
            level:2,
            father_id:_this.formInline.p_city_id
          }
        }).then(res=>{
          _this.cityList = res.data.results;
          // _this.formInline.city_id = "";
          // _this.formInline.town_id = "";
        }).catch(err=>{
        console.log(err)
      })
      },
      gettown_list(){
        var _this = this;
        this.$axios.get('/api/common/select/city_list/',{
          params:{
            level:3,
            father_id:_this.formInline.c_city_id
          }
        }).then(res=>{
          _this.townList = res.data.results;
          // _this.formInline.town_id = "";
        }).catch(err=>{

      })
      },
      removeDomain(item) {
        var index = this.formInline.bank_list.indexOf(item);
        this.formInline.bank_list.splice(index, 1)
      },
      changeDate(val){
        var date = this.$options.filters['formatDate'](new Date());
        if(val>date){
          this.formInline.status = "0";
        } else {
          this.formInline.status = "1";
        }
      },   
    },
    watch: {
      'formInline.p_city_id'(){
        this.getcity_list();
        // this.gettown_list()
      },
      'formInline.c_city_id'(){
        this.gettown_list();
      },
    }
  }
</script>

<style scoped>
   .schooledit {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
   .schooledit .item-wrap{
    text-align: center;
  }
   .schooledit >>> .remark .el-form-item__content{
    width:54%;
  }
   .schooledit >>> .el-input__suffix-inner {
    color:#101010;
  }

  .schooledit .bold {
    font-weight: bold;
    color: black;
  }
  .schooledit .body-content{
    min-height: 120px;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 20px 50px;
    text-align: left;
  }
  .schooledit .vertical-bar{
    width: 100px;
    height: 16px;
    line-height: 16px;
    font-weight: 600;
    color: #0b6289;
    margin-left: 10px;
    border-left: 4px solid #0b6289;
  }
  .schooledit .line-solid{
    width: 100%;
    text-align: center;
    margin: 10px 0;
    color: #ccc;
  }
  .schooledit >>> .el-input__inner{
    width: 250px;
    height: 36px;
  }
  .schooledit .demo-form-inline{
    text-align: center;
  }
  .schooledit >>> .select-region .el-input__inner{
    width: 122px;
    height: 36px;
    margin: 0.2rem;
  }
  .schooledit >>> .el-form--inline .el-form-item__content{
    display: inline-flex;
  }
  .schooledit .span-color{
    color: #f17128;
    text-align: left;
    margin: 1% 7%;
    position: absolute;
  }
  .schooledit .icon-circle-add{
    color: #f17128;
  }
  .schooledit >>> .el-textarea__inner{
    width: 87%;
  }
  .schooledit >>> .count-list{
    position: relative;
  }
  .schooledit >>> .delete_count{
    position: absolute;
    right: 10%;
    top: 0;
    height: 100%;
    line-height: 150px;
    height: 150px;
  }
</style>
