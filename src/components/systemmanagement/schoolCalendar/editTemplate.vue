<template>
    <div class="new-calendar-modal wrap" style="text-align:left">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 系统管理 > 校日历管理 > <span class="font-cl-blue">编辑校日历</span></p>
      </div>
            <el-form :model="info" style="margin-top:20px;border:1px solid #ccc;padding:10px 0">
                <el-form-item label="模板名称：" :label-width="formLabelWidth" style="margin-bottom:0;font-weight:600">
                    <!-- <el-input v-model="form.name" auto-complete="off"></el-input> -->
                    <span>{{renderInfo.name}}</span>
                    <i class="fa fa-edit icon-font" @click="addtmp=true" style="cursor:pointer"></i>
                </el-form-item>
                <el-form-item label="学年：" :label-width="formLabelWidth" style="margin-bottom:0">
                    {{renderInfo.academic_year_name}}
                </el-form-item>
                <el-form-item label="备注：" :label-width="formLabelWidth">
                    {{renderInfo.remarks}}
                </el-form-item>
            </el-form>
                <div class="mt26">
                    <span>定义校日历：</span>
                    <!-- <span style="color:#f17128;padding:10px;display:inline-block;cursor:pointer" @click="add_Calendar=true">
                            <i class="fa fa-plus-square-o"></i>
                            设定校日历
                    </span> -->
                    <div class="school-calendar">

                        <p style="color:#999;font-size:12px">新增的日期类型将在下方日历表中以色块的方式区分类别展示，可点击相应区块修改或删除</p>
                        <div class="calendar-list">
                            <Calendar
                                ref="Calendar"
                                v-for="(i,index) in monthList"
                                :key='index'
                                :textTop="textTop"
                                :markDateMore='i.list'
                                v-on:choseDay="clickDay"
                                v-on:isToday="clickToday"
                                v-on:changeMonth="changeMonth"
                                :sundayStart="true"
                                ></Calendar>
                        </div>
                        <div class="calendar-datail">
                            <p>校日历日期说明</p>
                            <div>
                                <span style="background-color:#f28e91" class="calendar-suqre"></span>
                                <span class="mr26">休假日</span>
                                <span style="background-color:#ff9800" class="calendar-suqre"></span>
                                <span class="mr26">职业发展日</span>
                                <span style="background-color:#8BC34A" class="calendar-suqre"></span>
                                <span class="mr26">寒暑假</span>
                            </div>
                        </div>
                    </div>
                </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$router.go(-1)" style="background-color:#bbb;color:#fff">返 回</el-button>
            </div>
            <!-- 添加学校 -->
            <el-dialog title="添加学校" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <div class="school-wrap_head">
                            <span>城际：</span>
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <span style="margin-left:20px">区域：</span>
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                    </div>
                    <div class="school-wrap" style="">
                        <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        max-height="300"
                        tooltip-effect="dark"
                        style="width: 100%"
                        border
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="">
                        </el-table-column>
                        <el-table-column
                        label="校园"
                        width="">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="班级项目"
                        width="">
                        </el-table-column>
                    </el-table>
                    </div>

                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:20px">
                    <el-button @click="dialogFormVisible=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary"  style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 删除学校 -->
            <el-dialog
                class="delete-dialog"
                title="删除校园"
                :visible.sync="delete_dialogVisible"
                width="30%"
                >
                <p>是否确定删除此条校园记录？</p>
                <p class="font-cl-blue">北京朝阳区xxx幼儿园（双语班，国际班）</p>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="delete_dialogVisible=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" @click="cancelModal" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 删除校日历 -->
            <el-dialog
                class="delete-dialog"
                title="删除校日历"
                :visible.sync="delete_Calendar"
                width="30%"
                >
                <p>是否确定删除此条校日历？</p>
                <p class="font-cl-blue">休假日：2018-07-01——2018-07-10</p>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="delete_Calendar=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" @click="cancelModal" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 添加校日历 -->
            <el-dialog
                class="addcalendar-dialog"
                title="为指定的日期范围设定校日历"
                :visible.sync="add_Calendar"
                width="60%"
                style="text-align:left"
                >
                <el-form :model="form">
                    <el-form-item label="日期从：" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="value8"
                            type="date"
                            placeholder="选择日期"
                            default-value="2010-10-01">
                        </el-date-picker>
                        <span style="padding:0 20px;">到</span>
                        <el-date-picker
                            v-model="value8"
                            type="date"
                            placeholder="选择日期"
                            default-value="2010-10-01">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="类型：" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述：" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="add_Calendar=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" @click="cancelModal" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 编辑校日历 -->
            <el-dialog
                class="addcalendar-dialog"
                title="编辑校日历"
                :visible.sync="edit_Calendar"
                width="60%"
                style="text-align:left"
                >
                <el-form :model="form">
                    <el-form-item label="日期从：" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="form.date_from"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                        <span style="padding:0 20px;">到</span>
                        <el-date-picker
                            v-model="form.date_to"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="类型：" :label-width="formLabelWidth">
                        <el-select v-model="form.day_type" placeholder="请选择">
                            <el-option label="工作日" value="N"></el-option>
                            <el-option label="职业发展日" value="P"></el-option>
                            <el-option label="休假日" value="S"></el-option>
                            <el-option label="寒暑假" value="V"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述：" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="form.remarks" maxlength="100"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="edit_Calendar=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" @click="setDayType" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 新增校日历模板 -->
            <el-dialog title="编辑校日历模版" :visible.sync="addtmp">
                <el-form :model="info" :rules="rules" ref="info">
                    <el-form-item label="模板名称：" :label-width="formLabelWidth" prop="name">
                        <el-input maxlength="50" v-model="info.name" auto-complete="off" class="w250_input" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="学年：" :label-width="formLabelWidth" prop="academic_year">
                        <el-select v-model="info.academic_year" placeholder="请选择学年">
                           <el-option v-for="yea in yearList"  :label="yea.name" :key="yea.id"   :value="yea.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="info.remarks" maxlength="100"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="addtmp=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" @click="editTemplate('info')" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<style scoped>
    .new-calendar-modal >>> .el-dialog__header{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: 12px !important;
        border-bottom: 1px solid #d5d5d5;
    }
    .new-calendar-modal  .header p{
        font-size: 12px;
    }
    .new-calendar-modal >>> .el-dialog__title{
        font-size: 12px;
    }
    .new-calendar-modal >>> .el-dialog{
        min-width: 600px;
    }
    .new-calendar-modal .school-wrap{
        border: 1px solid #bbb;
    }
    .new-calendar-modal >>> .dialog-footer{
        margin-top: 50px;
        text-align: center;
    }
    .new-calendar-modal >>> .calendar-datail{
        border: 1px solid #bbb;
        margin-top: 20px;
        padding: 10px;
    }
    .new-calendar-modal >>> .school-wrap_head{
        border: 1px solid #bbb;
        border-bottom: none;
        padding: 10px;
    }
    .new-calendar-modal >>> .el-date-editor input{
        width: 100%;
    }

    .new-calendar-modal >>> .el-table th, .new-calendar-modal >>> .el-table td{
        background-color: #fff;
        text-align: center;
    }
    .new-calendar-modal  >>> .el-checkbox__input.is-checked .el-checkbox__inner, .new-calendar-modal  >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #ED6C2E;
        background-color: #ED6C2E;
    }
    .new-calendar-modal >>> .el-table--border td, .new-calendar-modal >>> .el-table--border th, .new-calendar-modal >>> .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
        border-right: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
    }
    .new-calendar-modal >>>.el-table td, .new-calendar-modal >>> .el-table th.is-leaf {
        border-bottom: 1px solid #bbb;
    }
    .new-calendar-modal .scrollbar{
        width: 30px;
        height: 300px;
        margin: 0 auto;
    }
    .new-calendar-modal >>> .school-calendar {
        padding: 10px 10px 10px 100px;
    }

    .new-calendar-modal >>> .el-icon-close{
        color:#101010;
        font-size: 20px;
    }
    .new-calendar-modal >>> .delete-dialog .el-dialog__body {
        line-height: 50px;
        text-align: center;
    }
    .new-calendar-modal >>> .delete-dialog .addcalendar-dialog .el-dialog__body {
        text-align: left;
    }
