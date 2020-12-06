<template>
  <div class="question-type">
    <div v-if="form.type === 1">
      <div class="item" v-for="item in form.select_options" :key="item.label">
        <el-radio v-model="form.single_select_answer" :label="item.label">{{
          item.label
        }}</el-radio>
        <el-input v-model="item.text" placeholder="请输入内容"></el-input>
        <upload-file type="image" :obj="item" />
      </div>
    </div>
    <div v-else-if="form.type === 2">
      <div class="item" v-for="item in form.select_options" :key="item.label">
        <el-checkbox-group v-model="form.multiple_select_answer">
          <el-checkbox :label="item.label"></el-checkbox>
        </el-checkbox-group>
        <el-input v-model="item.text" placeholder="请输入内容"></el-input>
        <upload-file type="image" :obj="item" />
      </div>
    </div>
    <div v-else-if="form.type === 3">
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入简答答案...."
        v-model="form.short_answer"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
// 导入上传文件模块
import UploadFile from './Upload-file'
export default {
  name: 'QuestionType',
  components: {
    UploadFile
  },
  // 接收父组件传递过来的对象
  props: {
    form: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-radio {
    color: #606266;
    cursor: pointer;
    margin-right: 30px;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100%;
  }
  .el-checkbox-group {
    margin-right: 15px;
  }
}
</style>
