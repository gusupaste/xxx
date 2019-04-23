<template>
  <div class='academicyear wrap'>
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">学年定义</span></p>
    </div>
    <div class="content">
      <el-col class="box-margin" :span="7">
        <el-card shadow="always">
          <div class="div-add-button" @click="addDialog(0)">
            <br><span class="el-icon-circle-plus-outline"></span><p>新增学年</p>
            </div>
        </el-card>
      </el-col>
      <el-col class="box-margin" :span="7">
        <el-card shadow="always">
          <div class="div-box-term">
            <p class="font-cl-blue">2020——2021学年<i class="fa fa-pencil-square-o orange right" @click="addDialog(1)"></i></p>
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
    <!--新增学年 弹框-->
    <el-dialog :title="title" :visible.sync="addacademicYear" width="50%" style="padding: 30px 60px;">
      <el-form label-width="80px">
        <el-form-item label="学年名:">
          <el-input placeholder="请输入" maxlength="15" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="上学期:">
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line text-align-center" :span="2">-</el-col>
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="下学期:">
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line text-align-center" :span="2">-</el-col>
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="addacademicYear = false">取 消</el-button>
          <el-button type="success" @click="addacademicYear = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        title:'新增学年',
        addacademicYear: false,
      };
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      addDialog: function (num) {
        if(num === 0){
          this.title = '新增学年'
        }else{
          this.title = '编辑学年'
        }
          this.addacademicYear = true;
      }
    }
  }
</script>

<style scoped>
  .academicyear {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .academicyear .header p {
    font-size: 14px;
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
    margin: 10px 50px 20px 0;
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
  .academicyear >>>.el-dialog__footer{
    text-align: center;
  }

</style>
