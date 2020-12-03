<template>
  <div class="subList">
    <el-card>
      <el-form :model="form" ref="form" label-width="80px" inline size="normal">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" size="default" @click="search">
          搜索
        </el-button>
        <el-button size="default" @click="del">
          清除
        </el-button>
        <el-button type="primary" size="default" @click="add">
          +新增学科
        </el-button>
      </el-form>
    </el-card>

    <el-card style="margin-top:20px;">
      <el-table ref="filterTable" :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="rid" label="学科编号"> </el-table-column>
        <el-table-column prop="name" label="学科名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期" sortable>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column label="状态">
          <!-- 插槽的使用 -->
          <template #default="scope">
            <span
              :style="{ color: scope.row.status === 0 ? 'red' : '#7a6297' }"
              >{{ scope.row.status === 0 ? '禁用' : '启用' }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              @click="handleStatus(scope.row.id)"
              >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 子组件 -->
    <add-or-update ref="addOrUpdate" />
  </div>
</template>

<script>
// 导入子组件
import AddOrUpdate from './Add-or-update'
export default {
  name: 'Subject',
  components: {
    AddOrUpdate
  },
  data () {
    return {
      form: {
        rid: '',
        name: '',
        username: '',
        status: '',
        short_name: '',
        create_time: '',
        remark: ''
      },
      page: 1,
      limit: 5,
      total: 0,
      options: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ],
      list: []
    }
  },
  methods: {
    async getData () {
      const res = await this.$axios.get('/subject/list', {
        params: {
          ...this.form,
          page: this.page,
          limit: this.limit
        }
      })
      if (res.code === 200) {
        this.list = res.data.items
        this.total = res.data.pagination.total
      }
    },
    // 显示每页多少数量
    handleSizeChange (val) {
      this.limit = val
      this.getData()
    },
    // 显示第几页
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    },
    // 搜索
    search () {
      this.page = 1
      this.getData()
    },
    // 清除
    del () {
      this.$refs.form.resetFields()
      this.search()
    },
    // 新增
    add () {
      this.$refs.addOrUpdate.mode = 'add'
      this.$refs.addOrUpdate.dialogVisible = true
      // this.$refs.addOrUpdate.form = {}
    },
    // 编辑
    handleEdit (row) {
      this.$refs.addOrUpdate.mode = 'edit'
      this.$nextTick(() => {
        this.$refs.addOrUpdate.form = JSON.parse(JSON.stringify(row))
      })
      this.$refs.addOrUpdate.dialogVisible = true
    },
    // 删除
    handleDelete (id) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.post('/subject/remove', { id: id })
          if (res.code == 200) {
            this.$message.success('删除成功~')
            this.getData()
          } else {
            this.$message.success('删除失败~')
          }
        })
        .catch(() => {})
    },
    // 禁用启用
    async handleStatus (id) {
      const res = await this.$axios.post('/subject/status', { id: id })
      if (res.code == 200) {
        this.$message.success('状态更新成功~')
        this.getData()
      } else {
        this.$message.error('状态更新失败~')
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
.el-pagination {
  text-align: center;
}
</style>
