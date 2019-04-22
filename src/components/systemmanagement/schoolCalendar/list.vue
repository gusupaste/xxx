<template>
    <div class="schoolCalendarList wrap">
        <p>YOU ARE HERE : 系统管理 >> <span  class="font-cl-blue">校日历管理</span></p>
        <div style="margin-top:20px">
            <div class="clearfix">
                <span class="left">
                    <span>学年：</span>
                    <el-select v-model="year">
                        <el-option value="2018">2018</el-option>
                    </el-select>
                    <!-- <span style="margin-left:50px">模板名称：</span>
                    <el-select v-model="template_name">
                        <el-option value="你好">你好</el-option>
                    </el-select> -->
                </span>
                <span class="right" style="cursor:pointer" @click="addNewTemplate">
                    <i class="icon-font fa fa-calendar-plus-o"></i>
                    <span class="font-cl-blue font-size-14" >新增校日历模板</span>
                </span>
            </div>
            <div class="clearfix">
                <el-card class="box-card" style="height:215px;text-align:center;">
                    <div style="cursor:pointer" @click="add_dialogVisible=true">
                        <span class="circle">
                            +
                        </span>
                        <p class="mt10 font-cl-blue">新增校日历模版</p>
                    </div>
                </el-card>
                <el-card class="box-card" v-for="(item,index) in list" :key="index">
                    <div slot="header" class="clearfix">
                        <div class="left">
                            <span class="canlendar-title">
                                校日历模版一
                            </span>
                            <br>
                            <span class="mt10">2018-2019学年</span>
                        </div>
                        <i style="float: right; padding: 3px 0;cursor:pointer" class="fa fa-edit icon-font"></i>
                    </div>
                    <div style="text-align:center">
                        <el-button>
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
        <!-- 新增日历 -->
        <el-dialog
                class="delete-dialog"
                title="新增校日历模版"
                :visible.sync="add_dialogVisible"
                width="30%"
                >
                <el-form>
                    <el-form-item label="模板名称：" :label-width="formLabelWidth">
                        <el-input v-model="name" placeholder="请选择活动区域" style="width:300px">
                          
                        </el-input>
                    </el-form-item>
                    <el-form-item label="学年：" :label-width="formLabelWidth">
                        <el-select v-model="name" placeholder="请选择活动区域">
                            <option value="1">1111</option>
                            <option value="2">2222</option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="margin-top:0">
                    <el-button @click="add_dialogVisible=false" style="background-color:#bbb;color:#fff">取 消</el-button>
                    <el-button type="primary" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<style lang="">
    .schoolCalendarList .el-dialog__header{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: 12px !important;
        border-bottom: 1px solid #d5d5d5;
    }
    .schoolCalendarList  .header p{
        font-size: 14px;
        margin: 10px 0px;
    }
    .schoolCalendarList .el-dialog__title{
        font-size: 14px;
    }
    .schoolCalendarList .el-dialog{
        min-width: 600px;
    }
    .schoolCalendarList {
        text-align: left;
    }
    .schoolCalendarList table td,th{
        text-align: center !important;
    }
    .schoolCalendarList .el-card{
        margin-right: 4%;
        margin-top: 30px;
        float: left;
        min-width: 400px;
        width: 25%;
        padding:0 1%;
    }
    .schoolCalendarList .el-card__body{
        padding: 50px
    }
    .schoolCalendarList .box-card .el-button{
       border: 1px solid #006287;
       color:#006287;
       border-radius: 20px;
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
</style>
<script>
export default {
    data(){
        return {
            name:'2222',
            add_dialogVisible:false,
            formLabelWidth:'100px',
            year:2018,
            list:[1,2,3,4,5,6,7],
            template_name:'你好',
            tableData:[{
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222',
                id:1
            },{
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222',
                id:2
            },
            {
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222',
                id:3
            },{
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222',
                id:4
            },
            {
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222',
                id:5
            }]
        }
    },
    methods:{
        addNewTemplate(){
            this.$router.push('/schoolCalendarList/addNewTemplate');
        },
        editSchoolCalendar(data){
            console.log(data)
            this.$router.push('/schoolCalendarList/editTemplate/'+data.id);
        },
        
    },
    components:{
    
    }
}
</script>