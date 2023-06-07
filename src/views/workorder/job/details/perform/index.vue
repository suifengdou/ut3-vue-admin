<template>
  <div class="job-order-details-perform-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleBatchSetOver">批量设置结束</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleBatchSetComplete">批量设置完成</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleBatchAddLabel">批量加标签</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleBatchContent">批量加操作</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">完结执行单</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">清除添加标签</el-button></el-dropdown-item>
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
            <el-tooltip class="item" effect="dark" content="客户电话" placement="top-start">
              <el-input v-model="params.customer__name" class="grid-content bg-purple" placeholder="请输入客户电话" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="3" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="任务码" placement="top-start">
              <el-input v-model="params.order__code" class="grid-content bg-purple" placeholder="请输入任务码" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="4" class="titleBar">
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
                      <el-col :span="6"><el-form-item label="添加标签" prop="add_label">
                        <el-input v-model="params.add_label" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="删除标签" prop="del_label">
                        <el-input v-model="params.del_label" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="操作内容" prop="content">
                        <el-input v-model="params.content" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="审核人" prop="checker">
                        <el-input v-model="params.checker" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="领取人" prop="handler">
                        <el-input v-model="params.handler" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="完成人" prop="completer">
                        <el-input v-model="params.completer" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="是否完成">
                        <el-select v-model="params.is_complete" clearable placeholder="是否理赔">
                          <el-option
                            v-for="item in optionsJudgment"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="是否结束">
                        <el-select v-model="params.is_over" clearable placeholder="是否返回">
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
                      <el-col :span="6"><el-form-item label="是否重置">
                        <el-select v-model="params.is_reset" clearable placeholder="是否理赔">
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
                      <el-col :span="12"><el-form-item label="完成时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.completed_time"
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
        :row-style="rowStyle"
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
          label="客户"
          prop="customer"
          sortable="custom"
          width="110px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.customer.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误原因"
          prop="customer"
          sortable="custom"
          width="110px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mistake_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务名"
          prop="order"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务码"
          prop="order"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order.code }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="领取人"
          prop="handler"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.handler }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标签名"
          prop="order"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order.label }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务说明"
          prop="order"
          sortable="custom"
          width="360px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order.info }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="任务关键字提示"
          prop="order"
          sortable="custom"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order.keywords }}</span>
          </template>
        </el-table-column>


        <el-table-column
          label="添加标签"
          prop="add_label"
          sortable="custom"
          width="200px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.add_label"
              class="grid-content bg-purple"
              placeholder="请输入关键字"
              @change="handleEditAddLabel(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="是否完成"
          prop="is_complete"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_complete"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleEditBoolean(scope.row)"
            />
          </template>

        </el-table-column>
        <el-table-column
          label="是否结束"
          prop="is_over"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_over"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleEditBoolean(scope.row)"
            />
          </template>

        </el-table-column>
        <el-table-column
          label="操作内容"
          prop="content"
          sortable="custom"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务指数"
          prop="job_index"
          sortable="custom"
          width="110px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.job_index"
              maxlength="10"
              minlength="0"
              type="number"
              @change="handleEditjobindex(scope.row)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="文档上传"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleFileUpload(scope.row)">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="文档查看"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handlePhotoView(scope.row)">查看</el-button>
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
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>相关信息</span>
              </div>
              <el-collapse v-model="activeNames">
                <el-collapse-item is-active title="客户信息" name="1">
                  <div class="block">
                    <el-form ref="customerForm" :model="customer_info" label-width="80px">
                      <el-row :gutter="20">
                        <el-col :span="6" />
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="6"><el-form-item label="客户名字" prop="creator">
                          {{ customer_info.name}}
                        </el-form-item></el-col>
                        <el-col :span="6"><el-form-item label="客户日志" prop="creator">
                          <el-button type="danger" size="mini" @click="logViewCustomer(customer_info)">查看</el-button>
                        </el-form-item></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="8"><el-form-item label="基础" prop="label_person">
                          <template>
                            <div v-for="(item, i) in customer_info.label_person">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="拓展" prop="label_family">
                          <template>
                            <div v-for="(item, i) in customer_info.label_family">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="8"><el-form-item label="产品" prop="label_product">
                          <template>
                            <div v-for="(item, i) in customer_info.label_product">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="交易" prop="label_order">
                          <template>
                            <div v-for="(item, i) in customer_info.label_order">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="8"><el-form-item label="服务" prop="label_service">
                          <template>
                            <div v-for="(item, i) in customer_info.label_service">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="体验" prop="label_satisfaction">
                          <template>
                            <div v-for="(item, i) in customer_info.label_satisfaction">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="8"><el-form-item label="退换" prop="label_refund">
                          <template>
                            <div v-for="(item, i) in customer_info.label_refund">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="其他" prop="label_others">
                          <template>
                            <div v-for="(item, i) in customer_info.label_others">
                              <el-tag type="success" size="mini"><span>{{ item.name }}</span></el-tag>
                            </div>
                          </template>
                        </el-form-item></el-col>
                      </el-row>
                    </el-form>
                  </div>
                </el-collapse-item>
                <el-collapse-item is-active title="任务信息" name="2">
                  <div class="block">
                    <el-form ref="customerForm" :model="formEdit.order" label-width="80px">
                      <el-row :gutter="20">
                        <el-col :span="8"><el-form-item label="任务类别" prop="order">
                          <template v-if="formEdit.order != undefined">
                            <span>{{ formEdit.order.category }}</span>
                          </template>
                        </el-form-item></el-col>
                        <el-col :span="8"><el-form-item label="标签" prop="order">
                          <template v-if="formEdit.order != undefined">
                            <span>{{ formEdit.order.label }}</span>
                          </template>
                        </el-form-item></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="16"><el-form-item label="任务说明" prop="order">
                          <template v-if="formEdit.order != undefined">
                            <span>{{ formEdit.order.info }}</span>
                          </template>
                        </el-form-item></el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="16"><el-form-item label="关键提示" prop="order">
                          <template v-if="formEdit.order != undefined">
                            <span>{{ formEdit.order.keywords }}</span>
                          </template>
                        </el-form-item></el-col>
                      </el-row>
                    </el-form>
                  </div>
                </el-collapse-item>
                <el-collapse-item is-active title="添加订单" name="3">
                  <div class="block">
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
                          <el-col :span="8"><el-form-item label="订单号" prop="order_id">
                            <el-input v-model="formAdd.order_id" placeholder="请输入订单号" />
                          </el-form-item></el-col>
                          <el-col :span="8"><el-form-item label="客户昵称" prop="nickname">
                            <el-input v-model="formAdd.nickname" placeholder="请输入客户昵称" />
                          </el-form-item></el-col>
                        </el-row>

                        <el-row :gutter="20">
                          <el-col :span="8"><el-form-item label="客服" prop="servicer">
                            <el-input v-model="formAdd.servicer" placeholder="请输入客服" />
                          </el-form-item></el-col>
                          <el-col :span="8"><el-form-item label="单据类型" prop="order_category">
                            <el-select v-model="formAdd.order_category" placeholder="请选择单据类型">
                              <el-option
                                v-for="item in optionsCategory"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              />
                            </el-select>
                          </el-form-item></el-col>
                          <el-col :span="8"><el-form-item label="仓库" prop="warehouse">
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
                      </el-card>

                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span>客户信息</span>
                        </div>
                        <el-row :gutter="20">
                          <el-col :span="8"><el-form-item label="收件人" prop="receiver">
                            <el-input v-model="formAdd.receiver" placeholder="请输入收件人" />
                          </el-form-item></el-col>
                          <el-col :span="16"><el-form-item label="手机" prop="mobile">
                            <el-input v-model="formAdd.mobile" placeholder="请输入手机" />
                          </el-form-item></el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="16"><el-form-item label="地址" prop="address">
                            <el-input v-model="formAdd.address" placeholder="请输入名称" />
                          </el-form-item></el-col>
                          <el-col :span="8" />
                        </el-row>
                      </el-card>
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span>问题信息</span>
                        </div>
                        <el-row :gutter="20">
                          <el-col :span="8"><el-form-item label="机器序列号" prop="m_sn">
                            <el-input v-model="formAdd.m_sn" placeholder="请输入机器序列号" />
                          </el-form-item></el-col>
                          <el-col :span="8"><el-form-item label="故障部位" prop="broken_part">
                            <el-input v-model="formAdd.broken_part" placeholder="请输入故障部位" />
                          </el-form-item></el-col>
                          <el-col :span="8" />
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="20"><el-form-item label="故障描述" prop="description">
                            <el-input v-model="formAdd.description" placeholder="请输入故障描述" />
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
                              <el-button type="danger" @click="handleCancelAdd">清除表单</el-button>
                              <el-button type="primary" @click="handleSubmitAdd">立即保存</el-button>
                            </div>
                          </el-form-item></el-col>
                        </el-row>
                      </el-card>

                    </el-form>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>任务执行单信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="6"><el-form-item label="是否完成" prop="is_complete">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="formEdit.is_complete"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </template>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="是否结束" prop="is_over">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="formEdit.is_over"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </template>
                </el-form-item></el-col>
              </el-row>
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
              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="任务说明" prop="content">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入操作内容"
                    v-model="formEdit.content">
                  </el-input>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="备注" prop="memo">
                  <el-input v-model="formEdit.memo" placeholder="请输入收货地址" />
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
          <input ref="files" type="file" multiple="multiple" @change="getFile($event)">
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
      title="文档查看"
      :visible.sync="filesViewVisible"
      width="55%"
      border
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="margin: auto">
        <el-table :data="fileDetails">
          <el-table-column
            label="文件名"
            prop="name"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="文件类型"
            prop="suffix"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.suffix }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="文件链接"
            prop="suffix"
            width="120px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.is_pic">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.url"
                  :preview-src-list="scope.row.url_list">
                </el-image>
              </div>
              <div v-else>
                <el-link :href="scope.row.url" target="_blank">{{ scope.row.name }}</el-link>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            label="创建者"
            prop="creator"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.creator }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="created_time"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.created_time }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleDeleteFile(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>


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
  getJobOrderDetailsPerform,
  createJobOrderDetailsPerform,
  updateJobOrderDetailsPerform,
  exportJobOrderDetailsPerform,
  excelImportJobOrderDetailsPerform,
  checkJobOrderDetailsPerform,
  rejectJobOrderDetailsPerform,
  signJobOrderDetailsPerform,
  batchTextJobOrderDetailsPerform,
  fileImportJobOrderDetailsPerform,
  setOverJobOrderDetailsPerform,
  setCompleteJobOrderDetailsPerform
 } from '@/api/wop/job/details/perform'
