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
        <el-form-item label="头像" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.imageUrl"
              :src="ruleForm.imageUrl"
              class="avatar"
            />
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
            <el-button size="default" style="width:100%">获取验证码</el-button>
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
  data () {
    return {
      codeUrl: `${process.env.VUE_APP_BASEURL}/captcha?type=sendsms`,
      dialogVisible: false,
      ruleForm: {
        imageUrl: '',
        username: '',
        phone: '',
        email: '',
        avatar: '',
        password: '',
        rcode: '', //验证码
        code: '' //图形码
      },
      rules: {
        username: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入图形码', trigger: 'blur' }],
        rcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        imageUrl: [{ required: true, message: '请上传图片', trigger: 'blur' }]
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
    // 注册按钮
    register () {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
      })
    },

    // 上传图片
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
