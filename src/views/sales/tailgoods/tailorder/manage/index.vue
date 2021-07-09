<template>
  <div class="tailorder-manage-container">
    <div class="tableTitle">
      <el-row :gutter="20">
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
                      <el-col :span="6"><el-form-item label="店铺" prop="shop">
                        <template>
                          <el-select
                            v-model="params.shop"
                            filterable
                            default-first-option
                            remote
                            reserve-keyword
                            placeholder="请搜索并选择店铺"
                            :remote-method="remoteMethodShop"
                          >
                            <el-option
                              v-for="item in optionsShop"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
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
                      <el-col :span="6"><el-form-item label="是否顺丰">
                        <el-select v-model="params.is_deliver" placeholder="是否发顺丰">
                          <el-option
                            v-for="item in optionsIsDeliver"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
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
        @sort-change="onSortChange"
      >
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
          label="店铺"
          prop="shop"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shop.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="尾货订单"
          prop="order_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
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
          label="处理标签"
          prop="order_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_status.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单类型"
          prop="order_category"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_category.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发货模式"
          prop="mode_warehouse"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mode_warehouse.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件人姓名"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_consignee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件人手机"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_smartphone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件城市"
          prop="sent_city"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_city.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件地址"
          prop="sent_address"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="尾货订单总价"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品名称"
          prop="goods_details"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.goods_details">
              <el-button type="warning" size="mini">{{ item.name.name }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="货品总数"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单留言"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
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
                <el-col :span="8"><el-form-item label="店铺" prop="shop">
                  <template>
                    <span>{{ formEdit.shop }}</span>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="源单号" prop="order_id">
                  <span>{{ formEdit.order_id }}</span>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="发货模式" prop="mode_warehouse">
                  <span>{{ formEdit.mode_warehouse }}</span>
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>发货信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收件人" prop="sent_consignee">
                  <span>{{ formEdit.sent_consignee }}</span>
                </el-form-item></el-col>
                <el-col :span="16"><el-form-item label="手机" prop="sent_smartphone">
                  <span>{{ formEdit.sent_smartphone }}</span>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收件城市" prop="sent_city">
                  <template>
                    <span> {{ formEdit.sent_city }}</span>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="收件区县" prop="sent_district">
                  <span> {{ formEdit.sent_district }}</span>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="收件地址" prop="sent_address">
                  <span> {{ formEdit.sent_address }}</span>
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="订单留言" prop="message">
                  <span> {{ formEdit.message }}</span>
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>货品相关信息</span>
              </div>
              <el-table
                ref="tableEdit"
                border
                :data="dataDetailsEdit"
                :row-class-name="rowClassName"
              >
                <el-table-column label="序号" align="center" prop="xh" width="50">
                  <template slot-scope="scope">
                    <span>{{ dataDetailsEdit[scope.row.xh-1].xh }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="名称" width="250" prop="goods_name">
                  <template slot-scope="scope">
                    <span>{{ dataDetailsEdit[scope.row.xh-1].name.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="货品数量" width="250" prop="quantity">
                  <template slot-scope="scope">
                    <span>{{ dataDetailsEdit[scope.row.xh-1].quantity }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="结算单价" width="250" prop="settlement_price">
                  <template slot-scope="scope">
                    <span>{{ dataDetailsEdit[scope.row.xh-1].settlement_price }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="货品备注" width="250" prop="memorandum">
                  <template slot-scope="scope">
                    <span>{{ dataDetailsEdit[scope.row.xh-1].memorandum }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="8" :offset="16"><el-form-item size="large">
                  <div class="btn-warpper">
                    <el-button type="danger" @click="handleCancelEdit">取消</el-button>
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
  getTailOrderList,
  exportTailOrder
} from '@/api/sales/tailgoods/tailorder'
import { getShopList } from '@/api/base/shop'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
import { getCityList } from '@/api/utils/geography'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'TailOrderManage',
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
      InvoiceIDVisible: false,
      formEdit: {
        type: Object,
        default() {
          return {
            id: '',
            shop: '',
            company: '',
            order_id: '',
            order_category: '',
            title: '',
            tax_id: '',
            phone: '',
            bank: '',
            account: '',
            address: '',
            remark: '',
            sent_consignee: '',
            sent_smartphone: '',
            sent_city: '',
            sent_district: '',
            sent_address: '',
            amount: '',
            is_deliver: '',
            submit_time: '',
            handle_time: '',
            handle_interval: '',
            message: '',
            memorandum: '',
            sign_company: '',
            sign_department: '',
            nickname: '',
            create_time: '',
            update_time: '',
            is_delete: false,
            creator: '',
            process_tag: '',
            mistake_tag: '',
            order_status: ''
          }
        }
      },
      invoiceIDData: {
        type: Object,
        default() {
          return {
            id: '',
            memorandum: ''
          }
        }
      },
      optionsShop: [],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      optionsCity: [],
      optionsGoods: [],
      optionsCategory: [
        {
          value: 1,
          label: '专票'
        },
        {
          value: 2,
          label: '普票'
        }
      ],
      optionsIsDeliver: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      dataDetailsEdit: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.params)
      this.tableLoading = true
      // console.log(this.params.create_time)
      if (typeof (this.params.create_time) !== 'undefined') {
        if (this.params.create_time.length === 2) {
          this.params.create_time_after = moment.parseZone(this.params.create_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.create_time_before = moment.parseZone(this.params.create_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getTailOrderList(this.params).then(
        res => {
          this.DataList = res.data.results
          this.totalNum = res.data.count
          this.tableLoading = false
          console.log(this.DataList)
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
      this.formEdit.shop = this.formEdit.shop.name
      this.formEdit.mode_warehouse = this.formEdit.mode_warehouse.name
      this.formEdit.sent_city = this.formEdit.sent_city.name
      if (this.formEdit.goods_details != undefined) {
        this.optionsGoods = this.formEdit.goods_details.map(item => {
          return { label: item.name.name, value: item.name.id }
        })
        this.dataDetailsEdit = []
        let goods
        for (goods in this.formEdit.goods_details) {
          this.formEdit.goods_details[goods].xh = goods + 1
          this.formEdit.goods_details[goods].goods_name = this.formEdit.goods_details[goods].name.name
          this.dataDetailsEdit.push(this.formEdit.goods_details[goods])
        }
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
            exportTailOrder(this.params).then(
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
    remoteMethodShop(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getShopList(paramsSearch).then(
            res => {
              this.optionsShop = res.data.results.map(item => {
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
          paramsSearch.category = 5
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
    // 城市搜索
    remoteMethodCity(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.city = query
          getCityList(paramsSearch).then(
            res => {
              this.optionsCity = res.data.results.map(item => {
                return { label: item.city, value: item.id }
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
    // 货品列表顺序
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
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