import {
  getManualOrderSubmitList,
  createManualOrderSubmit,
  updateManualOrderSubmit,
} from '@/api/dfc/manualorder/manualorder'
import { getLabel } from '@/api/crm/labels/label/label'
import { getCustomerLabel, getLogCustomerLabel } from '@/api/crm/customers/cslabels'
import { getJobCategory } from '@/api/wop/job/base/category'
import { getCompanyList } from '@/api/base/company'
import { getLogJobOrderDetails, getFilesJobOrderDetails } from '@/api/wop/job/details/manage'
import { deleteJobDetailsFile } from '@/api/wop/job/details/jodfiles'
import { getShopList } from '@/api/base/shop'
import { getGoodsList } from '@/api/base/goods'
import { getWarehouse } from "@/api/base/warehouse"
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'performJobOrderDetails',
  data() {
    return {
      DataList: [],
      tableLoading: false,
      totalNum: 0,
      pageSize: 30,
      selectNum: 0,
      checkList: [],
      fileData: {},
      importFiles: [],
      fileDetails: [],
      activeNames: ['1', '2'],
      tableData: {},
      customer_info: {},
      customer_params: {},
      updatetext: '',
      params: {
        page: 1,
        allSelectTag: 0
      },
      dialogVisibleEdit: false,
      logViewVisible: false,
      logDetails: [],
      filesViewVisible: false,
      importVisible: false,

      formAdd: {
        warehouse: 2,
        servicer: this.$store.state.user.name,
      },
      formEdit: {},
      optionsLabel: [],
      optionsShop: [],
      optionsGoods: [],
      optionsWarehouse: [
        {
          value: 2,
          label: '中外运苏州配件仓'
        },
      ],
      optionsCategory: [
        {
          value: 1,
          label: '质量问题'
        },
        {
          value: 2,
          label: '开箱即损'
        },
        {
          value: 3,
          label: '礼品赠品'
        }
      ],
      optionsExpress: [
        {
          value: 0,
          label: '随机'
        },
        {
          value: 1,
          label: '顺丰'
        },
        {
          value: 2,
          label: '圆通'
        },
        {
          value: 3,
          label: '韵达'
        }
      ],
      optionsJobCategory: [],
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
        shop: [
          { required: true, message: '请选择店铺', trigger: 'blur', type: 'number' }
        ],
        order_id: [
          { required: true, message: '请输入源单号', trigger: 'blur' }
        ],
        receiver: [
          { required: true, message: '请输入收件人', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        order_category: [
          { required: true, message: '请选择类型', trigger: 'blur', type: 'number' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
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
      // console.log(this.params.created_time)
      if (typeof (this.params.created_time) !== 'undefined') {
        if (this.params.created_time.length === 2) {
          this.params.created_time_after = moment.parseZone(this.params.created_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.created_time_before = moment.parseZone(this.params.created_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getJobOrderDetailsPerform(this.params).then(
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
            duration: 5000
          })
        }
      )
    },

    // 关闭添加界面
    handleCancelAdd() {
      this.$refs.handleFormAdd.resetFields()
    },
    handleSubmitAdd() {
      console.log(this.formAdd)
      console.log(this.OrderDetailsList)
      this.formAdd.goods_details = this.OrderDetailsList
      createManualOrderSubmit(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
          this.$notify({
            title: '创建成功',
            message: "单据创建成功，请在手工单界面递交订单！",
            type: 'error',
            offset: 210,
            duration: 3000
          })
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

    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    },
    // 跳出编辑对话框
    handleEdit(values) {
      console.log(values)
      this.formEdit = { ...values }
      this.customer_params = {
        name: values.customer.name
      }
      getCustomerLabel(this.customer_params).then(
        res => {
          this.customer_info = res.data.results[0]
          this.$notify({
            title: '客户信息取值成功',
            message: '完成客户标签取值',
            type: 'successful',
            offset: 0,
            duration: 3000
          })
        }
      ).catch(
        (error) => {
          this.$notify({
            title: '客户标签取值失败',
            message: error.data,
            type: 'error',
            offset: 0,
            duration: 5000
          })
        }
      )

      // this.optionsLabel = [{ label: this.formEdit.label.name, value: this.formEdit.label.id }]
      // this.formEdit.label = this.formEdit.label.id
      // this.optionsJobCategory = [{ label: this.formEdit.category.name, value: this.formEdit.category.id }]
      // this.formEdit.category = this.formEdit.category.id
      let attrStr
      const transFieldStr = ['mistake_tag', 'process_tag', 'order_status']
        for (attrStr in transFieldStr) {
          this.formEdit[transFieldStr[attrStr]] = this.formEdit[transFieldStr[attrStr]].id
        }
      this.dialogVisibleEdit = true
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      const { id, ...data } = this.formEdit
      delete data.order
      delete data.customer
      updateJobOrderDetailsPerform(id, data).then(
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
    },

    // 提交编辑完成的数据
    handleEditAddLabel(value) {
      let id = value.id
      const data = {
        add_label: value.add_label
      }
      updateJobOrderDetailsPerform(id, data).then(
        () => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 0,
            duration: 3000
          })
          this.fetchData()
        },
        err => {
          this.$notify({
            title: '修改出错',
            message: err.data,
            type: 'error',
            offset: 0,
            duration: 5000
          })
        }
      )

    },
    // 提交编辑完成的数据
    handleEditjobindex(value) {
      let id = value.id
      const data = {
        job_index: value.job_index
      }
      updateJobOrderDetailsPerform(id, data).then(
        () => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 0,
            duration: 3000
          })
          this.fetchData()
        },
        err => {
          this.$notify({
            title: '修改出错',
            message: err.data,
            type: 'error',
            offset: 0,
            duration: 5000
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
            exportJobOrderDetailsPerform(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    任务名: item.order.name,
                    任务编码: item.order.code,
                    客户: item.customer.name,
                    标签名: item.order.label,
                    任务说明: item.order.info,
                    任务关键字: item.order.keywords,
                    添加标签: item.add_label,
                    删除标签: item.del_label,
                    是否完成: item.is_complete,
                    是否结束: item.is_over,
                    是否重置: item.is_reset,
                    操作内容: item.content,
                    领取人: item.handler,
                    领取时间: item.handle_time,
                    领取间隔: item.handle_interval,
                    完成人: item.completer,
                    完成时间: item.completed_time,
                    完成间隔: item.completed_interval,
                    审核人: item.checker,
                    审核时间: item.checked_time,
                    审核间隔: item.checked_interval,
                    确认人: item.confirmer,
                    确认时间: item.confirmed_time,
                    确认间隔: item.confirmed_interval,
                    服务金额: item.cost,
                    任务指数: item.job_index,
                    创建时间: item.created_time,
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
    // 锁定单据
    handleSign() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        signJobOrderDetailsPerform(this.params).then(
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
        signJobOrderDetailsPerform(this.params).then(
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
    // 批量添加操作内容
    handleBatchAddLabel() {
      this.$prompt('请输入操作内容', '批量添加操作内容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputErrorMessage: '输入不能为空',
        inputValidator: (value) => {
          if(!value) {
            return '输入不能为空';
          }
        }
      }).then(
        ({ value }) => {
          this.params.data = {
            add_label: value
          }
          if (this.params.allSelectTag === 1) {
            batchTextJobOrderDetailsPerform(this.params).then(
              res => {
                if (res.data.successful !== 0) {
                  this.$notify({
                    title: '添加成功',
                    message: `添加成功条数：${res.data.successful}`,
                    type: 'success',
                    offset: 70,
                    duration: 3000
                  })
                }
                if (res.data.false !== 0) {
                  this.$notify({
                    title: '添加失败',
                    message: `添加失败条数：${res.data.false}`,
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
            batchTextJobOrderDetailsPerform(this.params).then(
              res => {
                if (res.data.successful !== 0) {
                  this.$notify({
                    title: '添加成功',
                    message: `添加成功条数：${res.data.successful}`,
                    type: 'success',
                    offset: 70,
                    duration: 3000
                  })
                }
                if (res.data.false !== 0) {
                  this.$notify({
                    title: '添加失败',
                    message: `添加失败条数：${res.data.false}`,
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
        }).catch(
        (error) => {
          this.$notify({
            title: '修改失败',
            message: `修改失败：${error.data}`,
            type: 'error',
            offset: 70,
            duration: 3000
          })
          this.fetchData()
        })
    },
    // 批量添加操作内容
    handleBatchContent() {
      this.$prompt('请输入操作内容', '批量添加操作内容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: this.updatetext,
        inputErrorMessage: '输入不能为空',
        inputValidator: (value) => {
          if(!value) {
            return '输入不能为空';
          }
        }
      }).then(
        ({ value }) => {
          console.log(value)
          let CurrentTimeStamp = new Date()
          let SubmitTimeStamp = CurrentTimeStamp.toLocaleDateString()
          value = `${value} {${this.$store.state.user.name}-${SubmitTimeStamp}}`
          this.params.data = {
            content: value
          }
          console.log(this.params)
          if (this.params.allSelectTag === 1) {
            batchTextJobOrderDetailsPerform(this.params).then(
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
            batchTextJobOrderDetailsPerform(this.params).then(
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
        }).catch(
        (error) => {
          this.$notify({
            title: '修改失败',
            message: `修改失败：${error.data}`,
            type: 'error',
            offset: 70,
            duration: 3000
          })
          this.fetchData()
        })
    },
    // 批量设置结束
    handleBatchSetOver() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setOverJobOrderDetailsPerform(this.params).then(
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
        setOverJobOrderDetailsPerform(this.params).then(
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
    // 批量设置完成
    handleBatchSetComplete() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setCompleteJobOrderDetailsPerform(this.params).then(
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
        setCompleteJobOrderDetailsPerform(this.params).then(
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
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkJobOrderDetailsPerform(this.params).then(
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
        checkJobOrderDetailsPerform(this.params).then(
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
    // 取消单据
    handleReject() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '清除锁定',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '清除锁定会清除领取人！'),
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
              rejectJobOrderDetailsPerform(this.params).then(
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
                      duration: 5000
                    })
                    this.$notify({
                      title: '失败错误详情',
                      message: res.data.error,
                      type: 'error',
                      offset: 210,
                      duration: 5000
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
                    duration: 5000
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
                  duration: 5000
                })
                instance.confirmButtonLoading = false
                done()
                this.fetchData()
              }
              const ids = this.multipleSelection.map(item => item.id)
              this.params.ids = ids
              rejectJobOrderDetailsPerform(this.params).then(
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
                      duration: 5000
                    })
                    this.$notify({
                      title: '失败错误详情',
                      message: res.data.error,
                      type: 'error',
                      offset: 210,
                      duration: 5000
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
                    duration: 5000
                  })
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
        (error) => {
          this.$notify({
            title: '异常错误详情',
            message: error.data,
            type: 'error',
            offset: 210,
            duration: 5000
          })
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
    // 编辑丢件返回信息
    handleEditBoolean(row) {
      let id = row.id
      const data = {
        is_over: row.is_over,
        is_complete: row.is_complete,
      }
      updateJobOrderDetailsPerform(id, data).then(
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
            type: 'success',
            offset: 70,
            duration: 5000
          })
          this.fetchData()
        }
      )
    },
    // 类型搜索
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
    // 类型搜索
    remoteMethodJobCategory(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getJobCategory(paramsSearch).then(
            res => {
              this.optionsJobCategory = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.optionsJobCategory = []
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
    // 店铺搜索
    remoteMethodWarehouse(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
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
    // 图片上传模块  getJobCategory
    handleFileUpload(userValue) {
      this.fileData.id = userValue.id
      this.importVisible = true

    },
    getFile(event) {
      // const filetypes =[".jpg",".png"]
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
            duration: 5000
          })
          this.$refs.files.type = 'text'
          this.$refs.files.value = ''
          this.$refs.files.type = 'file'
          this.importFiles = []
          return false
        }
        // for (let i = 0; i < filetypes.length; i++) {
        //   if (filetypes[i] == suffix_name) {
        //     verify_type = true
        //     break
        //   }
        // }
        // if (!verify_type) {
        //   this.$notify({
        //     title: '错误详情',
        //     message: '文件只支持png,jpg',
        //     type: 'error',
        //     offset: 70,
        //     duration: 0
        //   })
        //   this.$refs.files.type = 'text'
        //   this.$refs.files.value = ''
        //   this.$refs.files.type = 'file'
        //   this.importFiles = []
        //   return false
        // }
        this.importFiles.push(file)
      }
    },
    importPhotoes() {
      const importformData = new FormData()
      for (let i = 0; i < this.importFiles.length; i++) {
        importformData.append('files', this.importFiles[i])
      }
      importformData.append('id', this.fileData.id)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.tableLoading = true
      fileImportJobOrderDetailsPerform(importformData, config).then(
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
      this.$refs.files.type = 'text'
      this.$refs.files.value = ''
      this.$refs.files.type = 'file'
      this.importFiles = []
      this.importVisible = false
    },
    // 查看文档
    handlePhotoView(userValue) {
      this.fileDetails = []
      this.filesViewVisible = true
      const data = {
        id: userValue.id
      }
      getFilesJobOrderDetails(data).then(
        res => {
          this.$notify({
            title: '查询成功',
            type: 'success',
            duration: 1000
          })
          this.fileDetails = res.data
        }).catch(
        (error) => {
          console.log('1')
          this.$notify({
            title: '查询错误',
            message: error.data,
            type: 'error',
            duration: 5000
          })
        }
      )
    },
    // 删除文档
    handleDeleteFile(row) {
      const data = {
        id: row.id
      }
      deleteJobDetailsFile(data).then(
        (res) => {
          if (res.data.successful > 0){
            this.$notify({
              title: '删除成功',
              type: 'success',
              message: `删除成功条数：${res.data.successful}`,
              offset: 70,
              duration: 3000
            })
            this.fetchData()
          }
          if (res.data.false > 0) {
            this.$notify({
              title: '删除失败',
              type: 'error',
              message: `删除失败错误：已删除或者无权限`,
              offset: 70,
              duration: 5000
            })
            this.fetchData()
          }
        }).catch(
        (error) => {
          this.$notify({
            title: '错误详情',
            message: error.data,
            type: 'error',
            offset: 70,
            duration: 5000
          })
        }
      )
    },
    // 查看日志
    logView(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogJobOrderDetails(data).then(
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
    // 查看客户日志
    logViewCustomer(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      console.log('-----------------------------------------')
      console.log(userValue)
      console.log('-----------------------------------------')
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
            duration: 5000
          })
        }
      )
    },
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'content') {
        this.handleContent(row)
      } else if (column.property === 'memo') {
        this.handleMemo(row)
      }
    },
    handleContent(row) {
      this.$prompt('请输入操作内容', '添加操作内容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.content,
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
            content: value
          }
          updateJobOrderDetailsPerform(id, data).then(
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
                duration: 5000
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
            duration: 3000
          })
          this.fetchData()
        })
    },
    handleMemo(row) {
      this.$prompt('请输入操作内容', '添加操作内容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.memo,
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
            memo: value
          }
          updateJobOrderDetailsPerform(id, data).then(
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
                duration: 5000
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
            duration: 3000
          })
          this.fetchData()
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
    // 删除全部表单货品项
    handleDeleteAllDetails() {
      this.OrderDetailsList = undefined
    },

    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.is_complete === true) {
        row_style = {
          backgroundColor: 'PaleGreen'
        }
      } else if (row.is_over === true) {
        row_style = {
          backgroundColor: 'lightcyan'
        }
      }
      return row_style
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
