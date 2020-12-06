<template>
  <div class="add-update">
    <el-dialog
      :visible.sync="dialogVisible"
      fullscreen
      center
      v-if="dialogVisible"
    >
      <span slot="title" class="header">{{
        mode === 'add' ? '新增题目' : '编辑题目'
      }}</span>

      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        label-position="left"
      >
        <el-form-item label="学科" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option
              v-for="item in stepOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="form.enterprise" placeholder="请选择企业">
            <el-option
              v-for="item in enterOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <!-- props: 能够指定属性成为 与v-model 进行双向数据绑定的值 -->
          <el-cascader
            :props="{ value: 'label' }"
            size="large"
            :options="options"
            v-model="form.city"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="form.type" @change="typeChange">
            <el-radio
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio
              v-for="item in difOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <hr />
        <!-- 试题标题 -->
        <el-form-item label="试题标题" prop="title" class="setMargin">
          <quill-editor
            v-model="form.title"
            :options="{ placeholder: '请输入试题标题...' }"
            @blur="onEditorBlur('title')"
          >
          </quill-editor>
        </el-form-item>
        <hr />
        <!-- 题目选择 -->
        <el-form-item :label="objLabel[form.type]" :prop="objProp[form.type]">
          <question-type :form="form" />
        </el-form-item>
        <hr />
        <!-- 上传视频 -->
        <el-form-item label="解析视频" prop="video">
          <upload-file ref="UploadFile" type="video" :obj="form" />
        </el-form-item>
        <hr />
        <!-- 答案解析 -->
        <el-form-item label="答案解析" prop="answer_analyze" class="setMargin">
          <quill-editor
            v-model="form.answer_analyze"
            :options="{ placeholder: '请输入答案解析...' }"
            @blur="onEditorBlur('answer_analyze')"
          >
          </quill-editor>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            placeholder="请输入备注"
            size="normal"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn" style="text-align: center;s">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 导入城市数据
import { regionDataPlus } from 'element-china-area-data'
// 导入富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// 导入上传文件模块
import UploadFile from './Upload-file'
// 导入子组件模块
import QuestionType from './Question-type'
export default {
  name: 'Question-add',
  components: {
    quillEditor,
    UploadFile,
    QuestionType
  },
  // 接收父组件传递过来的值
  // props: 与data()同级
  props: {
    //学科选项
    subOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 企业选项
    enterOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 阶段选项
    stepOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 题型选项
    typeOptions: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 难度选项
    difOptions: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      mode: '',
      dialogVisible: false,
      options: regionDataPlus,
      objLabel: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      objProp: {
        1: 'single_select_answer',
        2: 'multiple_select_answer',
        3: 'short_answer'
      },
      form: {
        title: '', //标题
        subject: '', //学科id
        step: '', //阶段
        enterprise: '', //企业
        city: [], //城市
        type: 1, //题型
        difficulty: 1, //难度
        answer_analyze: '', //答案解析
        remark: '', //备注
        video: '', //视频
        single_select_answer: 'A', //单选答案
        multiple_select_answer: [], //多选答案
        short_answer: '', //简答
        select_options: [
          //选项，介绍，图片介绍
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ]
      },
      // 规则校验
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'change' }],
        subject: [{ required: true, message: '请选择学科', trigger: 'change' }],
        step: [{ required: true, message: '请选择阶段', trigger: 'change' }],
        enterprise: [
          { required: true, message: '请选择企业', trigger: 'change' }
        ],
        type: [{ required: true, message: '请选择题型', trigger: 'change' }],
        difficulty: [
          { required: true, message: '请选择难度', trigger: 'change' }
        ],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        answer_analyze: [
          { required: true, message: '答案解析不能为空', trigger: 'change' }
        ],
        remark: [{ required: true, message: '备注不能为空', trigger: 'blur' }],
        single_select_answer: [
          { required: true, message: '单选答案不能为空', trigger: 'change' }
        ],
        multiple_select_answer: [
          { required: true, message: '多选答案不能为空', trigger: 'change' }
        ],
        short_answer: [
          { required: true, message: '简答答案不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确定新增
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return

        let url = ''
        if (this.mode === 'add') {
          url = '/question/add'
        } else {
          url = '/question/edit'
        }
        const res = await this.$axios.post(url, this.form)
        if (res.code === 200) {
          this.$message.success(res.message)
          this.dialogVisible = false
          this.$parent.search()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 校验标题
    onEditorBlur (val) {
      this.$refs.form.validateField(val)
    },
    //
    typeChange () {
      this.$refs.form.clearValidate([
        'single_select_answer',
        'multiple_select_answer',
        'short_answer'
      ])
    }
  }
}
</script>

<style lang="less">
.add-update .el-form {
  width: 830px;
  margin: 0 auto;

  .el-select {
    width: 300px;
  }
  hr {
    margin-bottom: 10px;
  }
}
.el-cascader {
  width: 300px;
}
.setMargin {
  .el-form-item__content {
    margin-left: 0px !important;
    margin-top: 40px;
  }
}
.ql-editor {
  height: 200px;
}
.btn {
  .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>
