<template>
    <div>
        <p style="font-size:14px;font-weight:600">待办事项</p>
            <div style="margin-top:20px">
                <div>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="城际：">
                            <el-select v-model="intercity" @change="interChangeFun">
                                <el-option value="" label="全部" aria-selected="true"></el-option>
                                <el-option
                                    v-for="item in intercity_list"
                                    :key="item.id"
                                    :label="item.dept_name"
                                    :value="item.id">
                                </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="区域：">
                            <el-select v-model="area" @change="areaChangeFun">
                                <el-option value="" label="全部"></el-option>
                                <el-option
                                v-for="item in area_list"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="校园：">
                            <el-select v-model="school">
                                <el-option value="" label="全部"></el-option>
                                <el-option
                                v-for="item in school_list"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型：">
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <el-select v-model="formInline.region" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="搜索：">
                            <el-input class="w250_input" v-model="formInline.user" placeholder="审批人"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <el-table
                        :data="thingsList"
                        border
                        empty-text='暂无查询！'
                        style="width: 100%;margin-top:20px">
                        <el-table-column
                        prop="avatar"
                        label="流程名称"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="发起人"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="gender"
                        label="流程创建时间">
                        </el-table-column>
                        <el-table-column
                        prop="both"
                        label="当前节点">
                        </el-table-column>
                        <el-table-column
                        prop="class"
                        label="任务分配时间">
                        </el-table-column>
                        <el-table-column
                        prop="contacts"
                        label="操作">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        :page-size="2"
                        :current-change="changePage"
                        layout="prev,pager, next, jumper"
                        :total="thingsList.length">
                    </el-pagination>
                    </div>
                </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            int_url: '/api/common/select/intercity_list/', /*城际*/
            area_url: '/api/common/select/area_list/', /*区域*/
            city_url: '/api/common/select/city_list/', /*省市*/
            brand_url: '/api/common/select/hq_list/', /*品牌*/
            school_url: '/api/common/select/center_list/', /*校园*/
            currentPage:'',
            approve_status:'',
            name:'',
            formInline: {
                user: '',
                region: '',
                city:'',
                school:''
            },
            thingsList:[],
            intercity_list: [],
            area_list: [],
            city_list: [],
            school_list:[],
            intercity:'',
            city:'',
            area:'',
            brand:'',
            school:''
        }
    },
    created () {
        this.getIntercityList();
        this.getAreaList();
        this.getSchoolList();
    },
    methods: {
        onSubmit(){

        },
        changePage(val){

        },
        interChangeFun() {
            this.school = '';
            this.getSchoolList(this.intercity, this.city, this.area, this.brand);
        },
        areaChangeFun() {
            this.city = '';
            this.school = '';
            this.getCityList();
            this.getSchoolList();
        },
        getApproveList(val){
            this.currentPage = val
            this.loading = true
            this.$axios.post('/api/workflow/workflow_management/approve_list/',{
            name:this.name,
            approve_status:this.approve_status,
            page:this.currentPage,
            size:10
            }).then(res => {
            this.loading = false
            if (res.data.status_code === 1) {
                this.approveList = res.data.data.results
                this.total = res.data.data.count
            }
            }).catch(err => {
            console.log(err)
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
        var params = {};
        if (this.intercity !== '') {
          params.intercity_id = this.intercity;
        }
        if (this.city !== '') {
          params.province_id = this.city;
        }
        if (this.area !== '') {
          params.area_id = this.area;
        }
        if (this.brand !== '') {
          params.hq_id = this.brand;
        }
        _this.$axios.get(url, {
          params: params
        }).then(res => {
          _this.loading = false;
          if (res.status == 200 && res.data.status_code == 1) {
            this.school_list = res.data.results;
          }
        }).catch(err => {
          console.log(err)
        })
      },
    }
}
</script>
