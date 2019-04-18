<template>
    <div class="intercitylist">
      <div class="header">
        <p>YOU ARE HERE : 校园 >> <span>城际列表</span></p>
        <p class="bold">伊顿国际教育集团大城际分布</p>
      </div>
      <div class="content">
        <div class="intercity-list">
          <el-card class="box-card">
            <span class="el-icon-circle-plus-outline span-button" @click="addintercityVisible = true"></span>
          </el-card>
        </div>
        <div class="intercity-list">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="city-name font-cl-blue">城际名称1</span>
              <span class="font-size-5">负责人：张兰</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="editintercityVisible = true">编辑</el-button>
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
        <div class="intercity-list">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="city-name font-cl-blue">城际名称1</span>
              <span class="font-size-5">负责人：张兰</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="editintercityVisible = true">编辑</el-button>
            </div>
            <draggable class="list-group" :list="list2" group="people" @change="log">
              <div class="list-group-item  intercity-li"
                   v-for="(element, index) in list2"
                   :key="element.name">
                {{ element.name }} {{ index }}
              </div>
            </draggable>
          </el-card>
        </div>
      </div>
      <el-dialog title="新增城际" :visible.sync="addintercityVisible" width="50%" :before-close="handleClose">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="城际名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="城际代码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="person">
            <el-input v-model="form.person"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addintercityVisible = false">取 消</el-button>
          <el-button type="success" @click="addintercityVisible = false">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑城际" :visible.sync="editintercityVisible" width="80%" :before-close="handleClose">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="城际名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="城际代码" prop="code">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="person">
            <el-input v-model="form.person"></el-input>
          </el-form-item>
          <el-form-item label="学校">
            <div class="item-div1">
              <p>无归属城际的学校</p>
              <div class="item-div2-span">
                <el-checkbox-group v-model="type">
                  <el-checkbox label="美食/餐厅线上活动/餐厅线上活动/餐厅线上活动/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="item-div2">
              <p>已选学校</p>
              <div class="item-div2-span">
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
                <p>美食/餐厅线上活动<span class="el-icon-delete"></span></p>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editintercityVisible = false">取 消</el-button>
          <el-button type="success" @click="editintercityVisible = false">保 存</el-button>
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
        data: generateData(),
        value1: [1, 4],
        addintercityVisible : false,
        editintercityVisible : false,
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
        type:[],
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          person: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
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
        ]
      };
    },
    methods: {
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
      handleClose (){

      },
    }
  }
</script>

<style>
  .intercitylist .header p{
    margin: 10px 0px;
  }
  .intercitylist{
    padding: 0px 40px;
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .intercitylist .bold{
    font-weight: bold;
    color: black;
  }
  .intercitylist .content{

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
    display: block;;
  }
  .intercitylist .intercity-li{
    border: 1px solid #ddd;
    padding: 5px 20px;
    border-radius: 50px;
    background-color: #ddd;
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
    margin-left: 60px;
    color: red;
    font-size: 18px;
    cursor: pointer;
  }
  .intercitylist .item-div1-span,.intercitylist .item-div2-span{
    height: 300px;
    overflow: auto;
  }
  .intercitylist .el-checkbox-group{
    width: 220px;
  }
</style>
