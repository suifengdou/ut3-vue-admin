<template>
  <div class="ori-order-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleGetFault">审核</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-close" size="mini" round @click="handleReject">驳回</el-button></el-dropdown-item>
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
              <el-input v-model="params.machine_sn" class="grid-content bg-purple" placeholder="请输入序列号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

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
                      <el-col :span="8"><el-form-item label="缺陷原因" prop="fault_cause">
                        <template>
                          <el-select
                            v-model="params.fault_cause"
                            filterable
                            default-first-option
                            reserve-keyword
                            multiple
                            placeholder="请选择缺陷原因"
                          >
                            <el-option
                              v-for="item in optionsFaultCause"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="单号" prop="order_id">
                        <el-input v-model="params.machine_sn" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="保修单号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
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
                    </el-row>
                    <el-row :gutter="20">
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
            <el-tag type="success"><span>{{ scope.row.id }}</span></el-tag>
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
          label="重复原因"
          prop="repeat_tag"
          sortable="custom"
          width="180"
          :sort-orders="['ascending','descending']"

        >
          <template slot-scope="scope">
            <div v-if="scope.row.is_fault != true">
              <span>正常</span>
            </div>
            <div v-else>
              <el-select
                v-model="scope.row.fault_cause"
                reserve-keyword
                placeholder="请选择重复原因"
                @change="confirmResponsibility(scope.row)"
              >
                <el-option
                  v-for="item in optionsFaultCause"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="判责说明"
          prop="judge_description"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.judge_description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单据状态"
          prop="order_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_status.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否返修"
          prop="is_repeated"
          sortable="custom"
          :sort-orders="['ascending','descending']"
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
          label="是否缺陷"
          prop="is_fault"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_fault"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="店铺"
          prop="shop"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shop.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="货品"
          prop="goods"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="客户"
          prop="customer"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.customer.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="保修单号"
          prop="machine_sn"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收发仓库"
          prop="warehouse"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.warehouse.name }}</span>
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
          label="寄件客户姓名"
          prop="return_name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="寄件客户手机"
          prop="return_mobile"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否在保"
          prop="is_guarantee"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.is_guarantee }}</span>
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
          label="省"
          prop="province"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.province.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="市"
          prop="city"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.city.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原始创建时间"
          prop="ori_created_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ori_created_time }}</span>
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
        >v
          <template slot-scope="scope">
            <span>{{ scope.row.updated_time }}</span>
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
  getMaintenanceJudgmentList,
  createMaintenanceJudgment,
  updateMaintenanceJudgment,
  exportMaintenanceJudgment,
  excelImportMaintenanceJudgment,
  checkMaintenanceJudgment,
  getFaultMaintenanceJudgment,
  rejectMaintenanceJudgment
} from '@/api/crm/service/maintenance/maintenancejudgment'
import { getCompanyList } from '@/api/base/company'
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
      tableData: {},
      params: {
        page: 1,
        allSelectTag: 0
      },
      optionsFaultCause: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '产品'
        },
        {
          value: 2,
          label: '维修'
        },
        {
          value: 3,
          label: '客服'
        },
        {
          value: 4,
          label: '快递'
        },
        {
          value: 5,
          label: '用户'
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
      if (typeof (this.params.repeat_tag) !== 'undefined') {
        this.params.fault_cause__in = this.params.fault_cause.toString()
        delete this.params.repeat_tag
      }
      console.log(this.params)
      this.tableLoading = true
      // console.log(this.params.created_time)
      console.log(this.params)
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
      getMaintenanceJudgmentList(this.params).then(
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
            excelImportMaintenanceJudgment(importformData, config).then(
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
            exportMaintenanceJudgment(this.params).then(
              res => {
                console.log(res)
                res.data = res.data.map(item => {
                  return {
                    ID: item.id,
                    保修单号: item.order_id,
                    店铺: item.shop.name,
                    保修货品名称: item.goods_name.name,
                    收发仓库: item.warehouse,

                    保修类型: item.maintenance_type,
                    故障类型: item.fault_type,

                    省: item.province.name,
                    市: item.city.name,
                    区: item.district.name,

                    序列号: item.machine_sn,
                    换新序列号: item.new_machine_sn,

                    重复维修标记: item.repeat_tag,
                    发现二次维修: item.found_tag,
                    处理登记人: item.completer,
                    保修完成时间: item.finish_time,

                    客户网名: item.buyer_nick,
                    寄件客户姓名: item.sender_name,
                    寄件客户手机: item.sender_mobile,

                    审核人: item.handler_name,
                    审核时间: item.handle_time,
                    创建人: item.ori_creator,
                    创建时间: item.ori_created_time,

                    保修结束语: item.appraisal,
                    故障描述: item.description,
                    是否在保修期内: item.is_guarantee,
                    收费状态: item.charge_status,
                    收费金额: item.charge_amount,
                    收费说明: item.charge_memory,

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
    // 修改二次维修原因
    confirmSign(row) {
      console.log(row)
      const { id, ...details } = row
      const data = {
        repeat_tag: details.repeat_tag.id
      }
      console.log(data, id)
      updateMaintenanceJudgment(id, data).then(
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
    handleGetFault() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        getFaultMaintenanceJudgment(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '锁定成功',
                message: `锁定成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '锁定失败',
                message: `锁定失败条数：${res.data.false}`,
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
        getFaultMaintenanceJudgment(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '锁定成功',
                message: `锁定成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '锁定失败',
                message: `锁定失败条数：${res.data.false}`,
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

    handleReject() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '驳回工单',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '驳回保修单！'),
          h('hr', null, '')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '驳回',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.tableLoading = true
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            if (this.params.allSelectTag === 1) {
              rejectMaintenanceJudgment(this.params).then(
                res => {
                  if (res.data.successful !== 0) {
                    this.$notify({
                      title: '驳回成功',
                      message: `驳回成功条数：${res.data.successful}`,
                      type: 'success',
                      offset: 70,
                      duration: 0
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
                (error) => {
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                  this.$notify({
                    title: '错误详情',
                    message: error.data,
                    type: 'error',
                    offset: 210,
                    duration: 0
                  })
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
              rejectMaintenanceJudgment(this.params).then(
                res => {
                  if (res.data.successful !== 0) {
                    this.$notify({
                      title: '驳回成功',
                      message: `驳回成功条数：${res.data.successful}`,
                      type: 'success',
                      offset: 70,
                      duration: 0
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
                (error) => {
                  instance.confirmButtonLoading = false
                  done()
                  this.fetchData()
                  this.$notify({
                    title: '错误详情',
                    message: error.data,
                    type: 'error',
                    offset: 210,
                    duration: 0
                  })
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
    // 提交编辑完成的数据
    confirmResponsibility(row) {

      const { id, ...details } = row
      const data = {
        fault_cause: details.fault_cause
      }
      console.log(data, id)
      updateMaintenanceJudgment(id, data).then(
        () => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            offset: 0,
            duration: 3000
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

    // 清楚筛选条件
    resetParams() {
      this.params = {
        page: 1
      }
    },
    // 行样式
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.fault_cause === 1) {
        row_style = {
          backgroundColor: 'lightpink'
        }
      } else if (row.fault_cause == 2) {
        row_style = {
          backgroundColor: 'tan'
        }
      }else if (row.fault_cause == 3) {
        row_style = {
          backgroundColor: 'papayawhip'
        }
      }else if (row.fault_cause == 4) {
        row_style = {
          backgroundColor: 'lightgoldenrodyellow'
        }
      }else if (row.fault_cause == 5) {
        row_style = {
          backgroundColor: 'palegreen'
        }
      }
      return row_style
    },
    // 双击修改
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'memo') {
        this.handleMemo(row)
      }
    },
    // 修改备注
    handleMemo(row) {
      this.$prompt('请输入反馈内容', '添加反馈', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.feedback,
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
          updateMaintenanceJudgment(id, data).then(
            () => {
              this.$notify({
                title: '修改成功',
                type: 'success',
                offset: 70,
                duration: 0
              })
              this.fetchData()
            },
            err => {
              this.$notify({
                title: '修改失败',
                message: `修改失败：${err.data}`,
                type: 'error',
                offset: 70,
                duration: 0
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
