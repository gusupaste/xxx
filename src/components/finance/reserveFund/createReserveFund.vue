<template>
  <div class="billDetailSc wrap">
    <p class="local_path_style">You Are Here  ：财务处理 > 备用金管理 > <span class="font-cl-blue">缺勤请假转备用金</span></p>
    <div class="content-top">缺勤请假转备用金</div>
    <div class="clearfix">
      <el-col :span="24" class="card-type">
        <el-card shadow="always">
          <p style="line-height: 40px;">
            <el-row :gutter="20">
              <el-col :span="8"><div class="grid-content bg-purple">申请学校：合肥玉龙校园</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple">申请人：¥12700.00</div></el-col>
            </el-row></p>
          <p style="line-height: 40px;">
            <el-row :gutter="24">
              <el-col :span="8"><div class="grid-content bg-purple">申请班级：
                <el-select>
                </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple">申请月份：
                <el-select>
                </el-select>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple">申请日期：
                <el-select>
                </el-select>
              </div></el-col>
            </el-row>
          </p>
        </el-card>
      </el-col>
    </div>
    <div class="mt26 tableList">
      <el-table
        class="mt10"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="学生信息">
          <el-table-column
            prop="name"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="姓名">
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="name"
          label="学费退费">
          <el-table-column
            prop="name"
            label="缴费类型">
          </el-table-column>
          <el-table-column
            prop="address"
            label="（折合）单价（元/月）">
          </el-table-column>
          <el-table-column
            prop="name"
            label="本月请假/缺勤天数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="可退转计数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="学费应退金额">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="餐费退费">
          <el-table-column
            prop="name"
            label="连续超过3天的天数小计">
          </el-table-column>
          <el-table-column
            prop="address"
            label="餐费退转单价">
          </el-table-column>
          <el-table-column
            prop="name"
            label="餐费应退金额">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="合计">
          <el-table-column
            prop="name"
            label="应退转金额小计">
          </el-table-column>
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
  .billDetailSc .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: fit-content;
    padding: 8px 20px 8px 20px;
    margin: 20px 0px;
    /*position: relative;*/
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
