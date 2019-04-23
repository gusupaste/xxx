<template>
    <div class="immunologicalRecord">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="疾病名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="患病日期"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="医疗建议/说明">
            </el-table-column>
            <el-table-column
            prop="address"
            label="家庭医生">
            </el-table-column>
            <el-table-column
            prop="address"
            label="联系电话">
            </el-table-column>
        </el-table>
        <div class="mt26">
            <p class="recordHead">如果孩子有下列疾病，请详细填写相关信息</p>
            <el-form v-model="form" class="mt26">
                <el-form-item label="疾病名称：" prop="region" label-width="150px">
                    <el-select v-model="form.region" placeholder="请选择性别">

                    </el-select>
                </el-form-item>
                 <el-form-item label="患病/诊断日期：" prop="date1" label-width="150px" style="text-align:left">
                    <el-date-picker type="date" placeholder="选择首次缴费日期" v-model="form.date1"></el-date-picker>
                </el-form-item>
                <el-form-item label="医疗建议/说明：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" v-model="form.region"></el-input>
                    </el-form-item>
                 <el-form-item label="家庭/主治医师：" prop="date1" label-width="150px" style="text-align:left">
                     <el-input v-model="form.region" style="width:20%"></el-input>
                </el-form-item>
                 <el-form-item label="联系电话：" prop="date1" label-width="150px" style="text-align:left">
                     <el-input v-model="form.region" style="width:20%"></el-input>
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
