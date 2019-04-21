<template>
  <div class='discountbudget wrap'>
    <div class="header">
      <p>YOU ARE HERE : 校园 >> <span class="font-cl-blue">校园折扣预算</span></p>
      <p><span>城际：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">区域：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">品牌：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">学年：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">折扣类型：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
        <span class="right"><el-button type="text" @click="addSchool"><i class="fa fa-upload" aria-hidden="true"></i>&nbsp;&nbsp;导出</el-button></span>
        <span class="right"><el-button type="text" @click="addSchool"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;导入</el-button></span>
      </p>
      <el-table
        :data="tableData"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="code"
          label="编号"
          min-width="30">
        </el-table-column>
        <el-table-column
          prop="name"
          label="校园名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="discount_type"
          label="折扣类型">
        </el-table-column>
        <el-table-column
          prop="discount_budget"
          label="折扣预算">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="30">
          <template slot-scope="scope">
            <i class="fa fa-pencil-square-o orange right"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, slot"
        prev-text="上一页"
        next-text="下一页"
        :total="1000" class="page">
        <div class="div-page"><input class="el-input__inner input-page" type="text"/><div class="div-page-sure">确定</div></div>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '全部',
        tableData: [{
          code: '1001',
          name: '北京首府校园',
          discount_type: '城际1',
          discount_budget: '双语',
        },
          {
            code: '1001',
            name: '北京首府校园',
            discount_type: '城际1',
            discount_budget: '双语',
          }]
      }
    }
  }
</script>

<style>
  .discountbudget {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .discountbudget p {
    margin: 10px;
  }

  .discountbudget .header p {
    font-size: 14px;
  }

  .discountbudget .el-button--text {
    background: 0 0;
    padding: 10px;
    border-radius: 25px;
    width: 80px;
    background-color: #0b6289;
    color: white;
    margin: 0 5px;
  }
  .discountbudget .page{
    text-align: center;
    padding: 30px;
  }
  .discountbudget .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: orange;
  }
  .discountbudget .div-page{
    display: -webkit-inline-box;
    width: 70px;
    text-align: left;
    height: auto;
    margin-left: 5px;
  }
  .discountbudget .div-page .input-page{
    height: 28px;
    width: 60%;
    padding: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .discountbudget .div-page .div-page-sure{
    height: 26px;
    line-height: 26px;
    border: 1px solid #ccc;
    padding: 0 10px;
    margin-left: -32px;
    color: #606266;
    font-size: 12px;
    border-radius: 2px;
  }
</style>
