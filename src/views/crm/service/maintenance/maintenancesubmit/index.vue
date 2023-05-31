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
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">统计</el-button></el-dropdown-item>
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
              <el-input v-model="params.order_id" class="grid-content bg-purple" placeholder="请输入完整快递单号" @keyup.enter.native="fetchData">
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
                      <el-col :span="8"><el-form-item label="处理类别" prop="mistake_tag">
                        <template>
                          <el-select
                            v-model="params.mistake_tag"
                            filterable
                            default-first-option
                            reserve-keyword
                            placeholder="请选择处理类别"
                          >
                            <el-option
                              v-for="item in optionsMistake"
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
          label="计算状态"
          prop="process_tag"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.process_tag.name }}</span>
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
          label="省"
          prop="province"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.province.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="添加标签"
          prop="add_labels"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.add_labels }}</span>
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
          label="市"
          prop="city"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.city.name }}</span>
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
          prop="new_machine_sn"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.warehouse }}</span>
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
          label="店铺"
          prop="shop"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shop.name }}</span>
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
        >
          <template slot-scope="scope">
            <span>{{ scope.row.updated_time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  getMaintenanceSubmitList,
  updateMaintenanceSubmit,
  exportMaintenanceSubmit,
  checkMaintenanceSubmit,
} from '@/api/crm/service/maintenance/maintenancesubmit'
import { getLogMaintenance } from '@/api/crm/service/maintenance/maintenance'
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
      dialogVisibleEdit: false,
      formEdit: {},
      logViewVisible: false,
      logDetails: [],
      optionsMistake: [
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '尝试修复数据'
        },
        {
          value: 2,
          label: '二级市错误'
        },
        {
          value: 3,
          label: '寄件地区出错'
        },
        {
          value: 4,
          label: 'UT无此店铺'
        },
        {
          value: 5,
          label: 'UT此型号整机未创建'
        },
        {
          value: 6,
          label: 'UT系统无此店铺'
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
      getMaintenanceSubmitList(this.params).then(
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
            exportMaintenanceSubmit(this.params).then(
              res => {
                console.log(res)
                res.data = res.data.map(item => {
                  return {
                    ID: item.id,
                    保修单号: item.order_id,
                    店铺: item.shop.name,
                    整机: item.goods.name,
                    客户: item.customer.name,
                    收发仓库: item.warehouse.name,
                    保修类型: item.maintenance_type,
                    故障类型: item.fault_type,
                    省: item.province.name,
                    市: item.city.name,
                    寄回地址: item.return_address,
                    序列号: item.machine_sn,
                    保修结束语: item.appraisal,
                    故障描述: item.description,
                    缺陷原因: item.fault_cause.name,
                    判责说明: item.judge_description,
                    处理登记人: item.completer,
                    保修完成时间: item.finish_time,
                    寄回姓名: item.return_name,
                    寄回手机: item.return_mobile,
                    购买时间: item.purchase_time,
                    审核时间: item.handle_time,
                    创建人: item.ori_creator,
                    创建时间: item.ori_created_time,
                    处理登记人: item.completer,
                    是否返修: item.is_repeated,
                    是否缺陷: item.is_fault,
                    添加标签: item.add_labels,
                    是否配件: item.is_part,
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
    // 审核单据

    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkMaintenanceSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
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
        checkMaintenanceSubmit(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
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
    },

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
    // 特殊行标记颜色
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.process_tag.id === 1) {
        row_style = {
          backgroundColor: 'aquamarine'
        }
      }
      return row_style
    },
    // 查看日志
    logView(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogMaintenance(data).then(
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
    // 重置
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
