<template>
    <div class="basicInfo  clearfix">
        <div class="clearfix">
            <div  class="text-align-center left">
                <div class="" style="width:30%">

                </div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" inline="" style="text-align:left">
                    <el-form-item label="头像：" prop="name" label-width="150px" >
                        <el-upload
                            class="avatar-uploader"
                            style="vertical-align:middle"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <br>
                    <el-form-item label="姓名：" prop="name" label-width="150px" >
                        <el-input v-model="ruleForm.name" placeholder="请填写姓名" class="w250_input"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称：" prop="region" label-width="150px">
                        <el-input v-model="ruleForm.region" placeholder="请填写昵称" class="w250_input">

                        </el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="入园日期：" prop="date1" label-width="150px" style="text-align:left">
                            <el-date-picker type="date" placeholder="选择首次缴费日期" class="w250_input" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="首次缴费日期：" prop="date1" label-width="150px" style="text-align:left">
                            <el-date-picker type="date" placeholder="选择首次缴费日期" class="w250_input" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <br>
                    <el-form-item label="证件类型：" prop="region" label-width="150px">
                        <el-select v-model="ruleForm.region" placeholder="请选择证件类型" class="w250_input">

                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号：" prop="region" label-width="150px">
                        <el-input v-model="ruleForm.region" placeholder="请填写证件号" class="w250_input">

                        </el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="属性：" prop="type"  label-width="150px">
                        <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="转园生" name="type"></el-checkbox>
                        <el-checkbox label="业主" name="type"></el-checkbox>
                        <el-checkbox label="享受兄弟姐妹折扣" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <br>
                    <el-form-item label="国籍：" prop="region" label-width="150px" class="w250_input">
                        <el-select v-model="ruleForm.region" placeholder="请选择国籍">

                        </el-select>
                    </el-form-item>
                    <el-form-item label="宗教信仰：" prop="region" label-width="150px" class="w250_input">
                        <el-select v-model="ruleForm.region" placeholder="请选择宗教信仰">

                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="出生日期：" prop="date1" label-width="150px" class="w250_input">
                            <el-date-picker type="date" placeholder="请选择出生日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="性别：" prop="region" label-width="150px">
                        <el-select v-model="ruleForm.region" placeholder="请选择性别" class="w250_input">

                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="意向入学讯息：" prop="region" label-width="150px" class="enroll-info">
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="所在班级：" prop="region" label-width="150px" class="enroll-info">
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>——
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>——
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="拟入学学年：" prop="date1" label-width="150px" class="w250_input">
                            <el-date-picker type="date" placeholder="请选择拟入学学年" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="拟入学日期：" prop="date1" label-width="150px" class="w250_input">
                            <el-date-picker type="date" placeholder="请选择拟入学日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <br>
                    <el-form-item label="学生第一语言：" prop="date1" label-width="150px" class="w250_input">
                            <el-select v-model="ruleForm.region" placeholder="请选择学生第一语言">

                            </el-select>
                    </el-form-item>
                    <el-form-item label="学生第二语言：" prop="date1" label-width="150px" class="w250_input">
                            <el-select v-model="ruleForm.region" placeholder="请选择学生第二语言">

                            </el-select>
                    </el-form-item>
                    
                    <br>
                    <el-form-item label="特长：" prop="desc" label-width="150px" style="width:100%" class="speciality">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址：" prop="region" label-width="150px" class="enroll-info">
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>——
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>——
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>
                        <el-select v-model="ruleForm.region" placeholder="">

                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮编：" prop="date1" label-width="150px" class="">
                            <el-input v-model="ruleForm.region" placeholder="请选择学生第二语言">

                            </el-input>
                    </el-form-item>
                </el-form>
            </div>
            
        </div>

        <div class="mt26 text-align-center">
            <button class="btn bg-grey mr26">取消</button>
            <button class="btn bg-green" @click="submitForm('ruleForm')">保存</button>
        </div>
    </div>
</template>
<style scoped>
    .basicInfo .speciality >>> .el-textarea__inner {
        width: 800px;
        min-height: 150px !important;
    }
    .basicInfo >>> .avatar-uploader .el-upload {
        /* border: 2px dashed #bbb; */
        border-radius: 2px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .basicInfo >>> .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .basicInfo >>> .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 220px;
        line-height: 220px;
        text-align: center;
    }
    .basicInfo .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
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
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>
