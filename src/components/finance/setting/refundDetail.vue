<template>
    <div class="refunDetail wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 财务设置 > <span class="font-cl-blue">配置退费规则</span></p>
      </div>
        <p class="title" v-if="$route.params.type === 'edit'">合肥用龙湾幼儿园</p>
        <div class="select-header select-length" style="line-height:45px;margin-top: 10px;">
          <div v-if="$route.params.type === 'edit'">
            <span>学年：</span>
          </div>
          <div v-if="$route.params.type === 'add'">
            <span>学校：</span>
            <el-select v-model="saveForm.center" placeholder="请选择" style="width: 200px">
              <el-option
                v-for="item in school_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span>学年：</span>
            <el-select v-model="saveForm.academic_year" placeholder="请选择" style="width: 200px">
              <el-option
                v-for="item in year_list"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      <table>
          <thead>
              <tr>
                <td colspan="6" style="text-align: center">非普惠</td>
              </tr>
          </thead>
          <tbody>
              <tr>
                <td width="90px">学生类型</td>
                <td colspan="5" style="text-align: center">退费判定条件</td>
              </tr>
              <tr>
                <td rowspan="6" width="90px">预备生</td>
                <td rowspan="4" colspan="2" style="width:60px">退费</td>
                <td colspan="3" style="">
                  已领物品，是否减物品费用&nbsp;&nbsp;&nbsp;
                  <el-input type="text" v-model="saveForm.goods_fee"></el-input>&nbsp;&nbsp;元
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  总部外籍子女，退
                  <el-input type="text" v-model="saveForm.foreign_employees_per"></el-input> %
                </td>
              </tr>
              <tr>
                <td rowspan="2" width="100">总部非外籍子女</td>
                <td colspan="2">
                  按时提交申请，退
                  <el-input type="text" v-model="saveForm.on_schedule_per"></el-input> %
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  未按时提交申请，当月退
                  <el-input type="text" v-model="saveForm.not_on_schedule_per"></el-input> %，
                  <el-select v-model="saveForm.specific_month" placeholder="请选择">
                    <el-option v-for="item in monthOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  退
                  <el-input type="text" v-model="saveForm.specific_month_per"></el-input> %，
                  剩余月退
                  <el-input type="text" v-model="saveForm.other_month_per"></el-input> %
                </td>
              </tr>
              <tr>
                <td colspan="2">延迟入园</td>
                <td colspan="3">所有金额转备用金</td>
              </tr>
              <tr>
                <td colspan="2">无发票</td>
                <td colspan="3">
                  减退费金额
                  <el-input type="text" v-model="saveForm.no_invoice"></el-input> %
                </td>
              </tr>
              <tr>
                <td :rowspan="16 + saveForm.month_pay.length + saveForm.month_pay2.length" width="90">在校生</td>
                <td :rowspan="9 + saveForm.month_pay.length + saveForm.month_pay2.length" width="90">学费</td>
                <td width="90">转班</td>
                <td colspan="3">多退少补</td>
              </tr>
              <tr>
                <td :rowspan="saveForm.month_pay.length + 5" width="90">退学</td>
                <td :rowspan="saveForm.month_pay.length + 2" width="100">月缴</td>
                <td colspan="2">
                  行政手续费
                  <el-input type="text" v-model="saveForm.handling_fee"></el-input> 元
                </td>
              </tr>
              <tr v-for="(oth,ind) in saveForm.month_pay">
                <td colspan="2">
                  <el-select v-model="oth.specific_month" placeholder="请选择">
                    <el-option key="0" label="当月" value="0"></el-option>
                    <el-option v-for="item in monthOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select v-model="oth.method_type">
                    <el-option v-for="item in method_type"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select v-model="oth.compare_type" placeholder="请选择">
                    <el-option v-for="item in compare_type"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-input type="text" v-model="oth.number_of_days"></el-input>个
                  <el-select v-model="oth.calendar_type">
                    <el-option v-for="item in calendar_type"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  时，退
                  <el-input type="text" v-model="oth.refund_per"></el-input> %，
                  剩余月退
                  <el-input type="text" v-model="oth.other_month_refund_per"></el-input> %，
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <i class="el-icon-circle-plus orange cur" @click="addTr(1)">添加判定条件</i>
                </td>
              </tr>
              <tr>
                <td rowspan="" width="100">学期缴</td>
                <td colspan="2">
                  不满
                  <el-input type="text" v-model="saveForm.number_of_month"></el-input>
                  个月时，无法享受学期优惠价格；
                  <!--<el-select>
                    <el-option value="小于"></el-option>
                    <el-option value="大于等于"></el-option>
                  </el-select>-->大于等于
                  <span>{{ saveForm.number_of_month }}</span>
                  个月时，学期优惠价格转月缴
                </td>
              </tr>
              <!--<tr>
                <td colspan="2">
                  中途退学，
                  <el-select>
                    <el-option value="小于"></el-option>
                    <el-option value="大于等于"></el-option>
                  </el-select>
                  <el-input type="text" v-model="saveForm.yuefen1"></el-input>
                  个月时，无法享受学期优惠价格
                </td>
              </tr>-->
              <tr>
                <td rowspan="" width="100">年缴</td>
                <td colspan="2">
                  不满
                  <el-input type="text" v-model="saveForm.number_of_month2"></el-input>
                  个月时，无法享受学期优惠价格；
                  <!--<el-select>
                    <el-option value="小于"></el-option>
                    <el-option value="大于等于"></el-option>
                  </el-select>-->大于等于
                  <span>{{ saveForm.number_of_month2 }}</span>
                  个月时，学期优惠价格转月缴
                </td>
              </tr>
              <!--<tr>
                <td colspan="2">
                  &lt;!&ndash;中途退学，
                  <el-select>
                    <el-option value="小于"></el-option>
                    <el-option value="大于等于"></el-option>
                  </el-select>&ndash;&gt;
                  不满
                  <el-input type="text" v-model="saveForm.yuefen1"></el-input>
                  个月时，无法享受学期优惠价格
                </td>
              </tr>-->
              <tr>
                <td colspan="3">
                  未按时提申请，扣月
                  <el-input type="text" v-model="saveForm.not_on_schedule_per1"></el-input> %
                </td>
              </tr>
              <tr>
                <td width="90">休学</td>
                <td colspan="3">
                  首月
                  <el-input type="text" v-model="saveForm.on_schedule_per"></el-input>
                   % 转备用金，剩余月
                  <el-input type="text" v-model="saveForm.other_on_schedule_per"></el-input>
                   % 转备用金</td>
              </tr>
              <!--<tr>
                <td width="90">离园</td>
                <td colspan="3">
                  未提前申请,需扣除月缴
                  <el-input type="text" v-model="saveForm.liyuan"></el-input>%
                </td>
              </tr>-->
              <tr v-for="(con,indexs) in saveForm.month_pay2">
                <td v-if="indexs === 0" :rowspan="saveForm.month_pay2.length + 1" width="90">缺勤</td>
                <td colspan="3">
                  <el-select v-model="con.specific_month" placeholder="请选择">
                    <el-option key="0" label="当月" value="0"></el-option>
                    <el-option v-for="item in monthOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select v-model="con.method_type">
                    <el-option v-for="item in method_type"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-select v-model="con.compare_type" placeholder="请选择">
                    <el-option v-for="item in compare_type"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-input type="text" v-model="con.number_of_days"></el-input>个
                  <el-select v-model="con.calendar_type">
                    <el-option v-for="item in calendar_type"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  时，转备用金
                  <el-input type="text" v-model="con.reserve_fund_per"></el-input> %，
                  剩余月转备用金
                  <el-input type="text" v-model="con.other_month_reserve_fund_per"></el-input> %，
                  <!--<el-select>
                    <el-option value="连续"></el-option>
                    <el-option value="累计"></el-option>
                  </el-select>
                  <el-select>
                    <el-option value="大于"></el-option>
                    <el-option value="等于"></el-option>
                  </el-select>
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input>个
                  <el-select>
                    <el-option value="校日历"></el-option>
                    <el-option value="日历"></el-option>
                  </el-select>
                  时，转备用金
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input> % ，
                  剩余月转备用金
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input> % ，-->
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <i class="el-icon-circle-plus orange cur" @click="addTr(0)">添加判定条件</i>
                </td>
              </tr>
              <tr>
                <td width="90">寒暑假</td>
                <td colspan="3">
                  <el-radio v-model="saveForm.radio5" label="0">否</el-radio>
                  <el-radio v-model="saveForm.radio5" label="1">
                    是，结转 x <el-input type="text" v-model="saveForm.fee_refund_money_per"></el-input> % </el-radio>
                </td>
              </tr>
              <tr>
                <td rowspan="4" colspan="2">餐费</td>
                <td rowspan="3" colspan="">
                  <el-radio v-model="saveForm.radio9" label="退费"></el-radio>
                  <el-radio v-model="saveForm.radio9" label="转备用金"></el-radio>
                </td>
                <td colspan="">
                  <el-radio v-model="saveForm.radio2" label="0">
                    整月，{{ saveForm.radio9 }}
                    <el-input type="text" v-model="saveForm.full_month_per"></el-input> %
                  </el-radio>
                </td>
              </tr>
              <tr>
                <!--<td rowspan="2" width="100">非整月</td>-->
                <!--<td width="60">
                  <el-radio v-model="saveForm.radio2"></el-radio>
                </td>-->
                <td colspan=""><el-radio v-model="saveForm.radio2" label="1">非整月,缺勤天数 x 收费标准，
                  {{ saveForm.radio9 }}
                 </el-radio></td>
              </tr>
              <tr>
                <!--<td width="60">
                  <el-radio v-model="saveForm.radio2"></el-radio>
                </td>-->
                <td colspan="">
                  <el-radio v-model="saveForm.radio2" label="2">
                    <el-select v-model="saveForm.method_type">
                      <el-option value="连续"></el-option>
                    </el-select>
                    <el-select v-model="saveForm.compare_type">
                      <el-option value="大于"></el-option>
                    </el-select>
                    <el-input type="text" v-model="saveForm.days"></el-input>
                    天，
                    {{ saveForm.radio9 }}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-radio v-model="saveForm.radio3" label="0">
                      缺勤天数 x
                      <el-input type="text" v-model="saveForm.days_fee"></el-input> 元
                    </el-radio>&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-radio v-model="saveForm.radio3" label="1">
                      缺勤天数 x（ 收费标准 / <el-input type="text" v-model="saveForm.charges_days"></el-input> 天 ）
                    </el-radio>
                  </el-radio>
                </td>
              </tr>
              <tr>
                <td width="90">寒暑假</td>
                <td colspan="3">
                  <el-radio v-model="saveForm.radio4" label="0">否</el-radio>
                  <el-radio v-model="saveForm.radio4" label="1">
                    是,结转 x <el-input type="text" v-model="saveForm.meal_refund_money_per"></el-input> % </el-radio>
                </td>
              </tr>
              <tr>
                <td colspan="2">活动费</td>
                <td colspan="3">
                  当前学期，退
                  <el-input type="text" v-model="saveForm.dangxue"></el-input> % ，
                  剩余学期，退
                  <el-input type="text" v-model="saveForm.shengyu"></el-input> %
                </td>
              </tr>
              <tr>
                <td colspan="2">校车费</td>
                <td colspan="3">
                  当月，退
                  <el-input type="text" v-model="saveForm.dangxue"></el-input> % ，
                  剩余月，退
                  <el-input type="text" v-model="saveForm.shengyu"></el-input> %
                </td>
              </tr>
              <tr>
                <td colspan="2">无发票</td>
                <td colspan="3">
                  减退费金额
                  <el-input type="text" v-model="saveForm.dangxue"></el-input> %
                </td>
              </tr>
          </tbody>
      </table>
      <table style="margin-top: 50px">
        <thead>
        <tr>
          <td colspan="4" style="text-align: center">普惠</td>
        </tr>
        </thead>
        <tbody>
            <tr>
              <td width="90px">学生类型</td>
              <td colspan="3" style="text-align: center">退费判定条件</td>
            </tr>
            <tr>
              <td width="90px" rowspan="5">在校生</td>
              <td width="90px">无发票</td>
              <td colspan="2">
                金额-金额 x
                <el-input type="text" v-model="saveForm.dangxue"></el-input> %
              </td>
            </tr>
            <tr>
              <td width="90px" rowspan="2">学费</td>
              <td width="200px">
                <el-radio v-model="saveForm.radio10" label="退费"></el-radio>
                <el-radio v-model="saveForm.radio10" label="转备用金"></el-radio>
              </td>
              <td>
                缺勤{{ saveForm.radio10 }}，当前月
                <el-input type="text" v-model="saveForm.dangxue"></el-input>
                 % {{ saveForm.radio10 }}，剩余月
                <el-input type="text" v-model="saveForm.shengyu"></el-input>
                 % {{ saveForm.radio10 }}
              </td>
            </tr>
            <tr>
              <td>
                <el-radio v-model="saveForm.radio6" label="退费"></el-radio>
                <el-radio v-model="saveForm.radio6" label="转备用金"></el-radio>
              </td>
              <td>
                退学，当前月{{ saveForm.radio6 }}
                <el-input type="text" v-model="saveForm.dangxue"></el-input>
                 % ，剩余月{{ saveForm.radio6 }}
                <el-input type="text" v-model="saveForm.shengyu"></el-input>
                 %
              </td>
            </tr>
            <tr>
              <td width="90px" rowspan="2">餐费</td>
              <td>
                <el-radio v-model="saveForm.radio7" label="退费"></el-radio>
                <el-radio v-model="saveForm.radio7" label="转备用金"></el-radio>
              </td>
              <td>
                <el-select>
                  <el-option value="连续"></el-option>
                  <el-option value="累计"></el-option>
                </el-select>
                <el-select>
                  <el-option value="大于"></el-option>
                  <el-option value="等于"></el-option>
                </el-select>
                <el-input type="text" v-model="saveForm.tian"></el-input>
                天，{{ saveForm.radio7 }}，缺勤天数 x
                <el-input type="text" v-model="saveForm.shengyu"></el-input> 元
              </td>
            </tr>
            <tr>
              <td>
                <el-radio v-model="saveForm.radio8" label="退费"></el-radio>
                <el-radio v-model="saveForm.radio8" label="转备用金"></el-radio>
              </td>
              <td>
                整月{{ saveForm.radio8 }}
                <el-input type="text" v-model="saveForm.shengyu"></el-input> %
              </td>
            </tr>
        </tbody>
      </table>
      <div class="mt26 text-align-center">
        <button class="btn bg-grey mr26" @click="">取消</button>
        <button class="btn bg-green" @click="submit('saveForm')">提交</button>
      </div>
    </div>
