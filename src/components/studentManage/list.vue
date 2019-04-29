<template>
  <div class="studengManage wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE :<span class="font-cl-blue">学生管理</span></p>
    </div>
    <div class="content">
      <div class="content-list">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="在校生" name="first">
            <div class="select-header">
              <span>城际</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>区域</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>省市</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>品牌</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>校园</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>班级</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>学生性别</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>类型</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>入学日期</span>
              <el-date-picker
                v-model="value9"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2010-10-01">
              </el-date-picker>
              <span>搜索</span>
              <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
              <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
            </div>
            <div class="list-content">
              <div class="studentFileCard left" v-for="(item , index) in list " :key="index">
                <div style="padding:20px" @click="$router.push('/studentFile/studentFileDetail/9')">
                  <div class="avatar inline-block">
                    <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o" aria-hidden="true"></i>
                  </div>
                  <div class="card-content inline-block">
                    <p>
                      <span style="font-size:15px;font-weight:600">学生A</span>
                      <!--<i style="font-size:15px;color:#ff7f7f;" class="fa fa-mars" aria-hidden="true"></i>-->
                      <i style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
                    </p>
                    <p>出生日期：1020/11/09</p>
                    <p>意向学年：00000</p>
                    <p>意向信息：北京校园</p>
                    <p>拟入学日期：1020/11/09</p>
                  </div>
                </div>
                <div class="card-footer clearfix">
                  <span>执行操作</span>
                  <el-select v-model="nameSelect" @change="operationSelect(nameSelect)" placeholder="--请选择--">
                    <el-option
                      v-for="item in operations"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="毕业生" name="second">
            <div class="select-header">
              <span>城际</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>区域</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>省市</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>品牌</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>校园</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>班级</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>学生性别</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>类型</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>入学日期</span>
              <el-date-picker
                v-model="value9"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2010-10-01">
              </el-date-picker>
              <span>搜索</span>
              <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
              <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
            </div>
            <div class="list-content">
              <div class="studentFileCard left" v-for="(item , index) in list " :key="index">
                <div style="padding:20px" @click="$router.push('/studentFile/studentFileDetail/9')">
                  <div class="avatar inline-block">
                    <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o" aria-hidden="true"></i>
                  </div>
                  <div class="card-content inline-block">
                    <p>
                      <span style="font-size:15px;font-weight:600">学生A</span>
                      <!--<i style="font-size:15px;color:#ff7f7f;" class="fa fa-mars" aria-hidden="true"></i>-->
                      <i style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
                    </p>
                    <p>出生日期：1020/11/09</p>
                    <p>意向学年：00000</p>
                    <p>意向信息：北京校园</p>
                    <p>拟入学日期：1020/11/09</p>
                  </div>
                </div>
                <div class="card-footer clearfix">
                  <span>执行操作</span>
                  <el-select v-model="nameSelect" @change="operationSelect(nameSelect)" placeholder="--请选择--">
                    <el-option
                      v-for="item in operations"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="离园生" name="third">
            <div class="select-header">
              <span>城际</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>区域</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>省市</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>品牌</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>校园</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>班级</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>学生性别</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>类型</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>入学日期</span>
              <el-date-picker
                v-model="value9"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2010-10-01">
              </el-date-picker>
              <span>搜索</span>
              <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
              <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
            </div>
            <div class="list-content">
              <div class="studentFileCard left" v-for="(item , index) in list " :key="index">
                <div style="padding:20px" @click="$router.push('/studentFile/studentFileDetail/9')">
                  <div class="avatar inline-block">
                    <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o" aria-hidden="true"></i>
                  </div>
                  <div class="card-content inline-block">
                    <p>
                      <span style="font-size:15px;font-weight:600">学生A</span>
                      <!--<i style="font-size:15px;color:#ff7f7f;" class="fa fa-mars" aria-hidden="true"></i>-->
                      <i style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
                    </p>
                    <p>出生日期：1020/11/09</p>
                    <p>意向学年：00000</p>
                    <p>意向信息：北京校园</p>
                    <p>拟入学日期：1020/11/09</p>
                  </div>
                </div>
                <div class="card-footer clearfix">
                  <span>执行操作</span>
                  <el-select v-model="nameSelect" @change="operationSelect(nameSelect)" placeholder="--请选择--">
                    <el-option
                      v-for="item in operations"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="毕业班学生" name="fore">
            <div class="select-header">
              <span>城际</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>区域</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>省市</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>品牌</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>校园</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>班级</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>学生性别</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>类型</span>
              <el-select v-model="nameSelect" placeholder="--请选择--">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span>入学日期</span>
              <el-date-picker
                v-model="value9"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                default-value="2010-10-01">
              </el-date-picker>
              <span>搜索</span>
              <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
              <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
            </div>
            <div class="list-content">
              <div class="studentFileCard left" v-for="(item , index) in list " :key="index">
                <div style="padding:20px" @click="$router.push('/studentFile/studentFileDetail/9')">
                  <div class="avatar inline-block">
                    <i style="font-size:80px;color:#ddd;line-height: 120px" class="fa fa-user-circle-o" aria-hidden="true"></i>
                  </div>
                  <div class="card-content inline-block">
                    <p>
                      <span style="font-size:15px;font-weight:600">学生A</span>
                      <!--<i style="font-size:15px;color:#ff7f7f;" class="fa fa-mars" aria-hidden="true"></i>-->
                      <i style="font-size:15px;color:#ff7f7f;" class="fa fa-venus" aria-hidden="true"></i>
                    </p>
                    <p>出生日期：1020/11/09</p>
                    <p>意向学年：00000</p>
                    <p>意向信息：北京校园</p>
                    <p>拟入学日期：1020/11/09</p>
                  </div>
                </div>
                <div class="card-footer clearfix">
                  <span>执行操作</span>
                  <el-select v-model="nameSelect" @change="operationSelect(nameSelect)" placeholder="--请选择--">
                    <el-option
                      v-for="item in operations"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="学生统计" name="five">
            <div class="left" style="width:29%">
              <p>在校生情况</p>
              <div class="studentInfo">
                <p>当前在校生人数：<span>28900</span></p>
                <p>预备生人数：<span>28900</span></p>
                <p>满园率（包含预备生）：<span>28900</span></p>
              </div>
              <p style="margin-top: 15px">性别分布图（包含预备生）</p>
              <div class="studentInfo">
                <chart ref="chart1" :options="orgOptions"></chart>
              </div>
            </div>
            <div class="right" style="width:70%">
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 35px;">
                <el-table-column
                  prop="code"
                  label="班级名称">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="满班学生数">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="当前在校生人数">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="预备生人数">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="满班率（含预备生）">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!--<el-table
          :data="templateList"
          stripe
          border
          show-header
          :span-method="objectSpanMethod"
          style="width: 100%;margin-top: 20px;">
          <el-table-column
            prop="pname"
            label="家长姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sname"
            label="学生姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="school_name"
            label="通讯地址">
          </el-table-column>
          <el-table-column
            prop="yb"
            label="邮编"
            width="100">
          </el-table-column>
          <el-table-column
            prop="emil"
            label="邮箱"
            width="100">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="家庭电话"
            width="100">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            width="100">
          </el-table-column>
          <el-table-column
            prop="term"
            label="紧急联系级别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="setting"
            label="账号设置"
            width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="30">
            <template slot-scope="scope">
              <el-button class="red" type="text" size="small" @click="editbrandVisible = true">
                <span class="el-icon-edit-outline" style="font-size: 20px;color: #ED6C2E;"></span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>-->
      </div>
    </div>
    <el-dialog title="修改家长资料" :visible.sync="editbrandVisible" width="780px" class="editParent">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="家长姓名">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关系">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国籍">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="工作单位">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="担任职位">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮件">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="办公电话">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="移动电话">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="家庭电话">
              <el-input v-model="editForm.pname" placeholder="" maxlength="15"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="紧急联系级别" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首选联系方式" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="家长第一语言" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="家长第二语言" label-width="110">
              <el-select v-model="editForm.relevance" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <hr><br>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="checked">设置账号</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号" label-width="40">
              <span v-model="editForm.pname">123567125647154(默认手机号)</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <span v-model="editForm.pname">123456</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editbrandVisible = false">取 消</el-button>
          <el-button type="success" @click="editbrandVisible = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  .studengManage .header p{
    font-size: 14px;
  }
  .studengManage{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .studengManage .content{
    min-height: 20px;
    width: 100%;
    margin-top: 10px;
  }
  .studengManage el-select{
    width: 10%;
  }
  .studengManage .select-header{
    margin-bottom: 20px;
  }
  .studengManage >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .studengManage .el-input{
    width: 180px;
  }
  .studengManage >>> .el-dialog__footer{
    text-align: center;
  }
  .studengManage >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .studengManage >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .studengManage >>> .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .studengManage >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .studengManage >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .studengManage >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .studengManage >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .studengManage >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .studengManage >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .studengManage >>> #tab-first{
    margin-left: -350px;
  }
  .studengManage >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
  .studengManage .studentFileCard {
    cursor: pointer;
    margin-right: 5%;
    margin-bottom: 40px;
    border: 1px solid #ECECEC;
    width: 27%;
    font-size: 12px;
    -webkit-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    -moz-box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
    box-shadow: rgba(11,98,137,.2) 0px 0px 4px;
  }
  .studengManage .studentFileCard .card-content{
    margin-left: 20px;
    vertical-align: top;
    line-height: 25px;
  }
  .studengManage .studentFileCard .card-content .studentType{
    background-color: #ED6C2E;
    border-radius: 5px;
    color: #fff;
    padding: 2px 5px;
  }
  .studengManage .studentFileCard .card-footer{
    background-color: #ECECEC;
    padding: 10px;
    font-size: 12px;
    color:#fff;
  }
  .studengManage .studentFileCard .card-footer span {
    display: inline-block;
    text-align: center;
    width: 28%;
    line-height: 17px;
  }
  .studengManage .studentFileCard  img{
    width: 100px;
    height: 100px;
  }
  .studengManage .studentInfo{
    border: 1px solid #ddd;
    width: 90%;
    padding: 20px;
    margin-top: 15px;
  }
  .studengManage .studentInfo p{
    line-height: 40px;
  }
</style>
<script>

export default {
  data(){
    return {
      activeName:'first',
      editbrandVisible:false,
      orgOptions: {},
       list:[1,2,3,4,5,6,7,81,],
       form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      editForm:{
        id:'',
        name:'',
        relevance:'',
      },
      templateList: [
        {
          id:1,
          pname:'家长姓名',
          sname:'学生姓名',
          school_name:'北京朝阳区xxx幼儿园',
          yb:'100000001',
          emil:'1000000000@qq.com',
          tel:'1947298374823',
          phone:'86528736',
          term:'第一级别',
          setting:'----',
        },
        {
          id:2,
          pname:'学生姓名',
          sname:'学生姓名',
          school_name:'北京朝阳区xxx幼儿园',
          yb:'100000001',
          emil:'1000000000@qq.com',
          tel:'1947298374823',
          phone:'86528736',
          term:'第一级别',
          setting:'----',
        },
      ],
    }
  },
  mounted() {
    this.orgOptions = {
      series : [
        {
          type: 'pie',
          radius : '40%',
          center: ['27%', '25%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
          ],
        }
      ]
    }
  }
}
</script>
