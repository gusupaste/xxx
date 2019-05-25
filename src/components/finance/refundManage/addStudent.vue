<template>
    <el-dialog title="添加学生" :visible.sync="$parent.addStudentVisible" width="600px" class="discountShow">
      <p class="font-size-14">{{info.name}}</p>
      <div class="mt10">
        <span>搜索：</span>
        <el-input v-model="searchForm.search_name" class="search_input" placeholder="输入学号、学生姓名或家长姓名" type="text"></el-input>
        <el-button class="bg-blue white" @click="getStudent(1)">搜索</el-button>
      </div>
      <div class="mt10">
        <el-table
        class="table_ra"
          :data="studentList"
          border
          stripe
          show-header
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%;">
          <el-table-column
            type="id"
            label="选择"
            width="55">
            <template slot-scope="scope">
              <el-radio @change="change" v-model="student_id" :label="scope.row.id"></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="学生姓名">
          </el-table-column>
          <el-table-column
            prop="student_no"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="guardians_str"
            label="联系人">
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="changepage"
          layout="prev,pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
      <div class="mt10">
        <p class="red font-size-12">*学生不可多选，折扣不支持批量创建</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="bg-grey bd-grey white" @click="$parent.addStudentVisible = false">取 消</el-button>
        <el-button class="bg-green bd-green white" type="success" @click="sureChose">保存</el-button>
      </span>
    </el-dialog>
</template>
<style scoped>
  .table_ra >>> .el-radio__label {
    display: none;
  }
</style>
<script>
export default{
    data(){
        return {
            fileList:[],
            student_id:'',
            count:1,
            studentList:[],
            searchForm:{
              search_name:'',
              status:this.status,
              page:1,
              size:10
            },
            info:this.$cookies.get('userInfo').center,
            chargeTableDate:[],
        }
    },
    mounted () {
        this.getStudent(1)
    },
    props: ['status'],
    methods:{
      getStudent(val){
        this.searchForm.page = val;
        var _this = this;
        this.$axios.get('/api/finance/select/students/',{
          params:this.searchForm
        }).then(res=>{
          console.log(res.data)
          _this.count = res.data.count;
          _this.studentList = res.data.results;
        })
      },
      handleCurrentChange(){
        
      },
      sureChose(){
        this.$parent.addStudentVisible = false;
        this.$emit('getStudent', this.student_id);
      },
      changepage(val){
        this.getStudent(val);
      },
      change(val){
        console.log(val)
      }
    }
}
</script>
