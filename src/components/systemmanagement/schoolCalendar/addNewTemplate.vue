<template>
    <div class="new-calendar-modal">
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="80%" style="min-width:1200px">
            <el-form :model="form">
                <el-form-item label="模板名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="学年：" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="学校：" :label-width="formLabelWidth">
                    <div class="school-wrap">
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
                        <div>
                            <el-table
                                max-height="250"
                                ref="multipleTable"
                                :data="tableData3"
                                tooltip-effect="dark"
                                style="width: 100%"
                                border=""
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="name"
                                label="校园"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="班级项目"
                                show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-form-item>
                <div>
                    <p>开始定义校日历</p>
                    <div class="school-calendar">
                        <span style="background-color:#f17128;color:#fff;padding:10px;display:inline-block">
                            <i class="fa fa-plus-square-o"></i>
                            为指定的日期范围设定校日历
                        </span>
                        <p style="color:#999;font-size:12px">新增的日期类型将在下方日历表中以色块的方式区分类别展示，可点击相应区块修改或删除</p>
                        <div class="calendar-list">
                            <Calendar
                                v-for="(i,index) in list"
                                :key='index'
                                v-on:choseDay="clickDay"
                                v-on:changeMonth="changeDate"
                                v-on:isToday="clickToday"
                                :sundayStart="true"
                                ></Calendar>
                        </div>
                        <div>
                            <p>校日历日期说明</p>
                            
                        </div>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelModal" style="background-color:#bbb;color:#fff">取 消</el-button>
                <el-button type="primary" @click="cancelModal" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="">
    .new-calendar-modal .el-dialog__header{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: 12px !important;
        border-bottom: 1px solid #d5d5d5;
    }
    .new-calendar-modal .el-dialog__title{
        font-size: 14px;
    }
    .new-calendar-modal .school-wrap{
        border: 1px solid #bbb;
    }
    .new-calendar-modal .dialog-footer{
        text-align: center;
    }
    .new-calendar-modal .school-wrap_head{
        border-bottom: 1px solid #bbb;
        padding: 10px;
    }
    .new-calendar-modal .el-table th{
        background-color: #fff;
    }
    .new-calendar-modal  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #ED6C2E;
        background-color: #ED6C2E;
    }
    .new-calendar-modal .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
        border-right: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
    }
    .new-calendar-modal .el-table td, .el-table th.is-leaf {
        border-bottom: 1px solid #bbb;
    }
    .new-calendar-modal .scrollbar{
        width: 30px;
        height: 300px;
        margin: 0 auto;
    }
    .el-table::-webkit-scrollbar {
            width: 15px;     
            height: 1px;
        }
    .el-table::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 5px #aaa;
            background: #bbb;
        }
    .el-table::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #EDEDED;
    }
    .new-calendar-modal .school-calendar {
        padding: 10px 10px 10px 100px;
    }
    .new-calendar-modal .wh_container {
        width: 20%;
        margin-right: 10px;
        margin-top: 20px;
        display: inline-block;
        border: 1px solid #d9d9d9;
        /* padding: 5px; */
    }
    .new-calendar-modal .wh_content:nth-child(2) {
        background-color: #f7f7f7;
        border: 1px solid #d9d9d9;
    }
    .new-calendar-modal .wh_content_all[data-v-2ebcbc83] {
        background-color: #fff;
    }
    .new-calendar-modal .wh_item_date {
       color:#101010;
    }
    .new-calendar-modal .wh_content_item {
       color:#101010;
    }
    .new-calendar-modal .wh_content_all[data-v-2ebcbc83] li{
        color:#101010;
    }
</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    props:['dialogFormVisible'],
    data() {
        return {
            list:[1,2,3,4,5,6,7,8,9,10,11,12],
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
                formLabelWidth: '120px'
            }
        },
    methods:{
        cancelModal(){
        this.$emit('closeDialog', false);
      },
      clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    },
    handleSelectionChange(){
        
    },
    arr(){
        
    }
    },
    components: {
    Calendar
  }
}
</script>