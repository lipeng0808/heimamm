<template>
  <div class="chartList">
    <el-card>
      <ul class="list">
        <li>
          <div>{{ TitleData.increment_users }}</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div>{{ TitleData.total_users }}</div>
          <p>总用户量</p>
        </li>
        <li>
          <div class="color1">{{ TitleData.increment_questions }}</div>
          <p>新增试题</p>
        </li>
        <li>
          <div class="color2">{{ TitleData.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li>
          <div>{{ TitleData.total_done_questions }}</div>
          <p>总刷题量</p>
        </li>
        <li>
          <div class="color3">{{ TitleData.personal_questions }}</div>
          <p>人均刷量</p>
        </li>
      </ul>
    </el-card>
    <!-- 环形图 -->
    <el-card style="margin-top:20px;height: 650px">
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="left" ref="left" style="width:80%;height: 600px"></div>
        </el-col>
        <el-col :span="12">
          <div class="right" ref="right" style="width:100%;height: 600px"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'chart',
  data () {
    return {
      TitleData: []
    }
  },
  methods: {
    // 头部数据
    async getTitleData () {
      const res = await this.$axios.post('/data/title')
      if (res.code === 200) {
        this.TitleData = res.data
      }
    },
    // 饼图--企业题目数据
    async getSelectionData () {
      const res = await this.$axios.post('/data/statistics')
      if (res.code === 200) {
        let myChart = echarts.init(this.$refs.left)
        let dataList = res.data.map(item => {
          return item.name
        })
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: dataList
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: res.data
            }
          ]
        }
        myChart.setOption(option)
      }
    },
    // 柱形图--热门城市统计
    async getCityData () {
      const res = await this.$axios.post('/data/hot_cities')
      if (res.code === 200) {
        let myChart = echarts.init(this.$refs.right)
        let dataList = res.data.map(item => {
          return item.name
        })
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: dataList
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: res.data
            }
          ]
        }
        myChart.setOption(option)
      }
    }
  },
  mounted () {
    this.getTitleData()
    this.getSelectionData()
    this.getCityData()
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
    .color1 {
      border: 3px solid #f76137;
    }
    .color2 {
      border: 3px solid skyblue;
    }
    .color3 {
      border: 3px solid orangered;
    }
  }
}
</style>
