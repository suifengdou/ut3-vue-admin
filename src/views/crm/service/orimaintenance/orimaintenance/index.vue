<template>
  <div class="ori-maintenance-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.order_id" class="grid-content bg-purple" placeholder="请输入保修单号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
          <el-select
            v-model="params.process_tag"
            filterable
            default-first-option
            reserve-keyword
            clearable
            placeholder="请选择异常类别"
            @change="fetchData"
            @clear="fetchData"
          >
            <el-option
              v-for="item in optionsProcess"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="5" class="titleBar">
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
                      <el-col :span="6"><el-form-item label="错误类别" prop="process_tag">
                        <template>
                          <el-select
                            v-model="params.process_tag"
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
                      <el-col :span="6"><el-form-item label="标记名称" prop="mark_name">
                        <template>
                          <el-select
                            v-model="params.mark_name"
                            filterable
                            default-first-option
                            reserve-keyword
                            placeholder="请选择错误类别"
                          >
                            <el-option
                              v-for="item in optionsMark"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="单号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="店铺" prop="shop">
                        <el-input v-model="params.shop" type="text" />
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="寄件手机" prop="sender_mobile">
                        <el-input v-model="params.sender_mobile" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="故障类型" prop="fault_type">
                        <el-input v-model="params.fault_type" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
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
      >
        <el-table-column ref="checkall" type="selection" label="选项" />
        <el-table-column
          label="ID"
        >
          <template slot-scope="scope">
            <el-tag type="success"><span>{{ scope.row.id }}</span></el-tag>
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
          label="处理标签"
          prop="process_tag"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.process_tag.name }}</span>
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
          label="递交状态"
          prop="towork_status"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.towork_status.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修单状态"
          prop="order_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_status }}</span>
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
          label="换新序列号"
          prop="new_machine_sn"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.new_machine_sn }}</span>
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
          label="寄件客户姓名"
          prop="buyer_nick"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.buyer_nick }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄件客户手机"
          prop="sender_mobile"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sender_mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄件客户省市县"
          prop="sender_area"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sender_area }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄件客户地址"
          prop="sender_address"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sender_address }}</span>
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
          label="保修货品商家编码"
          prop="goods_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_id }}</span>
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
          label="保修货品简称"
          prop="goods_abbreviation"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_abbreviation }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修数量"
          prop="created_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.created_time }}</span>
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
            <span>{{ scope.row.update_time }}</span>
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
  getOriMaintenanceList,
  createOriMaintenance,
  updateOriMaintenance,
  exportOriMaintenance,
  excelImportOriMaintenance,
  checkOriMaintenance,
  rejectOriMaintenance
} from '@/api/crm/service/orimaintenance/orimaintenance'
import { getCompanyList } from '@/api/base/company'
import moment from 'moment'
import XLSX from 'xlsx'

export default {
  name: 'orimaintenance',
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
      optionsProcess: [
        {
          value: 0,
          label: '无异常'
        },
        {
          value: 1,
          label: '未更新到'
        },
        {
          value: 2,
          label: '取件超时'
        },
        {
          value: 3,
          label: '到库超时'
        },
        {
          value: 4,
          label: '维修超时'
        }
      ],
      optionsMark: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '配件缺货'
        },
        {
          value: 2,
          label: '快递异常'
        },
        {
          value: 3,
          label: '客户沟通'
        },
        {
          value: 4,
          label: '检测无故'
        },
        {
          value: 5,
          label: 'OA拆机'
        },
        {
          value: 6,
          label: '无效保修'
        },
        {
          value: 7,
          label: '其他情况'
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
      getOriMaintenanceList(this.params).then(
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
            exportOriMaintenanceBefore(this.params).then(
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
                    保修货品商家编码: item.goods_id,
                    保修货品名称: item.goods_name,
                    保修货品简称: item.goods_abbreviation,
                    故障描述: item.description,
                    是否在保修期内: item.is_guarantee,
                    收费状态: item.charge_status,
                    收费金额: item.charge_amount,
                    收费说明: item.charge_memory,
                    处理标签: item.process_tag.name,
                    错误原因: item.mistake_tag.name,
                    标记名称: item.mark_name.name,
                    异常备注: item.mark_memo,
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
