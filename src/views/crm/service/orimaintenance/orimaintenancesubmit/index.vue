<template>
  <div class="ori-maintenance-order-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleDecrypt">解密</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleRelateGoods">关联货品</el-button></el-dropdown-item>
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
        <el-col :span="2" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="筛选所有未标记过的异常单" placement="top-start">
              <el-button type="success" @click="handleNotDecrypt">未解密</el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="支持多单号搜索" placement="top-start">
              <el-input v-model="params.order_id" class="grid-content bg-purple" placeholder="请输入保修单号" @keyup.enter.native="fetchData">
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
                      <el-col :span="6"><el-form-item label="异常类别" prop="process_tag__in">
                        <template>
                          <el-select
                            v-model="params.mistake_tag__in"
                            multiple
                            filterable
                            default-first-option
                            reserve-keyword
                            placeholder="请选择错误类别"
                          >
                            <el-option
                              v-for="item in optionsProcess"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="标记名称" prop="sign__in">
                        <template>
                          <el-select
                            v-model="params.sign__in"
                            filterable
                            default-first-option
                            reserve-keyword
                            placeholder="请选择错误类别"
                          >
                            <el-option
                              v-for="item in optionsSign"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="店铺" prop="shop">
                        <el-input v-model="params.shop" type="text" />
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="客户手机" prop="return_mobile">
                        <el-input v-model="params.return_mobile" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="故障类型" prop="fault_type">
                        <el-input v-model="params.fault_type" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="原创建者" prop="ori_creator">
                        <el-input v-model="params.ori_creator" type="text" />
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="序列号" prop="machine_sn">
                        <el-input v-model="params.machine_sn" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="收件人" prop="return_name">
                        <el-input v-model="params.return_name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="收件单号" prop="send_logistics_no">
                        <el-input v-model="params.send_logistics_no" type="text" />
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12"><el-form-item label="购买时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.purchase_time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                        </div>
                      </el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="审核时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.handle_time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                        </div>
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12"><el-form-item label="原单创建时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.ori_created_time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                        </div>
                      </el-form-item></el-col>
                      <el-col :span="12"><el-form-item label="完成时间">
                        <div class="block">
                          <el-date-picker
                            v-model="params.finish_time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          />
                        </div>
                      </el-form-item></el-col>
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
          label="店铺"
          prop="shop"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shop }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修单号"
          prop="order_id"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误标签"
          prop="mistake_tag"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mistake_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄件备注"
          prop="return_memory"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_memory }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否解密"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_decrypted"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="寄回客户姓名"
          prop="return_name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄回客户手机"
          prop="return_mobile"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄回省市区"
          prop="return_area"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_area }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄回地址"
          prop="return_address"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="序列号"
          prop="machine_sn"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.machine_sn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="关联货品"
          prop="goods"
          sortable="custom"
          width="180"
          :sort-orders="['ascending','descending']"

        >
          <template slot-scope="scope">
            <div v-if="scope.row.goods.id==-1">
              <template>
                <el-select
                  v-model="scope.row.goods.id"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择货品"
                  :remote-method="remoteMethodGoods"
                  @change="confirmSign(scope.row)"
                >
                  <el-option
                    v-for="item in optionsGoods"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </div>
            <div v-else>
              <span>{{ scope.row.goods.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="保修货品名称"
          prop="goods_name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否二次返修"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_repeated"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="是否标记返修"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_month_filter"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
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
          label="保修类型"
          prop="maintenance_type"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.maintenance_type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修结束语"
          prop="appraisal"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.appraisal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="故障类型"
          prop="fault_type"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.fault_type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="故障描述"
          prop="description"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建人"
          prop="ori_creator"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ori_creator }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核人"
          prop="handler_name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.handler_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理登记人"
          prop="completer"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.completer }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买时间"
          prop="purchase_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.purchase_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="ori_created_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ori_created_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间"
          prop="handle_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.handle_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修完成时间"
          prop="finish_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.finish_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最后修改时间"
          prop="last_handle_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.last_handle_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="送修类型"
          prop="transport_type"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.transport_type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客户网名"
          prop="goods_type"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_type }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件物流公司"
          prop="send_logistics_company"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.send_logistics_company }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件物流单号"
          prop="send_logistics_no"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.send_logistics_no }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件备注"
          prop="send_memory"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.send_memory }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="寄件指定物流公司"
          prop="return_logistics_company"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_logistics_company }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄件物流单号"
          prop="return_logistics_no"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_logistics_no }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="保修货品商家编码"
          prop="goods_code"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_code }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="保修数量"
          prop="ori_created_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ori_created_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="关联订单号"
          prop="send_order_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.send_order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否在保修期内"
          prop="is_guarantee"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.is_guarantee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修金额"
          prop="fee"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.fee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收费状态"
          prop="charge_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.charge_status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收费金额"
          prop="charge_amount"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.charge_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收费说明"
          prop="charge_memory"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.charge_memory }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修单状态"
          prop="ori_order_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ori_order_status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="created_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.created_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="update_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.updated_time }}</span>
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
            :rules="rules"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>客户相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="6"><el-form-item label="客户网名" prop="buyer_nick">
                  <el-input v-model="formEdit.buyer_nick" placeholder="请输入客户网名" />
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="寄件客户姓名" prop="sender_name">
                  <el-input v-model="formEdit.sender_name" placeholder="请输入客户网名" />
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="寄件客户手机" prop="sender_mobile">
                  <el-input v-model="formEdit.sender_mobile" placeholder="请输入客户网名" />
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="寄件客户省市县" prop="sender_area">
                  <el-input v-model="formEdit.sender_area" placeholder="请输入客户网名" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="收货地址" prop="sender_address">
                  <el-input v-model="formEdit.sender_address" placeholder="请输入收货地址" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="收发仓库" prop="warehouse">
                  <el-input v-model="formEdit.warehouse" placeholder="请输入收发仓库" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="关联订单号" prop="send_order_id">
                  <el-input v-model="formEdit.send_order_id" placeholder="请输入关联订单号" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="保修类型" prop="maintenance_type">
                  <el-input v-model="formEdit.maintenance_type" placeholder="请输入保修类型" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="故障类型" prop="fault_type">
                  <el-input v-model="formEdit.fault_type" placeholder="请输入故障类型" />
                </el-form-item></el-col>
              </el-row>

            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>货品信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="保修货品商家编码" prop="goods_code">
                  <el-input v-model="formEdit.goods_code" placeholder="请输入保修货品商家编码" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="保修货品名称" prop="goods_name">
                  <el-input v-model="formEdit.goods_name" placeholder="请输入保修货品名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="保修结束语" prop="appraisal">
                  <el-input v-model="formEdit.appraisal" placeholder="请输入保修结束语" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="送修类型" prop="transport_type">
                  <el-input v-model="formEdit.transport_type" placeholder="请输入送修类型" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="序列号" prop="machine_sn">
                  <el-input v-model="formEdit.machine_sn" placeholder="序列号" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="换新序列号" prop="new_machine_sn">
                  <el-input v-model="formEdit.new_machine_sn" placeholder="请输入换新序列号" />
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="关联店铺" prop="shop">
                  <el-input v-model="formEdit.shop" placeholder="请输入关联店铺" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6"><el-form-item label="购买时间" prop="purchase_time">
                  <el-date-picker
                    v-model="formEdit.purchase_time"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
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
  getOriMaintenanceSubmit,
  createOriMaintenanceSubmit,
  updateOriMaintenanceSubmit,
  exportOriMaintenanceSubmit,
  excelImportOriMaintenanceSubmit,
  checkOriMaintenanceSubmit,
  decryptOriMaintenanceSubmit,
  rejectOriMaintenanceSubmit,
  relateGoodsOriMaintenanceSubmit
} from '@/api/crm/service/orimaintenance/orimaintenancesubmit'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
import { getLogOriMaintenance } from "@/api/crm/service/orimaintenance/orimaintenance"
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'submitOriMaintenanceOrder',
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
      dialogVisibleEdit: false,
      formEdit: {},
      optionsMistake: [],
      logViewVisible: false,
      logDetails: [],
      optionsGoods: [
        {
          value: -1,
          label: '未关联货品'
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
        buyer_nick: [
          { required: true, message: '请选择客户网名', trigger: 'blur' }
        ]
      },
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
      if (typeof (this.params.purchase_time) !== 'undefined') {
        if (this.params.purchase_time.length === 2) {
          this.params.purchase_time_after = moment.parseZone(this.params.purchase_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.purchase_time_before = moment.parseZone(this.params.purchase_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (typeof (this.params.handle_time) !== 'undefined') {
        if (this.params.handle_time.length === 2) {
          this.params.handle_time_after = moment.parseZone(this.params.handle_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.handle_time_before = moment.parseZone(this.params.handle_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (typeof (this.params.ori_created_time) !== 'undefined') {
        if (this.params.ori_created_time.length === 2) {
          this.params.ori_created_time_time_after = moment.parseZone(this.params.ori_created_time_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.ori_created_time_time_before = moment.parseZone(this.params.ori_created_time_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (typeof (this.params.finish_time) !== 'undefined') {
        if (this.params.finish_time.length === 2) {
          this.params.finish_time_after = moment.parseZone(this.params.finish_timee[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.finish_time_before = moment.parseZone(this.params.finish_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getOriMaintenanceSubmit(this.params).then(
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
    handleNotDecrypt() {
      this.params.is_decrypted = false
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
      const transFieldStr = ['mistake_tag', 'order_status', 'process_tag']
      for (attrStr in transFieldStr) {
        data[transFieldStr[attrStr]] = data[transFieldStr[attrStr]].id
      }
      updateOriMaintenanceSubmit(id, data).then(
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
            console.log(importformData)
            excelImportOriMaintenanceSubmit(importformData, config).then(
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
        done(false)
      }).catch(
        (error) => {
          console.log(error)
          done(false)
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
            exportOriMaintenanceSubmit(this.params).then(
              res => {
                console.log(res)
                res.data = res.data.map(item => {
                  return {
                    保修单号: item.order_id,
                    保修单状态: item.order_status,
                    收发仓库: item.warehouse,
                    处理登记人: item.completer,
                    保修类型: item.maintenance_type,
                    故障类型: item.fault_type,
                    送修类型: item.transport_type,
                    序列号: item.machine_sn,
                    换新序列号: item.new_machine_sn,
                    关联订单号: item.send_order_id,
                    保修结束语: item.appraisal,
                    关联店铺: item.shop,
                    购买时间: item.purchase_time,
                    创建时间: item.ori_created_time,
                    创建人: item.ori_creator,
                    审核时间: item.handle_time,
                    审核人: item.handler_name,
                    保修完成时间: item.finish_time,
                    保修金额: item.fee,
                    保修数量: item.quantity,
                    最后修改时间: item.last_handle_time,
                    客户网名: item.buyer_nick,
                    寄件客户姓名: item.sender_name,
                    寄件客户手机: item.sender_mobile,
                    寄件客户省市县: item.sender_area,
                    寄件客户地址: item.sender_address,
                    收件物流公司: item.send_logistics_company,
                    收件物流单号: item.send_logistics_no,
                    收件备注: item.send_memory,
                    寄回客户姓名: item.return_name,
                    寄回客户手机: item.return_mobile,
                    寄回省市区: item.return_area,
                    寄回地址: item.return_address,
                    寄件指定物流公司: item.return_logistics_company,
                    寄件物流单号: item.return_logistics_no,
                    寄件备注: item.return_memory,
                    保修货品商家编码: item.goods_code,
                    保修货品名称: item.goods_name,
                    保修货品简称: item.goods_abbreviation,
                    故障描述: item.description,
                    是否在保修期内: item.is_guarantee,
                    收费状态: item.charge_status,
                    收费金额: item.charge_amount,
                    收费说明: item.charge_memory,
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
        checkOriMaintenanceSubmit(this.params).then(
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
        checkOriMaintenanceSubmit(this.params).then(
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
    // 解密单据
    handleDecrypt() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        decryptOriMaintenanceSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '解密成功',
                message: `解密成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '解密失败',
                message: `解密失败条数：${res.data.false}`,
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
        decryptOriMaintenanceSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '解密成功',
                message: `解密成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '解密失败',
                message: `解密失败条数：${res.data.false}`,
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
    // 解密单据
    handleRelateGoods() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        relateGoodsOriMaintenanceSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '关联成功',
                message: `关联成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '关联失败',
                message: `关联失败条数：${res.data.false}`,
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
        relateGoodsOriMaintenanceSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '关联成功',
                message: `关联成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '关联失败',
                message: `关联失败条数：${res.data.false}`,
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
              rejectOriMaintenanceSubmit(this.params).then(
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
                  duration: 0
                })
                instance.confirmButtonLoading = false
                done()
                this.fetchData()
              }
              const ids = this.multipleSelection.map(item => item.id)
              this.params.ids = ids
              rejectOriMaintenanceSubmit(this.params).then(
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
    // 货品搜索
    remoteMethodGoods(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          paramsSearch.goods_attribute = 1
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
    // 修改标记
    confirmSign(row) {
      console.log(row)
      const { id, ...details } = row
      const data = {
        goods: details.goods.id
      }
      console.log(data, id)
      updateOriMaintenanceSubmit(id, data).then(
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
    resetParams() {
      this.params = {
        page: 1
      }
    },
    // 查看日志
    logView(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogOriMaintenance(data).then(
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
    // 双击改内容
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'return_memory') {
        this.handleRetrunMemo(row)
      }
    },
    handleRetrunMemo(row) {
      this.$prompt('请输入备注', '添加备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.return_memory,
        inputErrorMessage: '输入不能为空',
        inputValidator: (value) => {
          if(!value) {
            return '输入不能为空';
          }
        }
      }).then(
        ({ value }) => {
          // let CurrentTimeStamp = new Date()
          // let SubmitTimeStamp = CurrentTimeStamp.toLocaleDateString()
          // value = `${value} {${this.$store.state.user.name}-${SubmitTimeStamp}}`
          let id = row.id
          let data = {
            return_memory: value
          }
          updateOriMaintenanceSubmit(id, data).then(
            () => {
              this.$notify({
                title: '修改成功',
                type: 'success',
                offset: 70,
                duration: 3000
              })
              this.fetchData()
            },
            err => {
              this.$notify({
                title: '修改失败',
                message: `修改失败：${err.data}`,
                type: 'error',
                offset: 70,
                duration: 5000
              })
            }
          )
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
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
