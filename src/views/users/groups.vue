<template>
  <div class="groups-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.name" class="grid-content bg-purple" placeholder="请输入组名" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="3" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出导出界面" placement="top-start">
              <el-button type="success" @click="open">导出</el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出新建界面" placement="top-start">
              <el-button type="primary" @click="add">新增</el-button>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="21" class="titleBar">
          <div class="grid-content bg-purple">
            <el-collapse @change="fetchData">
              <el-collapse-item>
                <template slot="title">
                  <el-button type="warning" icon="el-icon-s-unfold" circle />
                  <el-tooltip class="item" effect="dark" content="点击一次展开，再点击一次筛选" placement="bottom">
                    <el-button type="primary">多重筛选</el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="点击清空筛选内容，再点击一次刷新页面" placement="bottom">
                    <el-button type="info" @click="resetParams">重置</el-button>
                  </el-tooltip>
                </template>
                <div class="block">
                  <el-form ref="filterForm" :model="params" label-width="80px">
                    <el-row :gutter="20">
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="组名" prop="name">
                        <el-input v-model="params.name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                  </el-form>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

        </el-col>
      </el-row>
    </div>

    <div class="table-list">
      <el-table
        id="tableBody"
        ref="tableList"
        :data="DataList"
        border
        style="width: 100%"
        @sort-change="onSortChange"
      >
        <el-table-column
          label="ID"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击绿色按钮进入编辑" placement="top-start">
              <el-tag type="success" @click="handleEdit(scope.row)"><span>{{ scope.row.id }}</span></el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="组名"
          prop="name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="权限"
          prop="permissions"
          sortable="custom"
          width="300px"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.permissions">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
            <span>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="users"
          label="组员数"
          width="180"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        />

      </el-table>
    </div>
    <!--修改信息模态窗-->
    <el-dialog
      title="新建"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template>
        <div class="FormAdd">
          <el-form
            ref="formAdd"
            label-width="80px"
            size="mini"
            :model="formAdd"
          >
            <el-row :gutter="20">
              <el-col :span="15"><el-form-item label="名称" prop="name">
                <el-input v-model="formAdd.name" placeholder="请输入名称" />
              </el-form-item></el-col>
              <el-col :span="6" />
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20"><el-form-item label="权限" prop="permission">
                <el-select
                  v-model="formAdd.permissions"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  size="medium"
                  :remote-method="remoteMethodPermission"
                >
                  <el-option
                    v-for="item in optionsPermission"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item></el-col>
            </el-row>

            <el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelAdd">取消</el-button>
                <el-button type="primary" @click="handleSubmitAdd">立即保存</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-dialog>
    <!--编辑工单反馈-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleEdit"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template>
        <div class="FormEdit">
          <el-form
            ref="formEdit"
            label-width="80px"
            size="mini"
            :model="formEdit"
          >
            <el-row :gutter="20">
              <el-col :span="18"><el-form-item label="名称" prop="name">
                <el-input v-model="formEdit.name" placeholder="请输入名称" />
              </el-form-item></el-col>
              <el-col :span="6" />
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20"><el-form-item label="权限" prop="permission">
                <el-select
                  v-model="formEdit.permissions"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethodPermission"
                >
                  <el-option
                    v-for="item in optionsPermission"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item></el-col>
            </el-row>
            <el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelEdit">取消</el-button>
                <el-button type="primary" @click="handleSubmitEdit">立即保存</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-dialog>
    <!--页脚-->
    <div class="tableFoots">
      <center>
        <el-pagination background layout="total, prev, pager, next, jumper" :total="totalNum" :page-size="pageSize" @current-change="handleCurrentChange" />
      </center>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser, updateUser, createUser  } from '@/api/auth/user'
