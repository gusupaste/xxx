<template>
  <div class="billDetailSc wrap">
    <p class="local_path_style">You Are Here  ：财务处理 > 备用金管理 > <span class="font-cl-blue">推迟入园转备用金</span></p>
    <div class="content-top">推迟入园转备用金</div>
    <div class="clearfix">
      <el-col :span="24" class="card-type">
        <el-card shadow="always">
          <p style="line-height: 40px;">
            <el-row :gutter="20">
              <el-col :span="20"><div class="grid-content bg-purple">申请学校：合肥玉龙校园</div></el-col>
            </el-row></p>
          <p style="line-height: 40px;">
            <el-row :gutter="24">
              <el-col :span="6"><div class="grid-content bg-purple">学生：</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">学生姓名：</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">学生状态：</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">班级：</div></el-col>
            </el-row>
          </p>
          <p style="line-height: 40px;">
            <el-row :gutter="24">
              <el-col :span="6"><div class="grid-content bg-purple">原计划入学日期：
                <el-select>
                </el-select>
              </div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">申请推迟入学日期：
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
          label="已缴费情况描述">
          <el-table-column
            prop="name"
            label="费用科目">
          </el-table-column>
          <el-table-column
            prop="address"
            label="缴费方式">
          </el-table-column>
          <el-table-column
            prop="name"
            label="费用科目">
          </el-table-column>
          <el-table-column
            prop="address"
            label="起止日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="校日历总数">
          </el-table-column>
          <el-table-column
            label="实际应缴费用">
          </el-table-column>
            <el-table-column
              prop="name"
              label="已缴金额">
            </el-table-column>
            <el-table-column
              prop="address"
              label="单价">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="申请推迟入学后的应缴费用">
          <el-table-column
            prop="name"
            label="变更后单价">
          </el-table-column>
          <el-table-column
            prop="address"
            label="校日历总数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="变更后应收费用">
          </el-table-column>
          <el-table-column
            prop="address"
            label="差额">
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
