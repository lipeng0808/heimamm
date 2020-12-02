<template>
  <div class="chartList">
    <el-card>
      <ul class="list">
        <li>
          <div class="box">1</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="box">1</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="box">1</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="box">1</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="box">1</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="box">1</div>
          <p>今日新增用户</p>
        </li>
      </ul>
    </el-card>
    <!-- 环形图 -->
    <el-card style="margin-top:20px"> </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less">
.list {
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  li {
    float: left;
    width: 100px;
    height: 120px;
    div {
      width: 100px;
      height: 100px;
      border: 3px solid #0086fa;
      border-radius: 50px;
      line-height: 100px;
      text-align: center;
    }
  }
}
</style>
