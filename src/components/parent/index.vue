<template>
  <div class="parent wrap">
    <table class="table">
      <tbody>
        <tr>
          <td colspan="4">学生信息</td>
        </tr>
      <tr>
        <td>学生姓名</td>
        <td>史诗</td>
        <td>所在校园</td>
        <td>金坛碧水华庭校园</td>
      </tr>
        <tr>
          <td>所在班级</td>
          <td>大三班</td>
          <td>班级主讲</td>
          <td><el-input placeholder="请输入"></el-input></td>
        </tr>
        <tr>
          <td>学生状态</td>
          <td colspan="3">
            <el-radio-group v-model="radio">
              <el-radio :lable="1">预备生</el-radio>
              <el-radio :lable="2">在校生</el-radio>
              <el-radio :lable="3">离园生</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="4">申请人/家长信息</td>
        </tr>
        <tr>
          <td>申请人姓名</td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>申请人身份</td>
          <td><el-radio-group v-model="radio">
            <el-radio :lable="1">家长</el-radio>
            <el-radio :lable="2">校园人员</el-radio>
          </el-radio-group></td>
        </tr>
        <tr>
          <td>家长姓名</td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>与学生关系</td>
          <td><el-radio-group v-model="radio">
            <el-radio :lable="1">父亲</el-radio>
            <el-radio :lable="2">母亲</el-radio>
            <el-radio :lable="3">其他</el-radio>
          </el-radio-group></td>
        </tr>
        <tr>
          <td>联系电话</td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>手机号码</td>
          <td><el-input placeholder="请输入"></el-input></td>
        </tr>
        <tr>
          <td>邮件地址</td>
          <td colspan="3"><el-input placeholder="请输入"></el-input></td>
        </tr>
        <tr>
          <td colspan="4">申请信息</td>
        </tr>
        <tr>
          <td rowspan="2">申请类型</td>
          <td rowspan="2"><el-radio-group v-model="radio">
            <el-radio :lable="1">离园退费</el-radio>
            <el-radio :lable="2">中止用餐</el-radio>
            <el-radio :lable="3">用餐变更</el-radio>
            <el-radio :lable="3">中止校车</el-radio>
            <el-radio :lable="3">校车变更</el-radio>
            <el-radio :lable="3">班级变更</el-radio>
            <el-radio :lable="3">休学申请</el-radio>
            <el-radio :lable="3">转园申请</el-radio>
          </el-radio-group></td>
          <td >申请原因</td>
          <td><el-checkbox-group v-model="checkList">
            <el-checkbox label="毕业"></el-checkbox>
            <el-checkbox label="居所搬迁/工作调动/家庭其他原因"></el-checkbox>
            <el-checkbox label="路途遥远"></el-checkbox>
            <el-checkbox label="出国"></el-checkbox>
            <el-checkbox label="孩子太小/生病"></el-checkbox>
            <el-checkbox label="转公立园/国际学校"></el-checkbox>
            <el-checkbox label="教师更好频繁"></el-checkbox>
            <el-checkbox label="教师水平低/态度不好/蒙氏不专业"></el-checkbox>
            <el-checkbox label="缺外教/外教更换/外教水平差"></el-checkbox>
            <el-checkbox label="课程不系统"></el-checkbox>
            <el-checkbox label="孩子学不到知识"></el-checkbox>
            <el-checkbox label="孩子英语能力没有提高"></el-checkbox>
            <el-checkbox label="校园真题服务质量/服务意识"></el-checkbox>
            <el-checkbox label="园长能力/态度"></el-checkbox>
            <el-checkbox label="校园安全/班级看管"></el-checkbox>
            <el-checkbox label="饮食"></el-checkbox>
            <el-checkbox label="家园沟通"></el-checkbox>
            <el-checkbox label="缺校车/校车线路"></el-checkbox>
          </el-checkbox-group></td>
        </tr>
        <tr>
          <td>起止日期</td>
          <td><el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
            <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker></td>
        </tr>
        <tr>
          <td>变更/离园日期</td>
          <td><el-input placeholder="请输入"></el-input></td>
          <td>提交日期</td>
          <td>3/14/2019</td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3"><textarea></textarea></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          radio: 1
        }
      }
    }
</script>

<style scoped>
  .parent{
    margin-top: 50px;
  }
  .parent table{
    border: 2px #ccc solid;
    border-collapse: collapse;
    width: 100%;
  }
  .parent td{
    border: 2px #ccc solid;
    padding: 5px;
    min-width: 100px;
  }
  .parent textarea{
    width: 80%;
    min-height: 200px;
  }
</style>
