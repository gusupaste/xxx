<template>
    <div class="adddiscountApplication wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 折扣申请 > <span class="font-cl-blue">新增折扣申请</span></p>
      </div>
        <div class="content-top mt26">新增折扣申请</div>
        <div class="clearfix mt10 head-form">
            <el-form inline>
                <el-form-item label="申请学校：" label-width="120px">
                    {{ userInfo.center.name }}
                </el-form-item>
                <el-form-item label="申请日期：" label-width="120px">
                    {{ today }}
                </el-form-item>
                <br>
                <el-form-item label="学生：" label-width="120px">
                    <el-button style="border-raius:20px" @click="dialogTableVisible=true">
                        <i class="fa fa-search"></i>添加
                    </el-button>
                </el-form-item>
                <el-form-item label="学生姓名：" label-width="120px">
                    {{ selected_student_info.student_name?selected_student_info.student_name:"--" }}
                </el-form-item>
                <el-form-item label="学生状态：" label-width="120px">
                    {{ selected_student_info.student_status?selected_student_info.student_status:"--" }}
                </el-form-item>
                <el-form-item label="班级：" label-width="120px">
                    {{ selected_student_info.class_name?selected_student_info.class_name:"--" }}
                </el-form-item>
                <br>
                <el-form-item label="学业计划：" label-width="120px">
                    <el-select  v-model="selected_plan" @change="getShouldPrice">
                      <el-option v-for="plan in plans" 
                        :key="plan.id" 
                        :label="plan.name" 
                        :value="plan.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请学年：" label-width="120px">
                    <el-select v-model="selected_year" @change="yearSelected">
                      <el-option v-for="year in years" 
                        :key="year.id"
                        :label="year.name"
                        :value="year.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请学期：" label-width="120px">
                    <el-select v-model="terms[0].id">
                      <el-option v-for="term in terms" 
                        :key="term.id"
                        :label="term.name"
                        :value="term.id"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="拟入学日期：" label-width="120px">
                    <el-date-picker
                        v-model="from_date"
                        type="date"
                        format="yyyy-MM-dd"
                        @change="getShouldPrice"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="拟缴费日期：" label-width="120px">
                    <el-date-picker
                        v-model="pay_date"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <br>
                <el-form-item label="学费正价：" label-width="120px">
                    <el-select v-model="selected_policy">
                      <el-option v-for="item in charging_policy" 
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="selected_way">
                      <el-option v-for="item in charging_way" 
                        :key="item.id"
                        :label="item.subject_name"
                        :value="item.id"></el-option>
                    </el-select>
                    <el-input placeholder="￥" v-model="sholud_price" :disabled="true" style="width: auto"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="家长姓名：" label-width="120px">
                    {{ selected_student_info.guardian_name?selected_student_info.guardian_name:"--" }}
                </el-form-item>
                <el-form-item label="联系方式：" label-width="120px">
                    {{ selected_student_info.guardian_telephone?selected_student_info.guardian_telephone:"--" }}
                </el-form-item>
            </el-form>
        </div>
        <p class="mt26 font-cl-blue"></p>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic" style="border:none">
            <el-form-item
                class="mt10"
                v-for="(domain, itemindex) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + itemindex + '.value'">
                <p class="font-cl-blue">新增折扣{{itemindex+1}}：</p>
                <el-form inline style="padding:20px;">
                    <el-form-item label="选择折扣类型：" label-width="120px">
                        <el-select class="w250_input" v-model="selected_discount_type[itemindex]" @change="changeType(itemindex)">
                          <el-option v-for="type in discount_type[itemindex]" 
                            :key="type.id"
                            :label="type.name"
                            :value="type.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <br>
                    
                    <el-form-item label="申请折扣：" label-width="120px">
                        <el-input placeholder="请输入内容" v-model="discount_price[itemindex]">
                            <template v-if="condition_status[itemindex] === 0" slot="append">%</template>
                        </el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="备注：" label-width="120px" style="width:100%;" class="text-area" >
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="discount_remark[itemindex]">
                        </el-input>
                    </el-form-item>
                    <br>
                    <!-- <el-form-item label="相关附件：" label-width="120px">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary" class="orange" style="background-color:#fff;border:1px solid #f17218"> <i class="fa fa-upload"></i> 上传</el-button>
                        </el-upload>
                    </el-form-item> -->
                    <br>
                    <el-form-item label=" " label-width="120px">
                        <el-button @click.prevent="removeDomain(itemindex-1)">删除</el-button>
                    </el-form-item>
                </el-form>
            </el-form-item>
             <el-form inline style="padding:10px 20px;">
                    <el-form-item label="应缴总额：" label-width="120px">
                        --
                    </el-form-item>
                    <el-form-item label="折扣总额：" label-width="120px">
                        --
                    </el-form-item>
                    <el-form-item label="折后金额：" label-width="120px">
                        --
                    </el-form-item>
                </el-form>
            <el-form-item>
                <el-button @click="addDomain" class="bg-orange white">
                    <i class="fa fa-plus"></i>
                    新增折扣
                </el-button>
            </el-form-item>
        </el-form>
        <p class="mt26 font-cl-blue"></p>
        
        <div class="mt26 text-align-center">
            <button class="btn bg-grey">取消</button>
            <button class="btn bg-green" @click="saveDiscount">提交</button>
        </div>

        <el-dialog title="添加学生" :visible.sync="dialogTableVisible">
            <p>合肥御龙湾幼儿园</p>
            <el-form inline style="border:none" class="mt10">
                <el-form-item  label="搜索：">
                    <el-input class="w250_input" v-model="search_name" placeholder="输入学号、学生姓名或家长姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getStudent(search_name)">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData"
                height="280"
                highlight-current-row
                @current-change="handleCurrentChange">
                <el-table-column property="name" label="学生姓名" width="150"></el-table-column>
                <el-table-column property="student_no" label="学号" width="200"></el-table-column>
                <el-table-column property="guardians_str" label="联系人"></el-table-column>
            </el-table>
            <p class="mt10 ml20">
                <ul>
                    <li class="red">学生不可多选，折扣不支持批量创建</li>
                </ul>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false"  class="bg-grey white bd-grey">取 消</el-button>
                <el-button type="primary" @click="confirmStudent" class="bg-green white bd-green">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style scoped>
  .adddiscountApplication .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    border-radius: 3px;
    color: #3E7193;
  }
  .adddiscountApplication .card-type {
      line-height: 30px;
  }
  .adddiscountApplication >>> .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .adddiscountApplication .tableList {
      color:#101010;
  }
  .adddiscountApplication >>> .el-form-item {
     margin-bottom: 10px;
  }
  .adddiscountApplication >>> .head-form .el-form-item {
      /* width:20%; */
  }
  .adddiscountApplication >>> .head-form .el-form {
      padding:20px;
  }
  .adddiscountApplication >>> .el-form {
     border:1px solid #CCCCCC;
  }
  .adddiscountApplication >>> .text-area .el-form-item__content {
     width: 75%;
  }
  .adddiscountApplication >>> .el-input-group__append {
     background-color: #fff;
  }
  .adddiscountApplication .head-detail {
     background-color: #ccc;
     color: #101010;
     height: 40px;
     line-height: 40px;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
</style>
<script>
export default {
    data(){
        return {
            today: this.getNowFormatDate(),
            userInfo: this.$cookies.get('userInfo'),
            dialogTableVisible:false,
            plans:[],
            years:[],
            search_name: "",
            selected_plan: null,
            selected_year: null,
            selected_student_id: null,
            selected_student_info: {},
            // 政策费用
            charging_policy: [],
            selected_policy: null,
            charging_way: [],
            selected_way: [],
            from_date: null,
            pay_date: null,
            sholud_price: null,
            // 折扣
            discount_type: [],
            selected_discount_type: [],
            condition_status: [],
            discount_price: [],
            discount_remark: [],

            terms:[
                {
                    id: 0,
                    name:"全部学期"
                },
                {
                    id: 1,
                    name:"第一学期"
                },
                {
                    id: 2,
                    name:"第二学期"
                },
            ],

            value1:'',
            input2:'',
            fileList:[],
            tableData: [],
            dynamicValidateForm: {
                domains: [{
                    value: '',
                }],
                email: ''
            }
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            console.log(this.userInfo);
            this.loadData();
            this.getStudent("");
            this.getDiscountType(0);
            // this.getChargingPolicy();
            // this.getChargingWay();
        })
    },
    methods: {
         
        // 加载学业计划 申请学年
        loadData() {
            let _this = this;
            this.$axios.get('http://192.168.1.197:8000/api/discount/select/payment_method_list/')
            .then(res=>{
                console.log(res.data)
                _this.plans = res.data.results;
                // _this.selected_plan = res.data.results[0].id;
            })

            this.$axios.get('http://192.168.1.197:8000/api/common/select/academic_year_list/')
            .then(res=>{
                console.log(res.data)
                _this.years = res.data.results;
                for(var key in res.data.results){
                    if(res.data.results[key].is_selected){
                        _this.selected_year = res.data.results[key].id
                    }
                }
            })
        },
        // 学年切换更换日期范围
        yearSelected(){
            let _this = this;
            for(let key in _this.years){
                if (_this.years[key].id == _this.selected_year) {
                    console.log("开始日期"+_this.years[key].start_date)
                    console.log("结束日期"+_this.years[key].end_date)
                    //TODO 限制入学日期范围
                }
            }
            _this.getShouldPrice();
        },
        // 获取添加学生列表
        getStudent(name){
            //注：student_status='Prepare'预备生，student_status='Formal'在校生，不传表示所有
            let _this = this;
            console.log(name);
            this.$axios.get('http://192.168.1.197:8000/api/finance/select/students/',
            {
                params:{
                    search_name:name,
                    student_status:"", 
                }
            }).then(res=>{
                console.log(res.data)
                _this.tableData = res.data.results;
            })
        },
        // 选中学生
        handleCurrentChange(val) {
            let _this = this;
            console.log(val);
            _this.selected_student_id = val.id;
        },
        // 确认学生
        confirmStudent() {
            let _this = this;
            _this.dialogTableVisible = false
            this.$axios.get('http://192.168.1.197:8000/api/student/student/'+_this.selected_student_id+'/student_profile/',
            {
                params:{
                    academic_year_id: _this.selected_year
                }
            })
            .then(res=>{
                console.log(res.data)
                _this.selected_student_info = res.data.student_profile;
                if(_this.selected_plan){
                    _this.getShouldPrice();
                }
            })
        },
        // 计算学费正价
        getShouldPrice(){
            let _this = this;
            console.log("hhhhhhhhhhh"+_this.selected_student_id)
            if (_this.selected_student_id) {
                console.log("有学生")
                _this.getChargingPolicy()
            }else{
                console.log("没有学生")
            }
        },
        // 获取某校某学年学费政策
        getChargingPolicy() {
            let _this = this;
            this.$axios.get('http://192.168.1.197:8000/api/finance/charging_policy/policies_for_center/',
            {
                params:{
                    center_id: _this.userInfo.center.id,
                    academic_year_id: _this.selected_year
                }
            })
            .then(res=>{
                console.log(res.data)
                _this.charging_policy = res.data.policy_list;
                if (res.data.policy_list.length>0) {
                    _this.selected_policy = res.data.policy_list[0].id;
                    _this.getChargingWay();
                }
            })
        },
        // 具体收费方式
        getChargingWay() {
            let _this = this;
            this.$axios.get('http://192.168.1.197:8000/api/finance/charging_policy/'+_this.selected_policy+'/get_available_items_for_student/',
            {
                params:{
                    student_id: _this.selected_student_info.id,
                    academic_year_id: _this.selected_year,
                    payment_method_id: _this.selected_plan
                }
            })
            .then(res=>{
                console.log("********************************************")
                console.log(res.data)
                _this.charging_way = res.data.available_items;
                if(res.data.available_items.length > 0){
                    _this.selected_way = res.data.available_items[0].id;
                    _this.getPriceMonth();
                }
            })
        },
        // 计算收费月数
        getPriceMonth() {
            let _this = this;
            if (!_this.from_date) {
                return;
            }else if(!_this.selected_year){
                return;
            }else if(!_this.selected_plan){
                return;
            }

            this.$axios.get('http://192.168.1.197:8000/api/discount/discount_management/get_pay_month_count/',
            {
                params:{
                    academic_year_id: _this.selected_year,
                    center_id: _this.userInfo.center.id,
                    class_type_id: _this.selected_student_info.class_type_id,
                    date: _this.getDateStr(_this.from_date),
                    payment_method_id: _this.selected_plan,
                }
            })
            .then(res=>{
                console.log("---------------------------")
                console.log(res.data.month_count)
                for(let key in _this.charging_way){
                    if (_this.charging_way[key].id == _this.selected_way) {
                        _this.sholud_price = parseFloat(_this.charging_way[key].price)*res.data.month_count
                    }
                }
                
            })
        },








        // 获取折扣类型
        getDiscountType(index){
            let _this = this;
            console.log(_this.selected_discount_type);
            this.$axios.post('http://134.175.93.59:8000/api/discount/discount_type_management/get_available_discount_type/',
            {
                availabled_list: _this.selected_discount_type,
            })
            .then(res=>{
                console.log(res.data)
                console.log("********************************************")
                _this.discount_type.push(res.data.data);
                console.log(_this.discount_type[index]);
            })
        },
        // 折扣类型切换
        changeType(index){
            console.log(index);
            for(let key in this.discount_type[index]){
                if (this.selected_discount_type[index] == this.discount_type[index][key].id) {
                    this.condition_status[index] = this.discount_type[index][key].condition_status;
                }
            }
            console.log(this.condition_status);
            console.log(this.selected_discount_type[index]);
            this.removeDomain(index);
        },
        addDomain() {
            let _this = this;
            var length = _this.dynamicValidateForm.domains.length;
            if (length > 0) {
                if (!_this.selected_discount_type[length-1]) {
                    _this.$message({
                        type:'error',
                        message:'请先选择折扣类型！'
                    });
                    return;
                }
                _this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                })
                _this.getDiscountType(length);
            }
         },
         removeDomain(index) {
            var length = this.dynamicValidateForm.domains.length;
            console.log(length)
            console.log(index)
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index+1, (length-index-1))
                this.selected_discount_type.splice(index+1, (length-index-1))
                this.discount_type.splice(index+1, (length-index-1))
            }
        },
        // 保存折扣设置
        saveDiscount(){
            let _this = this;
            if (!(_this.sholud_price)) {
                _this.$message({
                    type:'error',
                    message:'请将内容填写完整再提交！'
                });
                return
            }
            var list = [];
            for(let index in _this.dynamicValidateForm.domains){
                for(let key in _this.discount_type[index]){
                    if (_this.discount_type[index][key].id == _this.selected_discount_type[index]) {
                        _this.discount_type[index][key]['rate_or_price'] = _this.discount_price[index];
                        _this.discount_type[index][key]['remark'] = _this.discount_remark[index];
                        list.push(_this.discount_type[index][key]);
                    }
                }
            }
            console.log(list);
            this.$axios.post('http://134.175.93.59:8000/api/discount/discount_management/',
            {
                "center_name": _this.userInfo.center.name,
                "student_id": _this.selected_student_info.id,
                "student_name": _this.selected_student_info.name,
                "student_status": _this.selected_student_info.status,
                "class_type_id": _this.selected_student_info.class_type_id,
                "center_class_id": _this.selected_student_info.center_class_id,
                "center_class_year_id": _this.selected_student_info.center_class_year_id,
                "payment_method_id": _this.selected_plan,
                "academic_year_id": _this.selected_year,
                "prepare_pay_date": _this.pay_date,
                "apply_term": 0,
                "entry_date": _this.from_date,
                "subject_id": 1111,
                "policy_id": _this.selected_policy,
                "policy_item_id": _this.selected_way,
                "price": _this.sholud_price,
                "amount": 15634.78945,
                "actual_amount": 9999.99856,
                "parents_name": _this.selected_student_info.guardian_name,
                "apply_phone": _this.selected_student_info.guardian_telephone,
                "discount_type_list": [
                    {
                        "condition_list": [],
                        "id": 28,
                        "condition_status": 0,
                        "name": "翟帅来测试",
                        "remark": "备注",
                        "rate_or_price": 51
                    },
                    {
                        "condition_list": [],
                        "id": 28,
                        "condition_status": 0,
                        "name": "翟帅来测试",
                        "remark": "备注",
                        "rate_or_price": 51
                    }
                ]
            })
            .then(res=>{
                console.log(res.data)
                console.log("********************************************")
                _this.discount_type.push(res.data.data);
                console.log(_this.discount_type[index]);
            })
        },





        // 获取当前时间
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getDateStr(date) {
            var year = "";
            var month = "";
            var day = "";
            var now = date;
            year = ""+now.getFullYear();
            if((now.getMonth()+1)<10){
                month = "0"+(now.getMonth()+1);
            }else{
                month = ""+(now.getMonth()+1);
            }
            if((now.getDate())<10){
                day = "0"+(now.getDate());
            }else{
                day = ""+(now.getDate());
            }
            return year+"-"+month+"-"+day;
        }
    }
}
</script>
