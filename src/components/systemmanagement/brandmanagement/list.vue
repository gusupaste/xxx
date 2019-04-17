<template>
    <div class='brandmanagement'>
      <p>YOU ARE HERE : 系统管理 >> 品牌管理</p>
      <div class="conter">

      </div>
    </div>
</template>
<style scoped>
  .brandmanagement p{
      left: 95px;
      top: 99px;
      height: 20px;
      color: rgba(160, 160, 160, 1);
      font-size: 14px;
      text-align: left;
      font-family: SourceHanSansSC-regular;
  }
</style>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
