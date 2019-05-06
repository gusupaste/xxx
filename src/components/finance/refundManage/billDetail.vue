<template>
    <div class="billDetail wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">退费管理</span></p>
      </div>
        <div class="content-top">预备生退费账单</div>
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
                <p>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">学生姓名：学生A</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学号：28342368476</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">所在班级：大二班</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学生当前状态：大二班</div></el-col>
                </el-row>
                </p>
                <p>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">最后出勤日期：2019/03/01</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">申请退费日期：2018-2019学年</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学年：2019/01/30</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">单据申请信息：2019/01/30</div></el-col>
                </el-row>
                </p>
                <p>
                  <el-row>
                    <el-col :span="8"><div class="grid-content bg-purple">离园原因：搬家</div></el-col>
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
            <p>退费明细（标准项目）：</p>
            <el-table
                class="mt10"
                :data="tableData"
                border
                style="width: 100%">
              <el-table-column label="已缴费情况描述">
                <el-table-column
                prop="date"
                label="缴费项目">
                </el-table-column>
                <el-table-column
                prop="name"
                label="缴费方式">
                </el-table-column>
                <el-table-column
                prop="address"
                label="起止日期">
                </el-table-column>
                <el-table-column
                prop="address"
                label="校日历总数">
                </el-table-column>
                <el-table-column
                prop="address"
                label="折前价">
                </el-table-column>
                <el-table-column
                prop="address"
                label="折后价">
                </el-table-column>
                <el-table-column
                prop="address"
                label="单价">
                </el-table-column>
              </el-table-column>
              <el-table-column label="需退费情况描述">
                <el-table-column
                  prop="date"
                  label="退费当月出勤天数">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="剩余校日历总数">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="应退计数">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="折扣单价">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="不足通知期扣款">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="应退转金额小计">
                </el-table-column>
              </el-table-column>
            </el-table>
        </div>
        <div class="mt26 tableList">
          <p>制度外退费（其他扣款/退费项目明细）：</p>
          <el-table
            class="mt10"
            :data="tableData"
            border
            style="width: 100%">
              <el-table-column
                prop="date"
                label="扣款/退款">
              </el-table-column>
              <el-table-column
                prop="name"
                label="项目名称">
              </el-table-column>
              <el-table-column
                prop="address"
                label="情况说明">
              </el-table-column>
              <el-table-column
                prop="address"
                label="金额小计">
              </el-table-column>
          </el-table>
          <hr><p class="right">实际应退金额合集：<span class="red">10600.00</span></p>
        </div>
        <div class="mt26 tableList">
          <p>相关附件：</p>
          <el-table
            class="mt10"
            :data="tableData"
            border
            style="width: 100%">
              <el-table-column
                prop="date"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="name"
                label="附件名称">
              </el-table-column>
              <el-table-column
                prop="address"
                label="上传用户">
              </el-table-column>
              <el-table-column
                prop="address"
                label="上传日期">
              </el-table-column>
          </el-table>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey">返回</button>
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
  .billDetail hr {
    margin: 10px 0;
    border: 0px;
    border-bottom: 1px solid #ddd;
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
