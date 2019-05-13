<template>
    <div>
        <div class="select-header select-length" style="line-height:45px">
            <span>城际：</span>
            <el-select v-model="searchform.intercity_id" placeholder="请选择" style="width:150px">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in intercityList"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
              </el-option>
            </el-select>
            <span style="margin-left: 10px">区域：</span>
            <el-select v-model="searchform.area_id" placeholder="请选择" style="width:150px">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span style="margin-left: 10px">省市：</span>
            <el-select v-model="searchform.province_id" placeholder="请选择" style="width:150px">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.city_name"
                :value="item.city_id">
              </el-option>
            </el-select>
            <span style="margin-left: 10px">品牌：</span>
            <el-select v-model="searchform.hq_id" placeholder="请选择" style="width:150px">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in brandList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span style="margin-left: 10px">校园：</span>
            <el-select v-model="searchform.center_id" placeholder="请选择" style="width:150px">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in schoolList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span style="margin-left: 10px">学年：</span>
            <el-select v-model="searchform.academic_year_id" placeholder="请选择" style="width:150px">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in yearList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="padding-left-30"><el-button type="primary" @click="searchList(1)">搜索</el-button></span>
      </div>
      <el-table
        :data="chargeTable"
        border
        stripe
        show-header
        style="width: 100%;margin-top: 10px;">
        <el-table-column
          label="收费政策"
          width="250">
          <template slot-scope="scope">
            <span class="cur blue" @click="viewDetail(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="center_str"
          label="适用校园">
        </el-table-column>
        <el-table-column
          prop="academic_year_str"
          label="学年"
          width="130">
        </el-table-column>
        <el-table-column
          prop="expiry_date"
          label="有效期"
          width="130">
        </el-table-column>
        <el-table-column
          prop="start_date"
          label="发布日期"
          width="130">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button type="text"  @click="copyShow(scope.row)" style="color: #ED6C2E">复制</el-button>
          </template>
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
      <!-- 复制政策 -->
      <el-dialog title="复制政策" :visible.sync="innerVisible" width="800px" class="copyPolicyShow">
        <el-form ref="policyForm" :model="copyForm" label-width="80px">
          <div class="policyClass mt10 bold">
            <p>复制的政策：{{ copyForm.title }}</p>
          </div>
          <p class="bold mt20">选择复制的学校：</p>
          <el-row class="mt10">
            <el-col :span="8">
              <el-form-item label="学年：" label-width="40">
                <el-select v-model="searchSchoolForm.academic_year_id" placeholder="--请选择--" style="width:150px">
                  <el-option
                    v-for="item in yearList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城际：" label-width="40">
                <el-select v-model="searchSchoolForm.intercity_id" placeholder="--请选择--" style="width:150px">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in intercityList"
                    :key="item.id"
                    :label="item.dept_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域：" label-width="40">
                <el-select v-model="searchSchoolForm.area_id" placeholder="--请选择--" style="width:150px">
                  <el-option value="" label="所有"></el-option>
                  <el-option
                    v-for="item in areaList"
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
              <el-form-item label="学校：" label-width="40">
                <el-table
                  :data="chargeFunTableDate"
                  border
                  stripe
                  @selection-change="handleSelectionChange"
                  max-height="300"
                  ref="multipleTable"
                  :show-header="false"
                  style="width: 92%;">
                  <el-table-column
                    type="selection"
                    width="120"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    >
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="innerVisible = false">取 消</el-button>
          <el-button type="success" @click="sureCopy">保 存</el-button>
        </span>
      </el-dialog>
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
            <span class="inline-block" style="width:9%;text-align:right">
                <el-button class="button_color font-cl-blue" @click="innerVisible = true" style="height: auto;border:1px solid #0b6289">复制</el-button>
            </span>
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
                prop="subject"
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
    </div>
