<template>
  <div class="users-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
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
              <el-button @click="checkAllOption">全选{{ totalNum }}项</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-input v-model="params.username" class="grid-content bg-purple" placeholder="请输入用户名" @keyup.enter.native="searchClick">
              <el-button slot="append" icon="el-icon-search" @click="searchClick" />
            </el-input>
          </div>

        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-button type="success" @click="getparams">导入</el-button>
            <el-button type="success" @click="getparams">导出</el-button>
          </div>
        </el-col>
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="add">新增用户</el-button>
          </div>

        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20" class="titleBar">
          <div class="grid-content bg-purple">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                  <el-button icon="el-icon-search" circle />
                  <el-button type="warning" icon="el-icon-s-unfold" circle />
                  <el-button type="primary">多重筛选</el-button>
                </template>
                <div class="block">
                  <el-form ref="form" :model="params" label-width="80px">
                    <el-form-item label="活动名称">
                      <el-input v-model="params.username" />
                    </el-form-item>
                    <el-form-item label="活动区域">
                      <el-select v-model="params.username" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai" />
                        <el-option label="区域二" value="beijing" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                      <div class="block">
                        <el-date-picker
                          v-model="params.create_time"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        />
                      </div>
                    </el-form-item>
                    <el-form-item label="即时配送">
                      <el-switch
                        v-model="params.is_staff"
                        style="display: block"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-text="按月付费"
                        inactive-text="按年付费"
                      />
                    </el-form-item>
                    <el-form-item label="活动性质">
                      <div style="margin-top: 20px">
                        <el-checkbox-group v-model="checkList" @change="handleChange">
                          <el-checkbox-button label="1">过江猛龙</el-checkbox-button>
                          <el-checkbox-button label="2">龙腾四海</el-checkbox-button>
                          <el-checkbox-button label="3">九头神蛇</el-checkbox-button>
                          <el-checkbox-button label="4">三眼乌鸦</el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                    </el-form-item>
                    <el-form-item label="特殊资源">
                      <el-radio-group v-model="params.username">
                        <el-radio label="线上品牌商赞助" />
                        <el-radio label="线下场地免费" />
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                      <el-input v-model="params.username" type="textarea" />
                    </el-form-item>
                  </el-form>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

        </el-col>
      </el-row>
    </div>

    <div class="users-list">
      <el-table
        id="tableBody"
        ref="tableList"
        :data="UserList"
        border
        style="width: 100%"
        @sort-change="onSortChange"
      >
        <el-table-column ref="checkall" type="selection" label="选项" />
        <el-table-column
          label="id"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="名"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.first_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.last_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="登陆标识"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_staff"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          label="激活标识"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          label="昵称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nick }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建者"
          prop="creator"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column
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
          label="创建时间"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button class="page-button" type="warning" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button class="page-button" type="danger" size="small" @click="submitDelete(scope.row)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisibleAdd"
      width="30%"
    >
      <user-form ref="UserForm" :is-loading="isLoadingCreate" @submit="handleSubmitAdd" @cancel="handleCancelAdd" />
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
              <el-switch v-model="formEdit.is_superuser" active-color="#13ce66" inactive-color="#ff4949" />
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
              <el-switch v-model="formEdit.is_staff" active-color="#13ce66" inactive-color="#ff4949" />
            </el-form-item>
            <el-form-item label="激活状态" prop="is_active">
              <el-switch v-model="formEdit.is_active" active-color="#13ce66" inactive-color="#ff4949" />
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
                  <el-option v-for="item in optionsGroups" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <template>
                <el-select
                  v-model="formEdit.department"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择部门"
                  :remote-method="remoteMethodDepartment"
                >
                  <el-option
                    v-for="item in optionsDepartment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="公司" prop="company">
              <template>
                <el-select
                  v-model="formEdit.company"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择部门"
                  :remote-method="remoteMethodCompany"
                >
                  <el-option
                    v-for="item in optionsCompany"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="平台" prop="platform">
              <template>
                <el-select
                  v-model="formEdit.platform"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择部门"
                  :remote-method="remoteMethodPlatform"
                >
                  <el-option
                    v-for="item in optionsPlatform"
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
        <el-pagination background layout="prev, pager, next" :total="totalNum" :page-size="pageSize" @current-change="handleCurrentChange" />
      </center>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser, updateUser, createUser, getUser, postUser, putUser, patchUser } from '@/api/auth/user'
