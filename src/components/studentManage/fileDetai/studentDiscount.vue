<template>
    <div class="studentDiscountStudent">
        <el-tabs v-model="activeNames" @tab-click="handleClick">
            <el-tab-pane label="收费账单" name="first">
                <div class="">
                    <el-select v-model="value">
                        <option value="入学缴费单" label="入学缴费单"></option>
                        <option value="提前入学账单" label="提前入学账单"></option>
                        <option value="调班申请账单" label="调班申请账单"></option>
                    </el-select>
                    <div class="mt26">
                        <p class="recordHead">预制账单</p>
                        <el-table
                            class="mt26"
                            :data="bill_rd_li"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="bill_no"
                            label="账单号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="student_name"
                            label="学生姓名"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="class_name"
                            label="所在班级">
                            </el-table-column>
                            <el-table-column
                            prop="bill_type"
                            label="账单类型">
                            </el-table-column>
                            <el-table-column
                            prop="actual_amount"
                            label="应缴金额">
                            </el-table-column>
                            <el-table-column
                            prop="creator"
                            label="制单人">
                            </el-table-column>
                            <el-table-column
                            prop="billing_date"
                            label="制单日期">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="mt26">
                        <p class="recordHead">已出账单</p>
                        <el-table
                            class="mt26"
                            :data="bill_ok_li"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="bill_no"
                            label="账单号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="student_name"
                            label="学生姓名"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="class_name"
                            label="所在班级">
                            </el-table-column>
                            <el-table-column
                            prop="bill_type"
                            label="账单类型">
                            </el-table-column>
                            <el-table-column
                            prop="actual_amount"
                            label="应缴金额">
                            </el-table-column>
                            <el-table-column
                            prop="pay_amount"
                            label="实收金额">
                            </el-table-column>
                            <el-table-column
                            prop="creator"
                            label="制单人">
                            </el-table-column>
                            <el-table-column
                            prop="billing_date"
                            label="制单日期">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="退费账单" name="second">
                <div class="">
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
    .studentDiscountStudent >>> .el-tabs__active-bar {
        background-color:#f17128 !important;
        height: 3px;
    }
    .studentDiscountStudent >>> .el-tabs__item {
        height: 40px;
    }
    .studentDiscountStudent >>> .el-tabs__nav {
        float: none;
        width: 50%;
        margin: 0 auto;

    }
    .studentDiscountStudent >>> .el-tabs__header {
        border-bottom: 2px solid #ccc;
    }
    .studentDiscountStudent >>> .el-tabs__nav-wrap {
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
    props:{
      activeName:{
        type:String,
          request:true,
      }
    },
    data(){
        return {
            id:this.$route.params.id,
            value:'入学缴费单',
            activeNames:'first',
            form:{
                region:'1',
                date1:'2019-09-09',
                radio:"1"
            },
            bill_ok_li:[],
            bill_rd_li:[],
            tableData: [],
        }
    },
    mounted:function(){
        this.getList()
    },
    methods:{
        handleClick(){

        },
        getList(){
            var _this = this;
            this.$axios.get('/api/finance/bill/'+this.id+'/show_student_bill/')
            .then(res=>{
                console.log(res.data)
                _this.bill_ok_li = res.data.bill_ok_li;
                _this.bill_rd_li = res.data.bill_rd_li;
            })
        }
    },
    
    watch:{
      activeName: {
        handler(newValue, oldValue) {
          if(newValue === 'fifth'){
          }
        },
        deep: true
      },
    },
}
</script>
