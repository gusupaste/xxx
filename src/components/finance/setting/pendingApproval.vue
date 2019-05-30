<template>
    <div class="billDetail wrap">
        <p class="local_path_style">You Are Here  ：财务处理 > 收费账单 > <span class="font-cl-blue">确认账单明细</span></p>
        <div class="content-top">制单信息（预制订单）</div>
        <div class="clearfix">
            <el-col :span="24" class="card-type">
                <el-card shadow="always">
                <p class="bold" style="border-bottom:1px solid #bbb">
                    <span class="mr26">制单人：曹旭</span>
                    <span class="mr26">制单日期：2019/02/26</span>
                    <span class="mr26">状态：
                        <span>已确认</span>
                    </span>
                </p>
                <p class="bold">
                    <el-row :gutter="20">
                        <el-col :span="4"><div class="grid-content bg-purple">账单编号：HNCJDJDDD09-12</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple">应缴金额：¥12700.00</div></el-col>
                        <!--<el-col :span="4"><div class="grid-content bg-purple">账单余额：¥0.00</div></el-col>-->
                    </el-row></p>
                <p>
                    <el-row :gutter="20">
                        <el-col :span="4"><div class="grid-content bg-purple">学生姓名：学生A</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple">所在校园：合肥玉龙校园</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple">所在班级：大二班</div></el-col>
                    </el-row>
                </p>
                <p>
                <el-row :gutter="20">
                    <el-col :span="4"><div class="grid-content bg-purple">入学日期：2019/03/01</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">缴费账期：2018-2019学年</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">费用应缴日期：2019/01/30</div></el-col>
                </el-row>
                </p>
                </el-card>
            </el-col>
        </div>
        <div class="mt26 tableList">
            <p>审批记录：</p>
            <el-table
                class="mt10"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="审批节点"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="审批角色"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="审批结果">
                </el-table-column>
                <el-table-column
                prop="address"
                label="审批意见">
                </el-table-column>
                <el-table-column
                prop="address"
                label="审批日期">
                </el-table-column>
            </el-table>
        </div>
        <div class="mt26 tableList">
            <p>费用分摊明细：</p>
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
                label="缴费方式">
                </el-table-column>
                <el-table-column
                prop="address"
                label="缴费区间">
                </el-table-column>
                <el-table-column
                prop="address"
                label="正价应收">
                </el-table-column>
                <el-table-column
                prop="address"
                label="折扣">
                </el-table-column>
                <el-table-column
                prop="address"
                label="折后应收">
                </el-table-column>
            </el-table>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey">取消</button>
            <button class="btn bg-green">提交</button>
        </div>
    </div>
</template>
<style scoped>
  .billDetail .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    position: relative;
    top: 20px;
    left: -5px;
    border-radius: 3px;
    color: #3E7193;
  }
  .billDetail .card-type {
      line-height: 30px;
  }
  .billDetail .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .billDetail .tableList {
      color:#101010;
  }
</style>
<script>
export default {
    data(){
        return {
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
