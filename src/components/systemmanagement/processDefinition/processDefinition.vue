<template>
    <div class="wrap processDefinition">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">流程定义</span></p>
        </div>
        <el-table
        class="mt26"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="流程名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="审批流程"
            >
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="" scoped>
    
</style>
<script>
export default {
    data() {
        return {
            tableData: [{
                date: '缴费单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '预备生离园账单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '预备生离园账单(制度外)',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                date: '在校生离园账单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '在校生离园账单(制度外)',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '缺勤请假转备用金账单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '推迟入园账单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '调班申请单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '中止服务账单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '开班申请单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '入学账单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '提前入学账单',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                date: '入学时间变更申请',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                },
            ]
        }
    },
}
</script>