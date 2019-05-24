<template>
  <div class="parentbusinessapplication wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">家长业务申请查询</span></p>
    </div>
    <div class="header-top">
      <p><span>城际：</span>
        <el-select v-model="form.intercity_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in intercityList"
            :key="item.id"
            :label="item.dept_name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="ml20">区域：</span>
        <el-select v-model="form.area_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in arealist"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="ml20">校园：</span>
        <el-select v-model="form.center_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in schoolList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <span class="ml20">申请类型：</span>
        <el-select class="select_lip" v-model="form.application_type_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in application_type"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="ml20">申请日期：</span>
        <el-date-picker
          v-model="application_date"
          :editable="false"
          :clearable="false"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </p>
      <p>
        <span>状态：</span>
        <el-select class="select_lip" v-model="form.status_id" placeholder="请选择">
          <el-option label="所有" value="2"></el-option>
          <el-option label="未处理" value="0"></el-option>
          <el-option label="已作废" value="-1"></el-option>
          <el-option label="已同意" value="1"></el-option>
        </el-select>
        <span class="ml20">学生信息：</span>
        <el-input type="text" placeholder="请输入" v-model="form.student_name" class="search_input"
                  style="width:220px"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="getList">搜索</el-button></span>
      </p>
      <el-table
        class="mt26"
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
          label="学生状态">
          <template slot-scope="scope">
            <span v-show="scope.row.student_status === 'Prepare'">预备生</span>
            <span v-show="scope.row.student_status === 'Formal'">在校生</span>
            <span v-show="scope.row.student_status === 'Abort'">离园生</span>
            <span v-show="scope.row.student_status === 'Graduation'">毕业生</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="application_type"
          label="业务类型">
        </el-table-column>
        <el-table-column
          prop="parent"
          label="家长姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="effective_date"
          label="变更日期">
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="申请日期">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.is_use">已使用</span>
            <span v-else>未使用</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="applicationDetail(scope.row.id)" class="font-cl-blue" type="text" size="small">详情
            </el-button>
            <span style="color: #EBEEF5">|</span>
            <el-button v-if="scope.row.status === 0" @click="applicationCancel(0,-1,scope.row.id)"
                       class="orange" type="text" size="small">作废
            </el-button>
            <span v-if="scope.row.status === -1" class="grey" type="text" size="small">已作废</span>
            <span v-if="scope.row.status === 0" style="color: #EBEEF5">|</span>
            <el-button v-if="scope.row.status === 0" @click="applicationCancel(1,1,scope.row.id)"
                       class="green" type="text" size="small">同意
            </el-button>
            <span v-if="scope.row.status === 1" class="grey" type="text" size="small">已同意
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑 弹框-->
    <el-dialog title="详情页面" class="el-dialog-table" :visible.sync="detaildialog" width="50%">
      <table class="table" :data="application_detail">
        <tbody>
        <tr>
          <td colspan="4">学生信息</td>
        </tr>
        <tr>
          <td>学生姓名<span class="red">*</span></td>
          <td>{{application_detail.student_name}}</td>
          <td>所在校园<span class="red">*</span></td>
          <td>{{application_detail.class_name}}</td>
        </tr>
        <tr>
          <td>所在班级<span class="red">*</span></td>
          <td>{{application_detail.grade_name}}</td>
          <td>班级主讲</td>
          <td>{{application_detail.main_speaker}}</td>
        </tr>
        <tr>
          <td>学生状态</td>
          <td colspan="3">
            <el-radio-group v-model="application_detail.student_status">
              <el-radio disabled label="Prepare">预备生</el-radio>
              <el-radio disabled label="Formal">在校生</el-radio>
              <el-radio disabled label="Abort">离园生</el-radio>
              <el-radio disabled label="Graduation">毕业生</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="4">申请人/家长信息</td>
        </tr>
        <tr>
          <td>申请人姓名<span class="red">*</span></td>
          <td>{{application_detail.applicant_name}}</td>
          <td>申请人身份<span class="red">*</span></td>
          <td>
            <el-radio-group v-model="application_detail.applicant_identity">
              <el-radio disabled :label="Number(1)">家长</el-radio>
              <el-radio disabled :label="Number(2)">校园人员</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>家长姓名<span class="red">*</span></td>
          <td>{{application_detail.parent_name}}</td>
          <td>与学生关系<span class="red">*</span></td>
          <td>
            <el-radio-group v-model="application_detail.relationship">
              <el-radio disabled :label="Number(1)">父亲</el-radio>
              <el-radio disabled :label="Number(2)">母亲</el-radio>
              <el-radio disabled :label="Number(3)">其他</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td>联系电话</td>
          <td>{{application_detail.telephone}}</td>
          <td>手机号码<span class="red">*</span></td>
          <td>{{application_detail.cell_phone}}</td>
        </tr>
        <tr>
          <td>邮件地址<span class="red">*</span></td>
          <td colspan="3">{{application_detail.email}}</td>
        </tr>
        <tr>
          <td colspan="4">申请信息</td>
        </tr>
        <tr>
          <td rowspan="2">申请类别<span class="red">*</span></td>
          <td rowspan="2" style="width: 200px">
            <el-radio-group v-model="application_detail.application_type">
              <el-radio v-for="type in application_type" disabled :key="type.id" :label="type.id">
                {{type.name}}
              </el-radio>
            </el-radio-group>
          </td>
          <td>申请原因<span class="red">*</span></td>
          <td>
            <el-checkbox-group v-model="application_detail.application_reason">
              <el-checkbox v-for="reason in application_reason" disabled :key="reason.id" :label="reason.id">
                {{reason.name}}
              </el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
        <tr>
          <td>起止日期</td>
          <td>
            <el-date-picker
              v-model="application_detail.start_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="application_detail.end_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>变更/离园日期<span class="red">*</span></td>
          <td>{{application_detail.effective_date}}</td>
          <td>提交日期</td>
          <td>{{application_detail.create_date}}</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3"><textarea readonly v-model="application_detail.remark"></textarea></td>
        </tr>
        </tbody>
      </table>
    </el-dialog>
    <!--作废 弹框-->
    <el-dialog :title="title + '业务申请'" :visible.sync="canceldialog" width="20%">
      <div class="text-align-center" style="padding: 80px">
        <span>是否确定要<span>{{title}}</span>此业务申请？</span>
      </div>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="canceldialog = false">取 消</el-button>
          <el-button type="success" @click="sureChangeStatus">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          intercity_id: '',
          center_id: '',
          area_id: '',
          application_type_id: '',
          start_date: '',
          end_date: '',
          status_id: "2",
          student_name: ''
        },
        intercityList: [],
        arealist: [],
        schoolList: [],
        application_type: [],
        application_reason: [],
        tableList: {},
        application_date: [],
        detaildialog: false,
        canceldialog: false,
        application_detail: {},
        title: '作废',
        change_id: 0,
        change_status: 0
      }
    },
    mounted: function () {
      this.getIntercity()
      this.getArea()
      this.getSchool()
      this.getApplicationType()
      this.getList()
    },
    watch: {
      'form.intercity_id'() {
        this.form.center_id = "";
        this.getSchool();
        this.getList()
      },
      'form.area_id'() {
        this.form.center_id = "";
        this.getSchool();
        this.getList()
      },
      'form.center_id'() {
        this.getList()
      },
      'form.application_type_id'() {
        this.getList()
      },
      'form.status_id'() {
        this.getList()
      }
    },
    methods: {
      getIntercity() {
        var _this = this;
        this.$axios.get('/api/common/intercity/').then(res => {
          _this.intercityList = res.data.intercity_list;
        }).catch(err => {
          console.log(err)
        })
      },
      getArea() {
        var _this = this;
        _this.$axios.get('/api/common/select/area_list/')
          .then(res => {
            _this.arealist = res.data.results;
          }).catch(err => {
          console.log(err)
        })
      },
      getSchool() {
        var _this = this;
        this.$axios.get('/api/common/select/center_list/', {
          params: {
            intercity_id: this.form.intercity_id,
            area_id: this.form.area_id,
          }
        }).then(res => {
          _this.schoolList = res.data.results;
        }).catch(err => {
          console.log(err)
        })
      },
      getApplicationType: function () {
        this.$axios.get('/api/application/application_type')
          .then(res => {
            this.application_type = res.data
          }).catch(err => {

        })
      },
      dateChange: function (val) {
        this.form.start_date = val[0]
        this.form.end_date = val[1]
        this.getList()
      },
      getList: function () {
        this.$axios.get('/api/application/application/', {
          params: this.form
        })
          .then(res => {
            this.tableList = res.data
          }).catch(err => {
        })
      },
      /*  详情  */
      applicationDetail: function (id) {
        this.detaildialog = true
        this.getApplicationType()
        this.getApplicationReason()
        this.$axios.get('/api/application/application/' + id)
          .then(res => {
            this.application_detail = res.data[0]
          }).catch(err => {
        })
      },
      getApplicationType: function () {
        this.$axios.get('/api/application/application_type')
          .then(res => {
            this.application_type = res.data
          }).catch(err => {
        })
      },
      getApplicationReason: function () {
        this.$axios.get('/api/application/application_reason')
          .then(res => {
            this.application_reason = res.data
          }).catch(err => {
        })
      },
      applicationCancel: function (flag, status, id) {
        this.canceldialog = true
        this.change_id = id
        this.change_status = status
        if (flag === 0) {
          this.title = '作废'
        } else {
          this.title = '确定'
        }
      },
      sureChangeStatus: function () {
        this.$axios.post('/api/application/application/' + this.change_id + '/status/', {
          type: this.change_status
        })
          .then(res => {
            if (res.data.status === 1) {
              this.$message.success("成功")
              this.canceldialog = false
              this.getList()
            }
          }).catch(err => {
        })
      }
    }
  }
