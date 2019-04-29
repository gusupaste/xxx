<template>
  <div class="schooladd wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > 校园列表 > <span class="font-cl-blue">新增校园</span></p>
    </div>
    <div class="content">
      <p class="bold mt10">请输入新校园的相关系统,并保存提交,带*号的为必填字段。</p>
      <div class="body-content">
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础信息</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <el-form-item label="校园名称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="简称(中文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="校园名称(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="简称(英文):">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="校园类型:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="园长:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="开园日期:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="当前状态:">
            <el-select v-model="formInline.user" placeholder="请选择">
                <el-option label="筹备中" value="0">筹备中</el-option>
                <el-option label="开园" value="1">开园</el-option>
                <el-option label="关园" value="2">关园</el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="地址:">
            <el-select class="select-region" v-model="formInline.region" placeholder="省">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select class="select-region" v-model="formInline.region" placeholder="市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select class="select-region" v-model="formInline.region" placeholder="区">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="formInline.user" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="邮政编码:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="所属城际:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="联系电话:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="传真:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="网址:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="纬度:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="经度:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>

        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;基础设备信息</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <el-form-item label="最大班级数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="满园学生数:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="建筑面积:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="使用面积:">
            <el-input v-model="formInline.user" placeholder="请输入"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="是否自建:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="自建" value="0"></el-option>
              <el-option label="收购" value="1"></el-option>
              <el-option label="租赁" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产权:">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option label="开发商" value="0"></el-option>
              <el-option label="教委" value="1"></el-option>
              <el-option label="其他" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;银行账户</div>
        <hr class="line-solid">
        <el-form :inline="true" :label-position="labelPosition" label-width="120px" :model="formInline" class="demo-form-inline ">
          <!--定义一组组件-->
          <div v-for="(item,index) in items" :key="index" class="count-list">
            <div>
                <div class="mt26"></div>
                <div class="span-color">账户{{index+1}}:</div>
                <el-form-item label="账号:">
                  <el-input v-model="item.user" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="账户名称(中文):">
                  <el-input v-model="item.user" placeholder="请输入"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="SWIFT代码:">
                  <el-input v-model="item.user" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="账户名称(英文):">
                  <el-input v-model="item.user" placeholder="请输入"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="开户银行(中文):">
                  <el-input v-model="item.user" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="开户银行(英文):">
                  <el-input v-model="item.user" placeholder="请输入"></el-input>
                </el-form-item>
                <div class="delete_count">
                    <i class="fa fa-trash red font-size-20 cur" @click.prevent="removeDomain(item)"></i>
                </div>
            </div>
            <div>
                
            </div>
          </div>
          <div class="span-color"><a class="icon-circle-add" @click="add_Account"><i class="fa fa-plus-circle"></i> 新增账户</a></div>
        </el-form>
        <div style="margin-top: 50px"></div>
        <div class="vertical-bar">&nbsp;&nbsp;&nbsp;备注说明</div>
        <hr class="line-solid">
        <el-form :label-position="labelPosition" label-width="18%" :model="formInline" class="demo-form-inline ">
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formInline.user"></el-input>
          </el-form-item>
          <div class="mt26">
            <el-button type="info">取消</el-button>
            <el-button type="success">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        text:0,
        items:[{
          user:''
        }],
        labelPosition: 'right',
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods:{
      add_Account:function () {
        this.items.push(this.text++)
      },
      removeDomain(item) {
        var index = this.items.indexOf(item);
        if(this.items.length > 1) {
            if (index != -1) {
            this.items.splice(index, 1)
          }
        }
      },
    }
  }
</script>

<style scoped>
  .schooladd {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .schooladd .bold {
    font-weight: bold;
    color: black;
  }
  .schooladd .body-content{
    min-height: 120px;
    border: 1px solid #ddd;
    margin-top: 10px;
    padding: 20px 50px;
    text-align: left;
  }
  .schooladd .vertical-bar{
    width: 100px;
    height: 16px;
    line-height: 16px;
    font-weight: 600;
    color: #0b6289;
    margin-left: 10px;
    border-left: 4px solid #0b6289;
  }
  .schooladd .line-solid{
    width: 100%;
    text-align: center;
    margin: 10px 0;
    color: #ccc;
  }
  .schooladd >>> .el-input__inner{
    width: 250px;
    height: 36px;
  }
  .schooladd .demo-form-inline{
    text-align: center;
  }
  .schooladd >>> .el-form-item{
    margin: 0.2rem;
  }
  .schooladd >>> .select-region .el-input__inner{
    width: 122px;
    height: 36px;
    margin: 0.2rem;
  }
  .schooladd >>> .el-form--inline .el-form-item__content{
    display: inline-flex;
  }
  .schooladd .span-color{
    color: #f17128;
    text-align: left;
    margin: 1% 7%;
    position: absolute;
  }
  .schooladd .icon-circle-add{
    color: #f17128;
  }
  .schooladd >>> .el-textarea__inner{
    width: 87%;
  }
  .schooladd >>> .count-list{
    position: relative;
  }
  .schooladd >>> .delete_count{
    position: absolute;
    right: 10%;
    top: 0;
    height: 100%;
    line-height: 150px;
    height: 150px;
  }
</style>
