<template>
    <el-dialog title="添加学生" :visible.sync="$parent.addStudentVisible" width="600px" class="discountShow">
      <p class="font-size-14">合肥御龙湾幼儿园</p>
      <div class="mt10">
        <span>搜索：</span>
        <el-input type="text" style="width: auto;"></el-input>
        <el-button class="bg-blue white">搜索</el-button>
      </div>
      <div class="mt10">
        <el-table
          :data="chargeTableDate"
          border
          stripe
          show-header
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%;">
          <el-table-column
            prop="telephone"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="联系人">
          </el-table-column>
        </el-table>
      </div>
      <div class="mt10">
        <p class="red font-size-12">*学生不可多选，折扣不支持批量创建</p>
      </div>
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
            },
            chargeTableDate:[
            {
              code:'xxxxxxxxxxxx',
              name:'31231231',
              intercity_name:'312313',
              hq_name:'31231',
              opening_date:'31231',
              leader:'31231',
              telephone:'312312',
              status_name:'12312313',
            },
            {
              code:'xxxxxxxxxxxx',
              name:'31231231',
              intercity_name:'312313',
              hq_name:'31231',
              opening_date:'31231',
              leader:'31231',
              telephone:'312312',
              status_name:'12312313',
            }
          ],
        }
    },
    methods:{
    }
}
</script>
