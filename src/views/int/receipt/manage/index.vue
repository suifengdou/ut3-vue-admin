<template>
  <div class="receipt-execute-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.bank_sn" class="grid-content bg-purple" placeholder="请输入交易流水号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" ></el-button>
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
                  <el-button type="warning" icon="el-icon-s-unfold" circle ></el-button>
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
                      <el-col :span="6"><el-form-item label="回单编号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="付款账户" prop="payment_account">
                        <el-input v-model="params.payment_account" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="付款账户ID" prop="payment_account_id">
                        <el-input v-model="params.payment_account_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="币种" prop="currency">
                        <el-input v-model="params.currency__name" type="text" />
                      </el-form-item></el-col>
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
                          ></el-date-picker>
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
    <!--表格列表-->
    <div class="table-list">
      <el-table
        id="tableBody"
        ref="tableList"
        v-loading="tableLoading"
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
          label="回单编号"
          prop="name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单据状态"
          prop="order_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_status.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误原因"
          prop="mistake_tag"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mistake_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="反馈内容"
          prop="rejection"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.rejection }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="信息说明"
          prop="information"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.information }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否到账"
          prop="is_return"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_received"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="付款账户"
          prop="payment_account"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.payment_account }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="付款账户"
          prop="payment_account"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.payment_account }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="付款账户ID"
          prop="payment_account_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.payment_account_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收款账户"
          prop="account"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.account.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="币种"
          prop="currency"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.currency.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="交易流水号"
          prop="bank_sn"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.bank_sn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类型"
          prop="category"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.category.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="存入金额"
          prop="amount"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="可用金额"
          prop="remaining"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.remaining }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="关联金额"
          prop="associated_amount"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.associated_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="图片查看"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handlePhotoView(scope.row)">查看</el-button>
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
          label="备注"
          prop="memorandum"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.memorandum }}</span>
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
    <!--新建添加模态窗-->
    <el-dialog
      title="关联的采购单"
      width="80%"
      :visible.sync="dialogVisibleEdit"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="handleFormEdit"
        label-width="88px"
        size="mini"
        :model="formEdit"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>收款单相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="回单编号" prop="order_id">
              <span>{{ formEdit.order_id }}</span>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="付款账户" prop="payment_account">
              <span>{{ formEdit.payment_account }}</span>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="付款账户ID" prop="payment_account_id">
              <span>{{ formEdit.payment_account_id }}</span>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="交易流水号" prop="bank_sn">
              <span>{{ formEdit.bank_sn }}</span>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="交易日期" prop="trade_time">
              <span>{{ formEdit.trade_time }}</span>
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>工单相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="存入金额" prop="amount">
              <span>{{ formEdit.amount }}</span>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="可拆金额" prop="remaining">
              <span>{{ formEdit.remaining }}</span>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="币种" prop="currency">
              <template v-if="formEdit.currency != undefined">
                <span>{{ formEdit.currency.name }}</span>
              </template>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="备注" prop="memorandum">
              <span>{{ formEdit.memorandum }}</span>
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>结算单相关信息</span>
          </div>
          <el-table
            ref="tableAdd"
            border
            :data="OrderDetailsList"
            :row-class-name="rowClassName"
          >
            <el-table-column label="序号" align="center" prop="xh" width="50" />
            <el-table-column label="采购单" width="250" prop="ipo">
              <template slot-scope="scope" v-if="OrderDetailsList[scope.row.xh-1].ipo != undefined">
                <span>{{ OrderDetailsList[scope.row.xh-1].ipo.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="实收金额" width="250" prop="actual_amount">
              <template slot-scope="scope">
                <span>{{ OrderDetailsList[scope.row.xh-1].actual_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="销减金额" width="250" prop="virtual_amount">
              <template slot-scope="scope">
                <span>{{ OrderDetailsList[scope.row.xh-1].virtual_amount }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" width="250" prop="memorandum">
              <template slot-scope="scope">
                <span>{{ OrderDetailsList[scope.row.xh-1].memorandum }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="16" :offset="8"><el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelEdit">取消</el-button>
              </div>
            </el-form-item></el-col>
          </el-row>
        </el-card>

      </el-form>
    </el-dialog>
    <!--导入图片模态窗-->
    <el-dialog
      title="导入"
      :visible.sync="importVisible"
      width="33%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="importForm" label-width="10%" :data="importFiles">
        <div>
          <h3>特别注意</h3>
          <p>针对不同的模块，需要严格按照模板要求进行，无法导入的情况，请联系系统管理员</p>
        </div>
        <hr>
        <el-form-item label="文件">
          <input ref="photofiles" type="file" multiple="multiple" @change="getFile($event)">
        </el-form-item>
        <hr>
        <el-row :gutter="30">
          <el-col :span="12" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="importPhotoes">导入文件</el-button>
              <el-button type="error" @click="closeImport">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

    </el-dialog>
    <!--图片查看模态窗-->
    <el-dialog
      title="图片查看"
      :visible.sync="photoViewVisible"
      width="200px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="demo-image__preview">
        <div class="block">
          <p class="demonstration">点击预览图，即可依次查看大图</p>
          <div align="center">
            <el-image
              style="width: 100px; height: 100px;"
              :src="url"
              :preview-src-list="srcList">
            </el-image>
          </div>

        </div>
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
    getReceiptManageList,
    exportReceiptManage,
  } from '@/api/int/receipt/manage'
  import { getCurrencyList } from '@/api/int/account/currency'
  import { getAccountList } from '@/api/int/account/account'
  import { getIntPurchaseOrderCheckList } from '@/api/int/purchase/order/check'
  import { createStatementRelated } from '@/api/int/statement/related'
  import { getCompanyList } from '@/api/base/company'
  import { getGoodsList } from '@/api/base/goods'
  import { getNationalityList } from '@/api/utils/geography/nationality'
  import moment from 'moment'
  import XLSX from 'xlsx'
  export default {
    name: 'receiptManage',
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
        importVisible: false,
        photoViewVisible: false,
        ipo: {},
        formAdd: {},
        formEdit: {},
        photoData: {},
        importFiles: [],
        url: '',
        srcList: [],
        OrderDetailsList: [],
        optionsAccount: [],
        optionsCurrency: [],
        optionsCompany: [],
        optionsIPO: [],
        optionsCity: [],
        optionsDistrict: [],
        checkedDetail: [],
        checkedDetailEdit: []
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      balanceAmount: function () {
        let balance = 0
        if (this.ipo != undefined) {
          balance = this.ipo.amount - this.ipo.virtual_amount
        } else {
          balance = 0
        }
        return balance
      }
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
        getReceiptManageList(this.params).then(
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
        this.OrderDetailsList = []
        let index
        for (index in this.formEdit.statement_details) {
          this.formEdit.statement_details[index].xh = index + 1
          this.OrderDetailsList.push(this.formEdit.statement_details[index])
        }
      },
      // 关闭修改界面
      handleCancelEdit() {
        this.dialogVisibleEdit = false
        this.$refs.handleFormEdit.resetFields()
        this.handleDeleteAllDetails()
      },
      // 图片上传模块
      handlePhotoUpload(userValue) {
        this.photoData.id = userValue.id
        this.importVisible = true

      },
      getFile(event) {
        const filetypes =[".jpg",".png"]
        let filemaxsize = 1024*2
        let fileSize = 0
        for (var i = 0; i < event.target.files.length; i++) {
          let file = event.target.files[i]
          let verify_type = false
          let suffix_name = file.name.substring(file.name.indexOf('.'))
          console.log(suffix_name)
          fileSize = file.size / 1048576
          console.log(fileSize)
          if (fileSize > this.$store.state.user.uploadSize) {
            this.$notify({
              title: '错误详情',
              message: '文件最大4M',
              type: 'error',
              offset: 70,
              duration: 0
            })
            this.$refs.photofiles.type = 'text'
            this.$refs.photofiles.value = ''
            this.$refs.photofiles.type = 'file'
            this.importFiles = []
            return false
          }
          for (let i = 0; i < filetypes.length; i++) {
            if (filetypes[i] == suffix_name) {
              verify_type = true
              break
            }
          }
          if (!verify_type) {
            this.$notify({
              title: '错误详情',
              message: '文件只支持png,jpg',
              type: 'error',
              offset: 70,
              duration: 0
            })
            this.$refs.photofiles.type = 'text'
            this.$refs.photofiles.value = ''
            this.$refs.photofiles.type = 'file'
            this.importFiles = []
            return false
          }
          this.importFiles.push(file)
        }
      },
      importPhotoes() {
        const importformData = new FormData()
        for (let i = 0; i < this.importFiles.length; i++) {
          importformData.append('files', this.importFiles[i])
        }
        importformData.append('id', this.photoData.id)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.tableLoading = true
        photoImportReceiptManage(importformData, config).then(
          res => {
            this.$notify({
              title: '导入结果',
              message: res.data,
              type: 'success',
              duration: 0
            })
            this.fetchData()
            this.closeImport()
          }).catch(
          (error) => {
            console.log('1')
            this.$notify({
              title: '导入错误',
              message: error.data,
              type: 'error',
              duration: 0
            })
          }
        )
      },
      closeImport() {
        this.$refs.photofiles.type = 'text'
        this.$refs.photofiles.value = ''
        this.$refs.photofiles.type = 'file'
        this.importVisible = false
      },
      // 查看图片
      handlePhotoView(userValue) {
        console.log(userValue)
        this.photoViewVisible = true
        this.srcList = userValue.photo_details.map(item => item.name)
        this.url = this.srcList[0]
        console.log(this.srcList)
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
              exportReceiptManage(this.params).then(
                res => {
                  res.data = res.data.map(item => {
                    return {
                      回单编号: item.order_id,
                      付款账户: item.payment_account,
                      付款账户ID: item.payment_account_id,
                      收款账户: item.account.name,
                      币种: item.currency.name,
                      交易流水号: item.bank_sn,
                      类型: item.category.name,
                      交易日期: item.trade_time,
                      存入金额: item.amount,
                      可拆金额: item.remaining,
                      备注: item.memorandum,
                      执行人: item.handler,
                      执行时间: item.handle_time,
                      执行间隔: item.handle_interval,
                      反馈内容: item.feedback,
                      错误原因: item.mistake_tag,
                      状态: item.order_status.name,
                      创建时间: item.create_time,
                      更新时间: item.update_time,
                      创建者: item.creator
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
      // 账户搜索

      remoteMethodAccount(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getAccountList(paramsSearch).then(
              res => {
                this.optionsAccount = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsAccount = []
        }
      },
      remoteMethodCurrency(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getCurrencyList(paramsSearch).then(
              res => {
                this.optionsCurrency = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsCurrency = []
        }
      },
      // 公司搜索
      remoteMethodIPO(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.order_id = query
            getIntPurchaseOrderCheckList(paramsSearch).then(
              res => {

                console.log(this.ipo)
                this.optionsIPO = res.data.results.map(item => {
                  return { label: item.order_id, value: item.id }
                })
                if ( this.optionsIPO.length > 0 ) {
                  this.ipo = res.data.results[0]
                }
              }
            )
          }, 200)
        } else {
          this.optionsIPO = []
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
      // 选中编辑表单货品项
      handleDetailSelectionChangeEdit(selection) {
        if (selection.length > 1) {
          this.$refs.tableEdit.clearSelection()
          this.$refs.tableEdit.toggleRowSelection(selection.pop())
        } else {
          this.checkedDetailEdit = selection
        }
      },
      // 删除选中表单货品项
      handleDeleteDetails() {
        if (this.checkedDetail.length === 0) {
          this.$alert('请先选择要删除的数据', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.OrderDetailsList.splice(this.checkedDetail[0].xh - 1, 1)
        }
      },
      // 删除选中编辑表单货品项
      handleDeleteDetailsEdit() {
        if (this.checkedDetailEdit.length === 0) {
          this.$alert('请先选择要删除的数据', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.oriInvoiceGoodsListEdit.splice(this.checkedDetailEdit[0].xh - 1, 1)
        }
      },
      // 删除全部表单货品项
      handleDeleteAllDetails() {
        this.OrderDetailsList = undefined
      },
      // 删除编辑全部表单货品项
      handleDeleteAllDetailsEdit() {
        this.oriInvoiceGoodsListEdit = undefined
      },
      // 添加表单货品项
      handleAddDetails() {
        if (this.OrderDetailsList === undefined) {
          this.OrderDetailsList = []
        }
        const obj = {
          id: 'n'
        }
        this.OrderDetailsList.push(obj)
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
