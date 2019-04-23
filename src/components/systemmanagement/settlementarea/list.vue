<template>
<div class="settlementArea wrap">
  <div class="header">
    <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">结算区间定义</span></p>
  </div>
  <div class="settlementArea-content">
    <div class="content">
      <div class="header-select clearfix">
        <span class="left">
          <span>学年：</span>
          <el-select v-model="yearSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 30px">模版名称：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span class="right" style="cursor:pointer" @click="addNewTemplate">
            <i class="icon-font fa fa-calendar-plus-o"></i>
            <span class="font-cl-blue font-size-14" >新增结算定义模板</span>
        </span>
      </div>
      <div class="table-content">
        <el-table
          :data="templateList"
          stripe
          border
          show-header
          :span-method="objectSpanMethod"
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            prop="tname"
            label="模版名称"
            min-width="30">
          </el-table-column>
          <el-table-column
            prop="year"
            label="学年"
            width="180">
          </el-table-column>
          <el-table-column
            prop="school_name"
            label="校园">
          </el-table-column>
          <el-table-column
            prop="class_type"
            label="班级类型">
          </el-table-column>
          <el-table-column
            prop="set_area"
            label="结算区间数"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="30">
            <template slot-scope="scope">
              <router-link :to="{path:'/systemmanagement/edit-settlement-area/'+scope.row.id}">
              <el-button class="red" type="text" size="small">
                <span class="el-icon-edit-outline" style="font-size: 20px;color: #ED6C2E;"></span>
              </el-button></router-link>
            </template>
          </el-table-column>
        </el-table>
        <!--<el-pagination
          v-if="templateList.length>0"
          background
          layout="pager, next, jumper"
          next-text="下一页"
          :page-size="pagesize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="templateList.length" class="page">
        </el-pagination>-->
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data (){
      return{
        nameSelect:'',
        yearSelect:'',
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
        templateList: [
          {
            id:1,
            tname:'模版1',
            year:2019,
            school_name:'北京朝阳区xxx幼儿园',
            class_type:['双语班,','国际班'],
            set_area:12,
          },
          {
            id:2,
            tname:'模版1',
            year:2019,
            school_name:'北京朝阳区xxx幼儿园',
            class_type:['双语班,','国际班,','智慧班'],
            set_area:12,
          },
          {
            id:3,
            tname:'模版2',
            year:2019,
            school_name:'北京朝阳区xxx幼儿园',
            class_type:['双语班,','国际班,','智慧班'],
            set_area:12,
          },
          {
            id:4,
            tname:'模版2',
            year:2019,
            school_name:'北京朝阳区xxx幼儿园',
            class_type:['双语班,','国际班,','智慧班'],
            set_area:12,
          },
          {
            id:5,
            tname:'模版3',
            year:2019,
            school_name:'北京朝阳区xxx幼儿园',
            class_type:['双语班,','国际班,','智慧班'],
            set_area:12,
          }
        ],
      }
    },

    methods:{
      objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 1  || columnIndex === 4  || columnIndex === 5) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: [1,2]
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      handleSizeChange:function(size){
        this.pagesize=size;
      },
      handleCurrentChange:function(currentPage){
        this.currentPage=currentPage;
      },
      addNewTemplate(){
            this.$router.push('/systemmanagement/addsettlementarea');
        },
    }
  }
</script>

<style  scoped>
 .settlementArea .header p{
   font-size: 14px;
 }
 .settlementArea{
   color: rgba(160, 160, 160, 1);
   text-align: left;
 }
  .settlementArea .settlementArea-content{
    margin-top: 20px;
  }
  .settlementArea .el-table td, .el-table th{
    text-align: center;
  }
  .settlementArea .el-table thead th {
    background-color: #FAFAFA !important;
    padding: 15px 5px !important;
  }
  .settlementArea .el-table td, .el-table th{
     padding: 0px !important;
  }
 .settlementArea .page{
   text-align: center;
   padding: 30px;
 }
 .settlementArea .el-pagination.is-background .el-pager li:not(.disabled).active{
   background-color: orange;
 }
 .settlementArea .div-page{
   display: -webkit-inline-box;
   width: 70px;
   text-align: left;
   height: auto;
   margin-left: 5px;
 }
 .settlementArea .div-page .input-page{
   height: 28px;
   width: 60%;
   padding: 0;
   border-top-left-radius: 2px;
   border-bottom-left-radius: 2px;
   border-top-right-radius: 0;
   border-bottom-right-radius: 0;
 }
 .settlementArea .div-page .div-page-sure{
   height: 26px;
   line-height: 26px;
   border: 1px solid #ccc;
   padding: 0 10px;
   margin-left: -32px;
   color: #606266;
   font-size: 12px;
   border-radius: 2px;
 }
 .settlementArea .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
   border: 1px solid #ccc;
   background-color: white;
 }
 .settlementArea .el-pagination button, .el-pagination span:not([class*=suffix]) {
   padding: 0 10px;
 }
</style>
