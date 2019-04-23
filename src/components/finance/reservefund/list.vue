<template>
  <div class="discountlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">备用金管理</span></p>
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
        <span style="margin-left: 10px">班级：</span>
        <el-select v-model="nameSelect" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-left: 20px">学生姓名</span>
        <el-input v-model="input" placeholder="输入关键字" style="width: 15%;"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
      </div>
      <div class="list-content">
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
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editSchool(scope.row,0)">
                待批记录
                </el-button>&nbsp;&nbsp;&nbsp;|
              <el-button type="text" size="small" @click="editSchool(scope.row,1)">使用记录</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        activeIndex:'1',
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
      editSchool:function (param,index) {
        if(index === 0){
          this.$router.push('/financemanagement/pendingApprovalRecord');
        }else{
          this.$router.push('/financemanagement/usageRecord');
        }
      }
    }
  }
</script>

<style scoped>
  .discountlist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .discountlist .bold{
    font-weight: bold;
    color: black;
  }
  .discountlist .select-header,.refundlist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .discountlist .el-select{
    width: 10%;
  }
  .discountlist .list-content .el-menu--horizontal>.el-menu-item{
    float: none;
    width: 150px;
    display: inline-block;
    text-align: center;
    color: #ED6C2E;
  }
  .discountlist .el-table td, .el-table th{
    text-align: center;
  }
  .discountlist .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .discountlist .el-menu.el-menu--horizontal{
    padding-left: 50%;
  }
  .discountlist .new-calendar-modal .el-table td, .el-table th.is-leaf{
    border-bottom: none !important;
  }
</style>
