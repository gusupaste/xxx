<template>
    <div class="wrap policy">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">收费政策</span></p>
        </div>
        <el-table
        class="mt26"
            :data="chargeTable"
            border
            style="width: 100%">
            <el-table-column
            prop="center_str"
            label="校园名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="academic_year_str"
            label="学年"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="收费政策"
            >
            <template slot-scope="scope">
                <span class="cur font-cl-blue bold" @click="viewDetail(scope.row)">{{scope.row.name}}</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="expiry_date"
            label="有效期"
            >
            </el-table-column>
            <el-table-column
            prop="remarks"
            label="备注"
            >
            </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="changePage"
          :page-size="10"
          :current-page="searchform.page"
          layout="prev, pager, next"
          :total="count">
      </el-pagination>
        <!-- 政策详情 -->
      <el-dialog title="政策详情" :visible.sync="showPolicyVisible" width="800px" class="policyShow">
        <el-form ref="policyForm" :model="detailForm"  label-width="80px">
          <div class="policyClass">
            <p class="bold font-size-18">政策标题：{{ detailForm.name }}</p>
            <el-row class="mt20 inline-block" style="width:90%;vertical-align:middle">
              <el-col :span="7">
                <span>适用校园：</span>
                <span>{{ detailForm.center_str }}</span>
              </el-col>
              <el-col :span="7">
                <span>适用学年：</span>
                <span>{{ detailForm.academic_year_str }}</span>
              </el-col>
              <el-col :span="8">
                <span>有效期：</span>
                <span>{{ detailForm.expiry_date }}</span>
              </el-col>
            </el-row>
            <br><hr class="mt20"><br>
            <el-table
              :data="detailForm.items"
              border
              stripe
              show-header
              :span-method="objectSpanMethod"
              style="width: 100%;">
              <el-table-column
                prop="subject_category"
                label="费用项目"
                >
              </el-table-column>
              <el-table-column
                prop="subject"
                label=""
                >
              </el-table-column>
              <el-table-column
                prop="class_type"
                label="班级类型"
                >
              </el-table-column>
              <el-table-column
                prop="payment_method"
                label="缴费方式"
                >
              </el-table-column>
              <el-table-column
                prop="ranges"
                label="适用范围">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="remarks"
                label="备注">
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </el-dialog>
        <!-- 弹框 -->
        <el-dialog title="政策详情" :visible.sync="dialogTableVisible">
            <p class="title-style">政策标题：合肥御龙湾校园2009-2010学年收费政策</p>
            <p class="mt10" style="padding-bottom:20px;border-bottom:1px solid #ccc">
                <span>适用校园：北京CBD世贸校园</span>
                <span class="ml20">适用学年：2018-2019</span>
                <span class="ml20">有效期：2018/09/11-2019/02/10</span>
            </p>
            <el-table :data="gridData" class="mt26">
                <el-table-column property="date" label="费用项目" width=""></el-table-column>
                <el-table-column property="name" label="班级类型" width=""></el-table-column>
                <el-table-column property="address" label="缴费方式"></el-table-column>
                <el-table-column property="address" label="适用范围"></el-table-column>
                <el-table-column property="address" label="价格"></el-table-column>
                <el-table-column property="address" label="备注"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<style lang="" scoped>
    
</style>
<script>
export default {
    data() {
        return {
            count:1,
            dialogTableVisible:false,
            showPolicyVisible:false,
            gridData: [],
            chargeTable: [],
            spanArr:[],
            detailForm:{},
            searchform:{
              center_id:3,
              page:1,
              size:10
            },
        }
    },
    created () {
        this.searchform.center_id = this.$cookies.get('userInfo').center.id;
        this.searchList(1);
    },
    methods: {
        searchList(val){
          var _this = this;
          this.searchform.page = val;
          this.$axios.get('/api/finance/charging_policy/',{
            params:this.searchform
          })
          .then(res=>{
              console.log(res.data)
            _this.chargeTable = res.data.data.students.results;
            _this.count = res.data.data.students.count;
          })
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {
              const _row = this.spanArr[rowIndex];
             const _col = _row > 0 ? 1 : 0;
              return {
                    rowspan: _row,
                    colspan: _col
              }
          }
      },
      getSpanArr(data) {
        this.spanArr = [];
        for (var i = 0; i < this.detailForm.items.length; i++) {
              if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0
              } else {
                // 判断当前元素与上一个元素是否相同
          if (this.detailForm.items[i].subject_category === this.detailForm.items[i-1].subject_category) {
                      this.spanArr[this.pos] += 1;
                      this.spanArr.push(0);
                    } else {
                      this.spanArr.push(1);
                      this.pos = i;
                    }
              }
          }
      },
      viewDetail(val){
        //   this.copyForm.title = val.name;
        //   this.copyForm.id = val.id;
        //   this.searchSchoolForm.academic_year_id = this.yearList[0].id;
          var _this = this;
          this.$axios.get('/api/finance/charging_policy/'+val.id+'/view_detail/')
          .then(res=>{
              _this.detailForm = res.data.detail;
              _this.getSpanArr();
              _this.showPolicyVisible = true;
          })
        },
        changePage(val){
            this.searchList(val);
        },
    }
}
</script>