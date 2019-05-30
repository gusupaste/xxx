<template>
  <div class="admissionRegistrationlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 入学管理 > <span class="font-cl-blue">预备生入园登记</span></p>
    </div>
    <div class="content">
      <div class="select-header">
        <span>搜索：</span>
        <el-input v-model="input" placeholder="输入学号、学生姓名" class="search_input"></el-input>
        <span class="padding-left-30"><el-button type="primary" @click="getStudentList(1)">搜索</el-button></span>
      </div>
      <div class="list-content clearfix">
        <div class="studentFileCard left" v-for="(item , index) in studentList " :key="index">
          <div style="padding:20px" @click="$router.push('/studentFile/studentFileDetail/'+item.id+'?status=0')">
            <div class="avatar inline-block">
              <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o"
                 aria-hidden="true"></i>
            </div>
            <div class="card-content inline-block">
              <p>
                <span style="font-size:15px;font-weight:600">{{ item.name }}</span>
                <i v-if="item.gender ==='M'" style="font-size:15px;color:#51a5ff;" class="fa fa-mars" aria-hidden="true"></i>
                <i v-if="item.gender ==='F'" style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
              </p>
              <p>出生日期：{{ item.date_of_birth }}</p>
              <p>意向学年：{{ item.preferred_academic_year }}</p>
              <p>意向信息：{{ item.preferred_class }}</p>
              <p>拟入学日期：{{ item.preferred_admission_date }}</p>
            </div>
          </div>
          <div class="card-footer clearfix">
            <span>执行操作</span>
            <el-dropdown trigger="click" @command="handleCommand($event,item.id,index,item.academic_year_id,item.center_id,item.leaving_status,item.preferred_academic_year)">
              <span class="el-dropdown-link">
                <el-input :value="item.selectType" class="cur" placeholder="请选择"></el-input>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">入园登记</el-dropdown-item>
                <el-dropdown-item command="2">提前入学申请</el-dropdown-item>
                <el-dropdown-item command="3">推迟入学申请</el-dropdown-item>
                <el-dropdown-item command="4">离园登记</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--<el-select v-model="item.selectType"
                       @change="operationSelect(item.selectType,item.id,item.academic_year_id,item.center_id,item.leaving_status,item.preferred_academic_year)"
                       placeholder="&#45;&#45;请选择&#45;&#45;" style="width: 60%;">
              <el-option
                v-for="item in operations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev,pager, next, jumper"
      next-text="下一页"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :total="total" class="page">
    </el-pagination>
    <el-dialog title="预备生入园登记" :visible.sync="operationVisible" width="750px">
      <el-form ref="reulsForm" :model="reulsForm" :rules="rules" label-width="80px">
        <div class="oper-div">
          <span class="title-span">学生基本信息</span>
          <hr>
          <el-row>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">姓名:</span>
                <span>{{ studentInfo.name }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">学年计划:</span>
                <span>{{ studentInfo.academic_year_name }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">年龄:</span>
                <span>{{ studentInfo.age }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">意向班级:</span>
                <span>{{ studentInfo.preferred_class }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 90px;">性别:</span>
                <span v-if="studentInfo.gender === 'M'">男</span>
                <span v-if="studentInfo.gender === 'F'">女</span>
              </p>
              <p class="lable-p">
                <span class="labels" style="width: 90px;">预计入学日期:</span>
                <span>{{ studentInfo.preferred_admission_date }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">缴费区间:</span>
                <span>&nbsp;</span>
              </p>
            </el-col>
            <el-col :span="16">
              <p class="lable-p">
                <span class="labels">所属校园:</span>
                <span>{{ studentInfo.center_name }}</span>
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="oper-div">
          <span class="title-span">入园登记</span>
          <br>
          <hr>
          <br>
          <el-form-item label="入学日期" prop="in_class_date">
            <el-date-picker
              v-model="reulsForm.in_class_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="安排入班" required>
            <el-col :span="8">
              <el-form-item prop="status">
                <el-select v-model="reulsForm.status" placeholder="请选择">
                  <el-option v-for="fre in classList" :label="fre.name" :value="fre.id" :key="fre.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="class_obj">
                <el-select v-model="reulsForm.class_obj" placeholder="请选择">
                  <el-option
                    v-for="item in in_class_list"
                    :key="item.id"
                    :label="item.center_class__name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="reulsForm.remarks">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="operationVisible = false">取 消</el-button>
          <el-button class="bg-green bd-green white" type="success" @click="saveForm('reulsForm')">保 存</el-button>
        </span>
    </el-dialog>
    <el-dialog :title="early_title" :visible.sync="earlyVisible" width="750px">
      <el-form ref="operationForm" :model="operationForm" :rules="rules" label-width="80px">
        <div class="oper-div">
          <span class="title-span">学生基本信息</span>
          <hr>
          <el-row>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">姓名:</span>
                <span>迪小贝</span>
              </p>
              <p class="lable-p">
                <span class="labels">所属校园:</span>
                <span>迪小贝</span>
              </p>
              <p class="lable-p">
                <span class="labels">学年计划:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">年龄:</span>
                <span>迪小贝</span>
              </p>
              <p class="lable-p">
                <span class="labels">意向班级:</span>
                <span>迪小贝</span>
              </p>
              <p class="lable-p">
                <span class="labels">缴费区间:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 90px;">性别:</span>
                <span>迪小贝</span>
              </p>
              <p class="lable-p">
                <span class="labels" style="width: 90px;">主教老师:</span>
                <span>迪小贝</span>
              </p>
              <p class="lable-p">
                <span class="labels" style="width: 90px;">预计入学日期:</span>
                <span>迪小贝</span>
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="oper-div">
          <span class="title-span">联系人信息</span>
          <hr>
          <el-table
            :data="chargeTableDate"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 10px;">
            <el-table-column
              prop="code"
              label="家长姓名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="关系">
            </el-table-column>
            <el-table-column
              prop="name"
              label="国籍">
            </el-table-column>
            <el-table-column
              prop="name"
              label="移动电话">
            </el-table-column>
            <el-table-column
              prop="name"
              label="家庭电话">
            </el-table-column>
            <el-table-column
              prop="name"
              label="办公室电话">
            </el-table-column>
            <el-table-column
              prop="name"
              label="电子邮件">
            </el-table-column>
            <el-table-column
              prop="name"
              label="首选联系方式">
            </el-table-column>
            <el-table-column
              prop="name"
              label="首选联系方式">
            </el-table-column>
            <el-table-column
              prop="name"
              label="紧急联系方式">
            </el-table-column>
          </el-table>
        </div>
        <div class="oper-div">
          <span class="title-span">提前入学申请</span>
          <hr>
          <el-form-item label="提前入园日期" label-width="120">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="申请原因">
            <el-radio-group v-model="radio2">
              <el-radio :label="3">休假</el-radio>
              <el-radio :label="6">身体原因</el-radio>
              <el-radio :label="9" style="display: inline-block">其他</el-radio>
            </el-radio-group>
            <el-input type="text" style="width: auto;display: inline-block"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="earlyVisible = false">取 消</el-button>
          <el-button class="bg-green bd-green white" type="success">保 存</el-button>
        </span>
    </el-dialog>
    <el-dialog title="预备生离园登记" :visible.sync="leaveVisible" width="750px">
      <el-form ref="leveForm" :model="leveForm" :rules="rules" label-width="80px">
        <div class="oper-div">
          <span class="title-span">学生基本信息</span>
          <hr>
          <el-row>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">姓名:</span>
                <span>{{ studentInfo.name }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">学年计划:</span>
                <span>{{ studentInfo.academic_year_name }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">年龄:</span>
                <span>{{ studentInfo.age }}</span>
              </p>
              <p class="lable-p">
                <span class="labels">意向班级:</span>
                <span>{{ studentInfo.preferred_class }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels" style="width: 90px;">性别:</span>
                <span v-if="studentInfo.gender === 'F'">女&nbsp;</span>
                <span v-if="studentInfo.gender === 'M'">男&nbsp;</span>
              </p>
              <p class="lable-p">
                <span class="labels" style="width: 90px;">预计入学日期:</span>
                <span>{{ studentInfo.preferred_admission_date }}</span>
              </p>
            </el-col>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">缴费区间:</span>
                <span>{{ studentInfo.age }}</span>
              </p>
            </el-col>
            <el-col :span="16">
              <p class="lable-p">
                <span class="labels">所属校园:</span>
                <span>{{ studentInfo.center_name }}</span>
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="oper-div">
          <span class="title-span">离园登记</span>
          <hr>
          <el-row>
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">离园申请:</span>
                <span>{{ studentInfo.leaving_status }}</span>
              </p>
            </el-col>
            <!--<el-col :span="8">
              <p class="lable-p">
                <span class="labels">离园访谈:</span>
                <span>迪小贝</span>
              </p>
            </el-col>-->
            <el-col :span="8">
              <p class="lable-p">
                <span class="labels">所在学年:</span>
                <span>{{ preferred_academic_year }}</span>
              </p>
            </el-col>
          </el-row>
          <el-form-item label="离园日期" prop="leave_date">
            <el-date-picker
              v-model="leveForm.leave_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离园原因" prop="leave_reason">
            <el-radio v-model="leveForm.leave_reason" label="居所搬迁/父母工作调动"></el-radio>
            <br>
            <el-radio v-model="leveForm.leave_reason" label="家庭变故"></el-radio>
            <br>
            <el-radio v-model="leveForm.leave_reason" label="生病"></el-radio>
            <br>
            <el-radio v-model="leveForm.leave_reason" label="其他"></el-radio>
            <!--<el-select v-model="leveForm.leave_reason" placeholder="&#45;&#45;请选择&#45;&#45;" style="width: 180px;">
              <el-option
                v-for="item in operations"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
            <el-input style="width: 180px;" v-model="otherText"></el-input>
          </el-form-item>
        </div>
        <hr>
        <p style="font-size: 10px;color: red;line-height: 20px;">*1.请确认该学生所有缺勤转备用金都已完成,否则不可提交离园登记</p>
        <p style="font-size: 10px;color: red;line-height: 20px;">&nbsp;&nbsp;2.一旦离园登记结束,该学生自动转为离园生状态</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="leaveVisible = false">取 消</el-button>
          <el-button @click="transferReserveForAbsenteeism">缺勤转备用金</el-button>
          <el-button type="success" @click="saveLeave('leveForm')">保 存</el-button>
        </span>
    </el-dialog>
    <el-dialog title="预备生离园登记" :visible.sync="leaveShowVisible" width="450px" class="leaveShow">
      <span class="dialog-body">该学生存在未完成的缺勤转备用金,请先完成再进行离园登记</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="leaveShowVisible = false" disabled>缺勤转备用金</el-button>
          <el-button @click="leaveShowVisible = false" type="success">知道了</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio2: '',
        early_title: '提前入学申请',
        earlyVisible: false,
        leaveVisible: false,
        leaveShowVisible: false,
        nameSelect: [],
        studentList: [],
        rules: {},
        reulsForm: {
          in_class_date: '',
          status: '',
          class_obj: '',
          remarks: ''
        },
        studentRemark: '',
        otherText: '',
        class_url: '/api/center/select/center_class_year_list/?center_id=',
        in_class_list: [],
        classList: [
          {
            id: 'In',
            name: '就读'
          },
          {
            id: 'ExchangeOut',
            name: '转出'
          },
          {
            id: 'Prepare',
            name: '预分班'
          },
        ],
        preferred_academic_year: '',
        rules: {
          class_obj: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          status: [
            {required: true, message: '请选择班级', trigger: 'change'}
          ],
          sign_up_date: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          in_class_date: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          leave_reason: [
            {required: true, message: '请选择离园原因', trigger: 'change'}
          ],
          leave_date: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
        },
        operations: [{
          value: 1,
          label: '入园登记'
        }, {
          value: 2,
          label: '提前入学申请'
        }, {
          value: 3,
          label: '推迟入学申请'
        }, {
          value: 4,
          label: '离园登记'
        }],
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
        value1: '',
        value2: '',
        input: '',
        activeName: 'first',
        chargeTableDate: [
          {
            code: 'xxxxxxxxxxxx',
            name: '31231231',
            intercity_name: '312313',
            hq_name: '31231',
            opening_date: '31231',
            leader: '31231',
            telephone: '312312',
            status_name: '12312313',
          },
          {
            code: 'xxxxxxxxxxxx',
            name: '31231231',
            intercity_name: '312313',
            hq_name: '31231',
            opening_date: '31231',
            leader: '31231',
            telephone: '312312',
            status_name: '12312313',
          }
        ],
        list: [1, 2, 3, 4, 5, 6, 7, 81,],
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
        operation_title: '预备生入园登记',
        operationVisible: false,
        operationForm: {},
        leveForm: {
          name: '',
          leave_reason: '',
          leave_date: '',
        },
        studentInfo: {},
        pagesize: 9,
        currentPage: 1,
        total: 1,
        class_year:'',
      };
    },
    mounted: function () {
      this.getStudentList(1);
    },
    watch: {
      currentPage () {
        this.getStudentList(this.currentPage)
      }
    },
    methods: {
      getClassList: function (center_id, academic_year_id) {
        var url = this.class_url + center_id + '&academic_year_id=' + academic_year_id;
        this.$axios.get(url).then(res => {
          this.in_class_list = res.data.results;
        }).catch(err => {
          console.log(err)
        })
      },
      getStudentList: function (val) {
        this.currentPage = val
        var url = '/api/student/prepare_list_student/?search=' + this.input + '&size=' + this.pagesize + '&page=' + this.currentPage;
        this.loading = true
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.status == 200) {
            this.studentList = res.data.results;
            this.total = res.data.count
            for(var x in this.studentList){
              this.studentList[x].selectType = '';
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getStudentInfo: function (id, academic_year_id, center_id) {
        if (this.operationVisible === true) {
          this.getClassList(center_id, academic_year_id);
        }
        var url = '/api/student/prepare_list_student/' + id;
        this.loading = true
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.status == 200) {
            this.studentInfo = res.data;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      saveForm: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var obj = {};
            obj.status = this.reulsForm.status;
            obj.sign_up_date = this.reulsForm.in_class_date;
            obj.student = this.studentInfo.id;
            obj.class_obj = this.reulsForm.class_obj;
            obj.remarks = this.reulsForm.remarks;
            obj.academic_year = this.class_year;
            this.$axios.post('/api/student/preparing_admission/', obj).then(res => {
              if (res.status == 201) {
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
                this.operationVisible = false;
                this.getStudentList(1);
              } else {
                this.$message.error('保存失败');
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            return false;
          }
        })
      },
      saveLeave: function (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var x = this.leveForm.leave_reason;
            if (this.leveForm.leave_reason === '其他') {
              x = this.otherText;
            }
            var obj = {
              name: this.studentInfo.name,
              leave_reason: x,
              leave_date: this.leveForm.leave_date,
            };
            this.$axios.put('/api/student/prepare_list_student/' + this.studentInfo.id + '/', obj).then(res => {
              if (res.status == 201) {
                this.$message({
                  type: 'success',
                  message: '保存成功！'
                })
              } else {
                this.$message.error('保存失败');
              }
            }).catch(err => {
              console.log(err);
              this.$message.error('未缴纳备用金');
            })
          } else {
            return false;
          }
        })
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
      editSchool: function (param, index) {
        this.$router.push('/financemanagement/billDetail');
      },
      handleCommand: function (val, id, index ,academic_year_id, center_id, leaving_status, preferred_academic_year) {
        if (val === '1') {
          console.log(this.studentList)
          this.studentList[index].selectType = '入园登记';
          this.operationVisible = true;
          this.class_year = academic_year_id;
          this.getStudentInfo(id, academic_year_id, center_id);
        } else if (val === '2') {
          this.studentList[index].selectType = '提前入学申请';
          this.early_title = '预备生提前入学申请';
          this.earlyVisible = true;
        } else if (val === '3') {
          this.studentList[index].selectType = '推迟入学申请';
          this.early_title = '预备生推迟入学申请';
          this.earlyVisible = true;
        } else {
          this.studentList[index].selectType = '离园登记';
          this.leaveVisible = true;
          this.studentRemark = leaving_status;
          this.preferred_academic_year = preferred_academic_year;
          this.getStudentInfo(id, academic_year_id, center_id);
          /*this.studentRemark = */
        }
      },
      transferReserveForAbsenteeism: function () {
        if (this.studentInfo.pay_bill) {
          this.leaveVisible = false;
          this.leaveShowVisible = true;
        } else {
          this.$router.push('/financemanagement/create-reserve/1?id=' + this.studentInfo.id)
        }
      }
    }
  }
</script>

<style scoped>
  .admissionRegistrationlist {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .admissionRegistrationlist .bold {
    font-weight: bold;
    color: black;
  }

  .admissionRegistrationlist >>> .el-form-item {
    margin-bottom: 20px;
  }

  .admissionRegistrationlist .content {
    margin-top: 10px;
  }

  .admissionRegistrationlist .list-content {
    margin-top: 15px;
  }

  .admissionRegistrationlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
  .admissionRegistrationlist >>>.el-dropdown .el-input__inner {
    width: auto;
  }
  .admissionRegistrationlist .studentFileCard {
    cursor: pointer;
    margin-right: 2%;
    margin-bottom: 40px;
    border: 1px solid #bbb;
    width: 31%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11, 98, 137, .2) 0px 0px 4px;
    -moz-box-shadow: rgba(11, 98, 137, .2) 0px 0px 4px;
    box-shadow: rgba(11, 98, 137, .2) 0px 0px 4px;
  }

  .admissionRegistrationlist .studentFileCard .card-content {
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }

  .admissionRegistrationlist .studentFileCard .card-content .studentType {
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }

  .admissionRegistrationlist .studentFileCard .card-footer {
    background-color: #999;
    padding: 10px;
    font-size: 12px;
    color: #fff;
  }

  .admissionRegistrationlist .studentFileCard .card-footer span {
    display: inline-block;
    text-align: center;
    width: 28%;
    line-height: 17px;
  }

  .admissionRegistrationlist .studentFileCard img {
    width: 100px;
    height: 100px;
  }

  .admissionRegistrationlist .labels {
    width: 60px;
    float: left;
    text-align: right;
    margin-right: 10px;
  }

  .admissionRegistrationlist .lable-p {
    line-height: 40px;
  }

  .admissionRegistrationlist >>> .el-dialog__footer {
    text-align: center;
  }

  .admissionRegistrationlist hr {
    margin: 10px 0px;
    border: 0;
    border-bottom: 1px solid #bbb;
  }

  .admissionRegistrationlist >>> .el-dialog__body {
    padding: 0px 20px 20px 20px;
  }

  .admissionRegistrationlist .title-span {
    color: #333333;
    font-weight: bold;
  }

  .admissionRegistrationlist .oper-div {
    margin: 20px 0;
  }

  .admissionRegistrationlist >>> .el-radio {
    line-height: 3;
  }

  .admissionRegistrationlist .leaveShow .dialog-body {
    text-align: center !important;
    line-height: 120px;
    margin-left: 80px;
  }
</style>
