<template>
  <div class="schooledit wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > 校园列表 > <span class="font-cl-blue">编辑校园</span></p>
    </div>
    <div class="content">
      <p class="bold mt10">请输入新校园的相关系统,并保存提交,带*号的为必填字段。</p>
      <div class="body-content">
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础信息</div>
        <hr class="line-solid">
        <el-form :inline="true"   :label-position="labelPosition" label-width="120px" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline ">
          <el-form-item label="校园名称(中文):" prop="name">
            <el-input  v-model="formInline.name" placeholder="请输入" ></el-input>
          </el-form-item>
          <el-form-item label="简称(中文):" prop="short_name">
            <el-input v-model="formInline.short_name" placeholder="请输入"></el-input>
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
            <el-input v-model="formInline.user" placeholder="请输入" maxlength="50"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="开园日期:" prop="opening_date">
            <el-date-picker  v-model="formInline.opening_date" type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="当前状态:" prop="status">
            <el-select v-model="formInline.status_name" placeholder="请输入">
                <el-option label="筹备中" value="0">筹备中</el-option>
                <el-option label="开园" value="1">开园</el-option>
                <el-option label="关园" value="2">关园</el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="地址:" prop="address">
            <el-select class="select-region" v-model="formInline.region" placeholder="省">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select class="select-region" v-model="formInline.region" placeholder="市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select class="select-region" v-model="formInline.region" placeholder="区">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="formInline.address"  placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="邮政编码:">
            <el-input v-model="formInline.zip_code" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="所属城际:">
            <el-input v-model="formInline.intercity" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="联系电话:" prop="telephone">
            <el-input v-model="formInline.telephone"  placeholder="请输入"></el-input>
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
            <el-input v-model="formInline.longtitude" placeholder="请输入" maxlength="15"></el-input>
          </el-form-item>
        </el-form>

        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础设备信息</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <el-form-item label="最大班级数:">
            <el-input v-model="formInline.max_class_no" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="满园学生数:">
            <el-input v-model="formInline.student_capacity" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="建筑面积:">
            <el-input v-model="formInline.built_up_area" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="使用面积:">
            <el-input v-model="formInline.usage_area" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="是否自建:" prop="built_up_type">
            <el-select v-model="formInline.built_up_type"  placeholder="请选择">
              <el-option label="自建" value="0"></el-option>
              <el-option label="收购" value="1"></el-option>
              <el-option label="租赁" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产权:" prop="owner_type">
            <el-select v-model="formInline.owner_type"  placeholder="请选择">
              <el-option label="开发商" value="0"></el-option>
              <el-option label="教委" value="1"></el-option>
              <el-option label="其他" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;银行账户</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <!--定义一组组件-->
          <div v-for="(item,index) in formInline.bank_list" :key="index" class="count-list">
            <div>
                <div class="mt26"></div>
                <div class="span-color">账户{{index+1}}:</div>
                <el-form-item label="账号:">
                  <el-input v-model="item.account_no" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="账户名称(中文):">
                  <el-input v-model="item.account_name" placeholder="请输入"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="SWIFT代码:">
                  <el-input v-model="item.swift_code" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="账户名称(英文):">
                  <el-input v-model="item.other_account_name" placeholder="请输入"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="开户银行(中文):">
                  <el-input v-model="item.bank_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="开户银行(英文):">
                  <el-input v-model="item.other_bank_name" placeholder="请输入"></el-input>
                </el-form-item>
                <div class="delete_count">
                    <i class="fa fa-trash red font-size-20 cur" @click.prevent="removeDomain(item)"></i>
                </div>
            </div>
            <div>
                
            </div>
          </div>
          <div class="span-color"><a class="icon-circle-add" @click="add_Account"><i class="fa fa-plus-circle"></i> 新增账户</a></div>
        </el-form>
        <div style="margin-top: 50px"></div>
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;备注说明</div>
        <hr class="line-solid">
        <el-form :label-position="labelPosition" label-width="18%" :model="formInline" class="demo-form-inline ">
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formInline.remarks"></el-input>
          </el-form-item>
          <div class="mt26">
            <el-button type="info">取消</el-button>
            <el-button type="success" @click="submitForm('formInline')">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>

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
        labelPosition: 'right',
        formInline: {
          name:'',
          address:'',
          built_up_area:'',
          built_up_type:'',
          code:'',
          created_by:'',
          created_by_str:'',
          date_created:'',
          date_updated:'',
          email:'',
          fax:'',
          hq:'',
          hq_name:'',
          id:'',
          intercity:'',
          intercity_name:'',
          latitude:'',
          longtitude:'',
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
        rules: {
          name: [
            { required: true, message: '请输入校园名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          short_name: [
            { required: true, message: '请输入校园简称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
            {  min: 1, max: 20,message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          hq: [
            { required: true, message: '请选择校园类型', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择当前状态', trigger: 'change' }
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
        this.getSchoolInfo();
        this.getSchoolType();
        this.getIntercity_list();
    },
    methods:{
      add_Account(){
        this.formInline.bank_list.push(this.text);
        console.log(this.formInline.bank_list)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.formInline)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getSchoolInfo(){
        var _this = this;
        this.$axios('http://192.168.1.197:8000/api/center/center/'+this.school_id+'/view_detail/',{
        }).then(res=>{
          _this.formInline = res.data.detail;
          console.log(res);
        }).catch(err=>{
        console.log(err)
      })
      },
      getSchoolType(){
        var _this = this;
        this.$axios('http://192.168.1.197:8000/api/common/select/hq_list/',{
        }).then(res=>{
          _this.schoolType = res.data.results;
          console.log(res);
        }).catch(err=>{
        console.log(err)
      })
      },
      getIntercity_list(){
        var _this = this;
        this.$axios('http://192.168.1.197:8000/api/common/select/city_list/',{
          params:{
            level:1
          }
        }).then(res=>{
          // _this.schoolType = res.data.results;
          console.log(res);
        }).catch(err=>{
        console.log(err)
      })
      },
      removeDomain(item) {
        var index = this.formInline.bank_list.indexOf(item);
        if(this.formInline.bank_list.length > 1) {
            if (index != -1) {
            this.formInline.bank_list.splice(index, 1)
          }
        }
      },
    }
  }
</script>

<style scoped>
   .schooledit {
    color: rgba(160, 160, 160, 1);
    text-align: left;
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
