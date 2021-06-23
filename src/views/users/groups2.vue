<template>
  <div class="groups-list-container">
    <el-col :span="6" class="tableTitle">
      <el-input v-model="params.name" placeholder="请输入内容" @keyup.enter.native="searchClick" />
      <el-button slot="append" icon="el-icon-search" @click="searchClick" />
    </el-col>
    <el-col :span="6" class="tableTitle" style="text-align: right">
      <el-button type="success" plain @click="handleAddGroupBtn">添加用户组</el-button>
      <el-button type="success" plain @click="exportGroup">导出</el-button>
    </el-col>
    <!--表格开始-->
    <el-table
      ref="multipleTable"
      class="tableBody"
      tooltip-effect="dark"
      :data="GroupList"
      width="100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        ref="checkall"
        class="aa bb cc"
        type="selection"
        label="选项"
      />
      <el-table-column
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="name"
        label="组名"
        width="180"
      />
      <el-table-column
        prop="users"
        label="组员数"
        width="180"
      />
      <el-table-column
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleModifyGroupClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDeleteGroupClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 20px 10px 0px 10px">
      <el-button @click="checkAllOption">全选</el-button>
      <el-button @click="toggleSelection()">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>

    <div class="tableFoots">
      <center>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          :total="totalNum"
          @current-change="handleCurrentChange"
        />
      </center>
    </div>
    <el-dialog title="添加用户组" :visible.sync="addGroupFormVisible">
      <el-form ref="addGroupForm" :model="addGroupForm" :rules="addGroupFormRule">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addGroupForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGroupFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddGroupSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户组" :visible.sync="updateGroupFormVisible">
      <el-form ref="updateGroupForm" :model="updateGroupForm" :rules="addGroupFormRule">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="updateGroupForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateGroupFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleupdateGroupSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getGroupsList, createGroup, updateGroup, deleteGroup, getGroupExport } from '@/api/auth/groups'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'GroupsList',
  data() {
    const GroupList = []
    const totalNum = 0
    const params = {
      page: 1,
      name: ''
    }
    const addGroupFormVisible = false
    const formLabelWidth = '120px'
    const addGroupForm = {
      name: ''
    }
    const updateGroupFormVisible = false
    const updateGroupForm = {
      id: '',
      name: ''
    }

    return {
      GroupList,
      totalNum,
      params,
      addGroupForm,
      addGroupFormVisible,
      formLabelWidth,
      addGroupFormRule: {
        name: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 2, max: 30, message: '字符限制在2-30之间', trigger: 'blur' }
        ]
      },
      updateGroupFormVisible,
      updateGroupForm,
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.params)
      getGroupsList(this.params).then(
        res => {
          this.GroupList = res.data.results
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
    handleAddGroupBtn() {
      this.addGroupFormVisible = true
    },
    handleAddGroupSubmit() {
      const data = {
        name: this.addGroupForm.name
      }
      createGroup(data).then(res => {
        this.$message({
          message: '创建用户组成功',
          type: 'success'
        })
        this.addGroupFormVisible = false
        this.$refs.addGroupForm.resetFields()
        this.fetchData()
      }).catch(error => {
        console.log(error)
      })
    },
    handleModifyGroupClick(obj) {
      this.updateGroupFormVisible = true
      this.updateGroupForm = { ... obj }
    },
    handleupdateGroupSubmit() {
      updateGroup(this.updateGroupForm.id, this.updateGroupForm).then(
        res => {
          this.updateGroupFormVisible = false
          this.$refs.updateGroupForm.resetFields()
          this.fetchData()
        }
      )
    },
    handleDeleteGroupClick(obj) {
      const id = obj.id
      const name = obj.name
      this.$confirm(`此操作将删除该IDC:${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('正在删除')
        deleteGroup(id).then(
          res => {
            this.$message({
              type: 'success',
              message: `${name}删除成功`
            })
            this.fetchData()
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    exportGroup() {
      console.log('我是导出的参数')
      console.log(this.params)
      getGroupExport(this.params).then(
        res => {
          console.log(res)
          const now = Date()
          const name = now.replace(/\D/g, '')
          const ws = XLSX.utils.json_to_sheet(res.data)
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws, '数据详情')
          XLSX.writeFile(wb, name + '.xlsx')
        })
    },
    importGroup() {

    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
      console.log(this.multipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    checkAllOption() {
      this.$refs.multipleTable.toggleAllSelection()
      console.log(this.$refs.multipleTable)
    }
  }
}
</script>

<style lang="scss" scoped>
.groups-list-container {
    position: relative;
    display: block;
}
.tableTitle {
  // position: relative;
  margin: 10px 0px 10px 10px;
}
el-col {
 width: 300px;
}

.tableBody {
  // position: relative;
  margin: 0px 0px 15px 10px;
}

</style>
