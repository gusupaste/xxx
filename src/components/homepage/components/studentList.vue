<template>
    <div>
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="城际：">
                    <el-select v-model="formInline.intercity_id" placeholder="" @change="getSchoolList">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in intercity_list" :label="item.dept_name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域：">
                    <el-select v-model="formInline.area_id" placeholder="" @change="getSchoolList">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in area_list" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="校园：">
                    <el-select v-model="formInline.center_id" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in school_list" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="搜索：">
                    <el-input class="w250_input" v-model="formInline.searchinfo" placeholder="输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchList(1)">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                :data="studentList"
                border
                empty-text='暂无查询！'
                style="width: 100%;margin-top:20px">
                <el-table-column
                prop="avatar"
                label="头像">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名">
                </el-table-column>
                <el-table-column
                prop="gender"
                label="性别">
                </el-table-column>
                <el-table-column
                prop="date_of_birth"
                label="出生日期">
                </el-table-column>
                <el-table-column
                prop="preferred_info"
                label="所在班级">
                </el-table-column>
                <el-table-column
                prop="customer_phone"
                label="联系人">
                </el-table-column>
            </el-table>
            <el-pagination
            v-if="studentList.length>0"
                background
                :page-size="10"
                @current-change="handleCurrentChange"
                layout="prev,pager, next, jumper"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            int_url: '/api/common/select/intercity_list/', /*城际*/
            area_url: '/api/common/select/area_list/', /*区域*/
            school_url: '/api/common/select/center_list/', /*校园*/
            formInline: {
                searchinfo: '',
                intercity_id: '',
                area_id:'',
                center_id:''
            },
            studentList:[],
            intercity_list: [],
            area_list: [],
            city_list: [],
            school_list:[],
            count:0,
        }
    },
    created () {
        this.getIntercityList();
        this.getAreaList();
        this.getSchoolList();
    },
    methods: {
        handleCurrentChange(val){
            this.searchList(val)
        },
        searchList(val){
            var _this = this;
            var obj = {
                size:10,
                student_type:'-1',
                page:val,
                condition:this.formInline.searchinfo,
                intercity_id:this.formInline.intercity_id,
                area_id:this.formInline.area_id,
                center_id:this.formInline.center_id,
            };
            this.$axios.get('/api/student/student/student_list',{
                params:obj
            }).then(res=>{
                _this.studentList = res.data.results.results;
                _this.count = res.data.results.count;
            })
        },
        /*城际*/
      getIntercityList() {
        var _this = this;
        _this.$axios.get(this.int_url).then(res => {
          _this.loading = false;
          if (res.status == 200 && res.data.status_code == 1) {
            this.intercity_list = res.data.results;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /*区域*/
      getAreaList() {
        var _this = this;
        _this.$axios.get(this.area_url).then(res => {
          _this.loading = false;
          if (res.status == 200 && res.data.status_code == 1) {
            this.area_list = res.data.results;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getSchoolList(){
        this.intercity, this.city, this.area, this.brand
        var _this = this;
        var url = this.school_url;
        var params = {
            intercity_id :this.formInline.intercity_id,
            area_id :this.formInline.area_id
        };
        _this.$axios.get(url, {
          params: params
        }).then(res => {
          _this.loading = false;
          if (res.status == 200 && res.data.status_code == 1) {
              this.formInline.center_id = "";
            this.school_list = res.data.results;
            this.searchList(1);
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
}
</script>

