<template>
    <div class="wrap viewClendar">
        <div class="header">
            <p class="local_path_style">YOU ARE HERE : 校园 > 校园列表 > 开班概况 > <span class="font-cl-blue">查看校日历</span></p>
        </div>
        <div class="header">
        </div>
        <div class="school-name mt10">
            校园名称：{{name}}
        </div>
        <div style="margin-top:20px">
            <span>班级类型：</span>
            <el-select v-model="type" placeholder="请选择班级类型">
                <el-option v-for="cla in classTypeList" :label="cla.name" :value="cla.id" :key="cla.id"></el-option>
            </el-select>
            <span style="margin-left:20px">学年：</span>
            <el-select v-model="year" placeholder="请选择学年">
                <el-option v-for="yea in yearList"  :label="yea.name" :key="yea.id"  :value="yea.id"></el-option>
            </el-select>
        </div>
        <div>
            <Calendar
                ref="Calendar"
                v-for="(i,index) in monthList"
                :key='index'
                :textTop="textTop"
                :markDateMore='i.list'
                :sundayStart="true"
                ></Calendar>
        </div>
        <div class="calendar-datail">
            <p>校日历日期说明</p>
            <div>
                <span style="background-color:#f28e91" class="calendar-suqre"></span>
                <span class="mr26">休息日</span>
                <span style="background-color:#ff9800" class="calendar-suqre"></span>
                <span class="mr26">职业发展日</span>
                <span style="background-color:#8BC34A" class="calendar-suqre"></span>
                <span class="mr26">寒暑假</span>
            </div>
        </div>
        <div style="margin-top:20px;text-align:center">
            <button class="btn bg-grey" @click="$router.go(-1)">返回</button>
        </div>
    </div>
</template>
<style scoped>
    .viewClendar >>> .calendar-datail{
        border: 1px solid #bbb;
        margin-top: 20px;
        padding: 10px;
    }
    .viewClendar >>> .calendar-suqre {
       display: inline-block;
       width:10px;
       height:10px;
    }
</style>
<script>
import Calendar from 'vue-calendar-component';
export default {
    data(){
        return {
            list:[1,2,3,4,5,6,7,8,9,10,11,12],
            name:this.$cookies.get('userInfo').fullname,
            id:this.$cookies.get('userInfo').pk,
            type:'',
            yearList:[],
            textTop:['Su','Mo','Tu','We','Th','Fr','Sa'],
            classTypeList:[],
            year:'',
            monthList:[]
        }
    },
    created () {
        this.getYear();
        this.getClass(); 
        console.log()  

    },
    methods: {
        getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                console.log(res.data)
                _this.yearList = res.data.results;
                _this.yearList.forEach(item => {
                    if(item.is_selected === 1){
                        _this.year = item.id;
                    }
                });
                _this.getCalendar();
            })
        },
        getClass(){
            var _this = this;
            this.$axios.get('/api/center/class/?center_id='+this.id)
            .then(res=>{
                console.log(res.data)
                _this.classTypeList = res.data.class_type_list;
                _this.type = res.data.class_type_list[0].id;
            })
        },
        getCalendar(){
            var _this = this;
            _this.monthList = [];
            console.log(this.year)
            this.$axios.get('/api/school_calendar/calendar/show_calendar_days/',{
                params:{
                    center_id:this.id,
                    class_type_id:this.type,
                    academic_year_id:this.year
                }
            }).then(res=>{
                res.data.results.forEach(item=>{
                    var son = new Object;
                    son.time = item.year+'/'+item.month;
                    son.list = item.days;
                    _this.monthList.push(son)
                });
                _this.$nextTick(()=> {
                    _this.initCalendar();
                });
            })
        },
        initCalendar(){
            console.log(this.monthList)
            this.monthList.forEach((item,index)=>{
                this.$refs.Calendar[index].ChoseMonth(item.time,false)
            })
        }
    },
    components: {
        Calendar
  },
  watch: {
      year(){
          this.getCalendar()
      },
      type(){
          this.getCalendar()
      },
  }
}
</script>
