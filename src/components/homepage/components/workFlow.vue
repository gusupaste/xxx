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
                                <el-option value="-1" label="全部"></el-option>
                                <el-option
                                v-for="item in school_list"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型：">
                            <el-select v-model="type_1" placeholder="账单类型" @change="changeType">
                                <el-option value="" label="全部"></el-option>
                                <el-option label="收费" value="收费"></el-option>
                                <el-option label="备用金" value="备用金"></el-option>
                                <el-option label="退费" value="退费"></el-option>
                                <el-option label="折扣" value="折扣"></el-option>
                            </el-select>
                            <el-select v-model="type_2" placeholder="账单类型">
                                <el-option value="" label="全部"></el-option>
                                <el-option v-for="item in type_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="搜索：">
                            <el-input class="w250_input" v-model="name" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getApproveList(1)">搜索</el-button>
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
                        prop="form_title"
                        label="流程名称">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="发起人">
                        </el-table-column>
                        <el-table-column
                        prop="date_created"
                        label="流程创建时间">
                        </el-table-column>
                        <el-table-column
                        prop="approve_user_role_name"
                        label="当前节点">
                        </el-table-column>
                        <el-table-column
                        prop="date_updated"
                        label="任务分配时间">
                        </el-table-column>
                        <el-table-column
                        prop="contacts"
                        label="操作">
                        <template slot-scope="scope">
                                <el-button type="text" size="small"
                                        @click="approveDetail(1,scope.row.form_id,scope.row.form_kind_id,scope.row.approve_level,scope.row.form_kind__code)">
                                查看
                                </el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        :page-size="10"
                        :current-page="currentPage"
                        @current-change="changePage"
                        layout="prev,pager, next, jumper"
                        :total="total">
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
            currentPage:1,
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
            school:'-1',
            type_list:[],
            type_1:'',
            type_2:'',
            total:0,
        }
    },
    created () {
        this.getIntercityList();
        this.getAreaList();
        this.getSchoolList();
        this.changeType();
        this.getApproveList(1);
    },
    methods: {
        onSubmit(){

        },
        changePage(val){
            this.currentPage = val;
            this.getApproveList(val)
        },
        interChangeFun() {
            this.school = '';
            this.getSchoolList(this.intercity, this.city, this.area, this.brand);
        },
        areaChangeFun() {
            this.city = '';
            this.school = '';
            // this.getCityList();
            this.getSchoolList();
        },
        getApproveList(val){
            this.loading = true;
            var code_list = [];
            if(this.type_2 == ""){
                this.type_list.forEach(item=>{
                    code_list.push(item.id)
                })
            } else {
                code_list.push(this.type_2)
            }
            this.$axios.post('/api/workflow/workflow_management/approve_list/?page='+this.currentPage+"&size=10",{
                name:this.name,
                approve_status:0,
                center_id:this.center_id,
                code_list:code_list,
            }).then(res => {
            this.loading = false
            if (res.data.status_code === 1) {
                this.thingsList = res.data.data.results
                this.total = res.data.data.count
            }
            }).catch(err => {
            console.log(err)
            })
      },
       approveDetail(status, formId, formKindId, approveLevel, formKindCode) {
        this.$router.push({
          name: 'workflowDetail',
          query: {
            status: status,
            formId: formId,
            formKindId: formKindId,
            approveLevel: approveLevel,
            formKindCode: formKindCode
          }
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
      changeType(){
          if(this.type_1 == "退费"){
              this.type_list = [
                  {
                    name:'预备生离园账单',
                    id:'PRB'
                  },
                  {
                    name:'在校生离园账单',
                    id:'LBO'
                  },
                  {
                    name:'推迟入园账单',
                    id:'IDEB'
                  },
                  {
                    name:'入学时间变更申请',
                    id:'CBA'
                  },
              ]
          } else if(this.type_1 == "收费"){
              this.type_list = [
                  {
                    name:'缴费单',
                    id:'CPF'
                  },
                  {
                    name:'入学账单',
                    id:'EB'
                  },
                  {
                    name:'调班申请单',
                    id:'CCB'
                  },
                  {
                    name:'提前入学账单',
                    id:'ATB'
                  },
              ]
          } else if(this.type_1 == "备用金"){
              this.type_list = [{
                    name:'缺勤请假转备用金账单',
                    id:'ARB'
                  },]
          } else if(this.type_1 == "折扣"){
              this.type_list = [
                  {
                    name:'折扣申请单',
                    id:'RB'
                  }
              ]
          } else if(this.type_1 == ""){
              this.type_list = [
                  {
                    name:'预备生离园账单',
                    id:'PRB'
                  },
                  {
                    name:'在校生离园账单',
                    id:'LBO'
                  },
                  {
                    name:'推迟入园账单',
                    id:'IDEB'
                  },
                  {
                    name:'入学时间变更申请',
                    id:'CBA'
                  },
                  {
                    name:'缴费单',
                    id:'CPF'
                  },
                  {
                    name:'入学账单',
                    id:'EB'
                  },
                  {
                    name:'调班申请单',
                    id:'CCB'
                  },
                  {
                    name:'提前入学账单',
                    id:'ATB'
                  },
                  {
                    name:'缺勤请假转备用金账单',
                    id:'ARB'
                  },
                  {
                    name:'折扣申请单',
                    id:'RB'
                  }
              ]
          }
      }
    }
}
</script>
