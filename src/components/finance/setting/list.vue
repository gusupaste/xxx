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
                    <el-button class="red" type="text" size="small" @click="deleteFeeVisible = true">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="折扣设置" name="second">
              <div class="select-header" style="min-height: 35px;">
                <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
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
                    <el-button type="text" size="small">查看详情</el-button>
                    <span style="color: #999999">|</span>
                    <el-button style="color: orange" type="text" size="small" @click="addNewDiscount(1)">编辑</el-button>
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
                  <el-radio v-model="radio" label="1" @change="changeRadio(1)">所有校园</el-radio><br>
                  <el-radio v-model="radio" label="2" @change="changeRadio(2)">指定校园</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item style="margin-left:-80px;padding-top: 50px;">
                <span>品牌：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;" v-bind:disabled="disabledSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>城际：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;" v-bind:disabled="disabledSelect">
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
                    <el-checkbox v-model="checked" v-bind:disabled="disabledSelect"></el-checkbox>
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
      <el-dialog title="删除费用科目" :visible.sync="deleteFeeVisible" width="40%" class="deleteFee">
        <span>是否确认删除费用科目<span style="color:#006287">【学费】</span>？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="deleteFeeVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="discountName" :visible.sync="addDiscountVisible" width="55%" class="discountDialog">
        <el-form ref="discountForm" :model="discountForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="折扣名称">
                <el-input v-model="discountForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="属性">
                <el-input v-model="discountForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="折扣生效日期" label-width="100">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="折扣失效日期" label-width="100">
                <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="缴费区间">
                <el-date-picker
                  v-model="value9"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  default-value="2010-10-01">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="适用校园">
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
            <el-col :span="8">
              <el-form-item label="判定条件">
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 100%;">
                  <el-option
                    v-for="item in options1"
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
              <el-form-item label="可叠加折扣" label-width="82">
                <el-checkbox-group v-model="discountForm.select">
                  <el-checkbox v-for="se in selectCheckbox" :label="se.name" :key="se.id" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="addDiscountVisible = false">保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nameSelect:[],
        options1:[{
          value: 'all',
          label: '所有'
        },{
          value: '选项4',
          label: '折扣率'
        }, {
          value: '选项5',
          label: '折扣金额'
        }],
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
        operation:[
          {
            id:1,
            name:'所有学校',
          },
          {
            id:2,
            name:'指定校园',
          }
        ],
        value1:'',
        value2:'',
        value9:'',
        input:'',
        activeName:'first',
        disabledSelect:false,
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
        deleteFeeVisible:false,
        addDiscountVisible:false,
        discountName:'新增折扣类型',
        feeName:'新增费用项目',
        discountForm:{
          id:'',
          name:'',
          remarks:'',
          resource:1,
          select:[],
        },
        feeForm:{
          id:'',
          name:'',
          remarks:'',
          resource:'1',
        },
        radio:'1',
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
        selectCheckbox:[
          {
            id:1,
            name:'员工子女折扣',
          },
          {
            id:2,
            name:'园长折扣',
          },
          {
            id:3,
            name:'事业部拓展折扣',
          },
          {
            id:4,
            name:'兄弟姐妹折扣',
          },
          {
            id:5,
            name:'总经理折扣',
          },
          {
            id:6,
            name:'其他折扣',
          },
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
      addNewDiscount:function (flag) {
        if(flag === 0){
          this.discountName = '新增折扣类型';
        }else{
          this.discountName = '编辑折扣类型';
        }
        this.addDiscountVisible = true;
      },
      changeRadio:function (flag) {
        if(flag === 1){
          this.disabledSelect = true;
        }else{
          this.disabledSelect = false;
        }
      }
    },
    watch:{
      disabledSelect: {
        handler:function (newName, oldName){
          if(this.radio === '1'){
            this.disabledSelect = true;
          }else{
            this.disabledSelect = false;
          }
        },
        immediate:true
      },
    },
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
  .settinglist .deleteFee .el-dialog__body{
    text-align: center;
  }
  .settinglist .discountDialog .el-checkbox-group{
    display: -webkit-box;
  }
</style>
