<template>
  <div class="renovation-submit-container">
    <div class="tableTitle">
      <el-row :gutter="5">
        <el-col :span="24" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">取消</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击选中所有筛选出的订单" placement="top-start">
                <el-button @click="checkAllOption">全选{{ totalNum }}项</el-button>
              </el-tooltip>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出新建界面" placement="top-start">
              <el-button type="primary" @click="add">新增</el-button>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="15" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.verification" class="grid-content bg-purple" placeholder="请输入验证号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
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
        @cell-dblclick="handelDoubleClick"
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
          label="翻新单号"
          prop="code"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="SN码"
          prop="sn"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="验证号"
          prop="verification"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.verification }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品名称"
          prop="goods"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="仓库"
          prop="warehouse"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.warehouse.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="入库号"
          prop="order"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order.name }}</span>
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
    <!--新建添加模态窗-->
    <el-dialog
      title="新增"
      width="100%"
      :visible.sync="dialogVisibleAdd"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="handleFormAdd"
        label-width="88px"
        size="mini"
        :rules="rules"
        :model="formAdd"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>翻新单相关信息</span>
          </div>
          <el-row :gutter="5">
            <el-col :span="24"><el-form-item label="仓库" prop="warehouse">
              <template>
                <el-select
                  v-model="formAdd.warehouse"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选择仓库"
                  :remote-method="remoteMethodWarehouse"
                >
                  <el-option
                    v-for="item in optionsWarehouse"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24"><el-form-item label="货品" prop="goods">
              <template>
                <el-select
                  v-model="formAdd.goods"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选择货品"
                  :remote-method="remoteMethodGoods"
                >
                  <el-option
                    v-for="item in optionsGoods"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24"><el-form-item label="验证号" prop="verification">
              <el-input v-model="formAdd.verification" placeholder="请输入验证号" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24"><el-form-item label="SN" prop="sn">
              <el-input v-model="formAdd.sn" placeholder="请输入SN" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24"><el-form-item label="备注" prop="memo">
              <el-input v-model="formAdd.memo" placeholder="请输入备注" />
            </el-form-item></el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="24"><el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelAdd">取消</el-button>
              </div>
            </el-form-item></el-col>
            <el-col :span="24"><el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="primary" @click="handleSubmitAdd">立即保存</el-button>
              </div>
            </el-form-item></el-col>
          </el-row>
        </el-card>

      </el-form>
    </el-dialog>
    <!--修改信息模态窗-->
    <el-dialog
      title="编辑"
      width="100%"
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
                <span>订单相关信息</span>
              </div>
              <el-row :gutter="5">
                <el-col :span="24"><el-form-item label="关联入库单" prop="order">
                  <template>
                    <el-select
                      v-model="formEdit.order"
                      filterable
                      default-first-option
                      remote
                      reserve-keyword
                      placeholder="请搜索并选择入库单"
                      :remote-method="remoteMethodInbound"
                    >
                      <el-option
                        v-for="item in optionsInbound"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="24"><el-form-item label="货品" prop="goods">
                  <template>
                    <el-select
                      v-model="formEdit.goods"
                      filterable
                      default-first-option
                      remote
                      reserve-keyword
                      placeholder="请搜索并选择货品"
                      :remote-method="remoteMethodGoods"
                    >
                      <el-option
                        v-for="item in optionsGoods"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="24"><el-form-item label="验证号" prop="verification">
                  <el-input v-model="formEdit.verification" placeholder="请输入验证号" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="24"><el-form-item label="SN" prop="sn">
                  <el-input v-model="formEdit.sn" placeholder="请输入SN" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="24"><el-form-item label="备注" prop="memo">
                  <el-input v-model="formEdit.memo" placeholder="请输入备注" />
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="8" :offset="16"><el-form-item size="large">
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
    <!--新建添加模态窗-->
    <el-dialog
      title="翻新配件"
      width="100%"
      :visible.sync="dialogVisibleGoods"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="handleFormAddGoods"
        label-width="88px"
        size="mini"
        :rules="rules"
        :model="formAddGoods"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>工单相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="服务标题" prop="title">
              <span>{{ formAddGoods.title }}</span>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="用户ID" prop="nickname">
              <span>{{ formAddGoods.nickname }}</span>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="诉求" prop="demand">
              <span>{{ formAddGoods.demand }}</span>
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>货品相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="2"><el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddGoods">添加</el-button></el-col>
            <el-col :span="2"><el-button
              type="success"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteDetails"
            >删除</el-button></el-col>
            <el-col :span="2"><el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteAllDetails"
            >清空</el-button></el-col>
            <el-col :span="10" />
            <el-col :span="4" />
            <el-col :span="4" />
          </el-row>
          <el-table
            ref="tableAddGoods"
            border
            :data="RenovationGoods"
            :row-class-name="rowClassName"
            @selection-change="handleDetailSelectionChange"
          >
            <el-table-column type="selection" width="30" align="center" />
            <el-table-column label="序号" align="center" prop="xh" width="50" />
            <el-table-column label="名称" width="250" prop="goods">
              <template slot-scope="scope">
                <el-select
                  v-model="RenovationGoods[scope.row.xh-1].goods"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选择货品"
                  :remote-method="remoteMethodGoods"
                >
                  <el-option
                    v-for="item in optionsGoods"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="货品数量" width="250" prop="quantity">
              <template slot-scope="scope">
                <el-input v-model="RenovationGoods[scope.row.xh-1].quantity" type="number" />
              </template>
            </el-table-column>
            <el-table-column label="含税单价" width="250" prop="price">
              <template slot-scope="scope">
                <el-input v-model="RenovationGoods[scope.row.xh-1].price" type="text" />
              </template>
            </el-table-column>
            <el-table-column label="货品备注" width="250" prop="memorandum">
              <template slot-scope="scope">
                <el-input v-model="RenovationGoods[scope.row.xh-1].memo" type="text" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="16" :offset="8"><el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelAdd">取消</el-button>
                <el-button type="primary" @click="handleSubmitAdd">立即保存</el-button>
              </div>
            </el-form-item></el-col>
          </el-row>
        </el-card>

      </el-form>
    </el-dialog>
    <!--日志查看模态窗-->
    <el-dialog
      title="日志查看"
      :visible.sync="logViewVisible"
      width="80%"
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
  getRenovationSubmit,
  createRenovationSubmit,
  updateRenovationSubmit,
  exportRenovationSubmit,
  excelImportRenovationSubmit,
  checkRenovationSubmit,
  rejectRenovationSubmit
} from '@/api/psi/renovation/order/submit'
import {getLogRenovationManage} from "@/api/psi/renovation/order/manage"
import { getCompanyList } from '@/api/base/company'
import { getInboundDetailValid } from "@/api/psi/inbound/details/valid"
import { getGoodsList } from '@/api/base/goods'
import { getWarehouse } from "@/api/base/warehouse"
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'renovationSubmit',
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
        allSelectTag: 0
      },
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      logViewVisible: false,
      dialogVisibleAddDetail: false,
      dialogVisibleGoods: false,
      logDetails: [],
      optionsWarehouse: [],
      optionsGoods: [],
      optionsInbound: [],
      formAdd: {
        category: 2,
        code: "DTS".concat(new Date().toLocaleDateString().replace(new RegExp('/', 'g'), "-")),
      },
      formEdit: {},
      optionsCategory: [
        {
          value: 1,
          label: '采购入库'
        },
        {
          value: 2,
          label: '调拨入库'
        },
        {
          value: 3,
          label: '退货入库'
        },
        {
          value: 4,
          label: '生产入库'
        },
        {
          value: 5,
          label: '保修入库'
        },
        {
          value: 6,
          label: '其他入库'
        },
        {
          value: 7,
          label: '残品入库'
        },
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
        verification: [
          { required: true, message: '请选择客户网名', trigger: 'blur' }
        ],
      },
      RenovationGoods: [],
      RenovationGoodsEdit: [],
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
      getRenovationSubmit(this.params).then(
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
      this.formEdit = JSON.parse(JSON.stringify({...values}))
      this.dialogVisibleEdit = true

      this.optionsWarehouse = [{ label: this.formEdit.warehouse.name, value: this.formEdit.warehouse.id }]
      this.formEdit.warehouse = this.formEdit.warehouse.id

      this.optionsInbound = [{ label: this.formEdit.order.name, value: this.formEdit.order.id }]
      this.formEdit.order = this.formEdit.order.id

      this.optionsGoods = [{ label: this.formEdit.goods.name, value: this.formEdit.goods.id }]
      this.formEdit.goods = this.formEdit.goods.id
      // const currentShop = JSON.parse(JSON.stringify(this.formEdit.shop))
      // console.log(currentShop)
      // console.log(this.optionsShop)
      // console.log(this.formEdit.shop)
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      const { id, ...data } = this.formEdit
      let attrStr
      const transFieldStr = ['mistake_tag', 'order_status', 'process_tag']
      for (attrStr in transFieldStr) {
        data[transFieldStr[attrStr]] = data[transFieldStr[attrStr]].id
      }
      data.goods_details = this.RenovationGoodsEdit
      console.log(this.formEdit)
      updateRenovationSubmit(id, data).then(
        () => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 0,
            duration: 0
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
    add() {
      this.dialogVisibleAdd = true
      console.log(this.formAdd)
    },
    // 关闭添加界面
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.$refs.handleFormAdd.resetFields()
    },
    // 提交添加
    handleSubmitAdd() {
      console.log(this.formAdd)
      console.log(this.RenovationGoods)
      this.formAdd.goods_details = this.RenovationGoods
      createRenovationSubmit(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch((error) => {
        this.$notify({
          title: '错误详情',
          message: error.data,
          type: 'error',
          offset: 210,
          duration: 0
        })
      })

    },

    // 货品搜索
    remoteMethodGoods(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getGoodsList(paramsSearch).then(
            res => {
              this.optionsGoods = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.optionsGoods = []
      }
    },
    // 入库单搜索
    remoteMethodInbound(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.code = query
          getInboundDetailValid(paramsSearch).then(
            res => {
              this.optionsInbound = res.data.results.map(item => {
                return { label: item.code, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.optionsInbound = []
      }
    },
    // 仓库搜索
    remoteMethodWarehouse(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          console.log(query)
          const paramsSearch = {}
          paramsSearch.name = query
          getWarehouse(paramsSearch).then(
            res => {
              this.optionsWarehouse = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.optionsWarehouse = []
      }
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
    // 导入
    importExcel() {
      const h = this.$createElement
      this.$msgbox({
        title: '导入 Excel',
        name: 'importmsg',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('p', null, '针对不同的模块，需要严格按照模板要求进行，无法导入的情况，请联系系统管理员'),
          h('h4', null, '浏览并选择文件：'),
          h('input', { attrs: {
            name: 'importfile',
            type: 'file'
            }}, null, '导入文件' ),
          h('p', null),
          h('hr', null)
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            const importformData = new FormData()
            importformData.append('file', document.getElementsByName("importfile")[0].files[0])
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            excelImportRenovationSubmit(importformData, config).then(
              res => {
                this.$notify({
                  title: '导入结果',
                  message: res.data,
                  type: 'success',
                  duration: 0
                })
                instance.confirmButtonLoading = false
                document.getElementsByName("importfile")[0].type = 'text'
                document.getElementsByName("importfile")[0].value = ''
                document.getElementsByName("importfile")[0].type = 'file'
                this.fetchData()
                done()
              },
              err => {
                this.$notify({
                  title: '失败原因',
                  message: err.data,
                  type: 'success',
                  duration: 0
                })
                instance.confirmButtonLoading = false
                this.fetchData()
                done()
              }
            )
          } else {
            document.getElementsByName("importfile")[0].type = 'text'
            document.getElementsByName("importfile")[0].value = ''
            document.getElementsByName("importfile")[0].type = 'file'
            this.fetchData()
            done()
          }
        }
      }).then(action => {
        console.log(action)
      }).catch(
        (error) => {
          console.log(error)
        }
      )
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
            exportRenovationSubmit(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    入库单号: item.shop.name,
                    仓库: item.company.name,
                    类别: item.order_id,
                    验证号: item.order_category.name,
                    备注: item.title,
                    体积: item.tax_id,
                    重量: item.phone,
                    单据状态: item.bank,
                    创建时间: item.account,
                    更新时间: item.address,
                    创建者: item.remark,
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
    // 校正
    handleFix() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        fixRenovationSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '校正成功',
                message: `校正成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '校正失败',
                message: `校正失败条数：${res.data.false}`,
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
            message: '未选择订单无法校正',
            type: 'error',
            offset: 70,
            duration: 0
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        fixRenovationSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '校正成功',
                message: `校正成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '校正失败',
                message: `校正失败条数：${res.data.false}`,
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
    // 审核单据
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkRenovationSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核条数：${res.data.successful}`,
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
        checkRenovationSubmit(this.params).then(
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
    // 审核单据
    handleReject() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '取消工单',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '取消工单即为此源单号的开票申请彻底取消！无法再次用此源单号创建开票申请，请慎重选择！'),
          h('hr', null, '')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.tableLoading = true
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            if (this.params.allSelectTag === 1) {
              rejectRenovationSubmit(this.params).then(
                res => {
                  if (res.data.successful !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.successful}`,
                      type: 'success',
                      offset: 70,
                      duration: 0
                    })
                  }
                  if (res.data.false !== 0) {
                    this.$notify({
                      title: '取消失败',
                      message: `取消败条数：${res.data.false}`,
                      type: 'error',
                      offset: 140,
                      duration: 0
                    })
                    this.$notify({
                      title: '失败错误详情',
                      message: res.data.error,
                      type: 'error',
                      offset: 210,
                      duration: 0
                    })
                  }
                  delete this.params.allSelectTag
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                },
                error => {
                  console.log('我是全选错误返回')
                  this.$notify({
                    title: '异常错误详情',
                    message: error.response.data,
                    type: 'error',
                    offset: 210,
                    duration: 0
                  })
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                }
              ).catch(
                () => {
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                }
              )
            } else {
              if (typeof (this.multipleSelection) === 'undefined') {
                this.$notify({
                  title: '错误详情',
                  message: '未选择订单无法取消',
                  type: 'error',
                  offset: 70,
                  duration: 0
                })
                instance.confirmButtonLoading = false
                done()
                this.fetchData()
              }
              const ids = this.multipleSelection.map(item => item.id)
              this.params.ids = ids
              rejectRenovationSubmit(this.params).then(
                res => {
                  if (res.data.successful !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.successful}`,
                      type: 'success',
                      offset: 70,
                      duration: 0
                    })
                  }
                  if (res.data.false !== 0) {
                    this.$notify({
                      title: '取消失败',
                      message: `取消败条数：${res.data.false}`,
                      type: 'error',
                      offset: 140,
                      duration: 0
                    })
                    this.$notify({
                      title: '失败错误详情',
                      message: res.data.error,
                      type: 'error',
                      offset: 210,
                      duration: 0
                    })
                  }
                  delete this.params.allSelectTag
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                },
                error => {
                  console.log('我是全选错误返回')
                  this.$notify({
                    title: '异常错误详情',
                    message: error.response.data,
                    type: 'error',
                    offset: 210,
                    duration: 0
                  })
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                }
              ).catch(
                () => {
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                }
              )
            }
          } else {
            done()
            this.fetchData()
          }
        }
      }).then().catch(
        () => {
          this.fetchData()
        }
      )
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
      getLogRenovationManage(data).then(
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
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'sn') {
        this.handleSN(row)
      }
    },
    handleSN(row) {
      this.$prompt('请输入SN', '添加SN', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.sn,
        inputErrorMessage: '输入不能为空',
        inputValidator: (value) => {
          if(!value) {
            return '输入不能为空';
          }
        }
      }).then(
        ({ value }) => {
          let id = row.id
          let data = {
            sn: value
          }
          updateRenovationSubmit(id, data).then(
            () => {
              this.$notify({
                title: '修改成功',
                type: 'success',
                offset: 70,
                duration: 3000
              })
              this.fetchData()
            }).catch(
            (error) => {
              this.$notify({
                title: '修改失败',
                message: `修改失败：${error.data}`,
                type: 'error',
                offset: 70,
                duration: 0
              })
              this.fetchData()
            }
          )
        }).catch(
        (error) => {
          this.$notify({
            title: '修改失败',
            message: `修改失败：${error.data}`,
            type: 'error',
            offset: 70,
            duration: 0
          })
          this.fetchData()
        })
    },

    // 查看日志
    AddRGoods(row) {
      this.logDetails = []
      this.dialogVisibleGoods = true
      const data = {
        id: row.id
      }
      getLogRenovationManage(data).then(
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
    // 添加界面
    addProgress(row) {
      this.dialogVisibleAddDetail = true
      this.workorder = row
      console.log(this.workorder)
    },
    // 关闭添加界面
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.workorder = ''
      this.$refs.handleFormAdd.resetFields()
      this.$refs.handleFormAddView.resetFields()
    },
    // 创建进程单
    handleSubmitAdd() {
      let id = this.workorder.id
      const data = this.formAdd
      data.order = id
      console.log(this.formAdd)
      createWorkOrderCreate(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch((res) => {
        console.log(res)
        this.$notify({
          title: '错误详情',
          message: res.data,
          type: 'error',
          offset: 70,
          duration: 0
        })
      })
    },
    // 货品列表顺序
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    // 选中新建表单货品项
    handleDetailSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.tableAdd.clearSelection()
        this.$refs.tableAdd.toggleRowSelection(selection.pop())
      } else {
        this.checkedDetail = selection
      }
    },

    // 删除选中表单货品项
    handleDeleteDetails() {
      if (this.checkedDetail.length === 0) {
        this.$alert('请先选择要删除的数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.RenovationGoods.splice(this.checkedDetail[0].xh - 1, 1)
      }
    },

    // 删除全部表单货品项
    handleDeleteAllDetails() {
      this.RenovationGoods = undefined
    },

    // 添加表单货品项
    handleAddGoods() {
      if (this.RenovationGoods === undefined) {
        this.RenovationGoods = []
      }
      const obj = {
        id: 'n'
      }
      this.RenovationGoods.push(obj)
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
  padding: 135px 15px 0px 15px;
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
  margin: 0px 0px 55px 0px;
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
