<template>
  <div class="satisfaction-handle-container">
    <div class="tableTitle">
      <el-row :gutter="20">
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
              <el-input v-model="params.customer__name" class="grid-content bg-purple" placeholder="请输入用户手机" @keyup.enter.native="fetchData">
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
                      <el-col :span="6"><el-form-item label="进度标签">
                        <el-select v-model="params.stage" multiple clearable placeholder="进度标签">
                          <el-option
                            v-for="item in optionsStage"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="案例品级">
                        <el-select v-model="params.cs_level" multiple clearable placeholder="案例品级">
                          <el-option
                            v-for="item in optionsLevel"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
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
          label="订单状态"
          prop="order_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_status.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="案例品级"
          prop="cs_level"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cs_level.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="下次预约时间"
          prop="appointment"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.appointment }}</span>
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
          label="进度查看"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleProgressView(scope.row)">查看</el-button>
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
          label="体验指数"
          prop="feeling_index"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.feeling_index }}</span>
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
            <span>{{ scope.row.specialist.name }}</span>
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
        <el-table :data="progressDetails">
          <el-table-column
            label="文件名"
            prop="name"
            width="120px"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.process_id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="文件类型"
            prop="suffix"
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
            width="120px"
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
            label="文档查看"
          >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleFileView(scope.row)">查看</el-button>
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
  getWorkOrderManage,
  exportWorkOrderManage,
} from '@/api/wop/satisfaction/satisfaction/manage'
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
      optionsStatus: [
        {
          value: 0,
          label: '已被取消'
        },
        {
          value: 1,
          label: '等待领取'
        },
        {
          value: 2,
          label: '等待处理'
        },
        {
          value: 3,
          label: '等待审核'
        },
        {
          value: 4,
          label: '等待确认'
        },
        {
          value: 5,
          label: '事务完结'
        },
      ],
      optionsStage: [
        {
          value: 1,
          label: '初始提交'
        },
        {
          value: 2,
          label: '处理初期'
        },
        {
          value: 3,
          label: '处理中期'
        },
        {
          value: 4,
          label: '处理后期'
        },
        {
          value: 5,
          label: '处理结束'
        },
      ],
      optionsLevel: [
        {
          value: 1,
          label: '优质'
        },
        {
          value: 2,
          label: '合格'
        },
        {
          value: 3,
          label: '缺陷'
        }
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
      if (typeof (this.params.completed_time) !== 'undefined') {
        if (this.params.completed_time.length === 2) {
          this.params.completed_time_after = moment.parseZone(this.params.completed_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.completed_time_before = moment.parseZone(this.params.completed_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (typeof (this.params.order_status) !== 'undefined') {
        this.params.order_status__in = this.params.order_status.toString()
      }
      if (typeof (this.params.stage) !== 'undefined') {
        this.params.stage__in = this.params.stage.toString()
      }
      if (typeof (this.params.cs_level) !== 'undefined') {
        this.params.cs_level__in = this.params.cs_level.toString()
      }
      getWorkOrderManage(this.params).then(
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
            exportWorkOrderManage(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    工单编号: item.order_id,
                    工单标题: item.title,
                    案例品级: item.cs_level.name,
                    用户ID: item.nickname,
                    用户: item.customer.name,
                    购买时间: item.purchase_interval,
                    货品名称: item.goods_name.name,
                    货品数量: item.quantity,
                    机器SN: item.m_sn,
                    客户姓名: item.receiver,
                    客户地址: item.address,
                    手机: item.mobile,
                    是否微友: item.is_friend,
                    微信ID: item.cs_wechat,
                    专属客服: item.specialist.name,
                    诉求: item.demand,
                    领取人: item.handler,
                    领取时间: item.handle_time,
                    领取间隔: item.handle_interval,
                    进度标签: item.stage.name,
                    下次预约: item.appointment,
                    工单状态: item.order_status.name,
                    备注: item.memo,
                    创建时间: item.create_time,
                    更新时间: item.update_time,
                    创建者: item.creator,
                    服务金额: item.cost
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
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.cs_level.id === 1) {
        row_style = {
          backgroundColor: 'gold'
        }
      } else if (row.cs_level.id === 2) {
        row_style = {
          backgroundColor: 'yellowgreen'
        }
      } else if (row.cs_level.id === 3) {
        row_style = {
          backgroundColor: 'lightpink'
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
