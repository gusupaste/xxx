<template>
  <div class="discountlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">备用金管理</span></p>
    </div>
    <div class="content">
      <div class="select-header">
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
        <span style="margin-left: 20px">学生姓名</span>
        <el-input v-model="input" placeholder="输入关键字" style="width: 15%;"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
        <span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/create-reservefund')">
            <i class="icon-font fa fa-calendar-plus-o"></i>
            <span class="font-cl-blue font-size-14">推迟入园转备用金</span>
        </span>
        <span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/create-reserve')">
            <i class="icon-font fa fa-calendar-plus-o"></i>
            <span class="font-cl-blue font-size-14">缺勤请假转备用金</span>
        </span>
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
            label="学号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="intercity_name"
            label="所在班级">
          </el-table-column>
          <el-table-column
            label="初期余额">
            <el-table-column
              prop="province"
              label="普惠">
            </el-table-column>
            <el-table-column
              prop="city"
              label="非普惠">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="本学年结转额">
            <el-table-column
              prop="province"
              label="普惠">
            </el-table-column>
            <el-table-column
              prop="city"
              label="非普惠">
            </el-table-column>
          </el-table-column>
          <el-table-column
            label="本学年待批使用">
            <el-table-column
              prop="province"
              label="普惠">
            </el-table-column>
            <el-table-column
              prop="city"
              label="非普惠">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="本学年已使用">
            <el-table-column
              prop="province"
              label="普惠">
            </el-table-column>
            <el-table-column
              prop="city"
              label="非普惠">
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="status_name"
            label="可用余额">
            <el-table-column
              prop="province"
              label="普惠">
            </el-table-column>
            <el-table-column
              prop="city"
              label="非普惠">
            </el-table-column>
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
    line-height: 50px;
  }
  .discountlist .el-select{
    width: 10%;
  }
  .discountlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  .discountlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
</style>
