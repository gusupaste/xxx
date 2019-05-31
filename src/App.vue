
<template>
  <div id="app">
    <!-- 其他页 -->
    <div v-if="this.$route.name == 'login' || this.$route.name == 'parent' || this.$route.name == 'billInfo-print'">
      <router-view></router-view>
    </div>
    <div v-if="this.$route.name !== 'login' && this.$route.name !== 'parent' && this.$route.name !== 'billInfo-print'">
      <header-nav></header-nav>
      <router-view></router-view>
    </div>
    
  </div>
</template>
 
<script>
import headerNav from './components/headNav/head'
 
export default{
    components: {
        headerNav: headerNav,
    },
    created () {
      console.log("****************");
      console.log(this.$route.name);
    },
}
 
</script>
 
<style>
 
</style>