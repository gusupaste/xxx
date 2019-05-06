<template>
  <div class="revenueList wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">收入确认</span></p>
    </div>
    <div class="content">
      <div class="select-header black">
        <span>学年：</span>
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
        <span style="margin-left: 20px">搜索：</span>
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
            label="学生姓名"
            width="">
          </el-table-column>
          <el-table-column
            prop="name"
            label="所在班级"
            width="">
          </el-table-column>
          <el-table-column
            prop="intercity_name"
            label="缴费日期"
            width="">
          </el-table-column>
          <el-table-column
            prop="hq_name"
            label="缴费方式"
            width="">
          </el-table-column>
          <el-table-column
            prop="opening_date"
            label="学费缴费金额"
            width="">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="学费所属区间"
            width="">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="餐费缴费金额"
            width="">
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="餐费所属区间">
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="物品费">
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="活动费">
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="保险费">
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="其他">
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="缴费金额合计">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="editSchool(scope.row,0)">
                    查看明细
                </el-button>
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
          this.$router.push('/financemanagement/revenueDetail/9');
        }else{
          this.$router.push('/financemanagement/usageRecord');
        }
      }
    }
  }
</script>

<style scoped>
  .revenueList{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .revenueList .bold{
    font-weight: bold;
    color: black;
  }
  .revenueList .select-header,.refundlist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .revenueList .el-select{
    width: 10%;
  }
  .revenueList >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  .revenueList >>> .el-input__inner {
    width: -webkit-fill-available;
  }
</style>
