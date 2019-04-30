<template>
    <div class="academicChange wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 账单制作 > <span class="font-cl-blue">学业变更费用补缴</span></p>
      </div>
        <div class="content-top mt26">学业变更费用补缴</div>
        <div class="clearfix mt10">
            <el-form inline>
                <el-form-item label="学校：">合肥御龙湾校园</el-form-item>
                <br>
                <el-form-item label="学生：">
                    <el-button style="border-raius:20px">
                        <i class="fa fa-search"></i>添加
                    </el-button>
                </el-form-item>
                <br>
                <el-form-item label="申请学年：">
                    <el-select v-model="value1"></el-select>
                </el-form-item>
                <el-form-item label="申请变更班级：">
                    <el-select v-model="value1"></el-select>
                </el-form-item>
                <el-form-item label="申请变更日期：">
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <div class="mt26 head-detail">
            已缴费情况描述
            补缴费用明细
        </div>
        <div class=" tableList">
            <el-table
                class=""
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
                label="校历日总数">
                </el-table-column>
                <el-table-column
                prop="address"
                label="实际应缴金额">
                </el-table-column>
                <el-table-column
                prop="address"
                label="已缴金额">
                </el-table-column>
                <el-table-column
                prop="address"
                label="调整前价格 ">
                </el-table-column>
                <el-table-column
                prop="address"
                label="调整后价格">
                </el-table-column>
                <el-table-column
                prop="address"
                label="当月费用补缴">
                </el-table-column>
                <el-table-column
                prop="address"
                label="应补缴金额">
                </el-table-column>
            </el-table>
        </div>
        <div class="mt26" style="text-align:right">
            补缴合计：<span class="red">— —</span>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey">返回</button>
            <button class="btn bg-green">保存</button>
        </div>
    </div>
</template>
<style scoped>
  .academicChange .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    border-radius: 3px;
    color: #3E7193;
  }
  .academicChange .card-type {
      line-height: 30px;
  }
  .academicChange .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .academicChange .tableList {
      color:#101010;
  }
  .academicChange .el-form-item {
     margin-bottom: 10px;
  }
  .academicChange .el-form {
     padding:20px;
     border:1px solid #CCCCCC;
  }
  .academicChange .head-detail {
     background-color: #ccc;
     color: #101010;
     height: 40px;
     line-height: 40px;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
</style>
<script>
export default {
    data(){
        return {
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
