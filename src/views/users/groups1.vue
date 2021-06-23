<template>
  <div class="groups-list-container">
    <el-col :span="6" class="tableTitle">
      <el-input v-model="params.name" placeholder="请输入内容" @keyup.enter.native="searchClick" />
      <el-button slot="append" icon="el-icon-search" @click="searchClick" />
    </el-col>
    <el-col :span="6" class="tableTitle" style="text-align: right">
      <el-button type="success" plain @click="handleAddGroupBtn">添加用户组</el-button>
      <el-button type="success" style="margin-top:20px;" @click="exportGroup">导出</el-button>
      <el-button type="success" style="margin-top:20px;" @click="handleImport">导入</el-button>
    </el-col>
    <el-table
      id="table"
      class="tableBody"
      :data="GroupList"
      width="100%"
      @sort-change="onSortChange"
    >
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="180"
      />
      <el-table-column
        prop="name"
        label="组名"
        width="180"
        sortable="custom"
        :sort-orders="['ascending','descending']"
      />
      <el-table-column
        prop="users"
        label="组员数"
        width="180"
        sortable="custom"
        :sort-orders="['ascending','descending']"
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

    <el-dialog title="导入" :visible.sync="importGroupVisible">
      <el-form ref="importGroupForm" label-width="80px">
        <el-form-item label="文件">
          <input ref="files" type="file" @change="getFile($event)"></input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="importGroup">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div>导入界面</div>
    </el-dialog>

  </div>
</template>

<script>
import { getGroupExport, groupImport, createGroup, updateGroup, deleteGroup, getGroupsList, getGroup, postGroup, putGroup, patchGroup } from '@/api/auth/groups'
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
    const importGroupVisible = false
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
      importGroupForm: {
        type: Object,
        default() {
          return {
            id: '',
            username: ''
          }
        }
      },
      importGroupVisible,
      col: [
        {
          label: '组名',
          prop: 'name'
        },
        {
          label: 'ID',
          prop: 'id'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
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
    exportExcel() {
      const fixed = document.querySelector('.el-table__fixed')
      const excelTitle = '用户组导出'
      let wb
      if (fixed) {
        wb = XLSX.utils.table_to_book(
          document.querySelector('#table').removeChild(fixed)
        )
        document.querySelector('#table').appendChild(fixed)
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector('#table'))
      }

      const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          excelTitle + '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        } else {
          console.log(e)
        }
      }
      return wbout
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
      const importformData = new FormData()
      importformData.append('file', this.importGroupForm.file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      putGroup(importformData, config).then(
        res => {
          this.importGroupVisible = false
          this.fetchData()
        }
      )
    },
    handleImport() {
      this.importGroupVisible = true
    },
    getFile(event) {
      this.importGroupForm.file = event.target.files[0]
      console.log(event.target.files[0])
    },
    // sortFun(attr, rev){
    //   // 第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
    //   if (rev) {
    //     rev = 1
    //   } else {
    //     rev =  -1
    //   }
    //   let that = this
    //   return function (a, b) {
    //     let res = 0;
    //     for (let i = 0; ;i++) {
    //       if (!a[attr][i] || !b[attr][i]) {
    //         res = a[attr].length - b[attr].length
    //         break
    //       }
    //       let char1 = a[attr][i]
    //       let char1Type = that.getChartType(char1)
    //       let char2 = b[attr][i]
    //       let char2Type = that.getChartType(char2)
    //       // 类型相同的逐个比较字符
    //       if (char1Type[0] === char2Type[0]) {
    //         // console.log('字符类型相同');
    //         if (char1 === char2) {
    //           res = 0;
    //           // console.log('值全等', res);
    //           continue
    //         } else {
    //           if (char1Type[0] === 'zh') {
    //             res = char1.localeCompare(char2)
    //             // console.log('a的字符类型为中文', res);
    //           } else if (char1Type[0] === 'en') {
    //             res = char1.charCodeAt(0) - char2.charCodeAt(0)
    //             // console.log('a的字符类型为英文', res);
    //           } else {
    //             res = char1 - char2;
    //             // console.log('a的字符类型为数字', res);
    //           }
    //           // console.log('值不相等比较的结果', res);
    //           break
    //         }
    //       } else {
    //         // 类型不同的，直接用返回的数字相减
    //         var num1 = char1Type[1]
    //         var num2 = char2Type[1]
    //         res = num1 - num2
    //         break
    //       }
    //     }
    //     return res * rev
    //   }
    // },
    // sort_change(column) {
    //   // this.currentPage = 1;// return to the first page after sorting
    //   console.log(column)
    //   if (column.prop === 'configTemplateName') {
    //     console.log(column+'aaaaaaaaaa')
    //     // 对展示的源数据进行重新排序
    //     this.configTemplatesFilter.sort(this.sortFun(column.prop, column.order === 'ascending'))
    //   } else if (column.prop === 'configTemplatePattern') {
    //     // 对展示的源数据进行重新排序
    //     this.configTemplatesFilter.sort(this.sortFun(column.prop, column.order === 'ascending'))
    //   }
    //   // 排序完显示到第一页
    //   console.log(this.currentPage)
    //   this.handleCurrentChange(this.currentPage)
    // },
    // getChartType(char) {
    //   // 数字可按照排序的要求进行自定义 ;数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
    //   if (/^[u4e00-u9fa5]$/.test(char)) {
    //     return ['zh', 3]
    //   }
    //   if (/^[a-zA-Z]$/.test(char)) {
    //     return ['en', 2]
    //   }
    //   if (/^[0-9]$/.test(char)) {
    //     return ['number', 1]
    //   }
    //   return ['others', 4]
    // },
    // handleCurrentChange(val) {
    //   console.log(val+'bbbbbbbb')
    //   this.configTempLoading = true
    //   this.currentPage = val
    //   this.configTemplatesView = this.configTemplatesFilter.filter(data => !this.queryParam.configTemplateName || data.configTemplateName.toLowerCase().includes(this.queryParam.configTemplateName.toLowerCase())).slice((val - 1) * this.pageSize, val * this.pageSize)
    //   this.configTempLoading = false
    // }
    onSortChange({ prop, order }) {
      console.log(this.GroupList)
      this.GroupList.sort(this.compare(prop, order))
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
