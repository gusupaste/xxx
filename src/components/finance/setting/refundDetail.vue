<template>
    <div class="refunDetail wrap">
        <p class="local_path_style">You Are Here  ：财务处理 > 财务设置 > <span class="font-cl-blue">配置退费规则</span></p>
        <h1>合肥用龙湾幼儿园</h1>
        <div class="select-header select-length" style="line-height:45px">
            <span>学年：</span>
            <el-select v-model="searchform.intercity_id" placeholder="请选择">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in intercityList"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
              </el-option>
            </el-select>
            <span>有效期：</span>
            <el-select v-model="searchform.intercity_id" placeholder="请选择">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in intercityList"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="padding-left-30"><el-button type="primary" @click="searchList(1)">搜索</el-button></span>
        </div>
      <table>
          <thead>
              <tr>
                <td colspan="6">非普惠</td>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td width="80px">学生类型</td>
                <td colspan="5">退费判定条件</td>
              </tr>
              <tr>
                <td rowspan="6">预备生</td>
                <td rowspan="4" colspan="2" style="width:60px">退费</td>
                <td colspan="3">已领物品，是否减物品费用</td>
              </tr>
              <tr>
                <td colspan="3">总部外籍子女，退</td>
              </tr>
              <tr>
                <td rowspan="2">总部非外籍子女，退</td>
                <td colspan="2">按时提交申请，退</td>
              </tr>
              <tr>
                <td colspan="2">未按时提交申请，退</td>
              </tr>
              <tr>
                <td colspan="2">延迟入园</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="2">无发票</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td rowspan="18">在校生</td>
                <td rowspan="11">学费</td>
                <td>转班</td>
                <td colspan="3">学费-学费/已消费月，转备用</td>
              </tr>
              <tr>
                <td rowspan="6">退学</td>
                <td rowspan="3">月缴</td>
                <td colspan="2">学费-学费/已消费月，转备用</td>
              </tr>
              <tr>
                <td colspan="2">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="2">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td rowspan="2">学期缴</td>
                <td colspan="2">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="2">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="3">未按时提申请，扣月</td>
              </tr>
              <tr>
                <td rowspan="2">休学</td>
                <td colspan="3">按时提申请，首月%转备用金，剩余月%转备用金</td>
              </tr>
              <tr>
                <td colspan="3">未按时提申请，首月转缺勤，次月%转备用金，剩余月%转备用金</td>
              </tr>
              <tr>
                <td rowspan="2">缺勤</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="3">添加判定条件</td>
              </tr>
              <tr>
                <td rowspan="3" colspan="2">餐费</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td rowspan="2">非整月</td>
                <td>O</td>
                <td colspan="">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td>O</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="2">物品费</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="2">活动费</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="2">校车费</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
              <tr>
                <td colspan="2">无发票</td>
                <td colspan="3">所有金额转备用金，退</td>
              </tr>
          </tbody>
      </table>
      <table style="margin-top: 50px">
        <thead>
        <tr>
          <td >普惠</td>
        </tr>
        </thead>
      </table>
    </div>
</template>
<style scoped>
  .refunDetail thead{
    background-color: #BBBBBB;
    color: #333333;
    font-weight: bold
  }
  .refunDetail table{
    border: 1px #A0A0A0 solid;
    border-collapse: collapse;
    width: 100%;
    color:#101010;
    text-align: center;
  }
  .refunDetail td{
    border: 1px #ccc solid;
    padding: 10px;
  }
</style>
<script>
export default {
    data(){
        return {
            searchform:{
                intercity_id:'',
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }]
        }
    }
}
</script>
