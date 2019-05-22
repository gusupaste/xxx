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
    props:{
      activeName:{
        type:String,
        request:true,
      }
    },
    data(){
        return {
            year_url:'/api/student/student/'+this.$route.params.id+'/academic_year_history/',
            yearlist: [],
        }
    },
    mounted:function(){
      if(localStorage.getItem('studentTabName') === 'ninth'){
        this.getYearHistory();
      }
    },
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
    watch:{
      activeName: {
        handler(newValue, oldValue) {
          if(newValue === 'ninth'){
            this.getYearHistory();
          }
        },
        deep: true
      },
    }
}
</script>
