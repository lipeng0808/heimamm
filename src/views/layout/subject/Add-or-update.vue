<template>
  <!-- 
  原因：
      form表单的重置是以第一次打开的数据作为重置标准，如果先打开的是更新，那么重置之后以第一次更新的数据作为标准
      Dialog 中的内容是懒加载的，目前 edit (更新)方法的写法导致 Form 刚加载出来时值就已经是新的了，所以 resetFields 也只能回到新值 
  解决方案:
      利用v-if的特性，进行form的销毁和重建，强行让每一次改操作拿到的数据为父组件传过来的初始值  v-if="dialogVisible"
-->
  <el-dialog :visible.sync="dialogVisible" width="600px" @close="close" center>
    <span slot="title" class="header">
      {{ mode === 'add' ? '新增学科' : '编辑学科' }}
    </span>
    <!-- form表单 -->
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>

      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'SubjectAdd',
  data () {
    return {
      dialogVisible: false,
      mode: '', // add:新增 edit:编辑
      form: {
        rid: '',
        name: '',
        short_name: '',
        intro: '',
        remark: ''
      },
      // 校验规则设置
      rules: {
        rid: [{ required: true, message: '请输入学科编号~', trigger: 'blur' }],
        name: [{ required: true, message: '请输入学科名称~', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭组件的回调
    close () {
      // 关闭表单,重置表单
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        let url = null
        if (this.mode === 'add') {
          // 新增不需要 id 字段
          delete this.form.id
          url = '/subject/add'
        } else {
          url = '/subject/edit'
        }
        const res = await this.$axios.post(url, this.form)
        if (res.code === 200) {
          this.$message.success(res.message)
          this.close()
          this.$parent.search()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
