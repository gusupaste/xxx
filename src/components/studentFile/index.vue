<template>
    <div class="ilist">
      <router-view></router-view>
    </div>
</template>

<script>
  export default {
    components: {
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.ilist{
  left: 95px;
  top: 99px;
  height: 20px;
  font-size: 14px;
  /* text-align: left; */
  font-family: SourceHanSansSC-regular;
}
</style>
