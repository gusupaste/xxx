<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin:0;
  padding:0;
}
body {
  height: 100%;
}
html {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-width: 1200px;
}
.clearfix:after{
  content:".";
  display:block;
  height:0;
  clear:both;
  visibility:hidden
  }
.wrap {
  width: 90%;
  min-width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
}
.btn {
  width:84px;
  height:36px;
  line-height:36px;
  border-radius:2px;
  color:#fff;
  border:none;
  cursor:pointer;
  font-size:14px;
}
.bg-grey {
  background-color:#999;
}
.bg-green {
  background-color:#8bc34a;
}
.bg-dark-blue {
  background-color:#0b6289;
}
.bg-blue {
  background-color:#54a3e2;
}
.left {
  float: left;
}
.right {
  float: right;
}
.mt10 {
  margin-top: 10px;
}
.mt26 {
    margin-top:26px;
  }
.orange {
  color:#f17128;
}
a {
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 10px;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #f17128;
}
</style>
