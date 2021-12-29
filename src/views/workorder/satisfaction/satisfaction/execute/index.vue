<template>
  <div class="satisfaction-handle-container">
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
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCreateService">创建服务</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">驳回工单</el-button></el-dropdown-item>
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
              <el-input v-model="params.mobile" class="grid-content bg-purple" placeholder="请输入手机" @keyup.enter.native="fetchData">
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
                      <el-col :span="6"><el-form-item label="工单标题" prop="title">
                        <el-input v-model="params.title" type="text" />
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
        :row-style="rowStyle"
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
          label="诉求"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.demand }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="进度"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.stage.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="下次预约时间"
          prop="appointment"
          sortable="custom"
          width="108px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.appointment }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="进度查看"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleProgressView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="进度新增"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="addProgress(scope.row)">新增</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="服务单花费"
          prop="cost"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cost }}</span>
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
              @change="handleEditBoolean(scope.row)"
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
            <span>{{ scope.row.specialist.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品"
          prop="goods_name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name.name }}</span>
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
        ref="handleFormAddView"
        label-width="88px"
        size="mini"
        :rules="rules"
        :model="workorder"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>工单相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6"><el-form-item label="工单标题" prop="title">
              <span>{{workorder.title}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="用户ID" prop="stage">
              <span>{{workorder.nickname}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="微信ID" prop="cs_wechat">
              <span>{{workorder.cs_wechat}}</span>
            </el-form-item></el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><el-form-item label="诉求" prop="demand">
              <span>{{workorder.demand}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="手机" prop="mobile">
              <span>{{workorder.mobile}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="专属客服" prop="specialist">
              <div v-if="workorder.specialist != undefined">
                <span>{{workorder.specialist.name}}</span>
              </div>
            </el-form-item></el-col>
          </el-row>
        </el-card>

      </el-form>

      <el-form
        ref="handleFormAdd"
        label-width="88px"
        size="mini"
        :rules="rules"
        :model="formAdd"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>进度相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="进度标题" prop="title">
              <el-input v-model="formAdd.title" placeholder="请输入进度标题" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="进度标签" prop="stage">
              <el-select v-model="formAdd.stage" placeholder="请选择进度标签">
                <el-option
                  v-for="item in optionsStage"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="动作" prop="action">
              <el-input v-model="formAdd.action" placeholder="请输入动作" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="下次预约" prop="appointment">
              <el-date-picker
                v-model="formAdd.appointment"
                type="datetime"
                placeholder="选择日期时间"
                default-time="9:00:00">
              </el-date-picker>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="内容" prop="content">
              <el-input type="textarea" :rows="7" v-model="formAdd.content" placeholder="请输入内容" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="16"><el-form-item label="备注" prop="memo">
              <el-input v-model="formAdd.memo" placeholder="请输入备注" />
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
      :visible.sync="dialogVisibleEdit"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        ref="handleFormAddView"
        label-width="88px"
        size="mini"
        :rules="rules"
        :model="workorder"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>工单相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="6"><el-form-item label="工单标题" prop="title">
              <span>{{workorder.title}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="用户ID" prop="stage">
              <span>{{workorder.nickname}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="微信ID" prop="cs_wechat">
              <span>{{workorder.cs_wechat}}</span>
            </el-form-item></el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><el-form-item label="诉求" prop="demand">
              <span>{{workorder.demand}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="手机" prop="mobile">
              <span>{{workorder.mobile}}</span>
            </el-form-item></el-col>
            <el-col :span="6"><el-form-item label="专属客服" prop="specialist">
              <span>{{workorder.specialist}}</span>
            </el-form-item></el-col>
          </el-row>
        </el-card>

      </el-form>
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
                <span>进度相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="进度标题" prop="title">
                  <el-input v-model="formEdit.title" placeholder="请输入进度标题" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="进度标签" prop="stage">
                  <el-select v-model="formEdit.stage" placeholder="请选择进度标签">
                    <el-option
                      v-for="item in optionsStage"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="动作" prop="action">
                  <el-input v-model="formEdit.action" placeholder="请输入动作" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="下次预约" prop="appointment">
                  <el-date-picker
                    v-model="formEdit.appointment"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="9:00:00">
                  </el-date-picker>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="内容" prop="content">
                  <el-input type="textarea" :rows="7" v-model="formEdit.content" placeholder="请输入内容" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="16"><el-form-item label="备注" prop="memo">
                  <el-input v-model="formEdit.memo" placeholder="请输入备注" />
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
              <el-button type="danger" size="mini" @click="handleDeleteFiles(scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>


    </el-dialog>
    <!--进程查看模态窗-->
    <el-dialog
      title="进度查看"
      :visible.sync="progressViewVisible"
      width="90%"
      border
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="margin: auto">
        <el-table
          :data="progressDetails"
          border
        >
          <el-table-column
            label="进度编号"
            prop="name"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.process_id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="进度标题"
            prop="title"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="进度"
            prop="stage"
            width="120px"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.stage==1">
                <span>初始提交</span>
              </div>
              <div v-else-if="scope.row.stage==2">
                <span>处理初期</span>
              </div>
              <div v-else-if="scope.row.stage==3">
                <span>处理中期</span>
              </div>
              <div v-else-if="scope.row.stage==4">
                <span>处理后期</span>
              </div>
              <div v-else-if="scope.row.stage==5">
                <span>处理结束</span>
              </div>
              <div v-else>
                <span>错误</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="动作"
            prop="action"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.action }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="内容"
            prop="content"
            width="320px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="memo"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.memo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建人"
            prop="creator"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.creator }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="create_time"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.create_time }}</span>
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
              <el-button type="danger" size="mini" @click="handleFileView(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
  getWorkOrderExecute,
  createWorkOrderExecute,
  updateWorkOrderExecute,
  exportWorkOrderExecute,
  excelImportWorkOrderExecute,
  photoImportWorkOrderExecute,
  checkWorkOrderExecute,
  createServiceWorkOrderExecute,
  rejectWorkOrderExecute,
} from '@/api/wop/satisfaction/satisfaction/execute'
import {
  createWorkOrderCreate,
  updateWorkOrderCreate
} from '@/api/wop/satisfaction/swoprogress/create'
import { deleteSWOPFiles } from '@/api/wop/satisfaction/swopfiles/manage'
import { getGoodsList } from '@/api/base/goods'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'handleSatisfactionWorkOrde',

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
      workorder: '',
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      importVisible: false,
      photoViewVisible: false,
      progressViewVisible: false,
      formAdd: {},
      formEdit: {},
      photoData: {},
      fileDetails: [],
      progressDetails: [],
      importFiles: [],
      url: '',
      optionsShop: [],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      optionsCity: [],
      optionsGoods: [],
      optionsStage: [
        { value: 1, label: '初始提交' },
        { value: 2, label: '处理初期' },
        { value: 3, label: '处理中期' },
        { value: 4, label: '处理后期' },
        { value: 5, label: '处理结束' },
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
        stage: [
          { required: true, message: '请选择标签', trigger: 'blur', type: 'number' }
        ],
        appointment: [
          { required: true, message: '请输入下次预约', trigger: 'blur' }
        ],
        action: [
          { required: true, message: '请输入动作', trigger: 'blur' }
        ],

        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
      getWorkOrderExecute(this.params).then(
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
    handleEdit(row) {
      this.workorder = row
      this.formEdit = { ...row }
      this.dialogVisibleEdit = true
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      this.$refs.handleFormEdit.validate(valid => {
        if (!valid) {
          return
        }
        const { id, ...data } = this.formEdit
        updateWorkOrderExecute(id, data).then(
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
    },
    // 添加界面
    addProgress(row) {
      this.dialogVisibleAdd = true
      this.workorder = row
      console.log(this.workorder)
    },
    // 关闭添加界面
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.workorder = ''
      this.$refs.handleFormAdd.resetFields()
      this.$refs.handleFormAddView.resetFields()
    },
    // 创建进程单
    handleSubmitAdd() {
      let id = this.workorder.id
      const data = this.formAdd
      data.order = id
      console.log(this.formAdd)
      createWorkOrderCreate(this.formAdd).then(
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
      photoImportWorkOrderExecute(importformData, config).then(
        res => {
          this.$notify({
            title: '导入结果',
            message: res.data,
            type: 'success',
            duration: 0
          })
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
      this.$refs.photofiles.type = 'text'
      this.$refs.photofiles.value = ''
      this.$refs.photofiles.type = 'file'
      this.fetchData()
      this.importVisible = false
      this.progressViewVisible = false
    },
    closeImport() {
      this.$refs.photofiles.type = 'text'
      this.$refs.photofiles.value = ''
      this.$refs.photofiles.type = 'file'
      this.importVisible = false
    },
    // 查看进度文档
    handleFileView(userValue) {
      console.log(userValue)
      this.photoViewVisible = true
      this.fileDetails = userValue.file_details
    },
    // 查看进度
    handleProgressView(userValue) {
      console.log(userValue)
      this.progressViewVisible = true
      this.progressDetails = userValue.progress_details
    },
    // 删除图片
    handleDeleteFiles(row) {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '删除文档',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '删除文档无法找回！！'),
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
            if (instance.confirmButtonLoading = true) {
              deleteSWOPFiles(row.id).then(
                (res) => {
                  this.$notify({
                    title: '删除成功',
                    type: 'success',
                    offset: 70,
                    duration: 3000
                  })
                  this.photoViewVisible = false
                  done()
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
            exportWorkOrderExecute(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    快递单号: item.track_id,
                    快递公司: item.company.name,
                    工单事项类型: item.category.name,
                    初始问题信息: item.information,
                    提交时间: item.submit_time,
                    提交人: item.servicer,
                    反馈间隔: item.services_interval,
                    处理意见: item.suggestion,
                    处理人: item.handler,
                    处理时间: item.handle_time,
                    处理间隔: item.handle_interval,
                    反馈内容: item.feedback,
                    是否理赔: item.is_losing,
                    是否返回: item.is_return,
                    返回单号: item.return_express_id,
                    备注: item.memo,
                    驳回原因: item.rejection,
                    工单状态: item.order_status.name,
                    是否正向: item.is_forward,
                    处理标签: item.process_tag.name,
                    处理状态: item.handling_status,
                    错误原因: item.mistake_tag,
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
        checkWorkOrderExecute(this.params).then(
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
        checkWorkOrderExecute(this.params).then(
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
    handleCreateService() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        createServiceWorkOrderExecute(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '创建成功',
                message: `创建成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '创建失败',
                message: `创建失败条数：${res.data.false}`,
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
        createServiceWorkOrderExecute(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '创建成功',
                message: `创建成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '创建失败',
                message: `创建失败条数：${res.data.false}`,
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
        title: '驳回工单',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '驳回工单到原始体验工单！'),
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
              rejectWorkOrderExecute(this.params).then(
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
              rejectWorkOrderExecute(this.params).then(
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
    // 编辑丢件返回信息
    handleEditBoolean(row) {
      let id = row.id
      const data = {
        is_friend: row.is_friend
      }
      updateWorkOrderExecute(id, data).then(
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
            duration: 0
          })
          this.fetchData()
        }
      )
    },
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'cs_wechat') {
        this.handleCSWechat(row)
      }
    },
    handleCSWechat(row) {
      this.$prompt('请输入客户微信', '添加客户微信', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.cs_wechat,
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
          let id = row.id
          let data = {
            cs_wechat: value
          }
          updateWorkOrderExecute(id, data).then(
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
                duration: 0
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
            duration: 0
          })
          this.fetchData()
        })
    },
    // 提交编辑完成的数据
    confirmProcess(row) {
      console.log(row)
      const { id, ...details } = row
      const data = {
        process_tag: details.process_tag.id
      }
      console.log(data, id)
      updateWorkOrderHandle(id, data).then(
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
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.stage.id === 1) {
        row_style = {
          backgroundColor: 'lightcyan'
        }
      } else if (row.stage.id === 2) {
        row_style = {
          backgroundColor: 'lemonchiffon'
        }
      } else if (row.stage.id === 3) {
        row_style = {
          backgroundColor: 'thistle'
        }
      } else if (row.stage.id === 4) {
        row_style = {
          backgroundColor: 'lavender'
        }
      } else if (row.stage.id === 5) {
        row_style = {
          backgroundColor: 'darkorange'
        }
      } else if (row.stage.id === 6) {
        row_style = {
          backgroundColor: 'lightcoral'
        }
      } else if (row.stage.id === 7) {
        row_style = {
          backgroundColor: 'lightpink'
        }
      } else if (row.stage.id === 8) {
        row_style = {
          backgroundColor: 'palegreen'
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
