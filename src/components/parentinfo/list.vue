<template>
  <div class="parentinfo wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE :<span class="font-cl-blue">家长信息</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <span>选择校园：</span>
        <el-select v-model="nameSelect" placeholder="--区域--">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="nameSelect" placeholder="--校园--">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">联系人级别：</span>
        <el-select v-model="nameSelect" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-left: 10px">查询条件：</span>
        <el-input placeholder="输入关键字" style="width: 15%"></el-input>
        <span class="padding-left-30">
            <el-button type="primary" @click="searchList">查询</el-button>
        </span>
      </div>
      <div class="content-list">
        <el-table
          :data="templateList"
          stripe
          border
          show-header
          :span-method="objectSpanMethod"
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            prop="pname"
            label="家长姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="学生姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="school_name"
            label="通讯地址">
          </el-table-column>
          <el-table-column
            prop="yb"
            label="邮编"
            width="100">
          </el-table-column>
          <el-table-column
            prop="emil"
            label="邮箱"
            width="100">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="家庭电话"
            width="100">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            width="100">
          </el-table-column>
          <el-table-column
            prop="term"
            label="紧急联系级别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="setting"
            label="账号设置"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="30">
            <template slot-scope="scope">
              <el-button class="red" type="text" size="small" @click="editbrandVisible = true">
                <span class="el-icon-edit-outline" style="font-size: 20px;color: #ED6C2E;"></span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="修改家长资料" :visible.sync="editbrandVisible" width="70%" class="editParent">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="家长姓名">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关系">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国籍">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="工作单位">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担任职位">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮件">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="办公电话">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="移动电话">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭电话">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="紧急联系级别" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首选联系方式" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="家长第一语言" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家长第二语言" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <hr><br>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="checked">设置账号</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号" label-width="40">
              <span v-model="editForm.pname">123567125647154(默认手机号)</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <span v-model="editForm.pname">123456</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editbrandVisible = false">取 消</el-button>
          <el-button type="success" @click="editbrandVisible = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  .parentinfo .header p{
    font-size: 14px;
  }
  .parentinfo{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .parentinfo .content{
    min-height: 20px;
    width: 100%;
    margin-top: 10px;
  }
  .parentinfo el-select{
    width: 10%;
  }
  .parentinfo .select-header{
    margin-bottom: 20px;
  }
  .parentinfo >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .parentinfo .el-input{
    width: 180px;
  }
</style>
<script>
export default {
  data(){
    return {
      editbrandVisible:false,
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
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      editForm:{
        id:'',
        name:'',
        relevance:'',
      },
      templateList: [
        {
          id:1,
          pname:'家长姓名',
          sname:'学生姓名',
          school_name:'北京朝阳区xxx幼儿园',
          yb:'100000001',
          emil:'1000000000@qq.com',
          tel:'1947298374823',
          phone:'86528736',
          term:'第一级别',
          setting:'----',
        },
        {
          id:2,
          pname:'学生姓名',
          sname:'学生姓名',
          school_name:'北京朝阳区xxx幼儿园',
          yb:'100000001',
          emil:'1000000000@qq.com',
          tel:'1947298374823',
          phone:'86528736',
          term:'第一级别',
          setting:'----',
        },
      ],
    }
  }
}
</script>
