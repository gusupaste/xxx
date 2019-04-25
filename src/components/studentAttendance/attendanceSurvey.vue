<template>
    <div class="wrap attendanceSurvey">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">学生考勤</span></p>
        </div>
        <el-form class="mt10" label-width="80px" :model="formLabelAlign" inline="">
            <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
                <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style>

</style>
<script>
export default {
    data(){
        return {
            formLabelAlign: {
            name: '',
            region: '',
            type: ''
            }
        }
    },
    methods:{
         onSubmit() {
            console.log('submit!');
      }
    }
}
</script>
