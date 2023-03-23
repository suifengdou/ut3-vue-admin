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
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核工单</el-button></el-dropdown-item>
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
            <el-tooltip class="item" effect="dark" content="点击弹出导入界面" placement="top-start">
              <el-button type="success" @click="handleImport">导入</el-button>
            </el-tooltip>
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
                      <el-col :span="6"><el-form-item label="来源单号" prop="work_order">
                        <el-input v-model="params.work_order" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="开票单号" prop="order_id">
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
                        <el-input v-model="params.consignee" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="8"><el-form-item label="收件手机" prop="sent_smartphone">
                        <el-input v-model="params.smartphone" type="text" />
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
                            v-model="params.created_time"
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
                    <el-row :gutter="20">
                      <el-col :span="12"><el-form-item label="更新时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.update_time"
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
        @selection-change="handleSelectionChange"
        @cell-dblclick="fillInvoiceID"
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
          label="快递公司"
          prop="logistics"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.logistics }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="快递单号"
          prop="track_no"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.track_no }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺"
          prop="shop"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shop }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原始单号"
          prop="ori_order_id"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ori_order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="网名"
          prop="nickname"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件人"
          prop="consignee"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.consignee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机"
          prop="smartphone"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.smartphone }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="发货条件"
          prop="condition_deliver"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.condition_deliver }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="优惠金额"
          prop="discounts"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.discounts }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮费"
          prop="postage"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.postage }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="货品价格"
          prop="goods_price"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品总价"
          prop="goods_amount"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="应收合计"
          prop="receivable"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.receivable }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商家编码"
          prop="goods_id"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_id }}</span>
          </template>

        </el-table-column>

        <el-table-column
          label="货品名称"
          prop="goods_name"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="货品数量"
          prop="quantity"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单类别"
          prop="order_category"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_category }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客服备注"
          prop="message"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="买家备注"
          prop="remark"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="省"
          prop="province"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.province }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="市"
          prop="city"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="区"
          prop="district"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.district }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建人"
          prop="creator"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.creator }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="created_time"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.created_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="update_time"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!--修改信息模态窗-->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisibleEdit"
      width="80%"
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
                <span>开票订单相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="店铺" prop="shop">
                  <span> {{ formEdit.shop }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="源单号" prop="order_id">
                  <span> {{ formEdit.order_id }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="客户昵称" prop="nickname">
                  <span>{{ formEdit.nickname }}</span>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收款公司" prop="company">
                  <span> {{ formEdit.company }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="发票类型" prop="order_category">
                  <span>{{ formEdit.order_category }}</span>
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>客户公司信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="发票抬头" prop="title">
                  <span>{{ formEdit.title }}</span>
                </el-form-item></el-col>
                <el-col :span="16"><el-form-item label="税号" prop="tax_id">
                  <span>{{ formEdit.tax_id }}</span>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="银行名称" prop="bank">
                  <span>{{ formEdit.bank }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="银行账号" prop="account">
                  <span>{{ formEdit.account }}</span>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="联系电话" prop="phone">
                  <span>{{ formEdit.phone }}</span>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="地址" prop="address">
                  <span>{{ formEdit.address }}</span>
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="发票备注" prop="remark">
                  <span>{{ formEdit.remark }}</span>
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="工单留言" prop="message">
                  <span>{{ formEdit.message }}</span>
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="发票单号">
                    <el-button type="primary" @click="handleFillID">填单号</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>开票货品相关信息</span>
              </div>
              <el-table
                ref="tableEdit"
                border
                :data="oriInvoiceGoodsListEdit"
                :row-class-name="rowClassName"
              >
                <el-table-column label="序号" align="center" prop="xh" width="50">
                  <template slot-scope="scope"><span>{{ oriInvoiceGoodsListEdit[scope.row.xh-1].xh }}</span></template>
                </el-table-column>
                <el-table-column label="名称" align="center" prop="goods_name">
                  <template slot-scope="scope"><span>{{ oriInvoiceGoodsListEdit[scope.row.xh-1].name }}</span></template>
                </el-table-column>
                <el-table-column label="货品数量" align="center" prop="quantity">
                  <template slot-scope="scope"><span>{{ oriInvoiceGoodsListEdit[scope.row.xh-1].quantity }}</span></template>
                </el-table-column>
                <el-table-column label="含税单价" align="center" prop="price">
                  <template slot-scope="scope"><span>{{ oriInvoiceGoodsListEdit[scope.row.xh-1].price }}</span></template>
                </el-table-column>
                <el-table-column label="货品备注" align="center" prop="memorandum">
                  <template slot-scope="scope"><span>{{ oriInvoiceGoodsListEdit[scope.row.xh-1].memorandum }}</span></template>
                </el-table-column>
              </el-table>
            </el-card>
            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="8" :offset="16"><el-form-item size="large">
                  <div class="btn-warpper">
                    <el-button type="danger" @click="handleCancelEdit">取消显示</el-button>
                  </div>
                </el-form-item></el-col>
              </el-row>
            </el-card>
          </el-form>
        </div>
      </template>
    </el-dialog>
    <!--编辑工单反馈-->
    <el-dialog
      title="填单号"
      :visible.sync="InvoiceIDVisible"
      width="59%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="logisticsForm" label-width="10%" :data="deliverData">
        <hr>
        <el-form-item label="快递公司">
          <el-input
            v-model="deliverData.logistics"
            type="text"
            placeholder="请输入快递公司"
          />
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input
            v-model="deliverData.track_no"
            type="text"
            placeholder="请输入快递单号"
          />
        </el-form-item>
        <hr>
        <el-row :gutter="30">
          <el-col :span="12" :offset="6">
            <el-form-item>
              <el-button type="primary" @click="sumitInvoiceID">提交修改</el-button>
              <el-button type="error" @click="closeIvoiceID">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

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
  getDeliverManage,
  exportDeliverManage
} from '@/api/wop/woinvoice'
import {
  getDeliverList,
  updateDeliver,
  exportDeliver,
  excelImportDeliver,
  checkDeliver,
  rejectDeliver
} from '@/api/wop/woinvoice'
import { getShopList } from '@/api/base/shop'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
import { getCityList } from '@/api/utils/geography/city'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'OriInvoiceSubmit',
  data() {
    const validateTicket = (rule, value, callback) => {
      console.log(this.formAdd.order_category)
      if ((this.formAdd.order_category === 1 || this.formEdit.order_category === 1) && (value === '' || typeof (value) === 'undefined')) {
        callback(new Error('专票必填！'))
      } else {
        callback()
      }
    }

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
      importVisible: false,
      importFile: {},
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
            created_time: '',
            update_time: '',
            is_delete: false,
            creator: '',
            process_tag: '',
            mistake_tag: '',
            order_status: ''
          }
        }
      },
      deliverData: {
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
      oriInvoiceGoodsList: [],
      oriInvoiceGoodsListEdit: [],
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
      if (typeof (this.params.update_time) !== 'undefined') {
        if (this.params.update_time.length === 2) {
          this.params.update_time_after = moment.parseZone(this.params.update_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.update_time_before = moment.parseZone(this.params.update_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getDeliverManage(this.params).then(
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
    handleEdit(values) {
      console.log(values)
      this.formEdit = { ...values }
      this.dialogVisibleEdit = true

      // const currentShop = JSON.parse(JSON.stringify(this.formEdit.shop))
      // console.log(currentShop)
      this.formEdit.shop = this.formEdit.shop.name
      // console.log(this.optionsShop)
      // console.log(this.formEdit.shop)
      this.formEdit.company = this.formEdit.company.name
      this.formEdit.sent_city = this.formEdit.sent_city.name
      this.formEdit.order_category = this.formEdit.order_category.name
      this.oriInvoiceGoodsListEdit = []
      let goods
      for (goods in this.formEdit.goods_details) {
        this.formEdit.goods_details[goods].xh = goods + 1
        this.formEdit.goods_details[goods].name = this.formEdit.goods_details[goods].name.name
        this.oriInvoiceGoodsListEdit.push(this.formEdit.goods_details[goods])
      }
      console.log(this.oriInvoiceGoodsListEdit)
    },
    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.handleFormEdit.resetFields()
      this.handleDeleteAllDetailsEdit()
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
            exportDeliverManage(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    店铺: item.shop,
                    原始单号: item.ori_order_id,
                    网名: item.nickname,
                    快递公司: item.logistics,
                    快递单号: item.track_no,
                    创建人: item.creator,
                    收件人: item.consignee,
                    地址: item.address,
                    手机: item.smartphone,
                    更新时间: item.update_time,
                    商家编码: item.goods_id,
                    货品名称: item.goods_name,
                    货品数量: item.quantity,
                    订单类别: item.order_category,
                    买家备注: item.remark,
                    客服备注: item.message,
                    省: item.province,
                    市: item.city,
                    区: item.district
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
      this.tableLoading = true
      excelImportDeliver(importformData, config).then(
        res => {
          this.$notify({
            title: '导入结果',
            message: res.data,
            type: 'success',
            duration: 0
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
          console.log('1')
        }
      )
      this.$refs.files.type = 'text'
      this.$refs.files.value = ''
      this.$refs.files.type = 'file'
      this.closeImport()
      this.tableLoading = false
      this.fetchData()
    },
    closeImport() {
      this.importVisible = false
    },
    handleImport() {
      this.importVisible = true
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
        checkDeliver(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.successful}`,
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
        checkDeliver(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.successful}`,
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

    // 删除编辑全部表单货品项
    handleDeleteAllDetailsEdit() {
      this.oriInvoiceGoodsListEdit = undefined
    },
    // 重置筛选
    resetParams() {
      this.params = {
        page: 1
      }
    },
    fillInvoiceID(row, column, cell, event) {
      if (column.property === 'track_no') {
        this.InvoiceIDVisible = true
        this.deliverData = row
      }
    },
    handleFillID() {
      this.InvoiceIDVisible = true
      this.deliverData = this.formEdit
    },
    sumitInvoiceID() {
      console.log(this.deliverData)
      const id = this.deliverData.id
      const data = {
        invoice_id: this.deliverData.invoice_id
      }
      updateDeliver(id, data).then(
        res => {
          this.$notify({
            title: '修改快递信息成功',
            type: 'success',
            offset: 70,
            duration: 0
          })
          console.log(res)
          this.closeIvoiceID()
        },
        error => {
          this.$notify({
            title: '修改快递信息失败',
            type: 'error',
            offset: 70,
            duration: 0
          })
          console.log(error)
        }
      ).catch(
        () => {
          console.log('sss')
        }
      )
    },
    closeIvoiceID() {
      this.InvoiceIDVisible = false
      this.dialogVisibleEdit = false
      this.fetchData()
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
