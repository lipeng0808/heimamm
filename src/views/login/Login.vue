<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/img/login_icon.png" alt="" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
            status-icon
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="16">
            <el-form-item prop="code">
              <el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" style="margin-left:10px;">
            <img
              @click="doClick"
              :src="codeUrl"
              alt=""
              style="width:100%;height:40px;"
            />
          </el-col>
        </el-row>
        <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked"></el-checkbox>
          我已阅读并同意 <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登 录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_bg.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      codeUrl: 'http://127.0.0.1/heimamm/public/captcha?type=login',
      ruleForm: {
        phone: '',
        password: '',
        code: '',
        checked: false
      },
      rules: {
        phone: [
          {
            validator: (rule, value, callback) => {
              // rule: 校验对象  value: 输入的值  callback: 判断校验是否成功
              if (!value) {
                return callback(new Error('请输入手机号'))
              }
              // 手机号的正则校验
              const reg = /^1[3-9][0-9]{9}$/
              // 判断手机号是否符号正则
              if (!reg.test(value)) {
                return callback(new Error('手机号不合法'))
              }
              // 校验成功,必须调用callback()
              callback()
            },
            trigger: 'blur' //触发机制
          },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        checked: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('必须勾选用户协议'))
            },
            trigger: 'change' //触发机制
          }
        ]
      }
    }
  },
  methods: {
    doClick () {
      // 网络请求的缓存: GET +  地址不变
      // new Date() - 0: 将当前时间转换为时间戳
      this.codeUrl = `http://127.0.0.1/heimamm/public/captcha?type=login&t=${new Date() -
        0}`
    },
    // 登录按钮
    login () {
      this.$refs.ruleForm.validate(async valid => {
        // 点击登录按钮,校验表单是否正确
        if (!valid) return

        // 校验通过后,发送axios请求
        // this.$axios.post('/login', this.ruleForm).then(res => {
        //   console.log(res)
        // })
        const res = await this.$axios.post('/login', this.ruleForm)
        if (res.data.code === 200) {
          this.$message({ message: '登录成功!', type: 'success' })
          // 跳转路由
          this.$router.push('/layout')
        } else {
          this.$message.error({ message: res.data.message })
          // 调用函数,刷新验证码
          this.doClick()
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;

    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>
