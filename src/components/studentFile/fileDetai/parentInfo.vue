<template>
    <div class="parentInfo">
        <p>家长信息：</p>
        <el-table
            class="mt26"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="家长姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="关系">
            </el-table-column>
            <el-table-column
            prop="address"
            label="国籍">
            </el-table-column>
            <el-table-column
            prop="address"
            label="移动电话">
            </el-table-column>
            <el-table-column
            prop="address"
            label="家庭电话">
            </el-table-column>
            <el-table-column
            prop="address"
            label="办公室电话">
            </el-table-column>
            <el-table-column
            prop="address"
            label="电子邮件">
            </el-table-column>
            <el-table-column
            prop="address"
            label="首选联系方式">
            </el-table-column>
            <el-table-column
            prop="address"
            label="紧急联系级别">
            </el-table-column>
            <el-table-column
            prop="address"
            label="操作">
            </el-table-column>
        </el-table>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm mt26" inline="" style="text-align:left" >
            <el-form-item label="家长姓名：" prop="name" label-width="150px" >
                <el-input v-model="ruleForm.relationship" placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="关系：" prop="region" label-width="150px">
                <el-input v-model="ruleForm.nationality" placeholder="请填写昵称">

                </el-input>
            </el-form-item>
            <el-form-item label="国籍：" prop="region" label-width="150px">
                <el-select v-model="ruleForm.region" placeholder="请选择证件类型">

                </el-select>
            </el-form-item>
            <el-form-item label="工作单位：" prop="region" label-width="150px">
                <el-input v-model="ruleForm.work" placeholder="请填写证件号">

                </el-input>
            </el-form-item>
            <el-form-item label="担任职位：" prop="region" label-width="150px">
                <el-input v-model="ruleForm.position" placeholder="请填写证件号">

                </el-input>
            </el-form-item>
            <el-form-item label="电子邮件：" prop="region" label-width="150px">
                <el-input v-model="ruleForm.mailbox" placeholder="请填写证件号">

                </el-input>
            </el-form-item>
            <el-form-item label="办公电话：" prop="region" label-width="150px">
                <el-input v-model="ruleForm.tel" placeholder="请填写证件号">

                </el-input>
            </el-form-item>
            <el-form-item label="移动电话：" prop="region" label-width="150px">
                <el-input v-model="ruleForm.phone" placeholder="请填写证件号">

                </el-input>
            </el-form-item>
            <el-form-item label="家庭电话：" prop="region" label-width="150px">
                <el-input v-model="ruleForm.home_tel" placeholder="请填写证件号">

                </el-input>
            </el-form-item>
            <br>
            <el-form-item label="紧急联系人级别：" prop="region" label-width="150px">
                <el-select v-model="ruleForm.level" placeholder="请选择国籍">

                </el-select>
            </el-form-item>
            <el-form-item label="首选联系方式：" prop="region" label-width="150px">
                <el-select v-model="ruleForm.first_phone" placeholder="请选择宗教信仰">

                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="家长第一语言：" prop="region" label-width="150px">
                <el-select v-model="ruleForm.first_lang" placeholder="请选择性别">

                </el-select>
            </el-form-item>

            <el-form-item label="学生第二语言：" prop="date1" label-width="150px">
                <el-select v-model="ruleForm.second_lang" placeholder="请选择学生第一语言">

                </el-select>
            </el-form-item>
        </el-form>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey mr26">取消</button>
            <button class="btn bg-green" @click="submitForm('ruleForm')">保存</button>
        </div>
    </div>
</template>
<style scoped>
        .parentInfo th ,.parentInfo td {
            text-align: center !important;
        }
</style>
<script>
export default {
    data(){
        return {
            tableData: [],
            ruleForm: {
                name: '',
                relationship: '',
                nationality: '',
                work: '',
                position: '',
                mailbox: '',
                tel: '',
                phone: '',
                home_tel:'',
                level:'',
                first_phone:'',
                first_lang:'',
                second_lang:'',
            },
            imageUrl: '',
            rules: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        }
    },
    mounted:function(){

    },
    methods:{
        getParentList(){

        },
    }
}
</script>
