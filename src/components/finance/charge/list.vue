<template>
    <div class="chargelist wrap">
      <div class="header">
        <p>YOU ARE HERE : 财务处理 >> <span>收费账单</span></p>
      </div>
      <div class="content">
        <div class="select-header">
          <span>城际：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">区域：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">校园：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">学年：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">班级：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left: 10px">账单类型：</span>
          <el-select v-model="nameSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
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
        nameSelect:[],
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
      selectFun: function(obj) {
        console.log(obj);
      }
    }
  }
</script>

<style>
  .chargelist{
    color: rgba(160, 160, 160, 1);
    text-align: left;
  }
  .chargelist .bold{
    font-weight: bold;
    color: black;
  }
  .chargelist .select-header{
    width: 100%;
    min-height: 50px;
    margin-top: 20px;
  }
  .chargelist .el-select{
    width: 10%;
  }
</style>
