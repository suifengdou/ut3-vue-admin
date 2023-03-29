<template>
  <div class="job-order-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="7" class="titleBar">
          <div class="grid-content bg-purple">
            <div id="operationBoard">
              <el-tooltip class="item" effect="dark" content="点击展开操作列表，可执行对应操作" placement="top-start">
                <el-dropdown split-button type="primary" placement="bottom-end" trigger="click">
                  选中所有的{{ selectNum }}项
                  <el-dropdown-menu slot="dropdown" trigger="click">
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
              <el-input v-model="params.name" class="grid-content bg-purple" placeholder="请输入任务名称" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <!-- <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出导入界面" placement="top-start">
              <el-button type="success" @click="importExcel">导入</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="点击弹出导出界面" placement="top-start">
              <el-button type="success" @click="exportExcel">导出</el-button>
            </el-tooltip>
          </div>
        </el-col> -->
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
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="任务编码" prop="code">
                        <el-input v-model="params.code" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="标签名称" prop="label">
                        <el-input v-model="params.label__name" type="text" />
                      </el-form-item></el-col>

                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="任务类型" prop="category">
                        <el-input v-model="params.category__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="任务部门" prop="department">
                        <el-input v-model="params.department__name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="任务说明" prop="info">
                        <el-input v-model="params.info" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="关键字" prop="keywords">
                        <el-input v-model="params.keywords" type="text" />
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
        :row-style="rowStyle"
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
          label="任务名"
          prop="name"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务码"
          prop="code"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标签名"
          prop="label"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.label.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务说明"
          prop="info"
          sortable="custom"
          width="360px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.info }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务关键字"
          prop="keywords"
          sortable="custom"
          width="200px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.keywords }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          prop="quantity"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="完成数"
          prop="complete_number"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.complete_number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结束数"
          prop="over_number"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.over_number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="文档上传"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleFileUpload(scope.row)">上传</el-button>
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
    <!--新建添加模态窗-->
    <el-dialog
      title="新增"
      width="60%"
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
            <span>任务相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="任务类别" prop="category">
              <template>
                <el-select
                  v-model="formAdd.category"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选中任务类别"
                  :remote-method="remoteMethodJobCategory"
                >
                  <el-option
                    v-for="item in optionsJobCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="标签" prop="label">
              <template>
                <el-select
                  v-model="formAdd.label"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选中标签"
                  :remote-method="remoteMethodLabel"
                >
                  <el-option
                    v-for="item in optionsLabel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18"><el-form-item label="任务说明" prop="info">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入任务说明"
                v-model="formAdd.info">
              </el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18"><el-form-item label="关键字" prop="keywords">
              <el-input v-model="formAdd.keywords" placeholder="请输入关键字" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18"><el-form-item label="备注" prop="memo">
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
            <span>标签类别信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="任务类别" prop="category">
              <template>
                <el-select
                  v-model="formEdit.category"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选中任务类别"
                  :remote-method="remoteMethodJobCategory"
                >
                  <el-option
                    v-for="item in optionsJobCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="标签" prop="label">
              <template>
                <el-select
                  v-model="formEdit.label"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选中标签"
                  :remote-method="remoteMethodLabel"
                >
                  <el-option
                    v-for="item in optionsLabel"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18"><el-form-item label="任务说明" prop="info">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入任务说明"
                v-model="formEdit.info">
              </el-input>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18"><el-form-item label="关键字" prop="keywords">
              <el-input v-model="formEdit.keywords" placeholder="请输入关键字" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="18"><el-form-item label="备注" prop="memo">
              <el-input v-model="formEdit.memo" placeholder="请输入收货地址" />
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
          <input ref="files" type="file" multiple="multiple" @change="getFile($event)">
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

          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleDeleteFile(scope.row)">删除</el-button>
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
import {
  getJobOrderTrack,
  createJobOrderTrack,
  updateJobOrderTrack,
  exportJobOrderTrack,
  excelImportJobOrderTrack,
  checkJobOrderTrack,
  rejectJobOrderTrack,
  fileImportJobOrderTrack
 } from '@/api/wop/job/order/track'
