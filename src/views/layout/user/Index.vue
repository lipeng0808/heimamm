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
          <el-select v-model="form.role_id" placeholder="请选择" clearable>
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
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="status" label="状态">{{
          status
        }}</el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleStart(scope.$index, scope.row)"
              >启用</el-button
            >
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
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
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      form: {
        username: '',
        email: '',
        role_id: ''
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
      tableData: [], //列表数组
      status: '', //启用或禁用
      isClearable: false
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
        this.tableData = res.data.items
        // 启用或禁用
        res.data.items.forEach(ele => {
          ele.status === 0 ? (this.status = '禁用') : (this.status = '启用')
        })
        // 列表总数
        this.total = res.data.pagination.total
      }
    },
    // 搜索
    search () {
      this.getListData()
    },
    // 清空
    delClick () {
      this.form.username = ''
      this.form.email = ''
      this.form.role_id = ''
    },
    // 新增
    add () {
      console.log(333)
    },
    // 编辑
    handleEdit (index, row) {
      console.log(index, row)
    },
    // 启用
    handleStart (index, row) {
      console.log(index, row)
    },
    // 删除
    handleDelete (index, row) {
      console.log(index, row)
    },

    // limit: 设置分页栏的每页显示数量
    handleSizeChange (val) {
      this.limit = val
      this.getListData()
    },
    // page: 设置显示第几页
    handleCurrentChange (val) {
      this.page = val
      this.getListData()
    }
  },
  mounted () {
    // 发送axios请求
    this.getListData()
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
</style>
