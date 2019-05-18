<template>
  <div>
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

                  <template v-for="(app,app_index) in item.approve" >
                    <template>&nbsp;&nbsp;&nbsp;{{app.level_name}}&nbsp;<i v-show="app.level_no !== item.approve.length" class="fa fa-long-arrow-right" :key="app_index"></i></template>
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
        discountForm: []
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
      }
    }
  }
</script>

