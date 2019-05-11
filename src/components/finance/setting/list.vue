<template>
    <div class="settinglist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > <span class="font-cl-blue">财务设置</span></p>
      </div>
      <div class="content mt26">
        <div class="list-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="费用科目" name="first">
                <subject :brandList="brandList" :intercityList="intercityList"></subject>
            </el-tab-pane>
            <el-tab-pane label="普通折扣" name="second">
                <normaldis :brandList="brandList" :intercityList="intercityList" :areaList="areaList" :yearList="yearList"></normaldis>
            </el-tab-pane>
            <el-tab-pane label="招生折扣" name="third">
                <recruitdis></recruitdis>
            </el-tab-pane>
            <el-tab-pane label="收费政策" name="fore">
                <charge :brandList="brandList" :intercityList="intercityList" :areaList="areaList" :yearList="yearList"></charge>
            </el-tab-pane>
            <el-tab-pane label="退费政策" name="five">
                <refund></refund>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      
      <el-dialog title="删除费用科目" :visible.sync="deleteFeeVisible" width="450" class="deleteFee">
        <span>是否确认删除费用科目<span style="color:#006287">【学费】</span>？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteFeeVisible = false">取 消</el-button>
          <el-button type="success" @click="deleteFeeVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="discountName" :visible.sync="addDiscountVisible" width="780px" class="discountDialog">
        <el-form ref="discountForm" :model="discountForm"  label-width="80px">
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
                <!--<el-table
                  :data="templateList"
                  border
                  :show-header="false"
                  style="width: 95%;margin-top: 20px;">
                  <el-table-column
                    prop="id">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.select" style="width: 90px;">
                        <el-option>大于</el-option>
                        <el-option>小于</el-option>
                        <el-option>大于等于</el-option>
                        <el-option>小于等于</el-option>
                        <el-option>等于</el-option>
                      </el-select>
                      <el-input v-model="scope.row.input" style="width: 80px;"></el-input>
                      <el-select v-model="scope.row.select2" style="width: 90px;">
                        <el-option>或</el-option>
                        <el-option>且</el-option>
                      </el-select>
                      <el-select v-model="scope.row.select" style="width: 90px;">
                        <el-option>大于</el-option>
                        <el-option>小于</el-option>
                        <el-option>大于等于</el-option>
                        <el-option>小于等于</el-option>
                        <el-option>等于</el-option>
                      </el-select>
                      <el-input v-model="scope.row.input" style="width: 80px;"></el-input>
                      <el-select v-model="scope.row.select2" style="width: 90px;">
                        <el-option>或</el-option>
                        <el-option>且</el-option>
                      </el-select>
                    </template>
                    <el-checkbox v-model="checked"></el-checkbox>
                  </el-table-column>
                  &lt;!&ndash;<el-table-column>
                    <template slot-scope="scope">
                      <span v-if="scope.row.id">{{ scope.row.sname }}</span>
                      <el-input v-model="scope.row.sname" v-show="scope.row.id === ''"></el-input>
                    </template>
                  </el-table-column>&ndash;&gt;
                  <el-table-column width="50">
                    <template slot-scope="scope">
                      <el-button class="red" type="text" size="small" @click="deleteList(scope.row)">
                        <span class="el-icon-delete" style="font-size: 20px;color: #ED6C2E;"></span>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>-->
                <table style="width: 95%;margin-top: 20px;">
                  <tr>
                    <td>条件</td>
                    <td>
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.select" style="width: 90px;">
                          <el-option>大于</el-option>
                          <el-option>小于</el-option>
                          <el-option>大于等于</el-option>
                          <el-option>小于等于</el-option>
                          <el-option>等于</el-option>
                        </el-select>
                        <el-input v-model="scope.row.input" style="width: 80px;"></el-input>
                        <el-select v-model="scope.row.select2" style="width: 90px;">
                          <el-option>或</el-option>
                          <el-option>且</el-option>
                        </el-select>
                        <el-select v-model="scope.row.select" style="width: 90px;">
                          <el-option>大于</el-option>
                          <el-option>小于</el-option>
                          <el-option>大于等于</el-option>
                          <el-option>小于等于</el-option>
                          <el-option>等于</el-option>
                        </el-select>
                        <el-input v-model="scope.row.input" style="width: 80px;"></el-input>
                        <el-select v-model="scope.row.select2" style="width: 90px;">
                          <el-option>或</el-option>
                          <el-option>且</el-option>
                        </el-select>
                      </template>
                      <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.select" style="width: 90px;">
                          <el-option>大于</el-option>
                          <el-option>小于</el-option>
                          <el-option>大于等于</el-option>
                          <el-option>小于等于</el-option>
                          <el-option>等于</el-option>
                        </el-select>
                        <el-input v-model="scope.row.input" style="width: 80px;"></el-input>
                        <el-select v-model="scope.row.select2" style="width: 90px;">
                          <el-option>或</el-option>
                          <el-option>且</el-option>
                        </el-select>
                        <el-select v-model="scope.row.select" style="width: 90px;">
                          <el-option>大于</el-option>
                          <el-option>小于</el-option>
                          <el-option>大于等于</el-option>
                          <el-option>小于等于</el-option>
                          <el-option>等于</el-option>
                        </el-select>
                        <el-input v-model="scope.row.input" style="width: 80px;"></el-input>
                        <el-select v-model="scope.row.select2" style="width: 90px;">
                          <el-option>或</el-option>
                          <el-option>且</el-option>
                        </el-select>
                      </template>
                      <el-checkbox v-model="checked"></el-checkbox>
                    </td>
                    <td></td>
                  </tr>
                  <!--<el-table-column>
                    <template slot-scope="scope">
                      <span v-if="scope.row.id">{{ scope.row.sname }}</span>
                      <el-input v-model="scope.row.sname" v-show="scope.row.id === ''"></el-input>
                    </template>
                  </el-table-column>-->
                  <el-table-column width="50">
                    <template slot-scope="scope">
                      <el-button class="red" type="text" size="small" @click="deleteList(scope.row)">
                        <span class="el-icon-delete" style="font-size: 20px;color: #ED6C2E;"></span>
                      </el-button>
                    </template>
                  </el-table-column>
                </table>
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
        <el-form ref="discountForm" :model="discountForm"  label-width="80px">
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
          <el-button type="success" @click="showDiscountVisible = false">修 改</el-button>
        </span>
      </el-dialog>
      
      
      <el-dialog :title="reservefundName" :visible.sync="reservefundVisible" width="700px">
        <el-form ref="reserveForm" :model="reserveForm" label-width="80px">
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
import subject from './compents/subject';
import normaldis from './compents/normaldis';
import recruitdis from './compents/recruitdis';
import charge from './compents/charge'
import refund from './compents/refund'
  export default {
    data() {
      return {
        brandList:[],
        intercityList: [],
        areaList: [],
        yearList: [],
        academic_year_id:'',
        nameSelect:[],
        options1:[],
        options:[],
        checked:'',
        operation:[],
        value1:'',
        value2:'',
        value9:'',
        input:'',
        activeName:'fore',
        disabledSelect:false,
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
        ],
      };
    },
    components: {
      subject,
      normaldis,
      recruitdis,
      charge,
      refund
    },
    created () {
      this.getBrand();
      this.getIntercity();
      this.getArea();
      this.getYear();
    },
    methods: {
      handleClose (){

      },
      getBrand(){
          var _this = this;
          _this.$axios.get('/api/common/select/hq_list/',)
          .then(res=>{
            _this.brandList = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getIntercity(){
          var _this = this;
          this.$axios.get('/api/common/intercity/',).then(res=>{
            console.log(res.data)
            _this.intercityList = res.data.intercity_list;
            // _this.form.intercity_id = res.data.intercity_list[0].id;
          }).catch(err=>{
            console.log(err)
        })
      },
      getArea(){
          var _this = this;
          _this.$axios.get('/api/common/select/area_list/',)
          .then(res=>{
            _this.areaList = res.data.results;
        }).catch(err=>{
          console.log(err)
        })
      },
      getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                console.log(res.data)
                _this.yearList = res.data.results;
                _this.yearList.forEach(item => {
                    if(item.is_selected === 1){
                        _this.academic_year_id = item.id;
                    }
                });
            })
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
      handleClick(){

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
  .settinglist .select-header,.settinglist .list-content{
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
