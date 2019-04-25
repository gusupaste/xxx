<template>
  <div class="rolemanagementadd wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">新增用户</span></p>
    </div>
    <div class="content">
      <p>
        <span>角色名称：</span>
        <el-input v-model="rolename" placeholder="请输入"></el-input>
        <hr hidden>
        <span>角色描述：</span>
        <el-input v-model="roledesc" placeholder="请输入"></el-input>
      </p>
      <hr class="line-solid">
      <p>被赋予该角色的系统用户：<a class="orange " @click="addUser"><i class="fa fa-plus"></i>&nbsp;添加用户</a></p>
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
        <div v-for="(item,index) in boxData" :key="index">
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
    <!--添加 弹框-->
    <el-dialog title="添加用户" :visible.sync="adduser" width="50%" style="padding: 30px 60px;">
      <span slot="footer" class="dialog-footer text-align-center">
          <el-button @click="adduser = false">取 消</el-button>
          <el-button type="success" @click="adduser = false">保 存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        adduser:false,
        rolename:'',
        roledesc:'',
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
    methods:{
      addUser:function(){
        this.adduser=true
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

  .rolemanagementadd .line-solid {
    width: 100%;
    text-align: center;
    color: #ccc;
  }
  .rolemanagementadd .content p{
    padding: 10px 0;
  }
  /*手风琴样式*/
  .rolemanagementadd >>> .el-collapse-item__arrow {
    display: none;
  }

  .rolemanagementadd >>> .el-collapse-item__header {
    height: 30px;
    border: 0;
  }

  .rolemanagementadd >>> .el-collapse {
    margin: 0 20px;
    border: 0;
  }

  .rolemanagementadd >>> .el-collapse-item__wrap {
    border: 0;
  }

  .rolemanagementadd .content >>> .el-input{
    width: 164px;
  }
  /*表格内容居中*/
  .rolemanagementadd >>> .el-table td, .rolemanagementadd >>> .el-table th {
    text-align: center;
  }
</style>
