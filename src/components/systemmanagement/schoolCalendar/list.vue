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
                </span>
            </div>
            <div class="clearfix">
                <el-card class="box-card" style="height:222px;text-align:center;">
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
                        <span @click="$router.push('/schoolCalendarList/editTemplate/'+item.id)">
                            <i style="float: right; padding: 3px 0;cursor:pointer" class="fa fa-edit icon-font"></i>
                        </span>
                    </div>
                    <div style="text-align:center">
                        <el-button @click="show_copy(item.id)">
                            <i class="fa fa-copy"></i>
                            复制给校园
                        </el-button>
                    </div>
                </el-card>
            </div>
            <!-- <el-pagination
                background
                layout="prev, pager, next,jumper"
                :total="1000">
            </el-pagination> -->
        </div>
        <!-- 新增日历模板 -->
        <el-dialog
                class="delete-dialog"
                title="新增校日历模版"
                :visible.sync="add_dialogVisible"
                width="30%"
                >
                <el-form :model="addform" :rules="rules" ref="addform">
                    <el-form-item label="模板名称：" :label-width="formLabelWidth" prop="template_name">
                        <el-input v-model="addform.template_name" class="w250_input" placeholder="请输入">
                           
                        </el-input>
                    </el-form-item>
                    <el-form-item label="学年：" :label-width="formLabelWidth" prop="addyear">
                        <el-select v-model="addform.addyear" placeholder="请选择学年" value-key="id">
                            <el-option v-for="yea in yearList"  :label="yea.name" :key="yea.id"   :value="yea"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="addform.remarks"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="add_dialogVisible=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a" @click="addNewTemplate('addform')">保 存</el-button>
                </div>
        </el-dialog>
         <!-- 添加学校 -->
            <el-dialog title="选择学校" :visible.sync="dialogFormVisible">
                <el-form :model="searchSchool">
                    <div class="school-wrap_head">
                            <span>城际：</span>
                            <el-select  v-model="searchSchool.intercity_id" placeholder="请选择">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="int in intercityList" :key="int.id" :label="int.dept_name" :value="int.id"></el-option>
                            </el-select>
                            <span style="margin-left:20px">区域：</span>
                            <el-select v-model="searchSchool.area_code" placeholder="请选择">
                                <el-option label="全部" value=""></el-option>
                                <el-option v-for="area in areaList" :label="area.name" :value="area.id" :key="area.id"></el-option>
                            </el-select>
                            <el-button type="primary" @click="searchSchoolList">搜索</el-button>
                    </div>
                    <div class="school-wrap" style="">
                        <el-table
                        ref="multipleTable"
                        :data="schoolList"
                        max-height="300"
                        tooltip-effect="dark"
                        style="width: 100%"
                        border
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="50">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="校园"
                        width="200">
                        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="班级项目"
                        width="">
                        <template slot-scope="scope">
                            <el-checkbox-group v-model="checkList[scope.row.id]" @change="getClassList($event,scope.row)">
                                <el-checkbox v-for="cla in scope.row.class_types" :key="cla.id" :label="cla.id">{{cla.name}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:20px">
                    <el-button @click="dialogFormVisible=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" @click="copy_to_school" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
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
    .schoolCalendarList  >>> .el-checkbox-group{
        text-align: left;
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
        height:224px;
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
            intercityList:[],
            areaList:[],
            checkList:{},
            center_list:[],
            multipleSelection :[],
            name:'2222',
            searchSchool:{
                intercity_id:'',
                area_code:''
            },
            template_id:'',
            copy_success:false,
            dialogFormVisible:false,
            add_dialogVisible:false,
            formLabelWidth:'100px',
            yearList:[],
            schoolList:[],
            addform:{
                template_name:'',
                addyear:'',
                remarks:''
            },
            rules:{
                template_name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                addyear: [
                    { required: true, message: '请选择学年', trigger: 'change' }
                ],
            },
            year:'',
            template_list:[],
        }
    },
    created () {
        this.getYear();
        this.getSchool(); 
        this.getIntercity();
        this.getArea();
    },
    methods:{
        show_copy(id){
            this.dialogFormVisible = true;
            this.template_id = id;
        },
        getClassList($event,id){
            var length = $event.length;
            length === 0?
            this.$refs.multipleTable.toggleRowSelection(id,false):this.$refs.multipleTable.toggleRowSelection(id,true);
            this.schoolList.forEach(item=>{
               if(item == id){        
                   item.class_type_ids=$event;
               }
            })
            console.log(this.schoolList);
        },
        getIntercity(){
            var _this = this;
            this.$axios.get('/api/common/intercity/')
            .then(res=>{
                _this.intercityList = res.data.intercity_list;
            }).catch(err=>{

            })
        },
        searchSchoolList(){
            var _this = this;
            this.$axios.get('/api/school_calendar/select/center_list/',{
                params:_this.searchSchool
            }).then(res=>{
                _this.schoolList = res.data.results;
                _this.schoolList.map((v) => {
                    _this.$set(_this.checkList,v.id,[])
                })
            }).catch(err=>{

            })
        },
        copy_to_school(){
            var _this = this;
            this.$axios.post('/api/school_calendar/calendar_template/'+this.template_id+'/copy_calendar_day_to_school/',{
                center_list:this.schoolList
            }).then(res=>{
                if(res.data.status_code === 1){
                    // _this.$message({
                    //     type:'success',
                    //     message:'复制成功！'
                    // });
                    _this.dialogFormVisible = false;
                    _this.copy_success = true;
                } 
            }).catch(err=>{

            })
        },
        getArea(){
            var _this = this;
            _this.$axios.get('/api/common/select/area_list/',)
            .then(res=>{
                _this.areaList = res.data.results;
            }).catch(err=>{

            })
        },
        getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
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
        getSchool(){
            var _this = this;
            this.$axios.get('/api/school_calendar/select/center_list/',{
                    intercity_id:'',
                    area_code:''
            })
            .then(res=>{
                _this.schoolList = res.data.results;
                 _this.schoolList.map((v) => {
                    _this.$set(_this.checkList,v.id,[])
                })
            })
        },
        getTemplate(){
            var _this = this;
            this.$axios.get('/api/school_calendar/calendar_template/?academic_year_id='+this.year)
            .then(res=>{
                _this.template_list = res.data.template_list;
            })
        },
        addNewTemplate(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                var _this = this;
                this.$axios.post('/api/school_calendar/calendar_template/',{
                    academic_year:_this.addform.addyear.id,
                    name:_this.addform.template_name,
                    remarks:_this.addform.remarks
                })
                .then(res=>{
                    if(res.data.status_code === 1){
                        _this.$message({
                            type:'success',
                            message:'添加成功！'
                        })
                        _this.$router.push({path:'/schoolCalendarList/editTemplate/'+res.data.id}
                        );
                    }
                })
            } else {
                return false;
            }
            });
        },
        editSchoolCalendar(data){
            this.$router.push('/schoolCalendarList/editTemplate/'+data.id);
        },
        handleSelectionChange(val){
            // console.log(val)
            // var x = [];
            // val.forEach(item=>{
            //     this.checkList[item.id] = item.class_types;
            // })
            // console.log(this.checkList)
            this.multipleSelection = val;
        },
    },
    components:{

    },
    computed: {

    },
    watch: {
        year(){
            this.getTemplate()
        }
    }
}
</script>
