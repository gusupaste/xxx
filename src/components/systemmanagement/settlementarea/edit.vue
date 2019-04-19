<template>
  <div class="settlementedit wrap">
    <div class="header">
      <p>YOU ARE HERE : 系统管理 >> <span>品牌管理</span></p>
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
  .settlementedit .header p{
    font-size: 14px;
    margin: 10px 0px;
  }
  .settlementedit{
    padding: 0px 40px;
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
</style>
