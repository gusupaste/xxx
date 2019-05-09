<template>
    <div>
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

