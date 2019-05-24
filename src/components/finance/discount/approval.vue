<template>
    <div class="approval wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 学生折扣 > <span class="font-cl-blue">折扣详情</span></p>
      </div>
        <div class="content-top">员工子女折扣</div>
        <div class="clearfix">

            <el-col :span="24" class="card-type">
                <el-card shadow="always" class="clearfix">
                    <p class="baseInfo">基本信息</p>
                    <div style="width:90%" class="left">
                        <p class="bold" style="border-bottom:1px solid #bbb">
                            <span class="mr26">折扣申请学生：曹旭</span>
                            <span class="mr26">状态：
                                <span>已确认</span>
                            </span>
                        </p>
                        <p class="bold" style="border-bottom:1px solid #bbb">
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">拟入学日期：-12</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">拟入学日期：.00</div></el-col>
                                <el-col :span="10"><div class="grid-content bg-purple">学费正价：政策名称—学费科目—10000元.00</div></el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">申请折扣：20%</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">应缴总额：10000元</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">优惠金额：2000元</div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple">折后总额：8000元</div></el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">备注：— —/03/01</div></el-col>
                            </el-row>
                        </p>
                        <p>
                            <el-row :gutter="20">
                                <el-col :span="5"><div class="grid-content bg-purple">相关附件：</div></el-col>
                            </el-row>
                            <el-row :gutter="20" v-for="(item,index) in tableData" :key="index">
                                <el-col :span="5"><a download="download" class="grid-content bg-purple" href="../../../assets/img/logo.png">员工子女折扣申请表.pdf</a></el-col>
                            </el-row>
                        </p>
                    </div>
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
                <button class="btn bg-grey">返回</button>
                <button class="btn bg-green">提交</button>
        </div>
    </div>
</template>
<style scoped>
  .approval .content-top{
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
  .approval .card-type {
      line-height: 40px;
  }
  .approval .el-card__body {
      padding: 30px 70px 10px 10px;
  }
  .approval .el-card__body:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
}
  .approval .tableList {
      color:#101010;
  }
  .approval .baseInfo {
      width: 5%;
      font-weight: 600;
      float: left;
      margin-right: 10px;
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
