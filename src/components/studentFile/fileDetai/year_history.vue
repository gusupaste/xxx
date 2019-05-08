<template>
    <div>
        <p>学年历史：</p>
         <el-table
            class="mt26"
            :data="yearlist"
            border
            style="width: 100%">
            <el-table-column
            prop="academic_year"
            label="学年"
            width="180">
            </el-table-column>
            <el-table-column
            prop="class_name"
            label="所在班级"
            width="180">
            </el-table-column>
            <el-table-column
            prop="sign_up_date"
            label="报名日期">
            </el-table-column>
            <el-table-column
            prop="in_class_date"
            label="入学日期">
            </el-table-column>
            <el-table-column
            prop="out_class_date"
            label="截止日期">
            </el-table-column>
            <el-table-column
            prop="status"
            label="状态">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            year_url:'http://192.168.199.157:8000/api/student/student/1/academic_year_history/',
            yearlist: [],
        }
    },
    /*mounted:function(){
        this.getYearHistory();
    },*/
    methods:{
      getYearHistory:function () {
        var _this = this;
        this.$axios.get(this.year_url).then(res=>{
          _this.yearlist = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      }
    },
}
</script>