</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    data() {
        return {
            addtmp:false,
            list:[],
            info:{},
            renderInfo:{},
            template_id:this.$route.params.id,
            yearList:[],
            monthList:[],
            rules:{
                name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                academic_year: [
                    { required: true, message: '请选择学年', trigger: 'change' }
                ],
            },
            textTop:['Su','Mo','Tu','We','Th','Fr','Sa'],
            dialogFormVisible:false,
            delete_dialogVisible:false,
            delete_Calendar:false,
            add_Calendar:false,
            edit_Calendar:false,
            value8:"2019-09-08",
            form: {
                date_from:'2019-09-08',
                date_to:'',
                remarks:'',
                day_type:'P'
            },
            tableData3: [],
            formLabelWidth: '120px'
            }
        },
    mounted () {
        this.getYear();
        this.getTemplateInfo();
        // 改写插件方法
        Calendar.methods.clickDay = function(item,index){
            if (item.otherMonth === "nowMonth" && !item.dayHide) {
                this.getList(this.myDate, item.date);
            }
        }
    },
    methods:{
        cancelModal(){

        },
        changeMonth(){
            return false;
        },
        getTemplateInfo(){
            var _this = this;
            this.$axios.get('/api/school_calendar/calendar_template/'+this.template_id+'/view_detail/')
            .then(res=>{
               _this.info = Object.assign({}, res.data.detail);;
               _this.renderInfo =  Object.assign({}, res.data.detail);
               _this.getCalendar();
            })
        },
        getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                _this.yearList = res.data.results;
            })
        },
        getCalendar(){
            var _this = this;
            _this.monthList = [];
            this.$axios.get('/api/school_calendar/calendar_template/'+this.template_id+'/show_template_calendar_days/')
            .then(res=>{
                res.data.results.forEach(item=>{
                    var son = new Object;
                    son.time = item.year+'/'+item.month;
                    son.list = item.days;
                    _this.monthList.push(son)
                });
                _this.$nextTick(()=> {
                    _this.initCalendar();
                });
            })
        },
        editTemplate(formName){
            var _this = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios.put('/api/school_calendar/calendar_template/'+this.template_id+'/',{
                    academic_year:_this.info.academic_year,
                    name:_this.info.name,
                    remarks:_this.info.remarks
                })
                .then(res=>{
                    if(res.data.status_code === 1){
                        _this.$message({
                            type:'success',
                            message:'编辑成功！'
                        })
                        _this.addtmp = false;
                        _this.getTemplateInfo();
                        // _this.getCalendar();
                    } else {
                        _this.$message({
                            type:'error',
                            message:res.data.message
                        })
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        clickDay(data) {
            var newdata = data.replace(/\//g,'-');
            var _this = this;
            this.$axios.get('/api/school_calendar/calendar_template/'+this.template_id+'/view_template_calendar_day_detail/?date='+newdata)
            .then(res=>{
                _this.form = res.data.detail;
                _this.$set(_this.form,'date_from',newdata);
                _this.$set(_this.form,'date_to',newdata);
                _this.edit_Calendar = true;
            })
        },
        setDayType(){
            var _this = this;
            this.$axios.post('/api/school_calendar/calendar_template/'+this.template_id+'/edit_template_calendar_day/',this.form)
            .then(res=>{
                if(res.data.status_code === 1){
                    _this.edit_Calendar = false;
                    _this.$message({
                        type:'success',
                        message:'添加成功！'
                    });
                    _this.getTemplateInfo();
                }
            })
        },
        clickToday(data) {

        },
        handleSelectionChange(){

        },
        initCalendar(){
            var _this = this;
            this.monthList.forEach((item,index)=>{
                this.$refs.Calendar[index].ChoseMonth(item.time,false)
            });
        }
    },
    components: {
        Calendar
  }
}
</script>
