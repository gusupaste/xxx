<template>
  <div class="normaldis">
    <div class="select-header" style="min-height: 35px;">
            <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
                <i class="icon-font fa fa-calendar-plus-o"></i>
                <span class="orange font-size-14">新增折扣类型</span>
            </span>
    </div>
    <el-table
      :data="usualDiscountList"
      border
      stripe
      show-header
      style="width: 100%;">
      <el-table-column
        prop="name"
        label="折扣类型"
        min-width="40">
      </el-table-column>
      <el-table-column
        prop="centers"
        label="适用校园"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="mutexs"
        label="互斥折扣"
        min-width="80">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="20">
        <template slot-scope="scope">
          <el-button type="text" @click="usualDiscountDetail(scope.row.id)">查看详情</el-button>
          <span style="color: #999999">|</span>
          <el-button style="color: orange" type="text" @click="addNewDiscount(1)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="pager, next, jumper"
      next-text="下一页"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :total="total" class="page">
    </el-pagination>

    <!--  查看详情  -->
    <el-dialog title="折扣详情预览" :visible.sync="showDiscountVisible" width="800px" class="discountShow">
      <el-form ref="discountForm" :model="discountForm" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="折扣名称: "><span class="font-size-14 orange bold" style="color: #ED6C2E;font-size: 18px;">{{discountForm.name}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="适用校园: ">
              <div v-for="(item,index) in discountForm.center_class_type_list" :key="index">
                <span>{{item}}</span><br>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="判定条件: ">{{discountForm.condition_status_name}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <div v-for="(item,index) in discountForm.condition_list" :key="index">
                <template>{{index+1}}.
                  <template v-for="con in item.condition">
                    <template v-if="con.select_name === '>'">大于</template>
                    <template v-else-if="con.select_name === '>='">大于等于</template>
                    <template v-else-if="con.select_name === '='">等于</template>
                    <template v-else-if="con.select_name === '<'">小于</template>
                    <template v-else>小于等于</template>
                    {{con.select_value}}
                    <template v-if="discountForm.condition_status === 0">%</template>
                    <template v-if="con.select_select === 1">且</template>
                    <template v-else-if="con.select_select === 2">或</template>
                  </template>
                  &nbsp;&nbsp;&nbsp;
                  <template v-for="(app,app_index) in item.approve">
                    <template>{{app.level_name}}&nbsp;<i v-show="app.level_no !== item.approve.length"
                                                         class="fa fa-long-arrow-right" :key="app_index"></i>&nbsp;
                    </template>
                  </template>
                </template>
                <br>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="互斥折扣: ">
              <span>{{discountForm.mutex_names}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="showDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="showDiscountVisible = false">修 改</el-button>
        </span>
    </el-dialog>
    <!--  新增折扣类型  -->
    <el-dialog :title="discountName" :visible.sync="addDiscountVisible" width="800px" class="discountDialog">
      <el-form ref="discountForm" :model="discountForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="折扣名称: ">
              <el-input v-model="discountForm.name" size="small" placeholder="折扣名称限制15个字" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="适用校园: ">
              <el-form :model="searchSchool">
                <div>
                  <span>城际：</span>
                  <el-select v-model="searchSchool.intercity_id" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="int in intercityList" :key="int.id" :label="int.dept_name"
                               :value="int.id"></el-option>
                  </el-select>
                  <span style="margin-left:20px">区域：</span>
                  <el-select v-model="searchSchool.area_id" placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="area in areaList" :label="area.name" :value="area.id" :key="area.id"></el-option>
                  </el-select>
                  <el-button type="primary" @click="searchSchoolList">搜索</el-button>
                </div>
                <div class="school-wrap" style="">
                  <el-table
                    ref="multipleTable"
                    :data="schoolList"
                    max-height="300"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="校园"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="班级项目"
                      width="">
                      <template slot-scope="scope">
                        <el-checkbox-group v-model="checkList[scope.row.id]" @change="getClassList($event,scope.row)">
                          <el-checkbox v-for="cla in scope.row.class_types" :key="cla.id" :value="cla.id"
                                       :label="cla.id">{{cla.name}}
                          </el-checkbox>
                        </el-checkbox-group>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-form>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="判定条件: ">
              <el-select v-model="condition_name" placeholder="--请选择--" style="width: 100%;">
                <el-option
                  v-for="item in conditionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <table class="condition_table">
                <tr>
                  <td>条件1:</td>
                  <td>
                      <el-select  style="width: 90px;">
                        <el-option>大于</el-option>
                        <el-option>小于</el-option>
                        <el-option>大于等于</el-option>
                        <el-option>小于等于</el-option>
                        <el-option>等于</el-option>
                      </el-select>
                      <el-input  style="width: 80px;"></el-input>
                      <el-select  style="width: 90px;">
                        <el-option>或</el-option>
                        <el-option>且</el-option>
                      </el-select>
                  </td>
                  <td rowspan="2"><i class="fa fa-trash-o red"></i></td>
                </tr>
                <tr>
                  <td>审批流:</td>
                  <td>
                    <el-input style="width: 100px"></el-input>
                    <i class="fa fa-long-arrow-right"></i>
                    <el-input style="width: 100px"></el-input>
                  </td>
                </tr>
              </table>
              <span style="cursor:pointer;color: #ED6C2E;" @click="addIfElse">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="font-size-14">添加判断条件</span>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="互斥折扣: ">
              <el-checkbox-group v-model="type" style="text-align: left">
                <el-checkbox label="美食" name="type"></el-checkbox>
                <el-checkbox label="地推" name="type"></el-checkbox>
                <el-checkbox label="线下" name="type"></el-checkbox>
                <el-checkbox label="单纯" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="addDiscountVisible = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        type: 0,
        usualDiscountList: [],
        pagesize: 10,
        currentPage: 1,
        total: 1,
        showDiscountVisible: false,
        discountForm: [],
        addDiscountVisible: false,
        discountName: '',
        condition_name: '',
        conditionList: [
          {
            id: 0,
            name: '折扣率'
          },
          {
            id: 1,
            name: '折扣金额'
          }
        ],
        searchSchool: {
          intercity_id: '',
          area_id: ''
        },
        intercityList: [],
        areaList: [],
        schoolList: [],
        checkList: {},
        templateList: []
      }
    },
    mounted: function () {
      this.condition_name = this.conditionList[0].id
      this.getUsualDiscountList(1)
    },
    watch: {
      currentPage() {
        this.getUsualDiscountList(this.currentPage)
      }
    },
    methods: {
      getIntercity: function () {
        this.$axios.get('/api/common/intercity/')
          .then(res => {
            this.intercityList = res.data.intercity_list
          }).catch(err => {

        })
      },
      getArea: function () {
        this.$axios.get('/api/common/select/area_list/')
          .then(res => {
            this.areaList = res.data.results
          }).catch(err => {

        })
      },
      searchSchoolList: function () {
        this.$axios.get('/api/school_calendar/select/center_list/', {
          params: this.searchSchool
        }).then(res => {
          this.schoolList = res.data.results
          this.schoolList.map((v) => {
            this.$set(this.checkList, v.id, [])
          })
        }).catch(err => {

        })
      },
      handleSelectionChange: function (val) {
        for (let k in this.checkList) {
          this.checkList[k] = []
        }
        val.forEach(item => {
          console.log(item)
          var list = []
          item.class_types.forEach(ele => {
            list.push(ele.id)
          })
          this.checkList[item.id] = list
        })
        console.log(this.checkList)
        this.multipleSelection = val
      },
      getClassList: function ($event, id) {
        var length = $event.length
        length === 0 ? this.$refs.multipleTable.toggleRowSelection(id, false) : this.$refs.multipleTable.toggleRowSelection(id, true)
        this.schoolList.forEach(item => {
          if (item === id) {
            item.class_type_ids = $event
          }
        })
        console.log(this.schoolList)
      },
      getUsualDiscountList: function (val) {
        this.currentPage = val
        this.$axios.get('/api/discount/discount_type_management/?type=' + this.type + '&size=' + this.pagesize + '&page=' + this.currentPage)
          .then(res => {
            if (res.status === 200) {
              if (res.data.status_code === 1) {
                this.usualDiscountList = res.data.data.results
                this.total = res.data.data.count
              } else {
                alert(res.data.message)
              }
            }
          }).catch(err => {
          console.log(err)
        })
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
      usualDiscountDetail: function (id) {
        this.showDiscountVisible = true
        this.$axios.get('/api/discount/discount_type_management/' + id + '/list_info/')
          .then(res => {
            if (res.status === 200) {
              if (res.data.status_code === 1) {
                this.discountForm = res.data.data
              } else {
                alert(res.data.message)
              }
            }
          }).catch(err => {
          console.log(err)
        })
      },
      addNewDiscount: function (flag) {
        if (flag === 0) {
          this.discountName = '新增折扣类型'
        } else {
          this.discountName = '编辑折扣类型'
        }
        this.addDiscountVisible = true
      },
      addIfElse:function () {
        const newObj = {
          id:'',
          pname:'',
          sname:'',
          select:'',
          select2:'',
          input:'',
        }
        this.templateList.push(newObj);
      },
    }
  }
</script>
<style scoped>
   .normaldis .discountDialog .school-wrap >>> .el-table th{
     padding: 0;
   }
   .normaldis .discountDialog .condition_table{
     border: 1px solid #cccccc;
     border-collapse: collapse;
     width: 100%;
   }
   .normaldis .discountDialog .condition_table td{
     border: 1px solid #cccccc;
     padding: 5px;
   }
    .normaldis .discountDialog .icon-font{
      margin-left: 0;
  }
</style>
