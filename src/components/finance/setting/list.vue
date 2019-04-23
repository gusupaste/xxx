<template>
    <div class="settinglist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">财务设置</span></p>
      </div>
      <div class="content">
        <div class="list-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="费用科目" name="first">
              <div class="select-header">
                <span>科目属性</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 20%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>搜索科目</span>
                <el-input v-model="input" placeholder="输入科目编码或名称" style="width: 25%;"></el-input>
                <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
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
                    <span style="color: #999999">|</span>
                    <el-button class="red" type="text" size="small" @click="deleteFeeVisible = true">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="普通折扣" name="second">
              <div class="select-header" style="min-height: 35px;">
                <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="font-cl-blue font-size-14" >新增折扣类型</span>
              </span>
              </div>
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;">
                <el-table-column
                  prop="code"
                  label="折扣类型"
                  width="220">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="适用校园">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="互斥折扣"
                  width="300">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showDiscountVisible = true">查看详情</el-button>
                    <span style="color: #999999">|</span>
                    <el-button style="color: orange" type="text" size="small" @click="addNewDiscount(1)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="招生折扣" name="third">
              <div class="select-header" style="min-height: 35px;line-height: 35px;margin-bottom: 10px;">
                <span class="right" style="cursor:pointer" @click="addNewDiscount(0)">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="font-cl-blue font-size-14" >新增折扣类型</span>
              </span>
              </div>
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;">
                <el-table-column
                  prop="code"
                  label="折扣类型"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="生效日期"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="失效日期"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="缴费区间"
                  min-width="160">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="适用校园">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="互斥折扣"
                  min-width="160">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showDiscountVisible = true">查看详情</el-button>
                    <span style="color: #999999">|</span>
                    <el-button style="color: orange" type="text" size="small" @click="addNewDiscount(1)">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="收费政策" name="fore">
              <div class="select-header select-length">
                <span>城际：</span>
                <el-select v-model="nameSelect" placeholder="--区域--">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin-left: 10px">区域：</span>
                <el-select v-model="nameSelect" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin-left: 10px">校园：</span>
                <el-select v-model="nameSelect" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin-left: 10px">学年：</span>
                <el-select v-model="nameSelect" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
              </div>
              <el-table
                :data="chargeFunTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="收费政策"
                  width="250">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showPolicyVisible = true">{{ scope.row.code }}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="适用校园">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="学年"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="有效期"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="opening_date"
                  label="发布日期"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="leader"
                  label="备注">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="innerVisible = true" style="color: #ED6C2E">复制</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="退费政策" name="five">
              <p>
                <span class="font-cl-blue">退费：</span>
                <span style="cursor:pointer;color:#ED6C2E" @click="addNewReservefund(0)">
                  <i class="icon-font fa fa-calendar-plus-o" style="font-size: 15px !important;"></i>
                  <span class="font-size-14">添加学校</span>
                </span>
              </p>
              <el-table
                :data="chargeTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="学校"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="班级项目"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="退费费用科目">
                  <template slot-scope="scope">
                    <el-checkbox-group v-model="type" style="text-align: left !important;">
                      <el-checkbox label="美食" name="type"></el-checkbox>
                      <el-checkbox label="地推" name="type"></el-checkbox>
                      <el-checkbox label="线下" name="type"></el-checkbox>
                      <el-checkbox label="单纯" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="130">
                  <template slot-scope="scope">
                    <el-button type="text" size="small"  @click="addNewReservefund(1)" style="color: #0b6289">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog :title="feeName" :visible.sync="addFeeVisible" width="600px">
        <el-form ref="feeForm" :model="feeForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="科目名称">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="科目属性">
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 100%;">
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
              <el-form-item label="科目类型">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="科目编码">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否必须">
                <el-input v-model="feeForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="应用范围">
                  <el-radio v-model="radio" label="1" @change="changeRadio(1)">所有校园</el-radio><br>
                  <el-radio v-model="radio" label="2" @change="changeRadio(2)">指定校园</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item style="margin-left:-80px;padding-top: 40px;">
                <span>品牌：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;" v-bind:disabled="disabledSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>城际：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;" v-bind:disabled="disabledSelect">
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
            <el-col :span="24">
              <el-form-item>
                <el-table
                  :data="templateList"
                  border
                  :show-header="false"
                  style="width: 95%;margin-top: 20px;">
                  <el-table-column
                    prop="id"
                    width="50">
                    <el-checkbox v-model="checked" v-bind:disabled="disabledSelect"></el-checkbox>
                  </el-table-column>
                  <el-table-column
                    prop="sname">
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注说明">
                <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="feeForm.remarks">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="addFeeVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="删除费用科目" :visible.sync="deleteFeeVisible" width="450" class="deleteFee">
        <span>是否确认删除费用科目<span style="color:#006287">【学费】</span>？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="deleteFeeVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="discountName" :visible.sync="addDiscountVisible" width="700px" class="discountDialog">
        <el-form ref="discountForm" :model="discountForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="折扣名称">
                <el-input v-model="discountForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="属性">
                <el-input v-model="discountForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="折扣生效日期" label-width="100">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="折扣失效日期" label-width="100">
                <el-date-picker
                  v-model="value2"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="缴费区间">
                <el-date-picker
                  v-model="value9"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  default-value="2010-10-01">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="适用校园">
                <span>城际：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span>区域：</span>
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 35%;">
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
            <el-col :span="24">
              <el-form-item>
                <el-table
                  :data="templateList"
                  border
                  :show-header="false"
                  style="width: 95%;margin-top: 20px;">
                  <el-table-column
                    prop="id"
                    width="180">
                    <el-checkbox v-model="checked">【2015】金华家园</el-checkbox>
                  </el-table-column>
                  <el-table-column>
                    <el-checkbox-group v-model="type">
                      <el-checkbox label="美食" name="type"></el-checkbox>
                      <el-checkbox label="地推" name="type"></el-checkbox>
                      <el-checkbox label="线下" name="type"></el-checkbox>
                      <el-checkbox label="单纯" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="判定条件">
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 100%;">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-table
                  :data="templateList"
                  border
                  :show-header="false"
                  style="width: 95%;margin-top: 20px;">
                  <el-table-column
                    prop="id"
                    width="350">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.select" style="width: 100px;">
                        <el-option>大于</el-option>
                        <el-option>小于</el-option>
                        <el-option>大于等于</el-option>
                        <el-option>小于等于</el-option>
                        <el-option>等于</el-option>
                      </el-select>
                      <el-input v-model="scope.row.input" style="width: 90px;"></el-input>
                      <el-select v-model="scope.row.select2" style="width: 100px;">
                        <el-option>或</el-option>
                        <el-option>且</el-option>
                      </el-select>
                    </template>
                    <el-checkbox v-model="checked"></el-checkbox>
                  </el-table-column>
                  <el-table-column>
                    <template slot-scope="scope">
                      <span v-if="scope.row.id">{{ scope.row.sname }}</span>
                      <el-input v-model="scope.row.sname" v-show="scope.row.id === ''"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column width="50">
                    <template slot-scope="scope">
                      <el-button class="red" type="text" size="small" @click="deleteList(scope.row)">
                        <span class="el-icon-delete" style="font-size: 20px;color: #ED6C2E;"></span>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <span style="cursor:pointer;color: #ED6C2E;" @click="addIfElse">
                  <i class="icon-font fa fa-calendar-plus-o"></i>
                  <span class="font-size-14" >添加判断条件</span>
              </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="可叠加折扣" label-width="82">
                <el-checkbox-group v-model="discountForm.select">
                  <el-checkbox v-for="se in selectCheckbox" :label="se.name" :key="se.id" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="addDiscountVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="折扣详情预览" :visible.sync="showDiscountVisible" width="600px" class="discountShow">
        <el-form ref="discountForm" :model="discountForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="折扣名称"><span style="color: #ED6C2E;font-size: 18px;">员工中子女折扣</span></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="属性">需审批</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="折扣生效日期" label-width="100">2018-09-11</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="折扣失效日期" label-width="100">2019-99-07</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="缴费区间">2019-2018</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="适用校园">
                <span>【2015】金华校园（双语班，国际班）</span><br>
                <span>【2015】金华校园（双语班，国际班）</span><br>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="判定条件">折扣率</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <span>1.小于等于15%</span><br>
                <span>2.大于15%且小于等于30%</span><br>
                <span>3.大于30%且小于等于36%</span><br>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="可叠加折扣" label-width="82">
                <span>可叠加折扣；</span>
                <span>兄弟姐妹折扣；</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="showDiscountVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="政策详情" :visible.sync="showPolicyVisible" width="600px" class="policyShow">
        <el-form ref="policyForm" :model="policyForm" :rules="rules" label-width="80px">
          <div class="policyClass">
            <p>政策标题：{{ policyForm.title }}</p>
            <el-row>
              <el-col :span="7">
                <span>适用校园</span>
              </el-col>
              <el-col :span="7">
                <span>适用学年</span>
              </el-col>
              <el-col :span="7">
                <span>有效期</span>
              </el-col>
              <el-col :span="3">
                <el-button class="button_color" @click="innerVisible = true" style="height: auto;">复制</el-button>
              </el-col>
            </el-row>
            <br><hr><br>
            <el-table
              :data="chargeFunTableDate"
              border
              show-header
              style="width: 100%;">
              <el-table-column
                prop="code"
                label="费用项目"
                width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                label="班级类型"
                width="100">
              </el-table-column>
              <el-table-column
                prop="intercity_name"
                label="缴费方式"
                width="100">
              </el-table-column>
              <el-table-column
                prop="hq_name"
                label="适用范围">
              </el-table-column>
              <el-table-column
                prop="opening_date"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="leader"
                label="备注">
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog title="复制政策" :visible.sync="innerVisible" width="650px" class="copyPolicyShow">
        <el-form ref="policyForm" :model="policyForm" :rules="rules" label-width="80px">
          <div class="policyClass">
            <p>复制的政策：{{ policyForm.title }}</p>
          </div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="学年" label-width="40">
                <el-select v-model="nameSelect" placeholder="--请选择--">
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
              <el-form-item label="城际" label-width="40">
                <el-select v-model="nameSelect" placeholder="--请选择--">
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
              <el-form-item label="区域" label-width="40">
                <el-select v-model="nameSelect" placeholder="--请选择--">
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
            <el-col :span="24">
              <el-form-item label="学校" label-width="40">
                <el-table
                  :data="chargeFunTableDate"
                  border
                  :show-header="false"
                  style="width: 92%;">
                  <el-table-column
                    prop="code" style="text-align: left">
                    <template slot-scope="scope">
                      <el-checkbox v-model="scope.row.checked">{{ scope.row.code }}</el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDiscountVisible = false">取 消</el-button>
          <el-button type="success" @click="showDiscountVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="reservefundName" :visible.sync="reservefundVisible" width="700px">
        <el-form ref="reserveForm" :model="reserveForm" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="城际" label-width="40">
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 170px;">
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
              <el-form-item label="区域" label-width="40">
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 170px;">
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
              <el-form-item label="省份" label-width="40">
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 170px;">
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
              <el-form-item label="城市" label-width="40">
                <el-select v-model="nameSelect" placeholder="--请选择--" style="width: 170px;">
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
            <el-col :span="24">
              <el-form-item label="学校" label-width="40">
                <el-table
                  :data="templateList"
                  border
                  :show-header="false"
                  style="width: 610px;margin-top: 20px;">
                  <el-table-column
                    prop="id"
                    width="180">
                    <el-checkbox v-model="checked">【2015】金华家园</el-checkbox>
                  </el-table-column>
                  <el-table-column>
                    <el-checkbox-group v-model="type" style="text-align: left">
                      <el-checkbox label="美食" name="type"></el-checkbox>
                      <el-checkbox label="地推" name="type"></el-checkbox>
                      <el-checkbox label="线下" name="type"></el-checkbox>
                      <el-checkbox label="单纯" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="addFeeVisible = false">保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        nameSelect:[],
        options1:[{
          value: 'all',
          label: '所有'
        },{
          value: '选项4',
          label: '折扣率'
        }, {
          value: '选项5',
          label: '折扣金额'
        }],
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
        operation:[
          {
            id:1,
            name:'所有学校',
          },
          {
            id:2,
            name:'指定校园',
          }
        ],
        value1:'',
        value2:'',
        value9:'',
        input:'',
        activeName:'first',
        disabledSelect:false,
        chargeTableDate:[
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
          },
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
          }
        ],
        chargeFunTableDate:[
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
            checked:'',
          },
          {
            code:'xxxxxxxxxxxx',
            name:'31231231',
            intercity_name:'312313',
            hq_name:'31231',
            opening_date:'31231',
            leader:'31231',
            telephone:'312312',
            status_name:'12312313',
            checked:'',
          }
        ],
        addFeeVisible:false,
        deleteFeeVisible:false,
        addDiscountVisible:false,
        showDiscountVisible:false,
        showPolicyVisible:false,
        innerVisible:false,
        reservefundVisible:false,
        discountName:'新增折扣类型',
        feeName:'新增费用项目',
        reservefundName:'添加校园',
        type:[],
        discountForm:{
          id:1,
          name:'合肥御龙湾校园',
          schools:[],

          resource:1,
          select:[],
        },
        policyForm:{
          id:'',
          title:'合肥御龙湾校园2009-2010学年收费政策',
          name:'',
          remarks:'',
          resource:1,
          select:[],
        },
        feeForm:{
          id:'',
          name:'',
          remarks:'',
          resource:'1',
        },
        reserveForm:{
          id:'',
          name:'',
          remarks:'',
          resource:'1',
        },
        radio:'1',
        templateList: [
          {
            id:1,
            pname:'家长姓名1',
            sname:'学生姓名1',
            select:'',
            select2:'',
            input:'',
          },
          {
            id:2,
            pname:'家长姓名2',
            sname:'学生姓名2',
            select:'',
            select2:'',
            input:'',
          }
        ],
        selectCheckbox:[
          {
            id:1,
            name:'员工子女折扣',
          },
          {
            id:2,
            name:'园长折扣',
          },
          {
            id:3,
            name:'事业部拓展折扣',
          },
          {
            id:4,
            name:'兄弟姐妹折扣',
          },
          {
            id:5,
            name:'总经理折扣',
          },
          {
            id:6,
            name:'其他折扣',
          },
        ],
      };
    },
    methods: {
      handleClose (){

      },
      searchList: function() {

      },
      editSchool:function (param) {
        this.$router.push('/school/school-edit/'+param.id);
      },
      addNewTemplate:function (flag) {
        if(flag === 0){
          this.feeName = '新增费用科目';
        }else{
          this.feeName = '编辑费用科目';
        }
        this.addFeeVisible = true;
      },
      addNewDiscount:function (flag) {
        if(flag === 0){
          this.discountName = '新增折扣类型';
        }else{
          this.discountName = '编辑折扣类型';
        }
        this.addDiscountVisible = true;
      },
      changeRadio:function (flag) {
        if(flag === 1){
          this.disabledSelect = true;
        }else{
          this.disabledSelect = false;
        }
      },
      deleteList:function (obj) {
        this.templateList.splice(this.templateList.findIndex(item => item.id === obj.id), 1);
      },
      addIfElse:function () {
        const newObj = {
          id:'',
          pname:'',
          sname:'',
          select:'',
          select2:'',
          input:'',
        }
        this.templateList.push(newObj);
      },
      addNewReservefund:function (flag) {
        if(flag === 0){
          this.reservefundName = '添加校园';
        }else{
          this.reservefundName = '编辑校园';
        }
        this.reservefundVisible = true;
      }
    },
    watch:{
      disabledSelect: {
        handler:function (newName, oldName){
          if(this.radio === '1'){
            this.disabledSelect = true;
          }else{
            this.disabledSelect = false;
          }
        },
        immediate:true
      },
    },
  }
