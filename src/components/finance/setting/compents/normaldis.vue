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
          <el-button style="color: orange" type="text" @click="addNewDiscount(scope.row.id)">编辑</el-button>
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
        </span>
    </el-dialog>
    <!--  新增折扣类型  -->
    <el-dialog :title="discountName" :visible.sync="addDiscountVisible" width="800px" class="discountDialog">
      <el-form ref="discountForm" v-model="discountForm" label-width="80px">
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
                </div>
                <div class="school-wrap" style="">
                  <el-table
                    ref="multipleTable"
                    :data="schoolList"
                    max-height="300"
                    tooltip-effect="dark"
                    style="width: 90%"
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
                          <el-checkbox v-for="cla in scope.row.class_types" :key="cla.id" :value="cla.id" :label="cla.id">{{cla.name}}</el-checkbox>
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
              <table ref="template_condition" style="width: 90%">
                <table class="condition_table" v-for="(table,index) in tableConditionData" :key="index">
                  <tr>
                    <td style="width: 5rem" class="text-align-center">条件1:</td>
                    <td class="select-pere">
                      <template v-for="(list,index) in td_condition_list">
                        <el-select style="width: 100px;" v-model="list.condition_sele" :key="index">
                          <el-option v-for="sele in list.condition_select_list" :key="sele.id"
                                     :value="sele.id" :label="sele.name"
                          ></el-option>
                        </el-select>
                        <el-input style="width: 80px;" v-model="list.condition_input" :key="index"><i
                          v-show="condition_name === 0"
                          slot="suffix"
                          class="fa fa-percent"></i>
                        </el-input>
                        <el-select style="width: 90px;" v-model="list.condition_sele2" :key="index"
                                   @change="addContion($event,index)">
                          <el-option v-for="sele2 in list.condition_select2_list" :key="sele2.id"
                                     :value="sele2.id" :label="sele2.name"></el-option>
                        </el-select>
                      </template>
                    </td>
                    <td style="width: 2rem" rowspan="2" class="text-align-center"><i @click="tr_delete"
                                                                                     class="fa fa-trash-o red"></i></td>
                  </tr>
                  <tr>
                    <td class="text-align-center">审批流:</td>
                    <td>
                      <el-input style="width: 100px"></el-input>
                      <i class="fa fa-long-arrow-right"></i>
                      <el-input style="width: 100px"></el-input>
                    </td>
                  </tr>
                </table>
              </table>
              <span style="cursor:pointer;color: #ED6C2E;" @click="addIfElse">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="font-size-14">添加判断条件</span>
              </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="互斥折扣: ">
              <el-checkbox-group v-model="exist_discount_type_value" style="text-align: left">
                <el-checkbox name="type" v-for="type in exist_discount_type" :key="type.id" :value="type.id" :label="type.name"></el-checkbox>
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
        tableConditionData: [],
        td_condition_list: [
          {
            condition_sele: 0,
            condition_select_list: [
              {
                id: 0,
                name: '大于'
              },
              {
                id: 1,
                name: '小于'
              },
              {
                id: 2,
                name: '大于等于'
              },
              {
                id: 3,
                name: '小于等于'
              },
              {
                id: 4,
                name: '等于'
              }
            ],
            condition_input: '',
            condition_sele2: 0,
            condition_select2_list: [
              {
                id: 0,
                name: '-请选择-'
              },
              {
                id: 1,
                name: '且'
              },
              {
                id: 2,
                name: '或'
              }
            ]
          }
        ],
        exist_discount_type_value: '',
        exist_discount_type: [],
        multipleSelection: []
      }
    },
    mounted: function () {
      this.getUsualDiscountList(1)
    },
    watch: {
      currentPage() {
        this.getUsualDiscountList(this.currentPage)
      }
    },
    methods: {
      /* 下拉框 城际列表 */
      getIntercity: function () {
        this.$axios.get('/api/common/intercity/')
          .then(res => {
            this.intercityList = res.data.intercity_list
          }).catch(err => {

        })
      },
      /* 下拉框 区域列表 */
      getArea: function () {
        this.$axios.get('/api/common/select/area_list/')
          .then(res => {
            this.areaList = res.data.results
          }).catch(err => {

        })
      },
      /* 校园.班级列表 */
      searchSchoolList: function () {
        this.$axios.get('/api/discount/discount_type_management/all_center_class_type/', {
          params: this.searchSchool
        }).then(res => {
          this.schoolList = res.data.data
          this.schoolList.map((v) => {
            this.$set(this.checkList, v.id, [])
          })
        }).catch(err => {

        })
      },
      /* 多选校园事件 */
      handleSelectionChange: function (val) {
        for (let k in this.checkList) {
          this.checkList[k] = []
        }
        val.forEach(item => {
          var list = []
          item.class_types.forEach(ele => {
            list.push(ele.id)
          })
          this.checkList[item.id] = list
        })
        this.multipleSelection = val //传到后台的数据
      },
      /* 选某个班级 则选中整个校园 */
      getClassList: function ($event, id) {
        var length = $event.length
        length === 0 ? this.$refs.multipleTable.toggleRowSelection(id, false) : this.$refs.multipleTable.toggleRowSelection(id, true)
        this.schoolList.forEach(item => {
          if (item === id) {
            item.class_type_ids = $event
          }
        })
      },
      /* 页面列表 */
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
      /* 查看详情 */
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
      /* 弹框 新增.编辑 */
      addNewDiscount: function (flag) {
        if (flag === 0) {
          this.discountName = '新增折扣类型'
          this.searchSchoolList() //学校.班级
          this.getExistDiscountType() //互斥折扣
        } else {
          this.discountName = '编辑折扣类型'
        }
        this.addDiscountVisible = true
        this.condition_name = this.conditionList[0].id
      },
      addIfElse: function () {
        const newObj = {
          id: '',
          pname: '',
          sname: '',
          select: '',
          select2: '',
          input: '',
        }
        this.templateList.push(newObj);
      },
      /* 添加条件.审批流 */
      addContion: function (val, index) {
        if (index === this.td_condition_list.length - 1) { //最后一个才有添加机会
          if (val !== 0) {
            const obj = {
              condition_sele: 0,
              condition_select_list: [
                {
                  id: 0,
                  name: '大于'
                },
                {
                  id: 1,
                  name: '小于'
                },
                {
                  id: 2,
                  name: '大于等于'
                },
                {
                  id: 3,
                  name: '小于等于'
                },
                {
                  id: 4,
                  name: '等于'
                }
              ],
              condition_input: '',
              condition_sele2: 0,
              condition_select2_list: [
                {
                  id: 0,
                  name: '-请选择-'
                },
                {
                  id: 1,
                  name: '且'
                },
                {
                  id: 2,
                  name: '或'
                }
              ]
            }
            this.td_condition_list.push(obj)
          }
        } else { //删除
          if (val === 0) {
            this.td_condition_list.splice(index + 1, this.td_condition_list.length)
          }
        }
      },
      /* 删除条件.审批流 */
      tr_delete: function () {

      },
      /* 互斥折扣 */
      getExistDiscountType: function () {
        this.$axios.get('/api/discount/discount_type_management/get_exist_discount_type/')
          .then(res => {
            this.exist_discount_type = res.data.data
          }).catch(err => {

        })
      }
    }
  }
</script>
<style scoped>
  .normaldis .discountDialog .school-wrap >>> .el-table th {
    padding: 0;
  }

  .normaldis .discountDialog .condition_table {
    border: 1px solid #cccccc;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 10px;
  }

  .normaldis .discountDialog .condition_table td {
    border: 1px solid #cccccc;
    padding: 5px;
  }

  .normaldis .discountDialog .icon-font {
    margin-left: 0;
  }

  .normaldis .select-pere >>> .el-input--suffix .el-input__inner {
    padding-right: 15px;
  }
</style>
