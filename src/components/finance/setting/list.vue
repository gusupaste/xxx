<template>
    <div class="settinglist wrap">
      <div class="header">
        <p>YOU ARE HERE : 财务处理 >> <span>财务设置</span></p>
      </div>
      <div class="content">
        <div class="list-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="费用科目" name="first">
              <div class="select-header">
                <span>搜索科目</span>
                <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
                <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
                <span class="right" style="cursor:pointer" @click="addNewTemplate(0)">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="font-cl-blue font-size-14" >新增费用科目</span>
              </span>
              </div>
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="科目编码"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="科目名称"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="应用范围"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="备注"
                  min-width="180">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addNewTemplate(1)">编辑</el-button>
                    <span style="color: #999999">|</span>
                    <el-button class="red" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="折扣设置" name="second">
              <div class="select-header" style="min-height: 35px;">
                <span class="right" style="cursor:pointer" @click="addNewTemplate(1)">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="font-cl-blue font-size-14" >新增折扣类型</span>
              </span>
              </div>
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;">
                <el-table-column
                  prop="code"
                  label="折扣类型"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="属性"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="开始日期"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="截止日期"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="缴费区间"
                  min-width="160">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="适用校园"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="备注">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <router-link :to="{path:'/systemmanagement/edit-settlement-area/'+scope.row.id}">
                      <el-button type="text" size="small">查看详情</el-button>
                    </router-link>
                    <span style="color: #999999">|</span>
                    <router-link :to="{path:'/systemmanagement/edit-settlement-area/'+scope.row.id}">
                      <el-button style="color: orange" type="text" size="small">编辑</el-button>
                    </router-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="收费政策" name="third">
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="账单号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="学生姓名"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="所在班级"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="账单类型"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="opening_date"
                  label="实际应收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="leader"
                  label="实际实收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="telephone"
                  label="制单人"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="status_name"
                  label="制单日期">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="备用金" name="fore">
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="账单号"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="学生姓名"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="所在班级"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="账单类型"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="opening_date"
                  label="实际应收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="leader"
                  label="实际实收"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="telephone"
                  label="制单人"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="status_name"
                  label="制单日期">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog :title="feeName" :visible.sync="addFeeVisible" width="50%">
        <el-form ref="feeForm" :model="feeForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="科目名称">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="科目类型">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="科目编码">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否必须">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="应用范围">
                <el-radio-group v-model="feeForm.resource">
                  <el-radio label="所有校园"></el-radio><br>
                  <el-radio label="指定校园"></el-radio><br><br><br>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item style="margin-left:-80px;padding-top: 50px;">
                <span>品牌：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>城际：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-table
                  :data="templateList"
                  border
                  :show-header="false"
                  style="width: 95%;margin-top: 20px;">
                  <el-table-column
                    prop="id"
                    width="50">
                    <el-checkbox v-model="checked"></el-checkbox>
                  </el-table-column>
                  <el-table-column
                    prop="sname">
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注说明">
                <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="feeForm.remarks">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="addFeeVisible = false">保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nameSelect:[],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1:'',
        value2:'',
        input:'',
        activeName:'first',
        chargeTableDate:[
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
          },
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
          }
        ],
        addFeeVisible:false,
        feeName:'新增费用项目',
        feeForm:{
          id:'',
          name:'',
          remarks:'',
          resource:'',
        },
        templateList: [
          {
            id:1,
            pname:'家长姓名1',
            sname:'学生姓名1',
          },
          {
            id:2,
            pname:'家长姓名2',
            sname:'学生姓名2',
          }
        ],
      };
    },
    methods: {
      handleClose (){

      },
      searchList: function() {

      },
      editSchool:function (param) {
        this.$router.push('/school/school-edit/'+param.id);
      },
      addNewTemplate:function (flag) {
        if(flag === 0){
          this.feeName = '新增费用科目';
        }else{
          this.feeName = '编辑费用科目';
        }
        this.addFeeVisible = true;
      },
    },
    watch:{
      feeForm:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
          console.log("b.resource: "+val.resource, oldVal.resource);
        },
        deep:true
      }
    }
  }
</script>

<style>
  .settinglist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .settinglist .bold{
    font-weight: bold;
    color: black;
  }
  .settinglist .select-header,.chargelist .list-content{
    width: 100%;
    min-height: 50px;
  }
  .settinglist .el-select{
    width: 25%;
  }
  .settinglist .el-tabs__item{
    width: 150px;
    text-align: center;
    color: #ED6C2E;
  }
  .settinglist .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .settinglist .el-table td, .el-table th{
    text-align: center;
  }
  .settinglist .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .settinglist .el-menu.el-menu--horizontal{
    padding-left: 50%;
  }
  .settinglist .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .settinglist .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .settinglist .el-tabs__item{
    padding: 0 0 !important;
  }
  .settinglist .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .settinglist #tab-first{
    margin-left: -300px;
  }
  .settinglist .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .settinglist .el-textarea{
    width: 95% !important;
  }
  .settinglist .el-radio__input{
    line-height: 3.5 !important;
  }
  .settinglist .el-dialog__footer{
    text-align: center;
  }
</style>