</template>
<script>
export default {
    data () {
        return {
            count:1,
            options:[],
            schoolList:[],
            cityList:[],
            innerVisible:false,
            showPolicyVisible:false,
            detailForm:{},
            searchSchoolForm:{
              intercity_id:'',
              academic_year_id:'',
              area_id:'',
            },
            copyForm:{

            },
            spanArr:[],
            searchform:{
              intercity_id:'',
              area_id:'',
              province_id:'',
              hq_id:'',
              center_id:'',
              academic_year_id:'',
              page:1,
              size:10
            },
            center_ids:[],
            nameSelect:[],
            input:'',
            chargeTable:[],
            chargeFunTableDate:[]
        }
    },
    created () {
      this.getSchool();
      this.getSchool2();
      this.getcity_list();
      this.searchList(1);
    },
    props: ['brandList','intercityList','areaList','yearList'],
    methods: {
        copyShow(val){
            this.copyForm.title = val.name;
            this.copyForm.id = val.id;
            this.searchSchoolForm.academic_year_id = this.yearList[0].id;
            this.innerVisible = true;
        },
        changePage(val){
            this.searchList(val);
        },
        searchList(val){
          var _this = this;
          this.searchform.page = val;
          this.$axios.get('/api/finance/charging_policy/',{
            params:this.searchform
          })
          .then(res=>{
            _this.chargeTable = res.data.data.students.results;
            _this.count = res.data.data.students.count;
          })
        },
        viewDetail(val){
          this.copyForm.title = val.name;
          this.copyForm.id = val.id;
          this.searchSchoolForm.academic_year_id = this.yearList[0].id;
          var _this = this;
          this.$axios.get('/api/finance/charging_policy/'+val.id+'/view_detail/')
          .then(res=>{
              _this.detailForm = res.data.detail;
              _this.getSpanArr();
              _this.showPolicyVisible = true;
          })
        },
        getSchool(){
            var _this = this;
            this.$axios.get('/api/common/select/center_list/',{
                params:{
                    area_id:this.searchform.area_id,
                    hq_id:_this.searchform.hq_id,
                    intercity_id:_this.searchform.intercity_id,
                    province_id:_this.searchform.province_id,
                }
            })
            .then(res=>{
                _this.schoolList = res.data.results;
            });
        },
        getSchool2(){
            var _this = this;
            this.$axios.get('/api/common/select/center_list/',{
                params:{
                    area_id:this.searchSchoolForm.area_id,
                    intercity_id:_this.searchSchoolForm.intercity_id,
                }
            })
            .then(res=>{
                _this.chargeFunTableDate = res.data.results;
            });
        },
        getcity_list(){
            var _this = this;
            this.$axios.get('/api/common/select/city_list/',{
              params:{
                area_id:_this.searchform.area_id
              }
            }).then(res=>{
              _this.cityList = res.data.results;
            }).catch(err=>{
            console.log(err)
          })
        },
        handleSelectionChange(val){
          this.center_ids = [];
          val.forEach(item=>{
            this.center_ids.push(item.id)
          })
        },
        sureCopy(){
          var _this = this;
          this.$axios.post('/api/finance/charging_policy/'+this.copyForm.id+'/copy_to_other_centers/',{
             academic_year_id:this.searchSchoolForm.academic_year_id,
             center_ids:this.center_ids
          }).then(res=>{
            console.log(res.data)
            if(res.data.status_code === 1){
              _this.$message({
                type:'success',
                message:'复制成功！'
              });
              _this.innerVisible = false;
            }
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
      }
    },
    watch: {
      'searchform.area_id'(){
          this.getcity_list();
          this.searchform.center_id = "";
          this.searchform.province_id = "";
      },
      'searchform.intercity_id'(){
          this.getSchool();
          this.searchform.center_id = "";
      },
      'searchform.hq_id'(){
          this.getSchool();
          this.searchform.center_id = "";
      },
      'searchform.area_id'(){
          this.getcity_list();
          this.getSchool();
          this.searchform.province_id = "";
          this.searchform.center_id = "";
      },
      'searchform.province_id'(){
          this.getSchool();
          this.searchform.center_id = "";
      },
      'searchSchoolForm.intercity_id'(){
          this.getSchool2();
      },
      'searchSchoolForm.area_id'(){
          this.getSchool2();
      },
    }
}
</script>

