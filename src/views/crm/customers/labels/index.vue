<template>
  <div class="customers-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCreateJob">创建任务</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击选中所有筛选出的订单" placement="top-start">
                <el-button @click="checkAllOption">全选{{ totalNum }}项</el-button>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col :span="3" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="客户手机" placement="top-start">
              <el-input v-model="params.name" class="grid-content bg-purple" placeholder="支持多个客户电话搜索" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
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
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="基础标签" prop="customerlabelperson">
                        <el-input v-model="params.customerlabelperson__label__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="拓展标签" prop="customerlabelfamilay">
                        <el-input v-model="params.customerlabelfamilay__label__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="产品标签" prop="customerlabelproduct">
                        <el-input v-model="params.customerlabelproduct__label__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="交易标签" prop="customerlabelorder">
                        <el-input v-model="params.customerlabelorder__label__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="服务标签" prop="customerlabelservice">
                        <el-input v-model="params.customerlabelservice__label__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="体验标签" prop="customerlabelsatisfacition">
                        <el-input v-model="params.customerlabelsatisfacition__label__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="退换标签" prop="customerlabelrefund">
                        <el-input v-model="params.customerlabelrefund__label__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="其他标签" prop="customerlabelothers">
                        <el-input v-model="params.customerlabelothers__label__name" type="text" />
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
        v-loading="tableLoading"
        :data="DataList"
        border
        style="width: 100%"
        @sort-change="onSortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column ref="checkall" type="selection" label="选项" />
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
          label="用户名"
          prop="name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="基础"
          prop="label_person"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_person">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="拓展"
          prop="label_family"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_family">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="产品"
          prop="label_product"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_product">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="交易"
          prop="label_order"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_order">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="服务"
          prop="label_service"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_service">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="体验"
          prop="label_satisfaction"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_satisfaction">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="退换"
          prop="label_refund"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_refund">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="其他"
          prop="label_others"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.label_others">
              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="memo"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.memo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="日志查看"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="logView(scope.row)">查看</el-button>
          </template>
        </el-table-column>



      </el-table>
    </div>
    <!--修改信息模态窗-->
    <el-dialog
      title="编辑"
      width="80%"
      ref="editdata"
      :visible.sync="dialogVisibleEdit"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template>
        <div class="handleFormEdit">
          <el-form
            ref="handleFormEdit"
            label-width="80px"
            size="mini"
            :model="formEdit"
            :rules="rules"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>客户相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="会员名" prop="name">
                  <span>{{ formEdit.name }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="备注" prop="memorandum">
                  <span>{{ formEdit.memorandum }}</span>
                </el-form-item></el-col>
              </el-row>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>标签信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="基础" prop="label_person">
                  <template>
                    <div v-for="(item, i) in formEdit.label_person">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="拓展" prop="label_family">
                  <template>
                    <div v-for="(item, i) in formEdit.label_family">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="产品" prop="label_product">
                  <template>
                    <div v-for="(item, i) in formEdit.label_product">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="交易" prop="label_order">
                  <template>
                    <div v-for="(item, i) in formEdit.label_order">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="服务" prop="label_service">
                  <template>
                    <div v-for="(item, i) in formEdit.label_service">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="体验" prop="label_satisfaction">
                  <template>
                    <div v-for="(item, i) in formEdit.label_satisfaction">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="退换" prop="label_refund">
                  <template>
                    <div v-for="(item, i) in formEdit.label_refund">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="其他" prop="label_others">
                  <template>
                    <div v-for="(item, i) in formEdit.label_others">
                      <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                    </div>
                  </template>
                </el-form-item></el-col>
              </el-row>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>添加删除标签</span>
              </div>

              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="添加标签" prop="add_label">
                  <el-input v-model="formEdit.add_label" placeholder="请输入标签" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="删除标签" prop="del_label">
                  <el-input v-model="formEdit.del_label" placeholder="请输入标签" />
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="16" :offset="8"><el-form-item size="large">
                  <div class="btn-warpper">
                    <el-button type="danger" @click="handleCancelEdit">取消</el-button>
                    <el-button type="primary" @click="handleSubmitEdit">立即保存</el-button>
                  </div>
                </el-form-item></el-col>
              </el-row>
            </el-card>
          </el-form>
        </div>
      </template>
    </el-dialog>
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
  getCustomerLabel,
  createCustomerLabel,
  updateCustomerLabel,
  exportCustomerLabel,
  excelImportCustomerLabel,
  createJobCustomerLabel,
  rejectCustomerLabel,
  getLogCustomerLabel
} from '@/api/crm/customers/cslabels'
import { getCompanyList } from '@/api/base/company'
import { getLabel } from '@/api/crm/labels/label/label'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'submitExpressWorkOrder',
  data() {
    return {
      DataList: [],
      tableLoading: false,
      totalNum: 0,
      pageSize: 30,
      selectNum: 0,
      checkList: [],
      tableData: {},
      params: {
        page: 1,
        allSelectTag: 0,
        name: '',
        name__in: ''
      },
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      logViewVisible: false,
      logDetails: [],
      formAdd: {},
      formEdit: {},
      optionsLabel: [],
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
        name: [
          { required: true, message: '请选择用户名', trigger: 'blur' }
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
      if (this.params.name !== undefined) {
        if (this.params.name.length > 20) {
          const names = this.params.name.split(' ').toString()
          if (names.length > 1) {
            this.params.name__in = names
            delete this.params.name
          }
        }
      }
      getCustomerLabel(this.params).then(
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
    // 跳出编辑对话框
    handleEdit(values) {
      console.log(values)
      this.formEdit = { ...values }
      this.dialogVisibleEdit = true
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      const { id, ...data } = this.formEdit
      updateCustomerLabel(id, data).then(
        () => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 0,
            duration: 3000
          })
          this.dialogVisibleEdit = false
          this.fetchData()
        },
        err => {
          this.$notify({
            title: '修改出错',
            message: err.data,
            type: 'error',
            offset: 0,
            duration: 0
          })
        }
      )

    },

    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.handleFormEdit.resetFields()
      this.handleDeleteAllDetails()
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
          h('span', null, '系统限制导出最大条数为200条，如果超过200条，请根据时间条件重新筛选。否则只导出前200条!如果要大量导出数据请联系管理员。'),
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
            exportCustomerLabel(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    用户名: item.customer.name,
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

    handleCreateJob() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        createJobCustomerLabel(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '创建成功',
                message: `创建成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '创建失败',
                message: `创建失败条数：${res.data.false}`,
                type: 'error',
                offset: 140,
                duration: 0
              })
              this.$notify({
                title: '错误详情',
                message: res.data.error,
                type: 'error',
                offset: 210,
                duration: 0
              })
            }
            delete this.params.allSelectTag
            this.fetchData()
          },
          error => {
            console.log('我是全选错误返回')
            this.$notify({
              title: '错误详情',
              message: error.response.data,
              type: 'error',
              offset: 210,
              duration: 0
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
            duration: 0
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        createJobCustomerLabel(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '创建成功',
                message: `创建成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '创建失败',
                message: `创建失败条数：${res.data.false}`,
                type: 'error',
                offset: 140,
                duration: 0
              })
              this.$notify({
                title: '错误详情',
                message: res.data.error,
                type: 'error',
                offset: 210,
                duration: 0
              })
            }
            console.log(this.params)
            console.log(this.params.ids)

            delete this.params.ids
            this.fetchData()
          },
          error => {
            console.log('我是单选错误返回')
            console.log(this)
            console.log(error.response)
            delete this.params.ids
            this.$notify({
              title: '错误详情',
              message: error.response.data,
              type: 'error',
              offset: 210,
              duration: 0
            })
            this.fetchData()
          }
        ).catch(
          (error) => {
            console.log('######')
            console.log(error)
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
    // 查看日志
    logView(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogCustomerLabel(data).then(
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
            duration: 0
          })
        }
      )
    },
    // 标签搜索
    remoteMethodLabel(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getLabel(paramsSearch).then(
            res => {
              this.optionsLabel = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.optionsLabel = []
      }
    },
    resetParams() {
      this.params = {
        page: 1
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
