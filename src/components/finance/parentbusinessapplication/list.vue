<template>
  <div class="parentbusinessapplication wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">校园招生目标数</span></p>
      <p><span>城际：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>区域：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>校园：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>申请类型：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>申请日期：</span>
        <el-date-picker class="date_style" type="date" placeholder="选择日期"></el-date-picker>
        <span>到</span>
        <el-date-picker class="date_style" type="date" placeholder="选择日期"></el-date-picker>
        <span>状态：</span>
        <el-select class="select_lip" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>学生信息：</span>
        <el-input style="width: 200px" type="text" placeholder="请输入"></el-input>
        <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
      </p>
      <el-table
        :data="tableList"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="no"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="student_status"
          label="学生状态">
        </el-table-column>
        <el-table-column
          prop="business_type"
          label="业务类型">
        </el-table-column>
        <el-table-column
          prop="parent_name"
          label="家长姓名">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="update_date"
          label="变更日期">
        </el-table-column>
        <el-table-column
          prop="apply_date"
          label="申请日期">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="applicationDetail(scope.row)" class="font-cl-blue" type="text" size="small">详情
            </el-button>
            <span style="color: #EBEEF5">|</span>
            <el-button @click="applicationCancel(scope.row)" class="orange" type="text" size="small">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑 弹框-->
    <el-dialog :visible.sync="detaildialog" width="50%" style="padding: 30px 60px;">
      <el-table
        :data="tableList"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="no"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="student_status"
          label="学生状态">
        </el-table-column>
        <el-table-column
          prop="business_type"
          label="业务类型">
        </el-table-column>
        <el-table-column
          prop="parent_name"
          label="家长姓名">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="update_date"
          label="变更日期">
        </el-table-column>
        <el-table-column
          prop="apply_date"
          label="申请日期">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="applicationDetail(scope.row)" class="font-cl-blue" type="text" size="small">详情
            </el-button>
            <span style="color: #EBEEF5">|</span>
            <el-button @click="editSchool(scope.row)" class="orange" type="text" size="small">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="detaildialog = false">取 消</el-button>
          <el-button type="success" @click="detaildialog = false">保 存</el-button>
        </span>
    </el-dialog>
    <!--作废 弹框-->
    <el-dialog title="作废业务申请" :visible.sync="canceldialog" width="50%" style="padding: 30px 60px;">
      <div class="text-align-center">
        <span>是否确定要作废此业务申请？</span>
      </div>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="canceldialog = false">取 消</el-button>
          <el-button type="success" @click="canceldialog = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: '-所有-',
        detaildialog: false,
        canceldialog: false,
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
        tableList: [{
          id: '1',
          no: '20131120',
          name: 'tom',
          student_status: '在校生',
          business_type: '离园退费',
          parent_name: '家长A',
          telephone: '18890987654',
          update_date: '2018-01-01',
          apply_date: '2019-12-12',
          status: '未使用'
        },
          {
            id: '2',
            no: '20131133',
            name: 'jerry',
            student_status: '在校生',
            business_type: '离园退费',
            parent_name: '家长A',
            telephone: '18890987654',
            update_date: '2018-01-01',
            apply_date: '2019-12-12',
            status: '未使用'
          },
          {
            id: '3',
            no: '20131155',
            name: 'hello',
            student_status: '在校生',
            business_type: '离园退费',
            parent_name: '家长A',
            telephone: '18890987654',
            update_date: '2018-01-01',
            apply_date: '2019-12-12',
            status: '未使用'
          }
        ]
      }
    },
    methods: {
      applicationDetail: function () {
        this.detaildialog = true
      },
      applicationCancel: function () {
        this.canceldialog = true
      }
    }
  }
</script>

<style scoped>
  .parentbusinessapplication {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .parentbusinessapplication p {
    margin: 10px;
  }

  .parentbusinessapplication .header p {
    font-size: 14px;
  }

  .parentbusinessapplication .select_lip {
    width: 120px;
  }

  .parentbusinessapplication .date_style {
    width: 140px;
  }

  /*表格内容居中*/
  .parentbusinessapplication .el-table td, .parentbusinessapplication .el-table th {
    text-align: center;
  }

  .parentbusinessapplication .el-dialog__footer {
    text-align: center;
  }
</style>
