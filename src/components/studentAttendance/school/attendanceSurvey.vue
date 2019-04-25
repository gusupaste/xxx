<template>
    <div class="wrap attendanceSurveyDay">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 学生考勤 > <span class="font-cl-blue">每日考勤</span></p>
        </div>
        <el-form class="mt10" label-width="80px" :model="formLabelAlign" inline="">
            <el-form-item label="日期：">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="班级：">
                <el-select v-model="formLabelAlign.name"></el-select>
            </el-form-item>
            <el-form-item>
                <el-button v-model="formLabelAlign.name" type="primary">搜索</el-button>
            </el-form-item>

        </el-form>
        
        <div class="local-month clearfix">
            <div class="inline-block left" style="margin-top:7px">
                在校学生总数：<span class="red">20   </span>人 ； 学生出勤人数： <span class="green">16 </span> 人   ；  学生出勤人数： <span class="red">21  </span> 人
            </div>
            <div class="inline-block right">
                <button class="btn bg-grey">待核对</button>
                <button class="btn bg-orange" hidden>确认</button>
            </div>
        </div>
        <el-table
            class="mt10"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="学号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="学生姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="考勤日期">
            </el-table-column>
            <el-table-column
            prop="address"
            label="班级">
            </el-table-column>
            <el-table-column
            prop="address"
            label="到校时间">
            </el-table-column>
            <el-table-column
            prop="address"
            label="体温">
            </el-table-column>
            <el-table-column
            prop="address"
            label="离开时间">
            </el-table-column>
            <el-table-column
            prop="address"
            label="体温">
            </el-table-column>
            <el-table-column
            prop="address"
            label="接送人">
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态">
                <template slot-scope="scope">
                    <el-select>
                        <option value="1">出勤</option>
                        <option value="2">不出勤</option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style scoped>
    .attendanceSurveyDay .local-month {
        background-color:rgba(255, 152, 0, 0.14);
        padding:5px 15px;
        color:#101010;
        border: 1px solid #e3e3e3;
    }
    .attendanceSurveyDay  .calendar-datail{
        border: 1px solid #bbb;
        color: #101010;
        margin-top: 20px;
        padding: 10px;
    }
    .attendanceSurveyDay >>> .el-input__inner {
      width: 100%;
    }
    .attendanceSurveyDay >>> .el-form-item {
      margin-bottom: 10px !important;
    }

</style>
<script>
export default {
    data(){
        return {
            formLabelAlign: {
            name: '',
            region: '',
            type: ''
            },
            value1:'2019-09-09',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    components:{
        
    },
    methods:{
         onSubmit() {
            console.log('submit!');
      }
    }
}
</script>
