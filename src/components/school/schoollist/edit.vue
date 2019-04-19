<template>
  <div class="schooledit wrap">
    <div class="content">
      <p>YOU ARE HERE : 校园 >> 校园列表 >> <span class="font-cl-blue">编辑校园</span></p>
      <p class="bold">请输入新校园的相关系统,并保存提交,带*号的为必填字段。</p>
      <div class="body-content">
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础信息</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <el-form-item label="校园名称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="简称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="校园名称(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="简称(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="校园类型:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="园长:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开园日期:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="当前状态:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="地址:">
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
            <el-input v-model="formInline.user" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属城际:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="传真:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="网址:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="纬度:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="经度:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>

        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础设备信息</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <el-form-item label="最大班级数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="满园学生数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="建筑面积:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="使用面积:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否自建:">
            <el-select v-model="formInline.region" placeholder="省">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产权:">
            <el-select v-model="formInline.region" placeholder="省">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;银行账户</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <div class="span-color">账户1:</div>
          <el-form-item label="账号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="账户名称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="SWIFT代码:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="账户名称(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开户银行(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开户银行(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <!--点击添加账户，需要添加的内容-->
          <div class="mt26"></div>
          <div class="span-color">账户2:</div>
          <el-form-item label="账号:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="账户名称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="SWIFT代码:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="账户名称(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开户银行(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开户银行(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <div class="span-color"><a class="icon-circle-add"><i class="fa fa-plus-circle"></i> 新增账户</a></div>
        </el-form>
        <div class="mt26"></div>
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;备注说明</div>
        <hr class="line-solid">
        <el-form :label-position="labelPosition" label-width="18%" :model="formInline" class="demo-form-inline ">
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formInline.user"></el-input>
          </el-form-item>
          <div>
            <el-button type="info">取消</el-button>
            <el-button type="success">保存</el-button>
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
        labelPosition: 'right',
        formInline: {
          user: '',
          region: ''
        }
      }
    }
  }
</script>

<style>
  .schooledit p {
    margin: 10px;
  }

  .schooledit {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .schooledit .bold {
    font-weight: bold;
    color: black;
  }

  .schooledit .content {
    padding: 20px 70px 50px 70px;
  }

  .schooledit .body-content{
    min-height: 120px;
    border: 1px solid #ddd;
    margin: 10px;
    padding: 20px 50px;
    text-align: left;
  }
  .schooledit .vertical-bar{
    width: 100px;
    height: 16px;
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
  .schooledit .el-input__inner{
    width: 250px;
    height: 36px;
  }
  .schooledit .demo-form-inline{
    text-align: center;
  }
  .schooledit .el-form-item{
    margin: 0.2rem;
  }
  .schooledit .select-region .el-input__inner{
    width: 122px;
    height: 36px;
    margin: 0.2rem;
  }
  .schooledit .el-form--inline .el-form-item__content{
    display: inline-flex;
  }
  .schooledit .span-color{
    color: orange;
    text-align: left;
    margin: 1% 7%;
    position: absolute;
  }
  .schooledit .icon-circle-add{
    color: orange;
  }
  .schooledit .el-textarea__inner{
    width: 87%;
  }
</style>
