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
        <span class="right" style="cursor:pointer" @click="$router.push('/financemanagement/refund-config/add/0/0/0')">
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
        @current-change="changePage"
        :page-size="10"
        :current-page="searchform.page"
        layout="prev,pager, next, jumper"
        :total="count">
      </el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
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
    mounted: function () {
      this.getRefund()
    },
    methods: {
      configure:function (obj) {
        this.$router.push('/financemanagement/refund-config/edit/'+obj.center_id+'/'+obj.year_id+'/'+obj.center_name+'/');
      },
      getRefund:function () {
        this.loading = true
        this.$axios.get(this.getRefund_url).then(res => {
          this.loading = false
          this.chargeTable = res.data;
          console.log(res.data);
          for(var x in res.data){
            this.chargeTable[x].c_name = res.data[x].center_name + res.data[x].year_name + '退费政策';
          }
        }).catch(err => {
          console.log(err)
        })
      },
      changePage(){

      },
    }
}
</script>

