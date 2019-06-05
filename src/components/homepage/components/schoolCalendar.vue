<template>
    <div class="home_schoolCalendar">
        <p style="font-size:14px;font-weight:600">校日历</p>
        <el-form :model="searchForm" inline class="mt10 ">
            <el-form-item>
                <el-select v-model="searchForm.school" @change="getClass" value-key="id">
                    <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="searchForm.class" @change="getCalendar">
                    <el-option v-for="item in classList" :key="item.id" :label="item.class_type" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="calendar_border">
            <div style="padding: 20px 20px 0 20px;">
                <img src="../../../assets/img/calendarPic.png" alt="">
                <div class="calendarYear">{{year}}</div>
                <div class="calendarMonth">— &nbsp;&nbsp;{{newMonth}}&nbsp;&nbsp; —</div>
                <Calendar
                    ref="Calendar"
                    v-for="(i,index) in monthList"
                    :key='index'
                    :textTop="textTop"
                    :markDateMore='i.list'
                    :sundayStart="true"
                    ></Calendar>
            <div class="calendar-datail" style="width:100%;text-align:center">
                <div>
                    <span style="background-color:red" class="calendar-suqre"></span>
                    <span class="mr10">休息日</span>
                    <span style="background-color:#ffcc80" class="calendar-suqre"></span>
                    <span class="mr10">职业发展日</span>
                    <span style="background-color:#8BC34A" class="calendar-suqre"></span>
                    <span class="mr10">寒暑假</span>
                </div>
            </div>
            </div>
            <div class="viewAll mt10" @click="viewAll">查看全部</div>
        </div>
    </div>
</template>
<style scoped>
    .home_schoolCalendar >>> .S{
        color:#fff !important;
        border-radius:0;
        color:red !important;
        background-color: #fff !important;
    }
    .home_schoolCalendar >>> .S:hover{
        background-color: #fff !important;
        color: red !important;
    }
    .home_schoolCalendar >>> .P{
        color:#fff !important;
        border-radius:0;
        color:#ffcc80 !important;
        background-color: #fff !important;
    }
    .home_schoolCalendar >>> .P:hover{
        background-color: #fff !important;
        color: #ffcc80 !important;
    }
    .home_schoolCalendar >>> .V{
        color:#fff !important;
        border-radius:0;
        color:#8BC34A !important;
        background-color: #fff !important;
    }
    .home_schoolCalendar >>> .V:hover{
        background-color: #fff !important;
        color: #8BC34A !important;
    }
</style>

<script>
import Calendar from 'vue-calendar-component';
export default {
    data () {
        return {
            year:'',
            month:'',
            newMonth:'',
            monthList:[],
            searchForm:{
                school:'',
                class:'',
                year:'',
                name:''
            },
            textTop:['S','M','T','W','T','F','S'],
            schoolList:[],
            classList:[],
            yearList:[],
            monthList:[],
        }
    },
    created () {
        this.getSchool();
        this.getYear();
        // 改写插件方法
        Calendar.methods.clickDay = function(item,index){
            if (item.otherMonth === "nowMonth" && !item.dayHide) {
                this.getList(this.myDate, item.date);
            }
        }
    },
    methods: {
        viewAll(){
            this.$router.push(
                {
                    path:'/school/SchoolViewClendar/'+this.searchForm.class,
                    query:{
                        name:this.searchForm.school.name,
                        id:this.searchForm.school.id
                    }
                }
                
            )
        },
        getYear(){
            var _this = this;
            this.$axios.get('/api/common/select/academic_year_list/')
            .then(res=>{
                _this.yearList = res.data.results;
                _this.yearList.forEach(item => {
                    if(item.is_selected === 1){
                        _this.searchForm.year = item.id;
                    }
                });
                
            })
        },
        getSchool() {
        var _this = this;
        this.$axios.get('/api/common/select/center_list/')
          .then(res => {
            _this.schoolList = res.data.results;
            _this.searchForm.school = res.data.results[0];
            _this.searchForm.name = res.data.results[0].name;
            // if(this.searchform.center_id !== ''){
              _this.getClass();
            // }
          });
      },
      getClass() {
        var _this = this;
        this.$axios.get('/api/finance/bill/search_info/', {
          params: {
            center_id: this.searchForm.school.id
          }
        })
          .then(res => {
            _this.classList = res.data.data.class_type_li;
            _this.searchForm.class = res.data.data.class_type_li[0].id;
            _this.getCalendar()
          })
      },
      getCalendar(){
            var _this = this;
            _this.monthList = [];
            this.$axios.get('/api/school_calendar/calendar/show_calendar_days/',{
                params:{
                    center_id:this.searchForm.school.id,
                    class_type_id:this.searchForm.class,
                    academic_year_id:this.searchForm.year
                }
            }).then(res=>{
                var date = new Date();
                var year = date.getFullYear(); 
                var month = date.getMonth()+1; 
                this.year = year;
                this.month = month;
                this.newMonth = date.toDateString().split(" ")[1];
                res.data.results.forEach(item=>{
                    if(item.year == year){
                        if(item.month == month){
                            var son = new Object;
                            son.time = item.year+'/'+item.month;
                            son.list = item.days;
                            _this.monthList.push(son)
                        }  
                    } 
                });
                _this.$nextTick(()=> {
                    _this.initCalendar();
                });
            })
        },
        initCalendar(){
            this.monthList.forEach((item,index)=>{
                this.$refs.Calendar[index].ChoseMonth(item.time,false)
            })
        }
    },
    components: {
        Calendar
    }
}
</script>