</script>

<style scoped>
  .parentbusinessapplication {
    text-align: left;
  }

  .parentbusinessapplication .header-top {
    margin-top: 10px;
  }

  .parentbusinessapplication .header-top p {
    font-size: 12px;
  }

  .parentbusinessapplication >>> .el-select {
    margin-bottom: 10px;
  }

  .parentbusinessapplication >>> .el-input {
    width: 145px;
    height: 32px;
  }

  /*表格内容居中*/
  .parentbusinessapplication >>> .el-table td, .parentbusinessapplication >>> .el-table th {
    text-align: center;
  }

  .parentbusinessapplication >>> .el-dialog__footer {
    text-align: center;
  }

  .parentbusinessapplication >>> .search_input .el-input__inner {
    width: 100%;
  }

  .parentbusinessapplication .el-dialog-table table {
    border: 2px #ccc solid;
    border-collapse: collapse;
    width: 100%;
  }

  .parentbusinessapplication .el-dialog-table td {
    border: 2px #ccc solid;
    padding: 5px;
    min-width: 100px;
  }

  .parentbusinessapplication .el-dialog-table textarea {
    width: 80%;
    min-height: 200px;
  }

  .parentbusinessapplication .el-dialog-table >>> .el-input__inner, .parentbusinessapplication .el-dialog-table >>> .el-input {
    width: 200px;
    height: 32px;
  }

  .parentbusinessapplication >>> .el-range-editor.el-input__inner {
    padding: 0;
  }

  .parentbusinessapplication .el-dialog-table >>> .el-radio {
    margin-right: 15px;
  }

  .parentbusinessapplication .el-dialog-table >>> .el-form-item__content {
    line-height: 0;
  }

  .parentbusinessapplication >>> .el-date-editor .el-range__icon {
    margin-left: 0;
  }

  .parentbusinessapplication >>> .el-radio__input.is-checked .el-radio__inner {
    background: #f17128;
    border: #f17128;
  }
</style>
