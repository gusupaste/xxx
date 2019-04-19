<template>
  <div class='academicyear'>
    <div class="header">
      <p>YOU ARE HERE : 系统管理 >> <span class="font-cl-blue">学年定义</span></p>
    </div>
    <div class="content">
      <el-col class="box-margin" :span="7">
        <el-card shadow="always">
          <div class="div-add-button">
            <br><span class="el-icon-circle-plus-outline"></span><p>新增学年</p>
            </div>
        </el-card>
      </el-col>
      <el-col class="box-margin" :span="7">
        <el-card shadow="always">
          <div class="div-box-term">
            <p class="font-cl-blue">2020——2021学年<i class="fa fa-pencil-square-o orange right"></i></p>
            <p class="font-size-12">2020-01-01——2021-01-01</p>
            <hr class="line-solid"/>
            <ul class="ul-color">
              <li><span>上学期：从2011-01-01至2011-02-02</span></li>
              <br>
              <li><span>下学期：从2011-01-01至2011-02-02</span></li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col class="box-margin" :span="7">
          <el-card shadow="always">
            <div class="div-box-term">
              <p class="font-cl-blue">2020——2021学年<i class="fa fa-pencil-square-o orange right"></i></p>
              <p class="font-size-12">2020-01-01——2021-01-01</p>
              <hr class="line-solid"/>
              <ul class="ul-color">
                <li><span>上学期：从2011-01-01至2011-02-02</span></li>
                <br>
                <li><span>下学期：从2011-01-01至2011-02-02</span></li>
              </ul>
            </div>
          </el-card>
      </el-col>
      <el-col class="box-margin" :span="7">
        <el-card shadow="always">
          <div class="div-box-term">
            <p class="font-cl-blue">2020——2021学年<i class="fa fa-pencil-square-o orange right"></i></p>
            <p class="font-size-12">2020-01-01——2021-01-01</p>
            <hr class="line-solid"/>
            <ul class="ul-color">
              <li><span>上学期：从2011-01-01至2011-02-02</span></li>
              <br>
              <li><span>下学期：从2011-01-01至2011-02-02</span></li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col class="box-margin" :span="7">
        <el-card shadow="always">
          <div class="div-box-term">
            <p class="font-cl-blue">2020——2021学年<i class="fa fa-pencil-square-o orange right"></i></p>
            <p class="font-size-12">2020-01-01——2021-01-01</p>
            <hr class="line-solid"/>
            <ul class="ul-color">
              <li><span>上学期：从2011-01-01至2011-02-02</span></li>
              <br>
              <li><span>下学期：从2011-01-01至2011-02-02</span></li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list'
  }
</script>

<style scoped>
  .academicyear {
    padding: 0px 40px;
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .academicyear .header p {
    font-size: 14px;
    margin: 10px 0px;
  }
  .academicyear .div-add-button{
    cursor: pointer;
    width: 100%;
    text-align: center;
    color: #0b6289;
    height: 150px;
  }
  .academicyear .el-icon-circle-plus-outline{
    font-size: 70px;
  }
  .academicyear .box-margin{
    margin: 20px;
  }
  .academicyear .div-box-term{
    width: 100%;
    text-align: left;
    height: 150px;
  }
  .academicyear .line-solid{
    width: 100%;
    text-align: center;
    margin: 10px 0;
    color: #ccc;
  }
  .academicyear .ul-color{
    margin: 20px;
    color: #ccc;
  }
  .academicyear .ul-color span{
    color: black;
  }

</style>
