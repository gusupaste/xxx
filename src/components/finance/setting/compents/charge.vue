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
            <el-select v-model="searchform.city_id" placeholder="请选择" style="width:150px">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.city_name"
                :value="item.id">
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
            <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
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
            <router-link to="">{{ scope.row.name }}</router-link>
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
            <el-button type="text" size="small" @click="innerVisible = true" style="color: #ED6C2E">复制</el-button>
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
          <div class="policyClass">
            <p>复制的政策：{{ copyForm.title }}</p>
          </div>
          <el-row class="mt10">
            <el-col :span="8">
              <el-form-item label="学年：" label-width="40">
                <el-select v-model="searchSchoolForm.academic_year_id" placeholder="--请选择--" style="width:150px">
                  <el-option value="" label="所有"></el-option>
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
                  :show-header="false"
                  style="width: 92%;">
                  <el-table-column
                    prop="code" style="text-align: left">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.checked">{{ scope.row.code }}</el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="showDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="showDiscountVisible = false">保 存</el-button>
        </span>
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
            innerVisible:true,
            searchSchoolForm:{
              intercity_id:'',
              academic_year_id:'',
              area_id:'',
            },
            copyForm:{

            },
            searchform:{
              intercity_id:'',
              area_id:'',
              city_id:'',
              hq_id:'',
              center_id:'',
              academic_year_id:'',
              page:1,
              size:10
            },
            nameSelect:[],
            input:'',
            chargeTable:[],
            chargeFunTableDate:[]
        }
    },
    created () {
      this.getSchool();
      this.getcity_list();
    },
    props: ['brandList','intercityList','areaList','yearList'],
    methods: {
        addNewTemplate(){
            
        },
        changePage(val){
            this.searchform.page = val;
            this.searchList();
        },
        searchList(){
          var _this = this;
          this.$axios.get('/api/finance/charging_policy/',{
            params:this.searchform
          })
          .then(res=>{
            _this.chargeTable = res.data.data.students.results;
            _this.count = res.data.data.students.count;
          })
        },
        getSchool(){
            var _this = this;
            this.$axios.get('/api/common/select/center_list/',{
                params:{
                    hq_id:_this.searchform.hq_id,
                    intercity_id:_this.searchform.intercity_id,
                    city_id:_this.searchform.city_id,
                }
            })
            .then(res=>{
                _this.schoolList = res.data.results;
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
      }
    },
    watch: {
      'searchform.area_id'(){
          this.getcity_list();
      },
      'searchform.intercity_id'(){
          this.getSchool();
      },
      'searchform.hq_id'(){
          this.getSchool();
      },
      'searchform.area_id'(){
          this.getcity_list();
      },
      'searchform.city_id'(){
          this.getSchool();
      },
    }
}
</script>

