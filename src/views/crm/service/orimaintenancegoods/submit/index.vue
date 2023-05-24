<template>
  <div class="ori-maintenance-goods-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleDecrypt">推送解密</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">递交单据</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="danger" icon="el-icon-check" size="mini" round @click="handleReject">取消单据</el-button></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击选中所有筛选出的订单" placement="top-start">
                <el-button @click="checkAllOption">全选{{ totalNum }}项</el-button>
              </el-tooltip>
            </div>
          </div>
        </el-col>
        <el-col :span="1" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="筛选所有未标记过的异常单" placement="top-start">
              <el-button type="success" @click="handleShortCuts">一键干活</el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="1" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="筛选所有未标记过的异常单" placement="top-start">
              <el-button type="success" @click="handleRepeated">二次维修</el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="2" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="筛选登录账号为原始创建人的保修单" placement="top-start">
              <el-button type="success" @click="myWorkOrder">我的工单</el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="4" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="支持多个保修单号" placement="top-start">
              <el-input v-model="params.order_id" class="grid-content bg-purple" placeholder="请输入保修单号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="2" class="titleBar">
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
        <el-col :span="2" class="titleBar">
          <el-select
            v-model="params.sign"
            filterable
            default-first-option
            reserve-keyword
            clearable
            placeholder="请选择标签名称"
            @change="fetchData"
            @clear="fetchData"
          >
            <el-option
              v-for="item in optionsSign"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
                            v-model="params.process_tag__in"
                            multiple
                            filterable
                            default-first-option
                            reserve-keyword
                            placeholder="请选择异常类别"
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
                            placeholder="请选择标记名称"
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
          label="是否已推送解密"
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
          label="日志查看"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="logView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="保修配件名称"
          prop="part_name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="配件数量"
          prop="quantity"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
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
          label="保修货品"
          prop="goods_name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_name }}</span>
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
  getOriMaintenanceGoodsSubmit,
  createOriMaintenanceGoodsSubmit,
  updateOriMaintenanceGoodsSubmit,
  exportOriMaintenanceGoodsSubmit,
  excelImportOriMaintenanceGoodsSubmit,
  checkOriMaintenanceGoodsSubmit,
  rejectOriMaintenanceGoodsSubmit,
  decryptOriMaintenanceGoodsSubmit
} from '@/api/crm/service/orimaintenancegoods/submit'
import { getLogOriMaintenanceGoods } from "@/api/crm/service/orimaintenancegoods/manage"
import { getCompanyList } from '@/api/base/company'
import moment from 'moment'
import XLSX from 'xlsx'