</template>
<style scoped>
  .refunDetail thead{
    background-color: #BBBBBB;
    color: #333333;
    font-weight: bold
  }
  .refunDetail tr td:last-child{
    text-align: left;
    padding-left: 10px;
    padding-top: 6px;
    padding-bottom: 6px
  }
  .refunDetail table{
    border: 1px #A0A0A0 solid;
    border-collapse: collapse;
    width: 100%;
    color:#101010;
    text-align: center;
    margin-top: 20px;
  }
  .refunDetail td{
    border: 1px #ccc solid;
    /*padding: 10px;*/
    line-height: 40px;
  }
  .refunDetail .title{
    color: #333333;
    font-weight: bold;
    font-size: 16px;
    line-height: 40px;
  }
  .refunDetail .el-input,.el-select{
    width: 100px;
  }
  .refunDetail >>> .el-input__inner{
    width: inherit;
  }
</style>
<script>
import ElInput from '../../../../node_modules/element-ui/packages/input/src/input.vue'

export default {
  components: {ElInput},
  data(){
        return {
          method_type:[{
            value: 1,
            label: '累计'
          }, {
            value: 2,
            label: '连续'
          }],
          calendar_type:[{
            value: 1,
            label: '日历'
          }, {
            value: 2,
            label: '校日历'
          }],
          compare_type:[{
            value: 1,
            label: '大于等于'
          }, {
            value: 2,
            label: '小于'
          }],
          monthOptions: [{
            value: 1,
            label: '1月'
          }, {
            value: 2,
            label: '2月'
          }, {
            value: 3,
            label: '3月'
          }, {
            value: 4,
            label: '4月'
          }, {
            value: 5,
            label: '5月'
          },{
            value: 6,
            label: '6月'
          }, {
            value: 7,
            label: '7月'
          }, {
            value: 8,
            label: '8月'
          }, {
            value: 9,
            label: '9月'
          }, {
            value: 10,
            label: '10月'
          }],
          school_url:'/api/common/select/center_list/',/*校园*/
          year_url:'/api/common/select/academic_year_list/',/*学年*/
          school_list:[],
          year_list:[],
            saveForm:{
              center:'',
              academic_year:'',
              goods_fee:'',
              foreign_employees_per: '',
              on_schedule_per: '',
              not_on_schedule_per: '',
              specific_month: '',
              specific_month_per: '',
              other_month_per: '',
              no_invoice: '',
              handling_fee:'',
              not_on_schedule_per1: '',
              month_pay: [
                {
                  specific_month: '',
                  method_type: '',
                  compare_type: '',
                  number_of_days: '',
                  calendar_type: '',
                  refund_per: '',
                  other_month_refund_per: '',
                }
              ],
              number_of_month:'',
              number_of_month2:'',
              other_on_schedule_per:'',
              on_schedule_per: '',
              month_pay2:[
                {
                  specific_month: '',
                  method_type: '',
                  compare_type: '',
                  number_of_days: '',
                  calendar_type: '',
                  reserve_fund_per:'',
                  other_month_reserve_fund_per:'',
                }
              ],
              full_month_per:'',
              compare_type:'',
              method_type:'',
              days:'',
              days_fee:'',
              charges_days:'',

              radio10:'退费',
              radio9:'退费',
              radio8:'退费',
              radio7:'退费',
              radio6:'退费',
              radio:'0',
              radio2:'0',
              radio3:'0',
              radio4:'0',
              radio5:'0',
              quetian:'',
              quetian2:'',
              waiji:'',
              feiwaiji1:'',
              feiwaiji2:'',
              jiantui:'',
              liyuan:'',
              xingzheng:'',
              dangyue:'',
              yuefen:'',
              yuanjia:'',
              yuefen1:'',
              yuanjia1:'',
              yuefen2:'',
              yuanjia2:'',
              yuefen3:'',
              yuanjia3:'',
              kouyue:'',
              beiyongjin:'',
              beiyongjin2:'',
              zhengyue:'',
              lianxu:'',
              dayu:'',
              tian:'',
              dangxue:'',
              shengyu:'',
              tuifei:'',
            },
            get_01_url:'/api/refund_policy/prepared_student_refund/prepared_student_refund_info/?center=1&academic_year=1',
            get_02_url:'/api/refund_policy/student_quit_month/student_quit_month_info/?center=1&academic_year=1',
            get_03_url:'/api/refund_policy/student_quit_term/info/?center=1&academic_year=1',
            get_04_url:'/api/refund_policy/student_quit_year/info/?center=1&academic_year=1',
            get_05_url:'/api/refund_policy/student_suspend/info/?center=1&academic_year=1',
            get_06_url:'/api/refund_policy/student_absence/info/?center=1&academic_year=1',
            get_07_url:'/api/refund_policy/student_vacation/info/?center=1&academic_year=1',
            get_08_url:'/api/refund_policy/student_meal/info/?center=1&academic_year=1',
            add_01_url:'/api/refund_policy/prepared_student_refund/',
            add_02_url:'/api/refund_policy/student_quit_month/',
            add_03_url:'/api/refund_policy/student_quit_term/',
            add_04_url:'/api/refund_policy/student_quit_year/',
            add_05_url:'/api/refund_policy/student_suspend/',
            add_06_url:'/api/refund_policy/student_absence/',
            add_07_url:'/api/refund_policy/student_vacation/',
            add_08_url:'/api/refund_policy/student_meal/',
        }
    },
    mounted:function(){
        if(this.$route.params.id == 0){
          this.getSchoolList();
          this.getYearList();
        }else{
          this.getGoodFee();
          this.getMonthPay();
          this.getTermPay();
          this.getYearPay();
          this.getStudentSuspend();
          this.getStudentAabsence();
          this.getStudentVacation();
          this.getStudentMeal();
        }
    },
    methods:{
      addTr:function (index) {
        if(index === 0){
          var obj = {
            specific_month:'',
            method_type: '',
            compare_type: '',
            number_of_days: '',
            calendar_type: '',
            reserve_fund_per:'',
            other_month_reserve_fund_per:'',
          };
          this.saveForm.month_pay2.push(obj);
        }else{
          var obj = {
            specific_month:'',
            method_type: '',
            compare_type: '',
            number_of_days: '',
            calendar_type: '',
            refund_per: '',
            other_month_refund_per: '',
          };
          this.saveForm.month_pay.push(obj);
        }
      },
      getSchoolList:function () {
        var _this = this;
        var url = this.school_url;
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.school_list = res.data.results;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      /*学年*/
      getYearList:function () {
        var _this = this;
        var url = this.year_url;
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200 && res.data.status_code == 1) {
            this.year_list = res.data.results;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getGoodFee:function () {
        this.$axios.get(this.get_01_url).then(res=>{
            this.saveForm.goods_fee = res.data.goods_fee;
            this.saveForm.foreign_employees_per = res.data.foreign_employees_per;
            this.saveForm.on_schedule_per = res.data.on_schedule_per;
            this.saveForm.not_on_schedule_per = res.data.not_on_schedule_per;
            this.saveForm.specific_month = res.data.specific_month;
            this.saveForm.specific_month_per = res.data.specific_month_per;
            this.saveForm.other_month_per = res.data.other_month_per;
            this.saveForm.no_invoice = res.data.no_invoice;
        }).catch(err=>{
          console.log(err)
        })
      },
      getMonthPay:function () {
        this.$axios.get(this.get_02_url).then(res=>{
          this.saveForm.handling_fee = res.data.handling_fee;
          this.saveForm.not_on_schedule_per1 = res.data.not_on_schedule_per;
          this.saveForm.month_pay = [];
          for(var x in res.data.month_pay){
            var obj = {};
            if(res.data.month_pay[x].specific_month){
              obj.specific_month = res.data.month_pay[x].specific_month;
            }else{
              obj.specific_month = '0';
            }
            obj.method_type = res.data.month_pay[x].method_type;
            obj.compare_type = res.data.month_pay[x].compare_type;
            obj.number_of_days = res.data.month_pay[x].number_of_days;
            obj.calendar_type = res.data.month_pay[x].calendar_type;
            obj.refund_per = res.data.month_pay[x].refund_per;
            obj.other_month_refund_per = res.data.month_pay[x].other_month_refund_per;
            this.saveForm.month_pay.push(obj);
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getTermPay:function () {
        this.$axios.get(this.get_03_url).then(res=>{
          this.saveForm.number_of_month = res.data.number_of_month;
        }).catch(err=>{
          console.log(err)
        })
      },
      getYearPay:function () {
        this.$axios.get(this.get_04_url).then(res=>{
          this.saveForm.number_of_month2 = res.data.number_of_month;
        }).catch(err=>{
          console.log(err)
        })
      },
      getStudentSuspend:function () {
        this.$axios.get(this.get_05_url).then(res=>{
          this.saveForm.other_on_schedule_per = res.data.other_on_schedule_per;
          this.saveForm.on_schedule_per = res.data.on_schedule_per;
        }).catch(err=>{
          console.log(err)
        })
      },
      getStudentAabsence:function () {
        this.$axios.get(this.get_06_url).then(res=>{
         /* this.saveForm.handling_fee2 = res.data.handling_fee;
          this.saveForm.not_on_schedule_per2 = res.data.not_on_schedule_per;*/
          if(res.data.month_pay.length > 0){
            this.saveForm.month_pay2 = [];
            for(var x in res.data.month_pay){
              var obj = {};
              if(res.data.month_pay[x].specific_month){
                obj.specific_month = res.data.month_pay[x].specific_month;
              }else{
                obj.specific_month = '0';
              }
              obj.method_type = res.data.month_pay[x].method_type;
              obj.compare_type = res.data.month_pay[x].compare_type;
              obj.number_of_days = res.data.month_pay[x].number_of_days;
              obj.calendar_type = res.data.month_pay[x].calendar_type;
              obj.reserve_fund_per = res.data.month_pay[x].reserve_fund_per;
              obj.other_month_reserve_fund_per = res.data.month_pay[x].other_month_reserve_fund_per;
              this.saveForm.month_pay2.push(obj);
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getStudentVacation:function () {
        this.$axios.get(this.get_07_url).then(res=>{
          this.saveForm.fee_refund_money_per = res.data.fee_refund_money_per;
          this.saveForm.meal_refund_money_per = res.data.meal_refund_money_per;
          if(res.data.fee_refund_money_per !== 0){
            this.saveForm.radio5 = '1'
          }else{
            this.saveForm.radio5 = '0'
          }
          if(res.data.meal_refund_money_per !== 0){
            this.saveForm.radio4 = '1'
          }else{
            this.saveForm.radio4 = '0'
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getStudentMeal:function () {
        this.$axios.get(this.get_08_url).then(res=>{
          if(res.data.return_type === 1){
            this.saveForm.radio9 = '退费';
          }else{
            this.saveForm.radio9 = '转备用金';
          }
          if(res.data.full_month_per){
            this.saveForm.radio2 = '0';
            this.saveForm.full_month_per = res.data.full_month_per;
          }else if(res.data.is_standard_return){
            this.saveForm.radio2 = '1';
          }else if(res.data.days){
            this.saveForm.radio2 = '2';
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      submit:function (formName) {
        var type = this.$route.params.type;
        this.submit_fun1(type);
        this.submit_fun2(type);
        this.submit_fun3(type);
        this.submit_fun4(type);
        this.submit_fun5(type);
        this.submit_fun6(type);
        this.submit_fun7(type);
        this.submit_fun8(type);
      },
      submit_fun1:function (type) {
        var data1 = {
          center:this.saveForm.center || 1,
          academic_year:this.saveForm.academic_year || 1,
          goods_fee:this.saveForm.goods_fee,
          foreign_employees_per:this.saveForm.foreign_employees_per,
          on_schedule_per:this.saveForm.on_schedule_per,
          not_on_schedule_per:this.saveForm.not_on_schedule_per,
          specific_month:this.saveForm.specific_month,
          specific_month_per:this.saveForm.specific_month_per,
          other_month_per:this.saveForm.other_month_per,
          no_invoice:this.saveForm.no_invoice,
        };
        if(type === 'add'){
          this.$axios.post(this.add_01_url,data1).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_01_url+'1/',data1).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      submit_fun2:function (type) {
        var list = [];
        for(var y in this.saveForm.month_pay){
          var obj = {};
          if(this.saveForm.month_pay[y].specific_month !== '0'){
            obj.specific_month = this.saveForm.month_pay[y].specific_month;
          }
          obj.method_type = this.saveForm.month_pay[y].method_type;
          obj.compare_type = this.saveForm.month_pay[y].compare_type;
          obj.number_of_days = this.saveForm.month_pay[y].number_of_days;
          obj.calendar_type = this.saveForm.month_pay[y].calendar_type;
          obj.refund_per = this.saveForm.month_pay[y].refund_per;
          obj.other_month_refund_per = this.saveForm.month_pay[y].other_month_refund_per;
          list.push(obj);
        }
        var data2 = {
          center:this.saveForm.center || 1,
          academic_year:this.saveForm.academic_year || 1,
          handling_fee:this.saveForm.handling_fee,
          not_on_schedule_per:this.saveForm.not_on_schedule_per1,
          month_pay_list:list,
        };
        if(type === 'add'){
          this.$axios.post(this.add_02_url,data2).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_02_url+'1/',data2).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      submit_fun3:function (type) {
        var data3 = {
          center:this.saveForm.center || 1,
          academic_year:this.saveForm.academic_year || 1,
          compare_type:2,
          number_of_month: parseInt(this.saveForm.number_of_month),
          price_type: 1
        };
        if(type === 'add'){
          this.$axios.post(this.add_03_url,data3).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_03_url+'1/',data3).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      submit_fun4:function (type) {
        var data4 = {
          center:this.saveForm.center || 1,
          academic_year:this.saveForm.academic_year || 1,
          compare_type:2,
          number_of_month: parseInt(this.saveForm.number_of_month2),
          price_type: 1
        };
        if(type === 'add'){
          this.$axios.post(this.add_04_url,data4).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_04_url+'1/',data4).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      submit_fun5:function (type) {
        var data5 = {
          center:this.saveForm.center || 1,
          academic_year:this.saveForm.academic_year || 1,
          other_on_schedule_per:this.saveForm.other_on_schedule_per,
          on_schedule_per: this.saveForm.on_schedule_per,
        };
        if(type === 'add'){
          this.$axios.post(this.add_05_url,data5).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_05_url+'1/',data5).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      submit_fun6:function (type) {
        var list = [];
        for(var y in this.saveForm.month_pay2){
          var obj = {};
          if(this.saveForm.month_pay2[y].specific_month !== '0'){
            obj.specific_month = this.saveForm.month_pay2[y].specific_month;
          }
          obj.method_type = this.saveForm.month_pay2[y].method_type;
          obj.compare_type = this.saveForm.month_pay2[y].compare_type;
          obj.number_of_days = this.saveForm.month_pay2[y].number_of_days;
          obj.calendar_type = this.saveForm.month_pay2[y].calendar_type;
          obj.reserve_fund_per = this.saveForm.month_pay2[y].reserve_fund_per;
          obj.other_month_reserve_fund_per = this.saveForm.month_pay2[y].other_month_reserve_fund_per;
          list.push(obj);
        }
        var data6 = {
          center:this.saveForm.center || 1,
          academic_year:this.saveForm.academic_year || 1,
          month_pay_list:list,
        };
        if(type === 'add'){
          this.$axios.post(this.add_06_url,data6).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_06_url+'1/',data6).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      submit_fun7:function (type) {
        var meal = '';
        var fee = '';
        if(this.saveForm.radio4 === '0'){/*0否*/
          meal = 0;
        }else{
          meal = this.saveForm.meal_refund_money_per;
        }
        if(this.saveForm.radio5 === '0'){/*0否*/
          fee = 0;
        }else{
          fee = this.saveForm.fee_refund_money_per;
        }
        var data7 = {
          center:this.saveForm.center || 1,
          academic_year:this.saveForm.academic_year || 1,
          meal_refund_money_per:meal,
          fee_refund_money_per:fee,
        };
        if(type === 'add'){
          this.$axios.post(this.add_07_url,data7).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_07_url+'1/',data7).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
      submit_fun8:function (type) {
        var obj = {};
        obj.center = this.saveForm.center || 1;
        obj.academic_year = this.saveForm.academic_year || 1;
        if(this.saveForm.radio9 = '退费'){
          obj.return_type = 1;
        }else{
          obj.return_type = 2;
        }
        if(this.saveForm.radio2 === '0'){
          obj.full_month_per = this.saveForm.full_month_per;
        }else if(this.saveForm.radio2 === '1'){
          obj.is_standard_return = true;
        }else if(this.saveForm.radio2 === '2'){
          obj.compare_type = this.saveForm.compare_type;
          obj.method_type = this.saveForm.method_type;
          obj.days = this.saveForm.days;
          if(this.saveForm.radio3 === '0'){
            obj.days_fee = this.saveForm.days_fee;
          }else{
            obj.charges_days = this.saveForm.charges_days;
          }
        }
        if(type === 'add'){
          this.$axios.post(this.add_07_url,obj).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'保存成功！'
              })
            }else{
              this.$message.error('保存失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.put(this.add_07_url+'1/',obj).then(res=>{
            if(res.status == 200){
              this.$message({
                type:'success',
                message:'编辑成功！'
              })
            }else{
              this.$message.error('编辑失败');
            }
          }).catch(err=>{
            console.log(err)
          })
        }

      },
    },


}
</script>
