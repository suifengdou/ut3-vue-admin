<template>
  <div class="users-list">
    <div id="operationBoard" style="margin: 20px 10px 0px 10px">
      <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
        选中所有的{{ selectNum }}项
        <el-dropdown-menu slot="dropdown" trigger="click">
          <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核订单</el-button></el-dropdown-item>
          <el-dropdown-item>重置订单</el-dropdown-item>
          <el-dropdown-item>驳回订单</el-dropdown-item>
          <el-dropdown-item>标记订单</el-dropdown-item>
          <el-dropdown-item>丢弃订单</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="checkAllOption">全选{{ total }}项</el-button>
    </div>
    <el-table
      id="tableBody"
      ref="tableList"
      :data="valueList"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        ref="checkall"
        type="selection"
        label="选项"
      />
      <el-table-column
        fixed
        label="id"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="用户名"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="名"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.first_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="姓"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.last_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="邮箱"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="登陆标识"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_staff"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="激活标识"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_active"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="昵称"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.nick }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="创建者"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="组"
      >
        <template slot-scope="scope">
          <div
            v-for="(item, index) in scope.row.groups"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
            <span style="float: left">{{ item.name }},</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="更新时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button class="page-button" type="warning" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button class="page-button" type="danger" size="small" @click="handleDelete(scope.row)">停用</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getUser, postUser, putUser, patchUser } from '@/api/auth/user'
export default {
  name: 'UsersList',
  props: ['valueList', 'total'],
  data() {
    return {
      multipleSelection: [],
      selectNum: 0
    }
  },
  methods: {
    handleEdit(rowValue) {
      this.$emit('edit', rowValue)
    },
    handleDelete(user) {
      const id = user.id
      const name = user.username
      this.$confirm(`此操作将停用该用户:${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        })
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.tableList.toggleRowSelection(row)
        })
      } else {
        this.$refs.tableList.clearSelection()
      }
      console.log(this.multipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.selectNum !== this.total || this.multipleSelection.length < 30) {
        this.selectNum = this.multipleSelection.length
      }
      console.log('我是单选的' + this.selectNum)
    },
    checkAllOption() {
      this.$refs.tableList.clearSelection()
      this.$refs.tableList.toggleAllSelection()
      console.log(this.multipleSelection.length)
      this.selectNum = this.total
      console.log('我是全选的' + this.selectNum)
    },
    handleCheck() {
      this.multipleSelection = this.multipleSelection.map(item => item.id)
      console.log('我是审核')
      console.log(this.multipleSelection)
      const data = {
        users: this.multipleSelection
      }
      postUser(data).then(
        res => {
          console.log(res)
          this.$router.push('/users/list')
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .users-list {
    position: relative;
    display: block;
  }
  .page-button {
    display: inline-block;
    text-align: center;
  }
  #operationBoard {
    position: fixed;
    top: 120px;
    left: auto;
    z-index:2;
  }
  #tableBody {
    z-index:1;
  }
</style>
