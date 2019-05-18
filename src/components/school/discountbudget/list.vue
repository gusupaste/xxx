<template>
  <div class='discountbudget wrap'>
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 校园 > <span class="font-cl-blue">校园折扣预算</span></p>
      <p class="mt10" style="line-height:45px">
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
        <span class="ml20">品牌：</span>
        <el-select v-model="form.hq_id" placeholder="请选择">
          <el-option value="" label="所有"></el-option>
          <el-option
            v-for="item in brandList"
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
        <span class="ml20">折扣类型：</span>
        <el-select v-model="form.discount_type" placeholder="请选择">
          <el-option label="园长折扣" :value="0"></el-option>
        </el-select>
        <el-button class="ml20" @click="getList(1)" type="primary">搜索</el-button>
     </p>
      <el-table
      class="mt26"
        :data="tableData"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="center_name"
          label="校园名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="折扣类型">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="折扣预算">
        </el-table-column>
        <el-table-column
          prop="used_amount"
          label="已使用">
        </el-table-column>
        <el-table-column
          prop="pending_amount"
          label="待批总额">
        </el-table-column>
        <el-table-column
          prop="left_amount"
          label="剩余额度">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="30">
          <template slot-scope="scope">
            <i @click="editDialog(scope.row)" class="fa fa-pencil-square-o orange font-size-20 cur"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="changePage"
        layout="pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        :page-size="10"
        :current-page="form.page"
        :total="count" class="page">
        <div class="div-page"><input class="el-input__inner input-page" type="text"/><div class="div-page-sure">确定</div></div>
      </el-pagination>
    </div>
    <!--编辑 弹框-->
    <el-dialog title="编辑折扣" :visible.sync="editDiscount" width="50%" style="padding: 30px 60px;" @close="handleClose">
      <el-form class="edit-discount" label-width="120px" :model="editForm" :rules='rules' ref="editForm">
        <el-form-item label="学年:">
          <span>{{editForm.academic_year_name}}</span>
        </el-form-item>
        <!-- <el-form-item label="校园编码:">
            <span>{{editForm.center_code}}</span>
        </el-form-item> -->
        <el-form-item label="学校名称:">
          <span>{{editForm.center_name}}</span>
        </el-form-item>
        <el-form-item label="折扣类型:">
          <el-select v-model="editForm.type" disabled placeholder="请选择">
            <el-option  :value="0" label="园长折扣"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣预算:" prop="amount" class="mt10">
          <el-input  type="text" oninput ="value=value.replace(/[^0-9.]/g,'')"  v-model="editForm.amount" class="w250_input" maxlength="10"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button class="bg-grey white bd-grey" @click="editDiscount = false">取 消</el-button>
          <el-button type="success" @click="saveInfo('editForm')">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        edit_id:'',
        intercityList: [],
        arealist: [],
        brandList: [],
        yearList: [],
        count:1,
        editForm:{

        },
        rules:{
          amount: [
            { required: true, message: '请输入折扣预算', trigger: 'blur' },
          ],
        },
        form:{
          intercity_id:'',
          area_id:'',
          hq_id:'',
          academic_year_id:'',
          discount_type:0,
          page:1,
          size:10
        },
        tableData: [],
        editDiscount: false,
        formLabelAlign: {
            year:'2018-01-01',
            code:'1001',
            schoolName:'XXXXXXXXXXXXX'
          }
      }
    },
    mounted () {
        this.getIntercity();
        this.getArea();
        this.getBrand();
        this.getYear();
    },
    methods:{
      editSchool:function () {

      },
      editDialog(val) {
        console.log(val)
        var _this = this;
        this.edit_id = val.center_id;
        this.$axios.get('/api/center/discount_budget/view_detail/',{
           params:{
              center_id:val.center_id,
              discount_type:this.form.discount_type,
              academic_year_id:this.form.academic_year_id
            }
        })
        .then(res=>{
            _this.editForm = res.data.detail;
            _this.editDiscount = true; 
        })
        
      },
      handleClose(){
        this.$refs['editForm'].resetFields();
      },
      getIntercity(){
          var _this = this;
          this.$axios.get('/api/common/intercity/',).then(res=>{
            console.log(res.data)
            _this.intercityList = res.data.intercity_list;
            // _this.form.intercity_id = res.data.intercity_list[0].id;
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
      getBrand(){
          var _this = this;
          _this.$axios.get('/api/common/select/hq_list/',)
          .then(res=>{
            _this.brandList = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                console.log(res.data)
                _this.yearList = res.data.results;
                _this.yearList.forEach(item => {
                    if(item.is_selected === 1){
                        _this.form.academic_year_id = item.id;
                    }
                });
              _this.getList(1);
            })
        },
      getList(val){
            var _this = this;
            this.form.page = val;
            this.$axios.get('/api/center/discount_budget/',{
              params:this.form
            })
            .then(res=>{
                console.log(res.data)
                _this.tableData = res.data.discount_budget_list.results;
                _this.count = res.data.discount_budget_list.count;
            })
        },
      saveInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            console.log(this.edit_id)
            this.$axios.post('/api/center/discount_budget/edit_discount_budget/',{
              type:this.editForm.type,
              center_id:this.edit_id,
              academic_year_id:this.editForm.academic_year,
              amount:this.editForm.amount,
            })
            .then(res=>{
              if(res.data.status_code === 1){
                _this.$message({
                  type:'success',
                  message:'编辑成功！'
                });
                this.editDiscount = false
              }
              _this.getList(1);
                console.log(res.data)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
            
        },
      changePage(val){
        this.getList(val);
      }
    }
  }
</script>

<style scoped>
  .discountbudget {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .discountbudget >>> .el-dialog__header{
      background-color: #f5f5f5;
      padding: 15px;
      font-size: 12px !important;
      border-bottom: 1px solid #d5d5d5;
  }
  .discountbudget  .header p{
      font-size: 14px;
  }
  .discountbudget >>> .el-dialog__title{
      font-size: 14px;
  }
  .discountbudget >>> .el-dialog{
      min-width: 600px;
  }
  .discountbudget .school-wrap{
      border: 1px solid #bbb;
  }
  .discountbudget >>> .dialog-footer{
      margin-top: 50px;
      text-align: center;
  }
  .discountbudget >>> .el-button--text {
    background: 0 0;
    padding: 10px;
    border-radius: 25px;
    width: 80px;
    background-color: #0b6289;
    color: white;
    margin: 0 5px;
  }
  /*分页样式*/
  .discountbudget .page{
    text-align: center;
    padding: 30px;
  }
  .discountbudget .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: orange;
  }
  .discountbudget .div-page{
    display: -webkit-inline-box;
    width: 70px;
    text-align: left;
    height: auto;
    margin-left: 5px;
  }
  .discountbudget .div-page .input-page{
    height: 28px;
    width: 60%;
    padding: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .discountbudget .div-page .div-page-sure{
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
  .discountbudget >>> .el-table td,.discountbudget >>> .el-table th{
    text-align: center;
  }
  .discountbudget >>> .el-dialog__footer{
    text-align: center;
  }
  .discountbudget .edit-discount .el-form-item{
    margin-bottom: 1px;
  }

</style>
