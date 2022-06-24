<template>
  <div class="satisfaction-create-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="6" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核工单</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleFix">修复工单</el-button></el-dropdown-item>
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
        <el-col :span="3" class="titleBar">
        <div class="grid-content bg-purple">
          <el-tooltip class="item" effect="dark" content="点击显示我创建的工单" placement="top-start">
            <el-button type="success" @click="myWorkOrder">我的工单</el-button>
          </el-tooltip>
        </div>

      </el-col>
        <el-col :span="4" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.mobile" class="grid-content bg-purple" placeholder="请输入手机号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="4" class="titleBar">
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
              <el-button type="primary" @click="add">新增</el-button>
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
                      <el-col :span="6"><el-form-item label="货品" prop="goods_name">
                        <template>
                          <el-select
                            v-model="params.goods_name"
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
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="事项类型" prop="category">
                        <el-select v-model="params.category" placeholder="请选择事项类型">
                          <el-option
                            v-for="item in optionsCategory"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="原始编号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="用户ID" prop="nickname">
                        <el-input v-model="params.nickname" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="客户姓名" prop="receiver">
                        <el-input v-model="params.receiver" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="诉求" prop="demand">
                        <el-input v-model="params.demand" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="初始信息" prop="information">
                        <el-input v-model="params.information" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="是否微友">
                        <el-select v-model="params.is_friend" placeholder="是否微友">
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
                      <el-col :span="6"><el-form-item label="微信ID" prop="cs_wechat">
                        <el-input v-model="params.cs_wechat" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="专属客服" prop="specialist">
                        <el-input v-model="params.specialist" type="text" />
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
          label="原始单编号"
          prop="order_id"
          sortable="custom"
          width="120px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原始单标题"
          prop="title"
          sortable="custom"
          width="120px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原始单类型"
          prop="category"
          sortable="custom"
          width="120px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.category.name }}</span>
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
          label="用户ID"
          prop="nickname"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="接洽电话"
          prop="mobile"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          prop="quantity"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="诉求"
          prop="demand"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.demand }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="问题描述"
          prop="information"
          width="260px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.information }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="客户姓名"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.receiver }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客户地址"
          prop="address"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="机器SN"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.m_sn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买时间"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.purchase_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买时长"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.purchase_interval }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否企微好友"
          prop="is_friend"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_friend"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="微信ID"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cs_wechat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="专属客服"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.specialist }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文档上传"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handlePhotoUpload(scope.row)">上传</el-button>
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
        >
          <template slot-scope="scope">
            <span>{{ scope.row.memo }}</span>
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
            <span>客户相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="事项类型" prop="category">
              <el-select v-model="formAdd.category" placeholder="请选择事项类型">
                <el-option
                  v-for="item in optionsCategory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="用户ID" prop="nickname">
              <el-input v-model="formAdd.nickname" placeholder="请输入用户ID" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="接洽电话" prop="mobile">
              <el-input v-model="formAdd.mobile" placeholder="请输入原始工单标题" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="客户姓名" prop="receiver">
              <el-input v-model="formAdd.receiver" placeholder="请输入原始工单标题" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="客户地址" prop="address">
              <el-input v-model="formAdd.address" placeholder="请输入原始工单标题" />
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>问题相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="货品" prop="goods_name">
              <template>
                <el-select
                  v-model="formAdd.goods_name"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择货品"
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
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="货品数量" prop="quantity">
              <el-input type="number" v-model="formAdd.quantity" placeholder="请输入原始工单标题" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="机器SN" prop="m_sn">
              <el-input v-model="formAdd.m_sn" placeholder="请输入机器SN" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="购买时间" prop="purchase_time">
              <el-date-picker
                v-model="formAdd.purchase_time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="诉求" prop="demand">
              <el-input v-model="formAdd.demand" placeholder="请输入诉求" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="问题描述" prop="information">
              <el-input type="textarea" :rows="7" v-model="formAdd.information" placeholder="请输入问题描述" />
            </el-form-item></el-col>
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>其他信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6"><el-form-item label="是否微友" prop="is_friend">
              <template slot-scope="scope">
                <el-switch
                  v-model="formAdd.is_friend"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
              </template>
            </el-form-item></el-col>
            <el-col :span="10"><el-form-item label="微信ID" prop="cs_wechat">
              <el-input v-model="formAdd.cs_wechat" placeholder="请输入微信ID" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><el-form-item label="专属客服" prop="specialist">
              <el-input v-model="formAdd.specialist" placeholder="请输入专属客服" />
            </el-form-item></el-col>
            <el-col :span="8" />
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="工单留言" prop="memo">
              <el-input v-model="formAdd.memo" placeholder="请输入留言" />
            </el-form-item></el-col>
            <el-col :span="8" />
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
                <el-col :span="8"><el-form-item label="事项类型" prop="category">
                  <el-select v-model="formEdit.category" placeholder="请选择事项类型">
                    <el-option
                      v-for="item in optionsCategory"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="用户ID" prop="nickname">
                  <el-input v-model="formEdit.nickname" placeholder="请输入用户ID" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="接洽电话" prop="mobile">
                  <el-input v-model="formEdit.mobile" placeholder="请输入原始工单标题" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="客户姓名" prop="name">
                  <el-input v-model="formEdit.receiver" placeholder="请输入原始工单标题" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="客户地址" prop="address">
                  <el-input v-model="formEdit.address" placeholder="请输入原始工单标题" />
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>问题相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="货品" prop="goods_name">
                  <template>
                    <el-select
                      v-model="formEdit.goods_name"
                      filterable
                      default-first-option
                      remote
                      reserve-keyword
                      placeholder="请选择公司"
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
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="货品数量" prop="quantity">
                  <el-input type="number" v-model="formEdit.quantity" placeholder="请输入原始工单标题" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="机器SN" prop="m_sn">
                  <el-input v-model="formEdit.m_sn" placeholder="请输入机器SN" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="购买时间" prop="purchase_time">
                  <el-date-picker
                    v-model="formEdit.purchase_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                  </el-date-picker>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="诉求" prop="demand">
                  <el-input v-model="formEdit.demand" placeholder="请输入诉求" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="问题描述" prop="information">
                  <el-input type="textarea" :rows="7" v-model="formEdit.information" placeholder="请输入问题描述" />
                </el-form-item></el-col>
              </el-row>
            </el-card>

            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>其他信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="6"><el-form-item label="是否企微好友" prop="is_friend">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="formEdit.is_friend"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    />
                  </template>
                </el-form-item></el-col>
                <el-col :span="10"><el-form-item label="微信ID" prop="wechat_id">
                  <el-input v-model="formEdit.wechat_id" placeholder="请输入微信ID" />
                </el-form-item></el-col>
                <el-col :span="8" />
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6"><el-form-item label="是否理赔" prop="is_losing">
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
                  <el-input v-model="formEdit.memo" placeholder="请输入留言" />
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
      title="文档查看"
      :visible.sync="photoViewVisible"
      width="50%"
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
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
  getWorkOrderHandle,
  createWorkOrderHandle,
  updateWorkOrderHandle,
  exportWorkOrderHandle,
  excelImportWorkOrderHandle,
  photoImportWorkOrderHandle,
  checkWorkOrderHandle,
  fixWorkOrderHandle,
  rejectWorkOrderHandle
} from '@/api/wop/satisfaction/orisatisfaction/handle'
import { deleteOSWOFiles } from '@/api/wop/satisfaction/oswofiles/manage'
import { getGoodsList } from '@/api/base/goods'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'submitExpressWorkOrderHandle',

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
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      importVisible: false,
      photoViewVisible: false,
      formAdd: {},
      formEdit: {},
      photoData: {},
      fileDetails: [],
      importFiles: [],
      url: '',
      optionsShop: [],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      optionsCity: [],
      optionsGoods: [],
      optionsCategory: [
        { value: 1, label: '超期退货' },
        { value: 2, label: '超期换货' },
        { value: 3, label: '过保维修' },
        { value: 4, label: '升级投诉' },
        { value: 5, label: '其他' }
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
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入原始电话', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入接洽电话', trigger: 'blur' }
        ],
        purchase_time: [
          { required: true, message: '请输入购买时间', trigger: 'blur' }
        ],
        goods_name: [
          { required: true, message: '请选择货品', trigger: 'blur', type: 'number' }
        ],
        quantity: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ],
        receiver: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入客户地址', trigger: 'blur' }
        ],
        demand: [
          { required: true, message: '请输入诉求', trigger: 'blur' }
        ],
        information: [
          { required: true, message: '请选择描述信息', trigger: 'blur' }
        ]
      }
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
    myWorkOrder() {
      this.params.creator = this.$store.state.user.name
      this.fetchData()
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

      this.optionsGoods = [{ label: this.formEdit.goods_name.name, value: this.formEdit.goods_name.id }]
      this.formEdit.goods_name = this.formEdit.goods_name.id

      this.formEdit.mistake_tag = this.formEdit.mistake_tag.id
      this.formEdit.order_status = this.formEdit.order_status.id
      this.formEdit.category = this.formEdit.category.id
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      this.$refs.handleFormEdit.validate(valid => {
        if (!valid) {
          return
        }
        const { id, ...data } = this.formEdit
        updateWorkOrderHandle(id, data).then(
          () => {
            this.$notify({
              title: '更新成功',
              type: 'success',
              offset: 70,
              duration: 3000
            })
            this.dialogVisibleEdit = false
            this.fetchData()
          }).catch(
          (error) => {
            this.$notify({
              title: '错误详情',
              message: error.data,
              type: 'error',
              offset: 70,
              duration: 0
            })
            this.dialogVisibleEdit = false
            this.fetchData()
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
      createWorkOrderHandle(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch((res) => {
        console.log(res)
        this.$notify({
          title: '错误详情',
          message: res.data,
          type: 'error',
          offset: 70,
          duration: 0
        })
      })
    },
    // 图片上传模块
    handlePhotoUpload(userValue) {
      this.photoData.id = userValue.id
      this.importVisible = true

    },
    getFile(event) {
      let fileSize = 0
      for (var i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i]
        let suffix_name = file.name.substring(file.name.indexOf('.'))
        console.log(suffix_name)
        fileSize = file.size / 1048576
        console.log(fileSize)
        if (fileSize > this.$store.state.user.uploadSize) {
          this.$notify({
            title: '错误详情',
            message: '文件最大20M',
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
      photoImportWorkOrderHandle(importformData, config).then(
        res => {
          this.$notify({
            title: '导入结果',
            message: res.data,
            type: 'success',
            duration: 0
          })
          this.$refs.photofiles.type = 'text'
          this.$refs.photofiles.value = ''
          this.$refs.photofiles.type = 'file'
          this.importFiles = []
          this.importVisible = false
          this.fetchData()
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
      this.importFiles = []
      this.importVisible = false
    },
    // 查看图片
    handlePhotoView(userValue) {
      console.log(userValue)
      this.photoViewVisible = true
      this.fileDetails = userValue.file_details
    },
    // 查看图片
    handleDelete(row) {
      let id = row.id
      deleteOSWOFiles(id).then(
        (res) => {
          this.$notify({
            title: '删除成功',
            type: 'success',
            offset: 70,
            duration: 3000
          })
          this.photoViewVisible = false
          this.fetchData()
        }).catch(
        (error) => {
          this.$notify({
            title: '错误详情',
            message: error.data,
            type: 'error',
            offset: 70,
            duration: 0
          })
        }
      )
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
            excelImportWorkOrderHandle(importformData, config).then(
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
          this.$notify({
            title: '失败原因',
            message: error.data,
            type: 'success',
            duration: 0
          })
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
            exportWorkOrderHandle(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    原始工单编号: item.order_id,
                    原始工单类型: item.category.name,
                    原始工单标题: item.title,
                    用户ID: item.nickname,
                    接洽电话: item.mobile,
                    购买时间: item.purchase_time,
                    购买时长: item.purchase_interval,
                    货品名称: item.goods_name.name,
                    货品数量: item.quantity,
                    机器SN: item.m_sn,
                    客户姓名: item.receiver,
                    客户地址: item.address,
                    是否微友: item.is_friend,
                    微信ID: item.cs_wechat,
                    专属客服: item.specialist,
                    诉求: item.demand,
                    问题描述: item.information,
                    备注: item.memo,
                    错误原因: item.mistake_tag.name,
                    工单状态: item.order_status.name,
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
        checkWorkOrderHandle(this.params).then(
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
        checkWorkOrderHandle(this.params).then(
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
    handleFix() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        fixWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '修复成功',
                message: `修复成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '修复失败',
                message: `修复失败条数：${res.data.false}`,
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
        fixWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '修复成功',
                message: `修复成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '修复失败',
                message: `修复失败条数：${res.data.false}`,
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
              rejectWorkOrderHandle(this.params).then(
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
            duration: 0
          })
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
        this.optionsGoods = []
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
        this.optionsCompany = []
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
