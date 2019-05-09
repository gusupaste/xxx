<template>
    <div>
        <div class="select-header select-length">
                <span>城际：</span>
                <el-select v-model="nameSelect" placeholder="--区域--">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin-left: 10px">区域：</span>
                <el-select v-model="nameSelect" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin-left: 10px">校园：</span>
                <el-select v-model="nameSelect" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span style="margin-left: 10px">学年：</span>
                <el-select v-model="nameSelect" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="padding-left-30"><el-button type="primary" @click="searchList">搜索</el-button></span>
              </div>
              <el-table
                :data="chargeFunTableDate"
                border
                stripe
                show-header
                style="width: 100%;margin-top: 10px;">
                <el-table-column
                  prop="code"
                  label="收费政策"
                  width="250">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showPolicyVisible = true">{{ scope.row.code }}</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="适用校园">
                </el-table-column>
                <el-table-column
                  prop="intercity_name"
                  label="学年"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="hq_name"
                  label="有效期"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="opening_date"
                  label="发布日期"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="leader"
                  label="备注">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="innerVisible = true" style="color: #ED6C2E">复制</el-button>
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
            chargeFunTableDate:[]
        }
    },
    methods: {
        addNewTemplate(){
            
        },
        searchList(){

        }
    }
}
</script>

