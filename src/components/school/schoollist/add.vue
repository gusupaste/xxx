<template>
  <div class="schooladd">
    <div class="content">
      <p>YOU ARE HERE : 校园 >> 校园列表 >> <span class="font-cl-blue">新增校园</span></p>
      <p class="bold">请输入新校园的相关系统,并保存提交,带*号的为必填字段。</p>
      <div class="body-content">
        <div class="bg-dark-blue vertical-bar"></div><span class="font-cl-blue margin-left-10">基础信息</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'add'
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
    width: 5px;
    height: 12px;
    display: inline-block;
  }
  .schooladd .margin-left-10{
    margin-left: 10px;
  }
</style>
