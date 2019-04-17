<template>
    <div class='brandmanagement'>
      <homepage></homepage>
      <p>YOU ARE HERE : 系统管理 >> 品牌管理</p>
      <div class="content-top">
        <div class="top">
          <span class="top-span">班级项目：</span>
          <el-button class="el-button" type="primary">管理</el-button><br>
          <span class="top-span-bot">双语班 ； 国际班 ； 慧智班 ； 慧乐班 ；慧智双语班级 ； 慧智普通班  </span>
        </div>
        <div class="top">
          <span class="top-span">年级项目：</span>
          <el-button class="el-button" type="primary">管理</el-button><br>
          <span class="top-span-bot">国际班；双语班；</span>
        </div>
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
  .brandmanagement .content-top{
    min-height: 120px;
    border: 1px solid #ddd;
    margin: 25px;
    padding: 10px;
    text-align: left;
  }
  .brandmanagement .top-span{
    color: #006287;
  }
  .brandmanagement .top-span-bot{
    color: #A0A0A0;
    font-size: 10px;
    line-height: 40px;
  }
  .brandmanagement .el-button{
    padding: 5px 10px;
    font-size: 10px;
    background-color: #ED6C2E;
    border-color: #ED6C2E;
  }
</style>
<script>
  import homepage from '../../homepage/home.vue';
  export default {
    components: {
      homepage,
    },
    data() {
      return {
        klass:'',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