import { getDepartmentList } from '@/api/base/department'
import { getCompanyList } from '@/api/base/company'
import { getPlatformList } from '@/api/base/platform'
import { getGroupsList } from '@/api/auth/groups'
import UserForm from './components/userform'
import Sortable from 'sortablejs'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'UsersContainer',
  components: {
    UserForm,
    Sortable
  },

  data() {
    return {
      UserList: [],
      totalNum: 0,
      pageSize: 30,
      selectNum: 0,
      checkList: [],
      tableData: {},
      params: {
        page: 1,
        username: '',
        create_time: '',
        groups: []
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
            company: {},
            department: {},
            platform: {},
            groups: []
          }
        }
      },
      optionsGroups: [],
      optionsUserPermissions: [],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      rulesEdit: {
        username: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      },
      cities: ['上海', '北京', '广州', '深圳']
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

      this.optionsDepartment = [{ label: this.formEdit.department.name, value: this.formEdit.department.id }]
      this.formEdit.department = this.formEdit.department.id
      // this.optionsDepartment = this.unique(optionsDepartmentPrepare)

      this.optionsCompany = [{ label: this.formEdit.company.name, value: this.formEdit.company.id }]
      this.formEdit.company = this.formEdit.company.id

      this.optionsPlatform = [{ label: this.formEdit.platform.name, value: this.formEdit.platform.id }]
      this.formEdit.platform = this.formEdit.platform.id
    },
    // 提交编辑完成的数据
    submitEdit() {
      this.$refs.userFormEdit.validate(valid => {
        if (!valid) {
          return
        }
        console.log(this.formEdit)
        const { id, ...params } = this.formEdit
        // params.groups = params.groups.map(item => item.value)
        params.department = params.department.id
        params.company = params.company.id
        params.platform = params.platform.id
        console.log(params)
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
    handleDelete(id) {
      deleteUser(id).then(
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
      // 定义常量 res,值为一个Map对象实例
      const res = new Map()
      // 返回arr数组过滤后的结果，结果为一个数组   过滤条件是对象中的value值，
      // 如果res中没有某个键，就设置这个键的值为1
      return arr.filter((arr) => !res.has(arr.value) && res.set(arr.value, 1))
    },
    submitDelete(user) {
      const id = user.id
      const name = user.username
      this.$confirm(`此操作将停用该用户:${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        })
      })
    },
    getparams() {
      console.log(this.params)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.selectNum !== this.totalNum || this.multipleSelection.length < 30) {
        this.selectNum = this.multipleSelection.length
      }
      console.log('我是单选的' + this.selectNum)
    },
    checkAllOption() {
      this.$refs.tableList.clearSelection()
      this.$refs.tableList.toggleAllSelection()
      console.log(this.multipleSelection.length)
      this.selectNum = this.totalNum
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
    },
    handleChange(val) {
      console.log(val)
      this.params.groups = val
      console.log(this.params)
    },
    remoteMethodDepartment(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        this.loading = true
        setTimeout(() => {
          this.loading = false
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getDepartmentList(paramsSearch).then(
            res => {
              this.optionsDepartment = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.options = []
      }
    },
    remoteMethodCompany(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        this.loading = true
        setTimeout(() => {
          this.loading = false
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getCompanyList(paramsSearch).then(
            res => {
              this.optionsCompany = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.options = []
      }
    },
    remoteMethodPlatform(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          const paramsSearch = {}
          paramsSearch.name = query
          getPlatformList(paramsSearch).then(
            res => {
              this.optionsPlatform = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.options = []
      }
    },
    onSortChange({ prop, order }) {
      console.log(this.GroupList)
      this.UserList.sort(this.compare(prop, order))
    },
    compare(propertyName, sort) {
      return function(obj1, obj2) {
        var value1 = obj1[propertyName]
        var value2 = obj2[propertyName]
        if (typeof value1 === 'string' && typeof value2 === 'string') {
          const res = value1.localeCompare(value2, 'zh')
          return sort === 'ascending' ? res : -res
        } else {
          if (value1 <= value2) {
            return sort === 'ascending' ? -1 : 1
          } else if (value1 > value2) {
            return sort === 'ascending' ? 1 : -1
          }
        }
      }
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
  padding: 0px 0px 0px 0px;
  margin: 0px 0px 0px 0px;
  z-index: 2;
  background-color: #b3d3c2;
}
.users-list {
  padding: 115px 15px 0px 15px;
  margin: 0px 0px 0px 0px;
}
.el-row {
  margin: 0px 0px 5px 0px;
  padding: 5px 20px 5px 15px;
  &:last-child {
    margin-bottom: 0;
  }
}
.tableFoots {
  margin: 0px 0px 5px 0px;
  padding: 5px 20px 5px 15px;
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
#tableBody {
  z-index: 1;
}
</style>
