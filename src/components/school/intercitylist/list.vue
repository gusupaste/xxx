<template>
    <div class="intercitylist wrap">
      <div class="header">
        <p class="local_path_style">YOU ARE HERE : 校园 > <span class="font-cl-blue">城际列表</span></p>
        <p class="bold mt10 black">伊顿国际教育集团大城际分布</p>
      </div>
      <div class="content mt26">
        <div class="intercity-list cur" @click="addintercityVisible=true">
          <el-card class="box-card add-card" >
              <!-- <img src="../../../assets/img/add.png" alt=""> -->
              <span class="add-new">新增城际</span>
          </el-card>
        </div>
        <div class="intercity-list" v-for="(item,index) in intercityList" :key="index">
          <el-card class="box-card" >
            <div slot="header" class="clearfix">
              <div style="width:80%;line-height:1" class="left">
                <span class="city-name font-cl-blue">{{item.dept_name}}</span>
                <br>
                <span class="font-size-5">负责人：{{item.manager_name}}</span>
              </div>
              <div class="left" style="width:15%">
                  <el-button type="text" @click="editIntercity(item)">
                  <i class="fa fa-edit icon-font cur"></i>
                </el-button>
              </div>
            </div>
            <draggable class="list-group" :list="item.center_list" group="people" @change="log" @end="end" :data-id="item.id">
              <el-tooltip class="item" effect="dark" content="鼠标点住拖拽" placement="top" v-for="s in item.center_list" :key="s.id">
                <div class="list-group-item intercity-li">
                  {{ s.name }}
                </div>
              </el-tooltip>
            </draggable>
          </el-card>
        </div>
      </div>
      <!-- 新增城际 -->
      <el-dialog title="新增城际" :visible.sync="addintercityVisible" width="50%" @close='beforeClose1'>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="城际名称：" prop="name" class="w250_input">
            <el-input v-model.trim="form.name" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="城际代码：" prop="code">
            <el-input v-model.number="form.code" maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="person">
            <el-input v-model="form.person.name" disabled style="width:164px"></el-input>
            <el-button type="primary" @click="getmana" style="height:40px">
              <i class="fa fa-search"></i>
            </el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer text-align-center">
          <el-button @click="addintercityVisible = false" class="bg-grey white">取 消</el-button>
          <el-button type="success" @click="addIntercity('form')">保 存</el-button>
        </div>
      </el-dialog>
      <!-- 编辑城际 -->
      <el-dialog title="编辑城际" :visible.sync="editintercityVisible"  width="800px" @close='beforeClose2'>
        <el-form  :model="checkedItem" :rules="rules2" ref="checkedItem" label-width="100px">
          <el-form-item label="城际名称：" prop="dept_name">
            <el-input v-model.trim="checkedItem.dept_name" class="w250_input" style="width:250px" maxlength="50"></el-input>
            <span class="cur red ml10" @click="deleteThisIntercity">删除此城际？</span>
          </el-form-item>
          <el-form-item label="城际代码：" prop="dept_code">
            <el-input v-model.number="checkedItem.dept_code"  maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label="负责人：" prop="manager_name">
            <el-input v-model="checkedItem.manager_name" disabled style="width:164px"></el-input>
            <el-button type="primary" @click="getmana" style="height:40px">
              <i class="fa fa-search"></i>
            </el-button>
          </el-form-item>
          <el-form-item label="学校：">
            <div class="item-div1">
              <p>无归属城际的学校</p>
              <div class="item-div2-span">
                <div v-for="school in checkedItem.available_centers" :key="school.id" class="clearfix cur" @click="addChooseSchool(school)">
                  <span class="inline-block overf" style="width:180px;">{{school.name}}</span>
                  <span class="inline-block">
                    <i class="fa fa-plus"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="item-div2">
              <p>已选学校</p>
              <div class="item-div2-span">
                <p v-for="unschool in UNSelectSchool" :key="unschool.id" class="clearfix">
                  <span class="inline-block overf" style="width:180px;">{{ unschool.name }}</span>
                  <span class="nline-block el-icon-delete  cur red font-size-14" @click="selectFun(unschool)"></span>
                </p>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editintercityVisible = false" class="bg-grey white">取 消</el-button>
          <el-button type="success" @click="sureEditIntercity('checkedItem')">保 存</el-button>
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
      <!-- 选择负责人 -->
      <el-dialog
          width="30%"
          class="chose-person"
          title="选择负责人"
          :visible.sync="addinnerVisible"
          append-to-body>
          <p>
            <span>员工姓名：</span>
            <el-input v-model="searchPerson" style="width:164px"></el-input>
            <el-button type="primary" @click="getPerson(1)">查询</el-button>
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
                <el-radio v-model="choosePerson" :label="scope.row"> </el-radio>
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
          <span slot="footer" class="dialog-footer">
            <el-button @click="addinnerVisible = false" class="bg-grey white">取 消</el-button>
            <el-button type="success" @click="checkedPerson">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<style scoped>
  .intercitylist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .intercitylist .add-card{
    text-align: center;
    position: relative;
    background:url('../../../assets/img/addintercity.jpg') no-repeat;
    background-position: 0;
  }
  .intercitylist >>> .el-card__body .add-new {
    display: inline-block;
    background-color: #fff;
    color:#0b6289;
    position: absolute;
    left: 50%;
    top:65%;
    transform: translate(-50%,-50%)
  }
  .chose-person >>> .el-radio__label{
    display: none !important;
  }
  .intercitylist .intercity-list{
    width: 260px;
    height: 360px;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .intercitylist .intercity-li{
    border: 1px solid #ddd;
    padding: 5px 20px;
    border-radius: 20px;
    background-color: #fafafa;
    margin-bottom: 5px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .intercitylist .el-card{
    width: 260px;
    height: 315px;
  }
  .intercitylist .list-group{
    height:160px;
    overflow:auto;
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
    padding:0 20px;
    border: 1px solid #ddd;
    margin-right: 20px;
    display: inline-table;
  }
  .intercitylist .item-div2 p{
    border-bottom: 1px solid #ddd;
  }
  .intercitylist .overf{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    vertical-align: middle;
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

<script>
  import draggable from 'vuedraggable';
  export default {
    components: {
      draggable
    },
    data() {
      return {
        searchPerson:"",
        personTable:[],
        choosePerson:"",
        /**分页数据 */
        count:1,
        currentPage:1,
        pagesize:1,
        value1: [1, 4],
        /**弹窗参数 */
        addintercityVisible : false,
        addinnerVisible : false,
        editintercityVisible : false,
        deleteDialog:false,
        /**拖拽參數 */
        add_id:'',
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
          person:'',
        },
        checkedItem:{},
        intercityList:[],
        schoolType:[],
        rules: {
          name: [
            {required: true, message: '请输入城际名称', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入城际代码', trigger: 'blur'},
            { type:'number',message: '请输入数字', trigger: 'blur' }
          ],
          person: [
            {required: true, message: '请输入负责人名称', trigger: 'blur'},
          ],
        },
        rules2: {
          dept_name: [
            {required: true, message: '请输入城际名称', trigger: 'blur'},
          ],
          dept_code: [
            {required: true, message: '请输入城际代码', trigger: 'blur'},
            { type:'number',message: '请输入数字', trigger: 'blur' }
          ],
          manager_name: [
            {required: true, message: '请输入负责人名称', trigger: 'blur'},
          ],
        },
        selectSchool: [],
        UNSelectSchool: [],
      };
    },
    created () {
      this.getPerson(1);
      this.getIntercity();
    },
    methods: {
      addIntercity(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            this.$axios.post('/api/common/intercity/',{
                dept_name:_this.form.name,
                dept_code:_this.form.code,
                manager_id:_this.form.person.id,
            }).then(res=>{
              if(res.data.status_code === 1) {
                  _this.$message({
                  type:'success',
                  message:'新增城际成功'
                });
                _this.addintercityVisible = false;
                _this.getIntercity()
                this.$refs['form'].resetFields();
              } else {
                  _this.$message({
                  type:'error',
                  message:res.data.message
                });
              } 
            }).catch(err=>{
              _this.$message({
                type:'error',
                message:'新增失败'
              });
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
          
      },
      editIntercity(val){
        console.log(val)
        var _this = this;
          this.$axios.get('/api/common/intercity/'+val.id+'/view_detail/',)
          .then(res=>{
            _this.checkedItem = res.data.detail;
            _this.checkedItem.dept_code = res.data.detail.dept_code -0;
            _this.UNSelectSchool = res.data.detail.center_list;
            _this.editintercityVisible = true;
            console.log(_this.checkedItem)
          }).catch(err=>{

        })
        
      },
      deleteIntercity(){
          var _this = this;
          this.$axios.delete('/api/common/intercity/'+this.checkedItem.id+'/',)
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
          this.$axios.get('/api/common/intercity/',).then(res=>{
            _this.intercityList = res.data.intercity_list;
            _this.addintercityVisible = false;
          }).catch(err=>{
          console.log(err)
        })
      },
      getPerson(val){
          var _this = this;
          this.currentPage = val;
          this.$axios.get('/api/common/select/user_list/',{
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
      getmana(){
        this.addinnerVisible = true;
        this.searchPerson = "";
        this.getPerson(1);
      },
      sureEditIntercity(formName){
        console.log(this.checkedItem.manager_id)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var id = this.checkedItem.id;
            var _this = this;
            var list = [];
            for (let i = 0; i < this.UNSelectSchool.length; i++) {
              list.push(this.UNSelectSchool[i].id);
            };
              this.$axios.put('/api/common/intercity/'+id+'/',{
                  dept_name:_this.checkedItem.dept_name,
                  dept_code:_this.checkedItem.dept_code,
                  manager_id:_this.checkedItem.manager,
                  center_ids:list,
              }).then(res=>{
                if(res.data.status_code === 1){
                    _this.$message({
                    type:'success',
                    message:'编辑成功',
                  })
                  _this.getIntercity();
                  _this.editintercityVisible = false;
                } else {
                  _this.$message({
                    type:'error',
                    message:res.data.message
                  })
                }
              }).catch(err=>{
                _this.$message({
                  type:'error',
                  message:'编辑失败',
                })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
      },
      changeSchool(val){
        console.log(val)
      },
      deleteThisIntercity(){
        if(this.checkedItem.center_list.length>0){
          this.deleteDialog = true;
        } else {
          this.deleteIntercity()
        }
      },
      beforeClose1(){
        this.$refs['form'].resetFields();
      },
      beforeClose2(){
        this.$refs['checkedItem'].resetFields();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      checkedPerson() {
        if(this.addintercityVisible) {
          this.form.person = this.choosePerson;
          this.$refs['form'].validate((valid) => {});
        } else {
          this.checkedItem.manager_name = this.choosePerson.name;
          this.checkedItem.manager_id = this.choosePerson.id;
          this.$refs['checkedItem'].validate((valid) => {});
        }
          this.addinnerVisible = false;   
      },
      log(evt) {
        if(evt.added) {
          this.add_id = evt.added.element.id;
        } 
      },
      end(item){
          var from_id = item.from.getAttribute("data-id");
          var to_id = item.to.getAttribute("data-id");
          if(from_id !== to_id){
            var _this = this;
            this.$axios.post('/api/center/center/'+this.add_id+'/update_intercity_link/',{
              intercity_id:to_id
            }).then(res=>{
              console.log(res)
            }).catch(res=>{

            })
          }
      },
      selectFun(obj) {
        var index = this.UNSelectSchool.indexOf(obj);
        this.UNSelectSchool.splice(index, 1);
        this.checkedItem.available_centers.push(obj);
      },
      addChooseSchool(obj){
        var index = this.checkedItem.available_centers.indexOf(obj);
        this.checkedItem.available_centers.splice(index, 1);
        this.UNSelectSchool.push(obj);
      }
    },
    watch: {
      currentPage:function(){
        this.getPerson(this.currentPage);
      }
    }
  }
</script>
