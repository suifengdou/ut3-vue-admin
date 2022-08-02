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
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">取消工单</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleRejectDealer">驳至经销</el-button></el-dropdown-item>
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
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出新建界面" placement="top-start">
              <el-button type="primary" @click="add">新增发票工单</el-button>
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
            <span>{{ scope.row.memorandum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收款开票公司"
          prop="company"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.company.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="源单号"
          prop="order_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客户昵称"
          prop="nickname"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="发票类型"
          prop="order_category"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_category.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="申请税前开票总额"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发票抬头"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="纳税人识别号"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.tax_id }}</span>
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
          label="是否顺丰"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_deliver"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>

        <el-table-column
          label="工单留言"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="创建公司"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sign_company.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建部门"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sign_department.name }}</span>
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
            <span>开票订单相关信息</span>
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
            <el-col :span="8"><el-form-item label="客户昵称" prop="nickname">
              <el-input v-model="formAdd.nickname" placeholder="请输入名称" />
            </el-form-item></el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="收款公司" prop="company">
              <template>
                <el-select
                  v-model="formAdd.company"
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
            <el-col :span="8"><el-form-item label="发票类型" prop="order_category">
              <el-select v-model="formAdd.order_category" placeholder="请选择发票类型">
                <el-option
                  v-for="item in optionsCategory"
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
            <span>客户公司信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="发票抬头" prop="title">
              <el-input v-model="formAdd.title" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="16"><el-form-item label="税号" prop="tax_id">
              <el-input v-model="formAdd.tax_id" placeholder="请输入名称" />
            </el-form-item></el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="银行名称" prop="bank">
              <el-input v-model="formAdd.bank" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="银行账号" prop="account">
              <el-input v-model="formAdd.account" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="联系电话" prop="phone">
              <el-input v-model="formAdd.phone" placeholder="请输入名称" />
            </el-form-item></el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="地址" prop="address">
              <el-input v-model="formAdd.address" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="发票备注" prop="remark">
              <el-input v-model="formAdd.remark" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>收件信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="收件姓名" prop="sent_consignee">
              <el-input v-model="formAdd.sent_consignee" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="收件手机" prop="sent_smartphone">
              <el-input v-model="formAdd.sent_smartphone" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :guuter="20">
            <el-col :span="16"><el-form-item label="收件地址" prop="sent_address">
              <el-input v-model="formAdd.sent_address" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>其他信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="是否发顺丰" prop="is_deliver">
              <el-switch v-model="formAdd.is_deliver" active-color="#13ce66" inactive-color="#ff4949" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="工单留言" prop="message">
              <el-input v-model="formAdd.message" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>开票货品相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="2"><el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails">添加</el-button></el-col>
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
            ref="tableAdd"
            border
            :data="OrderDetailsList"
            :row-class-name="rowClassName"
            @selection-change="handleDetailSelectionChange"
          >
            <el-table-column type="selection" width="30" align="center" />
            <el-table-column label="序号" align="center" prop="xh" width="50" />
            <el-table-column label="名称" width="250" prop="goods_name">
              <template slot-scope="scope">
                <el-select
                  v-model="OrderDetailsList[scope.row.xh-1].goods_name"
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
                <el-input v-model="OrderDetailsList[scope.row.xh-1].quantity" type="number" />
              </template>
            </el-table-column>
            <el-table-column label="含税单价" width="250" prop="price">
              <template slot-scope="scope">
                <el-input v-model="OrderDetailsList[scope.row.xh-1].price" type="text" />
              </template>
            </el-table-column>
            <el-table-column label="货品备注" width="250" prop="memorandum">
              <template slot-scope="scope">
                <el-input v-model="OrderDetailsList[scope.row.xh-1].memorandum" type="text" />
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
            :rules="rulesEdit"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>开票订单相关信息</span>
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
                <el-col :span="8"><el-form-item label="客户昵称" prop="nickname">
                  <el-input v-model="formEdit.nickname" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收款公司" prop="company">
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
                <el-col :span="8"><el-form-item label="发票类型" prop="order_category">
                  <el-select v-model="formEdit.order_category" placeholder="请选择发票类型">
                    <el-option
                      v-for="item in optionsCategory"
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
                <span>客户公司信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="发票抬头" prop="title">
                  <el-input v-model="formEdit.title" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="16"><el-form-item label="税号" prop="tax_id">
                  <el-input v-model="formEdit.tax_id" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="银行名称" prop="bank">
                  <el-input v-model="formEdit.bank" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="银行账号" prop="account">
                  <el-input v-model="formEdit.account" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="联系电话" prop="phone">
                  <el-input v-model="formEdit.phone" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="地址" prop="address">
                  <el-input v-model="formEdit.address" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="发票备注" prop="remark">
                  <el-input v-model="formEdit.remark" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>收件信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收件姓名" prop="sent_consignee">
                  <el-input v-model="formEdit.sent_consignee" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="收件手机" prop="sent_smartphone">
                  <el-input v-model="formEdit.sent_smartphone" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :guuter="20">
                <el-col :span="16"><el-form-item label="收件地址" prop="sent_address">
                  <el-input v-model="formEdit.sent_address" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="是否发顺丰" prop="is_deliver">
                  <el-switch v-model="formEdit.is_deliver" active-color="#13ce66" inactive-color="#ff4949" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="工单留言" prop="message">
                  <el-input v-model="formEdit.message" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>开票货品相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="2"><el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetailsEdit">添加</el-button></el-col>
                <el-col :span="2"><el-button
                  type="success"
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
  getOriInvoiceListSubmit,
  createOriInvoiceSubmit,
  updateOriInvoiceSubmit,
  exportOriInvoiceSubmit,
  excelImportOriInvoiceSubmit,
  checkOriInvoiceSubmit,
  rejectOriInvoiceSubmit,
  rejectDealerOriInvoiceSubmit
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
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      importVisible: false,
      formAdd: {
        type: Object,
        default() {
          return {
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
      importFile: {},
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
      rules: {
        shop: [
          { required: true, message: '请选择店铺', trigger: 'blur' }
        ],
        order_id: [
          { required: true, message: '请输入源单号', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ],
        order_category: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入抬头', trigger: 'blur' }
        ],
        tax_id: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        sent_consignee: [
          { required: true, message: '请输入收件人姓名', trigger: 'blur' }
        ],
        sent_smartphone: [
          { required: true, message: '请输入收件电话', trigger: 'blur' }
        ],
        sent_city: [
          { required: true, message: '请输选择城市', trigger: 'blur' }
        ],
        sent_district: [
          { required: false, message: '请输入区县', trigger: 'blur' }
        ],
        sent_address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        bank: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        account: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        address: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        tableInput: [
          { required: true, trigger: ['blur', 'change'], message: '请选择' }
        ]
      },
      rulesEdit: {
        id: [
          { required: true, message: '请选择店铺', trigger: 'blur' }
        ],
        shop: [
          { required: true, message: '请选择店铺', trigger: 'blur' }
        ],
        order_id: [
          { required: true, message: '请输入源单号', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ],
        order_category: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入抬头', trigger: 'blur' }
        ],
        tax_id: [
          { required: true, message: '请输入税号', trigger: 'blur' }
        ],
        sent_consignee: [
          { required: true, message: '请输入收件人姓名', trigger: 'blur' }
        ],
        sent_smartphone: [
          { required: true, message: '请输入收件电话', trigger: 'blur' }
        ],
        sent_city: [
          { required: true, message: '请输选择城市', trigger: 'blur' }
        ],
        sent_district: [
          { required: false, message: '请输入区县', trigger: 'blur' }
        ],
        sent_address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        phone: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        bank: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        account: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        address: [
          { validator: validateTicket, trigger: 'blur' }
        ],
        tableInput: [
          { required: true, trigger: ['blur', 'change'], message: '请选择' }
        ]
      },
      OrderDetailsList: [],
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
      getOriInvoiceListSubmit(this.params).then(
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
      this.formEdit = { ...values }

      // const currentShop = JSON.parse(JSON.stringify(this.formEdit.shop))
      // console.log(currentShop)
      this.optionsShop = [{ label: this.formEdit.shop.name, value: this.formEdit.shop.id }]
      this.formEdit.shop = this.formEdit.shop.id
      // console.log(this.optionsShop)
      // console.log(this.formEdit.shop)
      this.optionsCompany = [{ label: this.formEdit.company.name, value: this.formEdit.company.id }]
      this.formEdit.company = this.formEdit.company.id

      this.optionsCity = [{ label: this.formEdit.sent_city.name, value: this.formEdit.sent_city.id }]
      this.formEdit.sent_city = this.formEdit.sent_city.id

      this.optionsGoods = this.formEdit.goods_details.map(item => {
        return { label: item.name.name, value: item.name.id }
      })
      this.formEdit.order_category = this.formEdit.order_category.id
      console.log(this.formEdit)
      this.oriInvoiceGoodsListEdit = []
      let goods
      for (goods in this.formEdit.goods_details) {
        this.formEdit.goods_details[goods].xh = goods + 1
        this.formEdit.goods_details[goods].goods_name = this.formEdit.goods_details[goods].name.id
        this.oriInvoiceGoodsListEdit.push(this.formEdit.goods_details[goods])
      }
      this.dialogVisibleEdit = true

    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      this.$refs.handleFormEdit.validate(valid => {
        if (!valid) {
          return
        }
        this.formEdit.goods_details = this.oriInvoiceGoodsListEdit
        const { id, ...data } = this.formEdit
        let attrStr
        console.log(data)
        const transFieldStr = ['mistake_tag', 'process_tag', 'sign_company', 'sign_department', 'order_status']
        for (attrStr in transFieldStr) {
          data[transFieldStr[attrStr]] = data[transFieldStr[attrStr]].id
        }
        console.log(data)
        updateOriInvoiceSubmit(id, data).then(
          () => {
            this.dialogVisibleEdit = false
            this.fetchData()
          }).catch(
          (error) => {
            this.$notify({
              title: '更新错误',
              message: `错误详情：${error.data}`,
              type: 'error',
              offset: 70,
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
      console.log(this.OrderDetailsList)
      this.formAdd.goods_details = this.OrderDetailsList
      createOriInvoiceSubmit(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch(
        (error) => {
          this.$notify({
            title: '创建错误',
            message: `错误详情：${error.data}`,
            type: 'error',
            offset: 70,
            duration: 0
          })
        }
      )
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
      console.log('#############')
      console.log('文件我获取到了')
      console.log('#############')
    },
    importExcel() {
      const importformData = new FormData()
      importformData.append('file', this.importFile.file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log('#############')
      console.log('我是发票导入测试')
      console.log('#############')
      excelImportOriInvoiceSubmit(importformData, config).then(
        res => {
          this.$notify({
            title: '导入结果',
            message: res.data,
            type: 'success',
            duration: 3000
          })
          this.fetchData()
        }).catch(
        (error) => {
          this.$notify({
            title: '导入错误',
            message: error.data,
            type: 'error',
            duration: 0
          })
          this.fetchData()
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
            exportOriInvoiceSubmit(this.params).then(
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
                    收件城市: item.sent_city.name,
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
    // 审核单据
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkOriInvoiceSubmit(this.params).then(
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
        checkOriInvoiceSubmit(this.params).then(
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
              rejectOriInvoiceSubmit(this.params).then(
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
              rejectOriInvoiceSubmit(this.params).then(
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
    handleRejectDealer() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '驳回工单',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '驳回工单到经销商处，请及时通知经销商处理！'),
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
              rejectDealerOriInvoiceSubmit(this.params).then(
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
                      message: `驳回失败条数：${res.data.false}`,
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
              rejectDealerOriInvoiceSubmit(this.params).then(
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
                      message: `驳回失败条数：${res.data.false}`,
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
