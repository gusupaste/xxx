<template>
  <div class="schoollist">
    <div class="content">
      <p>YOU ARE HERE : 校园 >> <span class="font-cl-blue">校园列表</span></p>
      <p class="bold">伊顿旗下的校园列表，你可以选择查看某个区域或城市下的校园信息。</p>
      <p><span>城际：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-30">区域：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-30">省市：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-30"><el-button type="primary">搜索</el-button></span>
        <span class="right"><el-button class="font-cl-blue" type="text" @click="addSchool">新增校园</el-button></span>
      </p>
      <el-table
        :data="tableData"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="index"
          label="编号"
          min-width="30">
        </el-table-column>
        <el-table-column
          prop="name"
          label="校园名称"
          width="180">
          <template slot-scope="scope">
              <router-link :to="{name:'school-detail'}">{{ scope.row.name }}</router-link>
          </template>

        </el-table-column>
        <el-table-column
          prop="intercity"
          label="所属城际">
        </el-table-column>
        <el-table-column
          prop="brand"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="date"
          label="开园日期">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="园长">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="30">
          <template slot-scope="scope">
            <el-button @click="editSchool" class="red" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, slot"
        prev-text="上一页"
        next-text="下一页"
        :total="1000" class="page">
          <!--<el-input class="page-input"></el-input>-->
        <div class="div-page"><input class="el-input__inner input-page" type="text"/><div class="div-page-sure">确定</div></div>
      </el-pagination>
    </div>
  </div>
</template>

<style>
  .schoollist p {
    margin: 10px;
  }

  .schoollist a{
    color: #0b6289 !important;
  }

  .schoollist {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .schoollist .bold {
    font-weight: bold;
    color: black;
  }

  .schoollist .content {
    padding: 20px 70px 50px 70px;
  }

  .schoollist .padding-30 {
    padding-left: 30px;
  }

  .schoollist .right {
    float: right;
  }

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-table >>> th {
    background-color: #f5f5f5;
  }

  .schoollist .red {
    color: red;
  }
  .schoollist .page{
    text-align: center;
    padding: 30px;
  }
  .schoollist .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: orange;
  }
  .schoollist .div-page{
    display: -webkit-inline-box;
    width: 70px;
    text-align: left;
    height: auto;
    margin-left: 5px;
  }
  .schoollist .div-page .input-page{
    height: 28px;
    width: 60%;
    padding: 0;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .schoollist .div-page .div-page-sure{
    height: 26px;
    line-height: 26px;
    border: 1px solid #ccc;
    padding: 0 10px;
    margin-left: -32px;
    color: #606266;
    font-size: 12px;
    border-radius: 2px;
  }
  .schoollist .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    border: 1px solid #ccc;
    background-color: white;
  }
  .schoollist .el-pagination button, .el-pagination span:not([class*=suffix]) {
    padding: 0 10px;
  }
</style>

<script>
  export default {
    components: {
    },
    data() {
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
          index: '1001',
          name: '北京首府校园',
          intercity: '城际1',
          brand: '双语',
          date: '2019/11/01',
          leader: '朱园长',
          phone: '18809876543',
          status: '开园'
        }, {
          index: '1002',
          name: '北京首府校园',
          intercity: '城际2',
          brand: '双语',
          date: '2019/11/01',
          leader: '朱园长',
          phone: '18809876543',
          status: '开园'
        }, {
          index: '1003',
          name: '北京首府校园',
          intercity: '城际3',
          brand: '双语',
          date: '2019/11/01',
          leader: '朱园长',
          phone: '18809876543',
          status: '开园'
        }, {
          index: '1004',
          name: '北京首府校园',
          intercity: '城际4',
          brand: '双语',
          date: '2019/11/01',
          leader: '朱园长',
          phone: '18809876543',
          status: '开园'
        }]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addSchool:function () {
        this.$router.push({name: 'school-add'});
        /*this.$router.push({name: 'school/school-add',params:{ id:'1'}});*/
      },
      editSchool:function () {
        this.$router.push({name: 'school-edit'});
      }
    }
  }
</script>
