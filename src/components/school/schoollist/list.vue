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
        :data="schoolList"
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
          <template slot-scope="scope">
              <router-link :to="{name:'school-detail'}">{{ scope.row.name }}</router-link>
          </template>

        </el-table-column>
        <el-table-column
          prop="intercity"
          label="所属城际">
        </el-table-column>
        <el-table-column
          prop="hq"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="opening_date"
          label="开园日期">
        </el-table-column>
        <el-table-column
          prop="leader"
          label="园长">
        </el-table-column>
        <el-table-column
          prop="telephone"
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
            <el-button @click="editSchool(scope.row)" class="red" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="pager, next, jumper"
        next-text="下一页"
        :page-size="20"
        :total="schoolList.length" class="page">
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
        schoolList: []
      };
    },
    created(){
      this.getSchoolList();
    },
    methods: {
      getSchoolList(){
        var _this = this;
        _this.$axios.get('http://192.168.51.29:8000/api/center/center/',{
          headers:{
            Authorization:"jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRhaWRpaV9lZCIsImV4cCI6MTU2MzE3ODk1NiwiZW1haWwiOiJjaGVuc2h1YWlAdGFpZGlpLmNvbSJ9.xPqGqO2JDd9eBH4bOJJF8EdovCsWS29v93RDz-S3J8o"
          },
          params:{
            username:_this.username,
            password:_this.password
        }
      }).then(res=>{
        _this.schoolList = res.data.center_list;
      }).catch(err=>{
        console.log(err)
      })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addSchool:function () {
        this.$router.push({name: 'school-add'});
        /*this.$router.push({name: 'school/school-add',params:{ id:'1'}});*/
      },
      editSchool:function (param) {
        this.$router.push('/school/school-edit/'+param.id);
      }
    }
  }
</script>
