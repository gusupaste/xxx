<template>
  <div class="schooldetail">
    <div class="content">
      <p>YOU ARE HERE : 校园 >> <span>校园列表</span></p>
      <p class="bold">伊顿旗下的校园列表，你可以选择查看某个区域或城市下的校园信息。</p>
    </div>
  </div>
</template>

<style>
  .schooldetail p {
    margin: 10px;
  }

  .schooldetail {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .schooldetail .bold {
    font-weight: bold;
    color: black;
  }

  .schooldetail .content {
    padding: 20px 70px 50px 70px;
  }
</style>

<script>
  export default {
    components: {
    },
    data() {
      return {
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
