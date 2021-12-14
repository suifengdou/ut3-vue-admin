<template>
  <div class="intpurchaseorder-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">驳回</el-button></el-dropdown-item>
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
              <el-input v-model="params.order_id" class="grid-content bg-purple" placeholder="请输入PI单号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <!--<el-tooltip class="item" effect="dark" content="点击弹出导入界面" placement="top-start">-->
              <!--<el-button type="success" @click="handleImport">导入</el-button>-->
            <!--</el-tooltip>-->
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
                      <el-col :span="6"><el-form-item label="经销商" prop="distributor">
                        <template>
                          <el-select
                            v-model="params.distributor"
                            filterable
                            default-first-option
                            remote
                            reserve-keyword
                            placeholder="请搜索并选择店铺"
                            :remote-method="remoteMethodDistributor"
                          >
                            <el-option
                              v-for="item in optionsDistributor"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="币种" prop="currency">
                        <template>
                          <el-select
                            v-model="params.currency"
                            filterable
                            default-first-option
                            remote
                            reserve-keyword
                            placeholder="请搜索并选择币种"
                            :remote-method="remoteMethodCurrency"
                          >
                            <el-option
                              v-for="item in optionsCurrency"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="类型" prop="order_category">
                        <el-select v-model="params.order_category" clearable placeholder="请选择类型">
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
                      <el-col :span="6"><el-form-item label="贸易方式" prop="trade_mode">
                        <el-select v-model="params.trade_mode" clearable placeholder="请选择贸易方式">
                          <el-option
                            v-for="item in optionsMode"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="PI单号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="合同编号" prop="contract_id">
                        <el-input v-model="params.contract_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
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
          label="PI单号"
          prop="order_id"
          width="120px"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="经销商"
          prop="distributor"
          width="120px"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.distributor.name }}</span>
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
          label="类型"
          prop="order_category"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_category.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标记"
          prop="sign"
          width="169px"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.sign.id"  @change="selectSign(scope.row)">
              <el-option
                v-for="item in optionsSign"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="收款账户"
          prop="account"
          width="120px"
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
          label="贸易方式"
          prop="trade_mode"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.trade_mode.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="采购单总金额"
          prop="amount"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="实收总金额"
          prop="actual_amount"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.actual_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="定金"
          prop="deposit"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.deposit }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="销减总金额"
          prop="actual_deposit"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.virtual_amount }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="货品"
          prop="goods_detail"
          width="160px"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.goods_details">
              <el-tag type="success" size="mini" effect="dark"><span>{{ item.goods_name.name }}*{{ item.quantity }}</span></el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="合同编号"
          width="120px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.contract_id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="收款状态"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.collection_status.name }}</span>
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
                <span>订单相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="PI单号" prop="order_id">
                  <span>{{ formEdit.order_id }}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="经销商" prop="distributor">
                  <template v-if="formEdit.distributor != undefined">
                    <span>{{ formEdit.distributor.name }}</span>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="单据类型" prop="order_category">
                  <template v-if="formEdit.order_category != undefined">
                    <span>{{ formEdit.order_category.name }}</span>
                  </template>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="合同编号" prop="contract_id">
                  <span>{{ formEdit.contract_id }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="收款账户" prop="account">
                  <template v-if="formEdit.account != undefined">
                    <span>{{ formEdit.account.name }}</span>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="币种" prop="currency">
                  <template v-if="formEdit.currency != undefined">
                    <span>{{ formEdit.currency.name }}</span>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="总金额" prop="amount">
                  <span>{{ formEdit.amount }}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="实收总额" prop="actual_amount">
                  <span>{{ formEdit.actual_amount }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="销减总额" prop="virtual_amount">
                  <span>{{ formEdit.virtual_amount }}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="贸易方式" prop="trade_mode">
                  <template v-if="formEdit.trade_mode != undefined">
                    <span>{{ formEdit.trade_mode.name }}</span>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="定金" prop="deposit">
                  <span>{{ formEdit.deposit }}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="地址" prop="address">
                  <span>{{ formEdit.address }}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="备注" prop="memo">
                  <span>{{ formEdit.memo }}</span>
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>货品相关信息</span>
              </div>
              <el-table
                ref="tableEdit"
                border
                :data="OrderDetailsList"
                :row-class-name="rowClassName"
              >
                <el-table-column label="序号" align="center" prop="xh" width="50">
                  <template slot-scope="scope">
                    <span>{{ OrderDetailsList[scope.row.xh-1].xh }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="名称" width="250" prop="goods_name">

                  <template slot-scope="scope">
                    <span>{{ OrderDetailsList[scope.row.xh-1].goods_name.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="货品数量" width="250" prop="quantity">
                  <template slot-scope="scope">
                    <span>{{ OrderDetailsList[scope.row.xh-1].quantity }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="含税单价" width="250" prop="price">
                  <template slot-scope="scope">
                    <span>{{ OrderDetailsList[scope.row.xh-1].price }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="货品备注" width="250" prop="memorandum">
                  <template slot-scope="scope">
                    <span>{{ OrderDetailsList[scope.row.xh-1].memorandum }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="8" :offset="16"><el-form-item size="large">
                  <div class="btn-warpper">
                    <el-button type="danger" @click="handleCancelEdit">取消查看</el-button>
                  </div>
                </el-form-item></el-col>
              </el-row>
            </el-card>
          </el-form>
        </div>
      </template>
    </el-dialog>


    <!--导入模态窗-->
    <el-dialog
      title="导入"
      :visible.sync="importVisible"
      width="33%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="importForm" label-width="10%" :data="importFile">
        <div>
          <h3>特别注意</h3>
          <p>针对不同的模块，需要严格按照模板要求进行，无法导入的情况，请联系系统管理员</p>
        </div>
        <hr>
        <el-form-item label="文件">
          <input ref="files" type="file" @change="getFile($event)">
        </el-form-item>
        <hr>
        <el-row :gutter="30">
          <el-col :span="12" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="importExcel">导入文件</el-button>
              <el-button type="error" @click="closeImport">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

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
    getIntPurchaseOrderCheckList,
    updateIntPurchaseOrderCheck,
    exportIntPurchaseOrderCheck,
    excelImportIntPurchaseOrderCheck,
    checkIntPurchaseOrderCheck,
    rejectIntPurchaseOrderCheck,
  } from '@/api/int/purchase/order/check'
  import { getMyDistributorList } from '@/api/int/distributor/distributor/mydistributor'
  import { getAccountList } from '@/api/int/account/account'
  import { getCurrencyList } from '@/api/int/account/currency'
  import { getGoodsList } from '@/api/base/goods'
  import { getProvinceList } from '@/api/utils/geography/province'
  import { getCityList } from '@/api/utils/geography/city'
  import { getDistrictList } from '@/api/utils/geography/district'
  import moment from 'moment'
  import XLSX from 'xlsx'
  export default {
    name: 'IntPurchaseOrderCheck',
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
        importVisible: false,
        formEdit: {},
        importFile: {},
        optionsDistributor: [],
        optionsDepartment: [],
        optionsAccount: [],
        optionsCurrency: [],
        optionsProvince: [],
        optionsCity: [],
        optionsDistrict: [],
        optionsGoods: [],
        optionsCategory: [
          {
            value: 1,
            label: '样机'
          },
          {
            value: 2,
            label: '订单'
          },
        ],
        optionsMode: [
          {
            value: 1,
            label: 'FOB'
          },
          {
            value: 2,
            label: 'CIF'
          },
          {
            value: 3,
            label: 'EXW'
          },
          {
            value: 4,
            label: 'DDP'
          }
        ],
        optionsSign: [
          {
            value: 0,
            label: '无'
          },
          {
            value: 1,
            label: '未付定金未排产'
          },
          {
            value: 2,
            label: '未付定金已排产'
          },
          {
            value: 3,
            label: '未付定金未发货'
          },
          {
            value: 4,
            label: '未付定金已发货'
          },
          {
            value: 5,
            label: '已付定金未排产'
          },
          {
            value: 6,
            label: '已付定金已排产'
          },
          {
            value: 7,
            label: '已付定金未发货'
          },
          {
            value: 8,
            label: '已付定金已发货'
          },
          {
            value: 9,
            label: '未付尾款未发货'
          },
          {
            value: 10,
            label: '未付尾款已发货'
          },
          {
            value: 11,
            label: '已付尾款未发货'
          },
          {
            value: 12,
            label: '已付尾款已发货'
          },
        ],
        OrderDetailsList: [],
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
        getIntPurchaseOrderCheckList(this.params).then(
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
        let goods_index
        for (goods_index in this.formEdit.goods_details) {
          this.formEdit.goods_details[goods_index].xh = goods_index + 1
          this.OrderDetailsList.push(this.formEdit.goods_details[goods_index])
          console.log(this.OrderDetailsList)
        }
      },
      // 关闭修改界面
      handleCancelEdit() {
        this.dialogVisibleEdit = false
        this.$refs.handleFormEdit.resetFields()
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
      getFile(event) {
        this.importFile.file = event.target.files[0]
      },
      importExcel() {
        const importformData = new FormData()
        importformData.append('file', this.importFile.file)
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        excelImportIntPurchaseOrderCheck(importformData, config).then(
          res => {
            this.$notify({
              title: '导入结果',
              message: res.data,
              type: 'success',
              duration: 3000
            })
          },
          error => {
            this.$notify({
              title: '导入错误',
              message: error,
              type: 'error',
              duration: 0
            })
          }
        ).catch(
          () => {
            this.$notify({
              title: '错误详情',
              message: error.response.data,
              type: 'error',
              offset: 210,
              duration: 0
            })
          }
        )
        this.importVisible = false
        this.$refs.files.type = 'text'
        this.$refs.files.value = ''
        this.$refs.files.type = 'file'
        this.fetchData()
      },
      closeImport() {
        this.importVisible = false
      },
      handleImport() {
        this.importVisible = true
      },
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
              exportIntPurchaseOrderCheck(this.params).then(
                res => {
                  res.data = res.data.map(item => {
                    return {
                      PI单号: item.order_id,
                      经销商: item.distributor.name,
                      类型: item.order_category.name,
                      合同编号: item.contract_id,
                      收款账户: item.account.name,
                      币种: item.currency.name,
                      贸易方式: item.trade_mode.name,
                      采购单总金额: item.amount,
                      实收总金额: item.actual_amount,
                      销减总金额: item.virtual_amount,
                      定金: item.deposit,
                      货品总数: item.quantity,
                      货品: JSON.stringify(item.goods_details),
                      地址: item.address,
                      备注: item.memo,
                      标记: item.sign.name,
                      单据状态: item.order_status.name,
                      收款状态: item.collection_status.name,
                      错误标签: item.mistake_tag.name,
                      处理标签: item.process_tag.name,
                      创建时间: item.create_time,
                      更新时间: item.update_time,
                      创建者: item.creator,
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
      // 提交编辑完成的数据
      selectSign(row) {
        console.log(row)
        const { id, ...details } = row
        const data = {
          sign: details.sign.id
        }
        console.log(data, id)
        updateIntPurchaseOrderCheck(id, data).then(
          () => {
            this.$notify({
              title: '修改成功',
              type: 'success',
              offset: 0,
              duration: 3000
            })
            this.fetchData()
          }).catch(
          (error) => {
            this.$notify({
              title: '修改出错',
              message: error.data,
              type: 'error',
              offset: 0,
              duration: 0
            })
            this.fetchData()
          }
        )

      },
      // 审核单据
      handleCheck() {
        this.tableLoading = true
        if (this.params.allSelectTag === 1) {
          checkIntPurchaseOrderCheck(this.params).then(
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
          checkIntPurchaseOrderCheck(this.params).then(
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
      handleReject() {
        const h = this.$createElement
        let resultMessage, resultType
        this.$msgbox({
          title: '驳回工单',
          message: h('p', null, [
            h('h3', { style: 'color: teal' }, '特别注意：'),
            h('hr', null, ''),
            h('span', null, '驳回单据到创建界面！'),
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
                rejectIntPurchaseOrderCheck(this.params).then(
                  res => {
                    if (res.data.successful !== 0) {
                      this.$notify({
                        title: '驳回成功',
                        message: `驳回成功条数：${res.data.successful}`,
                        type: 'success',
                        offset: 70,
                        duration: 3000
                      })
                    }
                    if (res.data.false !== 0) {
                      this.$notify({
                        title: '驳回失败',
                        message: `驳回败条数：${res.data.false}`,
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
                    message: '未选择订单无法驳回',
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
                rejectIntPurchaseOrderCheck(this.params).then(
                  res => {
                    if (res.data.successful !== 0) {
                      this.$notify({
                        title: '驳回成功',
                        message: `驳回成功条数：${res.data.successful}`,
                        type: 'success',
                        offset: 70,
                        duration: 3000
                      })
                    }
                    if (res.data.false !== 0) {
                      this.$notify({
                        title: '驳回失败',
                        message: `驳回败条数：${res.data.false}`,
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
      // 店铺搜索
      remoteMethodDistributor(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getMyDistributorList
            (paramsSearch).then(
              res => {
                this.optionsDistributor = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsDistributor = []
        }
      },
      // 公司搜索
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
      // 城市搜索
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
      remoteMethodCity(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getCityList(paramsSearch).then(
              res => {
                this.optionsCity = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsCity = []
        }
      },
      remoteMethodDistrict(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getCityList(paramsSearch).then(
              res => {
                this.optionsDistrict = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsDistrict = []
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

      rowStyle({ row, rowIndex}) {
        let row_style = {}
        if (row.sign.id === 1) {
          row_style = {
            backgroundColor: '#bbc8e6'
          }
        } else if (row.sign.id === 2) {
          row_style = {
            backgroundColor: '#ffec47'
          }
        } else if (row.sign.id === 3) {
          row_style = {
            backgroundColor: '#e9bb1d'
          }
        } else if (row.sign.id === 4) {
          row_style = {
            backgroundColor: '#f05654'
          }
        } else if (row.sign.id === 5) {
          row_style = {
            backgroundColor: '#e17b34'
          }
        } else if (row.sign.id === 6) {
          row_style = {
            backgroundColor: '#bbc8e6'
          }
        } else if (row.sign.id === 7) {
          row_style = {
            backgroundColor: '#ef7a82'
          }
        } else if (row.sign.id === 8) {
          row_style = {
            backgroundColor: '#f05654'
          }
        } else if (row.sign.id === 9) {
          row_style = {
            backgroundColor: '#bbc8e6'
          }
        } else if (row.sign.id === 10) {
          row_style = {
            backgroundColor: '#f05654'
          }
        } else if (row.sign.id === 11) {
          row_style = {
            backgroundColor: '#e17b34'
          }
        } else if (row.sign.id === 12) {
          row_style = {
            backgroundColor: '#40de5a'
          }
        }
        return row_style
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
