<template>
  <div class="schooldetail clearfix wrap">
    <div class="content clearfix">
      <p>YOU ARE HERE : 校园 >> 校园列表 >> <span class="font-cl-blue">校园概况</span></p>
      <div class="content-top">北京理都校园</div>
      <el-col :span="24">
        <el-card shadow="always">
          <p class="bold">基本信息</p>
          <p class="bold">校园名称:北京首府校园(英文全称:xxxxxxxx;中文简称:xxxxxxxx;英文简称:xxxxxxxxxx)</p>
          <p><el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属区域:</span><span>华北地区</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>所属城市:</span><span>北京市</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">园长:</span><span>李园长</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>校园编码:</span><span>1001</span></div></el-col>
          </el-row>
          </p>
          <p>
          <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><span>通讯地址:</span><span>北京市</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">邮编:</span><span>123456</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">电话:</span><span>18809876543</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">传真:</span><span>xxxxxxxx</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span>电子邮箱:</span><span>xxxxxxxx</span></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"><span class="content-margin">网址:</span><span>www.taidii.com</span></div></el-col>
          </el-row>
          </p>
        </el-card>
      </el-col>
    </div>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
          <el-tab-pane label="开班情况" name="first">
            <div class="firstTab">
              <span class="className">双语班</span>
              <span>
                <i class="icon-font fa fa-calendar-minus-o"></i>校日历
              </span>
              <span>
                <i class="icon-font el-icon-circle-plus-outline"></i>新增班级
              </span>
            </div>
            <div>
              <el-table
                :data="tableData"
                border
                empty-text='没有找到记录！'
                style="width: 100%;margin-top:20px">
                <el-table-column
                  fixed
                  prop="date"
                  label="班级名称">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="昵称">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="开设时间">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="班级状态">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="最大学生数">
                </el-table-column>
                <el-table-column
                  prop="zip"
                  label="当前学生数">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="预备生数">
                </el-table-column>
                <el-table-column
                  prop="stu"
                  label="师资标配数">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="firstTab">
              <span class="className">国际班</span>
              <span>
                <i class="icon-font fa fa-calendar-minus-o"></i>校日历
              </span>
              <span>
                <i class="icon-font el-icon-circle-plus-outline"></i>新增班级
              </span>
            </div>
            <div>
              <el-table
                :data="tableData2"
                border
                empty-text='没有找到记录！'
                style="width: 100%;margin-top:20px">
                <el-table-column
                  fixed
                  prop="date"
                  label="班级名称">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="昵称">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="开设时间">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="班级状态">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="最大学生数">
                </el-table-column>
                <el-table-column
                  prop="zip"
                  label="当前学生数">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="预备生数">
                </el-table-column>
                <el-table-column
                  prop="stu"
                  label="师资标配数">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="基础设施" name="second">基础设施</el-tab-pane>
          <el-tab-pane label="银行账户" name="third">银行账户</el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<style>
  .schooldetail p {
    margin: 10px;
  }

  .schooldetail {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .schooldetail .bold {
    font-weight: bold;
    color: black;
  }
  .schooldetail .firstTab {
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
  }
  .schooldetail .className {
    padding:6px 16px;
    font-size: 16px;
    font-weight: 600;
    color:#3683a0;
    border: 2px solid #3683a0;
    border-radius: 20px;
  }

  .schooldetail .content {
    padding: 20px 70px 50px 70px;
  }
  .schooldetail .icon-font {
    color:#f17128;
    font-size: 20px;
    margin-left: 20px;
    margin-right: 5px;
    font-weight: 600;
  }
  .schooldetail .el-tabs__nav-wrap {
    width: 50%;
    margin:0 auto;
  }
  .schooldetail .has-gutter th {
      background-color: #f5f5f5 !important;
    }
  .schooldetail .el-tabs__active-bar {
    background-color:#f17128;
    height: 3px;;
  }
  .schooldetail .el-tabs__item.is-active {
    color:#f17128;
    font-weight: 600;
  }
  .schooldetail .el-tabs__item:hover {
    color:#f17128;
    font-weight: 600;
  }
  .schooldetail .el-tabs__nav-wrap::after {
    display: none;
  }
  .schooldetail .el-tabs__header {
    border-bottom: 2px solid #dedede;
  }

  .schooldetail .content-top{
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
  .schooldetail .content-margin{
    margin-left: 15%;
  }
</style>

<script>
  export default {
    components: {
    },
    data() {
      return {
        activeName: 'first',
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          num:'',
          stu:''
        }],
        tableData2: [],
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
      console.log(tab, event);
    }
    }
  }
</script>
