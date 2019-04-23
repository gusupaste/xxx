<template>
    <div class="allergyRecord">
       <el-table
            class=""
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="过敏类型："
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="医疗建议/说明"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="处理建议">
            </el-table-column>
        </el-table>
        <div class="mt26">
            <p class="recordHead">添加过敏记录</p>
            <el-form v-model="form" class="mt26">
                <el-form-item label="过敏类型：" prop="region" label-width="150px">
                    <el-select v-model="form.region" placeholder="请选择性别">

                    </el-select>
                </el-form-item>
                <el-form-item label="症状说明：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" v-model="form.region"></el-input>
                </el-form-item>
                <el-form-item label="处理建议：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" v-model="form.region"></el-input>
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
    }
}
</script>
