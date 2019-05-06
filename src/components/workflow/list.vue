<template>
    <div class="workflowlist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">工作流 </span></p>
      </div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的审批任务" name="first">
            <div class="select-header">
              <span>审批状态</span>
              <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 20%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>搜索</span>
              <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
              <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
            </div>
            <el-table
              :data="chargeTableDate"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="code"
                label="流程名称"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="发起人"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="intercity_name"
                label="流程创建时间"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="intercity_name"
                label="当前节点"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="hq_name"
                label="表单状态"
                min-width="180">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addNewTemplate(1)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="我发起的工作流" name="second">
            <div class="select-header">
              <span>审批状态</span>
              <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 20%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>搜索</span>
              <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
              <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
            </div>
            <el-table
              :data="chargeTableDate"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="code"
                label="流程名称"
                min-width="220">
              </el-table-column>
              <el-table-column
                prop="intercity_name"
                label="流程创建时间"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="intercity_name"
                label="当前节点"
                min-width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="审批人"
                min-width="150">
              </el-table-column>
              <el-table-column
                prop="hq_name"
                label="任务分配时间"
                min-width="180">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addNewTemplate(1)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--<el-dialog title="流程详细" :visible.sync="reservefundVisible" width="700px">
        <el-form ref="reserveForm" :model="reserveForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="城际" label-width="40">
                <el-select v-model="nameSelect" placeholder="&#45;&#45;请选择&#45;&#45;" style="width: 170px;">
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
            <el-col :span="8">
              <el-form-item label="区域" label-width="40">
                <el-select v-model="nameSelect" placeholder="&#45;&#45;请选择&#45;&#45;" style="width: 170px;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="省份" label-width="40">
                <el-select v-model="nameSelect" placeholder="&#45;&#45;请选择&#45;&#45;" style="width: 170px;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市" label-width="40">
                <el-select v-model="nameSelect" placeholder="&#45;&#45;请选择&#45;&#45;" style="width: 170px;">
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
              <el-form-item label="学校" label-width="40">
                <el-table
                  :data="templateList"
                  border
                  :show-header="false"
                  style="width: 610px;margin-top: 20px;">
                  <el-table-column
                    prop="id"
                    width="180">
                    <el-checkbox v-model="checked">【2015】金华家园</el-checkbox>
                  </el-table-column>
                  <el-table-column>
                    <el-checkbox-group v-model="type" style="text-align: left">
                      <el-checkbox label="美食" name="type"></el-checkbox>
                      <el-checkbox label="地推" name="type"></el-checkbox>
                      <el-checkbox label="线下" name="type"></el-checkbox>
                      <el-checkbox label="单纯" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="addFeeVisible = false">保 存</el-button>
        </span>
      </el-dialog>-->
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
      };
    },
    methods: {
      addNewTemplate: function (id) {
        this.$router.push({name: 'workflowDetail', query: {id: id}})
      },
      handleClick : function () {

      },
      searchList : function () {

      },


    }
  }
</script>

<style scoped>
  .workflowlist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .workflowlist .content{
    margin-top: 10px;
  }
  .workflowlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
  /*.workflowlist >>> .el-menu.el-menu--horizontal{
    padding-left: 50%;
  }*/
  .workflowlist >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .workflowlist >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .workflowlist >>> #tab-first{
    margin-left: -150px;
  }
  .workflowlist >>> .el-tabs__item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .workflowlist >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .workflowlist >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .workflowlist >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .workflowlist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
  .workflowlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  /*.intentionalAdmissionlist >>> .select-header,.intentionalAdmissionlist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .intentionalAdmissionlist >>> .el-select{
    width: 10%;
  }
  .intentionalAdmissionlist >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .intentionalAdmissionlist >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .intentionalAdmissionlist >>> .el-table td, .el-table th{
    text-align: center;
  }
  .intentionalAdmissionlist >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .intentionalAdmissionlist >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .intentionalAdmissionlist >>> #tab-first{
    margin-left: -150px;
  }
  .intentionalAdmissionlist .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
  .intentionalAdmissionlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  */
</style>
