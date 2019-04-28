<template>
    <div class="wrap discountApplication">
       <div class="header">
            <p class="local_path_style">You Are Here ：财务处理 > <span class="font-cl-blue">折扣申请</span></p>
        </div>
        <div class="clearfix mt26">
            <el-form inline class=" left">
                <el-form-item label="学年：" >
                    <el-select v-model="value"></el-select>
                </el-form-item>
                <el-form-item label="班级：">
                    <el-select v-model="value"></el-select>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="value"></el-select>
                </el-form-item>
                <el-form-item label="搜索：">
                    <el-input v-model="value" class="w250_input"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary">搜索</el-button>
                </el-form-item>
            </el-form>
            <div class="right mt10 cur" @click="$router.push('/financemanagement/adddiscountApplication')">
                <i class="orange fa fa-plus font-size-20"></i>
                <span class="font-cl-blue">新增折扣申请</span>
            </div>
        </div>
        <el-table
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
            label="所在班级"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="折扣类型">
            </el-table-column>
            <el-table-column
            prop="address"
            label="申请区间">
            </el-table-column>
            <el-table-column
            prop="address"
            label="正价">
            </el-table-column>
            <el-table-column
            prop="address"
            label="折扣">
            </el-table-column>
            <el-table-column
            prop="address"
            label="优惠金额合计">
            </el-table-column>
            <el-table-column
            prop="address"
            label="申请日期">
            </el-table-column>
            <el-table-column
            prop="address"
            label="状态">
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="slote">
                <i class="fa fa-pencil-square-o orange font-size-20 cur"></i>
                <i class="fa fa-search orange font-size-20 ml10 cur" @click="$router.push('/financemanagement/discountApplicationDetail')"></i>
                <i class="fa fa-print green font-size-20 ml10 cur"></i>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            value:"",
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

