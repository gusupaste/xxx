<template>
    <div>
        <div class="select-header">
            <span>科目属性：</span>
            <el-select v-model="searchForm.type" placeholder="--请选择--" style="width: 20%;">
                <el-option label="所有" value=""></el-option>
                <el-option value="0" label="非普惠"></el-option>
                <el-option value="1" label="普惠"></el-option>
            </el-select>
            <span class="ml20">搜索科目：</span>
            <el-input v-model="searchForm.condition" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
            <span class="padding-left-30">
                <el-button type="primary" @click="searchList(1)">搜索</el-button>
            </span>
            <span class="right" style="cursor:pointer" @click="addFeeVisible=true">
                <i class="icon-font fa fa-calendar-plus-o"></i>
                <span class="font-cl-blue font-size-14" >新增费用科目</span>
            </span>
            </div>
            <el-table
                :data="subjectList"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                    prop="code"
                    label="科目编码"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="科目名称"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="limit_range_str"
                    label="应用范围"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="type_str"
                    label="科目属性"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="remarks"
                    label="备注"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="getSubjectInfo(scope.row.id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                @current-change="changePage"
                :page-size="10"
                :current-page="searchForm.page"
                layout="prev, pager, next"
                :total="count">
            </el-pagination>
            <!-- 新增费用科目 -->
            <el-dialog title="新增费用科目" :visible.sync="addFeeVisible" width="800px" @close="handleClose">
                <el-form ref="editform" :rules="rules" :model="editform"  label-width="100px">
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="科目名称：" prop="name">
                        <el-input v-model.trim="editform.name" placeholder="请输入科目名称" maxlength="20"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="科目属性：" prop="type">
                        <el-select v-model="editform.type" placeholder="--请选择--" style="width: 100%;">
                            <el-option value="0" label="非普惠"></el-option>
                            <el-option value="1" label="普惠"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="科目类型：" prop="t_code">
                        <el-select value-key="id" v-model="editform.t_code" @change="gettype" placeholder="--请选择--" style="width: 100%;">
                            <el-option
                            v-for="item in category_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="科目编码：">
                        <el-input disabled v-model="editform.c_code" placeholder="请输入科目编码" maxlength="15"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                    <el-form-item label="是否必选：" style="display:none">
                        <el-select v-model="editform.is_required">
                            <el-option label="必选" value="Necessary"></el-option>
                            <el-option label="可选" value="Optional"></el-option>
                            <el-option label="新生必选，老生可选" value="PrepareNecessaryAndFormalOptional"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                    <el-form-item label="应用范围：">
                        <el-radio v-model="editform.limit_range" label="0">所有校园</el-radio><br>
                        <el-radio v-model="editform.limit_range" label="1">指定校园</el-radio>
                    </el-form-item>
                    </el-col>
                    <el-col :span="16" v-if="editform.limit_range == 1">
                        <el-form-item style="margin-left:-80px;padding-top: 40px;">
                            <span>品牌：</span>
                            <el-select v-model="editform.hq_id" @change="getSchool" placeholder="--请选择--" style="width: 35%;" >
                                <el-option value="" label="所有"></el-option>
                                <el-option
                                    v-for="item in brandList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <span>城际：</span>
                            <el-select v-model="editform.intercity_id" @change="getSchool" placeholder="--请选择--" style="width: 35%;">
                                <el-option value="" label="所有"></el-option>
                                <el-option
                                    v-for="item in intercityList"
                                    :key="item.id"
                                    :label="item.dept_name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item v-if="editform.limit_range == 1">
                            <el-table
                                stripe
                                max-height="250"
                                ref="multipleTable"
                                :data="schoolList"
                                border
                                @selection-change="handleSelectionChange"
                                :show-header="false"
                                style="width: 95%;">
                                <el-table-column
                                    type="selection"
                                    width="50">
                                </el-table-column>
                                <el-table-column
                                    prop="name">
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="备注说明：">
                        <el-input type="textarea"
                        :rows="2"
                        maxlength="100"
                        placeholder="请输入内容"
                        v-model="editform.remarks">
                        </el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey white bd-grey" @click="addFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="addSubject('editform')">保 存</el-button>
        </span>
      </el-dialog>
        <!-- 编辑费用科目 -->
        <el-dialog title="编辑费用科目" :visible.sync="editFeeVisible" width="800px">
            <el-form ref="editform2" :rules="rules2" :model="editform2"  label-width="100px">
            <el-row>
                <el-col :span="12">
                <el-form-item label="科目名称：" prop="name">
                    <el-input disabled v-model.trim="editform2.name" placeholder="请输入科目名称" maxlength="20"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="科目属性：" prop="type">
                    <el-select disabled v-model="editform2.type" placeholder="--请选择--" style="width: 100%;">
                        <el-option :value="0" label="非普惠"></el-option>
                        <el-option :value="1" label="普惠"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <el-form-item label="科目类型：" prop="t_code">
                    <el-select value-key="id" disabled v-model="editform2.code" @change="gettype" placeholder="--请选择--" style="width: 100%;">
                        <el-option
                        v-for="item in category_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="科目编码：">
                    <el-input disabled v-model="editform2.code" placeholder="请输入科目编码" maxlength="15"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                <el-form-item label="是否必选：" style="display:none">
                    <el-select v-model="editform2.is_required">
                        <el-option label="必选" value="Necessary"></el-option>
                        <el-option label="可选" value="Optional"></el-option>
                        <el-option label="新生必选，老生可选" value="PrepareNecessaryAndFormalOptional"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                <el-form-item label="应用范围：">
                    <el-radio v-model="editform2.limit_range" :label="0">所有校园</el-radio><br>
                    <el-radio v-model="editform2.limit_range" :label="1">指定校园</el-radio>
                </el-form-item>
                </el-col>
                <el-col :span="16" v-if="editform2.limit_range == 1">
                    <el-form-item style="margin-left:-80px;padding-top: 40px;">
                        <span>品牌：</span>
                        <el-select v-model="editform2.hq_id" @change="getSchool2" placeholder="--请选择--" style="width: 35%;" >
                            <el-option value="" label="所有"></el-option>
                            <el-option
                                v-for="item in brandList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <span>城际：</span>
                        <el-select v-model="editform2.intercity_id" @change="getSchool2" placeholder="--请选择--" style="width: 35%;">
                            <el-option value="" label="所有"></el-option>
                            <el-option
                                v-for="item in intercityList"
                                :key="item.id"
                                :label="item.dept_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item v-if="editform2.limit_range == 1">
                        <el-table
                            stripe
                            max-height="250"
                            ref="multipleTable2"
                            :data="newSchoolList"
                            border
                            @selection-change="handleSelectionChange2"
                            :show-header="false"
                            style="width: 95%;">
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column
                                prop="name">
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                <el-form-item label="备注说明：">
                    <el-input type="textarea"
                    maxlength="100"
                    :rows="2"
                    disabled
                    placeholder="请输入内容"
                    v-model="editform2.remarks">
                    </el-input>
                </el-form-item>
                </el-col>
            </el-row>
            </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button class="bg-grey white bd-grey" @click="editFeeVisible = false">取 消</el-button>
        <el-button type="success" @click="addSubject2('editform2')">保 存</el-button>
    </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            count:1,
            addFeeVisible:false,
            editFeeVisible:false,
            category_list:[],
            multipleTable:[],
            multipleTable2:[],
            subjectList:[],
            schoolList:[],
            newSchoolList:[],
            searchForm:{
                type:'',
                condition:'',
                size:10,
                page:1
            },
            editform:{
                hq_id:'',
                is_required:'Necessary',
                intercity_id:'',
                limit_range:"0"
            },
            editform2:{
                hq_id:'',
                intercity_id:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入科目名称', trigger: 'blur' },
                ],
                t_code: [
                    { required: true, message: '请选择科目类型', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择科目属性', trigger: 'change' }
                ]
            },
            rules2: {
                name: [
                    { required: true, message: '请输入科目名称', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择科目属性', trigger: 'change' }
                ]
            },
            input:'',
            edit_id:'',
            checkedList:[]
        }
    },
    props:['brandList','intercityList'],
    created () {
        this.getSubject();
        this.getSchool();
        this.searchList(1);
    },
    methods: {
        toggleSelection(rows) {
            console.log(rows)
            if(rows){
                rows.forEach(row => {
                this.$refs.multipleTable2.toggleRowSelection(row,true);
            });
            }
        },
        handleClose(){
            this.$refs['editform'].resetFields();
            this.editform.hq_id = "";
            this.editform.intercity_id = "";
            this.editform.limit_range = "0";
            this.getSchool();
        },
        searchList(val) {
            this.searchForm.page = val;
            var _this = this;
            this.$axios.get('/api/finance/subject/',{
                params:this.searchForm
            })
            .then(res=>{
                _this.subjectList = res.data.data.results;
                _this.count = res.data.data.count;
            })
        },
        getSubject(){
            var _this = this;
            this.$axios.get('/api/finance/subject/category_list/')
            .then(res=>{
                _this.category_list = res.data.data;
            })
        },
        getSchool(){
            var _this = this;
            this.$axios.get('/api/common/select/center_list/',{
                params:{
                    hq_id:_this.editform.hq_id,
                    intercity_id:_this.editform.intercity_id
                }
            })
            .then(res=>{
                _this.schoolList = res.data.results;
                
            });
        },
        getSchool2(){
            var _this = this;
            this.$axios.get('/api/common/select/center_list/',{
                params:{
                    hq_id:_this.editform2.hq_id,
                    intercity_id:_this.editform2.intercity_id
                }
            })
            .then(res=>{
                _this.newSchoolList = res.data.results;
                _this.$nextTick(()=>{
                    _this.toggleSelection(_this.checkedList);
                })
            });
            
        },
        addSubject(formName){
            console.log(this.editform)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editform.code =  this.editform.t_code.code;
                    this.editform.f_code =  this.editform.t_code.code;
                    var _this = this;
                    this.$axios.post('/api/finance/subject/',this.editform)
                    .then(res=>{
                        if(res.data.status_code === 1){
                            _this.$message({
                                type:"success",
                                message:"新增费用科目成功！"
                            })
                            _this.addFeeVisible = false;
                            _this.searchList(1);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        addSubject2(formName){
            console.log(this.editform2)
            // this.editform2.hq_id = this.editform2.code
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.editform.code =  this.editform.t_code.code;
                    // this.editform.f_code =  this.editform.t_code.code;
                    this.$axios.put('/api/finance/subject/'+this.edit_id+'/',this.editform2)
                    .then(res=>{
                        if(res.data.status_code === 1){
                            _this.$message({
                                type:"success",
                                message:"编辑费用科目成功！"
                            })
                            _this.editFeeVisible = false;
                            _this.searchList(1);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        gettype(val){
            this.editform.c_code = val.code;
        },
        gettype2(val){
            this.editform2.c_code = val;
        },
        changePage(val){
            this.searchForm.page = val;
            this.searchList(val);
        },
        handleSelectionChange(val){
            this.editform.center_ids = [];
            val.forEach(item => {
                this.editform.center_ids.push(item.id)
            });
        },
        handleSelectionChange2(val){
            this.editform2.center_ids = [];
            val.forEach(item => {
                this.editform2.center_ids.push(item.id)
            });
        },
        getSubjectInfo(id){
            var _this = this;
            this.editFeeVisible = true;
            this.edit_id = id;
            this.$axios.get('/api/finance/subject/'+id+'/view_detail/')
            .then(res=>{
                _this.editform2 = res.data.detail;
                _this.newSchoolList = res.data.detail.center_list;
                _this.$set(_this.editform2,'hq_id','');
                _this.$set(_this.editform2,'intercity_id','');
                _this.checkedList = [];
                res.data.detail.center_list.forEach(item=>{
                    if(item.selected === 1){
                        _this.checkedList.push(item)
                    }
                })
                _this.$nextTick(()=>{
                    _this.toggleSelection(_this.checkedList);
                })
            })
        }
    }
}
</script>

