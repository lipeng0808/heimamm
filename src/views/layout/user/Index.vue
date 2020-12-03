<template>
  <div class="userList">
    <el-card class="one">
      <el-form :model="form" ref="form" label-width="80px" inline>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="delClick">清除</el-button>
          <el-button @click="add" type="primary">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="two">
      <!-- 数据列表 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="序号" type="index" align="center">
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template #default="{row}">
            <img :src="url + '/' + row.avatar" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="电话" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="role" label="角色" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <!-- slot插槽 -->
          <template #default="scope">
            <span v-if="scope.row.status === 0" style="color:red;">禁用</span>
            <span v-if="scope.row.status === 1" style="color:#6ac144;"
              >启用</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" header-align="center">
          <template #default="scope">
            <el-button size="mini" @click="edit(scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              @click="handleStart(scope.row.id)"
              >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 
      分页栏 
      current-page: 当前页数
      -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          center
        >
        </el-pagination>
      </div>
    </el-card>
    <add-or-update ref="addOrUpdate" />
  </div>
</template>

<script>
// 导入子组件
import AddOrUpdate from './Add-or-update'
export default {
  name: 'User',
  components: {
    AddOrUpdate
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        role_id: '',
        avatar: ''
      },
      options: [
        { value: 1, label: '超级管理员' },
        { value: 2, label: '管理员' },
        { value: 3, label: '老师' },
        { value: 4, label: '学生' }
      ],
      page: 0, //当前页
      limit: 5, //每页显示的数量
      total: 0, //总数
      list: [] //列表数组
    }
  },
  methods: {
    // 获取用户信息
    async getListData () {
      const res = await this.$axios.get('/user/list', {
        params: { ...this.form, page: this.page, limit: this.limit }
      })
      if (res.code === 200) {
        // 渲染列表数据
        this.list = res.data.items
        // 列表总数
        this.total = res.data.pagination.total
      }
    },
    // 搜索
    search () {
      this.page = 1
      this.getListData()
    },
    // 清空
    delClick () {
      // 清空输入框内容
      this.$refs.form.resetFields()
      // 调用方法,刷新列表
      this.search()
    },
    // 新增
    add () {
      this.$refs.addOrUpdate.mode = 'add'
      this.$refs.addOrUpdate.dialogVisible = true
      this.$refs.addOrUpdate.form = {}
    },
    // 编辑
    edit (row) {
      this.$refs.addOrUpdate.mode = 'edit'
      // this.$nextTick(function(){})方法的使用
      // console.log(row)
      this.$nextTick(() => {
        this.$refs.addOrUpdate.form = JSON.parse(JSON.stringify(row))
      })

      this.$refs.addOrUpdate.dialogVisible = true
    },
    // 启用
    async handleStart (id) {
      const res = await this.$axios.post('/user/status', { id: id })
      if (res.code === 200) {
        this.$message.success({ message: '修改成功!' })
        this.getListData()
      }
    },
    // 删除
    handleDelete (id) {
      this.$confirm('是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.post('/user/remove', { id: id })
          if (res.code === 200) {
            this.$message.success({ message: '删除成功!' })
            this.getListData()
          }
        })
        .catch(() => {})
    },

    // limit: 设置分页栏的每页显示数量
    handleSizeChange (val) {
      this.page = 1
      this.limit = val
      this.getListData()
    },
    // page: 设置显示第几页
    handleCurrentChange (val) {
      this.page = 1
      this.page = val
      this.getListData()
    }
  },
  mounted () {
    // 发送axios请求
    this.getListData()

    this.url = process.env.VUE_APP_BASEURL
  }
}
</script>

<style lang="less">
.two {
  margin-top: 20px;
}
.pagination {
  text-align: center;
  padding-top: 20px;
}
.cell img {
  width: 50px;
  height: 50px;
}
</style>
