<template>
  <div class="ori-invoice-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="6" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetSuggestion">设置处理意见</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetReturn">设置返回</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetReturnTrackID">返单号置为发单号</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-on" size="mini" round @click="handleSetLossing">设置丢失</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-star-off" size="mini" round @click="handleSetRecover">设置重置</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="success" icon="el-icon-check" size="mini" round @click="handleCheck">审核工单</el-button></el-dropdown-item>
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
        <el-col :span="2" class="titleBar">

          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="复制当前筛选条件下所有快递单号" placement="top-start">
              <el-button type="success" class="btn" @click="copytracks(all_track_id, $event)">
                单号
              </el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.track_id" class="grid-content bg-purple" placeholder="支持多个快递单号" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>

            </el-tooltip>

          </div>

        </el-col>
        <el-col :span="3" class="titleBar">

          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索标签" placement="top-start">
              <el-select v-model="params.process_tag" placeholder="标签" clearable @change="fetchData">
                <el-option
                  v-for="item in optionsProcess"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="3" class="titleBar">

          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索标签" placement="top-start">
              <el-select v-model="params.category" placeholder="标签" clearable @change="fetchData">
                <el-option
                  v-for="item in optionsCategory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
                      <el-col :span="6"><el-form-item label="快递公司" prop="company">
                        <template>
                          <el-select
                            v-model="params.company"
                            filterable
                            default-first-option
                            remote
                            reserve-keyword
                            placeholder="请搜索并选择公司"
                            :remote-method="remoteMethodCompany"
                          >
                            <el-option
                              v-for="item in optionsCompany"
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
                      <el-col :span="6"><el-form-item label="是否理赔">
                        <el-select v-model="params.is_losing" placeholder="是否理赔">
                          <el-option
                            v-for="item in optionsJudgment"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="是否返回">
                        <el-select v-model="params.is_return" placeholder="是否返回">
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
            <el-tag type="success"><span>{{ scope.row.id }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="事项类型"
          prop="category"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.category.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="快递公司"
          prop="company"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.company.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="快递单号"
          prop="express_id"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.track_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误原因"
          prop="mistake_tag"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mistake_tag.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理标签"
          prop="process_tag"
          width="120px"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <el-select v-model="scope.row.process_tag.id" placeholder="标签" @change="confirmProcess(scope.row)">
              <el-option
                v-for="item in optionsProcess"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="驳回原因"
          prop="rejection"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.rejection }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理意见"
          prop="suggestion"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.suggestion }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="初始信息"
          prop="information"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.information }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否理赔"
          prop="is_losing"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_losing"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleEditBoolean(scope.row)"
            />
          </template>

        </el-table-column>
        <el-table-column
          label="理赔金额"
          prop="indemnification"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.indemnification }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否返回"
          prop="is_return"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_return"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleEditBoolean(scope.row)"
            />
          </template>

        </el-table-column>
        <el-table-column
          label="返回单号"
          prop="return_express_id"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.return_express_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否正向"
          prop="is_forward"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_forward"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          label="图片上传"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handlePhotoUpload(scope.row)">上传</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="图片查看"
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
      width="70%"
      border
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="margin: auto">
        <el-table :data="fileDetails">
          <el-table-column
            label="文件链接"
            prop="suffix"
            width="500px"
          >
            <template slot-scope="scope">
              <el-image
                style="width: 400px; height: 600px"
                :src="scope.row.name">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="文件下载"
            prop="suffix"
            width="120px"
          >
            <template slot-scope="scope">
              <el-link :href="scope.row.name" target="_blank">{{ scope.row.id }}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="创建者"
            prop="creator"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.creator }}</span>
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
  updateWorkOrderHandle,
  exportWorkOrderHandle,
  checkWorkOrderHandle,
  rejectWorkOrderHandle,
  photoImportWorkOrderHandle,
  setLossingWorkOrderHandle,
  recoverWorkOrderHandle,
  setSuggestionWorkOrderHandle,
  setReturnWorkOrderHandle,
  setReturnTrackIDWorkOrderHandle
} from '@/api/wop/express/handle'
import { deleteEWOPhoto } from '@/api/wop/express/ewophoto'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
import moment from 'moment'
import XLSX from 'xlsx'
import handleClipboard from '@/utils/clipboard'

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
      fileDetails: [],
      all_track_id: '',
      tableData: {
      },
      params: {
        page: 1,
        allSelectTag: 0,
        track_id: '',
        track_id__in: ''
      },
      importVisible: false,
      photoViewVisible: false,
      photoData: {},
      importFiles: [],
      url: '',
      srcList: [],
      optionsShop: [],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      optionsCity: [],
      optionsGoods: [],

      optionsCategory: [
        { value: 1, label: '截单退回' },
        { value: 2, label: '无人收货' },
        { value: 3, label: '客户拒签' },
        { value: 4, label: '修改地址' },
        { value: 5, label: '催件派送' },
        { value: 6, label: '虚假签收' },
        { value: 7, label: '丢件破损' },
        { value: 8, label: '其他异常' }
      ],
      optionsProcess: [
        { value: 0, label: '未分类' },
        { value: 1, label: '待截单' },
        { value: 2, label: '签复核' },
        { value: 3, label: '改地址' },
        { value: 4, label: '催派查' },
        { value: 5, label: '丢件核' },
        { value: 6, label: '纠纷中' },
        { value: 7, label: '需理赔' },
        { value: 8, label: '其他类' }
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
      if (this.params.track_id.length > 20) {
        const track_ids = this.params.track_id.split(' ').toString()
        if (track_ids.length > 1) {
          this.params.track_id__in = track_ids
          delete this.params.track_id
        }
      }
      getWorkOrderHandle(this.params).then(
        res => {
          this.DataList = res.data.results
          this.totalNum = res.data.count
          this.tableLoading = false
          const data = res.data.results.map(item => item.track_id)
          console.log(data)
          this.all_track_id = data
          console.log(res.data.results)
        }
      ).catch(
        () => {
          this.tableLoading = false
        }
      )
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    },

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
                    理赔金额: item.indemnification,
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
    // 图片上传模块
    handlePhotoUpload(userValue) {
      this.photoData.id = userValue.id
      this.importVisible = true

    },
    getFile(event) {
      const filetypes =[".jpg",".png"]
      let filemaxsize = 1024*2
      let fileSize = 0
      for (var i = 0; i < event.target.files.length; i++) {
        let file = event.target.files[i]
        let verify_type = false
        let suffix_name = file.name.substring(file.name.indexOf('.'))
        console.log(suffix_name)
        fileSize = file.size / 1048576
        console.log(fileSize)
        if (fileSize > this.$store.state.user.uploadSize) {
          this.$notify({
            title: '错误详情',
            message: '文件最大4M',
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
        for (let i = 0; i < filetypes.length; i++) {
          if (filetypes[i] == suffix_name) {
            verify_type = true
            break
          }
        }
        if (!verify_type) {
          this.$notify({
            title: '错误详情',
            message: '文件只支持png,jpg',
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
          this.fetchData()
          this.closeImport()
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
      this.fileDetails = userValue.photo_details
    },
    // 删除图片
    handleDelete(row) {
      const data = {
        id: row.id
      }
      deleteEWOPhoto(data).then(
        (res) => {
          if (res.data.successful > 0){
            this.$notify({
              title: '删除成功',
              type: 'success',
              message: `删除成功条数：${res.data.successful}`,
              offset: 70,
              duration: 3000
            })
            this.fetchData()
          }
          if (res.data.false > 0) {
            this.$notify({
              title: '删除失败',
              type: 'error',
              message: `删除失败错误：已删除或者无权限`,
              offset: 70,
              duration: 3000
            })
            this.fetchData()
          }
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
    // 设置返回单号为发出
    handleSetReturnTrackID() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setReturnTrackIDWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
            duration: 3000
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        setReturnTrackIDWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
    // 设置返回标记
    handleSetReturn() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setReturnWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
            duration: 3000
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        setReturnWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
    // 审核单据
    handleSetSuggestion() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setSuggestionWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
            duration: 3000
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        setSuggestionWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
    handleSetLossing() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        setLossingWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
            duration: 3000
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        setLossingWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
    handleSetRecover() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        recoverWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
        recoverWorkOrderHandle(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '设置成功',
                message: `设置成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 3000
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '设置失败',
                message: `设置失败条数：${res.data.false}`,
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
          h('hr', null, ''),
          h('span', null, '驳回工单到快递！'),
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
        this.options = []
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
        this.options = []
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
        is_return: row.is_return,
        is_losing: row.is_losing
      }
      updateWorkOrderHandle(id, data).then(
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
      if (column.property === 'rejection') {
        this.handleRejection(row)
      } else if (column.property === 'suggestion') {
        this.handleSuggestion(row)
      } else if (column.property === 'return_express_id') {
        this.handleReturnTrack(row)
      } else if (column.property === 'indemnification') {
        this.handleIndemnification(row)
      }
    },
    handleSuggestion(row) {
      this.$prompt('请输入处理意见', '添加处理意见', {
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
          updateWorkOrderHandle(id, data).then(
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
    handleRejection(row) {
      this.$prompt('请输入驳回原因', '添加驳回原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.rejection,
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
            rejection: value
          }
          updateWorkOrderHandle(id, data).then(
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
    handleReturnTrack(row) {
      this.$prompt('请输入返回单号', '添加单号', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.return_express_id,
        inputErrorMessage: '输入不能为空',
        inputValidator: (value) => {
        if(!value) {
          return '输入不能为空';
        }
      }
      }).then(
        ({ value }) => {
          let id = row.id
          let data = {
            return_express_id: value
          }
          updateWorkOrderHandle(id, data).then(
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
    handleIndemnification(row) {
      this.$prompt('请输入理赔金额', '添加理赔金额', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        inputValue: row.indemnification,
        inputErrorMessage: '输入错误或者为空',
        inputValidator: (value) => {
          let re = /^[0-9]+.?[0-9]*/
          if(!value) {
            return '输入不能为空';
          } else if (!re.test(value)) {
            return '只能输入数字'
          }
        }
      }).then(
        ({ value }) => {
          let id = row.id
          let data = {
            indemnification: value
          }
          updateWorkOrderHandle(id, data).then(
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
                message: `修改失败：${JSON.stringify(error.data)}`,
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
    copytracks(data, event) {
      handleClipboard(data, event)
    },
    resetParams() {
      this.params = {
        page: 1,
        track_id: ''

      }
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
      if (row.process_tag.id === 1) {
        row_style = {
          backgroundColor: 'lightcyan'
        }
      } else if (row.process_tag.id === 2) {
        row_style = {
          backgroundColor: 'lemonchiffon'
        }
      } else if (row.process_tag.id === 3) {
        row_style = {
          backgroundColor: 'thistle'
        }
      } else if (row.process_tag.id === 4) {
        row_style = {
          backgroundColor: 'lavender'
        }
      } else if (row.process_tag.id === 5) {
        row_style = {
          backgroundColor: 'darkorange'
        }
      } else if (row.process_tag.id === 6) {
        row_style = {
          backgroundColor: 'lightcoral'
        }
      } else if (row.process_tag.id === 7) {
        row_style = {
          backgroundColor: 'lightpink'
        }
      } else if (row.process_tag.id === 8) {
        row_style = {
          backgroundColor: 'palegreen'
        }
      }
      return row_style
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
