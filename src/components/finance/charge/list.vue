<template>
    <div class="chargelist wrap">
      <div class="header">
        <p>YOU ARE HERE : 财务处理 >> <span class="font-cl-blue">收费账单</span></p>
      </div>
      <div class="content">
        <div class="select-header">
          <span>城际：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">区域：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">校园：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">学年：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">班级：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">账单类型：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-header">
          <span>开始日期</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span style="margin-left: 20px">结束日期</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span style="margin-left: 20px">学生信息</span>
          <el-input v-model="input" placeholder="输入学号、学生姓名或者学生卡号" style="width: 25%;"></el-input>
          <span class="padding-left-30">
            <el-button type="primary" @click="searchList">搜索</el-button></span>
        </div>
        <div class="list-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="确认账单" name="first">
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
            <el-tab-pane label="待审核账单" name="second">
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
        ]
      };
    },
    methods: {
      handleClose (){

      },
      searchList: function() {

      },
      editSchool:function (param) {
        this.$router.push('/school/school-edit/'+param.id);
      }
    }
  }
</script>

<style scoped>
  .chargelist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .chargelist .bold{
    font-weight: bold;
    color: black;
  }
  .chargelist .select-header,.chargelist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .chargelist .el-select{
    width: 10%;
  }
  .chargelist .el-tabs__item{
    width: 150px;
    text-align: center;
    color: #ED6C2E;
  }
  .chargelist .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .chargelist .el-table td, .el-table th{
    text-align: center;
  }
  .chargelist .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .chargelist .el-menu.el-menu--horizontal{
    padding-left: 50%;
  }
  .chargelist .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .chargelist .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .chargelist .el-tabs__item{
    padding: 0 0 !important;
  }
  .chargelist .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .chargelist #tab-first{
    margin-left: -150px;
  }
  .chargelist .el-tabs__active-bar is-top{
    width: 0px !important;
  }
</style>
