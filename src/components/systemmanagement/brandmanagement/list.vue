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
            <el-card class="box-card add-card" >
              <img src="../../../assets/img/add.png">
            </el-card>
            <!--<el-card class="box-card">
              <span class="el-icon-circle-plus-outline span-button" @click="addAndEditBrand(-1,0)"></span>
            </el-card>-->
          </div>
          <div class="intercity-list" v-for="(card,index) in cardList" :key="index">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span class="city-name font-cl-blue" style="line-height: 40px">{{ card.name }}</span>
                <el-button type="text" @click="addAndEditBrand(1,card.id)">
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
              <span v-if="scope.row.edit === true">{{ scope.row.code }}</span>
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
          <el-button type="success" @click="saveClassManage(0)">保 存</el-button>
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
          <el-button type="success" @click="saveClassManage(1)">保 存</el-button>
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

      <el-dialog title="确认删除" :visible.sync="deleteVisible" width="400px">
        <p class="mt26 text-align-center">确认删除？</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="success" @click="sureDelete">确 定</el-button>
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
  .brandmanagement .add-card{
    text-align: center;
    position: relative;
    /*background:url('../../../assets/img/add.png') no-repeat;*/
    background-position: 0;
  }
  .brandmanagement .add-card img{
    width: 30%;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
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
    /*display: inline-block;*/
    margin-right: 2%;
    float: left;
  }
  .brandmanagement .el-card{
    height: 220px;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .brandmanagement >>> .el-card .el-button--text{
    float: right;
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
    margin-top: 75px;
    margin-left: 80px;
    cursor: pointer;
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
</style>
<script>
  export default {
    components: {
    },
    data() {
      return {
        tol_url:'http://134.175.93.59:8000',
        class_type:[],
        grade_type:[],
        brandName:'添加品牌',
        cardList:[],
        editbrandVisible: false,
        classManageVisible:false,
        yearManageVisible:false,
        deleteVisible:false,
        editForm:{
          id:'',
          name:'',
          klass:[],
          grade:[],
        },
        deleteForm:{
          id:'',
          type:'',
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
      };
    },
    mounted:function(){
      this.getClassType();
      this.getGradeType();
      this.getBrandList();
    },
    methods: {
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
        if(obj.id === ''){
          console.log(obj);
          if(flag === 0){//班级
            this.class_type.splice(this.class_type.findIndex(item => item.id === obj.id), 1);
          }else if(flag === 1){//年级
            this.grade_type.splice(this.grade_type.findIndex(item => item.id === obj.id), 1);
          }
        }else{
          this.deleteForm.id = obj.id;
          this.deleteForm.type = flag === 0 ? 'cl_type' : 'gr_type';
          this.deleteVisible = true;
        }
      },
      sureDelete:function(){
        var _this = this;
        var url = this.tol_url + '/api/common/';
        if(_this.deleteForm.type === 'cl_type'){
          url = url + 'class_type/'+_this.deleteForm.id+'/';
        }else{
          url = url + 'grade_type/'+_this.deleteForm.id+'/';
        }
        _this.$axios.delete(url).then(res=>{
          _this.loading = false;
          if(res.status == 204) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            if(this.deleteForm.type === 'cl_type'){//班级
              this.class_type.splice(this.class_type.findIndex(item => item.id === this.deleteForm.id), 1);
            }else if(this.deleteForm.type === 'gr_type'){//年级
              this.grade_type.splice(this.grade_type.findIndex(item => item.id === this.deleteForm.id), 1);
            }
          }else if(res.status === 200 && res.data.status === 1){
            var car_name = '';
            if(_this.deleteForm.type === 'cl_type'){
              car_name = '班级';
            }else{
              car_name = '年级';
            }
            this.$message({
              message: '该'+car_name+'已被使用，不能删除',
              type: 'warning'
            });
          }
        }).catch(err=>{
          console.log(err)
        })
        this.deleteVisible = false;
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
      addAndEditBrand:function(num,id){
        this.editbrandVisible = true;
        if(num === -1){
          this.brandName = '添加品牌';
        }else{
          this.brandName = '编辑品牌';
        }
        if(id === 0){
          this.editForm.name = '';
          this.editForm.klass = [];
          this.editForm.grade = [];
        }else{
          this.editBrandInfo(id);
        }
      },
      handleClick(row) {
        console.log(row);
      },
      getClassType: function () {
        var _this = this;
        _this.loading = true;
        var url = this.tol_url + '/api/common/class_type/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            this.class_type = [];
            var class_types = res.data;
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
        var url = this.tol_url + '/api/common/grade_type/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            this.grade_type=[];
            var grade_types = res.data;
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
        var url = this.tol_url + '/api/hq/hq/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            this.cardList = res.data;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      editBrandInfo:function (brandId) {
        var _this = this;
        _this.loading = true;
        var url = this.tol_url + '/api/hq/hq/'+brandId+'/';
        _this.$axios.get(url).then(res=>{
          _this.loading = false;
          if(res.status == 200) {
            console.log(res.data);
            var new_obj = res.data[0];
            this.editForm.grade = new_obj.grade_types;
            this.editForm.klass = new_obj.class_types;
            this.editForm.name = new_obj.name;
            this.editForm.id = new_obj.id;
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      saveBrand:function () {
        var _this = this;
        _this.loading = true;
        var url = this.tol_url + '/api/hq/hq/';
        if(!isNaN(_this.editForm.id)){
          console.log();
          url = url + _this.editForm.id +'/';
          _this.$axios.put(url, {
            name:_this.editForm.name,
            class_types:_this.editForm.klass,
            grade_types:_this.editForm.grade,
          }).then(res=>{
            _this.loading = false;
            if(res.status == 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }else{
              this.$message.error('保存失败');
            }
            _this.editbrandVisible = false;
            _this.getBrandList();
          }).catch(err=>{
            console.log(err)
          })
        }else{
          _this.$axios.post(url, {
            name:_this.editForm.name,
            class_types:_this.editForm.klass,
            grade_types:_this.editForm.grade,
          }).then(res=>{
            _this.loading = false;
            if(res.status == 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }else{
              this.$message.error('保存失败');
            }
            _this.editbrandVisible = false;
            _this.getBrandList();
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      saveClassManage:function (flag) {
        var types = [];
        var url = '';
        if(flag === 0){
          types = this.class_type;
          url = this.tol_url + '/api/common/class_type/';
        }else{
          types = this.grade_type;
          url = this.tol_url + '/api/common/grade_type/';
        }
        for(var x in types){
          if(types[x].id === ''){
            var _this = this;
            _this.loading = true;
            _this.$axios.post(url, {
              name: types[x].name,
              sort_order: 0,
              code: types[x].code,
            }).then(res => {
              _this.loading = false;
              if (res.status == 201) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
              } else {
                this.$message.error('保存失败');
              }
            }).catch(err => {
              console.log(err)
            })
          }else if(types[x].edit === false){
            var _this = this;
            _this.loading = true;
            var n_url = url + types[x].id+'/';
            _this.$axios.put(n_url, {
              name: types[x].name,
              sort_order: 0,
              code: types[x].code,
            }).then(res => {
              _this.loading = false;
              if (res.status == 200) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
              } else {
                this.$message.error('保存失败');
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
        if(flag === 0){
          this.getClassType();
          this.classManageVisible = false;
        }else{
          this.getGradeType();
          this.yearManageVisible = false;
        }
      },
    }
  }
</script>
