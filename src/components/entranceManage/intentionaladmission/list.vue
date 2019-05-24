<template>
    <div class="intentionalAdmissionlist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 入学管理 > <span class="font-cl-blue">意向入学缴费</span></p>
      </div>
      <div class="content">
        <div class="select-header">
          <el-input v-model="input" placeholder="输入学号、学生姓名或者学生卡号" style="width: 25%;"></el-input>
          <span class="padding-left-30"><el-button type="primary" @click="getList">搜索</el-button></span>
        </div>
        <div class="list-content">
          <el-table
            :data="tableDate"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 10px;">
            <el-table-column
              prop="student_name"
              label="学生姓名">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="intent_class_id"
              label="申请就读班级">
            </el-table-column>
            <el-table-column
              prop="intent_school_date"
              label="计划入学时间">
            </el-table-column>
            <el-table-column
              prop="customer_name"
              label="联系人">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="creation_date"
              label="创建日期">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                  <router-link to="/financemanagement/edit/9">
                    <span style="padding:0 20px;border-right:1px solid #e3e3e3">
                        <i class="fa fa-pencil font-size-20 orange"></i>
                    </span>
                  </router-link>
                  <router-link to="/financemanagement/dollar/9">
                    <span style="padding:0 20px;">
                        <i class="fa fa-dollar font-size-20 green"></i>
                    </span>
                  </router-link>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        tableDate:[],
        input:'',
        activeName:'first',
      };
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList:function () {
        this.loading = true
        var url = '/api/student/potential_student/';
        if(this.input !== ''){
          url = url + '?search=' + this.input;
        }
        this.$axios.get(url).then(res => {
          this.loading = false
          if (res.status === 200) {
            this.tableDate = res.data.results;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      handleClose (){

      },
      searchList: function() {

      },
      editSchool:function (param,index) {
          this.$router.push('/financemanagement/billDetail');
      }
    }
  }
</script>

<style scoped>
  .intentionalAdmissionlist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .intentionalAdmissionlist .bold{
    font-weight: bold;
    color: black;
  }
  .intentionalAdmissionlist .content{
    margin-top: 10px;
  }
  .intentionalAdmissionlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
  .intentionalAdmissionlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  /*.intentionalAdmissionlist >>> .select-header,.intentionalAdmissionlist .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .intentionalAdmissionlist >>> .el-select{
    width: 10%;
  }
  .intentionalAdmissionlist >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .intentionalAdmissionlist >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .intentionalAdmissionlist >>> .el-table td, .el-table th{
    text-align: center;
  }
  .intentionalAdmissionlist >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .intentionalAdmissionlist >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .intentionalAdmissionlist >>> #tab-first{
    margin-left: -150px;
  }
  .intentionalAdmissionlist .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .intentionalAdmissionlist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
  .intentionalAdmissionlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  */
</style>
