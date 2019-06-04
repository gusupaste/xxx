<template>
    <div class="academicChange wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 账单制作 > <span class="font-cl-blue">学业变更费用补缴</span></p>
      </div>
        <div class="content-top mt26">学业变更费用补缴</div>
        <div class="clearfix mt10">
            <el-form inline>
                <el-form-item label="学校：">合肥御龙湾校园</el-form-item>
                <br>
                <el-form-item label="学生：">
                    <el-button style="border-raius:20px" @click="innerVisible=true">
                        <i class="fa fa-search"></i>添加
                    </el-button>
                </el-form-item>
                <el-form-item label="单据申请信息：">
                  <el-select v-model="value1"></el-select>
                </el-form-item>
                <br>
                <el-form-item label="申请学年：">
                    <el-select v-model="acade_year" disabled="disabled"></el-select>
                </el-form-item>
                <el-form-item label="申请变更班级：">
                    <el-select v-model="value1"></el-select>
                </el-form-item>
                <el-form-item label="申请变更日期：">
                    <el-date-picker
                        v-model="change_date"
                        type="date"
                        placeholder="选择日期"
                        disabled="disabled">
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="mt26 head-detail">
            已缴费情况描述
            补缴费用明细
        </div> -->
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
                        <el-radio v-model="choosePerson" :label="scope.row"> </el-radio>
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
                  :page-size="10"
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
<style scoped>
  .academicChange .content-top{
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
      color:#101010;
  }
  .academicChange .el-form-item {
     margin-bottom: 10px;
  }
  .academicChange .el-form {
     padding:20px;
     border:1px solid #CCCCCC;
  }
  .academicChange >>> .el-radio__label{
    display: none !important;
  }
  .academicChange >>> .is-group tr:first-child th{
     background-color: #bbb !important;
     color:#101010;
  }
  .academicChange .head-detail {
     background-color: #ccc;
     color: #101010;
     height: 40px;
     line-height: 40px;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
  .academicChange .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:auto;
  }
</style>
<script>
export default {
    data(){
        return {
            change_date:'2019-06-31',
            acade_year:'2019-2020学年',
            value1:'',
            choosePerson:{},
            saveForm:{
                center_id:this.$cookies.get('userInfo').center.id
            },
            copyForm:{

            },
            schoolName:'',
            currentPage:1,
            tableData: [],
            innerVisible:false,
            studentList:[],
            searchStr:'',
            total:1,
        }
    },
    created () {
        this.getStudent(1)
    },
    methods:{
        handleCurrentChange(currentPage){
            this.currentPage=currentPage;
        },
        sureAddStudent(){

        },
        handleSelectionChange(val){
            this.multipleTable1 = val;
        },
        getStudent(val){
            var _this = this;
            // this.addform.date = this.$options.filters['formatDate'](new Date());
            this.$axios.get('/api/finance/bill/show_bill_student/',{
                params:{
                    search_str:this.searchStr,
                    center_id:this.saveForm.center_id,
                    page:this.currentPage,
                }
            })
            .then(res=>{
                _this.studentList = res.data.data.student_li;
                // _this.schoolName = res.data.data.center_name;
                _this.total=res.data.data.student_total;
                if(val === 1) {
                  if (_this.$route.query.id) {
                    _this.is_edit = true;
                    _this.$nextTick(() => {
                      _this.getDiscountInfo();
                    })
                  }
                }
            })
        },
    },
     watch: {
        currentPage(){
            this.getStudent(1)
        }
    }
}
</script>
