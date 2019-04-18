<template>
  <div class="schooldetail clearfix">
    <div class="content clearfix">
      <p>YOU ARE HERE : 校园 >> 校园列表 >> <span class="font-cl-blue">校园概况</span></p>
      <div class="content-top">北京理都校园</div>
      <el-col :span="24">
        <el-card shadow="always">
          <p class="bold">基本信息</p>
          <p class="bold">校园名称:北京首府校园(英文全称:xxxxxxxx;中文简称:xxxxxxxx;英文简称:xxxxxxxxxx)</p>
          <p><el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属区域:</span><span>华北地区</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属城市:</span><span>北京市</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">园长:</span><span>李园长</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>校园编码:</span><span>1001</span></div></el-col>
          </el-row>
          </p>
          <p>
          <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><span>通讯地址:</span><span>北京市</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">邮编:</span><span>123456</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">电话:</span><span>18809876543</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">传真:</span><span>xxxxxxxx</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>电子邮箱:</span><span>xxxxxxxx</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">网址:</span><span>www.taidii.com</span></div></el-col>
          </el-row>
          </p>
        </el-card>
      </el-col>
    </div>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
          <el-tab-pane label="开班情况" name="first">开班情况</el-tab-pane>
          <el-tab-pane label="基础设施" name="second">基础设施</el-tab-pane>
          <el-tab-pane label="银行账户" name="third">银行账户</el-tab-pane>
        </el-tabs>
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

  .schooldetail .content-top{
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    position: relative;
    top: 20px;
    left: -5px;
    border-radius: 3px;
    color: #3E7193;
  }
  .schooldetail .content-margin{
    margin-left: 15%;
  }
</style>

<script>
  export default {
    components: {
    },
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
      console.log(tab, event);
    }
    }
  }
</script>
