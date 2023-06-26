<template>
  <div class="maintenance-goods-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">统计</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击选中所有筛选出的订单" placement="top-start">
                <el-button @click="checkAllOption">全选{{ totalNum }}项</el-button>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col :span="4" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="支持多个保修单号" placement="top-start">
              <el-input v-model="params.order__order_id" class="grid-content bg-purple" placeholder="请输入保修单号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="4" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="配件搜索" placement="top-start">
              <el-input v-model="params.part__name" class="grid-content bg-purple" placeholder="请输入配件名称" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="4" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出导出界面" placement="top-start">
              <el-button type="success" @click="exportExcel">导出</el-button>
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
                      <el-col :span="6"><el-form-item label="配件名称" prop="">
                        <el-input v-model="params.part__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12"><el-form-item label="完成时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.finish_time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                        </div>
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12"><el-form-item label="创建时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.created_time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                        </div>
                      </el-form-item></el-col>
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
        v-loading="tableLoading"
        :data="DataList"
        border
        style="width: 100%"
        :row-style="rowStyle"
        @sort-change="onSortChange"
        @selection-change="handleSelectionChange"
        @cell-dblclick="handelDoubleClick"
      >
        <el-table-column ref="checkall" type="selection" label="选项" />
        <el-table-column
          label="ID"
        >
          <template slot-scope="scope">
            <el-tag type="success"><span>{{ scope.row.id }}</span></el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="保修单号"
          prop="order"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理标签"
          prop="process_tag"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.process_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误标签"
          prop="mistake_tag"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mistake_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配件名称"
          prop="part"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.part.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配件数量"
          prop="quantity"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日志查看"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="logView(scope.row)">查看</el-button>
          </template>
        </el-table-column>


        <el-table-column
          label="配件备注"
          prop="part_memo"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.part_memo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修完成时间"
          prop="finish_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.finish_time }}</span>
          </template>
        </el-table-column>


        <el-table-column
          label="创建时间"
          prop="created_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.created_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="update_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.updated_time }}</span>
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
      </el-table>
    </div>
    <!--日志查看模态窗-->
    <el-dialog
      title="日志查看"
      :visible.sync="logViewVisible"
      width="50%"
      border
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="margin: auto">
        <el-table :data="logDetails" border>
          <el-table-column
            label="操作人"
            prop="name"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作内容"
            prop="content"
            width="520px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="created_time"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.created_time }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>


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
import {
  getMaintenanceGoodsSubmit,
  exportMaintenanceGoodsSubmit,
  checkMaintenanceGoodsSubmit
} from '@/api/crm/service/maintenancegoods/submit'
import { getLogMaintenanceGoods } from "@/api/crm/service/maintenancegoods/manage"
import { getCompanyList } from '@/api/base/company'
import moment from 'moment'
import XLSX from 'xlsx'

