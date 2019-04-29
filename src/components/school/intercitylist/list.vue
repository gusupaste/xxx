<template>
    <div class="intercitylist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 校园 > <span class="font-cl-blue">城际列表</span></p>
        <p class="bold mt10">伊顿国际教育集团大城际分布</p>
      </div>
      <div class="content mt26">
        <div class="intercity-list">
          <el-card class="box-card" style="line-height:280px;text-align:center">
            <span class="circle" @click="addintercityVisible = true"> 
              +
            </span>
          </el-card>
        </div>
        <div class="intercity-list" v-for="(item,index) in intercityList" :key="index">
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <div style="width:80%;line-height:1" class="left">
                <span class="city-name font-cl-blue">{{item.dept_name}}</span>
                <br>
                <span class="font-size-5">负责人：{{item.manager}}</span>
              </div>
              <div class="left" style="width:15%">
                  <el-button type="text" @click="editIntercity(item)">
                  <i class="fa fa-edit icon-font"></i>
                </el-button>
              </div>
            </div>
            <draggable class="list-group" :list="list1" group="people" @change="log">
              <div class="list-group-item intercity-li"
                   v-for="(element, index) in list1"
                   :key="element.name">
                {{ element.name }} {{ index }}
              </div>
            </draggable>
          </el-card>
        </div>
      </div>
      <el-dialog title="新增城际" :visible.sync="addintercityVisible" width="50%" >
        <el-dialog
          width="30%"
          title="选择负责人"
          :visible.sync="addinnerVisible"
          append-to-body>
          <p>
            <span>员工姓名：</span>
            <el-input v-model="searchPerson" style="width:164px"></el-input>
            <el-button type="primary" @click="getPerson">查询</el-button>
          </p>
          <el-table
            class="mt10"
            ref="singleTable"
            :data="personTable"
            style="width: 100%">
            <el-table-column
              type="选择"
              label="选择"
              width="100">
              <template slot-scope="scope">
                <el-radio v-model="choosePerson" @change="checkedPerson(scope.row)"></el-radio>
              </template>
            </el-table-column>
            <el-table-column
              property="name"
              label="员工姓名"
              width="120">
            </el-table-column>
            <el-table-column
              property="email"
              label="邮箱">
            </el-table-column>
          </el-table>
          <el-pagination
            background
           @current-change="handleCurrentChange"
            layout="prev, pager, next, jumper"
            :page-size="1"
            :current-page="currentPage"
            :total="count">
          </el-pagination>
        </el-dialog>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="城际名称：" prop="name" class="w250_input">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="城际代码：" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="person">
            <el-input v-model="form.person.name" disabled style="width:164px"></el-input>
            <el-button type="primary" @click="addinnerVisible = true">
              <i class="fa fa-search"></i>
            </el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-align-center">
          <el-button @click="addintercityVisible = false" class="bg-grey white">取 消</el-button>
          <el-button type="success" @click="addIntercity('form')">保 存</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑城际" :visible.sync="editintercityVisible" width="80%" >
        <el-form ref="form" :model="checkedItem" :rules="rules" label-width="100px">
          <el-form-item label="城际名称：" prop="name">
            <el-input v-model="checkedItem.dept_name" class="w250_input" style="width:250px"></el-input>
            <span class="cur red ml10" @click="deleteDialog=true">删除此城际？</span>
          </el-form-item>
          <el-form-item label="城际代码：" prop="code">
            <el-input v-model="checkedItem.dept_code"></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="person">
            <el-input v-model="checkedItem.manager"></el-input>
          </el-form-item>
          <el-form-item label="学校：">
            <div class="item-div1">
              <p>无归属城际的学校</p>
              <div class="item-div2-span">
                <el-checkbox-group v-model="schoolType">
                  <el-checkbox v-for="school in selectSchool" :key="school.id" :label="school.name"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="item-div2">
              <p>已选学校</p>
              <div class="item-div2-span">
                <p v-for="unschool in UNSelectSchool" :key="unschool.id">{{ unschool.name }}<span class="el-icon-delete" @click="selectFun(unschool)"></span></p>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editintercityVisible = false" class="bg-grey white">取 消</el-button>
          <el-button type="success" @click="editintercityVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 删除城际 -->
      <el-dialog
        title="删除城际"
        :visible.sync="deleteDialog"
        width="30%">
        <span class="text-align-center" style="width:100%;display:inline-block;height:50px;line-height:50px">
          【<span class="font-cl-blue udline">{{checkedItem.dept_name}}</span>】
          下已关联校园，一旦删除，数据将不可恢复。是否确定删除？</span>
        <span slot="footer" class="dialog-footer">
          <el-button class="bg-grey bd-grey white" @click="deleteDialog = false">取 消</el-button>
          <el-button class="bg-green bd-green white" type="primary" @click="deleteIntercity">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import draggable from 'vuedraggable';
  export default {
    components: {
      draggable
    },
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        searchPerson:"",
        personTable:[],
        choosePerson:Number,
        /**分页数据 */
        count:1,
        currentPage:1,
        pagesize:1,
        data: generateData(),
        value1: [1, 4],
        /**弹窗参数 */
        addintercityVisible : false,
        addinnerVisible : false,
        editintercityVisible : false,
        deleteDialog:false,
        balls: [
          {
            id:1,
            name:'haha1',
          },
          {
            id:2,
            name:'haha2',
          }
        ],
        form: {
          name: '',
          code: '',
          person:{},
        },
        checkedItem:{},
        intercityList:[],
        schoolType:[],
        rules: {
          name: [
            {required: true, message: '请输入城际名称', trigger: 'blur'},
            {min:1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入城际代码', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          person: [
            {required: true, message: '请输入负责人名称', trigger: 'blur'},
          ],
        },
        list1: [
          { name: "John", id: 1 },
          { name: "Joao", id: 2 },
          { name: "Jean", id: 3 },
          { name: "Gerard", id: 4 }
        ],
        list2: [
          { name: "Juan", id: 5 },
          { name: "Edgard", id: 6 },
          { name: "Johnson", id: 7 }
        ],
        list2: [
          { name: "Juan", id: 5 },
          { name: "Edgard", id: 6 },
          { name: "Johnson", id: 7 }
        ],
        selectSchool: [
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
        UNSelectSchool: [
          {
            name: "幼儿园4",
            id: 4,
          },
          {
            name: "幼儿园5",
            id: 5
          },
          {
            name: "幼儿园6",
            id: 6
          }
        ],
      };
    },
    created () {
      this.getPerson();
      this.getIntercity();
    },
    methods: {
      addIntercity(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            this.$axios.post('http://192.168.1.197:8000/api/common/intercity/',{
                dept_name:_this.form.name,
                dept_code:_this.form.code,
                manager_id:_this.form.person.id,
            }).then(res=>{
              _this.$message({
                type:'success',
                message:'新增城际成功'
              })
              console.log(res.data);
              _this.addintercityVisible = false;
              _this.getIntercity()
            }).catch(err=>{
              _this.$message({
                type:'error',
                message:'新增失败'
              });
              _this.addintercityVisible = false;
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
          
      },
      editIntercity(val){
        console.log(val)
        this.checkedItem = val;
        this.editintercityVisible = true;
      },
      deleteIntercity(){
          var _this = this;
          this.$axios.delete('http://192.168.1.197:8000/api/common/intercity/'+this.checkedItem.id+'/',)
          .then(res=>{
            _this.$message({
                type:'success',
                message:'删除城际成功'
            })
            _this.getIntercity();
          }).catch(err=>{
            _this.$message({
                type:'error',
                message:'删除城际失败'
            })
        })
        this.editintercityVisible = false;
        this.deleteDialog = false;
      },
      getIntercity(){
          var _this = this;
          this.$axios.get('http://192.168.1.197:8000/api/common/intercity/',).then(res=>{
            _this.intercityList = res.data.intercity_list;
            _this.addintercityVisible = false;
          }).catch(err=>{
          console.log(err)
        })
      },
      getPerson(){
          var _this = this;
          this.$axios.get('http://192.168.1.197:8000/api/common/select/user_list/',{
            params:{
              user_name:_this.searchPerson,
              page:_this.currentPage,
              size:10
            }
          }).then(res=>{
            _this.personTable = res.data.results.results;
            _this.count = res.data.results.page_number;
            // _this.addintercityVisible = false;
          }).catch(err=>{
          console.log(err)
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(this.currentPage)
      },
      checkedPerson(val) {
        this.form.person = val;
      },
      add: function() {
        this.list.push({ name: "Juan" });
      },
      replace: function() {
        this.list = [{ name: "Edgard" }];
      },
      clone: function(el) {
        return {
          name: el.name + " cloned"
        };
      },
      log: function(evt) {
        window.console.log(evt);
      },
      // handleCurrentChange(val) {
      //   this.currentRow = val;
      // },
      selectFun: function(obj) {
        console.log(obj);
      }
    },
    watch: {
      currentPage:function(){
        this.getPerson();
      }
    }
  }
</script>

<style scoped>
  .intercitylist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .intercitylist >>> .el-dialog__header{
        background-color: #f5f5f5;
        padding: 15px;
        font-size: 12px !important;
        border-bottom: 1px solid #d5d5d5;
    }
  .intercitylist >>> .el-dialog__title{
        font-size: 14px;
    }
  .intercitylist .bold{
    font-weight: bold;
    color: black;
  }
  .intercitylist .intercity-list{
    width: 210px;
    height: 300px;
    display: inline-block;
    margin-right: 2%;
  }
  .intercitylist .intercity-list:last-child{
    margin-right: 0;
  }
  .intercitylist .city-name{
    font-weight: 600;
    display: block;
    font-size: 16px;
  }
  .intercitylist .intercity-li{
    border: 1px solid #ddd;
    padding: 5px 20px;
    border-radius: 20px;
    background-color: #fafafa;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .intercitylist .el-card{
    width: 220px;
    height: 280px;
  }
  .intercitylist .el-card__header{
    padding: 10px 15px;
  }
  .intercitylist .el-card__body {
    padding: 10px 15px;
    overflow: auto;
    height: 185px;
  }
  .intercitylist .span-button{
    font-size: 70px;
    text-align: center;
    margin-top: 80px;
    margin-left: 55px;
    cursor: pointer;
  }
  .intercitylist .el-dialog__footer{
    text-align: center;
  }
  .intercitylist .item-div1,.intercitylist .item-div2{
    width: 220px;
    height: 350px;
    padding-left: 20px;
    border: 1px solid #ddd;
    margin-right: 20px;
    display: inline-table;
  }
  .intercitylist .item-div2 p{
    border-bottom: 1px solid #ddd;
  }
  .intercitylist .item-div2 span{
    margin-right: 5px;
    color: red;
    font-size: 18px;
    cursor: pointer;
    float: right;
    margin-top: 10px;
  }
  .intercitylist .item-div1-span,.intercitylist .item-div2-span{
    height: 300px;
    overflow: auto;
  }
  .intercitylist .el-checkbox-group{
    width: 220px;
  }
  .intercitylist .el-checkbox{
    display: block;
  }
  .intercitylist >>> .el-table td{
    padding: 5px 0 !important;
  }
</style>
