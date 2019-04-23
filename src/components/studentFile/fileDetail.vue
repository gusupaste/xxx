<template>
    <div class="wrap fileDetail">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 学生档案 > <span class="font-cl-blue">档案详情</span></p>
      </div>
        <div class="mt26">
            <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left">
                <el-tab-pane :label="activeList.basic_info" name="first">
                    <basic-info></basic-info>
                </el-tab-pane>
                <el-tab-pane :label="activeList.parent_info" name="second">
                    <parent-info></parent-info>
                </el-tab-pane>
                <el-tab-pane :label="activeList.immunological_record" name="third">
                    <immunological-record></immunological-record>
                </el-tab-pane>
                <el-tab-pane :label="activeList.medical_history" name="fourth">
                    <medical-history></medical-history>
                </el-tab-pane>
                <el-tab-pane :label="activeList.student_discount" name="fifth">
                    <student-discount></student-discount>
                </el-tab-pane>
                <el-tab-pane :label="activeList.allergy_record" name="sixth">
                    <allergy-record></allergy-record>
                </el-tab-pane>
                <el-tab-pane :label="activeList.attendance" name="seventh">
                    <allergy-record></allergy-record>
                </el-tab-pane>
                <el-tab-pane :label="activeList.enclosure" name="eigth">
                    <enclosure></enclosure>
                </el-tab-pane>
            </el-tabs>
        </div>
        <router-view></router-view>
    </div>
</template>
<style scoped>
    .fileDetail .el-tabs__nav-wrap {
        width: 50%;
        margin:0 auto;
    }
    .fileDetail .has-gutter th {
        background-color: #f5f5f5 !important;
        }
    .fileDetail >>> .el-tabs__active-bar {
        background-color:#fff !important; 
    }
    /* .fileDetail .el-tabs__content {
        display: none;
    } */
    .fileDetail >>> .el-tabs__item.is-active {
        color:#fff;
        font-weight: 600;
    }
    .fileDetail >>> .el-tabs__item {
        width: 150px;
        text-align: center;
        color: #3b3b3b;
        font-weight: 500;
        height: 60px;
    }
    .fileDetail >>> .el-tabs__nav-wrap {
        width: 80%;
    }
    .fileDetail >>> .el-tab-pane {
        border: 1px solid #bbb;
        padding:20px 20px;
    }
    .fileDetail >>> .el-tabs__item:hover {
        color:#f17128;
    }
    .fileDetail .el-tabs__nav-wrap::after {
        display: none;
    }
    .fileDetail .el-tabs__header {
        border-bottom: 2px solid #dedede;
    }
    .fileDetail .enroll-info .el-input__inner {
        padding: 0 18px;
    }
    .fileDetail .speciality .el-textarea__inner {
        width: 630px;
        min-height: 150px !important;
    }
    .fileDetail .el-input__inner {
        padding: 0 30px;
    }
    .fileDetail th ,.fileDetail td {
        text-align: center !important;
    }
    .fileDetail .recordHead {
        border-bottom: 1px solid #bbb;
        color:#101010;
        font-size: 14px;
        font-weight: 600;
        padding: 10px;
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
            activeList:{
                basic_info:'基本信息',
                parent_info:'家长信息',
                immunological_record:'免疫记录',
                attendance:'学生考勤',
                medical_history:'医疗病史',
                student_discount:'学生账单',
                allergy_record:'过敏记录',
                enclosure:'附件',
            },
            activeName: localStorage.getItem('tabName') || 'first'
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
            localStorage.setItem('tabName',tab.name);
      }
    }
}
</script>
