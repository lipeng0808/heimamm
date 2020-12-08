<template>
  <div id="layout">
    <el-container class="index-container">
      <el-header>
        <div class="left">
          <i
            class="el-icon-s-fold setheight"
            @click="isCollapse = !isCollapse"
          ></i>
          <img class="marginlr" src="@/assets/img/layout_icon.png" alt="" />
          <span class="title">黑马面面</span>
        </div>
        <div class="right">
          <!-- 测试vuex的使用 -->
          <!-- 同步操作 -->
          <el-button
            type="warning"
            size="default"
            @click="$store.commit('add', 10)"
            >vuex学习测试+</el-button
          >
          <!-- 异步操作 -->
          <el-button
            type="warning"
            size="default"
            @click="$store.dispatch('minus', 10)"
            >vuex学习测试-</el-button
          >

          <img :src="userInfo.avatar" alt="" />
          <span class="name">{{ userInfo.username }} 欢迎您</span>
          <button
            type="button"
            class="el-button el-button--primary"
            @click="logout"
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
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            router
          >
            <!-- <div
              v-for="item in $router.options.routes[1].children"
              :key="item.meta.fullPath"
            >
              <el-menu-item
                :index="item.meta.fullPath"
                v-if="item.meta.roles.includes(userInfo.role)"
              >
                <i :class="item.meta.icon"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </el-menu-item>
            </div> -->

            <!-- 动态创建导航栏 -->
            <el-menu-item
              v-for="item in $router.options.routes[1].children"
              :key="item.meta.fullPath"
              :index="item.meta.fullPath"
              v-show="item.meta.roles.includes(userInfo.role)"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>

            <!-- <el-menu-item index="/layout/chart">
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
            </el-menu-item> -->
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
// 导入token模块
import { removeToken } from '@/utils/token'
export default {
  name: 'layout',
  data () {
    return {
      defaultActive: '/layout/welcome',
      isCollapse: false,
      userInfo: {} //用户信息
    }
  },
  methods: {
    // 退出按钮
    logout () {
      this.$confirm('确实要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 退出时删除token,跳转到登录页面
          const res = await this.$axios.get('/logout')
          if (res.code === 200) {
            removeToken()
            this.$router.push('/login')
            this.$message.success('退出成功')
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {})
    },

    // 登录获取信息
    // 发送axios请求,获取用户信息
    async getData () {
      const res = await this.$axios.get('/info')
      if (res.code === 200) {
        this.userInfo = res.data
        this.userInfo.avatar =
          process.env.VUE_APP_BASEURL + '/' + res.data.avatar

        // 这里已经获取到了角色，我们可以根据该角色判断访问的页面是否有权限访问
        if (!this.$route.meta.roles.includes(res.data.role)) {
          this.$message.error('抱歉!你没有权限访问该页面')

          this.$router.push('/layout')
        }else{
          //把值传到仓库中
          this.$store.commit('setUserInfo',res.data)
        }
      }
    }
  },
  mounted () {
    // 发送axios请求,获取用户信息
    this.getData()
    // 获取当前路径url
    this.defaultActive = this.$route.path
  },
  // 侦听器
  watch: {
    $route (newVal) {
      this.defaultActive = newVal.path
      // 监听路径的变化
      if (!this.$route.meta.roles.includes(this.userInfo.role)) {
        this.$message.error('抱歉!你没有权限访问该页面')

        this.$router.push('/layout')
      }
    }
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
  }
}
</style>
