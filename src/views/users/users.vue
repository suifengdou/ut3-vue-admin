<template>
  <div class="users-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.title" class="grid-content bg-purple" placeholder="请输入完整发票抬头" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出导出界面" placement="top-start">
              <el-button type="success" @click="open">导出</el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="7" :offset="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出新建界面" placement="top-start">
              <el-button type="primary" @click="add">新增用户</el-button>
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
                      <el-col :span="6"><el-form-item label="店铺" prop="shop">
                        <template>
                          <el-select
                            v-model="params.shop"
                            filterable
                            default-first-option
                            remote
                            reserve-keyword
                            placeholder="请搜索并选择店铺"
                            :remote-method="remoteMethodShop"
                          >
                            <el-option
                              v-for="item in optionsShop"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            />
                          </el-select>
                        </template>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="开票公司" prop="company">
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
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="源单号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="客户昵称" prop="nickname">
                        <el-input v-model="params.nickname" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="发票抬头" prop="title">
                        <el-input v-model="params.title" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="税号" prop="tax_id">
                        <el-input v-model="params.tax_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8"><el-form-item label="收件人" prop="sent_consignee">
                        <el-input v-model="params.sent_consignee" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="8"><el-form-item label="收件手机" prop="sent_smartphone">
                        <el-input v-model="params.sent_smartphone" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="4" />
                      <el-col :span="4" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
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
        @sort-change="onSortChange"
        @cell-dblclick="handelFeedback"
      >
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
          label="用户名"
          prop="username"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="平台"
          prop="platform"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.platform.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="公司"
          prop="company"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.company.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          prop="department"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.department.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="客户昵称"
          prop="nick"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nick }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="申请税前开票总额"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.last_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发票抬头"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.first_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否激活"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="可否登陆"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_staff"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="是否本埠"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.category"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="是否管理"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_superuser"
              active-color="#13ce66"
              inactive-color="#ff4949"
              disabled
            />
          </template>

        </el-table-column>
        <el-table-column
          label="公司"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.company.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.department.name }}</span>
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
        <el-table-column
          label="最后登陆"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.last_login }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!--修改信息模态窗-->
    <el-dialog
      title="新建"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template>
        <div class="userFormAdd">
          <el-form
            ref="formAdd"
            label-width="80px"
            size="mini"
            :model="formAdd"
          >
            <el-form-item label="名称" prop="username">
              <el-input v-model="formAdd.username" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formAdd.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="重复密码" prop="pwd_repeat">
              <el-input v-model="formAdd.pwd_repeat" type="password" placeholder="请重复密码" />
            </el-form-item>
            <el-form-item label="是否管理员" prop="is_superuser">
              <el-switch
                v-model="formAdd.is_superuser"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="名字" prop="first_name">
              <el-input v-model="formAdd.first_name" placeholder="请输入名字" />
            </el-form-item>
            <el-form-item label="姓" prop="last_name">
              <el-input v-model="formAdd.last_name" placeholder="请输入姓" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formAdd.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="员工状态" prop="is_staff">
              <el-switch
                v-model="formAdd.is_staff"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="激活状态" prop="is_active">
              <el-switch
                v-model="formAdd.is_active"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="是否本埠" prop="category">
              <el-switch
                v-model="formAdd.category"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nick">
              <el-input v-model="formAdd.nick" placeholder="请输入用户昵称" />
            </el-form-item>
            <el-form-item label="组" prop="groups">
              <template>
                <el-select
                  v-model="formAdd.groups"
                  multiple
                  filterable
                  remote
                  placeholder="请选择组"
                  :remote-method="searchOptionGroup"
                >
                  <el-option
                    v-for="item in optionsGroups"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelAdd">取消</el-button>
                <el-button type="primary" @click="handleSubmitAdd">立即保存</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-dialog>
    <!--编辑工单反馈-->
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleEdit"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template>
        <div class="userFormEdit">
          <el-form
            ref="formEdit"
            label-width="80px"
            size="mini"
            :model="formEdit"
          >
            <el-form-item label="名称" prop="username">
              <el-input v-model="formEdit.username" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="是否管理员" prop="is_superuser">
              <el-switch v-model="formEdit.is_superuser" active-color="#13ce66" inactive-color="#ff4949" />
            </el-form-item>
            <el-form-item label="名字" prop="first_name">
              <el-input v-model="formEdit.first_name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="姓" prop="last_name">
              <el-input v-model="formEdit.last_name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formEdit.email" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="员工状态" prop="is_staff">
              <el-switch v-model="formEdit.is_staff" active-color="#13ce66" inactive-color="#ff4949" />
            </el-form-item>
            <el-form-item label="是否本埠" prop="category">
              <el-switch
                v-model="formEdit.category"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item label="激活状态" prop="is_active">
              <el-switch v-model="formEdit.is_active" active-color="#13ce66" inactive-color="#ff4949" />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nick">
              <el-input v-model="formEdit.nick" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="创建时间" prop="create_time">
              <el-input v-model="formEdit.create_time" disabled placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="更新时间" prop="update_time">
              <el-input v-model="formEdit.update_time" disabled placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="组" prop="groups">
              <template>
                <el-select
                  v-model="formEdit.groups"
                  multiple
                  filterable
                  remote
                  default-first-option
                  placeholder="请选择组"
                  :remote-method="searchOptionGroup"
                >
                  <el-option v-for="item in optionsGroups" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="部门" prop="department">
              <template>
                <el-select
                  v-model="formEdit.department"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择部门"
                  :remote-method="remoteMethodDepartment"
                >
                  <el-option
                    v-for="item in optionsDepartment"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="公司" prop="company">
              <template>
                <el-select
                  v-model="formEdit.company"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择部门"
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
            </el-form-item>
            <el-form-item label="平台" prop="platform">
              <template>
                <el-select
                  v-model="formEdit.platform"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择部门"
                  :remote-method="remoteMethodPlatform"
                >
                  <el-option
                    v-for="item in optionsPlatform"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item>
            <el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="danger" @click="handleCancelEdit">取消</el-button>
                <el-button type="primary" @click="handleSubmitEdit">立即保存</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
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
import { getUserList, deleteUser, updateUser, createUser } from '@/api/auth/user'
import { getGroupsList } from '../../api/auth/groups'
import { getShopList } from '@/api/base/shop'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
import { getDepartmentList } from '@/api/base/department'
import { getPlatformList } from '@/api/base/platform'
import { getCityList } from '@/api/utils/geography/city'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'OriInvoiceSubmit',
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
      feedbackVisible: false,
      formAdd: {},
      formEdit: {},
      feedbackData: {
        type: Object,
        default() {
          return {
            id: '',
            memorandum: ''
          }
        }
      },
      optionsShop: [],
      optionsDepartment: [],
      optionsCompany: [],
      optionsPlatform: [],
      optionsCity: [],
      optionsGroups: []
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
      getUserList(this.params).then(
        res => {
          this.DataList = res.data.results
          this.totalNum = res.data.count
          this.tableLoading = false
          console.log(res.data.results)
          // const ws = XLSX.utils.json_to_sheet(res.data.results)
          // const wb = XLSX.utils.book_new()
          // XLSX.utils.book_append_sheet(wb, ws, '数据详情')
          // XLSX.writeFile(wb, '列表详情1.xlsx')
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
    // 跳出编辑对话框
    add() {
      this.dialogVisibleAdd = true
    },
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.fetchData()
    },
    handleSubmitAdd() {
      const data = this.formAdd
      createUser(data).then(
        () => {
          this.handleCancelAdd()
          this.$refs.formAdd.resetFields()
        }
      )
    },
    handleEdit(userValue) {
      this.formEdit = { ...userValue }
      this.dialogVisibleEdit = true
      const optionsGroupsPrepare = []
      for (const item of this.formEdit.groups) {
        const optionGroup = { label: item.name, value: item.id }
        optionsGroupsPrepare.push(optionGroup)
      }
      this.formEdit.groups = this.formEdit.groups.map(item => item.id)
      this.optionsGroups = this.unique(optionsGroupsPrepare)

      this.optionsDepartment = [{ label: this.formEdit.department.name, value: this.formEdit.department.id }]
      this.formEdit.department = this.formEdit.department.id
      // this.optionsDepartment = this.unique(optionsDepartmentPrepare)

      this.optionsCompany = [{ label: this.formEdit.company.name, value: this.formEdit.company.id }]
      this.formEdit.company = this.formEdit.company.id

      this.optionsPlatform = [{ label: this.formEdit.platform.name, value: this.formEdit.platform.id }]
      this.formEdit.platform = this.formEdit.platform.id
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      const { id, ...data } = this.formEdit
      console.log(data)
      updateUser(id, data).then(
        () => {
          this.dialogVisibleEdit = false
          this.fetchData()
        },
        err => {
          this.dialogVisibleEdit = false
          this.fetchData()
        }).catch(
        () => {
          this.dialogVisibleEdit = false
          this.fetchData()
        }
      )
    },
    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.formEdit.resetFields()
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
    open() {
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
            exportOriInvoiceSubmit(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    店铺: item.shop.name,
                    收款开票公司: item.company.name,
                    源单号: item.order_id,
                    发票类型: item.order_category.name,
                    发票抬头: item.title,
                    纳税人识别号: item.tax_id,
                    联系电话: item.phone,
                    银行名称: item.bank,
                    银行账号: item.account,
                    地址: item.address,
                    发票备注: item.remark,
                    收件人姓名: item.sent_consignee,
                    收件人手机: item.sent_smartphone,
                    收件城市: item.sent_city.name,
                    收件区县: item.sent_district,
                    收件地址: item.sent_address,
                    申请税前开票总额: item.amount,
                    是否发顺丰: item.is_deliver,
                    申请提交时间: item.submit_time,
                    开票处理时间: item.handle_time,
                    开票处理间隔: item.handle_interval,
                    工单留言: item.message,
                    工单反馈: item.memorandum,
                    创建公司: item.sign_company.name,
                    创建部门: item.sign_department.name,
                    客户昵称: item.nickname,
                    创建时间: item.create_time,
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
    remoteMethodDepartment(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        this.loading = true
        setTimeout(() => {
          this.loading = false
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getDepartmentList(paramsSearch).then(
            res => {
              this.optionsDepartment = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.options = []
      }
    },
    remoteMethodPlatform(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          const paramsSearch = {}
          paramsSearch.name = query
          getPlatformList(paramsSearch).then(
            res => {
              this.optionsPlatform = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.options = []
      }
    },
    searchOptionGroup(query) {
      const params = {}
      params.name = query
      getGroupsList(params).then(
        res => {
          this.optionsGroups = res.data.results.map(item => {
            return { label: item.name, value: item.id }
          })
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
    // 店铺搜索
    remoteMethodShop(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getShopList(paramsSearch).then(
            res => {
              this.optionsShop = res.data.results.map(item => {
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
    // 城市搜索
    remoteMethodCity(query) {
      if (query !== '') {
        // console.log("我准备开始检索啦")
        setTimeout(() => {
          // console.log("我是真正的开始检索啦")
          const paramsSearch = {}
          paramsSearch.name = query
          getCityList(paramsSearch).then(
            res => {
              this.optionsCity = res.data.results.map(item => {
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
    // 重置筛选
    resetParams() {
      this.params = {
        page: 1
      }
    },
    handelFeedback(row, column, cell, event) {
      if (column.property === 'memorandum') {
        this.feedbackVisible = true
        this.feedbackData = row
      }
    },
    submitFeedback() {
      console.log(this.feedbackData)
      const id = this.feedbackData.id
      const data = {
        memorandum: this.feedbackData.memorandum
      }
      updateOriInvoiceHandle(id, data).then(
        res => {
          this.$notify({
            title: '修改工单反馈成功',
            type: 'success',
            offset: 70,
            duration: 3000
          })
          this.closeFeedback()
        },
        error => {
          this.$notify({
            title: '修改工单反馈失败',
            type: 'error',
            offset: 70,
            duration: 0
          })
          this.closeFeedback()
        }
      ).catch(
        () => {
          console.log('sss')
        }
      )
    },
    closeFeedback() {
      this.feedbackVisible = false
      this.fetchData()
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
