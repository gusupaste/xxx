<template>
    <div class="schoolCalendarList wrap">
        <p>YOU ARE HERE : 系统管理 >> 校日历管理</p>
        <div style="margin-top:20px">
            <div class="clearfix">
                <span class="left">
                    <span>学年：</span>
                    <el-select v-model="year">
                        <el-option value="2018">2018</el-option>
                    </el-select>
                    <span style="margin-left:50px">模板名称：</span>
                    <el-select v-model="template_name">
                        <el-option value="你好">你好</el-option>
                    </el-select>
                </span>
                <span class="right" style="cursor:pointer" @click="addNewTemplate">
                    <i class="icon-font fa fa-calendar-plus-o"></i>
                    <span class="font-cl-blue font-size-14" >新增校日历模板</span>
                </span>
            </div>
            <div>
                <el-table
                :data="tableData"
                border
                empty-text='没有找到记录！'
                style="width: 100%;margin-top:20px">
                <el-table-column
                  fixed
                  prop="date"
                  label="模板名称">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="学年">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="校园">
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="班级类型">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                        <i class="fa fa-edit icon-font"></i>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next,jumper"
                :total="1000">
              </el-pagination>
            </div>
        </div>
        <add-new-template :dialogFormVisible="dialogFormVisible" @closeDialog="closeDialog"></add-new-template>
    </div>
</template>
<style lang="">
    .schoolCalendarList {
        text-align: left;
    }
    .schoolCalendarList table td,th{
        text-align: center !important;
    }
</style>
<script>
import addNewTemplate from '@/components/systemmanagement/SchoolCalendar/addNewTemplate'
export default {
    data(){
        return {
            dialogFormVisible:true,
            year:2018,
            template_name:'你好',
            tableData:[{
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222'
            },{
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222'
            },
            {
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222'
            },{
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222'
            },
            {
                date:'2019',
                name:'1111',
                province:'sss',
                city:'22222'
            }]
        }
    },
    methods:{
        addNewTemplate(){
            this.dialogFormVisible = true;
        },
        closeDialog(res){
            console.log(res)
            this.dialogFormVisible = res;
        },
        
    },
    components:{
        addNewTemplate
    }
}
</script>