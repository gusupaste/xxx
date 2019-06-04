<template>
  <div class="academicChange wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 财务处理 > 账单制作 > <span class="font-cl-blue">学业变更费用补缴</span></p>
    </div>
    <div class="content-top mt26">学业变更费用补缴</div>
    <div class="clearfix mt10">
      <el-form inline>
        <el-form-item label="学校：">{{schoolName}}</el-form-item>
        <br>
        <el-form-item label="学生：">
          <el-button style="border-raius:20px" @click="innerVisible=true">
            <i class="fa fa-search"></i>添加
          </el-button>
        </el-form-item>
        <el-form-item>
          <p v-for="item in multipleTable" :key="item.id">
            <span style="width:200px;display:inline-block"><span
              class="ml20">学生姓名：</span><span>{{item.student_name}}</span></span>
            <span style="width:200px;display:inline-block"><span
              class="ml20">所在班级：</span><span>{{item.class_name}}</span></span>
          </p>
        </el-form-item>
        <el-form-item label="单据申请信息：">
          <el-select v-model="apply_records_id" @change="changeApplyRecords">
            <el-option v-for="item in apply_records"
                       :value="item.id" :key="item.id" :label="item.application_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="申请学年：">
          <el-select v-model="academic_year_id" disabled="disabled"></el-select>
        </el-form-item>
        <el-form-item label="申请变更班级：">
          <el-select v-model="apply_class_id">
            <el-option v-for="item in apply_class"
                       :value="item.id" :key="item.id" :label="item.center_class__name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请变更日期：">
          <el-date-picker
            v-model="apply_date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :disabled="changeDisabled">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class=" tableList">
      <el-table
        class="mt26"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column label="已缴费情况描述">
          <el-table-column
            prop="date"
            label="费用类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="费用科目"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="缴费方式">
          </el-table-column>
          <el-table-column
            prop="address"
            label="缴费区间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="校历日总数">
          </el-table-column>
          <el-table-column
            prop="address"
            label="实际应缴金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="已缴金额">
          </el-table-column>
        </el-table-column>
        <el-table-column label="学费价格变化">
          <el-table-column
            prop="address"
            label="调整前价格 ">
          </el-table-column>
          <el-table-column
            prop="address"
            label="调整后价格">
          </el-table-column>
        </el-table-column>
        <el-table-column label="差额">
          <el-table-column
            prop="address"
            label="当月费用补缴">
          </el-table-column>
          <el-table-column
            prop="address"
            label="应补缴金额">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt26" style="text-align:right">
      补缴合计：<span class="red">— —</span>
    </div>
    <div class="mt26 text-align-center">
      <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
      <button class="btn bg-green">保存</button>
    </div>
    <!-- 添加学生 -->
    <el-dialog title="添加学生" :visible.sync="innerVisible" width="820px" class="copyPolicyShow">
      <el-form ref="policyForm" :model="copyForm" label-width="80px" style="border:none;padding:0">
        <div class="policyClass mt10">
          <p>{{schoolName}}</p>
        </div>
        <p class="mt20">
          <span class="mr10">搜索：</span>
          <el-input v-model="searchStr" class="w250_input" style="width:250px" placeholder="输入学号、学生姓名"></el-input>
          <el-button type="primary" @click="getStudent(1)">搜索</el-button>
        </p>

        <el-row class="mt20">
          <el-col :span="24">
            <el-form-item label="" label-width="40">
              <el-table
                :data="studentList"
                border
                stripe
                @selection-change="handleSelectionChange"
                max-height="300"
                ref="multipleTable">
                <el-table-column
                  prop="选择"
                  label="选择">
                  <template slot-scope="scope">
                    <el-radio v-model="choosePerson" :label="scope.row"></el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="学生姓名"
                >
                </el-table-column>
                <el-table-column
                  prop="student_no"
                  label="学号"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="联系人"
                >
                  <template slot-scope="scope">
                    {{scope.row.guardian_info.name}} <span v-if="scope.row.guardian_info.relationship">（{{scope.row.guardian_info.relationship}}，{{scope.row.guardian_info.telephone}}）</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev,pager, next, jumper"
                next-text="下一页"
                :page-size="pagesize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                :total="total" class="page">
              </el-pagination>
              <div class="red">
                <!-- *学生可多选，账单支持批量创建 -->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="innerVisible = false">取 消</el-button>
          <el-button class="bg-green bd-green white" type="success" @click="sureAddStudent">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        academic_year_id: '',
        apply_date: '',
        apply_records_id: '',
        apply_records: [],
        apply_class_id: '',
        apply_class: [],
        choosePerson: {},
        multipleTable: [],
        saveForm: {
          center_id: this.$cookies.get('userInfo').center.id
        },
        copyForm: {},
        schoolName: this.$cookies.get('userInfo').center.name,
        tableData: [],
        innerVisible: false,
        studentList: [],
        searchStr: '',
        pagesize: 10,
        currentPage: 1,
        total: 1,
        changeDisabled: true
      }
    },
    mounted: function () {
      this.getYearList()
      this.getStudent(1)
    },
    methods: {
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
      },
      getYearList: function () {
        this.$axios.get('/api/common/select/academic_year_list/')
          .then(res => {
            var yearList = res.data.results
            for (var x in yearList) {
              if (yearList[x].is_selected === 1) {
                this.academic_year_id = yearList[x].name
              }
            }
          }).catch(err => {
          console.log(err)
        })
      },
      getClasses: function () {
        this.$axios.get('/api/finance/change_class/classes/?class_type_id=' + this.multipleTable[0].class_type_id)
          .then(res => {
            if (res.data.status === 1) {
              this.apply_class = res.data.data
              if (this.apply_class.length > 0) {
                this.apply_class_id = this.apply_class[0].id
              }
            }
          }).catch(err => {
          console.log(err)
        })
      },
      getApplicationRecords: function () {
        this.$axios.get('/api/finance/change_class/application_records/?student_id=' + this.multipleTable[0].id)
          .then(res => {
            if (res.data.status === 1) {
              this.apply_records = res.data.data
              if (this.apply_records.length > 0) {
                this.apply_records_id = this.apply_records[0].id
                this.apply_date = this.apply_records[0].effective_date
                this.changeDisabled = false
              }
            }
          }).catch(err => {
          console.log(err)
        })

      },
      getStudent(val) {
        this.currentPage = val
        this.$axios.get('/api/finance/bill/show_bill_student/', {
          params: {
            search_str: this.searchStr,
            center_id: this.saveForm.center_id,
            page: this.currentPage
          }
        })
          .then(res => {
            this.studentList = res.data.data.student_li;
            this.total = res.data.data.student_total;
          })
      },
      getList: function () {
        this.$axios.get('/api/finance/change_class/bill_info/', {
          params: {
            student_id: this.choosePerson.id,
            class_type_id: this.multipleTable[0].class_type_id,
            center_class_year_id: this.apply_class_id,
            date: this.apply_date
          }
        }).then(res => {
            console.log(res.data)
          })
      },
      sureAddStudent() {
        this.$axios.get('/api/student/student/' + this.choosePerson.id + '/student_profile/', {
          params: {
            academic_year_id: this.academic_year_id
          }
        }).then(res => {
          if (res.data.status_code === 1) {
            this.multipleTable = [res.data.student_profile]
            this.innerVisible = false
            this.getClasses()
            this.getApplicationRecords()
            this.getList()
          } else {
            this.$message.warning(res.data.message)
          }
        }).catch(error => {
        })
      },
      handleSelectionChange: function () {

      },
      changeApplyRecords: function (val) {
        console.log(val)
      }
    },
    watch: {
      currentPage() {
        this.getStudent(this.currentPage)
      },
      apply_date() {
        if (new Date(this.apply_date).getTime() !== new Date(this.apply_date).setDate(1)) {
          this.$message.error("请选择每月的第一天")
        }
      }
    }
  }
</script>
<style scoped>
  .academicChange .content-top {
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    border-radius: 3px;
    color: #3E7193;
  }

  .academicChange .card-type {
    line-height: 30px;
  }

  .academicChange .el-card__body {
    padding: 30px 70px 10px 70px;
  }

  .academicChange .tableList {
    color: #101010;
  }

  .academicChange .el-form-item {
    margin-bottom: 10px;
  }

  .academicChange .el-form {
    padding: 20px;
    border: 1px solid #CCCCCC;
  }

  .academicChange >>> .el-radio__label {
    display: none !important;
  }

  .academicChange >>> .is-group tr:first-child th {
    background-color: #bbb !important;
    color: #101010;
  }

  .academicChange .head-detail {
    background-color: #ccc;
    color: #101010;
    height: 40px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 200;
    border: 1px solid #e6e6e6;
  }

  .academicChange .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
  }
</style>