</script>

<style scoped>
  .settinglist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .settinglist .bold{
    font-weight: bold;
    color: black;
  }
  .settinglist .select-header,.chargelist .list-content{
    width: 100%;
    min-height: 50px;
  }
  .settinglist >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .settinglist >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .settinglist >>> .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .settinglist >>> .el-menu.el-menu--horizontal{
    padding-left: 50%;
  }
  .settinglist >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .settinglist >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .settinglist >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .settinglist >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .settinglist >>> #tab-first{
    margin-left: -350px;
  }
  .settinglist >>> .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .settinglist .el-textarea{
    width: 95% !important;
  }
  .settinglist .el-radio__input{
    line-height: 3.5 !important;
  }
  .settinglist >>> .el-dialog__footer{
    text-align: center;
  }
  .settinglist .deleteFee >>> .el-dialog__body{
    text-align: center;
  }
  .settinglist .discountDialog .el-checkbox-group{
    display: -webkit-box;
  }
  .settinglist .discountShow .el-form-item{
    margin-bottom: 0px !important;
  }
  .settinglist .discountShow .el-form-item__label{
    width: 120px !important;
  }
  .settinglist .discountShow >>> .el-form-item__content{
    display: -webkit-box;
    margin-left: 120px !important;
  }
  .settinglist >>> .discountShow .el-dialog__body{
    padding-top: 5px !important;
  }
  .settinglist .select-header, .settinglist .list-content{
    min-height: 50px;
  }
  .settinglist .policyClass{
    width: 100%;
    min-height: 50px;
  }
  .settinglist .policyClass p{
    color: #333333;
    font-size: 15px;
    font-weight: bold;
  }
  .settinglist .policyClass span{
    color: #bbbbbb;
    font-size: 10px;
  }
  .settinglist .policyClass .button_color{
    border-color: #006287;
    color: #006287;
  }
  .settinglist .copyPolicyShow .el-select{
    width: 80%;
  }
  .settinglist >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .settinglist >>> .el-input__inner {
    width: -webkit-fill-available;
  }
  .settinglist >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
</style>
