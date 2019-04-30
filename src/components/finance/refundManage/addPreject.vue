<template>
    <el-dialog title="添加项目" :visible.sync="$parent.addProjectVisible" width="600px" class="discountShow">
      <el-form v-model="form" class="mt26">
        <el-form-item label="扣款/退费：">
          <el-select v-model="form.region" placeholder="请选择性别">
            <el-option>扣款</el-option>
            <el-option>退款</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称：" prop="desc" class="speciality">
          <el-input type="text" v-model="form.region" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="情况说明：" prop="desc" class="speciality">
          <el-input type="textarea" v-model="form.region" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="金额小计：" class="speciality">
          <el-select v-model="form.region" placeholder="请选择性别">
            <el-option>扣款</el-option>
            <el-option>退款</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$parent.addProjectVisible = false">取 消</el-button>
        <el-button type="success" @click="$parent.addProjectVisible = false">保存</el-button>
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
