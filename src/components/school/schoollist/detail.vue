<template>
  <div class="schooldetail">
    <div class="content">
      <p>YOU ARE HERE : 校园 >> 校园列表 >> 校园概况</p>
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
