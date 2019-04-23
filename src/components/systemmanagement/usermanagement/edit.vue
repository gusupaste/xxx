<template>
  <div class="editusermanagement wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">修改用户</span></p>
    </div>
    <div class="header">
      <div>
        <p class="bold_black">账号设置：</p>
        <div class="content">
          <el-form class="account_set" :inline="true" :label-position="labelPosition" label-width="150px">
            <el-form-item class="mt10" label="用户名：">
              <el-input></el-input>
            </el-form-item>
            <el-form-item class="mt10" label="登陆名：">
              <el-input></el-input>
            </el-form-item>
            <br>
            <el-form-item label="密码：">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input></el-input>
            </el-form-item>
            <br>
            <el-form-item label="FirstName：">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="LasttName：">
              <el-input></el-input>
            </el-form-item>
            <br>
            <el-form-item label="Email：">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="所属组织：">
              <el-input></el-input>
            </el-form-item>
            <i class="fa fa-plus-square-o orange" @click="addOrganization" style="margin-top: 18px"></i>
          </el-form>
        </div>
      </div>
      <div class="content_top">
        <p class="bold_black">该用户被赋予的系统角色：</p>
        <div class="content">
          <el-table
            ref="multipleTable"
            :data="roleOfUser"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="角色名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="描述"
              min-width="250">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <i class="fa fa-search"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="content_top">
        <p class="bold_black">管辖幼儿园：</p>
        <div class="content padding-20">
          <el-row class="margin-10" :gutter="150">
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10001】休息休息</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10002】官方的 v</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10003】粉色的 v</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10004】苟富贵</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10004】发热个人</el-checkbox></div></el-col>
          </el-row>
          <el-row class="margin-10" :gutter="150">
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10001】冯绍峰的事</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10002】萨达大厦</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10003】多少啊</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10004】大大大多少啊</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10004】大大大多少啊</el-checkbox></div></el-col>
          </el-row>
          <el-row class="margin-10" :gutter="150">
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10001】bfdssad</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10002】dsadada</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10003】dasda</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10004】fdsfdsfe</el-checkbox></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox v-model="checked">【10004】ewrewrfd</el-checkbox></div></el-col>
          </el-row>
        </div>
      </div>
      <div class="footer-btn">
        <button class="btn bg-grey" style="margin: 50px">取消</button>
        <button class="btn bg-green">保存</button>
      </div>
    </div>
    <!--添加 弹框-->
    <el-dialog title="添加组织" :visible.sync="addorganization" width="50%" style="padding: 30px 60px;">
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="addorganization = false">取 消</el-button>
          <el-button type="success" @click="addorganization = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        class: '',
        labelPosition: 'right',
        multipleSelection: [],
        addorganization:false,
        roleOfUser:[{
          id:'1',
          name:'fesf',
          describe:'buhahdjskagdjadhbamd'
        },{
          id:'2',
          name:'totm',
          describe:'buhahdjskagdjadhbamd'
        }
        ]

      }
    },
    methods:{
      handleSelectionChange(val) {
        //拿到数据
        this.multipleSelection = val;
      },
      addOrganization:function () {
        this.addorganization = true;
      }
    }
  }
</script>

<style scoped>
  .editusermanagement {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .editusermanagement p {
    margin: 10px;
  }
  .editusermanagement .header p {
    font-size: 14px;
  }
  .editusermanagement .content{
    border: 1px solid #ccc;
  }
  .editusermanagement .account_set .el-form-item{
    margin-bottom: 10px;
  }
  .editusermanagement .el-table_1_column_3 .cell{
    text-align: left;
    padding-left: 40px;
  }
  .editusermanagement .el-table td,.editusermanagement .el-table th{
    text-align: center;
  }
  .editusermanagement .el-dialog__footer{
    text-align: center;
  }
  .editusermanagement .padding-20{
    padding: 40px;
  }
  .editusermanagement .margin-10{
    margin: 10px;
  }
  .editusermanagement .footer-btn{
    text-align: center;
  }
  .editusermanagement .content_top{
    margin-top: 40px;
  }
</style>
