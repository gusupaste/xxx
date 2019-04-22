<template>
    <div class="wrap fileDetail">
        <p>You Are Here  ：学生档案  >  <span class="font-cl-blue">档案详情</span></p>
        <div class="mt26">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <basic-info></basic-info>
                </el-tab-pane>
                <el-tab-pane label="家长信息" name="second">
                    <parent-info></parent-info>
                </el-tab-pane>
                <el-tab-pane label="免役记录" name="third">
                    <immunological-record></immunological-record>
                </el-tab-pane>
                <el-tab-pane label="医疗病史" name="fourth">
                    <medical-history></medical-history>
                </el-tab-pane>
                <el-tab-pane label="学生账单" name="fifth">
                    <student-discount></student-discount>
                </el-tab-pane>
                <el-tab-pane label="过敏记录" name="sixth">
                    <allergy-record></allergy-record>
                </el-tab-pane>
                <el-tab-pane label="附件" name="seventh">
                    <enclosure></enclosure>
                </el-tab-pane>
            </el-tabs>
        </div>
        <router-view></router-view>
    </div>
</template>
<style lang="">
    .fileDetail .el-tabs__nav-wrap {
        width: 50%;
        margin:0 auto;
    }
    .fileDetail .has-gutter th {
        background-color: #f5f5f5 !important;
        }
    .fileDetail .el-tabs__active-bar {
        background-color:#f17128;
        height: 3px;;
    }
    /* .fileDetail .el-tabs__content {
        display: none;
    } */
    .fileDetail .el-tabs__item.is-active {
        color:#f17128;
        font-weight: 600;
    }
    .fileDetail .el-tabs__item {
        width: 150px;
        text-align: center;
    }
    .fileDetail .el-tabs__nav-wrap {
        width: 80%;
    }
    .fileDetail .el-tabs__item:hover {
        color:#f17128;
        font-weight: 600;
    }
    .fileDetail .el-tabs__nav-wrap::after {
        display: none;
    }
    .fileDetail .el-tabs__header {
        border-bottom: 2px solid #dedede;
    }
</style>
<script>
import AllergyRecord from './allergyRecord';
import BasicInfo from './basicInfo';
import ParentInfo from './parentInfo';
import ImmunologicalRecord from './immunologicalRecord';
import MedicalHistory from './medicalHistory';
import StudentDiscount from './studentDiscount';
import Enclosure from './enclosure';
export default {
    data(){
        return {
            activeName: 'first'
        }
    },
    components:{
        AllergyRecord,
        BasicInfo,
        ParentInfo,
        ImmunologicalRecord,
        MedicalHistory,
        StudentDiscount,
        Enclosure
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab)
        // this.$router.push('/studentFile/studentFileDetail/9/basicInfo/')
      }
    }
}
</script>