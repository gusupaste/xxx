<template>
    <div class="preparatoryStudent wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 退费管理 > <span class="font-cl-blue">新增预备生退费账单</span></p>
      </div>
        <div class="content-top">新增预备生退费账单</div>
        <div class="clearfix">
            <el-col :span="24" class="card-type">
                <el-card shadow="always">
                <p>
                <el-row>
                  <el-col :span="4"><div class="grid-content bg-purple">学生：
                    <span class="red" style="cursor:pointer" @click="addStudentVisible = true">
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                      <span class="font-size-14">添加</span>
                    </span>
                  </div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">学生姓名：28342368476</div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">学号：大二班</div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">所在班级：大二班</div></el-col>
                  <el-col :span="5"><div class="grid-content bg-purple">学生当前状态：大二班</div></el-col>
                </el-row>
                </p>
                <p>
                <el-row>
                  <el-col :span="6"><div class="grid-content bg-purple">最后出勤日期：
                    <el-date-picker
                      style="width: 10%;"
                      v-model="value2"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions1">
                    </el-date-picker>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">申请退费日期：
                    <el-date-picker
                      style="width: 10%;"
                      v-model="value2"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions1">
                    </el-date-picker>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">学年：
                    <el-select v-model="nameSelect" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">单据申请信息：
                    <el-select v-model="nameSelect" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div></el-col>
                </el-row>
                </p>
                <p>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple">离园原因：
                      <el-radio-group v-model="radio2">
                        <el-radio :label="3">居所搬迁/父母工作调动</el-radio>
                        <el-radio :label="6">家庭变故</el-radio>
                        <el-radio :label="9">生病</el-radio>
                        <el-radio :label="10">毕业</el-radio>
                      </el-radio-group>
                    </div></el-col>
                  </el-row>
                </p>
                <p>
                  <el-row>
                    <el-col :span="24">
                      <div class="grid-content bg-purple">是否已领物品：
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                      </div>
                    </el-col>
                  </el-row>
                </p>
                </el-card>
            </el-col>
        </div>
        <div class="mt26 tableList">
            <p>退费明细（标准项目）：</p>
            <p class="remarks">1.在学籍起始日之前提出，扣除半个月学费。剩余费用退还，在入学起始日之后提出退园，按缺勤请假规定执行</p>
            <p class="remarks">2.新生物品费相关项目以学校实际物品领用情况酌情处理，如果发生物品领用，请按物品价格相应扣款</p>
            <el-table
                class="mt10"
                :data="tableData"
                border
                style="width: 100%">
              <el-table-column label="已缴费情况描述">
                <el-table-column
                prop="date"
                label="缴费项目">
                </el-table-column>
                <el-table-column
                prop="name"
                label="缴费方式">
                </el-table-column>
                <el-table-column
                prop="address"
                label="起止日期">
                </el-table-column>
                <el-table-column
                prop="address"
                label="校日历总数">
                </el-table-column>
                <el-table-column
                prop="address"
                label="实际应缴费用">
                </el-table-column>
                <el-table-column
                prop="address"
                label="缴费金额">
                </el-table-column>
                <el-table-column
                prop="address"
                label="单价">
                </el-table-column>
              </el-table-column>
              <el-table-column label="需退费情况描述">
                <el-table-column
                  prop="address"
                  label="扣款">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="应退转金额小计">
                </el-table-column>
              </el-table-column>
            </el-table>
        </div>
        <div class="mt26 tableList">
          <p>制度外退费（其他扣款/退费项目明细）
            <span class="red" style="cursor:pointer" @click="addProjectVisible = true">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
              <span class="font-size-14">添加项目</span>
            </span>
          </p>
          <el-table
            class="mt10"
            :data="tableData"
            border
            style="width: 100%">
              <el-table-column
                prop="date"
                label="扣款/退款">
              </el-table-column>
              <el-table-column
                prop="name"
                label="项目名称">
              </el-table-column>
              <el-table-column
                prop="address"
                label="情况说明">
              </el-table-column>
              <el-table-column
                prop="address"
                label="金额小计">
              </el-table-column>
          </el-table>
        </div>
        <div class="mt26 tableList">
          <p>相关附件：
            <el-upload
              style="display: initial;"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :file-list="fileList">
              <el-button size="small" type="primary"><span class="el-icon-upload2" style="font-weight: bold"></span>上传</el-button>
            </el-upload></p>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey">返回</button>
        </div>
      <add-project v-if="addProjectVisible"></add-project>

      <add-student v-if="addStudentVisible"></add-student>
    </div>
</template>
<style scoped>
  .preparatoryStudent .content-top{
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
  .preparatoryStudent .card-type {
      line-height: 30px;
  }
  .preparatoryStudent .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .preparatoryStudent .tableList {
      color:#101010;
  }
  .preparatoryStudent hr {
    margin: 10px 0;
    border: 0px;
    border-bottom: 1px solid #ddd;
  }
  .preparatoryStudent .remarks{
    color: #999999;
    font-size: 12px;
    line-height:24px;
  }
</style>
<script>
import addProject from './addPreject';
import addStudent from './addStudent';
export default {
  components:{
    addProject,
    addStudent,
  },
    data(){
        return {
          value2:'',
          radio2:'',
          fileList:[],
          addProjectVisible:false,
          addStudentVisible:false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }]
        }
    }
}
</script>
