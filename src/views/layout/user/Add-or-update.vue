<template>
  <!-- 
  原因：
      form表单的重置是以第一次打开的数据作为重置标准，如果先打开的是更新，那么重置之后以第一次更新的数据作为标准
      Dialog 中的内容是懒加载的，目前 edit (更新)方法的写法导致 Form 刚加载出来时值就已经是新的了，所以 resetFields 也只能回到新值 
  解决方案:
      利用v-if的特性，进行form的销毁和重建，强行让每一次改操作拿到的数据为父组件传过来的初始值
-->
  <el-dialog
    :visible.sync="dialogVisible"
    width="600px"
    @close="close"
    center
    v-if="dialogVisible"
  >
    <span slot="title" class="header">
      {{ mode === 'add' ? '新增用户' : '编辑用户' }}
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
      <!-- 照片上传 -->
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id" placeholder="请选择">
          <el-option
            v-for="item in optionsOne"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option
            v-for="item in optionsTwo"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" prop="remark">
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
  data () {
    return {
      imageUrl: '', //上传的图片
      uploadData: {
        image: null //上传时附带的参数
      },
      uploadUrl: `${process.env.VUE_APP_BASEURL}/uploads`,
      dialogVisible: false,
      mode: '', // add:新增 edit:编辑
      form: {
        username: '',
        phone: '',
        email: '',
        password: '',
        remark: '',
        status: '',
        role_id: '',
        avatar: ''
      },
      optionsOne: [
        { value: 1, label: '超级管理员' },
        { value: 2, label: '管理员' },
        { value: 3, label: '老师' },
        { value: 4, label: '学生' }
      ],
      optionsTwo: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ],
      // 校验规则设置
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请输入邮箱~'))
              }
              // 邮箱正则
              const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
              if (!reg.test(value)) {
                callback(new Error('邮箱错误~'))
              }

              callback()
            },
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              // rule: 校验对象  value: 输入的值  callback: 判断校验是否成功
              if (!value) {
                return callback(new Error('请输入手机号~'))
              }
              // 手机号的正则校验
              const reg = /^1[3-9][0-9]{9}$/
              // 判断手机号是否符号正则
              if (!reg.test(value)) {
                return callback(new Error('手机号不合法~'))
              }
              // 校验成功,必须调用callback()
              callback()
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码~', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        role_id: [
          { required: true, message: '请选择角色~', trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态~', trigger: 'change' }]
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
    // 上传图片成功
    handleAvatarSuccess (res, file) {
      if (res.code === 200) {
        this.imageUrl = URL.createObjectURL(file.raw)
        // 上传成功,接收后台返回的图片地址
        // console.log(res)
        this.form.avatar = res.data.file_path
      } else {
        this.$message.error(res.message)
      }
    },
    // 上传图片前
    beforeAvatarUpload (file) {
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImg) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      //
      this.uploadData.image = file
      return isImg && isLt2M
    },
    submit () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        let url = null
        if (this.mode === 'add') {
          // 新增不需要 id 字段
          delete this.form.id
          url = '/user/add'
        } else {
          url = '/user/edit'
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
  },
  // 侦听器
  watch: {
    dialogVisible: function (val) {
      if (val) {
        if (this.mode === 'add') {
          this.imageUrl = ''
        } else {
          this.imageUrl = process.env.VUE_APP_BASEURL + '/' + this.form.avatar
        }
      }
    }
  }
}
</script>
