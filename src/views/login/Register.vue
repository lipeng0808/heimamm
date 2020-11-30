<template>
  <div class="register">
    <el-dialog :visible.sync="dialogVisible" width="600px" center>
      <span slot="title" class="el-header">用户注册</span>

      <!-- form表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        label-position="left"
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
        <el-form-item label="昵称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="16">
            <el-form-item label="图形码" prop="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" style="margin-left:10px;">
            <img
              :src="codeUrl"
              @click="codeClick"
              style="width:100%;heigth:40px;"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="验证码" prop="rcode">
              <el-input v-model="ruleForm.rcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" style="margin-left:10px;">
            <el-button size="default" style="width:100%" @click="rcodeClick"
              >获取验证码</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      imageUrl: '', //上传的图片
      uploadData: {
        image: null //上传时附带的参数
      },
      uploadUrl: `${process.env.VUE_APP_BASEURL}/uploads`,
      codeUrl: `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms`,
      dialogVisible: false,
      ruleForm: {
        username: '',
        phone: '',
        email: '',
        avatar: '', //图片地址
        password: '',
        rcode: '', //验证码
        code: '' //图形码
      },
      rules: {
        username: [{ required: true, message: '请输入昵称~', trigger: 'blur' }],
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
        code: [{ required: true, message: '请输入图形码~', trigger: 'blur' }],
        rcode: [{ required: true, message: '请输入验证码~', trigger: 'blur' }],
        avatar: [{ required: true, message: '请上传图片~', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 获取图形码
    codeClick () {
      this.codeUrl = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&t=${new Date() - 0}`
    },

    // 获取验证码
    async rcodeClick () {
      // 需要判断手机号和图形码是否正确
      if (this.ruleForm.phone && this.ruleForm.code) {
        const res = await this.$axios.post('/sendsms', {
          code: this.ruleForm.code,
          phone: this.ruleForm.phone
        })
        if (res.code === 200) {
          // 将获取的到验证码直接赋值
          this.ruleForm.rcode = res.data.captcha
        } else {
          // 提示错误原因,并重置图形码
          this.codeClick()
          this.$message.error(res.message)
        }
      }
    },

    // 上传图片成功
    handleAvatarSuccess (res, file) {
      if (res.code === 200) {
        this.imageUrl = URL.createObjectURL(file.raw)
        // 上传成功,接收后台返回的图片地址
        // console.log(res)
        this.ruleForm.avatar = res.data.file_path
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
    // 注册按钮
    register () {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        // 发送axios请求
        const res = await this.$axios.post('/register', this.ruleForm)
        // 判断是否请求成功
        if (res.code === 200) {
          this.$message.success('注册成功')
          this.dialogVisible = false
        } else {
          this.$message.error('注册失败')
        }
      })
    }
  },
  // 设置侦听器,关闭表单后,重置表单
  watch: {
    dialogVisible: function (newValue) {
      if (!newValue) {
        // 重置校验并清空表单
        this.$refs.ruleForm.resetFields()
        this.imageUrl = ''
        this.codeClick()
      }
    }
  }
}
</script>

<style lang="less">
.el-dialog .el-dialog__header {
  background: linear-gradient(270deg, #01c6fa, #1493fa);
  text-align: center;
  .el-header {
    color: #fff;
  }
  .el-dialog__headerbtn .el-icon-close {
    color: #fff;
  }
}
/* 上传文件 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 100px;

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
