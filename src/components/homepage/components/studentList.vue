<template>
    <div>
        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="城际：">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域：">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="校园：">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="搜索：">
                    <el-input class="w250_input" v-model="formInline.user" placeholder="输入学校、学生姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchList">搜索</el-button>
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
                label="头像"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="gender"
                label="性别">
                </el-table-column>
                <el-table-column
                prop="both"
                label="出生日期">
                </el-table-column>
                <el-table-column
                prop="class"
                label="所在班级">
                </el-table-column>
                <el-table-column
                prop="contacts"
                label="联系人">
                </el-table-column>
            </el-table>
            <el-pagination
            v-if="studentList.length>0"
                background
                :page-size="2"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="prev,pager, next, jumper"
                :total="30000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formInline: {
                user: '',
                region: '',
                city:'',
                school:''
            },
            studentList:[]
        }
    },
    created () {
        
    },
    methods: {
        searchList(){

        }
    }
}
</script>

