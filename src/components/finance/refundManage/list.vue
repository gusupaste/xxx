<template>
    <div class="settinglist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">退费管理</span></p>
      </div>
      <div class="content" style="margin-top: 15px">
        <div class="select-header">
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
          <span style="margin-left: 10px">账单状态：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 20px">搜索：</span>
          <el-input v-model="input" placeholder="输入学号、学生姓名或者学生卡号" style="width: auto"></el-input>
          <span><el-button type="primary" @click="searchList">搜索</el-button></span>
          <span class="right" style="cursor:pointer" @click="addNewDiscount(1)">
              <i class="icon-font fa fa-calendar-plus-o"></i>
              <span class="font-cl-blue font-size-14" >毕业/离园退费账单</span>
          </span>
          <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
              <i class="icon-font fa fa-calendar-plus-o"></i>
              <span class="font-cl-blue font-size-14" >预备生退费账单</span>
          </span>
        </div>
        <div class="list-content">
          <el-table
            :data="chargeTableDate"
            border
            stripe
            show-header
            style="width: 100%;">
            <el-table-column
              label="账单号">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showRefundInfo(scope.row)">{{scope.row.code}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="账单类型">
            </el-table-column>
            <el-table-column
              prop="hq_name"
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
              prop="opening_date"
              label="退费金额（不包含备用金）">
            </el-table-column>
            <el-table-column
              prop="leader"
              label="创建日期">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="账单状态">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="操作">
              <template slot-scope="slote">
                <i class="fa fa-print green font-size-20 ml10 cur"></i>
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
        chargeFunTableDate:[
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
            checked:'',
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
            checked:'',
          }
        ],
      };
    },
    methods: {
      showRefundInfo:function (param) {
        this.$router.push('/financemanagement/refund-detail/9');
      },
      addNewDiscount:function (flag) {
        if(flag === 0){
          this.$router.push('/financemanagement/preparatory-student');
        }else{
          this.$router.push('/financemanagement/leave-student');
        }
      }
    },
    watch:{
    },
  }
</script>

<style scoped>
  .settinglist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .settinglist .select-header{
    line-height: 50px;
  }
  .settinglist .select-header,.settinglist .list-content{
    width: 100%;
    min-height: 50px;
  }
  .settinglist .select-header >>> .el-select{
    width: 10%;
  }
  .settinglist .select-header >>> .el-input__inner{
    width: inherit;
  }
</style>
