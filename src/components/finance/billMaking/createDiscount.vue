<template>
    <div class="createDiscount wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 账单制作 > <span class="font-cl-blue" v-if="!is_edit" >创建缴费账单</span>
          <span class="font-cl-blue" v-if="is_edit" >编辑缴费账单</span></p>
      </div>
        <div class="content-top mt26"><span class="font-cl-blue" v-if="!is_edit" >创建缴费账单</span><span class="font-cl-blue" v-if="is_edit" >编辑缴费账单</span></div>
        <div class="clearfix mt10">
            <el-form inline>
                <el-form-item label="学生：">
                    <el-button v-if="!is_edit" style="border-raius:20px" @click="innerVisible=true">
                        <i class="fa fa-search"></i>添加
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <p v-for="item in multipleTable" :key="item.id">
                        <span style="width:200px;display:inline-block"><span class="ml20">学生姓名：</span><span>{{item.name}}</span></span>
                        <span style="width:200px;display:inline-block"><span class="ml20">学号：</span><span>{{item.student_no}}</span></span>
                        <span style="width:200px;display:inline-block"><span class="ml20">所在班级：</span><span>{{item.class_name}}</span></span>
                    </p>
                </el-form-item>
                <el-form-item label="制单日期：">
                    {{addform.date}}
                </el-form-item>
                <br>
                <el-form-item label="学业计划：">
                    <el-select v-model="addform.pay_method">
                        <!-- <el-option label="日缴" value="1"></el-option> -->
                        <el-option label="月缴" :value="2"></el-option>
                        <!-- <el-option label="一次性缴费" value="3"></el-option> -->
                        <el-option label="学期缴费" :value="4"></el-option>
                        <el-option label="寒暑假" :value="5"></el-option>
                        <el-option label="年缴" :value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="缴费账期：">
                    <el-select v-model="addform.academic_year_id">
                        <el-option v-for="item in yearList" :label="item.academic_year" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实际缴费日期：">
                    <el-date-picker
                        v-model="addform.start_date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="入学日期：">
                    <el-date-picker
                        v-model="addform.end_date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <br>
                <el-form-item label="收费政策：" class="w300_input">
                    <el-select v-model="saveForm.policy_id">
                        <el-option v-for="item in policyList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getSubject" type="primary">搜索费用科目</el-button>
                </el-form-item>
                <br>
                <el-form-item label="费用科目：">
                    <el-button class="orange addbtn" style="border:1px solid #f17128" @click="subjectVisible=true">
                        <i class="fa fa-plus"></i>
                        新增
                    </el-button>
                    <el-button v-for="item in checkedSubject" :key="item.id" class="bg-light-grey black" style="border:1px solid #686868;width:auto;padding:8px;height:auto;">
                        {{item.subject}}
                        <span style="cursor:pointer" @click="deleteSubject(item)">
                            <i class="fa fa-minus-circle red cur font-size-20"></i>
                        </span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <p class="title-style mt26">费用分摊明细：</p>
        <div class="tableList">
            <el-table
                class="mt10"
                :data="checkedSubject"
                border
                style="width: 100%">
                <el-table-column
                prop="subject_category"
                label="费用类型">
                </el-table-column>
                <el-table-column
                prop="subject"
                label="费用科目">
                </el-table-column>
                <el-table-column
                prop="payment_method"
                label="缴费方式">
                </el-table-column>
                <el-table-column
                prop="price_str"
                label="价格">
                </el-table-column>
                <el-table-column
                prop="address"
                width="400"
                label="缴费区间">
                <template slot-scope="scope">
                    <el-date-picker
                    style="width:145px;display:inline-block"
                        v-model="saveForm.billitem_list[scope.$index].begin_date"
                        type="date"
                        value-format="yyyy-MM-dd"
                        @change="changePayDate($event,scope.row)">
                    </el-date-picker>
                    —
                    <el-date-picker
                    style="width:145px;display:inline-block"
                        v-model="saveForm.billitem_list[scope.$index].end_date"
                        type="date"
                        disabledDate="2019-05-16"
                        value-format="yyyy-MM-dd"
                        @change="changePayDate($event,scope.row)">
                    </el-date-picker>
                </template>
                </el-table-column>

                <el-table-column
                prop="address"
                label="缴费时长">
                <template slot-scope="scope">
                    <span>{{scope.row.pay_month}}</span>月
                </template>
                </el-table-column>
                <el-table-column
                prop="price"
                label="应收">
                <template slot-scope="scope">
                    <span v-if="scope.row.pay_month">
                        {{scope.row.total}}
                    </span>
                </template>
                </el-table-column>
                <el-table-column
                prop="rate"
                label="折扣">
                <template slot-scope="scope">
                    {{scope.row.rate}}%
                </template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="折后应收">
                <template slot-scope="scope">
                    {{scope.row.price*scope.row.rate/100}}
                </template>
                </el-table-column>
                <el-table-column
                prop="address"
                label="备注说明">
                </el-table-column>
            </el-table>
        </div>
        <div class="mt26" style="text-align:right">
            合计：<span class="red bold">{{totalprice}}</span>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey" @click="$router.go(-1)">取消</button>
            <button class="btn bg-green" v-if="!is_edit" @click="saveInfo">保存</button>
            <button class="btn bg-orange" v-if="!is_edit" @click="saveInfo">缴费</button>
            <button class="btn bg-green" v-if="is_edit" @click="editInfo">保存</button>
        </div>
        <!-- 添加学生 -->
      <el-dialog title="添加学生" :visible.sync="innerVisible" width="820px" class="copyPolicyShow">
        <el-form ref="policyForm" :model="copyForm" label-width="80px" style="border:none;padding:0">
          <div class="policyClass mt10">
            <p>{{schoolName}}</p>
          </div>
          <p class="mt20">
              <span class="mr10">搜索：</span>
              <el-input v-model="searchStr" class="w250_input" style="width:250px" placeholder="输入学号、学生姓名或家长姓名"></el-input>
              <el-button type="primary" @click="getStudent(2)">搜索</el-button>
          </p>

          <el-row class="mt20">
            <el-col :span="24">
              <el-form-item label="" label-width="40">
                <el-table
                  :data="studentList"
                  border
                  stripe
                  @selection-change="handleSelectionChange"
                  max-height="300"
                  ref="multipleTable">
                  <el-table-column
                    prop="选择"
                    label="选择">
                    <template slot-scope="scope">
                        <el-radio v-model="choosePerson" :label="scope.row"> </el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="学生姓名"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="student_no"
                    label="学号"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="联系人"
                    >
                    <template slot-scope="scope">
                        {{scope.row.guardian_info.name}} <span v-if="scope.row.guardian_info.relationship">（{{scope.row.guardian_info.relationship}}，{{scope.row.guardian_info.telephone}}）</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="red">
                    <!-- *学生可多选，账单支持批量创建 -->
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="innerVisible = false">取 消</el-button>
          <el-button type="success" @click="sureAddStudent">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加费用科目 -->
      <el-dialog title="添加费用科目" :visible.sync="subjectVisible" width="820px" class="copyPolicyShow">
        <el-form ref="policyForm" :model="copyForm" label-width="80px" style="border:none;padding:0">
          <el-row class="mt20">
            <el-col :span="24">
              <el-form-item label="" label-width="40">
                <el-table
                  :data="subjectList"
                  border
                  stripe
                  @selection-change="handleSelectionChange2"
                  max-height="300"
                  ref="multipleTable2">
                  <el-table-column
                    prop="选择"
                    type="selection"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="subject_category"
                    label="费用类型"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="subject"
                    label="费用科目"
                    >
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="subjectVisible = false">取 消</el-button>
          <el-button type="success" @click="sureAddSubject">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<style scoped>
  .createDiscount .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    border-radius: 3px;
    color: #3E7193;
  }
  .createDiscount .card-type {
      line-height: 30px;
  }
  .createDiscount .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .createDiscount .tableList {
      color:#101010;
  }
  .createDiscount .el-form-item {
     margin-bottom: 10px;
  }
  .createDiscount .el-form {
     padding:20px;
     border:1px solid #CCCCCC;
  }
  .createDiscount .head-detail {
     background-color: #ccc;
     color: #101010;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
  .createDiscount >>>.addbtn:focus,.createDiscount >>>.addbtn:hover {
     background-color: #fff;
     color: #f17128;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
  .createDiscount >>> .el-radio__label{
    display: none !important;
  }
  .createDiscount >>> .w300_input .el-input__inner {
    width: 350px;
    }
</style>
<script>
export default {
    data(){
        return {
            addform:{
                pay_method:2,
                date:'',
                academic_year_id:1,
                start_date:'',
                end_date:''
            },
            choosePerson:{},
            saveForm:{
                status: 1,
                student_id: "",
                academic_year_id: "",
                class_id: "",
                planned_payment_date: "2019/5/30",
                enter_date: "",
                policy_id: "",
                amount: "",
                actual_amount: "",
                billitem_list:[],
                center_id:this.$cookies.get('userInfo').center.id
            },
            info:{},
            checkedSubject:[],
            checkedSubject1:[],
            policyList:[],
            subjectList:[],
            searchStr:'',
            studentList:[],
            yearList:[],
            innerVisible:false,
            subjectVisible:false,
            schoolName:'',
            copyForm:{},
            totalprice:0,
            totalamount:0,
            searchSchoolForm:{},
            tableData: [],
            multipleTable2:[],
            multipleTable:[],
            multipleTable1:[],
            id:'',
            reviewInfo:{},
            is_edit:false
        }
    },
    created () {
        this.getStudent(1);
        this.getYear();

    },
    methods: {
        saveInfo(){
            var _this = this;
            if(this.multipleTable.length == 0){
                this.$message({
                    type:"error",
                    message:"请选择学生"
                });
                return
            }
            if(this.addform.end_date == ''){
                this.$message({
                    type:"error",
                    message:"请选择入学日期"
                });
                return
            }
            if(this.addform.start_date == ''){
                this.$message({
                    type:"error",
                    message:"请选择实际缴费日期"
                });
                return
            }
            if(this.saveForm.billitem_list.length == 0){
                this.$message({
                    type:"error",
                    message:"请选择费用分摊明细"
                });
                return
            }
            if(this.saveForm.policy_id == ''){
                this.$message({
                    type:"error",
                    message:"请选择收费政策"
                });
                return
            }
            if(this.addform.end_date < this.addform.start_date ){
                this.$message({
                    type:"error",
                    message:"入学日期必须大于实际缴费日期"
                });
                return
            }
            this.saveForm.student_id = this.multipleTable[0].id;
            this.saveForm.class_id = this.multipleTable[0].class_id;
            this.saveForm.academic_year_id = this.addform.academic_year_id;
            this.saveForm.planned_payment_date = this.addform.start_date;
            this.saveForm.enter_date = this.addform.end_date;
            this.saveForm.actual_amount = this.totalprice;
            this.saveForm.amount = this.totalamount;
            this.saveForm.pay_method = this.addform.pay_method;
            this.$axios.post('/api/finance/bill/',this.saveForm)
            .then(res=>{
                if(res.data.status === 1){
                    _this.$message({
                        type:"success",
                        message:"保存成功！"
                    })
                    _this.$router.push('/financemanagement/dollar/'+res.data.bill_id)
                }
            })
        },
        editInfo(){
            var _this = this;
            if(this.multipleTable.length == 0){
                this.$message({
                    type:"error",
                    message:"请选择学生"
                });
                return
            }
            if(this.addform.end_date == ''){
                this.$message({
                    type:"error",
                    message:"请选择入学日期"
                });
                return
            }
            if(this.addform.start_date == ''){
                this.$message({
                    type:"error",
                    message:"请选择实际缴费日期"
                });
                return
            }
            if(this.saveForm.billitem_list.length == 0){
                this.$message({
                    type:"error",
                    message:"请选择费用分摊明细"
                });
                return
            }
            if(this.saveForm.policy_id == ''){
                this.$message({
                    type:"error",
                    message:"请选择收费政策"
                });
                return
            }
            if(this.addform.end_date < this.addform.start_date ){
                this.$message({
                    type:"error",
                    message:"入学日期必须大于实际缴费日期"
                });
                return
            }
            this.saveForm.student_id = this.multipleTable[0].id;
            this.saveForm.class_id = this.multipleTable[0].class_id;
            this.saveForm.academic_year_id = this.addform.academic_year_id;
            this.saveForm.planned_payment_date = this.addform.start_date;
            this.saveForm.enter_date = this.addform.end_date;
            this.saveForm.actual_amount = this.totalprice;
            this.saveForm.amount = this.totalamount;
            this.saveForm.pay_method = this.addform.pay_method;
            this.$axios.post('/api/finance/bill/'+this.id+'/set_bill_info/',this.saveForm)
            .then(res=>{
                if(res.data.status === 1){
                    _this.$message({
                        type:"success",
                        message:"保存成功！"
                    })
                    _this.$router.push('/financemanagement/dollar/'+res.data.bill_id);
                }
            })
        },
        getStudent(val){
            if(this.$route.query.student){
                this.choosePerson.id = Number(this.$route.query.student);
                this.sureAddStudent()
            }
            var _this = this;
            this.addform.date = this.$options.filters['formatDate'](new Date());
            this.$axios.get('/api/finance/bill/show_bill_student/',{
                params:{
                    search_str:this.searchStr,
                    center_id:this.saveForm.center_id
                }
            })
            .then(res=>{
                _this.studentList = res.data.data.student_li;
                _this.schoolName = res.data.data.center_name;
                if(val === 1){
                    if(_this.$route.query.id){
                        _this.is_edit = true;
                        _this.$nextTick(()=>{
                            _this.getDiscountInfo();
                        })
                }
                }
            })
        },
        sureAddSubject(){
            this.checkedSubject = this.checkedSubject1;
            this.saveForm.billitem_list = this.checkedSubject1;
            this.totalprice = 0;
            this.totalamount = 0;
            this.checkedSubject.forEach(item=>{
               this.totalprice += (item.price-0) * item.rate /100;
               this.totalamount += (item.price-0);
            });
            this.subjectVisible=false;
        },
        sureAddStudent(){
            var _this = this;
            this.$axios.get('/api/student/student/'+this.choosePerson.id+'/student_profile/',{
                params:{
                    academic_year_id:this.addform.academic_year_id,
                }
            }).then(res=>{
                res.data.student_profile.name = res.data.student_profile.student_name;
                res.data.student_profile.student_no = this.choosePerson.student_no;
                this.multipleTable = [res.data.student_profile];
                this.innerVisible = false;
            })

        },
        getDiscountInfo(){
            var _this = this;
            this.id = this.$route.query.id;
            this.$axios.get('/api/finance/bill/'+this.id+'/info_single_bill/')
            .then(res=>{
                _this.addform = Object.assign({},res.data.data.bill_info);
                _this.multipleTable.push(res.data.data.bill_info);
                _this.$set(_this.addform,'start_date',res.data.data.bill_info.planned_payment_date)
                _this.$set(_this.addform,'end_date',res.data.data.bill_info.enter_date)
                _this.$set(_this.saveForm,'policy_id',res.data.data.bill_info.policy_id)
                _this.$set(_this.addform,'pay_method',res.data.data.bill_info.pay_method_id)
                _this.$set(_this.addform,'date',res.data.data.bill_info.billing_date)
                _this.studentList.forEach(item=>{
                    if(item.id == _this.addform.student_id){
                        _this.choosePerson = item;
                        _this.multipleTable = [item];
                    }
                });
                // _this.getSubject();
                _this.checkedSubject = res.data.data.billitem_li;

                _this.checkedSubject1 = res.data.data.billitem_li;
                _this.saveForm.billitem_list = res.data.data.billitem_li;
                _this.sureAddSubject();
            })
        },
        getDiscount(row){
            var _this = this;
            if(this.addform.start_date == ''){
                this.$message({
                    type:"error",
                    message:"请选择实际缴费日期获取折后应收"
                });
                return
            }
            this.$axios.get('/api/discount/discount_management/get_matching_discount/',{
                params:{
                    autoal_pay_date:this.addform.start_date,
                    form_created_date:this.addform.date,
                    class_type_id:this.multipleTable[0].class_type_id,
                    student_id:this.multipleTable[0].id,
                    center_class_id:this.multipleTable[0].center_class_id,
                    center_class_year_id:this.multipleTable[0].center_class_year_id,
                    payment_method_id:this.addform.pay_method,
                    subject_id:row.subject_id,
                    policy_id:this.saveForm.policy_id,
                    policy_item_id:row.id,
                    academic_year_id:this.addform.academic_year_id,
                    month:row.pay_month,
                    price:row.price
                }
            }).then(res=>{
                var index = this.checkedSubject.indexOf(row);

                console.log(index)
                if(res.data.data.is_have_enroll_discount){
                    this.checkedSubject[index].total = this.checkedSubject[index].total - res.data.data.discount_money;
                    if(res.data.datais_have_ordinary_discount){
                        res.data.data.ordinary_discount_date.forEach(item=>{
                            if(item.discount_condition_status == 1) {
                                this.checkedSubject[index].total -= item.rate_or_price
                            }
                        })
                        res.data.data.ordinary_discount_date.forEach(item=>{
                            if(item.discount_condition_status == 0) {
                                this.checkedSubject[index].total *= item.rate_or_price
                            }
                        })
                }
                };

            })
        },
        getYear(){
            var _this = this;
            this.$axios.get('/api/finance/bill/show_academic_year/',{
                params:{
                    center_id:this.saveForm.center_id
                }
            })
            .then(res=>{
                _this.yearList = res.data.data.academic_year_li;
                _this.getInfo();
            })
        },
        getPolicy(){
            var _this = this;
            this.$axios.get('/api/finance/bill/charging_policy_list/',{
                params:{
                    center_id:this.saveForm.center_id,
                    academic_year_id:this.addform.academic_year_id,
                }
            })
            .then(res=>{
                _this.policyList = res.data.policy_list;
            })
        },
        getInfo(){
            var _this = this;
            this.$axios.get('/api/finance/bill/show_policy_item/',{
                params:{
                    academic_year_id:this.addform.academic_year_id,
                    payment_method:this.addform.pay_method,
                    center_id:this.saveForm.center_id
                }
            })
            .then(res=>{
                _this.info = res.data.data.policy_info;
                // _this.subjectList = res.data.data.policy_item_li;
                _this.getPolicy();
            })
        },
        getSubject(){
            if(this.multipleTable.length == 0){
                this.$message({
                    type:"error",
                    message:"请选择学生"
                });
                return
            }
            if(this.saveForm.policy_id == ""){
                this.$message({
                    type:"error",
                    message:"请选择收费政策"
                });
                return
            }
            if(this.addform.start_date == ''){
                this.$message({
                    type:"error",
                    message:"请选择实际缴费日期"
                });
                return
            }
            var _this = this;
            this.getPolicy();
            this.$axios.get('/api/finance/charging_policy/'+this.saveForm.policy_id+'/get_available_items_for_student/',{
                params:{
                    student_id:this.multipleTable[0].id,
                    payment_method_id:this.addform.pay_method,
                    academic_year_id:this.addform.academic_year_id,
                    payment_date:this.addform.start_date,
                    enter_date:this.addform.end_date,
                }
            })
            .then(res=>{
                res.data.available_items.forEach(item=>{
                    item.subject_id = item.subject;
                    item.subject = item.subject_name;
                    item.subject_category = item.subject_category_name;
                    item.payment_method = item.payment_method_name;
                })
                _this.subjectList = res.data.available_items;
                _this.checkedSubject = [];
            })
        },
        handleSelectionChange(val){
            this.multipleTable1 = val;
        },
        handleSelectionChange2(val){
            this.checkedSubject1 = val;
        },
        deleteSubject(val){
            var index = this.checkedSubject.indexOf(val);
            this.checkedSubject.splice(index,1);
            this.multipleTable2 = this.checkedSubject;
            this.toggleSelection([val]);
            this.sureAddSubject();
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                if(this.$refs.multipleTable2){
                    this.$refs.multipleTable2.toggleRowSelection(row,false);
                }
            });
            }
        },
        changePayDate(val,row){
            var _this = this;
            console.log(row)
            if(row.begin_date  && row.end_date ) {
                if(row.end_date<row.begin_date) {
                    this.$message({
                        type:'error',
                        message:'结束时间必须大于开始时间'
                    })
                    return
                }
                this.$axios.get('/api/finance/select/total_month_count/',{
                    params:{
                        center_id:this.saveForm.center_id,
                        class_type_id:this.multipleTable[0].class_id,
                        from_date:row.begin_date,
                        to_date:row.end_date
                    }
                }).then(res=>{
                    row.pay_month = res.data.data;
                    row.total = row.pay_month*row.price;
                    _this.getDiscount(row)
                })
            }

        }
    },
    watch: {
        // 'addform.start_date'(){
        //     if(this.multipleTable.length !== 0) {
        //         this.getDiscount()
        //     }
        // }
    }
}
</script>
