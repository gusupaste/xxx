<template>
  <div class="parentinfo wrap">
    <div class="header">
      <p>YOU ARE HERE :<span>家长信息</span></p>
    </div>
    <div class="content">
      
    </div>
  </div>
</template>
<style lang="">
  .parentinfo .header p{
    font-size: 14px;
  }
  .parentinfo{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .parentinfo .content{
    min-height: 20px;
    width: 100%;
  }
</style>
<script>
export default {
  data(){
    return {
         list:[1,2,3,4,5,6,7,81,],
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  }
}
</script>
