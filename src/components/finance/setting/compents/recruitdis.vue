<template>
  <div>
    <div class="select-header" style="min-height: 35px;line-height: 35px;margin-bottom: 10px;">
                <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="orange font-size-14">新增折扣类型</span>
              </span>
    </div>
    <el-table
      :data="enrollmentDiscountList"
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
        prop="start_date"
        label="生效日期"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="end_date"
        label="失效日期"
        min-width="60">
      </el-table-column>
      <el-table-column
        label="缴费截至日期"
        min-width="60">
        <template slot-scope="scope">
          <span>{{scope.row.pay_end_date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay_type"
        label="缴费方式"
        min-width="60">
      </el-table-column>
      <el-table-column
        prop="discount_money"
        label="折扣金额"
        min-width="60">
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
        min-width="40">
        <template slot-scope="scope">
          <el-button style="color: orange" type="text" size="small" @click="addNewDiscount(scope.row.id)">编辑</el-button>
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
    <el-dialog :title="discountName" :visible.sync="addDiscountVisible" width="800px" class="discountDialog">
      <el-form ref="discountForm" v-model="discountForm" label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="折扣名称: ">
              <el-input v-model="discountForm.name" size="small" placeholder="折扣名称限制15个字" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="折扣生效日期: " label-width="100">
              <el-date-picker
                v-model="discountForm.start_date"
                type="date"
                :editable="false"
                :clearable="false"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerBefore"
                @focus="Before"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="折扣失效日期: " label-width="100">
              <el-date-picker
                v-model="discountForm.end_date"
                type="date"
                :editable="false"
                :clearable="false"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerAfter"
                @focus="After">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴费截止日期: ">
              <el-date-picker
                v-model="discountForm.pay_end_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴费方式: ">
              <el-select v-model="discountForm.pay_type">
                <el-option :value="Number(0)" label="年缴"></el-option>
                <el-option :value="Number(1)" label="学期缴"></el-option>
                <el-option :value="Number(2)" label="月缴"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="缴费金额: ">
              <el-input v-model="discountForm.discount_money" size="small" placeholder="缴费金额"></el-input>
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
                    border>
                    <el-table-column
                      label="校园">
                      <template slot-scope="scope">
                        <el-checkbox-group v-model="checkSchoolList[scope.row.id]"
                                           @change="getSchoolList($event,scope.row)">
                          <el-checkbox :value="scope.row.id" :label="scope.row.id">{{scope.row.name}}
                          </el-checkbox>
                        </el-checkbox-group>
                      </template>
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
          <el-button type="success" @click="saveRecruitdis">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: 0,
        type: 1,
        enrollmentDiscountList: [],
        pagesize: 10,
        currentPage: 1,
        total: 1,
        discountName: '',
        addDiscountVisible: false,
        searchSchool: {
          intercity_id: '',
          area_id: ''
        },
        intercityList: [],
        areaList: [],
        schoolList: [],
        checkList: {},
        checkSchoolList: {},
        discountForm: {},
        multipleSelection: [],
        exist_discount_type_value: [],
        exist_discount_type: [],
        pickerBefore: {},
        pickerAfter: {}
      }
    },
    mounted: function () {
      this.getEnrollmentDiscountList(1)
    },
    watch: {
      currentPage () {
        this.getEnrollmentDiscountList(this.currentPage)
      }
    },
    methods: {
      Before () {
        if (this.discountForm.end_date !== '') {
          var date = new Date(new Date(this.discountForm.end_date).getTime() - 24 * 60 * 60 * 1000)
          this.pickerBefore = {
            disabledDate (time) {
              return time.getTime() > date
            }
          }
        }
      },
      After () {
        if (this.discountForm.start_date !== '') {
          var date = new Date(this.discountForm.start_date).getTime()
          this.pickerAfter = {
            disabledDate (time) {
              return time.getTime() <= date
            }
          }
        }
      },
      getEnrollmentDiscountList: function (val) {
        this.currentPage = val
        this.$axios.get('/api/discount/discount_type_management/?type=' + this.type + '&size=' + this.pagesize + '&page=' + this.currentPage)
          .then(res => {
            if (res.status === 200) {
              if (res.data.status_code === 1) {
                this.enrollmentDiscountList = res.data.data.results
                this.total = res.data.data.count
              } else {
                alert(res.data.message)
              }
            }
          }).catch(err => {
          console.log(err)
        })
      },
      addNewDiscount: function (flag) {
        this.exist_discount_type_value = []
        if (flag === 0) {
          this.discountName = '新增折扣类型'
          this.searchSchoolList() //学校.班级
          this.getExistDiscountType() //互斥折扣
          this.discountForm = {
            name: '',
            start_date: '',
            end_date: '',
            pay_end_date: '',
            pay_type: 0,
            discount_money: ''
          }
        } else {
          this.discountName = '编辑折扣类型'
          this.getDetailById(flag) //编辑接口
        }
        this.id = flag
        this.addDiscountVisible = true
      },
      getDetailById: function (id) {
        this.$axios.get('/api/discount/discount_type_management/' + id + '/discount_type_info/')
          .then(res => {
            this.discountForm = res.data.data.discount_type
            this.schoolList = res.data.data.center_list
            this.schoolList.map(v => {
              this.$set(this.checkList, v.id, [])
              this.$set(this.checkSchoolList, v.id, [])
            })
            //选中 显示
            this.schoolList.forEach(v => {
              if (v.status === 1) {
                var list = []
                v.class_types.forEach(ele => {
                  if (ele.status === 1) {
                    list.push(ele.id)
                  }
                })
                this.checkList[v.id] = list
                this.checkSchoolList[v.id] = [v.id]
              }
            })
            this.exist_discount_type = res.data.data.mutexs
            this.exist_discount_type_value = res.data.data.mutex_list
          }).catch(err => {
        })
      },
      /* 互斥折扣 */
      getExistDiscountType: function () {
        this.$axios.get('/api/discount/discount_type_management/get_exist_discount_type/')
          .then(res => {
            this.exist_discount_type = res.data.data
          }).catch(err => {

        })
      },
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
            this.$set(this.checkSchoolList, v.id, [])
          })
        }).catch(err => {

        })
      },
      getSchoolList: function ($event, obj) {
        var length = $event.length
        if (length !== 0) {
          var list = []
          obj.class_types.forEach(c => {
            list.push(c.id)
          })
          this.checkList[obj.id] = list
          this.checkSchoolList[obj.id] = [obj.id]
        } else {
          this.checkList[obj.id] = []
          this.checkSchoolList[obj.id] = []
        }
      },
      /* 选某个班级 则选中整个校园 */
      getClassList: function ($event, obj) {
        var length = $event.length
        if (length !== 0) {
          this.checkList[obj.id] = $event
          this.checkSchoolList[obj.id] = [obj.id]
        } else {
          this.checkList[obj.id] = []
          this.checkSchoolList[obj.id] = []
        }
      },
      saveRecruitdis: function () {
        var multipleSelection = []
        for (var i = 0; i < this.schoolList.length; i++) {
          if (this.checkSchoolList[this.schoolList[i].id].length > 0) {
            var obj = {
              center_id: this.checkSchoolList[this.schoolList[i].id][0],
              class_types: this.checkList[this.schoolList[i].id]
            }
            multipleSelection.push(obj)
          }
        }
        //验证
        /*  新增  */
        if (this.id === 0) {
          this.$axios.post('/api/discount/discount_type_management/', {
            center_class_type_list: multipleSelection,
            name: this.discountForm.name,
            start_date: this.discountForm.start_date,
            end_date: this.discountForm.end_date,
            pay_end_date: this.discountForm.pay_end_date,
            pay_type: this.discountForm.pay_type,
            discount_money: this.discountForm.discount_money,
            type: 1,
            mutex_list: this.exist_discount_type_value,
          }).then(res => {
            this.$message.success("保存成功")
            this.addDiscountVisible = false
            this.getEnrollmentDiscountList(1)
          }).catch(err => {
          })
        } else {
          this.$axios.post('/api/discount/discount_type_management/' + this.id + '/update_class_type/', {
            center_class_type_list: multipleSelection,
            name: this.discountForm.name,
            start_date: this.discountForm.start_date,
            end_date: this.discountForm.end_date,
            pay_end_date: this.discountForm.pay_end_date,
            pay_type: this.discountForm.pay_type,
            discount_money: this.discountForm.discount_money,
            mutex_list: this.exist_discount_type_value,
          }).then(res => {
            this.$message.success("保存成功")
            this.addDiscountVisible = false
            this.getEnrollmentDiscountList(1)
          }).catch(err => {
          })
        }
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      }
    }
  }
</script>

