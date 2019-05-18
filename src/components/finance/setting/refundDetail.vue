<template>
    <div class="refunDetail wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 财务处理 > 财务设置 > <span class="font-cl-blue">配置退费规则</span></p>
      </div>
        <p class="title">合肥用龙湾幼儿园</p>
        <div class="select-header select-length" style="line-height:45px">
            <span>学年：</span>
            <el-select v-model="searchform.intercity_id" placeholder="请选择">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in intercityList"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
              </el-option>
            </el-select>
            <span>有效期：</span>
            <el-select v-model="searchform.intercity_id" placeholder="请选择">
              <el-option value="" label="所有"></el-option>
              <el-option
                v-for="item in intercityList"
                :key="item.id"
                :label="item.dept_name"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="padding-left-30"><el-button type="primary" @click="searchList(1)">搜索</el-button></span>
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
                  <el-input type="text" v-model="saveForm.waiji"></el-input>&nbsp;&nbsp;元
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  总部外籍子女，退
                  <el-input type="text" v-model="saveForm.waiji"></el-input>%
                </td>
              </tr>
              <tr>
                <td rowspan="2" width="100">总部非外籍子女</td>
                <td colspan="2">
                  按时提交申请，退
                  <el-input type="text" v-model="saveForm.feiwaiji1"></el-input>%
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  未按时提交申请，
                  <el-input type="text" v-model="saveForm.feiwaiji2"></el-input>
                  月退
                  <el-input type="text" v-model="saveForm.feiwaiji2"></el-input>%，
                  剩余月退
                  <el-input type="text" v-model="saveForm.feiwaiji2"></el-input>%
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
                  <el-input type="text" v-model="saveForm.jiantui"></el-input>%
                </td>
              </tr>
              <tr>
                <td rowspan="18" width="90">在校生</td>
                <td rowspan="11" width="90">学费</td>
                <td width="90">转班</td>
                <td colspan="3">多退少补</td>
              </tr>
              <tr>
                <td rowspan="6" width="90">退学</td>
                <td rowspan="3" width="100">月缴</td>
                <td colspan="2">
                  行政手续费
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input>元
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <el-select>
                    <el-option value="当月"></el-option>
                    <el-option value="1月"></el-option>
                    <el-option value="2月"></el-option>
                    <el-option value="3月"></el-option>
                    <el-option value="4月"></el-option>
                    <el-option value="5月"></el-option>
                    <el-option value="6月"></el-option>
                    <el-option value="7月"></el-option>
                    <el-option value="8月"></el-option>
                    <el-option value="9月"></el-option>
                    <el-option value="10月"></el-option>
                    <el-option value="11月"></el-option>
                    <el-option value="12月"></el-option>
                  </el-select>
                  <el-select>
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
                  时，退
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input>%，
                  剩余月退
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input>%，
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <i class="el-icon-circle-plus orange cur">添加判定条件</i>
                </td>
              </tr>
              <tr>
                <td rowspan="" width="100">学期缴</td>
                <td colspan="2">
                  不满
                  <el-input type="text" v-model="saveForm.yuefen1"></el-input>
                  个月时，无法享受学期优惠价格；
                  <!--<el-select>
                    <el-option value="小于"></el-option>
                    <el-option value="大于等于"></el-option>
                  </el-select>-->大于等于
                  <span>{{ saveForm.yuefen1 }}</span>
                  个月时，学费原价转月缴
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
                  <el-input type="text" v-model="saveForm.yuefen1"></el-input>
                  个月时，无法享受学期优惠价格；
                  <!--<el-select>
                    <el-option value="小于"></el-option>
                    <el-option value="大于等于"></el-option>
                  </el-select>-->大于等于
                  <span>{{ saveForm.yuefen1 }}</span>
                  个月时，学费原价转月缴
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
                  <el-input type="text" v-model="saveForm.kouyue"></el-input>%
                </td>
              </tr>
              <tr>
                <td width="90">休学</td>
                <td colspan="3">
                  首月
                  <el-input type="text" v-model="saveForm.beiyongjin"></el-input>
                  %转备用金，剩余月
                  <el-input type="text" v-model="saveForm.beiyongjin2"></el-input>
                  %转备用金</td>
              </tr>
              <!--<tr>
                <td width="90">离园</td>
                <td colspan="3">
                  未提前申请,需扣除月缴
                  <el-input type="text" v-model="saveForm.liyuan"></el-input>%
                </td>
              </tr>-->
              <tr>
                <td rowspan="2" width="90">缺勤</td>
                <td colspan="3">
                  <el-select>
                    <el-option value="当月"></el-option>
                    <el-option value="1月"></el-option>
                    <el-option value="2月"></el-option>
                    <el-option value="3月"></el-option>
                    <el-option value="4月"></el-option>
                    <el-option value="5月"></el-option>
                    <el-option value="6月"></el-option>
                    <el-option value="7月"></el-option>
                    <el-option value="8月"></el-option>
                    <el-option value="9月"></el-option>
                    <el-option value="10月"></el-option>
                    <el-option value="11月"></el-option>
                    <el-option value="12月"></el-option>
                  </el-select>
                  <el-select>
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
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input>%，
                  剩余月转备用金
                  <el-input type="text" v-model="saveForm.xingzheng"></el-input>%，
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <i class="el-icon-circle-plus orange cur">添加判定条件</i>
                </td>
              </tr>
              <tr>
                <td width="90">寒暑假</td>
                <td colspan="3">
                  <el-radio v-model="saveForm.radio5" label="0">否</el-radio>
                  <el-radio v-model="saveForm.radio5" label="1">
                    是,结转x<el-input type="text" v-model="saveForm.quetian"></el-input>%</el-radio>
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
                    <el-input type="text" v-model="saveForm.zhengyue"></el-input>%
                  </el-radio>
                </td>
              </tr>
              <tr>
                <!--<td rowspan="2" width="100">非整月</td>-->
                <!--<td width="60">
                  <el-radio v-model="saveForm.radio2"></el-radio>
                </td>-->
                <td colspan=""><el-radio v-model="saveForm.radio2" label="1">非整月,缺勤天数x收费标准，
                  {{ saveForm.radio9 }}
                 </el-radio></td>
              </tr>
              <tr>
                <!--<td width="60">
                  <el-radio v-model="saveForm.radio2"></el-radio>
                </td>-->
                <td colspan="">
                  <el-radio v-model="saveForm.radio2" label="2">
                    <el-select v-model="saveForm.lianxu">
                      <el-option value="连续"></el-option>
                    </el-select>
                    <el-select v-model="saveForm.dayu">
                      <el-option value="大于"></el-option>
                    </el-select>
                    <el-input type="text" v-model="saveForm.tian"></el-input>
                    天，
                    {{ saveForm.radio9 }}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <el-radio v-model="saveForm.radio3" label="1">
                      缺勤天数x
                      <el-input type="text" v-model="saveForm.quetian"></el-input>元
                    </el-radio>&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-radio v-model="saveForm.radio3" label="0">
                      缺勤天数x（收费标准/<el-input type="text" v-model="saveForm.quetian2"></el-input>天）
                    </el-radio>
                  </el-radio>
                </td>
              </tr>
              <tr>
                <td width="90">寒暑假</td>
                <td colspan="3">
                  <el-radio v-model="saveForm.radio4" label="0">否</el-radio>
                  <el-radio v-model="saveForm.radio4" label="1">
                    是,结转x<el-input type="text" v-model="saveForm.quetian"></el-input>%</el-radio>
                </td>
              </tr>
              <tr>
                <td colspan="2">活动费</td>
                <td colspan="3">
                  当前学期，退
                  <el-input type="text" v-model="saveForm.dangxue"></el-input>%，
                  剩余学期，退
                  <el-input type="text" v-model="saveForm.shengyu"></el-input>%
                </td>
              </tr>
              <tr>
                <td colspan="2">校车费</td>
                <td colspan="3">
                  当月，退
                  <el-input type="text" v-model="saveForm.dangxue"></el-input>%，
                  剩余月，退
                  <el-input type="text" v-model="saveForm.shengyu"></el-input>%
                </td>
              </tr>
              <tr>
                <td colspan="2">无发票</td>
                <td colspan="3">
                  减退费金额
                  <el-input type="text" v-model="saveForm.dangxue"></el-input>%
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
                金额-金额x
                <el-input type="text" v-model="saveForm.dangxue"></el-input>%
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
                %{{ saveForm.radio10 }}，剩余月
                <el-input type="text" v-model="saveForm.shengyu"></el-input>
                %{{ saveForm.radio10 }}
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
                %，剩余月{{ saveForm.radio6 }}
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
                天，{{ saveForm.radio7 }}，缺勤天数x
                <el-input type="text" v-model="saveForm.shengyu"></el-input>元
              </td>
            </tr>
            <tr>
              <td>
                <el-radio v-model="saveForm.radio8" label="退费"></el-radio>
                <el-radio v-model="saveForm.radio8" label="转备用金"></el-radio>
              </td>
              <td>
                整月{{ saveForm.radio8 }}
                <el-input type="text" v-model="saveForm.shengyu"></el-input>%
              </td>
            </tr>
        </tbody>
      </table>
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
            searchform:{
                intercity_id:'',
            },
            saveForm:{
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }]
        }
    }
}
</script>
