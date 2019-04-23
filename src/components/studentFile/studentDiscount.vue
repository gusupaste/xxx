<template>
    <div class="studentDiscount">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收费账单" name="first">
                <div class="wrap">
                    <el-select v-model="value">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </el-select>
                    <div class="mt26">
                        <p class="recordHead">预制账单</p>
                        <el-table
                            class="mt26"
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="账单号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="学生姓名"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="所在班级">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="账单类型">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="应缴金额">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="制单人">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="制单日期">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="mt26">
                        <p class="recordHead">已出账单</p>
                        <el-table
                            class="mt26"
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="账单号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="学生姓名"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="所在班级">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="账单类型">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="应缴金额">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="实收金额">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="制单人">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="制单日期">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="退费账单" name="second">
                <div class="wrap">
                    <el-select v-model="value">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </el-select>
                    <div class="mt26">
                        <p class="recordHead">预制账单</p>
                        <el-table
                            class="mt26"
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="date"
                            label="单号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="日期"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="账单类型">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="学号">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="姓名">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="所在班级">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="实退金额">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="审核状态">
                            </el-table-column>
                            <el-table-column
                            prop="address"
                            label="审核节点">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style scoped>
    .studentDiscount >>> .el-tabs__active-bar {
        background-color:#f17128 !important; 
        height: 3px;
    }
    .studentDiscount >>> .el-tabs__item {
        height: 40px;
    }
    .studentDiscount >>> .el-tabs__header {
        border-bottom: 2px solid #ccc;
    }
    .studentDiscount >>> .el-tabs__nav-wrap {
        width: 50%;
        margin: 0 auto;
    }
    .studentDiscount >>> .el-tab-pane {
        border: none;
    }
    .studentDiscount >>> .el-tabs__nav {
        /* width: 100%;
        text-align: center; */
    }
</style>
<script>
export default {
    data(){
        return {
            value:'2',
            activeName:'first',
            form:{
                region:'1',
                date1:'2019-09-09',
                radio:"1"
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
            }],
        }
    },
    methods:{
        handleClick(){

        }
    }
}
</script>
