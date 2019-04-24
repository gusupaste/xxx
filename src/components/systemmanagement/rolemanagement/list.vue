<template>
  <div class="rolemanagement wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">角色管理</span></p>
    </div>
    <div class="header-top">
      <div class="list-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="总部" name="first">
              <span class="right"><el-button class="orange" type="text" @click="assignPermissions"><i class="fa fa-plus-square"></i>&nbsp;新增角色</el-button></span>
            <el-table
              :data="chargeTableDate"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="name"
                label="角色名称"
                width="250">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="角色描述">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="校园" name="second">
            <span class="right"><el-button class="orange" type="text" @click="assignPermissions"><i class="fa fa-plus-square"></i>&nbsp;新增角色</el-button></span>
            <el-table
              :data="chargeTableDate"
              border
              stripe
              show-header
              style="width: 100%;margin-top: 10px;">
              <el-table-column
                prop="name"
                label="角色名称"
                width="250">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="角色描述">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!--角色权限分配 弹框-->
    <el-dialog class="assign-permissions" title="角色权限分配" :visible.sync="assignpermissions" width="50%">
      <div class="dialog_content">
        <p>
          <span>角色名称：</span><el-input type="text" placeholder="请输入"></el-input>
        <hr hidden>
        <span>角色描述：</span><el-input type="text" placeholder="请输入"></el-input>
        </p>
        <hr class="line-solid">
        <p>被赋予该角色的系统用户：<span class="orange"><i class="fa fa-plus" ></i>&nbsp;添加用户</span></p>
        <template>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="account"
              label="登陆账号">
            </el-table-column>
          </el-table>
        </template>
        <p>该角色所需的系统权限：</p>
        <el-collapse :data="boxData" @change="handleChange">
          <div v-for="(item,index) in boxData">
            <el-collapse-item :name="index">
              <template slot="title">
                <li style="line-height: 0" name="selectColor">{{item.name}}</li>
              </template>
              <div>
                <el-table :data="item.table" border style="width: 100%">
                  <el-table-column prop="permissions" label="权限">
                  </el-table-column>
                  <el-table-column prop="apply" label="申明">
                  </el-table-column>
                  <el-table-column prop="allow" label="允许">
                    <template>
                      <el-checkbox></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </div>
      <span slot="footer" class="dialog-footer text-align-center">
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeName:'first',
        chargeTableDate:[
          {
            name:'tom',
            desc:'客服主管'
          },
          {
            name:'role',
            desc:'dghjasgdjhad',
          }
        ],
        assignpermissions: false,
        tableList: [{
          id: '1',
          username: '用户1',
          account: 'user@hhhhh.com',
          organization: '国家机构',
          role: '第一个角色',
        },
          {
            id: '1',
            username: '用户2',
            account: 'user@hhhhh.com',
            organization: '国家机构3',
            role: '第一个角色吧',
          },
          {
            id: '1',
            username: '用户3',
            account: 'user@hhhhh.com',
            organization: '教育机构',
            role: '第二个角色',
          }
        ],
        tableData: [
          {
            id: '1',
            username: 'ly',
            account: 'www@hungjkhb.com'
          }, {
            id: '2',
            username: 'cs',
            account: 'www@hungjkhb.com'
          }
        ],
        boxData: [{
          name: '总部学生档案',
          table: [{
            permissions: 'a',
            apply: 'b',
            allow: 'c'
          }, {
            permissions: 'a',
            apply: 'b',
            allow: 'c'
          }
          ]
        },
          {
            name: '潜在生管理',
            table: [{
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }, {
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }
            ]
          }, {
            name: '校园预备生管理',
            table: [{
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }, {
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }
            ]
          }, {
            name: '入学申请列表',
            table: [{
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }, {
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }
            ]
          }, {
            name: '招生入学首页',
            table: [{
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }, {
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }
            ]
          }, {
            name: '毕业离园生管理',
            table: [{
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }, {
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }
            ]
          }, {
            name: '校园学生管理',
            table: [{
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }, {
              permissions: 'a',
              apply: 'b',
              allow: 'c'
            }
            ]
          }]
      }
    },
    methods: {
      assignPermissions:function(){
        this.assignpermissions = true
      },
      handleChange: function (val) {
        var liList = document.getElementsByName('selectColor')
        for (var i = 0; i < liList.length; i++) {
          liList[i].style.color = ''
          for (var j = 0; j < val.length; j++) {
            if (i === val[j]) {
              liList[i].style.color = 'orange'
              break
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .rolemanagement{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .rolemanagement >>> .select-header,.rolemanagement .list-content{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .rolemanagement >>> .el-select{
    width: 10%;
  }
  .rolemanagement >>> .el-tabs__item{
    width: 150px;
    text-align: center;
  }
  .rolemanagement >>> .el-tabs__item.is-active{
    color: #ED6C2E;
    border-bottom: 2px solid #ED6C2E !important;
  }
  .rolemanagement >>> .el-table td, .el-table th{
    text-align: center;
  }
  .rolemanagement >>> .el-tabs__active-bar{
    background-color: #ED6C2E;
    width: 0px !important;
  }
  .rolemanagement >>> .el-tabs__item:hover{
    color:#ED6C2E;
  }
  .rolemanagement >>> .el-tabs__item{
    padding: 0 0 !important;
  }
  .rolemanagement >>> .el-tabs__nav-scroll{
    padding-left: 50%;
  }
  .rolemanagement >>> #tab-first{
    margin-left: -150px;
  }
  .rolemanagement .el-tabs__active-bar is-top{
    width: 0px !important;
  }
  .rolemanagement >>> .el-tabs__nav-wrap {
    border-bottom: 1px solid #e6e6e6;
  }
  .rolemanagement >>> .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    text-align: center !important;
  }
  .rolemanagement .dialog_content >>> .el-input{
    width: 164px;
  }
  .rolemanagement >>> .el-input__inner {
    width: -webkit-fill-available;
  }
  .rolemanagement .line-solid {
    width: 100%;
    text-align: center;
    color: #ccc;
  }
  .rolemanagement .assign-permissions >>> .el-dialog__body {
    padding: 0 20px;
  }

  .rolemanagement .dialog_content p{
    padding: 10px 0;
  }
  /*手风琴样式*/
  .rolemanagement >>> .el-collapse-item__arrow {
    display: none;
  }

  .rolemanagement >>> .el-collapse-item__header {
    height: 30px;
    border: 0;
  }

  .rolemanagement >>> .el-collapse {
    margin: 0 20px;
    border: 0;
  }

  .rolemanagement >>> .el-collapse-item__wrap {
    border: 0;
  }

  .rolemanagement .active {
    color: orange;
  }

  /*表格内容居中*/
  .rolemanagement >>> .el-table td, .rolemanagement >>> .el-table th {
    text-align: center;
  }
</style>
