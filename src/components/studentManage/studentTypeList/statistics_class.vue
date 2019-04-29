<template>
  <div class="studentFile">
      <div class="studentFileList">
        <div class="left" style="width:29%">
          <p>在校生情况</p>
          <div class="studentInfo">
            <p>当前在校生人数：<span>28900</span></p>
            <p>预备生人数：<span>28900</span></p>
            <p>满园率（包含预备生）：<span>28900</span></p>
          </div>
          <p style="margin-top: 15px">性别分布图（包含预备生）</p>
          <div class="studentInfo">
            <chart ref="chart1" :options="orgOptions"></chart>
          </div>
        </div>
        <div class="right" style="width:70%">
          <el-table
            :data="chargeTableDate"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 35px;">
            <el-table-column
              prop="code"
              label="班级名称">
            </el-table-column>
            <el-table-column
              prop="name"
              label="满班学生数">
            </el-table-column>
            <el-table-column
              prop="intercity_name"
              label="当前在校生人数">
            </el-table-column>
            <el-table-column
              prop="intercity_name"
              label="预备生人数">
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="满班率（含预备生）">
            </el-table-column>
          </el-table>
        </div>
      </div>
  </div>
</template>
<style scoped>
  .studentFile .formwrap {
    margin-top: 20px;
  }
  .studentFile .studentFileList {
    margin-top: 20px;
  }
  .studentFile .el-form-item {
    margin-bottom: 10px;
  }
  .studentFile .studentFileCard {
    cursor: pointer;
    margin-right: 5%;
    margin-bottom: 40px;
    border: 1px solid #bbb;
    width: 27%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    -moz-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
  }
  .studentFile .studentFileCard  img{
    width: 100px;
    height: 100px;
  }
  .studentFile .studentInfo{
    border: 1px solid #ddd;
    width: 90%;
    padding: 20px;
    margin-top: 15px;
  }
  .studentFile .studentInfo p{
    line-height: 40px;
  }
</style>
<script>
export default {
  data(){
    return {
       orgOptions: {},
       list:[1,2,3,4,5,6,7,81,],
       form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  mounted() {
    this.orgOptions = {
      series : [
        {
          type: 'pie',
          radius : '40%',
          center: ['27%', '25%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
          ],
        }
      ]
    }
  },
}
</script>
