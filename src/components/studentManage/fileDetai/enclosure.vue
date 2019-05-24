<template>
    <div class="allergyRecordStudent">
        <p>附件列表：</p>
       <el-table
            class="mt26"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="附件类型"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="附件名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="备注说明">
            </el-table-column>
        </el-table>
        <div class="mt26">
            <p class="recordHead">添加/编辑附件</p>
            <el-form v-model="form" class="mt26">
                <el-form-item label="请选择附件类型：" prop="region" label-width="150px">
                    <el-select v-model="form.region" placeholder="请选择性别">

                    </el-select>
                </el-form-item>
                <el-form-item label="附件名称：" prop="desc" label-width="150px"  class="speciality">
                        <el-input type="" v-model="form.region"></el-input>
                </el-form-item>
                <el-form-item label="附件上传：" prop="desc" label-width="150px" class="speciality">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                </el-form-item>
                <el-form-item label="备注说明：" prop="desc" label-width="150px" style="width:100%" class="speciality">
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
    props:{
      activeName:{
        type:String,
        request:true,
      }
    },
    data(){
        return {
            fileList:[],
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
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    },
    mounted:function(){
      if(localStorage.getItem('studentTabName') === 'eigth'){
      }
    },
    watch:{
      activeName: {
        handler(newValue, oldValue) {
          if(newValue === 'eigth'){
          }
        },
        deep: true
      },
    },
}
</script>
