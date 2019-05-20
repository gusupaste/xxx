
<template>
  <div id="app">
    <!-- 其他页 -->
    <div v-if="this.$route.name !== 'login'">
      <header-nav></header-nav>
      <router-view></router-view>
    </div>
    <div v-if="this.$route.name == 'login'">
      <router-view></router-view>
    </div>
    
  </div>
</template>
 
<script>
import headerNav from './components/headNav/head'
 
export default{
    components: {
        headerNav: headerNav,
      }
}
 
</script>
 
<style>
 
</style>