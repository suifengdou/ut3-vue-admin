<template>
  <div class="users-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="4" class="titleBar">
          <div class="grid-content bg-purple">
            <el-input v-model="params.username" class="grid-content bg-purple" placeholder="请输入用户名" @keyup.enter.native="searchClick">
              <el-button slot="append" icon="el-icon-search" @click="searchClick" />
              <el-button slot="prepend" type="primary" size="large" style="color: #000;" @click="add">新增用户</el-button>
            </el-input>
          </div>

        </el-col>
        <el-col :span="8" class="titleBar">
          <div class="grid-content bg-purple" />
        </el-col>
        <el-col :span="8" class="titleBar">
          <div class="grid-content bg-purple">
            <el-button type="success" size="large" @click="getparams">获取参数</el-button>
          </div>
        </el-col>
      </el-row>

    </div>
    <users-list class="tableBody" :value-list="UserList" :total="totalNum" style="margin: 0px 5px 5px 10px" @edit="handleEdit" @delete="handleDelete" />
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisibleAdd"
      width="30%"
    >
      <user-form
        ref="UserForm"
        :is-loading="isLoadingCreate"
        @submit="handleSubmitAdd"
        @cancel="handleCancelAdd"
      />
    </el-dialog>
    <!-- 编辑功能不在子组件中创建，否则父子组件通信会造成，props参数修正复杂。因为父组件是单向至子组件 -->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleEdit"
      width="30%"
    >
      <template>
        <div class="userFormEdit">
          <el-form
            ref="userFormEdit"
            label-width="80px"
            size="mini"
            :model="formEdit"
            :rules="rulesEdit"
          >
            <el-form-item label="名称" prop="username">
              <el-input v-model="formEdit.username" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="是否管理员" prop="is_superuser">
              <el-switch
                v-model="formEdit.is_superuser"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="名字" prop="first_name">
              <el-input v-model="formEdit.first_name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="姓" prop="last_name">
              <el-input v-model="formEdit.last_name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formEdit.email" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="员工状态" prop="is_staff">
              <el-switch
                v-model="formEdit.is_staff"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="激活状态" prop="is_active">
              <el-switch
                v-model="formEdit.is_active"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nick">
              <el-input v-model="formEdit.nick" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="创建时间" prop="create_time">
              <el-input v-model="formEdit.create_time" disabled placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="更新时间" prop="update_time">
              <el-input v-model="formEdit.update_time" disabled placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="组" prop="groups">
              <template>
                <el-select
                  v-model="formEdit.groups"
                  multiple
                  filterable
                  remote
                  default-first-option
                  placeholder="请选择组"
                  :remote-method="searchOptionGroup"
                >
                  <el-option
                    v-for="item in optionsGroups"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelEdit">取消</el-button>
                <el-button type="primary" @click="submitEdit">立即保存</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-dialog>
    <div class="tableFoots">
      <center>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalNum"
          @current-change="handleCurrentChange"
        />
      </center>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser, updateUser, createUser } from '@/api/auth/user'
import { getGroupsList } from '../../api/auth/groups'
import UsersList from './components/userlist'
import UserForm from './components/userform'
import { getGroupExport, createGroup, updateGroup, deleteGroup } from '@/api/auth/groups'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'UsersContainer',
  components: {
    UsersList,
    UserForm
  },
  data() {
    return {
      UserList: [],
      multipleSelection: [],
      selectNum: 0,
      totalNum: 0,
      params: {
        page: 1,
        username: ''
      },
      dialogVisibleAdd: false,
      isLoadingCreate: false,
      dialogVisibleEdit: false,
      formEdit: {
        type: Object,
        default() {
          return {
            id: '',
            username: '',
            is_superuser: false,
            first_name: '',
            last_name: '',
            email: '',
            is_staff: true,
            is_active: true,
            nick: '',
            create_time: '',
            update_time: '',
            groups: []
          }
        }
      },
      optionsGroups: [],
      optionsUserPermissions: [],
      rulesEdit: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserList(this.params).then(
        res => {
          this.UserList = res.data.results
          this.totalNum = res.data.count
          // const ws = XLSX.utils.json_to_sheet(res.data.results)
          // const wb = XLSX.utils.book_new()
          // XLSX.utils.book_append_sheet(wb, ws, '数据详情')
          // XLSX.writeFile(wb, '列表详情1.xlsx')
        }
      )
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    },
    searchClick() {
      this.params.page = 1
      this.fetchData()
    },
    add() {
      this.dialogVisibleAdd = true
    },
    // 跳出编辑对话框
    handleEdit(userValue) {
      this.formEdit = { ...userValue }
      this.dialogVisibleEdit = true
      const optionsGroupsPrepare = []
      for (const item of this.formEdit.groups) {
        const optionGroup = { label: item.name, value: item.id }
        optionsGroupsPrepare.push(optionGroup)
      }
      this.formEdit.groups = this.formEdit.groups.map(item => item.id)
      this.optionsGroups = this.unique(optionsGroupsPrepare)
    },
    // 提交编辑完成的数据
    submitEdit() {
      this.$refs.userFormEdit.validate(valid => {
        if (!valid) {
          return
        }
        const { id, ...params } = this.formEdit
        // params.groups = params.groups.map(item => item.value)
        updateUser(id, params).then(
          () => {
            this.dialogVisibleEdit = false
            this.fetchData()
          },
          err => {
            console.log(err.message)
          }
        )
      })
    },
    handleDelete(user) {
      deleteUser(user).then(
        res => {
          this.fetchData()
        }
      )
    },
    // 关闭添加界面
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.$refs.UserForm.$refs.form.resetFields()
    },
    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.userFormEdit.resetFields()
    },
    handleSubmitAdd(data) {
      createUser(data).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      )
    },
    // 检索用户组选项
    searchOptionGroup(query) {
      const params = {}
      params.name = query
      getGroupsList(params).then(
        res => {
          this.optionsGroups = res.data.results.map(item => {
            return { label: item.name, value: item.id }
          })
        }
      )
    },
    unique(arr) {
      // 根据唯一标识no来对数组进行过滤
      const res = new Map() // 定义常量 res,值为一个Map对象实例
      // 返回arr数组过滤后的结果，结果为一个数组   过滤条件是对象中的value值，
      // 如果res中没有某个键，就设置这个键的值为1
      return arr.filter((arr) => !res.has(arr.value) && res.set(arr.value, 1))
    },
    getparams() {
      console.log(this.params)
    }
  }
}
</script>

<style lang="scss" scoped>
.users-container {
    position: relative;
    display: block;
}
.titleBar {

}
.tableTitle {
  position: fixed;
  width: 99%;
  // position: relative;
  // display: block;
  padding: 5px 0px 2px 10px;
  margin: 0px 0px 0px 10px;
  z-index: 2;
  background-color: #b3d3c2;
}
.tableBody {
  // position: relative;
  top: 100px;
  margin: 0px 0px 5px 10px;
  z-index: 1;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