import {  getLabel } from '@/api/crm/labels/label/label'
import { getJobCategory } from '@/api/wop/job/base/category'
import { getCompanyList } from '@/api/base/company'
import { getLogJobOrder, getFilesJobOrder } from '@/api/wop/job/order/manage'
import { deleteJobFile } from '@/api/wop/job/order/jofiles'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'submitJobOrder',
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
      tableData: {},
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
        label: [
          { required: true, message: '请选择客户网名', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择任务类别', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请选择任务类别', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请选择任务类别', trigger: 'blur' }
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
      getJobOrderTrack(this.params).then(
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
    // 跳出编辑对话框
    handleEdit(values) {
      console.log(values)
      this.formEdit = { ...values }
      this.optionsLabel = [{ label: this.formEdit.label.name, value: this.formEdit.label.id }]
      this.formEdit.label = this.formEdit.label.id
      this.optionsJobCategory = [{ label: this.formEdit.category.name, value: this.formEdit.category.id }]
      this.formEdit.category = this.formEdit.category.id
      let attrStr
      const transFieldStr = ['mistake_tag', 'process_tag', 'department', 'order_status', 'center']
        for (attrStr in transFieldStr) {
          this.formEdit[transFieldStr[attrStr]] = this.formEdit[transFieldStr[attrStr]].id
        }
      this.dialogVisibleEdit = true
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      const { id, ...data } = this.formEdit
      updateJobOrderTrack(id, data).then(
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

    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.handleFormEdit.resetFields()
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
      createJobOrderTrack(this.formAdd).then(
        () => {
          this.$notify({
            title: '创建成功',
            type: 'success',
            offset: 0,
            duration: 0
          })
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch((res) => {
        this.$notify({
          title: '创建出错',
          message: res.data,
          type: 'success',
          offset: 0,
          duration: 0
        })
      })
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
            excelImportJobOrderTrack(importformData, config).then(
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
          console.log(error)
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
            exportJobOrderTrack(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    任务名称: item.name,
                    任务编码: item.code,
                    标签: item.label.name,
                    任务类型: item.category.name,
                    任务部门: item.department.name,
                    任务中心: item.center.name,
                    任务说明: item.info,
                    数量: item.quantity,
                    任务关键字: item.keywords,
                    单据状态: item.order_status.name,
                    备注: item.memo,
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
    // 校正
    handleFix() {
      this.tableLoading = true
      if (this.params.allSelectTag === 1) {
        fixLabel(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '校正成功',
                message: `校正成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '校正失败',
                message: `校正失败条数：${res.data.false}`,
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
            message: '未选择订单无法校正',
            type: 'error',
            offset: 70,
            duration: 0
          })
          this.fetchData()
        }
        const ids = this.multipleSelection.map(item => item.id)
        this.params.ids = ids
        fixLabel(this.params).then(
          res => {
            if (res.data.successful !== 0) {
              this.$notify({
                title: '校正成功',
                message: `校正成功条数：${res.data.successful}`,
                type: 'success',
                offset: 70,
                duration: 0
              })
            }
            if (res.data.false !== 0) {
              this.$notify({
                title: '校正失败',
                message: `校正失败条数：${res.data.false}`,
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
            console.log('######')
            console.log(error)
          }
        )
      }
    },
    // 驳回单据
    handleReject() {
      const h = this.$createElement
      let resultMessage, resultType
      this.$msgbox({
        title: '清除锁定',
        message: h('p', null, [
          h('h3', { style: 'color: teal' }, '特别注意：'),
          h('hr', null, ''),
          h('span', null, '只有在所有任务明细未被领取时，才可以驳回！'),
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
              rejectJobOrderTrack(this.params).then(
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
                      duration: 5000
                    })
                    this.$notify({
                      title: '失败错误详情',
                      message: res.data.error,
                      type: 'error',
                      offset: 210,
                      duration: 5000
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
                    duration: 5000
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
                  duration: 5000
                })
                instance.confirmButtonLoading = false
                done()
                this.fetchData()
              }
              const ids = this.multipleSelection.map(item => item.id)
              this.params.ids = ids
              rejectJobOrderTrack(this.params).then(
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
                      duration: 5000
                    })
                    this.$notify({
                      title: '失败错误详情',
                      message: res.data.error,
                      type: 'error',
                      offset: 210,
                      duration: 5000
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
                    duration: 5000
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
            duration: 5000
          })
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
    // 编辑丢件返回信息
    handleEditBoolean(row) {
      let id = row.id
      const data = {
        is_cancel: row.is_cancel
      }
      updateJobOrderTrack(id, data).then(
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
    // 图片上传模块  getJobCategory
    handleFileUpload(userValue) {
      this.fileData.id = userValue.id
      this.importVisible = true

    },
    getFile(event) {
      // const filetypes =[".jpg",".png"]
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
          this.$refs.files.type = 'text'
          this.$refs.files.value = ''
          this.$refs.files.type = 'file'
          this.importFiles = []
          return false
        }
        // for (let i = 0; i < filetypes.length; i++) {
        //   if (filetypes[i] == suffix_name) {
        //     verify_type = true
        //     break
        //   }
        // }
        // if (!verify_type) {
        //   this.$notify({
        //     title: '错误详情',
        //     message: '文件只支持png,jpg',
        //     type: 'error',
        //     offset: 70,
        //     duration: 0
        //   })
        //   this.$refs.files.type = 'text'
        //   this.$refs.files.value = ''
        //   this.$refs.files.type = 'file'
        //   this.importFiles = []
        //   return false
        // }
        this.importFiles.push(file)
      }
    },
    importPhotoes() {
      const importformData = new FormData()
      for (let i = 0; i < this.importFiles.length; i++) {
        importformData.append('files', this.importFiles[i])
      }
      importformData.append('id', this.fileData.id)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.tableLoading = true
      fileImportJobOrderTrack(importformData, config).then(
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
      this.$refs.files.type = 'text'
      this.$refs.files.value = ''
      this.$refs.files.type = 'file'
      this.importFiles = []
      this.importVisible = false
    },
    // 查看文档
    handlePhotoView(userValue) {
      this.fileDetails = []
      this.filesViewVisible = true
      const data = {
        id: userValue.id
      }
      getFilesJobOrder(data).then(
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
            duration: 0
          })
        }
      )
    },
    // 删除文档
    handleDeleteFile(row) {
      const data = {
        id: row.id
      }
      deleteJobFile(data).then(
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
    // 表格样式
    // 查看日志
    logView(userValue) {
      this.logDetails = []
      this.logViewVisible = true
      const data = {
        id: userValue.id
      }
      getLogJobOrder(data).then(
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
            duration: 0
          })
        }
      )
    },
    rowStyle({ row, rowIndex}) {
      let row_style = {}
      if (row.process_tag.id === 1) {
        row_style = {
          backgroundColor: 'lightcyan'
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
