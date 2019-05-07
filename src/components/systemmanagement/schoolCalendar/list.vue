<template>
    <div class="schoolCalendarList wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 系统管理 > <span  class="font-cl-blue">校日历管理</span></p>
      </div>
        <div style="margin-top:20px">
            <div class="clearfix">
                <span class="left">
                    <span>学年：</span>
                    <el-select v-model="year">
                        <el-option v-for="yea in yearList"  :label="yea.name" :key="yea.id"  :value="yea.id"></el-option>
                    </el-select>
                    <!-- <span style="margin-left:50px">模板名称：</span>
                    <el-select v-model="template_name">
                        <el-option value="你好">你好</el-option>
                    </el-select> -->
                </span>
                <!-- <span class="right" style="cursor:pointer" @click="addNewTemplate">
                    <i class="icon-font fa fa-calendar-plus-o"></i>
                    <span class="font-cl-blue font-size-14" >新增校日历模板</span>
                </span> -->
            </div>
            <div class="clearfix">
                <el-card class="box-card" style="height:225px;text-align:center;">
                    <div style="cursor:pointer" @click="add_dialogVisible=true">
                        <span class="circle">
                            +
                        </span>
                        <p class="mt10 font-cl-blue">新增校日历模版</p>
                    </div>
                </el-card>
                <el-card class="box-card" v-for="(item,index) in template_list" :key="index">
                    <div slot="header" class="clearfix">
                        <div class="left">
                            <span class="canlendar-title">
                                {{item.name}}
                            </span>
                            <br>
                            <span class="mt10">{{item.academic_year_name}}</span>
                        </div>
                        <span @click="$router.push('/schoolCalendarList/editTemplate/9')">
                            <i style="float: right; padding: 3px 0;cursor:pointer" class="fa fa-edit icon-font"></i>
                        </span>
                    </div>
                    <div style="text-align:center">
                        <el-button @click="dialogFormVisible=true">
                            <i class="fa fa-copy"></i>
                            复制给校园
                        </el-button>
                    </div>
                </el-card>
            </div>
            <el-pagination
                background
                layout="prev, pager, next,jumper"
                :total="1000">
            </el-pagination>
        </div>
        <!-- 新增日历模板 -->
        <el-dialog
                class="delete-dialog"
                title="新增校日历模版"
                :visible.sync="add_dialogVisible"
                width="30%"
                >
                <el-form>
                    <el-form-item label="模板名称：" :label-width="formLabelWidth">
                        <el-input v-model="template_name" class="w250_input" placeholder="请输入">
                           
                        </el-input>
                    </el-form-item>
                    <el-form-item label="学年：" :label-width="formLabelWidth">
                        <el-select v-model="addyear" placeholder="请选择学年">
                            <el-option v-for="yea in yearList"  :label="yea.name" :key="yea.id"  :value="yea.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="add_dialogVisible=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a" @click="addNewTemplate">保 存</el-button>
                </div>
        </el-dialog>
         <!-- 添加学校 -->
            <el-dialog title="选择学校" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <div class="school-wrap_head">
                            <span>城际：</span>
                            <el-select  v-model="form.region" placeholder="请选择活动区域">
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
                    <el-button type="primary" @click="cancelModal" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
                </div>
            </el-dialog>
         <!-- 添加成功 -->
            <el-dialog title="选择学校" :visible.sync="copy_success">
                <span class="copy_success">
                    <p><i style="font-size:100px" class="fa fa-check-circle green"></i></p>
                    <p class="mt10">复制完成</p>
                    <p class="mt26">模版复制完成，您可去单个校园对个别班级做个性化修改</p>
                </span>
                <div slot="footer" class="dialog-footer" style="margin-top:20px">
                    <el-button @click="copy_success=false" style="background-color:#bbb;color:#fff">知道了</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<style scoped>
    .schoolCalendarList >>> .el-dialog__header{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: 12px !important;
        border-bottom: 1px solid #d5d5d5;
    }
    .schoolCalendarList  >>> .header p{
        font-size: 14px
    }
    .schoolCalendarList >>> .el-dialog__title{
        font-size: 14px;
    }
    .schoolCalendarList >>> .el-dialog{
        min-width: 600px;
    }
    /* .schoolCalendarList {
        text-align: left;
    } */
    .schoolCalendarList >>> table td,.schoolCalendarList >>> table th{
        text-align: center !important;
    }
    .schoolCalendarList >>> .school-wrap{
        border: 1px solid #bbb;
    }
    .schoolCalendarList >>> .el-card{
        margin-right: 4%;
        margin-top: 30px;
        float: left;
        min-width: 400px;
        width: 25%;
        padding:0 1%;
    }
    .schoolCalendarList >>> .el-card__body{
        padding: 50px
    }
    .schoolCalendarList >>> .box-card .el-button{
       border: 1px solid #006287;
       color:#006287;
       border-radius: 50px;
       width: 160px;
       height: 50px;
    }
    .schoolCalendarList .canlendar-title{
        font-size: 14px;
        color:#006287;
        font-weight: 600;
    }
    .schoolCalendarList .dialog-footer{
        margin-top: 50px;
        text-align: center;
    }
    .schoolCalendarList .school-wrap_head{
        border: 1px solid #bbb;
        border-bottom: none;
        padding: 10px;
    }
    .schoolCalendarList .el-table th,.el-table td{
        background-color: #fff;
        text-align: center;
    }
    .schoolCalendarList  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #ED6C2E;
        background-color: #ED6C2E;
    }
    .schoolCalendarList .circle{
        display: inline-block;
        width: 100px;
        height: 100px;
        background-color: #f2b804;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
        color:#006287;
        border: 2px solid #006287;
        font-size: 100px;
    }
    .copy_success p{
        text-align: center;
        /* color: */
    }
