<template>
  <div class="revenueDetail wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">收入确认</span></p>
    </div>
    <div class="content">
      <div class="select-header title-style">
        <span>学生姓名：张三</span>
        <span class="ml20">班级：双外教大一班</span>
        <span class="ml20">当前学年：2018-2019学年</span>
      </div>
      <div class="list-content">
        <el-table
          :data="chargeTableDate"
          border
          show-header
          style="width: 100%;">
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
        </el-table>
        <el-table
            class="mt26 secondtable"
            :data="tableDetail"
            border
            show-summary
            style="width: 100%">
            <el-table-column
            prop="id"
            label="费用科目"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="2018/09">
            </el-table-column>
            <el-table-column
            prop="amount1"
            sortable
            label="2018/09">
            </el-table-column>
            <el-table-column
            prop="amount2"
            sortable
            label="2018/09">
            </el-table-column>
            <el-table-column
            prop="amount3"
            sortable
            label="2018/09">
            </el-table-column>
            <el-table-column
            prop="amount3"
            sortable
            label="合计">
            </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="text-align-center mt26">
        <button class="bg-grey btn white bd-grey" @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nameSelect:[],
        tableDetail:[
            {
                id:'学费'
            },
            {
                id:'餐费'
            },
            {
                id:'物品费'
            },
            {
                id:'活动费'
            },
            {
                id:'保险费'
            },
            {
                id:'其他'
            }
        ],
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
  .revenueDetail{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .revenueDetail .secondtable >>> th{
    background-color: #fff !important;
  }
  .revenueDetail .bold{
    font-weight: bold;
    color: black;
  }
  .revenueDetail .select-header,.refundlist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .revenueDetail .el-select{
    width: 10%;
  }
  .revenueDetail >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  .revenueDetail >>> .el-input__inner {
    width: -webkit-fill-available;
  }
</style>
