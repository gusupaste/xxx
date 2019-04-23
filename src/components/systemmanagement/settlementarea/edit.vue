<template>
    <div class="new-calendar-modal wrap" style="text-align:left">
            <div class="header">
                <p class="local_path_style">You Are Here  ：系统管理 > 结算区间定义 > <span class="font-cl-blue">编辑结算区间定义</span></p>
            </div>
            <el-form :model="form" style="margin-top:20px">
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
                   <span style="cursor:pointer" @click="dialogFormVisible= true">
                        <i class="green fa fa-plus-square" style="font-size:18px"></i> <span class="green"> 添加校园</span>
                   </span>
                    <div class="school-wrap">
                        <div>
                            <el-table
                                ref="multipleTable"
                                :data="tableData3"
                                tooltip-effect="dark"
                                style="width: 100%"
                                border=""
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                prop="name"
                                label="校园"
                              >
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="班级项目"
                                show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column

                                label="操作">
                                <template slot-scope="scope">
                                        <i @click="delete_dialogVisible=true" class="orange fa fa-trash-o" style="font-size:20px;cursor:pointer"></i>
                                </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="结算区间数：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                    <div class="school-wrap" style="margin-top:20px">
                        <div>
                            <el-table
                                ref="multipleTable"
                                :data="tableData3"
                                tooltip-effect="dark"
                                style="width: 100%"
                                border=""
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                prop="name"
                                label="结算时间">
                                <template slot-scope="scope">
                                        {{scope.row}}
                                </template>
                                </el-table-column>
                                <el-table-column
                                prop="address"
                                label="开始时间"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                        <el-date-picker
                                            v-model="value1"
                                            type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                </template>
                                </el-table-column>
                                <el-table-column

                                label="结束时间">
                                <template slot-scope="scope">
                                        <el-date-picker
                                            v-model="value1"
                                            type="date"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                   <el-checkbox>是否启用，一旦启用将无法编辑或删除</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelModal" style="background-color:#bbb;color:#fff">取 消</el-button>
                <el-button type="primary" @click="cancelModal" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
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
                    <el-button type="primary" @click="cancelModal" style="background-color:#8bc34a;color:#fff;border-color:#8bc34a">保 存</el-button>
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
    </div>
</template>
<style scoped>
    .new-calendar-modal .el-dialog__header{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: 12px !important;
        border-bottom: 1px solid #d5d5d5;
    }
    .new-calendar-modal  .header p{
        font-size: 14px;
        margin: 10px 0px;
    }
    .new-calendar-modal .el-dialog__title{
        font-size: 14px;
    }
    .new-calendar-modal .el-dialog{
        min-width: 600px;
    }
    .new-calendar-modal .school-wrap{
        border: 1px solid #bbb;
    }
    .new-calendar-modal .dialog-footer{
        margin-top: 50px;
        text-align: center;
    }
    .new-calendar-modal .calendar-datail{
        border: 1px solid #bbb;
        margin-top: 20px;
        padding: 10px;
    }
    .new-calendar-modal .school-wrap_head{
        border: 1px solid #bbb;
        border-bottom: none;
        padding: 10px;
    }
    .new-calendar-modal .el-table th,.el-table td{
        background-color: #fff;
        text-align: center;
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
    .new-calendar-modal .el-icon-close{
        color:#101010;
        font-size: 20px;
    }
    .delete-dialog .el-dialog__body {
        line-height: 50px;
        text-align: center;
    }
    .delete-dialog .addcalendar-dialog .el-dialog__body {
        text-align: left;
    }
</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    data() {
        return {
            list:[1,2,3,4,5,6,7,8,9,10,11,12],
            dialogFormVisible:false,
            delete_dialogVisible:false,
            delete_Calendar:false,
            add_Calendar:false,
            edit_Calendar:false,
            value1:"2019-09-08",
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
