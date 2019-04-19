<template>
  <div class="settlementedit wrap">
    <div class="header">
      <p>YOU ARE HERE : 系统管理 >> <span>品牌管理</span></p>
    </div>
    <div class="settlementedit-content">
      <el-form ref="settlementForm" :model="settlementForm" label-width="80px">
        <el-form-item label="模版名称">
          <el-input v-model="settlementForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学年">
          <el-select v-model="settlementForm.year">
            <el-option v-for="year in selectYear" :label="year.year" value="year.id"></el-option>
            <el-option ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        selectYear:[{
          id:1,
          year:2018,
        },{
          id:2,
          year:2019,
        }],
        settlementForm: {
          name: '',
          year: ''
        }
      }
    }
  }
</script>

<style>
  .settlementedit .header p{
    font-size: 14px;
  }
  .settlementedit{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .settlementedit .settlementedit-content{
    margin-top: 20px;
  }
</style>
