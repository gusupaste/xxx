<template>
    <div>
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
    </div>
</template>
<script>
export default {
    data () {
        return {
            options:[],
            nameSelect:[],
            input:'',
            chargeTableDate:[],
        }
    },
    methods: {
        addNewTemplate(){
            
        }
    }
}
</script>

