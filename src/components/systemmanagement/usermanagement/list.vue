<template>
  <div class="usermanagement wrap">
    <div class="header">
      <p class="local_path_style">YOU ARE HERE : 系统管理 > <span class="font-cl-blue">用户管理</span></p>
    </div>
    <div class="header-top">
      <p><span>角色：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="padding-left-30">搜索：</span>
        <el-input type="text" placeholder="请输入"></el-input>
        <span class="padding-left-30"><el-button type="primary">搜索</el-button></span>
        <span class="right"><el-button class="orange" type="text" @click="addUser"><i class="fa fa-plus-square"></i>&nbsp;新增用户</el-button></span>
      </p>
      <el-table
        :data="tableList"
        border
        stripe
        show-header
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="account"
          label="登陆账号">
        </el-table-column>
        <el-table-column
          prop="organization"
          label="所属组织">
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属角色">
          <template slot-scope="scope">
            <a class="font-cl-blue" @click="assignPermissions">{{scope.row.role}}</a>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <i @click="editUser" class="fa fa-pencil-square-o orange"></i>
          </template>
        </el-table-column>
      </el-table>
      <!--角色权限分配 弹框-->
      <el-dialog class="assign-permissions" title="角色权限分配" :visible.sync="assignpermissions" width="50%">
        <div>
          <p><span>角色名称:</span><span>hjsakfhdgjsakdbhaj</span></p>
          <p><span>角色描述:</span><span>园长助理/行政助理</span></p>
          <hr class="line-solid">
          <p>被赋予该角色的系统用户：</p>
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
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </div>
          </el-collapse>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: '-所有-',
        options: [{
          label: '选项1',
          value: '1'
        }, {
          label: '选项2',
          value: '2'
        }],
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
      addUser: function () {
        this.$router.push({name: 'usermanagement-add'})
      },
      editUser: function () {
        this.$router.push({name: 'usermanagement-edit'})
      },
      assignPermissions: function () {
        this.assignpermissions = true
      },
      handleChange: function (val) {
        var liList = document.getElementsByName('selectColor');
        for (var i = 0; i < liList.length; i++) {
          liList[i].style.color = '';
          for (var j = 0; j < val.length; j++) {
            if (i === val[j]) {
              liList[i].style.color = 'orange';
              break;
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .usermanagement {
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }

  .usermanagement .header-top{
    margin-top: 10px;
  }

  .usermanagement .header-top p {
    font-size: 14px;
  }

  .usermanagement .el-table td, .usermanagement .el-table th {
    text-align: center;
  }

  .usermanagement >>> .el-dialog__footer {
    text-align: center;
  }
  .usermanagement >>> .el-input{
    width: 164px;
    height: 36px;
  }

  .usermanagement .line-solid {
    width: 100%;
    text-align: center;
    color: #ccc;
  }

  .usermanagement .assign-permissions >>> .el-dialog__body {
    padding: 0 20px;
  }

  /*手风琴样式*/
  .usermanagement >>> .el-collapse-item__arrow {
    display: none;
  }

  .usermanagement >>> .el-collapse-item__header {
    height: 30px;
    border: 0;
  }

  .usermanagement >>> .el-collapse {
    margin: 0 20px;
    border: 0;
  }

  .usermanagement >>> .el-collapse-item__wrap {
    border: 0;
  }

  .usermanagement .active {
    color: orange;
  }
</style>
