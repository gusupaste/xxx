<template>
    <div class="immunologicalRecord">
        <p>免疫记录：</p>
        <el-table
        class="mt26"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="疫苗"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="第一次接种"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第二次接种">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第三次接种">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第四次接种">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第五次接种">
            </el-table-column>
        </el-table>
        <div class="mt26">
            <p class="recordHead">添加疫苗接种记录</p>
            <el-form v-model="form" class="mt26">
                <el-form-item label="疫苗名称：" prop="region" label-width="150px">
                    <el-select v-model="form.region" placeholder="请选择性别">

                    </el-select>
                </el-form-item>
                <el-form-item label="接种次数：" prop="region" label-width="150px">
                    <el-select v-model="form.region" placeholder="请选择性别">

                    </el-select>
                </el-form-item>
                 <el-form-item label="接种时间：" prop="date1" label-width="150px" style="text-align:left">
                    <el-date-picker type="date" placeholder="选择首次缴费日期" v-model="form.date1"></el-date-picker>
                </el-form-item>
                 <el-form-item label="是否接种：" prop="date1" label-width="150px" style="text-align:left">
                     <el-radio v-model="form.radio" label="1">是</el-radio>
                     <el-radio v-model="form.radio" label="2">否</el-radio>
                </el-form-item>
            </el-form>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey mr26">取消</button>
            <button class="btn bg-green" @click="submitForm('ruleForm')">保存</button>
        </div>
    </div>
</template>
<style scoped>
    .immunologicalRecord .recordHead {
        border-bottom: 1px solid #bbb;
        color:#101010;
        font-size: 16px;
        font-weight: 600;
        padding: 10px;
    }
</style>
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
            form:{
                region:'1',
                date1:'2019-09-09',
                radio:"1"
            }
        }
    },
    methods:{

    }
}
</script>
