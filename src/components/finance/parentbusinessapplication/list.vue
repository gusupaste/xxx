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
          v-model="application_data"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dataChange"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </p>
      <p>
        <span>状态：</span>
        <el-select class="select_lip" v-model="form.status_id" placeholder="请选择">
          <el-option label="所有" value="0"></el-option>
          <el-option label="作废" value="-1"></el-option>
          <el-option label="同意" value="1"></el-option>
        </el-select>
        <span class="ml20">学生信息：</span>
        <el-input type="text" placeholder="请输入" v-model="form.student_info" class="search_input"
                  style="width:220px"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="getApplication">搜索</el-button></span>
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
            <el-button @click="applicationDetail(scope.row.no)" class="font-cl-blue" type="text" size="small">详情
            </el-button>
            <span style="color: #EBEEF5">|</span>
            <el-button @click="applicationCancel(scope.row)" class="orange" type="text" size="small">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑 弹框-->
    <el-dialog title="详情页面" class="el-dialog-table" :visible.sync="detaildialog" width="50%">
      <el-form :inline="true" label-width="120px" :model="application_detail" :rules="rules" ref="application_detail">
        <table class="table" :data="parentApplicationDetail">
          <tbody>
          <tr>
            <td colspan="4">学生信息</td>
          </tr>
          <tr>
            <td>学生姓名<span class="red">*</span></td>
            <td>{{parentApplicationDetail.student_info.name}}</td>
            <td>所在校园<span class="red">*</span></td>
            <td>{{parentApplicationDetail.student_info.grade_name}}</td>
          </tr>
          <tr>
            <td>所在班级<span class="red">*</span></td>
            <td>{{parentApplicationDetail.student_info.class_name}}</td>
            <td>班级主讲</td>
            <td>
              <el-form-item prop="main_speaker">
                <el-input v-model="application_detail.main_speaker" placeholder="请输入"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>学生状态</td>
            <td colspan="3">
              <el-radio-group v-model="parentApplicationDetail.student_info.status">
                <el-radio v-if="parentApplicationDetail.student_info.status === 'Prepare'" label="Prepare">预备生
                </el-radio>
                <el-radio v-else disabled label="Prepare">预备生</el-radio>
                <el-radio v-if="parentApplicationDetail.student_info.status === 'Formal'" label="Formal">在校生</el-radio>
                <el-radio v-else disabled label="Formal">在校生</el-radio>
                <el-radio v-if="parentApplicationDetail.student_info.status === 'Abort'" label="Abort">离园生</el-radio>
                <el-radio v-else disabled label="Abort">离园生</el-radio>
                <el-radio v-if="parentApplicationDetail.student_info.status === 'Graduation'" label="Graduation">毕业生
                </el-radio>
                <el-radio v-else disabled label="Graduation">毕业生</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td colspan="4">申请人/家长信息</td>
          </tr>
          <tr>
            <td>申请人姓名<span class="red">*</span></td>
            <td>
              <el-form-item prop="applicant_name">
                <el-input placeholder="请输入" v-model.trim="application_detail.applicant_name"></el-input>
              </el-form-item>

            </td>
            <td>申请人身份<span class="red">*</span></td>
            <td>
              <el-form-item prop="applicant_identity">
                <el-radio-group v-model="application_detail.applicant_identity">
                  <el-radio :label="Number(1)">家长</el-radio>
                  <el-radio :label="Number(2)">校园人员</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>家长姓名<span class="red">*</span></td>
            <td>
              <el-form-item prop="parent_name">
                <el-input placeholder="请输入" v-model.trim="application_detail.parent_name"></el-input>
              </el-form-item>
            </td>
            <td>与学生关系<span class="red">*</span></td>
            <td>
              <el-form-item prop="relationship">
                <el-radio-group v-model="application_detail.relationship">
                  <el-radio :label="Number(1)">父亲</el-radio>
                  <el-radio :label="Number(2)">母亲</el-radio>
                  <el-radio :label="Number(3)">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>联系电话</td>
            <td>
              <el-form-item prop="telephone">
                <el-input placeholder="请输入" v-model="application_detail.telephone"></el-input>
              </el-form-item>
            </td>
            <td>手机号码<span class="red">*</span></td>
            <td>
              <el-form-item prop="cell_phone">
                <el-input placeholder="请输入" v-model.trim="application_detail.cell_phone"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>邮件地址<span class="red">*</span></td>
            <td colspan="3">
              <el-form-item prop="email">
                <el-input placeholder="请输入" v-model.trim="application_detail.email"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td colspan="4">申请信息</td>
          </tr>
          <tr>
            <td rowspan="2">申请类别<span class="red">*</span></td>
            <td rowspan="2" style="width: 200px">
              <el-form-item prop="application_type">
                <el-radio-group v-model="application_detail.application_type">
                  <el-radio v-for="type in parentApplicationDetail.application_type" :key="type.id" :label="type.id">
                    {{type.name}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
            <td>申请原因<span class="red">*</span></td>
            <td>
              <el-form-item prop="application_reason">
                <el-checkbox-group v-model="application_detail.application_reason">
                  <el-checkbox v-for="reason in parentApplicationDetail.application_reason" :key="reason.id"
                               :label="reason.id">{{reason.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
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
            <td>
              <el-form-item prop="effective_date">
                <el-date-picker
                  v-model="application_detail.effective_date"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </td>
            <td>提交日期</td>
            <td>{{new Date() | formatDate}}</td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3"><textarea v-model="application_detail.remark"></textarea></td>
          </tr>
          </tbody>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer text-align-center">
        <el-button @click="detaildialog = false">取 消</el-button>
        <el-button type="success" @click="saveApplication('application_detail')">保 存</el-button>
      </div>
    </el-dialog>
    <!--作废 弹框-->
    <el-dialog title="作废业务申请" :visible.sync="canceldialog" width="50%">
      <div class="text-align-center">
        <span>是否确定要作废此业务申请？</span>
      </div>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="canceldialog = false">取 消</el-button>
          <el-button type="success">确 定</el-button>
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
          start_data: '',
          end_data: '',
          status_id: "0",
          student_info: ''
        },
        intercityList: [],
        arealist: [],
        schoolList: [],
        application_type: [],
        tableList: {},
        application_data: [],
        detaildialog: false,
        canceldialog: false,
        parentApplicationDetail: {
          student_info: {},
          application_type: [],
          application_reason: []
        },
        application_detail: {
          id: '',
          main_speaker: '',
          applicant_name: '',
          applicant_identity: '',
          parent_name: '',
          relationship: '',
          telephone: '',
          cell_phone: '',
          email: '',
          application_type: '',
          application_reason: [],
          start_date: '',
          end_date: '',
          effective_date: '',
          remark: ''
        },
        rules: {
          applicant_name: [
            {required: true, message: '请输入申请人姓名', trigger: 'blur'},
          ],
          applicant_identity: [
            {required: true, message: '请选择申请人身份', trigger: 'change'},
          ],
          parent_name: [
            {required: true, message: '请输入家长姓名', trigger: 'blur'},
          ],
          relationship: [
            {required: true, message: '请选择与学生关系', trigger: 'change'},
          ],
          cell_phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入郵箱地址', trigger: 'blur'},
          ],
          application_type: [
            {required: true, message: '请选择申请类别', trigger: 'change'},
          ],
          application_reason: [
            {required: true, message: '请选择申请原因', trigger: 'change'},
          ],
          effective_date: [
            {required: true, message: '请选择变更/离园日期', trigger: 'change'},
          ]
        }
      }
    },
    mounted: function () {
      this.getIntercity()
      this.getArea()
      this.getSchool()
      this.getApplicationType()
      this.getApplication()
    },
    watch: {
      'form.intercity_id'() {
        this.form.center_id = "";
        this.getSchool();
      },
      'form.area_id'() {
        this.form.center_id = "";
        this.getSchool();
      },
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
        })
          .then(res => {
            _this.schoolList = res.data.results;
          }).catch(err => {
          console.log(err)
        })
      },
      getApplication: function () {
        this.$axios.get('/api/application/application/', {
          params: this.form
        })
          .then(res => {
            this.tableList = res.data
          }).catch(err => {
        })
      },
      applicationDetail: function (no) {
        this.detaildialog = true
        this.getStudentInfo(no)
        this.getApplicationReason()
      },
      getStudentInfo: function (no) {
        this.$axios.get('/api/application/student_info/' + no)
          .then(res => {
            this.parentApplicationDetail.student_info = res.data
            this.application_detail.id = res.data.id
          }).catch(err => {

        })
      },
      getApplicationType: function () {
        this.$axios.get('/api/application/application_type')
          .then(res => {
            this.parentApplicationDetail.application_type = res.data
            this.application_type = res.data
          }).catch(err => {

        })
      },
      getApplicationReason: function () {
        this.$axios.get('/api/application/application_reason')
          .then(res => {
            this.parentApplicationDetail.application_reason = res.data
          }).catch(err => {

        })
      },
      saveApplication: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/application/application/', {
              student_id: this.application_detail.id,
              main_speaker: this.application_detail.main_speaker,
              applicant_name: this.application_detail.applicant_name,
              applicant_identity: this.application_detail.applicant_identity,
              parent_name: this.application_detail.parent_name,
              relationship: this.application_detail.relationship,
              telephone: this.application_detail.telephone,
              cell_phone: this.application_detail.cell_phone,
              email: this.application_detail.email,
              application_type: this.application_detail.application_type,
              application_reason: this.application_detail.application_reason,
              start_date: this.application_detail.start_date,
              end_date: this.application_detail.end_date,
              effective_date: this.application_detail.effective_date,
              remark: this.application_detail.remark
            })
              .then(res => {
                if (res.data.status === 1) {
                  this.$message({
                    type: 'success',
                    message: '保存成功！'
                  })
                  this.$router.go(-1)
                }
              }).catch(err => {
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      applicationCancel: function () {
        this.canceldialog = true
      },
      dataChange: function (val) {
        this.form.start_data = val[0]
        this.form.end_data = val[1]
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
    font-size: 14px;
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
</style>
