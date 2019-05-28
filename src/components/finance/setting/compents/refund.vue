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
        <span class="padding-left-30"><el-button type="primary" @click="getRefund">搜索</el-button></span>
        <span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/refund-config/add/0/0/0/0')">
            <i class="icon-font fa fa-calendar-plus-o"></i>
            <span class="font-cl-blue font-size-14">新增退费政策</span>
        </span>
      </div>
      <el-table
        :data="chargeTable"
        border
        stripe
        show-header
        style="width: 100%;margin-top: 10px;">
        <el-table-column
          prop="c_name"
          label="退费政策">
        </el-table-column>
        <el-table-column
          prop="center_name"
          label="校园名称">
        </el-table-column>
        <el-table-column
          prop="year_name"
          label="学年">
        </el-table-column>
        <el-table-column
          prop="validity"
          label="有效期">
        </el-table-column>
        <!--<el-table-column
          prop="start_date"
          label="发布日期">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注">
        </el-table-column>-->
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text"  @click="configure(scope.row)" style="color: #ED6C2E">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev,pager, next, jumper"
        next-text="下一页"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        :total="total" class="page">
      </el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
          pagesize:10,
          currentPage:1,
          total:1,
            intercityList:[],
            cityList:[],
            areaList:[],
            brandList:[],
            schoolList:[],
            brandList:[],
            yearList:[],
            count:1,
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
            getRefund_url:'/api/refund_policy/policy_list/records/',
            options:[],
            nameSelect:[],
            input:'',
            chargeTable:[
              {
                name:'78'
              }
            ],
        }
    },
    props: ['brandList','intercityList','areaList','yearList'],
    mounted: function () {
      this.getcity_list();
      this.getSchool();
      /*this.searchList(1);*/
    },
    methods: {
      configure:function (obj) {
        this.$router.push('/financemanagement/refund-config/edit/'+obj.center_id+'/'+obj.year_id+'/'+obj.year_name+'/'+obj.center_name+'/');
      },handleCurrentChange:function(currentPage){
        this.currentPage=currentPage;
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
            this.getRefund();
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
      getRefund:function () {
        this.loading = true;
        var slist = [];
        if(this.searchform.center_id !== ''){
          slist.push(this.searchform.center_id);
        }else{
          for(var x in this.schoolList){
            slist.push(this.schoolList[x].id);
          }
        }
        var ylist = [];
        if(this.searchform.academic_year_id  !== ''){
          ylist.push(this.searchform.academic_year_id);
        }else{
          for(var y in this.yearList){
            ylist.push(this.yearList[y].id);
          }
        }
        var data={
          center_list:slist,
          academic_year:ylist,
          page:this.currentPage
        }
        this.$axios.post(this.getRefund_url,data).then(res => {
          this.loading = false
          this.chargeTable = res.data.record_list;
          this.total = res.data.count;
          for(var x in res.data.record_list){
            this.chargeTable[x].c_name = res.data.record_list[x].center_name + res.data.record_list[x].year_name + '退费政策';
          }
        }).catch(err => {
          console.log(err)
        })
      },
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
    currentPage(){
      this.getRefund()
    }
  }
}
</script>

