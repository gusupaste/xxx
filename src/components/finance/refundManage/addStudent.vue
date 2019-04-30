<template>
    <el-dialog title="添加学生" :visible.sync="$parent.addStudentVisible" width="600px" class="discountShow">
      <span slot="footer" class="dialog-footer">
        <el-button @click="$parent.addStudentVisible = false">取 消</el-button>
        <el-button type="success" @click="$parent.addStudentVisible = false">保存</el-button>
      </span>
    </el-dialog>
</template>
<style scoped>

</style>
<script>
export default{
    data(){
        return {
            fileList:[],
            form:{
                region:[],
                date1:'2019-09-09',
                radio:"1"
            }
        }
    },
    methods:{
    }
}
</script>
