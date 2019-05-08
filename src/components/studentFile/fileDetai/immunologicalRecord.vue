<template>
    <div class="immunologicalRecord">
        <p>免疫记录：</p>
        <el-table
        class="mt26"
            :data="tableList"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="疫苗"
            width="180">
            </el-table-column>
            <el-table-column
            prop="name"
            label="第一次接种"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第二次接种">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第三次接种">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第四次接种">
            </el-table-column>
            <el-table-column
            prop="address"
            label="第五次接种">
            </el-table-column>
        </el-table>
        <div class="mt26">
            <p class="recordHead">添加疫苗接种记录</p>
            <el-form v-model="form" class="mt26">
                <el-form-item label="疫苗名称：" prop="region" label-width="150px">
                    <el-select v-model="form.name" placeholder="疫苗名称">
                      <el-option v-for="name in nameList" :label="name.name" :value="name.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接种次数：" prop="region" label-width="150px">
                    <el-select v-model="form.frequ" placeholder="请选择">
                      <el-option v-for="fre in frequencyList" :label="fre.name" :value="fre.id"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="接种时间：" prop="date1" label-width="150px" style="text-align:left">
                    <el-date-picker type="date" placeholder="选择首次缴费日期" v-model="form.date1"></el-date-picker>
                </el-form-item>
                 <el-form-item label="是否接种：" prop="date1" label-width="150px" style="text-align:left">
                     <el-radio v-model="form.radio" label="1">是</el-radio>
                     <el-radio v-model="form.radio" label="2">否</el-radio>
                </el-form-item>
            </el-form>
        </div>
        <div class="mt26 text-align-center">
            <button class="btn bg-grey mr26">取消</button>
            <button class="btn bg-green" @click="submitForm('ruleForm')">保存</button>
        </div>
    </div>
</template>
<style scoped>
    .immunologicalRecord .recordHead {
        border-bottom: 1px solid #bbb;
        color:#101010;
        font-size: 16px;
        font-weight: 600;
        padding: 10px;
    }
    .immunologicalRecord >>> .el-input__inner{
      width: auto;
    }
</style>
<script>
export default {
    data(){
        return {
            nameList:[
              {
                id:1,
                name:'小儿麻痹症(TOPV-Tri-Oral-Polio-Vaccine)',
              },
              {
                id:2,
                name:'白喉百日咳破伤风(白百破)Diphtheria Pertussis Tetanus(DPT)',
              },
              {
                id:3,
                name:'白喉破伤风Purified Diphtheria Tetanus(DT)',
              },
              {
                id:4,
                name:'麻疹,腮腺炎,风疹(MMR)',
              },
              {
                id:5,
                name:'甲型肝炎Hepatitis A(HepA)',
              },
              {
                id:6,
                name:'乙型肝炎Hepatitis B(HepB)',
              },
              {
                id:7,
                name:'日本脑炎(乙脑)Japanese B Encephalitis(JEV)',
              },
              {
                id:8,
                name:'狂犬疫苗Rabies(RAB)',
              },
              {
                id:9,
                name:'肺结核Tuberculosis疫苗(B.G.G)',
              },
              {
                id:10,
                name:'肺结核Tuberculosis检验(PPD/曼托试验)',
              },
              {
                id:11,
                name:'伤寒Typhoid',
              },
              {
                id:12,
                name:'其他'
              },
            ],
            frequencyList:[
              {
                id:'first_vaccination_date',
                name:'第一次（1st）',
              },
              {
                id:'first_vaccination_date',
                name:'第二次（2nd）',
              },
              {
                id:'first_vaccination_date',
                name:'第三次（3rd）',
              },
              {
                id:'first_vaccination_date',
                name:'第四次（4th）',
              },
              {
                id:'first_vaccination_date',
                name:'第五次（5th）',
              },
            ],
            list_url:'http://192.168.199.157:8000/api/student/vaccination/\n',
            tableList: [],
            form:{
                name:'',
                frequ:'',
                date1:'2019-09-09',
                radio:"1"
            }
        }
    },
    mounted:function(){
        this.getList();
    },
    methods:{
        getList:function () {
            var _this = this;
            this.$axios.get(this.list_url,{
              params:{
                student:this.$route.params.id,
              }
            }).then(res=>{
              _this.tableList = res.data.results;
            }).catch(err=>{
              console.log(err)
            })
        },
    }
}
</script>
