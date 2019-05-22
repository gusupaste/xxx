<template>
    <div class="paymentprocessing wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">缴费处理</span></p>
      </div>
      <div class="content">
        <div class="list-content">
          <div class="select-header">
            <span>学年：</span>
            <el-select v-model="nameSelect" placeholder="--请选择--" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="ml20">账单类型：</span>
            <el-select v-model="nameSelect" placeholder="--请选择--" >
              <el-option ></el-option>
            </el-select>
            <span class="ml20">账单状态：</span>
            <el-select v-model="nameSelect" placeholder="--请选择--" >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="ml20">学生：</span>
            <el-input v-model="input" class="search_input" placeholder="输入科目编码或名称" style="width: 220px;"></el-input>
            <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
            <!--<span class="right" style="cursor:pointer" @click="addNewTemplate(0)">
              <i class="icon-font fa fa-calendar-plus-o"></i>
              <span class="font-cl-blue font-size-14" >新增费用科目</span>
          </span>-->
          </div>
          <el-table
            ref="multipleTable"
            :data="chargeTableDate"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection">
            </el-table-column>
            <el-table-column
              prop="code"
              label="账单类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="学生姓名">
            </el-table-column>
            <el-table-column
              prop="intercity_name"
              label="学年">
            </el-table-column>
            <el-table-column
              prop="intercity_name"
              label="折前金额">
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="缴费金额">
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="使用备用金金额">
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="缴费日期">
            </el-table-column>
            <el-table-column
              prop="hq_name"
              label="状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button class="red" type="text" size="small" @click="editSchool">
                  <span class="el-icon-edit-outline" style="font-size: 20px;color: #ED6C2E;"></span>
                </el-button>
                <span style="color: #999999">|</span>
                <el-button class="red" type="text" size="small" @click="showInfo">
                  <span class="el-icon-search" style="font-size: 20px;color: #ED6C2E;"></span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
        options1:[],
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
        chargeTableDate:[],
        chargeFunTableDate:[],
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
        templateList: [],
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
      editSchool:function () {
        this.$router.push('/financemanagement/payBillDetail');
      },
      showInfo:function () {
        this.$router.push('/financemanagement/billInfo');
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
  .paymentprocessing{
    text-align: left;
  }
  .paymentprocessing >>> .search_input .el-input__inner{
    width: 100%;
  }
  .paymentprocessing .bold{
    font-weight: bold;
    color: black;
  }
  .paymentprocessing .list-content{
    margin-top: 20px;
  }
  .paymentprocessing .select-header,.paymentprocessing .list-content{
    width: 100%;
    min-height: 50px;
  }
  .paymentprocessing >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .paymentprocessing >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .paymentprocessing >>> .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 2px solid #ED6C2E !important;
  }
  .paymentprocessing >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .paymentprocessing >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .paymentprocessing >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .paymentprocessing >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .paymentprocessing >>> #tab-first{
     margin-left: -350px;
   }
  .paymentprocessing >>> .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .paymentprocessing .el-textarea{
    width: 95% !important;
  }
  .paymentprocessing .el-radio__input{
    line-height: 3.5 !important;
  }
  .paymentprocessing >>> .el-dialog__footer{
    text-align: center;
  }
  .paymentprocessing .deleteFee >>> .el-dialog__body{
    text-align: center;
  }
  .paymentprocessing .discountDialog .el-checkbox-group{
    display: -webkit-box;
  }
  .paymentprocessing .discountShow .el-form-item{
    margin-bottom: 0px !important;
  }
  .paymentprocessing .discountShow .el-form-item__label{
    width: 120px !important;
  }
  .paymentprocessing .discountShow >>> .el-form-item__content{
    display: -webkit-box;
    margin-left: 120px !important;
  }
  .paymentprocessing >>> .discountShow .el-dialog__body{
    padding-top: 5px !important;
  }
  .paymentprocessing .select-header, .settinglist .list-content{
    min-height: 50px;
  }
  .paymentprocessing .policyClass{
    width: 100%;
    min-height: 50px;
  }
  .paymentprocessing .policyClass p{
    color: #333333;
    font-size: 15px;
    font-weight: bold;
  }
  .paymentprocessing .policyClass span{
    color: #bbbbbb;
    font-size: 10px;
  }
  .paymentprocessing .policyClass .button_color{
    border-color: #006287;
    color: #006287;
  }
  .paymentprocessing .copyPolicyShow .el-select{
    width: 80%;
  }
  .paymentprocessing >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center;
  }
  .paymentprocessing >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
</style>
