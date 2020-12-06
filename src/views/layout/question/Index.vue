<template>
  <div class="question">
    <!-- 上卡片 -->
    <el-card>
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="form.subject" placeholder="请选择学科">
                <el-option
                  v-for="item in subOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="form.step" placeholder="请选择阶段">
                <el-option
                  v-for="item in enterOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="form.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="item in enterOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="题型" prop="type">
              <el-select v-model="form.type" placeholder="请选择题型">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="form.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="item in difOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option
                  v-for="item in staOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker
                v-model="form.create_date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="padding-right: 25px;">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="del">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 下卡片 -->
    <el-card style="margin-top:20px">
      <el-table :data="list" stripe border style="width: 100%">
        <el-table-column
          fixed
          prop="index"
          type="index"
          label="序号"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="title" label="题目" width="300" align="center">
          <template #default="{row}">
            <span v-html="row.title"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="subject_name,step"
          label="学科.阶段"
          width="300"
          align="center"
        >
          <template #default="{row}">
            {{ row.subject_name }}&nbsp;
            <span v-if="row.step === 1">初级</span>
            <span v-if="row.step === 2">中级</span>
            <span v-if="row.step === 3">高级</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型" width="120" align="center">
          <template #default="{row}">
            <span v-if="row.type === 1">单选</span>
            <span v-if="row.type === 2">多选</span>
            <span v-if="row.type === 3">简答</span>
          </template>
        </el-table-column>
        <el-table-column label="难度" width="120" align="center">
          <template #default="{row}">
            <span v-if="row.difficulty === 1">简单</span>
            <span v-if="row.difficulty === 2">一般</span>
            <span v-if="row.difficulty === 3">困难</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="300" align="center">
        </el-table-column>
        <el-table-column prop="reads" label="访问量" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          label="作者"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="enterprise_name"
          label="企业"
          width="300"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="create_time"
          label="创建日期"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="修改日期"
          width="300"
          align="center"
        >
        </el-table-column>

        <el-table-column label="状态" width="120" align="center">
          <template #default="{row}">
            <span :style="{ color: row.status === 0 ? 'red' : '#666' }">{{
              row.status === 0 ? '禁用' : '启用'
            }}</span>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="220"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" size="small">编辑</el-button>
            <el-button
              @click="status(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              size="small"
              >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-button
            >
            <el-button @click="remove(scope.row.id)" type="danger" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top:30px"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :pager-count="7"
      >
      </el-pagination>
    </el-card>
    <add-or-update
      ref="addOrUpdate"
      :subOptions="subOptions"
      :enterOptions="enterOptions"
      :stepOptions="stepOptions"
      :typeOptions="typeOptions"
      :difOptions="difOptions"
    />
  </div>
</template>

<script>
// 导入子组件
import AddOrUpdate from './Add-or-update'
export default {
  name: 'Question',
  components: {
    AddOrUpdate
  },
  data () {
    return {
      form: {
        subject: '', //学科id
        step: '', //阶段
        enterprise: '', //企业
        type: '', //题型
        difficulty: '', //难度
        username: '', //作者
        status: '', //状态
        create_time: '', //日期
        title: '', //标题
        remark: '' //备注
      },
      page: 1, //页码
      limit: 5, //页码条数
      total: 0, //数据总条数
      list: [], //数据列表
      subOptions: [], //学科选项
      enterOptions: [], //企业选项
      //阶段选项
      stepOptions: [
        { value: 1, label: '初级' },
        { value: 2, label: '中级' },
        { value: 3, label: '高级' }
      ],
      //题型选项
      typeOptions: [
        { value: 1, label: '单选' },
        { value: 2, label: '多选' },
        { value: 3, label: '简答' }
      ],
      //难度选项
      difOptions: [
        { value: 1, label: '简单' },
        { value: 2, label: '一般' },
        { value: 3, label: '困难' }
      ],
      //状态选项
      staOptions: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ]
    }
  },
  methods: {
    // 获取题库列表
    async getQuestionList () {
      const res = await this.$axios.get('/question/list', {
        params: {
          ...this.form,
          page: this.page,
          limit: this.limit
        }
      })
      // console.log(res)
      if (res.code === 200) {
        this.list = res.data.items
        this.total = res.data.pagination.total
      }
    },
    // 获取学科列表
    async getSubjectList () {
      const res = await this.$axios.get('/subject/list')
      this.subOptions = res.data.items
    },
    // 获取企业列表
    async getEnterpriseList () {
      const res = await this.$axios.get('/enterprise/list')
      this.enterOptions = res.data.items
    },
    // 搜索
    search () {
      this.page = 1
      this.getQuestionList()
    },
    // 清除
    del () {
      this.$refs.form.resetFields()
      // 调用方法,刷新列表
      this.search()
    },
    // 新增
    add () {
      this.$refs.addOrUpdate.mode = 'add'
      this.$refs.addOrUpdate.dialogVisible = true
      this.$refs.addOrUpdate.form = {
        // 这里的属性有哪些，看接口文档
        title: '', // 标题
        subject: '', // 学科
        step: '', // 阶段
        enterprise: '', // 企业
        city: [], // 城市
        type: 1, // 题型，这里设置1，代表默认选中单选
        difficulty: 1, // 难度，这里设置1，代表默认选中简单
        video: '', // 解析视频地址
        answer_analyze: '', // 答案解析
        remark: '', // 备注
        single_select_answer: 'A', // 单选答案，默认值是A
        multiple_select_answer: [], // 多选答案，要是数组，因为可以选择多个
        short_answer: '', // 简答答案
        select_options: [
          // 单选、多选的选项
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ]
      }
    },
    // 编辑
    edit (row) {
      this.$refs.addOrUpdate.mode = 'edit'
      this.$refs.addOrUpdate.dialogVisible = true
      this.$refs.addOrUpdate.form = JSON.parse(JSON.stringify(row))
      this.$refs.addOrUpdate.form.city = row.city.split(',')
      this.$refs.addOrUpdate.form.multiple_select_answer = row.multiple_select_answer.split(
        ','
      )
    },
    // 删除
    remove (id) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        confirmButtonClass: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.post('/question/remove', { id: id })
          if (res.code === 200) {
            this.$message.success('删除成功~')
            this.getQuestionList()
          } else {
            this.$message.error('删除失败~')
          }
        })
        .catch(() => {})
    },

    // 状态改变
    async status (id) {
      const res = await this.$axios.post('/question/status', { id: id })
      if (res.code === 200) {
        this.$message.success('状态更新成功~')
        this.getQuestionList()
      } else {
        this.$message.error('状态更新失败~')
      }
    },
    // 分页功能
    // 每页显示多少条
    sizeChange (limit) {
      this.limit = limit
      this.search()
    },
    // 下一页和上一页
    currentChange (page) {
      this.page = page
      this.getQuestionList()
    }
  },
  mounted () {
    // 题库列表
    this.getQuestionList()
    // 学科列表
    this.getSubjectList()
    // 企业列表
    this.getEnterpriseList()
  }
}
</script>

<style></style>
