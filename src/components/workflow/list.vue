<template>
  <div class="workflowlist wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : <span class="font-cl-blue">工作流 </span></p>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="我的审批任务" name="first">
          <div class="select-header">
            <span>审批状态：</span>
            <el-select v-model="approve_status" placeholder="--请选择--" @change="getApproveList(1)">
              <el-option
                v-for="item in approveStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="padding-left-30">搜索：</span>
            <el-input v-model="name" placeholder="输入科目编码或名称" class="search_input"></el-input>
            <span class="padding-left-30"><el-button type="primary" @click="getApproveList(1)">搜索</el-button></span>
          </div>
          <el-table
            :data="approveList"
            border
            stripe
            show-header
            style="width: 100%;margin-top: 10px;">
            <el-table-column
              prop="form_title"
              label="流程名称">
            </el-table-column>
            <el-table-column
              prop="apply_user__display_name"
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
              prop="form_status"
              label="表单状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small"
                           @click="approveDetail(0,scope.row.form_id,scope.row.form_kind_id,scope.row.approve_level,scope.row.form_kind__code)">
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev,pager, next, jumper"
            next-text="下一页"
            :page-size="pagesize"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :total="total" class="page">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="我发起的工作流" name="second">
          <div class="select-header">
            <span>审批状态：</span>
            <el-select v-model="approve_status" placeholder="--请选择--" @change="getApplyList">
              <el-option
                v-for="item in approveStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="padding-left-30">搜索：</span>
            <el-input v-model="name" placeholder="输入科目编码或名称" class="search_input"></el-input>
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
              label="流程名称">
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
              prop="approve_user_name"
              label="审批人">
            </el-table-column>
            <el-table-column
              prop="date_updated"
              label="任务分配时间">
            </el-table-column>
            <el-table-column
              prop="form_status"
              label="审批状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
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
            layout="prev,pager, next, jumper"
            next-text="下一页"
            :page-size="pagesize2"
            :current-page="currentPage2"
            @current-change="handleCurrentChange2"
            :total="total2" class="page">
          </el-pagination>
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
        applyList: [],
        pagesize: 10,
        currentPage: 1,
        total: 1,
        pagesize2: 10,
        currentPage2: 1,
        total2: 1
      }
    },
    mounted: function () {
      this.approve_status = this.approveStatusList[0].id
      this.getApproveList(1)
    },
    watch: {
      currentPage () {
        this.getApproveList(this.currentPage)
      },
      currentPage2 () {
        this.getApplyList(this.currentPage2)
      }
    },
    methods: {
      getApproveList: function (val) {
        this.currentPage = val
        this.loading = true
        this.$axios.get('/api/workflow/workflow_management/approve_list/?name=' + this.name + '&approve_status=' + this.approve_status + '&page=' + this.currentPage + '&size=' + this.pagesize).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.approveList = res.data.data.results
            this.total = res.data.data.count
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getApplyList: function (val) {
        this.currentPage2 = val
        this.loading = true
        this.$axios.get('/api/workflow/workflow_management/apply_list/?name=' + this.name + '&approve_status=' + this.approve_status + '&page=' + this.currentPage2 + '&size=' + this.pagesize2).then(res => {
          this.loading = false
          if (res.data.status_code === 1) {
            this.applyList = res.data.data.results
            this.total2 = res.data.data.count
          }
        }).catch(err => {
          console.log(err)
        })
      },
      approveDetail: function (status, formId, formKindId, approveLevel, formKindCode) {
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
      handleClick: function (val) {
        this.approve_status = this.approveStatusList[0].id
        this.name = ''
        if (val === 'second') {
          this.getApplyList(1)
        } else {
          this.getApproveList(1)
        }
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage
      },
      handleCurrentChange2: function (currentPage2) {
        this.currentPage2 = currentPage2
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
