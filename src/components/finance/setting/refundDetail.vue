<template>
    <div class="billDetail wrap">
        <p class="local_path_style">You Are Here  ：财务处理 > 财务设置 > <span class="font-cl-blue">配置退费规则</span></p>
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
