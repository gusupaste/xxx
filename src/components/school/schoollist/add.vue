<template>
  <div class="schooladd">
    <div class="content">
      <p>YOU ARE HERE : 校园 >> 校园列表 >> <span class="font-cl-blue">新增校园</span></p>
      <p class="bold">请输入新校园的相关系统,并保存提交,带*号的为必填字段。</p>
      <div class="body-content">
        <div class="vertical-bar">基础信息</div>
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
          <el-form-item label="简称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="简称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
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
  .schooladd p {
    margin: 10px;
  }

  .schooladd {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .schooladd .bold {
    font-weight: bold;
    color: black;
  }

  .schooladd .content {
    padding: 20px 70px 50px 70px;
  }

  .schooladd .body-content{
    min-height: 120px;
    border: 1px solid #ddd;
    margin: 10px;
    padding: 20px 50px;
    text-align: left;
  }
  .schooladd .vertical-bar{
    width: 65px;
    height: 16px;
    color: #0b6289;
    text-align: right;
    margin-left: 10px;
    border-left: 4px solid #0b6289;
  }
  .schooladd .line-solid{
    width: 100%;
    text-align: center;
    margin: 10px 0;
    color: #ccc;
  }
  .schooladd .el-input__inner{
    width: 250px;
    height: 36px;
  }
  .schooladd .demo-form-inline{
    text-align: center;
  }
</style>
