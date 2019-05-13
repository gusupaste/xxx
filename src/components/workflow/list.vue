<template>
  <div class="workflowlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">工作流 </span></p>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="我的审批任务" name="first">
          <div class="select-header">
            <span>审批状态</span>
            <el-select v-model="approve_status" placeholder="--请选择--" style="width: 20%;" @change="getApproveList">
              <el-option
                v-for="item in approveStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span>搜索</span>
            <el-input v-model="name" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
            <span class="padding-left-30"><el-button type="primary" @click="getApproveList">搜索</el-button></span>
          </div>
          <el-table
            :data="approveList"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 10px;">
            <el-table-column
              prop="form_title"
              label="流程名称"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="apply_user__display_name"
              label="发起人"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="date_created"
              label="流程创建时间"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="approve_user_role_name"
              label="当前节点"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="form_status"
              label="表单状态"
              min-width="180">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small"
                           @click="approveDetail(0,scope.row.form_id,scope.row.form_kind_id,scope.row.approve_level)">查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我发起的工作流" name="second">
          <div class="select-header">
            <span>审批状态</span>
            <el-select v-model="approve_status" placeholder="--请选择--" style="width: 20%;" @change="getApplyList">
              <el-option
                v-for="item in approveStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span>搜索</span>
            <el-input v-model="name" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
            <span class="padding-left-30"><el-button type="primary" @click="getApplyList">搜索</el-button></span>
          </div>
          <el-table
            :data="applyList"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 10px;">
            <el-table-column
              prop="form_title"
              label="流程名称"
              min-width="220">
            </el-table-column>
            <el-table-column
              prop="date_created"
              label="流程创建时间"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="approve_user_role_name"
              label="当前节点"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="approve_user_name"
              label="审批人"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="date_updated"
              label="任务分配时间"
              min-width="180">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template slot-scope="scope">
                <el-button type="text" size="small"
                           @click="approveDetail(1,scope.row.form_id,scope.row.form_kind_id,scope.row.approve_level)">查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        approve_status: '',
        approveStatusList: [
          {
            id: -1,
            name: '-所有-'
          },
          {
            id: 0,
            name: '待审批'
          },
          {
            id: 1,
            name: '已批准'
          },
          {
            id: 2,
            name: '已拒绝'
          }
        ],
        name: '',
        activeName: 'first',
        approveList: [],
        applyList: []
      }
    },
    mounted: function () {
      this.approve_status = this.approveStatusList[0].id
      this.getApproveList()
    },
    methods: {
      getApproveList: function () {
        this.loading = true
        this.$axios.get('/api/workflow/workflow_management/approve_list/?name=' + this.name + '&approve_status=' + this.approve_status + '&page=1&size=10').then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.approveList = res.data.data.results
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getApplyList: function () {
        this.loading = true
        this.$axios.get('/api/workflow/workflow_management/apply_list/?name=' + this.name + '&approve_status=' + this.approve_status + '&page=1&size=10').then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.applyList = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      approveDetail: function (status, formId, formKindId, approveLevel) {
        this.$router.push({
          name: 'workflowDetail',
          query: {status: status, formId: formId, formKindId: formKindId, approveLevel: approveLevel}
        })
      },
      handleClick: function (val) {
        this.approve_status = this.approveStatusList[0].id
        this.name = ''
        if (val === 'second') {
          this.getApplyList()
        } else {
          this.getApproveList()
        }
      }
    }
  }
</script>

<style scoped>
  .workflowlist {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .workflowlist .content {
    margin-top: 10px;
  }

  .workflowlist >>> .el-input__inner {
    width: -webkit-fill-available;
  }

  /*.workflowlist >>> .el-menu.el-menu--horizontal{
    padding-left: 50%;
  }*/
  .workflowlist >>> .el-tabs__item {
    width: 150px;
    text-align: center;
  }

  .workflowlist >>> .el-tabs__nav-scroll {
    padding-left: 50%;
  }

  .workflowlist >>> #tab-first {
    margin-left: -150px;
  }

  .workflowlist >>> .el-tabs__item.is-active {
    border-bottom: 2px solid #ED6C2E !important;
  }

  .workflowlist >>> .el-tabs__item {
    padding: 0 0 !important;
  }

  .workflowlist >>> .el-tabs__active-bar {
    background-color: #ED6C2E;
    width: 0px !important;
  }

  .workflowlist >>> .el-tabs__item:hover {
    color: #ED6C2E;
  }

  .workflowlist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }

  .workflowlist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
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
