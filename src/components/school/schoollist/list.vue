<template>
  <div class="schoollist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > <span class="font-cl-blue">校园列表</span></p>
    </div>
    <div class="content">
      <p class="bold mt10">伊顿旗下的校园列表，你可以选择查看某个区域或城市下的校园信息。</p>
      <p class="mt10"><span>城际：</span>
        <el-select v-model="intercity" placeholder="请选择">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in intercitylist"
            :key="item.id"
            :label="item.dept_name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="padding-left-30">区域：</span>
        <el-select v-model="area" placeholder="请选择">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in arealist"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="padding-left-30">省市：</span>
        <el-select v-model="city" placeholder="请选择">
          <el-option value="" label="全部"></el-option>
          <el-option
            v-for="item in citylist"
            :key="item.id"
            :label="item.city_name"
            :value="item.city_id">
          </el-option>
        </el-select>
        <span class="padding-left-30"><el-button @click="getSchoolList" type="primary">搜索</el-button></span>
        <span class="right">
          <i class="fa fa-plus icon-font"></i>
          <el-button class="font-cl-blue" type="text" @click="addSchool">新增校园</el-button>
        </span>
      </p>
      <el-table
      class="mt10"
        :data="schoolList"
        border
        stripe
        show-header
        style="width: 100%">
        <!-- <el-table-column
          prop="code"
          label="编号">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="校园名称"
          width="180">
          <template slot-scope="scope">
              <router-link :to="{path:'/school/school-detail/'+scope.row.id}">{{ scope.row.name }}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="intercity_name"
          label="所属城际">
        </el-table-column>
        <el-table-column
          prop="hq_name"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="opening_date"
          label="开园日期">
        </el-table-column>
        <el-table-column
          prop="principal_name"
          label="园长">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="status_name"
          label="状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="30">
          <template slot-scope="scope">
            <el-button @click="editSchool(scope.row)" class="red" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="pager, next, jumper"
        next-text="下一页"
        :page-size="pagesize"
        @current-change="handleCurrentChange"
        :total="total" class="page">
      </el-pagination>
    </div>
  </div>
</template>

<style scoped>
  .schoollist a{
    color: #0b6289 !important;
  }

  .schoollist {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .schoollist .bold {
    font-weight: bold;
    color: black;
  }

  .schoollist .padding-30 {
    padding-left: 30px;
  }

  .schoollist .el-table th{
    background-color: #f5f5f5;
  }
  .schoollist .el-table_1_column_2  {
    font-weight: 600;
  }

  .schoollist .page{
    text-align: center;
    padding: 30px;
  }
  .schoollist .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: orange;
  }
  .schoollist .div-page{
    display: -webkit-inline-box;
    width: 70px;
    text-align: left;
    height: auto;
    margin-left: 5px;
  }
  .schoollist .div-page .input-page{
    height: 28px;
    width: 60%;
    padding: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .schoollist .div-page .div-page-sure{
    height: 26px;
    line-height: 26px;
    border: 1px solid #ccc;
    padding: 0 10px;
    margin-left: -32px;
    color: #606266;
    font-size: 12px;
    border-radius: 2px;
  }
  .schoollist .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    border: 1px solid #ccc;
    background-color: white;
  }
  .schoollist .el-pagination button, .el-pagination span:not([class*=suffix]) {
    padding: 0 10px;
  }
</style>

<script>
  export default {
    components: {
    },
    data() {
      return {
        currentPage:1,
        pagesize:10,
        intercitylist:[],
        intercity: '',
        arealist:[],
        area: '',
        citylist:[],
        city: '',
        schoolList: [],
        total:1
      };
    },
    created(){
      this.getIntercity();
      this.getArea();
      this.getcity();
      this.getSchoolList();
    },
    methods: {
      getIntercity(){
          var _this = this;
          _this.$axios.get('/api/common/select/intercity_list/',)
          .then(res=>{
            _this.intercitylist = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getArea(){
          var _this = this;
          _this.$axios.get('/api/common/select/area_list/',)
          .then(res=>{
            _this.arealist = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getcity(){
          var _this = this;
          _this.$axios.get('/api/common/select/city_list/',{
            params:{
              area_id:_this.area,       
            }
          })
          .then(res=>{
            _this.citylist = res.data.results;
            _this.city = '';
        }).catch(err=>{
          console.log(err)
        })
      },
      getSchoolList(){
        var _this = this;
        _this.$axios.get('/api/center/center/',{
          params:{
            intercity_id:_this.intercity,
            province_id:_this.city,
            area_id:_this.area,
            page:_this.currentPage,
            size:10
        }
      }).then(res=>{
        console.log(res)
        _this.schoolList = res.data.paginated_dict.results;
        _this.total = res.data.paginated_dict.count;
      }).catch(err=>{
        console.log(err)
      })
      },
      handleCurrentChange:function(currentPage){
          this.currentPage=currentPage;
          console.log(currentPage)
      },
      addSchool:function () {
        this.$router.push({name: 'school-add'});
        /*this.$router.push({name: 'school/school-add',params:{ id:'1'}});*/
      },
      editSchool:function (param) {
        this.$router.push('/school/school-edit/'+param.id);
      }
    },
    watch: {
      area(){
        this.getcity()
      },
      currentPage(){
        this.getSchoolList()
      }
    },
    computed: {
      
    }
  }
</script>
