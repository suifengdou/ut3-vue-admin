<template>
  <div class="job-order-details-perform-container">
    <div class="tableTitle">
      <el-row :gutter="20">
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

                      <el-col :span="6"><el-form-item label="工单状态">
                        <el-select v-model="params.order_status" multiple clearable placeholder="工单类型">
                          <el-option
                            v-for="item in optionsStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
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
        style="width: 100%"
        @sort-change="onSortChange"
      >
        <el-table-column
          label="ID"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击绿色按钮进入查看" placement="top-start">
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
            <span>{{ scope.row.add_label }}</span>
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
              disabled
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
              disabled
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
            <span>{{ scope.row.job_index}}</span>
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
          label="审核人"
          prop="checker"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.checker }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="领取人"
          prop="handler"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.handler }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="完成人"
          prop="completer"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.completer }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="完成时间"
          prop="completed_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.completed_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="领取时间"
          prop="handle_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.handle_time }}</span>
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
            :rules="rules"
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
                        <el-col :span="18"><el-form-item label="已有标签">
                          <template slot-scope="scope">
                            <el-tag
                              v-for="item in  customer_info.labels"
                              :key="item.name"
                              effect="dark"
                              hit>
                              {{ item.name }}
                            </el-tag>
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
                      disabled
                    />
                  </template>
                </el-form-item></el-col>
                <el-col :span="6"><el-form-item label="是否结束" prop="is_over">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="formEdit.is_over"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      disabled
                    />
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="添加标签" prop="add_label">
                  <span>{{ formEdit.add_label}}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="删除标签" prop="del_label">
                  <span>{{ formEdit.del_label}}</span>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="任务说明" prop="content">
                  <span>{{ formEdit.content}}</span>
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="18"><el-form-item label="备注" prop="memo">
                  <span>{{ formEdit.memo}}</span>
                </el-form-item></el-col>
              </el-row>
            </el-card>
            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="16" :offset="8"><el-form-item size="large">
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

import { getLabel } from '@/api/crm/labels/label/label'
import { getCustomerLabel, getLogCustomerLabel } from '@/api/crm/customers/cslabels'
import { getJobCategory } from '@/api/wop/job/base/category'
import { getCompanyList } from '@/api/base/company'
import { getJobOrderDetails, exportJobOrderDetails, getLogJobOrderDetails, getFilesJobOrderDetails } from '@/api/wop/job/details/manage'
import { deleteJobDetailsFile } from '@/api/wop/job/details/jodfiles'
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
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      logViewVisible: false,
      filesViewVisible: false,
      importVisible: false,
      logDetails: [],
      formAdd: {},
      formEdit: {},
      optionsLabel: [],
      optionsJobCategory: [],
      optionsStatus: [
        { value: 0, label: '已取消' },
        { value: 1, label: '待处理' },
        { value: 2, label: '待领取' },
        { value: 3, label: '待执行' },
        { value: 4, label: '待审核' },
        { value: 5, label: '已完成' },
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
      rules: {},
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
      if (typeof (this.params.completed_time) !== 'undefined') {
        if (this.params.completed_time.length === 2) {
          this.params.completed_time_after = moment.parseZone(this.params.completed_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.completed_time_before = moment.parseZone(this.params.completed_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (typeof (this.params.order_status) !== 'undefined') {
        console.log(this.params.order_status)
        this.params.order_status__in = this.params.order_status.toString()
        console.log(this.params.order_status__in)
      }
      getJobOrderDetails(this.params).then(
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

    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.handleFormEdit.resetFields()
    },

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
            exportJobOrderDetails(this.params).then(
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
    // 查看文档
    handleFileView(userValue) {
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
