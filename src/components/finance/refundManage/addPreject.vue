<template>
    <el-dialog title="添加项目" :visible.sync="$parent.addProjectVisible" width="600px" class="discountShow">
      <el-form v-model="refund_item" class="mt26">
        <el-form-item label="扣款/退费：">
          <el-select v-model="refund_item.refund_direct" placeholder="请选择性别">
            <el-option label="扣款" value="扣款"></el-option>
            <el-option label="退款" value="退款"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称：" prop="desc" class="speciality">
          <el-input type="text" v-model="refund_item.item" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="情况说明：" prop="desc" class="speciality">
          <el-input type="textarea" v-model="refund_item.remarks" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="金额小计：" class="speciality">
          <el-input oninput ="value=value.replace(/[^0-9.]/g,'')" class="search_input" v-model="refund_item.amount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="bg-grey bd-grey white" @click="$parent.addProjectVisible = false">取 消</el-button>
        <el-button type="success" class="bg-green bd-green"  @click="addSubject">保存</el-button>
      </span>
    </el-dialog>
</template>
<style scoped>

</style>
<script>
export default {
    data(){
        return {
            fileList:[],
            refund_item:{
              item:'',
              remarks:'',
              amount:'',
              refund_direct:'扣款'
            }
        }
    },
    methods:{
      addSubject(){
        this.$parent.addProjectVisible = false;
        this.$emit('addSubject',this.refund_item)
      }
    }
}
</script>