import { getPermissionsList } from '@/api/auth/permission'
import { getGroupsList, updateGroup, createGroup } from '@/api/auth/groups'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'OriInvoiceSubmit',
  data() {
    return {
      DataList: [],
      tableLoading: false,
      totalNum: 0,
      pageSize: 30,
      selectNum: 0,
      checkList: [],
      tableData: {
      },
      params: {
        page: 1,
        allSelectTag: 0
      },
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      formAdd: {
        name: '',
        permissions: []
      },
      formEdit: {
        name: '',
        permissions: []
      },
      feedbackData: {
        type: Object,
        default() {
          return {
            id: '',
            memorandum: ''
          }
        }
      },
      optionsPermission: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    fetchData() {
      // console.log('我开始运行了')
      console.log(this.params)
      this.tableLoading = true
      // console.log(this.params.create_time)
      if (typeof (this.params.create_time) !== 'undefined') {
        if (this.params.create_time.length === 2) {
          this.params.create_time_after = moment.parseZone(this.params.create_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.create_time_before = moment.parseZone(this.params.create_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getGroupsList(this.params).then(
        res => {
          this.DataList = res.data.results
          this.totalNum = res.data.count
          this.tableLoading = false
          console.log(res.data.results)
          // const ws = XLSX.utils.json_to_sheet(res.data.results)
          // const wb = XLSX.utils.book_new()
          // XLSX.utils.book_append_sheet(wb, ws, '数据详情')
          // XLSX.writeFile(wb, '列表详情1.xlsx')
        }
      ).catch(
        () => {
          this.tableLoading = false
        }
      )
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    },
    // 跳出编辑对话框
    add() {
      this.dialogVisibleAdd = true
    },
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.fetchData()
      this.$refs.formEAdd.resetFields()
    },
    handleSubmitAdd() {
      const data = this.formAdd
      createGroup(data).then(
        () => {
          this.handleCancelAdd()
          this.fetchData()
        }
      )
    },
    handleEdit(value) {
      console.log(value)
      this.formEdit = { ...value }
      console.log('我是编辑表格')
      console.log(this.formEdit)
      this.dialogVisibleEdit = true

      this.optionsPermission = this.formEdit.permissions.map(item => {
        return { label: item.name, value: item.id }
      })
      this.formEdit.permissions = this.formEdit.permissions.map(item => item.id)
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      const { id, ...data } = this.formEdit
      console.log(data)
      updateGroup(id, data).then(
        () => {
          this.$notify({
            title: '更新成功',
            message: '更新数据成功',
            type: 'success',
            duration: 3000
          })
          this.dialogVisibleEdit = false
          this.fetchData()
        }).catch(
        (error) => {
          this.$notify({
            title: '更新错误',
            message: error.data,
            type: 'error',
            duration: 0
          })
          this.dialogVisibleEdit = false
          this.fetchData()
        }
      )
    },
    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.formEdit.resetFields()
    },
    // 检索用户组选项
    unique(arr) {
      // 根据唯一标识no来对数组进行过滤
      // 定义常量 res,值为一个Map对象实例
      const res = new Map()
      // 返回arr数组过滤后的结果，结果为一个数组   过滤条件是对象中的value值，
      // 如果res中没有某个键，就设置这个键的值为1
      return arr.filter((arr) => !res.has(arr.value) && res.set(arr.value, 1))
    },
    open() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '导出 Excel',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '系统限制导出最大条数为2000条，如果超过2000条，请根据时间条件重新筛选。否则只导出前2000条!如果要大量导出数据请联系管理员。'),
          h('hr', null, ''),
          h('span', null, '系统导出数据优先按照当前多重筛选的条件，如果没有设置条件则导出全部数据。注意导出数据数量，超出最大数量则无法全部导出！'),
          h('hr', null, '')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            exportOriInvoiceSubmit(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    组名: item.name,
                  }
                })
                const ws = XLSX.utils.json_to_sheet(res.data)
                const wb = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(wb, ws, '数据详情')
                XLSX.writeFile(wb, '列表详情1.xlsx')
                resultMessage = '表格导出成功啦'
                resultType = 'success'
                instance.confirmButtonLoading = false
                done()
              },
              err => {
                console.log(err)
                resultMessage = '表格导出失败啦'
                resultType = 'error'
                instance.confirmButtonLoading = false
                done()
              }
            )
          } else {
            done()
          }
        }
      }).then(action => {
        console.log(action)
        this.$message({
          type: resultType,
          message: '最终结果: ' + resultMessage
        })
      }).catch(
        (error) => {
          console.log(error)
        }
      )
    },
    // 权限搜索
    remoteMethodPermission(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          console.log(paramsSearch)
          getPermissionsList(paramsSearch).then(
            res => {
              this.optionsPermission = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.optionsPermission = []
      }
    },
    // 排序
    onSortChange({ prop, order }) {
      console.log(this.GroupList)
      this.DataList.sort(this.compare(prop, order))
    },
    // 排序
    compare(propertyName, sort) {
      return function(obj1, obj2) {
        var value1 = obj1[propertyName]
        if (typeof (value1) === 'object') {
          value1 = value1.name
        }

        var value2 = obj2[propertyName]
        if (typeof (value2) === 'object') {
          value2 = value2.name
        }
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
    },
    // 重置筛选
    resetParams() {
      this.params = {
        page: 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.el-transfer-panel__list.is-filterable{
  width:400px !important;
  height:500px !important;
}

.el-transfer-panel{
  width: 400px !important;
  height: 500px !important;
}

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
.table-list {
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
  /*background: #d3dce6;*/
}
.bg-purple-light {
  /*background: #e5e9f2;*/
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  /*background-color: #f9fafc;*/
}
#tableBody {
  z-index: 1;
}

.el-transfer-panel {
  width: 400px;
}
</style>
