<template>
    <div>
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
                <el-button type="text" @click="showDiscountVisible = true">查看详情</el-button>
                <span style="color: #999999">|</span>
                <el-button style="color: orange" type="text"  @click="addNewDiscount(1)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            citylist:[],
            options:[],
            nameSelect:[],
            input:'',
            chargeFunTableDate:[],
            chargeTableDate:[]
        }
    },
    props: ['brandList','intercityList','areaList','yearList'],
    methods: {
        addNewTemplate(){
            
        },
        getcity(){
          var _this = this;
          _this.$axios.get('/api/common/select/city_list/',{
            params:{
              area_id:_this.area,       
            }
          })
          .then(res=>{
            _this.citylist = res.data.results;
            _this.city = '';
        }).catch(err=>{
          console.log(err)
        })
      },
      getSchool(){
            var _this = this;
            this.$axios.get('/api/common/select/center_list/',{
                params:{
                    hq_id:_this.editform.hq_id,
                    intercity_id:_this.editform.intercity_id
                }
            })
            .then(res=>{
                _this.schoolList = res.data.results;
            });
        },
    }
}
</script>

