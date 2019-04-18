<template>
    <div class="homeView">
        <div class='big-bg'>
            <div class="logo_name">北京伊顿教育集团管理系统</div>
        </div>
        <div class="wrap clearfix" style="min-width:1200px">
            <div class="user_search_wrap left">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="学生查询" name="first">
                        <div>
                            <div style="line-height:50px">
                                <label for="" style="margin-left:0">城际：</label>
                                <el-select v-model="intercity" placeholder="-请选择-">
                                    
                                </el-select>
                                <label for="">区域：</label>
                                <el-select v-model="area" placeholder="-请选择-">
            
                                </el-select>
                                <label for="">校园：</label>
                                <el-select v-model="campus" placeholder="-请选择-">
                    
                                </el-select>
                                <label for="">搜索：</label>
                                <el-input style="width:250px" v-model="search" placeholder="请输入关键字"></el-input>
                                <button class="btn bg-blue">搜索</button>
                            </div>
                            <div>
                                <el-table
                                    :data="studentList.slice((StudentcurrentPage-1)*Studentpagesize,StudentcurrentPage*Studentpagesize)"
                                    border
                                    empty-text='暂无查询！'
                                    style="width: 100%;margin-top:20px">
                                    <el-table-column
                                    prop="avatar"
                                    label="头像"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="gender"
                                    label="性别">
                                    </el-table-column>
                                    <el-table-column
                                    prop="both"
                                    label="出生日期">
                                    </el-table-column>
                                    <el-table-column
                                    prop="class"
                                    label="所在班级">
                                    </el-table-column>
                                    <el-table-column
                                    prop="contacts"
                                    label="联系人">
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                v-if="studentList.length>0"
                                    background
                                    :page-size="2"
                                    @size-change="handleSizeChange" 
                                    @current-change="handleCurrentChange"
                                    layout="prev, pager, next"
                                    :total="studentList.length">
                                </el-pagination>
                            </div>
                        </div>
                        <div class="to_do-list">
                                <p style="font-size:14px;font-weight:600">待办事项</p>
                                <div style="margin-top:20px">
                                    <div style="line-height:50px">
                                        <label for="" style="margin-left:0">城际：</label>
                                        <el-select v-model="intercity" placeholder="-请选择-">
                        
                                        </el-select>
                                        <label for="">区域：</label>
                                        <el-select v-model="area" placeholder="-请选择-">
                    
                                        </el-select>
                                        <label for="">校园：</label>
                                        <el-select v-model="campus" placeholder="-请选择-">
                            
                                        </el-select>
                                        <label for="">类型：</label>
                                        <el-select v-model="campus" placeholder="-请选择-">
                            
                                        </el-select>
                                        <el-select v-model="campus" placeholder="-请选择-">
                            
                                        </el-select>
                                        <br>
                                        <label for="" >搜索：</label>
                                        <el-input style="width:250px;" v-model="search" placeholder="请输入关键字"></el-input>
                                        <button class="btn bg-blue">搜索</button>
                                    </div>
                                    <div>
                                        <el-table
                                            :data="thingsList.slice((ThingscurrentPage-1)*Thingspagesize,ThingscurrentPage*Thingspagesize)"
                                            border
                                            empty-text='暂无查询！'
                                            style="width: 100%;margin-top:20px">
                                            <el-table-column
                                            prop="avatar"
                                            label="流程名称"
                                            width="180">
                                            </el-table-column>
                                            <el-table-column
                                            prop="name"
                                            label="发起人"
                                            width="180">
                                            </el-table-column>
                                            <el-table-column
                                            prop="gender"
                                            label="流程创建时间">
                                            </el-table-column>
                                            <el-table-column
                                            prop="both"
                                            label="当前节点">
                                            </el-table-column>
                                            <el-table-column
                                            prop="class"
                                            label="任务分配时间">
                                            </el-table-column>
                                            <el-table-column
                                            prop="contacts"
                                            label="操作">
                                            </el-table-column>
                                        </el-table>
                                        <el-pagination
                                        v-if="thingsList.length>0"
                                            background
                                            :page-size="2"
                                            @size-change="handleSizeChangeThings" 
                                            @current-change="handleCurrentChangeThings"
                                            layout="prev, pager, next"
                                            :total="thingsList.length">
                                        </el-pagination>
                                      </div>
                                    </div>
                            </div>
                    </el-tab-pane>
                    <el-tab-pane label="家长查询" name="second">
                        <div>
                            <label for="" style="margin-left:0">城际：</label>
                            <el-select v-model="intercity" placeholder="-请选择-">
            
                            </el-select>
                            <label for="">区域：</label>
                            <el-select v-model="area" placeholder="-请选择-">
        
                            </el-select>
                            <label for="">校园：</label>
                            <el-select v-model="campus" placeholder="-请选择-">
                
                            </el-select>
                            <label for="">搜索：</label>
                            <el-input style="width:250px" v-model="search" placeholder="请输入关键字"></el-input>
                            <button class="btn bg-blue">搜索</button>
                            <div>
                                <el-table
                                    :data="ParentsList.slice((ParentscurrentPage-1)*Parentspagesize,ParentscurrentPage*Parentspagesize)"
                                    border
                                    empty-text='暂无查询！'
                                    style="width: 100%;margin-top:20px">
                                    <el-table-column
                                    prop="avatar"
                                    label="头像"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="gender"
                                    label="性别">
                                    </el-table-column>
                                    <el-table-column
                                    prop="both"
                                    label="出生日期">
                                    </el-table-column>
                                    <el-table-column
                                    prop="class"
                                    label="所在班级">
                                    </el-table-column>
                                    <el-table-column
                                    prop="contacts"
                                    label="联系人">
                                    </el-table-column>
                                </el-table>
                                <el-pagination
                                v-if="ParentsList.length>0"
                                    background
                                    :page-size="2"
                                    @size-change="handleSizeChangeParents" 
                                    @current-change="handleCurrentChangeParents"
                                    layout="prev, pager, next"
                                    :total="ParentsList.length">
                                </el-pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="school_calendar left">
                <p style="font-size:14px;font-weight:600">校日历</p>
                <div class="calendar_border">
                    <div style="padding: 20px 20px 0 20px;">
                        <img src="/static/img/login-bg.png" alt="">
                        <div class="calendarYear">{{year}}</div>
                        <div class="calendarMonth">— &nbsp;&nbsp;{{month}}&nbsp;&nbsp; —</div>
                        <calendar></calendar>
                    </div>
                    <div class="viewAll" @click="viewAll">查看全部</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    .homeView .big-bg {
        background:url('/static/img/login-bg.png') no-repeat;
        width: 100%;
        height: 150px;
        background-position:0 -374px;
        position: relative;
        line-height: 150px;
        color:#fff;
        font-size: 35px;
        letter-spacing: 5px;
    }
    .homeView .user_search_wrap {
        height: 200px;
        width: 70%;
        text-align: left;
        /* border: 1px solid red; */
    }
    .homeView .user_search_wrap label {
        /* margin-left: 20px; */
    }
    .homeView .school_calendar {
        text-align: left;
        margin-left: 5%;
        width: 300px;
        /* height: 400px; */
        /* border: 1px dashed red; */
    }
    .homeView .el-input--suffix .el-input__inner {
        width: 164px;
        height: 36px;
    }
    .homeView .el-input__inner {
        width: 250px;
        height: 36px;
    }
    .homeView .el-tabs__item.is-active {
        color:#f17128 !important;
    }
    .homeView .el-tabs__active-bar {
        background-color:#f17128 !important;
    }
    .homeView .el-tabs__item {
        font-weight: 600;
    }
    .homeView .el-tabs__nav-wrap::after {
        background-color:#fff !important;
    }
    .homeView .viewAll{
        text-align: center;
        height: 36px;
        line-height: 36px;  
        background-color: #fafafa;
        border-top: 1px solid #ccc;
        cursor: pointer;
    }
    .homeView .events-wrapper{
        display: none;
    }
    .homeView .calendar_border{
        border: 1px solid #ccc;
        -webkit-box-shadow: #ccc 0px 0px 3px; 
        -moz-box-shadow: #ccc 0px 0px 3px; 
        box-shadow: #ccc 0px 0px 3px; 
        margin-top: 20px;
        font-size: 12px !important;
    }
    .homeView .cal-wrapper{
       width: 100%;
       padding: 0;
    }
    .homeView .cal-body{
       padding: 0 30px;
    }
    .homeView .weeks .item{
       color:#54a3e2;
       font-size: 12px;
    }
    .homeView .dates .date-num{
       font-size: 12px !important;
       line-height: 30px;
    }
    .homeView .calendar_border img{
       width: 260px;
       height: 150px;
       margin: 0 auto;
    }
    .homeView .cal-header{
      display: none;
    }
    .homeView .calendarYear {
        text-align: center;
        margin-top: 20px;
        font-weight: 600;
    }
    .homeView .calendarMonth {
        font-size: 30px;
        color:#f17128;
        text-align: center;
        margin-top: 5px;
    }
    .homeView .el-table__empty-text {
        color:#E51C23;
        width: 98%;
        text-align: left;
    }
    .homeView .has-gutter th {
        background-color: #f5f5f5;
    }
    .homeView .to_do-list {
        border-top: 1px solid #ccc;
        padding-top: 20px;
        margin-top: 20px;
    }
