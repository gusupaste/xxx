<template>
    <div class="wrap billMaking">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">账单制作</span></p>
        </div>
        <el-form inline class="mt26">
            <el-form-item label="学年：">
                <el-select></el-select>
            </el-form-item>
            <el-form-item label="班型：">
                <el-select></el-select>
            </el-form-item>
            <el-form-item label="班级：">
                <el-select></el-select>
            </el-form-item>
            <el-form-item label="学生信息：">
                <el-input class="w250_input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
        <p class="">
            <span class="title-style">预制账单</span>
            <el-button style="border-radius:20px" class="bg-dark-blue white ml10">
                <i class="fa fa-download " ></i>
                导入
            </el-button>
            <span class="udline font-cl-blue ml10">下载模板</span>
            <span class="ml10">
                <router-link to="/financemanagement/createDiscount">
                    <i class="fa fa-plus-square icon-font"></i>
                    <span class="font-size-14 orange">创建缴费账单</span>
                </router-link>
            </span>
            <span class="ml10">
                <router-link to="/financemanagement/costpremium/">
                    <i class="fa fa-plus-square icon-font"></i>
                    <span class="font-size-14 orange">提前入学费用补缴</span>
                </router-link>
            </span>
            <span class="ml10">
                <i class="fa fa-plus-square icon-font"></i>
                <span class="font-size-14 orange">学业变更费用补缴</span>
            </span>
        </p>
        <el-table
        class="mt26"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="账单号"
            width="180">
            <template slot-scope="scope">
                <router-link to="/financemanagement/billMakingDetail/9">111111</router-link>
            </template>
            </el-table-column>
            
            <el-table-column
            prop="name"
            label="学生姓名"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="学年"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="班级"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="账单类型"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="实际应收"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="制单人"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="制单日期"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="实际应收"
            >
            <template slot-scope="scope">
                <router-link to="/financemanagement/edit/9">
                    <span style="padding:0 20px;border-right:1px solid #e3e3e3">
                        <i class="fa fa-pencil font-size-20 orange"></i>
                    </span>
                </router-link>
                <router-link to="/financemanagement/dollar/9">
                    <span style="padding:0 20px;">
                        <i class="fa fa-dollar font-size-20 green"></i>
                    </span>
                </router-link>
                
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="mt26"
            background
            layout="prev, pager, next,jumper"
            :total="1000">
        </el-pagination>
        <!-- 收费政策详情 -->
        <el-dialog title="政策详情" :visible.sync="dialogTableVisible">
            <p class="title-style" style="color:#333030">政策标题：合肥御龙湾校园2009-2010学年收费政策</p>
            <p class="mt10">
                <el-form inline style="border-bottom:1px solid #d2d2d2">
                    <el-form-item label="适用校园：">
                        <span>北京cbd</span>
                    </el-form-item>
                    <el-form-item label="适用学年：">
                        <span>2019-2020</span>
                    </el-form-item>
                    <el-form-item label="有效期：">
                        <span>2019、09/09-2020/09/09</span>
                    </el-form-item>
                </el-form>
            </p>
            <el-table :data="gridData">
                <el-table-column property="date" label="费用项目" ></el-table-column>
                <el-table-column property="name" label="班级类型" ></el-table-column>
                <el-table-column property="address" label="缴费方式"></el-table-column>
                <el-table-column property="address" label="适用范围"></el-table-column>
                <el-table-column property="address" label="价格"></el-table-column>
                <el-table-column property="address" label="备注"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<style lang="" scoped>
    
</style>
<script>
export default {
    data() {
        return {
            dialogTableVisible:false,
            gridData: [{
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
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
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