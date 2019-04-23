<template>
    <div class="wrap pendingApprovalRecord">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 备用金管理 > <span class="font-cl-blue">使用记录</span></p>
      </div>
        <div class="mt26">
            <p class="title-style">
                <span class="mr26">学生姓名：张三</span>
                <span>当前所在班级：未分班</span>
            </p>
            <p class="mt26">
                <el-form ref="form" :model="form" label-width="100px" inline>
                    <el-form-item label="开始范围：">
                        <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align:center"> 至 </el-col>
                        <el-col :span="11">
                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" >搜索</el-button>
                    </el-form-item>
                </el-form>
            </p>
            <el-table
                class="mt10"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="学生姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="待批备用金费用科目"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="结转金额">
                </el-table-column>
                <el-table-column
                prop="address"
                label="结转日期">
                </el-table-column>
                <el-table-column
                prop="address"
                label="操作">
                </el-table-column>
            </el-table>
            <div class="mt26">
                <p>合计支出：<span class="red" style="font-weight:600">0 .00</span></p>
                <p>合计收入：<span class="red" style="font-weight:600">11144 .00</span></p>
            </div>
            <div class="mt26 text-align-center">
                <button class="btn bg-grey">返回</button>
                <button class="btn bg-orange">打印</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
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
    }
}
</script>
