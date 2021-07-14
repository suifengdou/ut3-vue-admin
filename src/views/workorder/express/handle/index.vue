<template>
  <div class="ori-invoice-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetLossing">设置丢失</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-off" size="mini" round @click="handleSetRecover">设置重置</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核工单</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">取消工单</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击选中所有筛选出的订单" placement="top-start">
                <el-button @click="checkAllOption">全选{{ totalNum }}项</el-button>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.title" class="grid-content bg-purple" placeholder="请输入完整发票抬头" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出导出界面" placement="top-start">
              <el-button type="success" @click="open">导出</el-button>
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
                      <el-col :span="6"><el-form-item label="开票公司" prop="company">
                        <template>
                          <el-select
                            v-model="params.company"
                            filterable
                            default-first-option
                            remote
                            reserve-keyword
                            placeholder="请搜索并选择公司"
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
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="发票类型" prop="order_category">
                        <el-select v-model="params.order_category" placeholder="请选择发票类型">
                          <el-option
                            v-for="item in optionsCategory"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="源单号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="客户昵称" prop="nickname">
                        <el-input v-model="params.nickname" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="发票抬头" prop="title">
                        <el-input v-model="params.title" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="税号" prop="tax_id">
                        <el-input v-model="params.tax_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8"><el-form-item label="收件人" prop="sent_consignee">
                        <el-input v-model="params.sent_consignee" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="8"><el-form-item label="收件手机" prop="sent_smartphone">
                        <el-input v-model="params.sent_smartphone" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="4" />
                      <el-col :span="4" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>

                    <el-row :gutter="20">
                      <el-col :span="12"><el-form-item label="创建时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.create_time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                        </div>
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
            <el-tooltip class="item" effect="dark" content="点击绿色按钮进入编辑" placement="top-start">
              <el-button class="page-button" type="success" size="mini" @click="handleEdit(scope.row)"><span>{{ scope.row.id }}</span></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="事项类型"
          prop="category"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.category.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="快递公司"
          prop="company"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.company.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="快递单号"
          prop="express_id"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.track_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="初始问题信息"
          prop="information"

        >
          <template slot-scope="scope">
            <span>{{ scope.row.information }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="工单反馈"
          prop="feedback"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.feedback }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="逆向结单备注"
          prop="memo"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.memo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="返回单号"
          prop="return_express_id"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_express_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理标签"
          prop="process_tag"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.process_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否丢件"
          prop="is_losing"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_losing"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleEditBoolean(scope.row)"
            />
          </template>

        </el-table-column>
        <el-table-column
          label="是否返回"
          prop="is_return"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_return"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleEditBoolean(scope.row)"
            />
          </template>

        </el-table-column>

        <el-table-column
          label="工单类型"
          prop="wo_category"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.wo_category.name }}</span>
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

      </el-table>
    </div>
    <!--修改信息模态窗-->
    <el-dialog
      title="编辑"
      width="80%"
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
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>工单相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="工单类型" prop="order_category">
                  <el-select v-model="formEdit.order_category" placeholder="请选择发票类型">
                    <el-option
                      v-for="item in optionsCategory"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="快递公司" prop="company">
                  <template>
                    <el-select
                      v-model="formEdit.company"
                      filterable
                      default-first-option
                      remote
                      reserve-keyword
                      placeholder="请选择公司"
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
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="快递单号" prop="track_id">
                  <el-input v-model="formEdit.track_id" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="初始问题描述信息" prop="information">
                  <el-input type="textarea" v-model="formEdit.information" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="是否返回" prop="is_return">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="formEdit.is_return"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </template>
                </el-form-item></el-col>
                <el-col :span="16"><el-form-item label="是否丢件" prop="is_losing">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="formEdit.is_losing"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </template>
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="工单留言" prop="memo">
                  <el-input v-model="formEdit.memo" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
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
  getWorkOrderHandle,
  updateWorkOrderHandle,
  exportWorkOrderHandle,
  checkWorkOrderHandle,
  rejectWorkOrderHandle,
  setLossingWorkOrderHandle,
  recoverWorkOrderHandle
} from '@/api/wop/express/handle'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
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
      tableData: {
      },
      params: {
        page: 1,
        allSelectTag: 0
      },
      dialogVisibleEdit: false,
      formEdit: {},
      optionsShop: [],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      optionsCity: [],
      optionsGoods: [],
      optionsCategory: [
        { value: 0, label: '截单退回' },
        { value: 1, label: '无人收货' },
        { value: 2, label: '客户拒签' },
        { value: 3, label: '修改地址' },
        { value: 4, label: '催件派送' },
        { value: 5, label: '虚假签收' },
        { value: 6, label: '丢件破损' },
        { value: 7, label: '其他异常' }
      ],
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
      // console.log(this.params.create_time)
      if (typeof (this.params.create_time) !== 'undefined') {
        if (this.params.create_time.length === 2) {
          this.params.create_time_after = moment.parseZone(this.params.create_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.create_time_before = moment.parseZone(this.params.create_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getWorkOrderHandle(this.params).then(
        res => {
          this.DataList = res.data.results
          this.totalNum = res.data.count
          this.tableLoading = false
          console.log(res.data.results)
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
    handleEdit(values) {
      console.log(values)
      this.formEdit = { ...values }
      this.dialogVisibleEdit = true

      this.optionsShop = [{ label: this.formEdit.shop.name, value: this.formEdit.shop.id }]
      this.formEdit.shop = this.formEdit.shop.id

      this.optionsCompany = [{ label: this.formEdit.company.name, value: this.formEdit.company.id }]
      this.formEdit.company = this.formEdit.company.id

      this.optionsCity = [{ label: this.formEdit.sent_city.name, value: this.formEdit.sent_city.id }]
      this.formEdit.sent_city = this.formEdit.sent_city.id

      this.optionsGoods = this.formEdit.goods_details.map(item => {
        return { label: item.name.name, value: item.name.id }
      })
      console.log(this.optionsGoods)
      this.formEdit.order_category = this.formEdit.order_category.id
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      this.$refs.handleFormEdit.validate(valid => {
        if (!valid) {
          return
        }
        const { id, ...data } = this.formEdit
        let attrStr
        console.log(data)
        const transFieldStr = ['mistake_tag', 'process_tag', 'sign_company', 'sign_department', 'order_category', 'order_status']
        for (attrStr in transFieldStr) {
          data[transFieldStr[attrStr]] = data[transFieldStr[attrStr]].id
        }
        console.log(data)
        updateWorkOrderHandle(id, data).then(
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
            exportWorkOrderHandle(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    店铺: item.shop.name,
                    收款开票公司: item.company.name,
                    源单号: item.order_id,
                    发票类型: item.order_category.name,
                    发票抬头: item.title,
                    纳税人识别号: item.tax_id,
                    联系电话: item.phone,
                    银行名称: item.bank,
                    银行账号: item.account,
                    地址: item.address,
                    发票备注: item.remark,
                    收件人姓名: item.sent_consignee,
                    收件人手机: item.sent_smartphone,
                    收件城市: item.sent_city.city,
                    收件区县: item.sent_district,
                    收件地址: item.sent_address,
                    申请税前开票总额: item.amount,
                    是否发顺丰: item.is_deliver,
                    申请提交时间: item.submit_time,
                    开票处理时间: item.handle_time,
                    开票处理间隔: item.handle_interval,
                    工单留言: item.message,
                    工单反馈: item.memorandum,
                    创建公司: item.sign_company.name,
                    创建部门: item.sign_department.name,
                    客户昵称: item.nickname,
                    创建时间: item.create_time,
                    更新时间: item.update_time,
                    创建者: item.creator,
                    处理标签: item.process_tag.name,
                    错误原因: item.mistake_tag.name
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
      if (this.selectNum !== this.totalNum || this.multipleSelection.length < 2) {
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
    handleSetLossing() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setLossingWorkOrderHandle(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
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
              message: error.data,
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
        setLossingWorkOrderHandle(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
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
              message: error.data,
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
    handleSetRecover() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        recoverWorkOrderHandle(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
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
              message: error.data,
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
        recoverWorkOrderHandle(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
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
              message: error.data,
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
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkWorkOrderHandle(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
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
              message: error.data,
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
        checkWorkOrderHandle(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '审核失败',
                message: `审核失败条数：${res.data.false}`,
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
              message: error.data,
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
              rejectWorkOrderHandle(this.params).then(
                res => {
                  if (res.data.success !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.success}`,
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
                    message: error.data,
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
              rejectWorkOrderHandle(this.params).then(
                res => {
                  if (res.data.success !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.success}`,
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
                    message: error.data,
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
        this.options = []
      }
    },
    // 公司搜索
    remoteMethodCompany(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          paramsSearch.category = 1
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

    // 编辑丢件返回信息
    handleEditBoolean(row) {
      let id = row.id
      const data = {
        is_return: row.is_return,
        is_losing: row.is_losing
      }
      updateWorkOrderHandle(id, data).then(
        () => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 70,
            duration: 0
          })
          this.dialogVisibleEdit = false
          this.fetchData()
        },
        err => {
          this.$notify({
            title: '修改失败',
            message: `修改失败：${err.data}`,
            type: 'success',
            offset: 70,
            duration: 0
          })
        }
      )
    },
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'feedback') {
        this.handleFeedback(row)
      } else if (column.property === 'return_express_id') {
        this.handleReturnTrack(row)
      }
    },
    handleFeedback(row) {
      this.$prompt('请输入反馈内容', '添加反馈', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.feedback,
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
            feedback: value
          }
          updateWorkOrderHandle(id, data).then(
            () => {
              this.$notify({
                title: '修改成功',
                type: 'success',
                offset: 70,
                duration: 0
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
    },
    handleReturnTrack(row) {
      this.$prompt('请输入返回单号', '添加单号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.return_express_id,
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
            return_express_id: value
          }
          updateWorkOrderHandle(id, data).then(
            () => {
              this.$notify({
                title: '修改成功',
                type: 'success',
                offset: 70,
                duration: 0
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
    },

    resetParams() {
      this.params = {
        page: 1
      }
    },
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.process_tag.id === 8) {
        row_style = {
          backgroundColor: 'lightpink'
        }
      } else if (row.process_tag.id === 4) {
        row_style = {
          backgroundColor: 'palegreen'
        }
      }
      return row_style
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
