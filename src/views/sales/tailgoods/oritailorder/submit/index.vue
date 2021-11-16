<template>
  <div class="ori-tailorder-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetUsed">标记重损</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetRetread">标非重损</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetSpecial">标特殊单</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-off" size="mini" round @click="handleSetRecover">恢复无标</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核单据</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">取消单据</el-button></el-dropdown-item>
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
              <el-input v-model="params.sent_smartphone" class="grid-content bg-purple" placeholder="请输入收件人手机" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
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
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出新建界面" placement="top-start">
              <el-button type="primary" @click="add">新增尾货订单</el-button>
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
                      <el-col :span="6"><el-form-item label="订单类型" prop="order_category">
                        <el-select v-model="params.order_category" placeholder="请选择发票类型">
                          <el-option
                            v-for="item in optionsCategory"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="发货模式" prop="order_category">
                        <el-select v-model="params.mode_warehouse" placeholder="请选择发票类型">
                          <el-option
                            v-for="item in optionsMode"
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
                      <el-col :span="6"><el-form-item label="收件人" prop="sent_consignee">
                        <el-input v-model="params.sent_consignee" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6">
                        <el-form-item label="手机" prop="sent_smartphone">
                          <el-input v-model="params.sent_smartphone" type="text" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="货品总数" prop="quantity">
                          <el-input v-model="params.quantity" type="text" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="尾货订单总价" prop="amount">
                        <el-input v-model="params.amount" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="订单留言" prop="message">
                        <el-input v-model="params.message" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
                      </el-form-item></el-col>
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
          label="工单反馈"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.feedback }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
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
          width="230px"
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
              <el-tag type="danger" size="mini">{{ item.name.name }}</el-tag>
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
          width="230px"
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
    <!--新建添加模态窗-->
    <el-dialog
      title="新增"
      width="80%"
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
            <span>订单相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="店铺" prop="shop">
              <template>
                <el-select
                  v-model="formAdd.shop"
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
            <el-col :span="8"><el-form-item label="源单号" prop="order_id">
              <el-input v-model="formAdd.order_id" placeholder="请输入名称" />
            </el-form-item></el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="发货模式" prop="mode_warehouse">
              <el-select v-model="formAdd.mode_warehouse" placeholder="请选择发票类型">
                <el-option
                  v-for="item in optionsMode"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发货信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="收件人" prop="sent_consignee">
              <el-input v-model="formAdd.sent_consignee" placeholder="请输入收件人" />
            </el-form-item></el-col>
            <el-col :span="16"><el-form-item label="手机" prop="sent_smartphone">
              <el-input v-model="formAdd.sent_smartphone" placeholder="请输入手机" />
            </el-form-item></el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="收件地址" prop="sent_address">
              <el-input v-model="formAdd.sent_address" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="订单留言" prop="message">
              <el-input v-model="formAdd.message" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>货品相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="2"><el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails">添加</el-button></el-col>
            <el-col :span="2"><el-button
              type="danger"
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
            ref="tableAdd"
            border
            :data="oriInvoiceGoodsList"
            :row-class-name="rowClassName"
            @selection-change="handleDetailSelectionChange"
          >
            <el-table-column type="selection" width="30" align="center" />
            <el-table-column label="序号" align="center" prop="xh" width="50" />
            <el-table-column label="名称" width="250" prop="goods_name">
              <template slot-scope="scope">
                <el-select
                  v-model="oriInvoiceGoodsList[scope.row.xh-1].goods_name"
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
                <el-input v-model="oriInvoiceGoodsList[scope.row.xh-1].quantity" type="number" />
              </template>
            </el-table-column>
            <el-table-column label="含税单价" width="250" prop="price">
              <template slot-scope="scope">
                <el-input v-model="oriInvoiceGoodsList[scope.row.xh-1].price" type="text" />
              </template>
            </el-table-column>
            <el-table-column label="货品备注" width="250" prop="memorandum">
              <template slot-scope="scope">
                <el-input v-model="oriInvoiceGoodsList[scope.row.xh-1].memorandum" type="text" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="8" :offset="16"><el-form-item size="large">
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
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="店铺" prop="shop">
                  <template>
                    <el-select
                      v-model="formEdit.shop"
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
                <el-col :span="8"><el-form-item label="源单号" prop="order_id">
                  <el-input v-model="formEdit.order_id" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="发货模式" prop="mode_warehouse">
                  <el-select v-model="formEdit.mode_warehouse" placeholder="请选择发票类型">
                    <el-option
                      v-for="item in optionsMode"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>发货信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收件人" prop="sent_consignee">
                  <el-input v-model="formEdit.sent_consignee" placeholder="请输入收件人" />
                </el-form-item></el-col>
                <el-col :span="16"><el-form-item label="手机" prop="sent_smartphone">
                  <el-input v-model="formEdit.sent_smartphone" placeholder="请输入手机" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="城市" prop="sent_city">
                  <template v-if="formEdit.sent_city != undefined">
                    <span>{{ formEdit.sent_city.name }}</span>
                  </template>
                </el-form-item></el-col>
                <el-col :span="16"><el-form-item label="区县" prop="sent_district">
                  <span>{{ formEdit.sent_district }}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="收件地址" prop="sent_address">
                  <el-input v-model="formEdit.sent_address" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="订单留言" prop="message">
                  <el-input v-model="formEdit.message" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>货品相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="2"><el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetailsEdit">添加</el-button></el-col>
                <el-col :span="2"><el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDeleteDetailsEdit"
                >删除</el-button></el-col>
                <el-col :span="2"><el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDeleteAllDetailsEdit"
                >清空</el-button></el-col>
                <el-col :span="10" />
                <el-col :span="4" />
                <el-col :span="4" />
              </el-row>
              <el-table
                ref="tableEdit"
                border
                :data="oriInvoiceGoodsListEdit"
                :row-class-name="rowClassName"
                @selection-change="handleDetailSelectionChangeEdit"
              >
                <el-table-column type="selection" width="30" align="center" />
                <el-table-column label="序号" align="center" prop="xh" width="50">
                  <template slot-scope="scope">
                    <span>{{ oriInvoiceGoodsListEdit[scope.row.xh-1].xh }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="名称" width="250" prop="goods_name">
                  <template slot-scope="scope">
                    <el-select
                      v-model="oriInvoiceGoodsListEdit[scope.row.xh-1].goods_name"
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
                    <el-input v-model="oriInvoiceGoodsListEdit[scope.row.xh-1].quantity" type="number" />
                  </template>
                </el-table-column>
                <el-table-column label="含税单价" width="250" prop="price">
                  <template slot-scope="scope">
                    <el-input v-model="oriInvoiceGoodsListEdit[scope.row.xh-1].price" type="text" />
                  </template>
                </el-table-column>
                <el-table-column label="货品备注" width="250" prop="memorandum">
                  <template slot-scope="scope">
                    <el-input v-model="oriInvoiceGoodsListEdit[scope.row.xh-1].memorandum" type="text" />
                  </template>
                </el-table-column>
              </el-table>
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
  getOritailorderSubmitList,
  createOritailorderSubmit,
  updateOritailorderSubmit,
  exportOritailorderSubmit,
  excelImportOritailorderSubmit,
  checkOritailorderSubmit,
  rejectOritailorderSubmit,
  setUsedOritailorderSubmit,
  setRetreadOritailorderSubmit,
  setSpecialOritailorderSubmit,
  recoverOritailorderSubmit
} from '@/api/sales/tailgoods/oritailorder'
import { getShopList } from '@/api/base/shop'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
import { getCityList } from '@/api/utils/geography/city'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'TailorderSubmit',
  data() {
    const validateMobile = (rule, value, callback) => {
      const reg = RegExp(/^[1][3-9][0-9]{9}$/)
      if (value == '' || value == undefined || value == null) {
        callback()
      } else {
        if ((!reg.test(value)) && value != '') {
          callback(new Error('请输入正确手机号'))
        } else {
          callback()
        }
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
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      importVisible: false,
      formAdd: {
        order_category: 1,
        shop: 13
      },
      formEdit: {},
      importFile: {},
      optionsShop: [
        {
          value: 13,
          label: '小狗尾货'
        }
      ],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      optionsCity: [],
      optionsGoods: [],
      optionsCategory: [
        {
          value: 1,
          label: '销售订单'
        }
      ],
      optionsMode: [
        {
          value: 0,
          label: '回流'
        },
        {
          value: 1,
          label: '二手'
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
      rules: {
        shop: [
          { required: true, message: '请选择店铺', trigger: 'blur' }
        ],
        order_id: [
          { required: true, message: '请输入源单号', trigger: 'blur' }
        ],
        order_category: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        mode_warehouse: [
          { required: true, message: '请输入收件电话', trigger: 'blur' }
        ],
        sent_consignee: [
          { required: true, message: '请输入收件人姓名', trigger: 'blur' }
        ],
        sent_smartphone: [
          { validator: validateMobile, trigger: 'blur' }
        ],

        sent_address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        tableInput: [
          { required: true, trigger: ['blur', 'change'], message: '请选择' }
        ]
      },
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
      // console.log(this.params.create_time)
      if (typeof (this.params.create_time) !== 'undefined') {
        if (this.params.create_time.length === 2) {
          this.params.create_time_after = moment.parseZone(this.params.create_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.create_time_before = moment.parseZone(this.params.create_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getOritailorderSubmitList(this.params).then(
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
      this.formEdit.order_category = this.formEdit.order_category.id
      this.optionsShop = [{ label: this.formEdit.shop.name, value: this.formEdit.shop.id }]
      this.formEdit.shop = this.formEdit.shop.id
      this.formEdit.mode_warehouse = this.formEdit.mode_warehouse.id
      if (this.formEdit.goods_details != undefined) {
        this.optionsGoods = this.formEdit.goods_details.map(item => {
          return { label: item.name.name, value: item.name.id }
        })
        this.oriInvoiceGoodsListEdit = []
        let goods
        for (goods in this.formEdit.goods_details) {
          this.formEdit.goods_details[goods].xh = goods + 1
          this.formEdit.goods_details[goods].goods_name = this.formEdit.goods_details[goods].name.id
          this.oriInvoiceGoodsListEdit.push(this.formEdit.goods_details[goods])
        }
      }
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      this.$refs.handleFormEdit.validate(valid => {
        if (!valid) {
          return
        }
        delete this.formEdit.sent_city
        console.log(this.oriInvoiceGoodsListEdit)
        this.formEdit.goods_details = this.oriInvoiceGoodsListEdit
        const { id, ...data } = this.formEdit
        let attrStr
        console.log(data)
        const transFieldStr = ['mistake_tag', 'process_tag', 'order_status']
        for (attrStr in transFieldStr) {
          data[transFieldStr[attrStr]] = data[transFieldStr[attrStr]].id
        }
        console.log(data)
        updateOritailorderSubmit(id, data).then(
          () => {
            this.dialogVisibleEdit = false
            this.fetchData()
          },
          err => {
            this.$notify({
              title: '更新错误',
              message: err.data,
              type: 'error',
              duration: 0
            })
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
    // 添加
    add() {
      this.dialogVisibleAdd = true
    },
    // 递交添加
    handleSubmitAdd() {
      console.log(this.formAdd)
      console.log(this.oriInvoiceGoodsList)
      this.formAdd.goods_details = this.oriInvoiceGoodsList
      createOritailorderSubmit(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch((res) => {
        this.$notify({
          title: '创建错误',
          message: res.data,
          type: 'error',
          duration: 0
        })
      })
    },
    // 关闭添加界面
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.$refs.handleFormAdd.resetFields()
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
            excelImportOritailorderSubmit(importformData, config).then(
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
            exportOritailorderSubmit(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    店铺: item.shop.name,
                    源单号: item.order_id,
                    订单类型: item.order_category.name,
                    发货模式: item.mode_warehouse.name,
                    收件人姓名: item.sent_consignee,
                    收件人手机: item.sent_smartphone,
                    收件区县: item.sent_district,
                    收件地址: item.sent_address,
                    尾货订单总价: item.amount,
                    货品总数: item.quantity,
                    货品名称: JSON.stringify(item.goods_details),
                    提交时间: item.submit_time,
                    处理时间: item.handle_time,
                    订单留言: item.message,
                    订单反馈: item.feedback,
                    创建公司: item.sign_company.name,
                    创建部门: item.sign_department.name,
                    处理标签: item.process_tag.name,
                    错误原因: item.mistake_tag.name,
                    订单状态: item.order_status.name,
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
    // 审核单据
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
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
        checkOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
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
            console.log(error)
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
        )
      }
    },
    handleSetUsed() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setUsedOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
            message: '未选择订单无法标记',
            type: 'error',
            offset: 70,
            duration: 0
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        setUsedOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
    handleSetRetread() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setRetreadOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
        setRetreadOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
    handleSetSpecial() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setSpecialOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
        setSpecialOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
    handleSetRecover() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        recoverOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
        recoverOritailorderSubmit(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '标记成功',
                message: `标记成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '标记失败',
                message: `标记失败条数：${res.data.false}`,
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
              rejectOritailorderSubmit(this.params).then(
                res => {
                  if (res.data.success !== 0) {
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
              rejectOritailorderSubmit(this.params).then(
                res => {
                  if (res.data.success !== 0) {
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
        this.oriInvoiceGoodsList.splice(this.checkedDetail[0].xh - 1, 1)
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
      this.oriInvoiceGoodsList = undefined
    },
    // 删除编辑全部表单货品项
    handleDeleteAllDetailsEdit() {
      this.oriInvoiceGoodsListEdit = undefined
    },
    // 添加表单货品项
    handleAddDetails() {
      if (this.oriInvoiceGoodsList === undefined) {
        this.oriInvoiceGoodsList = []
      }
      const obj = {
        id: 'n'
      }
      this.oriInvoiceGoodsList.push(obj)
    },
    // 添加编辑表单货品项
    handleAddDetailsEdit() {
      if (this.oriInvoiceGoodsListEdit === undefined) {
        this.oriInvoiceGoodsListEdit = []
      }
      const obj = {
        id: 'n'
      }
      this.oriInvoiceGoodsListEdit.push(obj)
      console.log(this.oriInvoiceGoodsListEdit)
    },
    // 表格的行样式
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.process_tag.id === 8) {
        row_style = {
          backgroundColor: '#c7dc68'
        }
      } else if (row.process_tag.id === 9) {
        row_style = {
          backgroundColor: '#c1d8ac'
        }
      } else if (row.process_tag.id === 10) {
        row_style = {
          backgroundColor: '#f39800'
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
