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
              <el-input v-model="name" size="small" placeholder="折扣名称限制15个字" maxlength="15"></el-input>
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
              <table id="id-add-table" style="width: 100%" v-for="(table,index) in tableForm">
                <table class="condition_table">
                  <tr>
                    <td style="width: 5rem" class="text-align-center">条件1:</td>
                    <td class="select-pere">
                      <template v-for="(con,con_index) in table.condition">
                        <el-select style="width: 100px;" v-model="con.select_name">
                          <el-option value=">" label="大于"></el-option>
                          <el-option value="<" label="小于"></el-option>
                          <el-option value=">=" label="大于等于"></el-option>
                          <el-option value="<=" label="小于等于"></el-option>
                          <el-option value="=" label="等于"></el-option>
                        </el-select>
                        <el-input style="width: 80px;" v-model="con.select_value"><i v-show="condition_name === 0"
                                                                                     slot="suffix"
                                                                                     class="fa fa-percent"></i>
                        </el-input>
                        <el-select style="width: 90px;" v-model="con.select_select"
                                   @change="addContion($event,con_index,index)">
                          <el-option :value="Number(0)" label="-请选择-"></el-option>
                          <el-option :value="Number(1)" label="且"></el-option>
                          <el-option :value="Number(2)" label="或"></el-option>
                        </el-select>
                      </template>
                    </td>
                    <td style="width: 2rem" rowspan="2" class="text-align-center"><i @click="tr_delete(index)"
                                                                                     class="fa fa-trash-o red"></i></td>
                  </tr>
                  <tr>
                    <td class="text-align-center">审批流:</td>
                    <td>
                      <template v-for="(app,app_index) in table.approve">
                        <el-select style="width: 120px;" :key="app.id" v-model="app.role_id"
                                   @change="addApprove($event,app_index,index)">
                          <el-option v-for="role in roleList"
                                     :key="role.id"
                                     :value="role.id"
                                     :label="role.name"></el-option>
                        </el-select>
                        <span style="color: #A0A0A0" v-show="app.role_id !== 0"><i
                          class="fa fa-long-arrow-right"></i></span>
                      </template>
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
                <el-checkbox name="type" v-for="(type,index) in exist_discount_type" :key="index"
                             :label="type.id">{{type.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="saveNormaldis">保 存</el-button>
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
        exist_discount_type_value: [],
        exist_discount_type: [],
        multipleSelection: [],
        name: '',
        tableForm: [],
        roleList: [
          {
            id: 0,
            name: '-请选择-'
          }
        ]
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
        this.multipleSelection = []
        for (let k in this.checkList) {
          this.checkList[k] = []
        }
        val.forEach(item => {
          var obj = {
            center_id: item.id,
            class_types: []
          }
          var list = []
          item.class_types.forEach(ele => {
            obj.class_types.push(ele.id)
            list.push(ele.id)
          })
          this.multipleSelection.push(obj) //传到后台的数据
          this.checkList[item.id] = list
        })
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
        this.$axios.get('/api/discount/discount_type_management/' + id + '/list_info/', {
          params: this.searchSchool
        })
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
        this.getRoleList()
        this.exist_discount_type_value = []
        if (flag === 0) {
          this.discountName = '新增折扣类型'
          this.searchSchoolList() //学校.班级
          this.getExistDiscountType() //互斥折扣
          this.name = ''
          var obj = {
            id: '',
            condition: [
              {
                id: 0,
                select_value: '',
                select_select: 0,
                select_name: '>'
              }
            ],
            approve: [
              {
                id: 0,
                level_no: 1,
                role_id: 0,
                role_name: ''
              }
            ]
          }
          this.tableForm = []
          this.tableForm.push(obj)
          this.condition_name = this.conditionList[0].id
        } else {
          this.discountName = '编辑折扣类型'
          this.getDetailById(flag) //编辑接口
        }
        this.addDiscountVisible = true
      },
      /* 审批流 所有角色 */
      getRoleList: function () {
        this.$axios.get('/api/user/get_roles/')
          .then(res => {
            this.roleList = this.roleList.concat(res.data.data)
          }).catch(err => {

        })
      },
      addIfElse: function () {
        var obj = {
          id: '',
          condition: [
            {
              id: 0,
              select_value: '',
              select_select: 0,
              select_name: '>'
            }
          ],
          approve: [
            {
              id: 0,
              level_no: 1,
              role_id: 0,
              role_name: ''
            }
          ]
        }
        this.tableForm.push(obj)
      },
      /* 添加条件 */
      addContion: function (val, conIndex, index) {
        if (this.tableForm[index].condition.length - 1 === conIndex) {
          if (val !== 0) {
            var obj = {
              id: 0,
              select_value: '',
              select_select: 0,
              select_name: '>'
            }
            this.tableForm[index].condition.push(obj)
          }
        } else {
          if (val === 0) {
            this.tableForm[index].condition.splice(conIndex + 1, this.tableForm[index].condition.length)
          }
        }
      },
      /* 添加审批流 */
      addApprove: function (val, conIndex, index) {
        for (var i = 0; i < this.roleList.length; i++) {
          if (val === this.roleList[i].id) {
            this.tableForm[index].approve[conIndex].role_name = this.roleList[i].name
          }
        }
        if (this.tableForm[index].approve.length - 1 === conIndex) {
          if (val !== 0) {
            var obj = {
              id: 0,
              level_no: conIndex + 2,
              role_id: 0,
              role_name: ''
            }
            this.tableForm[index].approve.push(obj)
          }
        } else {
          if (val === 0) {
            this.tableForm[index].approve.splice(conIndex + 1, this.tableForm[index].approve.length)
          }
        }
      },
      /* 删除条件.审批流 */
      tr_delete: function (index) {
        this.tableForm.splice(index, 1)
      },
      /* 互斥折扣 */
      getExistDiscountType: function () {
        this.$axios.get('/api/discount/discount_type_management/get_exist_discount_type/')
          .then(res => {
            this.exist_discount_type = res.data.data
          }).catch(err => {

        })
      },
      /*  编辑  */
      getDetailById: function (id) {
        this.$axios.get('/api/discount/discount_type_management/' + id + '/discount_type_info/')
          .then(res => {
            this.name = res.data.data.discount_type.name
            this.condition_name = res.data.data.discount_type.condition_status
            this.schoolList = res.data.data.center_list
            this.tableForm = res.data.data.condition_list
            //默认添加末尾的 审批流
            for (var i = 0; i < this.tableForm.length; i++) {
              var len = this.tableForm[i].approve.length
              var obj = {
                id: 0,
                level_no: len + 1,
                role_id: 0,
                role_name: ''
              }
              this.tableForm[i].approve.push(obj)
            }
            this.schoolList.map((v) => {
              this.$set(this.checkList, v.id, [])
            })
            this.exist_discount_type = res.data.data.mutexs
            this.exist_discount_type_value = res.data.data.mutex_list
          }).catch(err => {
        })
      },
      /*  折扣类型  */
      saveNormaldis: function () {
        //删除最后一个审批流
        var tableFormTemp = this.tableForm
        for (var i = 0; i < tableFormTemp.length; i++) {
          tableFormTemp[i].approve.pop()
        }
        this.$axios.post('/api/discount/discount_type_management/',{
          center_class_type_list: this.multipleSelection,
          name: this.name,
          type: 0,
          mutex_list: this.exist_discount_type_value,
          condition_status: this.condition_name,
          conditions: tableFormTemp
        }).then(res => {
              this.$message.success("保存成功")
              this.addDiscountVisible = false
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
