<template>
  <div class='enrollmentnumber wrap'>
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > <span class="font-cl-blue">校园招生目标数</span></p>
    </div>
    <div class="header-top">
      <p class="mt10">
        <span>城际：</span>
        <el-select v-model="form.intercity_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in intercityList"
            :key="item.id"
            :label="item.dept_name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="ml20">区域：</span>
        <el-select v-model="form.area_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in arealist"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="ml20">校园：</span>
        <el-select v-model="form.center_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in schoolList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="ml20">学年：</span>
        <el-select v-model="form.academic_year_id" placeholder="请选择">
          <el-option
            v-for="item in yearList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button @click="getList" class="ml20" type="primary">搜索</el-button>
      </p>
      <el-table
        class="mt26"
        :data="info"
        border
        stripe
        show-header
        show-summary
        :summary-method="getSummaries"
        style="width: 100%">
        <!-- <el-table-column
          prop="center_code"
          label="编号"
          min-width="100">
        </el-table-column> -->
        <el-table-column
          prop="center_name"
          label="校园名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          v-for="mon in monList"
          :key="mon"
          :prop="mon"
          :label="mon">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row[mon]"></el-input>
            <span v-if="!scope.row.edit">
              <span v-if="scope.row[mon] != ''">{{scope.row[mon]}}</span>
              <span v-if="scope.row[mon] == ''" style="color:#ccc">— —</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="合计"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100">
          <template slot-scope="scope">
            <i v-if="!scope.row.edit" class="fa fa-pencil-square-o orange font-size-20 cur" @click="scope.row.edit = true"></i>
            <i v-if="scope.row.edit" class="fa fa-check-circle green font-size-20 cur" @click="handleUpdate(scope.row)"></i>&nbsp;
            <i v-if="scope.row.edit" class="fa fa-times-circle red font-size-20 cur" @click="handleCancel(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        intercityList:[],
        yearList:[],
        arealist:[],
        schoolList:[],
        monList:[],
        info:[],
        form:{
          intercity_id:'',
          academic_year_id:'',
          center_id:'',
          area_id:''
        },
        value: '-所有-',
        tableData: []
      }
    },
    created(){
      this.getIntercity();
      this.getYear();
      this.getArea();
      this.getSchool();
    },
    methods: {
      getIntercity(){
          var _this = this;
          this.$axios.get('/api/common/intercity/',).then(res=>{
            _this.intercityList = res.data.intercity_list;
            // _this.form.intercity_id = res.data.intercity_list[0].id;
          }).catch(err=>{
            console.log(err)
        })
      },
      getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                _this.yearList = res.data.results;
                _this.yearList.forEach(item => {
                    if(item.is_selected === 1){
                        _this.form.academic_year_id = item.id;
                    }
                });
              _this.getList();
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
      getSchool(){
          var _this = this;
          this.$axios.get('/api/common/select/center_list/',{
            params:{
              intercity_id:this.form.intercity_id,
              area_id:this.form.area_id,
            }
          })
          .then(res=>{
            _this.schoolList = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getList(){
        var _this = this;
        this.$axios.get('/api/center/target/student_target_detail/',{
          params:this.form
        })
        .then(res=>{
            res.data.results.forEach(item=>{    
              item.edit = false;
              if(item.total == ''){
                item.total = '— —';
              }
            });
          _this.info = res.data.results;
          _this.monList= res.data.month_list;
        })
      },
      handleEdit(row) {

      },
      handleUpdate(row){
        var month = [];
        for (var key in row) {
          var a = new Object;
          a.year = key.split("/")[0];
          a.month = key.split("/")[1];
          a.value = row[key];
          if(a.month){
            month.push(a)
          }
        }
        var _this = this;
        this.$axios.post('/api/center/target/edit_student_target/',{
          center_id:row.center_id,
          months:month,
        }).then(res=>{
          if(res.data.status_code == 1) {
              _this.$message({
                type:'success',
                message:'编辑成功！'
              })
            row.edit = false;  
            _this.getList();
            }
        })
      },
      handleCancel(row){
        // row.edit = false;
        this.getList();
      },
       getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计：';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });

        return sums;
      }
    },
    watch: {
    'form.intercity_id'(){
      this.form.center_id = "";
      this.getSchool();
    },
    'form.area_id'(){
      this.form.center_id = "";
      this.getSchool();
    },
  }
  }
</script>

<style scoped>
  .enrollmentnumber {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .enrollmentnumber .header-top {
    margin-top: 10px;
  }

  .enrollmentnumber .header-top p {
    font-size: 14px;
  }

  .enrollmentnumber >>> .el-button--text {
    background: 0 0;
    padding: 10px;
    border-radius: 25px;
    width: 80px;
    background-color: #0b6289;
    color: white;
    margin: 0 5px;
  }
  /*分页样式*/
  .enrollmentnumber .page{
    text-align: center;
    padding: 30px;
  }
  .enrollmentnumber .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: orange;
  }
  .enrollmentnumber .div-page{
    display: -webkit-inline-box;
    width: 70px;
    text-align: left;
    height: auto;
    margin-left: 5px;
  }
  .enrollmentnumber .div-page .input-page{
    height: 28px;
    width: 60%;
    padding: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .enrollmentnumber .div-page .div-page-sure{
    height: 26px;
    line-height: 26px;
    border: 1px solid #ccc;
    padding: 0 10px;
    margin-left: -32px;
    color: #606266;
    font-size: 12px;
    border-radius: 2px;
  }
  /*表格内容居中*/
  .enrollmentnumber >>> .el-table td,.enrollmentnumber >>> .el-table th{
    text-align: center;
  }
  .enrollmentnumber >>> .el-dialog__footer{
    text-align: center;
  }
  .enrollmentnumber >>> .el-table .el-input__inner{
    height: auto;
    line-height: inherit;
    width: 50px;
  }
  .enrollmentnumber >>> .el-table__footer-wrapper td{
    background-color: rgba(0,0,0,.3);
    color:#fff;
  }

</style>
