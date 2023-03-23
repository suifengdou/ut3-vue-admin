<template>
  <div class="ori-order-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleFix">校正</el-button></el-dropdown-item>
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
        <el-col :span="3" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.trade_no" class="grid-content bg-purple" placeholder="支持多个订单编号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="3" class="titleBar">

          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索标签" placement="top-start">
              <el-select v-model="params.process_tag" placeholder="标签" clearable @change="fetchData">
                <el-option
                  v-for="item in optionsProcess"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="2" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="复制当前筛选条件下所有快递单号" placement="top-start">
              <el-button type="success" class="btn" @click="copytracks($event)">
                单号
              </el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出导入界面" placement="top-start">
              <el-button type="success" @click="importExcel">导入</el-button>
            </el-tooltip>
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
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="初始问题信息" prop="information">
                        <el-input v-model="params.information" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="是否理赔">
                        <el-select v-model="params.is_losing" placeholder="是否理赔">
                          <el-option
                            v-for="item in optionsJudgment"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="是否返回">
                        <el-select v-model="params.is_return" placeholder="是否返回">
                          <el-option
                            v-for="item in optionsJudgment"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
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
          label="错误列表"
          prop="mistake_tag"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mistake_tag.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="订单编号"
          prop="trade_no"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.trade_no }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺"
          prop="shop_name"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shop_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客户网名"
          prop="buyer_nick"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.buyer_nick }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件人"
          prop="receiver"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.receiver }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收货地址"
          prop="address"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机"
          prop="mobile"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="付款时间"
          prop="pay_time"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.pay_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收货地区"
          prop="area"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.area }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物流公司"
          prop="logistics_name"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.logistics_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物流单号"
          prop="logistics_no"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.logistics_no }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="打印备注"
          prop="print_remark"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.print_remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="买家留言"
          prop="buyer_message"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.buyer_message }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客服备注"
          prop="cs_remark"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cs_remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原始子订单号"
          prop="src_tids"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.src_tids }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品数量"
          prop="quantity"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="成交价"
          prop="price"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品成交总价"
          prop="amount"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品名称"
          prop="goods_name"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商家编码"
          prop="spec_code"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.spec_code }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="仓库"
          prop="warehouse_name"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.warehouse_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单类型"
          prop="order_category"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_category }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发货时间"
          prop="deliver_time"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.deliver_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
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
            <span>{{ scope.row.created_time }}</span>
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
      title="新增"
      width="60%"
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
            <span>客户相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="客户网名" prop="buyer_nick">
              <el-input v-model="formAdd.buyer_nick" placeholder="请输入客户网名" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="订单编号" prop="trade_no">
              <el-input v-model="formAdd.trade_no" placeholder="请输入订单编号" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="原始子订单号" prop="src_tids">
              <el-input v-model="formAdd.src_tids" placeholder="请输入原始子订单号" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="收件人" prop="receiver">
              <el-input v-model="formAdd.receiver" placeholder="请输入收件人" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="收件人手机" prop="mobile">
              <el-input v-model="formAdd.mobile" placeholder="请输入收件人手机" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="收货地区" prop="area">
              <el-input v-model="formAdd.area" placeholder="请输入收货地区" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18"><el-form-item label="收货地址" prop="address">
              <el-input v-model="formAdd.address" placeholder="请输入收货地址" />
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>货品信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="货品名称" prop="goods_name">
              <el-input v-model="formAdd.goods_name" placeholder="请输入货品名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="商家编码" prop="spec_code">
              <el-input v-model="formAdd.spec_code" placeholder="请输入商家编码" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="货品数量" prop="quantity">
              <el-input v-model="formAdd.quantity" placeholder="请输入货品名称" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="成交价" prop="price">
              <el-input v-model="formAdd.price" placeholder="请输入成交价" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="货品成交总价" prop="amount">
              <el-input v-model="formAdd.amount" placeholder="请输入货品成交总价" />
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>其他信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="店铺" prop="shop_name">
              <el-input v-model="formAdd.shop_name" placeholder="请输入店铺" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="仓库" prop="warehouse_name">
              <el-input v-model="formAdd.warehouse_name" placeholder="请输入仓库" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="订单类型" prop="order_category">
              <el-input v-model="formAdd.order_category" placeholder="请输入订单类型" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="物流公司" prop="logistics_name">
              <el-input v-model="formAdd.logistics_name" placeholder="请输入物流公司" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="物流单号" prop="logistics_no">
              <el-input v-model="formAdd.logistics_no" placeholder="请输入物流单号" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="付款时间" prop="pay_time">
              <el-date-picker
                v-model="formAdd.pay_time"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="发货时间" prop="deliver_time">
              <el-date-picker
                v-model="formAdd.deliver_time"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="买家留言" prop="buyer_message">
              <el-input v-model="formAdd.buyer_message" placeholder="请输入买家留言" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="客服备注" prop="cs_remark">
              <el-input v-model="formAdd.cs_remark" placeholder="请输入客服备注" />
            </el-form-item></el-col>
          </el-row>
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
                <el-col :span="8"><el-form-item label="客户网名" prop="buyer_nick">
                  <el-input v-model="formEdit.buyer_nick" placeholder="请输入客户网名" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收件人" prop="receiver">
                  <el-input v-model="formEdit.receiver" placeholder="请输入收件人" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="收件人手机" prop="mobile">
                  <el-input v-model="formEdit.mobile" placeholder="请输入收件人手机" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="收货地区" prop="area">
                  <el-input v-model="formEdit.area" placeholder="请输入收货地区" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="收货地址" prop="address">
                  <el-input v-model="formEdit.address" placeholder="请输入收货地址" />
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
      width="60%"
      border
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="margin: auto">
        <el-table :data="logDetails">
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
  getOriOrderStockOutSubmit,
  createOriOrderStockOutSubmit,
  updateOriOrderStockOutSubmit,
  exportOriOrderStockOutSubmit,
  excelImportOriOrderStockOutSubmit,
  fixOriOrderStockOutSubmit,
  checkOriOrderStockOutSubmit,
  exportSrcTidsOriOrderStockOutSubmit,
  rejectOriOrderStockOutSubmit
} from '@/api/crm/order/oriorder/sockout/submit'
import { getLogOriOrderManage } from '@/api/crm/order/oriorder/manage/manage'
import { getCompanyList } from '@/api/base/company'
import handleClipboard from '@/utils/clipboard'
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
      logDetails: [],
      tableData: {},
      params: {
        page: 1,
        allSelectTag: 0
      },
      all_track_id: '',
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      logViewVisible: false,
      formAdd: {},
      formEdit: {},
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
        ],
        receiver: [
          { required: true, message: '请选择收件人', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择收货地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入收件人手机', trigger: 'blur' }
        ],
      },
      optionsProcess: [
        { value: 0, label: '未解密' },
        { value: 1, label: '已解密' },
        { value: 2, label: '已建档' },
        { value: 3, label: '没法解' },
        { value: 4, label: '有退款' },
        { value: 5, label: '特殊' },
        { value: 8, label: '驳回' }
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
      // console.log(this.params.created_time)
      if (typeof (this.params.created_time) !== 'undefined') {
        if (this.params.created_time.length === 2) {
          this.params.created_time_after = moment.parseZone(this.params.created_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.created_time_before = moment.parseZone(this.params.created_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (this.params.trade_no !== undefined) {
        if (this.params.trade_no.length > 20) {
          const trade_nos = this.params.trade_no.split(' ').toString()
          if (trade_nos.length > 1) {
            this.params.trade_no__in = trade_nos
            delete this.params.trade_no
          }
        }
      }
      getOriOrderStockOutSubmit(this.params).then(
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
      let attrStr
      const transFieldStr = ['trade_no', 'sub_src_tids', 'erp_order_status', 'deliver_time', 'pay_time', 'area',
                            'logistics_no', 'buyer_message', 'cs_remark', 'sign', 'customer', 'goods', 'warehouse',
                            'src_tids', 'quantity', 'price', 'goods_name', 'spec_code', 'order_category', 'weight',
                            'shop_name', 'logistics_name', 'warehouse_name', 'print_remark', 'actual_weight',
                            'shop', 'order_status', 'mistake_tag', 'process_tag']
      for (attrStr in transFieldStr) {
        delete data[transFieldStr[attrStr]]
      }
      updateOriOrderStockOutSubmit(id, data).then(
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
    // 添加界面
    add() {
      this.dialogVisibleAdd = true
    },
    // 关闭添加界面
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.$refs.handleFormAdd.resetFields()
    },
    handleSubmitAdd() {
      console.log(this.formAdd)
      createOriOrderStockOutSubmit(this.formAdd).then(
        () => {
          this.$notify({
            title: '创建成功',
            type: 'success',
            offset: 0,
            duration: 0
          })
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch((res) => {
        this.$notify({
          title: '创建出错',
          message: res.data,
          type: 'success',
          offset: 0,
          duration: 0
        })
      })
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
            excelImportOriOrderStockOutSubmit(importformData, config).then(
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
            exportOriOrderStockOutSubmit(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    客户网名: item.buyer_nick,
                    订单编号: item.trade_no,
                    子单原始单号: item.src_tids,
                    收件人: item.receiver,
                    收货地址: item.address,
                    收件人手机: item.mobile,
                    付款时间: item.pay_time,
                    收货地区: item.area,
                    物流单号: item.logistics_no,
                    物流公司: item.logistics_name,
                    买家留言: item.buyer_message,
                    收件人姓名: item.cs_remark,
                    客服备注: item.sent_smartphone,
                    打印备注: item.print_remark,
                    下单数量: item.num,
                    实发数量: item.quantity,
                    成交价: item.price,
                    成交总价: item.amount,
                    预估重量: item.weight,
                    实际重量: item.actual_weight,
                    货品名称: item.goods_name,
                    商家编码: item.spec_code,
                    店铺: item.shop_name,
                    仓库名称: item.warehouse_name,
                    订单类型: item.order_category,
                    erp订单状态: item.erp_order_status,
                    发货时间: item.deliver_time,
                    erp订单标记: item.sign,
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
    // 校正
    handleFix() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        fixOriOrderStockOutSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '校正成功',
                message: `校正成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
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
          }).catch(
          (error) => {
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
        fixOriOrderStockOutSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '校正成功',
                message: `校正成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
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
          }).catch(
          (error) => {
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
      }
    },
    // 审核单据
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkOriOrderStockOutSubmit(this.params).then(
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
          }).catch(
          (error) => {
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
        checkOriOrderStockOutSubmit(this.params).then(
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
          }).catch(
          (error) => {
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
      }
    },
    // 驳回单据
    handleReject() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '驳回工单',
        message: h('p', null, [
          h('hr', null, ''),
          h('span', null, '驳回工单到快递！'),
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
              rejectOriOrderStockOutSubmit(this.params).then(
                res => {
                  if (res.data.successful !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.successful}`,
                      type: 'success',
                      offset: 70,
                      duration: 3000
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
                }).catch(
                (error) => {
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
              rejectOriOrderStockOutSubmit(this.params).then(
                res => {
                  if (res.data.successful !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.successful}`,
                      type: 'success',
                      offset: 70,
                      duration: 3000
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
                }).catch(
                (error) => {
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
      console.log("I was running")
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogOriOrderManage(data).then(
        res => {
          this.$notify({
            title: '查询成功',
            type: 'success',
            duration: 1000
          })
          this.logDetails = res.data
        }).catch(
        (error) => {
          console.log('1')
          this.$notify({
            title: '查询错误',
            message: error.data,
            type: 'error',
            duration: 0
          })
        }
      )
    },
    copytracks(event) {
      console.log(this.params)
      exportSrcTidsOriOrderStockOutSubmit(this.params).then(
        (res) => {
          res.data = res.data.map(item => item.src_tids)
          handleClipboard(res.data, event)
        }
      ).catch(
        (error) => {
          console.log(error)
      })

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
