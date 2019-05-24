<template>
  <div class="parent wrap">
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
          <td>{{parentApplicationDetail.student_info.class_name}}</td>
        </tr>
        <tr>
          <td>所在班级<span class="red">*</span></td>
          <td>{{parentApplicationDetail.student_info.grade_name}}</td>
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
              <el-input placeholder="请输入" maxlength="11" oninput ="value=value.replace(/[^0-9.]/g,'')" v-model.trim="application_detail.cell_phone"></el-input>
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
          <td rowspan="2" style="width: 400px">
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
    <div class="text-align-center mt26">
      <el-button>取 消</el-button>
      <el-button type="success" @click="saveApplication('application_detail')">保 存</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          no: Number(this.$route.query.no),
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
        this.getStudentInfo()
        this.getApplicationType()
        this.getApplicationReason()
      },
      methods: {
        getStudentInfo: function () {
          this.$axios.get('/api/application/student_info/' + this.no)
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
      }
    }
</script>

<style scoped>
  .parent{
    margin-top: 50px;
  }
  .parent table{
    border: 2px #ccc solid;
    border-collapse: collapse;
    width: 100%;
  }
  .parent td{
    border: 2px #ccc solid;
    padding: 5px;
    min-width: 150px;
  }
  .parent textarea{
    width: 80%;
    min-height: 200px;
  }
  .parent >>> .el-input__inner, .parent >>> .el-input {
    width: 200px;
    height: 32px;
  }
  .parent >>> .el-form-item__content {
    line-height: 0;
  }

  .parent >>> .el-radio__input.is-checked .el-radio__inner{
    background: #f17128;
    border: #f17128;
  }
</style>
