<template>
  <div>
    <h1>欢迎 {{ $store.getters.getUserInfo.username }} 登录</h1>
    <!-- vuex中仓库数据的 两种获取方式 -->
    {{ $store.state.count }} -----{{ $store.getters.getData }}
    <h1>验证结果</h1>
  </div>
</template>

<style lang="less" scoped>
div {
  margin: 50px auto;
  text-align: center;
  font-size: 50px;
}
</style>