export default {
  name: 'orimaintenanceGoodsSubmit',
  data() {
    return {
      DataList: [],
      tableLoading: false,
      totalNum: 0,
      pageSize: 30,
      selectNum: 0,
      checkList: [],
      tableData: {},
      logViewVisible: false,
      logDetails: [],
      params: {
        page: 1,
        allSelectTag: 0
      },
      optionsProcess: [
        {
          value: 0,
          label: '无异常'
        },
        {
          value: 1,
          label: '审核异常'
        },
        {
          value: 2,
          label: '逆向异常'
        },
        {
          value: 3,
          label: '取件异常'
        },
        {
          value: 4,
          label: '入库异常'
        },
        {
          value: 5,
          label: '维修异常'
        },
        {
          value: 6,
          label: '超期异常'
        }
      ],
      optionsSign: [
        {
          value: 0,
          label: '无'
        },
        {
          value: 1,
          label: '处理完毕'
        },
        {
          value: 2,
          label: '配件缺货'
        },
        {
          value: 3,
          label: '延后处理'
        },
        {
          value: 4,
          label: '快递异常'
        },
        {
          value: 5,
          label: '特殊问题'
        },
        {
          value: 6,
          label: '处理收费'
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
      if (typeof (this.params.process_tag__in) !== 'undefined') {
        console.log(this.params.process_tag)
        delete this.params.process_tag
        this.params.process_tag__in = this.params.process_tag__in.toString()
        console.log(this.params.process_tag__in)
      }
      if (typeof (this.params.sign__in) !== 'undefined') {
        console.log(this.params.sign)
        delete this.params.sign
        this.params.sign__in = this.params.sign__in.toString()
        console.log(this.params.sign__in)
      }
      getOriMaintenanceGoodsSubmit(this.params).then(
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
    handleShortCuts() {
      this.params.process_tag__in = '1,2,3,4,5,6'
      this.params.sign = '0'
      this.fetchData()
    },
    handleRepeated() {
      this.params.is_repeated = true
      this.params.is_month_filter = false
      this.fetchData()
    },
    myWorkOrder() {
      this.params.ori_creator = this.$store.state.user.name
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
    handleAppointment(row) {
      let id = row.id
      let data = {
        id: id,
        days: 1
      }
      setAppointmentOriMaintenanceGoodsSubmit(data).then(
        (res) => {
          if (res.data.successful == 1) {
            this.$notify({
              title: '设置成功',
              type: 'success',
              offset: 70,
              duration: 3000
            })
            this.fetchData()
          } else {
            this.$notify({
              title: '设置失败',
              message: `设置失败：${error.data}`,
              type: 'success',
              offset: 70,
              duration: 5000
            })
            this.fetchData()
          }

        }).catch(
        (error) => {
          this.$notify({
            title: '设置失败',
            message: `设置失败：${error.data}`,
            type: 'success',
            offset: 70,
            duration: 5000
          })
          this.fetchData()
        }
      )
    },
    handleAppointmentdays(row) {
      let id = row.id
      let data = {
        id: id,
        days: 3
      }
      setAppointmentOriMaintenanceGoodsSubmit(data).then(
        (res) => {
          if (res.data.successful == 1) {
            this.$notify({
              title: '设置成功',
              type: 'success',
              offset: 70,
              duration: 3000
            })
            this.fetchData()
          } else {
            this.$notify({
              title: '设置失败',
              message: `设置失败：${error.data}`,
              type: 'success',
              offset: 70,
              duration: 5000
            })
            this.fetchData()
          }

        }).catch(
        (error) => {
          this.$notify({
            title: '设置失败',
            message: `设置失败：${error.data}`,
            type: 'success',
            offset: 70,
            duration: 5000
          })
          this.fetchData()
        }
      )
    },
    handleSetRecover(row){
      let data = {
        id: row.id
      }
      setRecoverOriMaintenanceGoodsSubmit(data).then(
        (res) => {
          if (res.data.successful == 1) {
            this.$notify({
              title: '设置成功',
              type: 'success',
              offset: 70,
              duration: 3000
            })
            this.fetchData()
          } else {
            this.$notify({
              title: '设置失败',
              message: `设置失败：${error.data}`,
              type: 'success',
              offset: 70,
              duration: 5000
            })
            this.fetchData()
          }

        }).catch(
        (error) => {
          this.$notify({
            title: '设置失败',
            message: `设置失败：${error.data}`,
            type: 'success',
            offset: 70,
            duration: 5000
          })
          this.fetchData()
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
            excelImportOriMaintenanceGoodsSubmit(importformData, config).then(
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
            exportOriMaintenanceGoodsSubmit(this.params).then(
              res => {
                console.log(res)
                res.data = res.data.map(item => {
                  return {
                    保修单号: item.order_id,
                    保修单状态: item.ori_order_status,
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
    // 解密单据
    handleDecrypt() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        decryptOriMaintenanceGoodsSubmit(this.params).then(
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
        decryptOriMaintenanceGoodsSubmit(this.params).then(
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
    // 审核单据
    handleCheck() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        checkOriMaintenanceGoodsSubmit(this.params).then(
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
        checkOriMaintenanceGoodsSubmit(this.params).then(
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
    handleReject() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '取消单据',
        message: h('p', null, [
          h('hr', null, ''),
          h('span', null, '取消单据！'),
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
              rejectOriMaintenanceGoodsSubmit(this.params).then(
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
              rejectOriMaintenanceGoodsSubmit(this.params).then(
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

    resetParams() {
      this.params = {
        page: 1
      }
    },
    // 修改标记
    confirmSign(row) {
      console.log(row)
      const { id, ...details } = row
      const data = {
        sign: details.sign.id
      }
      console.log(data, id)
      updateOriMaintenanceGoodsSubmit(id, data).then(
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
    // 查看日志
    logView(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogOriMaintenanceGoods(data).then(
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
    // 特殊行标记颜色
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.is_decrypted === true) {
        row_style = {
          backgroundColor: 'aquamarine'
        }
      }
      return row_style
    },
    // 双击改内容
    handelDoubleClick(row, column, cell, event) {
      if (column.property === 'suggestion') {
        this.handleSuggestion(row)
      }
    },
    handleSuggestion(row) {
      this.$prompt('请输入反馈内容', '添加反馈', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.suggestion,
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
            suggestion: value
          }
          updateOriMaintenanceGoodsSubmit(id, data).then(
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
