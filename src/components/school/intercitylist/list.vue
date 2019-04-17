<template>
    <div class="intercitylist">
      <div class="content">
        <p>YOU ARE HERE : 校园 >> <span>城际列表</span></p>
        <p class="bold">伊顿国际教育集团大城际分布</p>

      </div>
    </div>
</template>

<script>
    export default {
        name: "intercity-list"
    }
</script>

<style scoped>
  p{
    margin: 10px;
  }
  .intercitylist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .intercitylist .bold{
    font-weight: bold;
    color: black;
  }
  .intercitylist .content{
    padding: 20px 70px 50px 70px;
  }
  .intercitylist .padding-30{
    padding-left: 30px;
  }
  .intercitylist .right{
    color: red;
  }
</style>