</style>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data(){
        return {
            name:'2222',
            copy_success:false,
            dialogFormVisible:false,
            add_dialogVisible:false,
            formLabelWidth:'100px',
            yearList:[],
            addyear:'',
            year:'',
            template_list:[],
            template_name:'',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            tableData:[],
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
        }
    },
    created () {
        this.getYear();
        console.log(this.getArea)
    },
    methods:{
        ...mapActions({
        getArea : 'getArea'  // 第一个blogAdd是定义的一个函数别名称，挂载在到this(vue)实例上，后面一个blogAdd 才是actions里面函数方法名称
        }),
        getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                console.log(res)
                _this.yearList = res.data.results;
                _this.yearList.forEach(item => {
                    if(item.is_selected === 1){
                        _this.year = item.id;
                        _this.addyear = item.id;
                    }
                });
                _this.getTemplate();
            })
        },
        getTemplate(){
            var _this = this;
            console.log(this.year)
            this.$axios.get('/api/school_calendar/calendar_template/?academic_year_id='+this.year)
            .then(res=>{
                console.log(res)
                _this.template_list = res.data.template_list;
            })
        },
        addNewTemplate(){
            var _this = this;
            console.log(this.year)
            this.$axios.post('/api/school_calendar/calendar_template/',{
                academic_year:_this.addyear,
                name:_this.template_name
            })
            .then(res=>{
                if(res.data.status_code === 1){
                    _this.$message({
                        type:'success',
                        message:'添加成功！'
                    })
                    _this.$router.push('/schoolCalendarList/addNewTemplate/'+res.data.id);
                }
            })
            // 
        },
        editSchoolCalendar(data){
            console.log(data)
            this.$router.push('/schoolCalendarList/editTemplate/'+data.id);
        },
        handleSelectionChange(){

        },
        cancelModal(){
        this.$emit('closeDialog', false);
        },

    },
    components:{

    },
    watch: {
        year(){
            this.getTemplate()
        }
    }
}
</script>
