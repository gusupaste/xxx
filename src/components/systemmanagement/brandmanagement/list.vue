<template>
    <div class='brandmanagement wrap'>
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">品牌管理</span></p>
      </div>
      <div class="brandmanagement-content">
        <div class="content-top">
          <div class="top">
            <span class="top-span">班级项目：</span>
            <el-button class="el-button" type="primary" @click="classManageVisible = true">管理</el-button><br>
            <span v-model="class_type" class="top-span-bot">
              <span v-for="klass in class_type" :key="klass.id">{{klass.name}};&nbsp;&nbsp;</span>
            </span>
          </div>
          <div class="top">
            <span class="top-span">年级项目：</span>
            <el-button class="el-button" type="primary" @click="yearManageVisible = true">管理</el-button><br>
            <span v-model="grade_type" class="top-span-bot">
              <span v-for="grade in grade_type" :key="grade.id">{{grade.name}};&nbsp;&nbsp;</span>
            </span>
          </div>
        </div>
        <div class="content">
          <div class="intercity-list">
            <el-card class="box-card">
              <span class="el-icon-circle-plus-outline span-button" @click="addAndEditBrand(-1,0)"></span>
            </el-card>
          </div>
          <div class="intercity-list"  v-for="(card,index) in cardList" :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="city-name font-cl-blue" style="line-height: 40px">{{ card.name }}</span>
                <el-button type="text" @click="addAndEditBrand(1,1)">
                  <span class="el-icon-edit-outline" style="font-size: 20px;color: #ED6C2E;"></span>
                </el-button>
              </div>
              <ul>
                <li>
                  <span class="el-card-li">班级项目：</span>
                  <span class="spanLi span-font"><span v-for="ctype in card.class_types">{{ ctype.name }}&nbsp;</span></span>
                  <br>
                </li>
                <li>
                  <span class="el-card-li">年级项目：</span>
                  <span class="spanLi"><span v-for="gtype in card.grade_types" style="">{{ gtype.name }}&nbsp;</span></span><br>
                </li>
              </ul>
            </el-card>
          </div>
        </div>
      </div>
      <el-dialog title="新增品牌" :visible.sync="addbrandVisible" width="500px" style="padding: 30px 60px;">
        <el-form label-width="80px">
          <el-form-item label="品牌名称">
            <el-input v-model="brandName" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addbrandVisible = false">取 消</el-button>
          <el-button type="success" @click="addbrandVisible = false">保 存</el-button>
        </span>
      </el-dialog>

      <el-dialog title="班级管理" :visible.sync="classManageVisible" min-width="600px">
        <el-table
          :data="class_type"
          border
          style="width: 100%;text-align: center !important;">
          <el-table-column
            label="班级类型编码"
            width="220">
            <template slot-scope="scope">
              <el-input v-model="scope.row.code" placeholder="请输入内容" v-if="scope.row.edit === false"></el-input>
              <span v-if="scope.row.edit === true">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="班级类型">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容" v-if="scope.row.edit === false"></el-input>
              <span v-if="scope.row.edit === true">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button v-show="scope.row.id" @click="editManage(scope.row,0)" type="text" size="small"><span class="el-icon-edit"></span></el-button>
              <el-button @click="deleteButton(scope.row,0)" type="text" size="small"><span class="el-icon-delete"></span></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="addClassButton">
          <i class="fa fa-plus-square" aria-hidden="true" @click="addClassButton(0)" style="padding: 15px;">&nbsp;&nbsp;新增班级类型</i>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="classManageVisible = false">取 消</el-button>
          <el-button type="success" @click="classManageVisible = false">保 存</el-button>
        </span>
      </el-dialog>

      <el-dialog title="年级管理" :visible.sync="yearManageVisible" min-width="600px">
        <el-table
          :data="grade_type"
          border
          style="width: 100%;text-align: center !important;">
          <el-table-column
            label="年级类型编码"
            width="220">
            <template slot-scope="scope">
              <el-input v-model="scope.row.code" placeholder="请输入内容" v-if="scope.row.edit === false"></el-input>
              <span v-if="scope.row.edit === true">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="年级类型">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入内容" v-if="scope.row.edit === false"></el-input>
              <span v-if="scope.row.edit === true">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button v-show="scope.row.id" @click="editManage(scope.row,1)" type="text" size="small"><span class="el-icon-edit"></span></el-button>
              <el-button @click="deleteButton(scope.row,1)" type="text" size="small"><span class="el-icon-delete"></span></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="addClassButton">
          <i class="fa fa-plus-square" aria-hidden="true" @click="addClassButton(1)" style="padding: 15px;">&nbsp;&nbsp;新增年级类型</i>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="yearManageVisible = false">取 消</el-button>
          <el-button type="success" @click="yearManageVisible = false">保 存</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="brandName" :visible.sync="editbrandVisible" min-width="600px">
        <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px">
          <el-form-item label="品牌名称">
            <el-input v-model="editForm.name" size="small" placeholder="品牌名称限制15个字" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="班级项目">
            <el-checkbox-group v-model="editForm.klass" style="text-align: left;padding-left: 5px;">
              <el-checkbox v-for="(klass,index) in class_type" :key="index" :label="klass.id">{{ klass.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="年级项目">
            <el-checkbox-group v-model="editForm.grade" style="text-align: left;padding-left: 5px;">
              <el-checkbox v-for="(grade,ind) in grade_type" :key="ind" :label="grade.id">{{grade.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editbrandVisible = false">取 消</el-button>
          <el-button type="success" @click="saveBrand">保 存</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<style scoped>
  .brandmanagement .header p{
    font-size: 14px;
  }
  .brandmanagement{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .brandmanagement .content-top{
    min-height: 120px;
    border: 1px solid #ddd;
    margin: 10px 0px;
    padding: 10px;
    text-align: left;
  }
  .brandmanagement .top-span{
    color: #006287;
  }
  .brandmanagement .top-span-bot{
    color: #A0A0A0;
    font-size: 10px;
    line-height: 40px;
  }
  .brandmanagement >>> .content-top .el-button{
    height: 0 !important;
    font-size: 10px;
    background-color: #ED6C2E;
    border-color: #ED6C2E;
  }
  .brandmanagement >>> .intercity-list{
    width: 23%;
    display: inline-block;
    margin-right: 2%;
  }
  .brandmanagement .intercity-li{
    border: 1px solid #ddd;
    padding: 5px 20px;
    border-radius: 50px;
    background-color: #ddd;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .brandmanagement .el-card{
    height: 220px;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .brandmanagement >>> .el-card .el-button--text{
    float: right;
    /*margin-top: 5px;*/
    padding: 0;
  }
  .brandmanagement >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  .brandmanagement >>> .el-card__header{
    padding: 10px 0px;
  }
  .brandmanagement >>> .el-card__body {
    padding: 0px 0px;
    overflow: auto;
  }
  .brandmanagement .el-card__body ul{
    color: #A0A0A0;
    list-style: inside;
  }
  .brandmanagement .el-card__body ul li:first-child{
    border-bottom:1px solid #ddd;
  }
  .brandmanagement .el-card__body ul li{
    padding: 15px 0px;
    position: relative;
    height: 50px;
  }
  .brandmanagement .span-button{
    font-size: 70px;
    text-align: center;
    margin-top: 40px;
    margin-left: 55px;
    cursor: pointer;
  }
  .brandmanagement .el-dialog__body {
    color: #606266;
    font-size: 14px;
  }
  .brandmanagement .el-input__inner{
    width: 80%;
  }
  .brandmanagement >>> .el-dialog__footer{
    text-align: center;
  }
  .brandmanagement .e-card-p{
    line-height: 30px;
    background-color: #ddd;
    padding: 5px;
  }
  .brandmanagement .el-card-li{
    font-size: 8px;
    color: #A0A0A0;
    width: 100%;
    overflow: hidden;
  }
  .brandmanagement .spanLi{
    width: 60%;
    position: absolute;
  }
  .brandmanagement .span-font{
    color: #333333;
    font-weight: bold;
    line-height: 20px !important;
  }
  .brandmanagement .el-table--enable-row-transition .el-table__body td,.brandmanagement .el-table th>.cell{
    text-align: center;
  }
  .brandmanagement .addClassButton{
    width: 99.7%;
    border-top: 0px !important;
    border: 1px solid #EBEEF5;
    color: #ED6C2E;
  }
  .brandmanagement .addClassButton i{
    cursor: pointer;
  }
  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
   padding: 0 !important;
  }
  .brandmanagement .card-li-div{
    width: 155px;
    height: 58px;
    position: absolute;
    display: inline;
    line-height: 20px;
    padding-top: 10px;
  }
</style>
<script>
  export default {
    components: {
    },
    data() {
      return {
        class_type:[],
        grade_type:[],
        brandName:'添加品牌',
        cardList:[],
        klass:'',
        addbrandVisible: false,
        editbrandVisible: false,
        classManageVisible:false,
        yearManageVisible:false,
        brandName: '',
        editForm:{
          id:'',
          name:'',
          klass:[],
          grade:[],
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        manageTitle:'班级管理',
        typeChebox:[],
        klassType:[
          {
            name: "幼儿园1",
            id: 1,
          },
          {
            name: "幼儿园2",
            id: 2
          },
          {
            name: "幼儿园3",
            id: 3
          }
        ],
        gradeType:[
          {
            name: "幼儿园1",
            id: 1,
          },
          {
            name: "幼儿园2",
            id: 2
          },
          {
            name: "幼儿园3",
            id: 3
          }
        ],
        type:[
          {
            name: "幼儿园1",
            id: 1,
          },
          {
            name: "幼儿园2",
            id: 2
          },
          {
            name: "幼儿园3",
            id: 3
          }
        ],
        tableData: [{
          id: 1,
          no:'1',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          edit: true,
          type:[{
            id:7,
            checkName:'checkbox7',
          },
            {
              id:7,
              checkName:'checkbox7',
            },
            {
              id:7,
              checkName:'checkbox7',
            }],
          },{
          id: 2,
          no:'2',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          edit: true,
          che:[],
          type:[{
            id:7,
            checkName:'checkbox7',
          },
            {
              id:7,
              checkName:'checkbox7',
            },
            {
              id:7,
              checkName:'checkbox7',
            }],
        }, {
          id: 3,
          no:'3',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          edit: true,
          che:[],
          type:[{
            id:7,
            checkName:'checkbox7',
          },
            {
              id:7,
              checkName:'checkbox7',
            },
            {
              id:7,
              checkName:'checkbox7',
            }],
        }, {
          id: 4,
          no:'4',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          edit: true,
          che:[],
          type:[{
            id:1,
            checkName:'checkbox1',
          },
          {
            id:2,
            checkName:'checkbox2',
          },
          {
            id:3,
            checkName:'checkbox3',
          }],
        }],
        columnLabel2:'班级类型',
        multipleSelection:'',
      };
    },
    mounted:function(){
      this.getClassType();
      this.getGradeType();
      this.getBrandList();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addDialog: function () {
        this.addbrandVisible = true;
        this.brandName = '';
      },
      addClassButton: function(flag){
        var obj = {
          id:'',
          sort_order:'',
          name: '',
          code: '',
          edit: false,
        }
        if(flag === 0){
          this.class_type.push(obj);
        }else{
          this.grade_type.push(obj);
        }
      },
      editManage:function(obj,flag){
        if(flag === 0){
          const index = this.class_type.findIndex(item => item.id === obj.id);
          this.class_type[index].edit = false;
        }else if(flag === 1){
          const index = this.grade_type.findIndex(item => item.id === obj.id);
          this.grade_type[index].edit = false;
        }

      },
      deleteButton: function(obj,flag){
        if(flag === 0){
          this.class_type.splice(this.tableData.findIndex(item => item.id === obj.id), 1);
        }else if(flag === 1){
          this.grade_type.splice(this.tableData.findIndex(item => item.id === obj.id), 1);
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addAndEditBrand:function(num,id){
        this.editbrandVisible = true;
        if(num === -1){
          this.brandName = '添加品牌';
        }else{
          this.brandName = '编辑品牌';
        }
      },
      handleClick(row) {
        console.log(row);
      },
      getClassType: function () {
        var _this = this;
        _this.loading = true;
        var url = 'http://134.175.93.59:8000/api/common/class_type';
        _this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjM5MzEyODMsImVtYWlsIjoiIn0.WXv6wYLCZpdWKnUq85Gr78k1s7TeD-wFsoLbUWq8n5Q'
          }
        }).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            var class_types = res.data.results;
            for(var x in class_types){
              var obj = {};
              obj.id = class_types[x].id;
              obj.name = class_types[x].name;
              obj.sort_order = class_types[x].sort_order;
              obj.code = class_types[x].code;
              obj.edit = true;
              this.class_type.push(obj);
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getGradeType:function () {
        var _this = this;
        _this.loading = true;
        var url = 'http://134.175.93.59:8000/api/common/grade_type/';
        _this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjM5MzEyODMsImVtYWlsIjoiIn0.WXv6wYLCZpdWKnUq85Gr78k1s7TeD-wFsoLbUWq8n5Q'
          }
        }).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            var grade_types = res.data.results;
            for(var x in grade_types){
              var obj = {};
              obj.id = grade_types[x].id;
              obj.name = grade_types[x].name;
              obj.sort_order = grade_types[x].sort_order;
              obj.code = grade_types[x].code;
              obj.edit = true;
              this.grade_type.push(obj);
            }
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getBrandList:function () {
        var _this = this;
        _this.loading = true;
        var url = 'http://134.175.93.59:8000/api/hq/hq/';
        _this.$axios.get(url, {
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjM5MzEyODMsImVtYWlsIjoiIn0.WXv6wYLCZpdWKnUq85Gr78k1s7TeD-wFsoLbUWq8n5Q'
          }
        }).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            this.cardList = res.data;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      saveBrand:function () {
        var _this = this;
        _this.loading = true;
        var url = 'http://134.175.93.59:8000/api/hq/hq/';
        var formData = new FormData();
        _this.$axios.post(url, {
          name:_this.editForm.name,
          class_types:_this.editForm.klass,
          grade_types:_this.editForm.grade,
        },{
          headers: {
            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvbmdodWkiLCJ1c2VyX2lkIjoyLCJleHAiOjE1NjM5MzEyODMsImVtYWlsIjoiIn0.WXv6wYLCZpdWKnUq85Gr78k1s7TeD-wFsoLbUWq8n5Q'
          }
        }).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            alert('保存成功');
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>
