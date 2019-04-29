<template>
    <div>
        <p>学年历史：</p>
         <el-table
            class="mt26"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="学年"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="所在班级"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="报名日期">
            </el-table-column>
            <el-table-column
            prop="address"
            label="入学日期">
            </el-table-column>
            <el-table-column
            prop="address"
            label="截止日期">
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
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
            }],
        }
    }
}
</script>