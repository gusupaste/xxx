<template>
    <div class="ilist">
      <homepage></homepage>
      <router-view></router-view>
    </div>
</template>

<script>
  import homepage from '../homepage/home.vue';
  export default {
    components: {
      homepage,
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
  color: rgba(160, 160, 160, 1);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}
</style>