</style>
<script>
import Calendar from '@/components/homepage/calendar'
export default {
    data() {
        return {
            activeName: 'first',
            StudentcurrentPage:1,
            Studentpagesize:2,    
            ParentscurrentPage:1,
            Parentspagesize:2, 
            ThingscurrentPage:1,   
            Thingspagesize:2,   
            intercity:'',
            area:'',
            campus:'',
            search:'',
            year:'2019',
            month:'April',
            studentList:[{
                avatar:'1',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'2',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'3',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'4',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'5',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },
            {
                avatar:'6',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            }],
            thingsList:[{
                avatar:'5',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },
            {
                avatar:'6',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            }],
            ParentsList:[{
                avatar:'1',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },
            {
                avatar:'2',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'3',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },
            {
                avatar:'4',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'5',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },
            {
                avatar:'6',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'7',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },
            {
                avatar:'8',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            },{
                avatar:'9',
                both:'2019-09-05',
                name:'随便起一个',
                gender:'男',
                class:'一(1)班',
                contacts:'102020202030'
            }],
        }
    },
    methods:{
        handleClick(tab, event) {
        // console.log(tab, event);
        },
        handleSizeChange:function(size){
            this.Studentpagesize=size;
        },
        handleCurrentChange:function(currentPage){
            this.StudentcurrentPage=currentPage;
        },
        handleSizeChangeParents:function(size){
            this.Parentspagesize=size;
        },
        handleCurrentChangeParents:function(currentPage){
            this.ParentscurrentPage=currentPage;
        },
        handleSizeChangeThings:function(size){
            this.Thingspagesize=size;
        },
        handleCurrentChangeThings:function(currentPage){
            this.ThingscurrentPage=currentPage;
        },
        viewAll:function(){
            this.tableData = []
        }
    },
    components:{
        Calendar
    }
}
</script>