<template>
    <div class="adddiscountApplication wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 折扣申请 > <span class="font-cl-blue">新增折扣申请</span></p>
      </div>
        <div class="content-top mt26">新增折扣申请</div>
        <div class="clearfix mt10 head-form">
            <el-form inline>
                <el-form-item label="申请学校：" label-width="120px">
                    -----
                </el-form-item>
                <el-form-item label="申请日期：" label-width="120px">
                    -----
                </el-form-item>
                <br>
                <el-form-item label="学生：" label-width="120px">
                    <el-button style="border-raius:20px" @click="dialogTableVisible=true">
                        <i class="fa fa-search"></i>添加
                    </el-button>
                </el-form-item>
                <el-form-item label="学生姓名：" label-width="120px">
                    2019/02/27
                </el-form-item>
                <el-form-item label="学生状态：" label-width="120px">
                    2019/02/27
                </el-form-item>
                <el-form-item label="班级：" label-width="120px">
                    2019/02/27
                </el-form-item>
                <br>
                <el-form-item label="学业计划：" label-width="120px">
                    <el-select  v-model="selected_plan">
                      <el-option v-for="plan in plans" 
                        :key="plan.id" 
                        :label="plan.name" 
                        :value="plan.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请学年：" label-width="120px">
                    <el-select v-model="selected_year">
                      <el-option v-for="year in years" 
                        :key="year.id"
                        :label="year.name"
                        :value="year.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请学期：" label-width="120px">
                    <el-select v-model="value1"></el-select>
                </el-form-item>
                <br>
                <el-form-item label="家长姓名：" label-width="120px">
                    -----
                </el-form-item>
                <el-form-item label="联系方式：" label-width="120px">
                    -----
                </el-form-item>
            </el-form>
        </div>
        <p class="mt26 font-cl-blue"></p>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic" style="border:none">
            <el-form-item
                class="mt10"
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :prop="'domains.' + index + '.value'">
                <p class="font-cl-blue">新增折扣{{index+1}}：</p>
                <el-form inline style="padding:20px;">
                    <el-form-item label="选择折扣类型：" label-width="120px">
                       <el-select class="w250_input">

                       </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="拟入学日期：" label-width="120px">
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="拟缴费日期：" label-width="120px">
                        <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <br>
                    <el-form-item label="学费正价：" label-width="120px">
                        -----
                    </el-form-item>
                    <br>
                    <el-form-item label="申请折扣：" label-width="120px">
                        <el-input placeholder="请输入内容" v-model="input2">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="应缴总额：" label-width="120px">
                        2019/02/27
                    </el-form-item>
                    <el-form-item label="折扣总额：" label-width="120px">
                        2019/02/27
                    </el-form-item>
                    <el-form-item label="优惠金额：" label-width="120px">
                        2019/02/27
                    </el-form-item>
                    <br>
                    <el-form-item label="备注：" label-width="120px" style="width:100%" class="text-area">
                        <el-input
                           
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="textarea">
                        </el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="相关附件：" label-width="120px">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary" class="orange" style="background-color:#fff;border:1px solid #f17218"> <i class="fa fa-upload"></i> 上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <br>
                    <el-form-item label=" " label-width="120px">
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-form-item>
                </el-form>
                
                
                
            </el-form-item>
            <el-form-item>
                <el-button @click="addDomain" class="bg-orange white">
                    <i class="fa fa-plus"></i>
                    新增折扣
                </el-button>
            </el-form-item>
        </el-form>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey">取消</button>
            <button class="btn bg-green">提交</button>
        </div>
        <el-dialog title="添加学生" :visible.sync="dialogTableVisible">
            <p>合肥御龙湾幼儿园</p>
            <el-form inline style="border:none" class="mt10">
                <el-form-item  label="搜索：">
                    <el-input class="w250_input" placeholder="输入学号、学生姓名或家长姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getStudent('')">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData">
                <el-table-column property="name" label="学生姓名" width="150"></el-table-column>
                <el-table-column property="student_no" label="学号" width="200"></el-table-column>
                <el-table-column property="id" label="联系人"></el-table-column>
            </el-table>
            <p class="mt10 ml20">
                <ul>
                    <li class="red">学生不可多选，折扣不支持批量创建</li>
                </ul>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false"  class="bg-grey white bd-grey">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false" class="bg-green white bd-green">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style scoped>
  .adddiscountApplication .content-top{
    font-weight: 600;
    background-color: #DCECF3;
    width: 15%;
    padding: 10px 0 10px 20px;
    border-radius: 3px;
    color: #3E7193;
  }
  .adddiscountApplication .card-type {
      line-height: 30px;
  }
  .adddiscountApplication >>> .el-card__body {
      padding: 30px 70px 10px 70px;
  }
  .adddiscountApplication .tableList {
      color:#101010;
  }
  .adddiscountApplication >>> .el-form-item {
     margin-bottom: 10px;
  }
  .adddiscountApplication >>> .head-form .el-form-item {
      width:20%;
  }
  .adddiscountApplication >>> .head-form .el-form {
      padding:20px;
  }
  .adddiscountApplication >>> .el-form {
     border:1px solid #CCCCCC;
  }
  .adddiscountApplication >>> .text-area .el-form-item__content {
     width: 75%;
  }
  .adddiscountApplication >>> .el-input-group__append {
     background-color: #fff;
  }
  .adddiscountApplication .head-detail {
     background-color: #ccc;
     color: #101010;
     height: 40px;
     line-height: 40px;
     text-align: center;
     letter-spacing: 200;
     border:1px solid #e6e6e6;
  }
</style>
<script>
export default {
    data(){
        return {
            dialogTableVisible:false,
            plans:[],
            years:[],
            selected_plan: null,
            selected_year: null,
            value1:'2000-09-09',
            fileList:[],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }],
                dynamicValidateForm: {
                    domains: [{
                        value: ''
                    }],
                    email: ''
                }
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.loadData();
            this.getStudent("");
        })
    },
    methods: {
         addDomain() {
            this.dynamicValidateForm.domains.push({
            value: '',
            key: Date.now()
            })
         },
         removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item)
            if (index !== -1) {
            this.dynamicValidateForm.domains.splice(index, 1)
            }
        },
        loadData() {
            var _this = this;

            // this.$axios.post('/api/finance/bill/'+this.$route.params.id+'/pay_bill/',this.addform)
            // .then(res=>{
            //     if(res.data.status === 1){
            //         _this.$message({
            //             type:'success',
            //             message:'缴费成功！'
            //         });
            //         _this.$router.push('/financemanagement/billMaking');
            //     }
            // })

            this.$axios.get('http://192.168.1.197:8000/api/discount/select/payment_method_list/')
            .then(res=>{
                console.log(res.data)
                _this.plans = res.data.results;
            })

            this.$axios.get('http://192.168.1.197:8000/api/common/select/academic_year_list/')
            .then(res=>{
                console.log(res.data)
                _this.years = res.data.results;
                for(var key in res.data.results){
                    if(res.data.results[key].is_selected){
                        _this.selected_year = res.data.results[key].id
                    }
                }
            })

        },
        getStudent(name){
            //注：student_status='Prepare'预备生，student_status='Formal'在校生，不传表示所有
            var _this = this;

            this.$axios.get('http://192.168.1.197:8000/api/finance/select/students/',
            {
                "search_name":name,
                "student_status":"", 
            }).then(res=>{
                console.log("**********")
                console.log(res.data)
                _this.tableData = res.data.results;
            })
        }
    }
}
</script>
