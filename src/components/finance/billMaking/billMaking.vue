<template>
    <div class="wrap billMaking">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">账单制作</span></p>
        </div>
        <el-form inline class="mt26">
            <el-form-item label="学年：">
                <el-select v-model="searchform.academic_year_id">
                    <el-option value="" label="所有"></el-option>
                    <el-option v-for="item in academic_year_li" :value="item.id" :key="item.id" :label="item.year"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班型：">
                <el-select v-model="searchform.class_type_id">
                    <el-option value="" label="所有"></el-option>
                    <el-option v-for="item in class_type_li" :value="item.id" :key="item.id" :label="item.class_type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="班级：">
                <el-select v-model="searchform.class_id">
                    <el-option value="" label="所有"></el-option>
                    <el-option v-for="item in class_li" :value="item.id" :key="item.id" :label="item.class_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="学生信息：">
                <el-input v-model="searchform.search_str" placeholder="输入学号、学生姓名或者学生卡号" class="w250_input"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList(1)">搜索</el-button>
            </el-form-item>
        </el-form>
        <p class="">
            <span class="title-style">预制账单</span>
            <el-button style="border-radius:20px" class="bg-dark-blue white ml10">
                <i class="fa fa-download " ></i>
                导入
            </el-button>
            <span class="udline font-cl-blue ml10">下载模板</span>
            <span class="ml10" v-if="permission['finance']['Create-payment-bills']">
                <router-link to="/financemanagement/createDiscount">
                    <i class="fa fa-plus-square icon-font"></i>
                    <span class="font-size-14 orange">创建缴费账单</span>
                </router-link>
            </span>
            <span class="ml10" v-if="permission['finance']['Advance-Fee-Payment-create']">
                <router-link to="/financemanagement/costpremium/">
                    <i class="fa fa-plus-square icon-font"></i>
                    <span class="font-size-14 orange">提前入学费用补缴</span>
                </router-link>
            </span>
            <span class="ml10" v-if="permission['finance']['Payment-of-Academic-Change-Fees-create']">
                <router-link to="/financemanagement/billMakingAcademicChange">
                    <i class="fa fa-plus-square icon-font"></i>
                    <span class="font-size-14 orange">学业变更费用补缴</span>
                </router-link>
            </span>
        </p>
        <el-table
        class="mt26"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="bill_no"
            label="账单号">
            <template slot-scope="scope">
                <router-link :to="'/financemanagement/billMakingDetail/'+scope.row.id">{{scope.row.bill_no}}</router-link>
            </template>
            </el-table-column>
            <el-table-column
            prop="student_name"
            label="学生姓名"
            >
            </el-table-column>
            <el-table-column
            prop="class_year"
            label="学年"
            >
            </el-table-column>
            <el-table-column
            prop="class"
            label="班级"
            >
            </el-table-column>
            <el-table-column
            prop="bill_type"
            label="账单类型"
            >
            </el-table-column>
            <el-table-column
            prop="actual_amount"
            label="实际应收"
            >
            </el-table-column>
            <el-table-column
            prop="creator"
            label="制单人"
            >
            </el-table-column>
            <el-table-column
            prop="billing_date"
            label="制单日期"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="实际应收"
            >
            <template slot-scope="scope">
                <router-link :to="'/financemanagement/createDiscount/?id='+scope.row.id" v-if="permission['finance']['bill-editor'] && scope.row.bill_status === 0">
                    <span style="padding:0 20px;border-right:1px solid #e3e3e3">
                        <i class="fa fa-pencil font-size-20 orange"></i>
                    </span>
                </router-link>
                <router-link :to="'/financemanagement/dollar/'+scope.row.id" v-if="permission['finance']['bill-payment'] && scope.row.bill_status === 0">
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
            :current-page="searchform.page"
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next,jumper"
            :total="count">
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
            permission : this.$cookies.get('userInfo').user_permissions,
            gridData: [],
            tableData: [],
            count:1,
            academic_year_li: [],
            class_li: [],
            class_type_li: [],
            searchform:{
                academic_year_id:'',
                class_type_id:'',
                class_id:'',
                search_str:'',
                page:1,
                size:10,
                center_id:this.$cookies.get('userInfo').center.id
            }
        }
    },
    created () {
        this.searchInfo();
        this.getList(1);
    },
    methods: {
        getList(val){
            var _this = this;
            this.searchform.page = val;
            this.$axios.get('/api/finance/bill/',{
                params:this.searchform
            })
            .then(res=>{
                console.log(res.data.data)
                this.tableData = res.data.data.bill_li;
                this.count = res.data.data.count;
            })
        },
        searchInfo(){
            var _this = this;
            this.$axios.get('/api/finance/bill/search_info/',{
                params:{
                    center_id:this.searchform.center_id
                }
            })
            .then(res=>{
                console.log(res.data.data)
                this.academic_year_li = res.data.data.academic_year_li;
                this.class_li = res.data.data.class_li;
                this.class_type_li = res.data.data.class_type_li;
            })
        },
        handleCurrentChange(val){
            this.getList(val);
        }
    }
}
</script>
