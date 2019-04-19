<template>
  <div class="schoollist wrap">
    <div class="content">
      <p>YOU ARE HERE : 校园 >> <span class="font-cl-blue">校园列表</span></p>
      <p class="bold">伊顿旗下的校园列表，你可以选择查看某个区域或城市下的校园信息。</p>
      <p><span>城际：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">区域：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">省市：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
        <span class="right"><el-button class="font-cl-blue" type="text" @click="addSchool">新增校园</el-button></span>
      </p>
      <el-table
        :data="schoolList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="code"
          label="编号"
          min-width="30">
        </el-table-column>
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
          prop="leader"
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
      v-if="schoolList.length>0"
        background
        layout="pager, next, jumper"
        next-text="下一页"
        :page-size="pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="schoolList.length" class="page">
      </el-pagination>
    </div>
  </div>
</template>

<style>
  .schoollist p {
    margin: 10px;
  }

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

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
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
        pagesize:20,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '全部',
        schoolList: []
      };
    },
    created(){
      this.getSchoolList();
    },
    methods: {
      getSchoolList(){
        var _this = this;
        _this.$axios.get('http://192.168.51.29:8000/api/center/center/',{
          headers:{
            Authorization:"jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRhaWRpaV9lZCIsImV4cCI6MTU2MzE3ODk1NiwiZW1haWwiOiJjaGVuc2h1YWlAdGFpZGlpLmNvbSJ9.xPqGqO2JDd9eBH4bOJJF8EdovCsWS29v93RDz-S3J8o"
          },
          params:{
            username:_this.username,
            password:_this.password
        }
      }).then(res=>{
        _this.schoolList = res.data.center_list;
      }).catch(err=>{
        console.log(err)
      })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSizeChange:function(size){
          this.pagesize=size;
      },
      handleCurrentChange:function(currentPage){
          this.currentPage=currentPage;
      },
      addSchool:function () {
        this.$router.push({name: 'school-add'});
        /*this.$router.push({name: 'school/school-add',params:{ id:'1'}});*/
      },
      editSchool:function (param) {
        this.$router.push('/school/school-edit/'+param.id);
      }
    }
  }
</script>
