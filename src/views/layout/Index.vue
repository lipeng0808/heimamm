<template>
  <div id="layout">
    <el-container class="index-container">
      <el-header>
        <div class="left">
          <i class="el-icon-s-fold setheight"></i>
          <img class="marginlr" src="@/assets/img/layout_icon.png" alt="" />
          <span class="title">黑马面面</span>
        </div>
        <div class="right">
          <img :src="userImg" alt="" />
          <span class="name">{{ username }} 欢迎您</span>
          <button
            type="button"
            class="el-button el-button--primary"
            @click="layout"
          >
            <span>退出</span>
          </button>
        </div>
      </el-header>
      <el-container>
        <!-- 
          default-active: 当前激活的index
         -->
        <el-aside width="auto">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
          >
            <el-menu-item index="/layout/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据预览</span>
            </el-menu-item>
            <el-menu-item index="/layout/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/enterPrice">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      username: '', //用户昵称
      userImg: '' //用户头像
    }
  },
  methods: {
    handleOpen () {},
    handleClose () {},
    // 退出按钮
    layout () {}
  },
  mounted () {
    // 发送axios请求
    this.$axios.get('/info').then(res => {
      this.username = res.data.username
      this.userImg = process.env.VUE_APP_BASEURL + '/' + res.data.avatar
    })
  }
}
</script>

<style lang="less">
#layout {
  height: 100%;
}
.el-container {
  height: 100%;

  .el-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .left {
      display: flex;
      align-items: center;
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
    .right {
      display: flex;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
      .el-button--primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
      }
    }
    .title {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  .el-aside,
  .el-main {
    overflow: auto;
    box-sizing: border-box;
  }
  .el-aside {
    flex-shrink: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: 0 solid #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>
