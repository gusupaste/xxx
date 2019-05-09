<template>
    <div>
        <div class="select-header">
            <span>科目属性：</span>
            <el-select v-model="searchForm.type" placeholder="--请选择--" style="width: 20%;">
                <el-option label="所有" value=""></el-option>
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span class="ml20">搜索科目：</span>
            <el-input v-model="searchForm.condition" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
            <span class="padding-left-30">
                <el-button type="primary" @click="searchList">搜索</el-button>
            </span>
            <span class="right" style="cursor:pointer" @click="addNewTemplate(0)">
                <i class="icon-font fa fa-calendar-plus-o"></i>
                <span class="font-cl-blue font-size-14" >新增费用科目</span>
            </span>
            </div>
            <el-table
                :data="chargeTableDate"
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
                    prop="intercity_name"
                    label="应用范围"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="intercity_name"
                    label="科目属性"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="hq_name"
                    label="备注"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addNewTemplate(1)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                :current-page="searchForm.page"
                layout="prev, pager, next"
                :total="count">
            </el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            count:10,
            searchForm:{
                type:'',
                condition:'',
                size:10,
                page:1
            },
            options:[],
            nameSelect:[],
            input:'',
            chargeTableDate:[],
        }
    },
    created () {
        this.getSubject()
    },
    methods: {
        addNewTemplate(){

        },
        searchList() {
            var _this = this;
            this.$axios.get('/api/finance/subject/',{
                params:this.searchForm
            })
            .then(res=>{
                console.log(res.data)
            })
        },
        getSubject(){
            var _this = this;
            this.$axios.get('/api/finance/subject/category_list/')
            .then(res=>{
                console.log(res.data)
            })
        }
    }
}
</script>

