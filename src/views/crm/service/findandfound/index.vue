<template>
  <div class="ori-maintenance-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核</el-button></el-dropdown-item>
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
                      <el-col :span="8"><el-form-item label="错误类别" prop="process_tag">
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
                            v-model="params.ori_create_time"
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
                            v-model="params.create_time"
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
            <el-tooltip class="item" effect="dark" content="点击绿色按钮进入编辑" placement="top-start">
              <el-tag type="success" @click="handleEdit(scope.row)"><span>{{ scope.row.id }}</span></el-tag>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column
          label="发现完成时"
          prop="find"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.find.finish_date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺"
          prop="find"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.find.shop }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发现单号"
          prop="find"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.find.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发现货品"
          prop="find"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.find.goods_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发现序列号"
          prop="find"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.find.machine_sn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发现结语"
          prop="find"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.find.appraisal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发现描述"
          prop="find"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.find.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="二次完成时"
          prop="found"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.found.finish_date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="二次单号"
          prop="found"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.found.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="二次责任"
          prop="repeat_tag"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.repeat_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="判责说明"
          prop="found"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.found.memo }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="二次货品"
          prop="found"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.found.goods_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="二次结语"
          prop="found"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.found.appraisal }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="二次描述"
          prop="found"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.found.description }}</span>
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
          prop="create_time"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.create_time }}</span>
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
  getFindAndFoundList,
  createFindAndFound,
  updateFindAndFound,
  exportFindAndFound,
  excelImportFindAndFound,
  checkFindAndFound,
  rejectFindAndFound
} from '@/api/crm/service/findandfound/findandfound'
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
      // console.log(this.params.create_time)
      if (typeof (this.params.create_time) !== 'undefined') {
        if (this.params.create_time.length === 2) {
          this.params.create_time_after = moment.parseZone(this.params.create_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.create_time_before = moment.parseZone(this.params.create_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
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
      if (typeof (this.params.ori_create_time) !== 'undefined') {
        if (this.params.ori_create_time.length === 2) {
          this.params.ori_create_time_time_after = moment.parseZone(this.params.ori_create_time_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.ori_create_time_time_before = moment.parseZone(this.params.ori_create_time_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      if (typeof (this.params.finish_time) !== 'undefined') {
        if (this.params.finish_time.length === 2) {
          this.params.finish_time_after = moment.parseZone(this.params.finish_timee[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.finish_time_before = moment.parseZone(this.params.finish_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getFindAndFoundList(this.params).then(
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
            excelImportFindAndFound(importformData, config).then(
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
            exportFindAndFound(this.params).then(
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
                    创建时间: item.ori_create_time,
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
        checkFindAndFound(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
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
        checkFindAndFound(this.params).then(
          res => {
            if (res.data.success !== 0) {
              this.$notify({
                title: '审核成功',
                message: `审核成功条数：${res.data.success}`,
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
    handleReject() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '取消工单',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '取消保修单！无法再次导入，请慎重选择！'),
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
              rejectFindAndFound(this.params).then(
                res => {
                  if (res.data.success !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.success}`,
                      type: 'success',
                      offset: 70,
                      duration: 0
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
              rejectFindAndFound(this.params).then(
                res => {
                  if (res.data.success !== 0) {
                    this.$notify({
                      title: '取消成功',
                      message: `取消成功条数：${res.data.success}`,
                      type: 'success',
                      offset: 70,
                      duration: 0
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
