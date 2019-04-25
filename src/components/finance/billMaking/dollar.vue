<template>
    <div class="dollar wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 账单制作 > <span class="font-cl-blue">缴费</span></p>
      </div>
        <div class="clearfix mt10">
            <el-form>
                <el-form-item label="应收金额：" label-width="120px">
                     ¥3000.00
                </el-form-item>
                <el-form-item label="备用金金额：" label-width="120px">
                     ¥200.00
                </el-form-item>
                <el-form-item label="" label-width="120px">
                    <span class="red">可以使用备用金抵扣收费，是否使用备用金？</span>
                    <br>
                    <el-checkbox  v-model="value1">是，使用备用金</el-checkbox> <el-input style="width:200px"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="收费情况：" label-width="120px">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="支付方式"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="助学金"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="现金">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="POS刷卡">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="电汇转账">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="支票">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="代扣卡">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="电子支付">
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="实收金额：" label-width="120px">
                     ¥200.00
                </el-form-item>
                <el-form-item label="备用金抵扣：" label-width="120px">
                     ¥200.00
                </el-form-item>
                <el-form-item label="合计：" label-width="120px">
                     <span class="bold font-size-20 red "> ¥5000.00  </span>
                </el-form-item>
                <el-form-item label="" label-width="120px">
                     <span>合计缴费金额大于应收金额，多余2000.00元将自动结转进备用金</span>
                </el-form-item>
            </el-form>
        </div>
        <p class="title-style mt26">费用分摊明细：</p>
        <div class=" tableList">
            <el-table
                class="mt10"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="费用类型"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="费用科目"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="正价">
                </el-table-column>
                <el-table-column
                prop="address"
                label="折扣">
                </el-table-column>
                <el-table-column
                prop="address"
                label="折后应收">
                </el-table-column>
                <el-table-column
                prop="address"
                label="欠费">
                </el-table-column>
                <el-table-column
                prop="address"
                label="备用金">
                </el-table-column>
                <el-table-column
                prop="address"
                label="实收">
                </el-table-column>
                <el-table-column
                prop="address"
                label="本期余额">
                </el-table-column>
            </el-table>
        </div>
        <div class="line-under">

        </div>
        <el-form class="mt26" style="border:none">
            <el-form-item label="其他补充信息：" label-width="120px">
                <span>xxxxxxxxxxx</span>
            </el-form-item>
            <el-form-item label="开票需求：" label-width="120px">
                 <el-checkbox  v-model="value1">是，使用备用金</el-checkbox>
            </el-form-item>
            <el-form-item label="可开票据金额：" label-width="120px">
                <el-input></el-input>
            </el-form-item>
        </el-form>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey">返回</button>
            <button class="btn bg-green">确定</button>

        </div>
    </div>
</template>
<style scoped>
  .dollar .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    border-radius: 3px;
    color: #3E7193;
  }
  .dollar .card-type {
      line-height: 30px;
  }
  .dollar .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .dollar .tableList {
      color:#101010;
  }
  .dollar .el-form-item {
     margin-bottom: 10px;
  }
  .dollar .el-form {
     padding:20px;
     border:1px solid #CCCCCC;
  }
  .dollar .head-detail {
     background-color: #ccc;
     color: #101010;
     height: 40px;
     line-height: 40px;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
  .dollar >>> .el-form th {
      background-color: #fff;
  }
  .dollar .line-under {
      height: 20px;
      border-bottom: 1px solid #bbb;
  }
</style>
<script>
export default {
    data(){
        return {
            list:[1,2,3,4,5,6,7,7,7,],
            value1:'2000-09-09',
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