export default {
  name: 'maintenanceGoodsSubmit',
  data() {
    return {
      DataList: [],
      tableLoading: false,
      totalNum: 0,
      pageSize: 30,
      selectNum: 0,
      checkList: [],
      tableData: {},
      logViewVisible: false,
      logDetails: [],
      params: {
        page: 1,
        allSelectTag: 0
      },
      optionsProcess: [
        {
          value: 0,
          label: '无异常'
        },
        {
          value: 1,
          label: '审核异常'
        },
        {
          value: 2,
          label: '逆向异常'
        },
        {
          value: 3,
          label: '取件异常'
        },
        {
          value: 4,
          label: '入库异常'
        },
        {
          value: 5,
          label: '维修异常'
        },
        {
          value: 6,
          label: '超期异常'
        }
      ],
      optionsSign: [
        {
          value: 0,
          label: '无'
        },
        {
          value: 1,
          label: '处理完毕'
        },
        {
          value: 2,
          label: '配件缺货'
        },
        {
          value: 3,
          label: '延后处理'
        },
        {
          value: 4,
          label: '快递异常'
        },
        {
          value: 5,
          label: '特殊问题'
        },
        {
          value: 6,
          label: '处理收费'
        },
        {
          value: 7,
          label: '其他情况'
        }
      ],
      optionsJudgment: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      rules: {
        buyer_nick: [
          { required: true, message: '请选择客户网名', trigger: 'blur' }
        ]
      },
      checkedDetail: [],
      checkedDetailEdit: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // console.log('我开始运行了')
      console.log(this.params)
      this.tableLoading = true
      // console.log(this.params.created_time)
      if (typeof (this.params.created_time) !== 'undefined') {
        if (this.params.created_time.length === 2) {
          this.params.created_time_after = moment.parseZone(this.params.created_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.created_time_before = moment.parseZone(this.params.created_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (typeof (this.params.finish_time) !== 'undefined') {
        if (this.params.finish_time.length === 2) {
          this.params.finish_time_range = this.params.finish_time.toString()
        }
      }
      getMaintenanceGoodsSubmit(this.params).then(
        res => {
          this.DataList = res.data.results
          this.totalNum = res.data.count
          this.tableLoading = false
          console.log(res.data.results)
        }
      ).catch(
        (error) => {
          this.tableLoading = false
          this.$notify({
            title: '错误详情',
            message: error.data,
            type: 'error',
            offset: 210,
            duration: 0
          })
        }
      )
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
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
    // 导出
    exportExcel() {
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
            exportMaintenanceGoodsSubmit(this.params).then(
              res => {
                console.log(res)
                res.data = res.data.map(item => {
                  return {
                    保修单: item.order.name,
                    配件: item.part.name,
                    配件数量: item.quantity,
                    配件备注: item.part_memo,
                    保修完成时间: item.finish_time,
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
          this.$notify({
            title: '错误详情',
            message: error.data,
            type: 'error',
            offset: 210,
            duration: 0
          })
        }
      )
    },
    // 选择器，单选和多选（主表的）
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.selectNum !== this.totalNum || this.multipleSelection.length < 30) {
        this.selectNum = this.multipleSelection.length
        this.params.allSelectTag = 0
      }
    },
    // 全选的
    checkAllOption() {
      this.$refs.tableList.clearSelection()
      this.$refs.tableList.toggleAllSelection()
      this.params.allSelectTag = 1
      this.selectNum = this.totalNum
      console.log('我是全选的' + this.selectNum)
    },
    // 审核单据
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkMaintenanceGoodsSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
                type: 'error',
                offset: 140,
                duration: 5000
              })
              this.$notify({
                title: '错误详情',
                message: res.data.error,
                type: 'error',
                offset: 210,
                duration: 5000
              })
            }
            delete this.params.allSelectTag
            this.fetchData()
          }).catch(
          (error) => {
            this.$notify({
              title: '错误详情',
              message: error.data,
              type: 'error',
              offset: 210,
              duration: 5000
            })
            this.fetchData()
          }
        )
      } else {
        console.log(this.multipleSelection)
        if (typeof (this.multipleSelection) === 'undefined') {
          this.$notify({
            title: '错误详情',
            message: '未选择订单无法审核',
            type: 'error',
            offset: 70,
            duration: 5000
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        checkMaintenanceGoodsSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
                type: 'error',
                offset: 140,
                duration: 5000
              })
              this.$notify({
                title: '错误详情',
                message: res.data.error,
                type: 'error',
                offset: 210,
                duration: 5000
              })
            }
            console.log(this.params)
            console.log(this.params.ids)

            delete this.params.ids
            this.fetchData()
          }).catch(
          (error) => {
            delete this.params.ids
            this.$notify({
              title: '错误详情',
              message: error.data,
              type: 'error',
              offset: 210,
              duration: 5000
            })
            this.fetchData()
          }
        )
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

    resetParams() {
      this.params = {
        page: 1
      }
    },
    // 查看日志
    logView(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogMaintenanceGoods(data).then(
        res => {
          this.$notify({
            title: '查询成功',
            type: 'success',
            duration: 1000
          })
          this.logDetails = res.data
        }).catch(
        (error) => {
          this.$notify({
            title: '查询错误',
            message: error.data,
            type: 'error',
            duration: 5000
          })
        }
      )
    },
    // 特殊行标记颜色
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.is_delete === true) {
        row_style = {
          backgroundColor: 'aquamarine'
        }
      }
      return row_style
    },
    // 双击改内容
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'suggestion') {
        this.handleSuggestion(row)
      }
    },
    handleSuggestion(row) {
      this.$prompt('请输入反馈内容', '添加反馈', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.suggestion,
        inputErrorMessage: '输入不能为空',
        inputValidator: (value) => {
          if(!value) {
            return '输入不能为空';
          }
        }
      }).then(
        ({ value }) => {
          let CurrentTimeStamp = new Date()
          let SubmitTimeStamp = CurrentTimeStamp.toLocaleDateString()
          value = `${value} {${this.$store.state.user.name}-${SubmitTimeStamp}}`
          let id = row.id
          let data = {
            suggestion: value
          }
          updateMaintenanceGoodsSubmit(id, data).then(
            () => {
              this.$notify({
                title: '修改成功',
                type: 'success',
                offset: 70,
                duration: 3000
              })
              this.fetchData()
            },
            err => {
              this.$notify({
                title: '修改失败',
                message: `修改失败：${err.data}`,
                type: 'error',
                offset: 70,
                duration: 0
              })
            }
          )
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
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
</style>
