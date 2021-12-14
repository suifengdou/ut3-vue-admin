<template>
  <div class="manualorder-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.name" class="grid-content bg-purple" placeholder="请输入联系人" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <!--<el-tooltip class="item" effect="dark" content="点击弹出导入界面" placement="top-start">-->
            <!--<el-button type="success" @click="handleImport">导入</el-button>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="点击弹出导出界面" placement="top-start">-->
              <!--<el-button type="success" @click="exportExcel">导出</el-button>-->
            <!--</el-tooltip>-->
          </div>
        </el-col>
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
                      <el-col :span="6"><el-form-item label="性别" prop="gender">
                        <el-select v-model="params.gender" placeholder="请选择性别">
                          <el-option
                            v-for="item in optionsGender"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="联系人" prop="name">
                        <el-input v-model="params.name" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="职务" prop="position">
                        <el-input v-model="params.position" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8"><el-form-item label="经销商" prop="currency">
                        <el-input v-model="params.currency__name" type="text" />
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
        :row-style="rowStyle"
        @sort-change="onSortChange"
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
          label="账户名称"
          prop="name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="账户ID"
          prop="a_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.a_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="币种"
          prop="currency"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.currency.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开户行"
          prop="branch"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.branch }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开户公司"
          prop="company"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.company.name }}</span>
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
    <!--新建添加模态窗-->
    <el-dialog
      title="新增"
      width="80%"
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
            <span>账户相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="账户名称" prop="name">
              <el-input v-model="formAdd.name" placeholder="请输入账户名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="账户ID" prop="a_id">
              <el-input v-model="formAdd.a_id" placeholder="请输入账户ID" />
            </el-form-item></el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="开户行" prop="branch">
              <el-input v-model="formAdd.branch" placeholder="请输入开户行" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="币种" prop="currency">
              <template>
                <el-select
                  v-model="formAdd.currency"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请搜索并选择币种"
                  :remote-method="remoteMethodCurrency"
                >
                  <el-option
                    v-for="item in optionsCurrency"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="开户公司" prop="company">
              <template>
                <el-select
                  v-model="formAdd.company"
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
          </el-row>
        </el-card>

        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="8" :offset="16"><el-form-item size="large">
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
                <span>账户相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="账户名称" prop="name">
                  <el-input v-model="formEdit.name" placeholder="请输入账户名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="账户ID" prop="a_id">
                  <el-input v-model="formEdit.a_id" placeholder="请输入账户ID" />
                </el-form-item></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="开户行" prop="branch">
                  <el-input v-model="formEdit.branch" placeholder="请输入开户行" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="币种" prop="currency">
                  <template>
                    <el-select
                      v-model="formEdit.currency"
                      filterable
                      default-first-option
                      remote
                      reserve-keyword
                      placeholder="请搜索并选择币种"
                      :remote-method="remoteMethodCurrency"
                    >
                      <el-option
                        v-for="item in optionsCurrency"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="开户公司" prop="company">
                  <template>
                    <el-select
                      v-model="formEdit.company"
                      filterable
                      default-first-option
                      remote
                      reserve-keyword
                      placeholder="请搜索并选择公司"
                      :remote-method="optionsCompany"
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
              </el-row>
            </el-card>
            <el-card class="box-card">
              <el-row :gutter="20">
                <el-col :span="8" :offset="16"><el-form-item size="large">
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
    getAccountList,
    createAccount,
    updateAccount,
    exportAccount,
    excelImportAccount,
  } from '@/api/int/account/account'
  import { getCurrencyList } from '@/api/int/account/currency'
  import { getCompanyList } from '@/api/base/company'
  import { getGoodsList } from '@/api/base/goods'
  import { getNationalityList } from '@/api/utils/geography/nationality'
  import moment from 'moment'
  import XLSX from 'xlsx'
  export default {
    name: 'AccountManage',
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
        formAdd: {},
        formEdit: {},
        optionsCurrency: [],
        optionsDepartment: [],
        optionsCompany: [],
        optionsPlatform: [],
        optionsProvince: [],
        optionsCity: [],
        optionsDistrict: [],
        optionsGoods: [],
        optionsGender: [
          {
            value: 1,
            label: '男'
          },
          {
            value: 2,
            label: '女'
          }
        ],
        optionsExpress: [
          {
            value: 0,
            label: '随机'
          },
          {
            value: 1,
            label: '顺丰'
          },
          {
            value: 2,
            label: '申通'
          },
          {
            value: 3,
            label: '韵达'
          }
        ],
        optionsIsDeliver: [
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
          shop: [
            { required: true, message: '请选择店铺', trigger: 'blur', type: 'number' }
          ],
          order_id: [
            { required: true, message: '请输入源单号', trigger: 'blur' }
          ],
          receiver: [
            { required: true, message: '请输入收件人', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机', trigger: 'blur' }
          ],
          order_category: [
            { required: true, message: '请选择类型', trigger: 'blur', type: 'number' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
        },
        OrderDetailsList: [],
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
        getAccountList(this.params).then(
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
      handleCurrentChange(val) {
        this.params.page = val
        this.fetchData()
      },

      // 跳出编辑对话框
      handleEdit(values) {
        console.log(values)
        this.formEdit = { ...values }
        this.dialogVisibleEdit = true

        this.optionsCurrency = [{ label: this.formEdit.currency.name, value: this.formEdit.currency.id }]
        this.formEdit.currency = this.formEdit.currency.id
        this.optionsCompany = [{ label: this.formEdit.company.name, value: this.formEdit.company.id }]
        this.formEdit.company = this.formEdit.company.id
      },
      // 提交编辑完成的数据
      handleSubmitEdit() {
        this.$refs.handleFormEdit.validate(valid => {
          if (!valid) {
            return
          }
          console.log('在编辑')
          const { id, ...data } = this.formEdit
          updateAccount(id, data).then(
            () => {
              this.dialogVisibleEdit = false
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
            }
          )
        })
      },

      // 关闭修改界面
      handleCancelEdit() {
        this.dialogVisibleEdit = false
        this.$refs.handleFormEdit.resetFields()
        this.handleDeleteAllDetails()
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
        createAccount(this.formAdd).then(
          () => {
            this.fetchData()
            this.handleCancelAdd()
          }
        ).catch((error) => {
          this.$notify({
            title: '错误详情',
            message: error.data,
            type: 'error',
            offset: 210,
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
      remoteMethodCurrency(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getCurrencyList(paramsSearch).then(
              res => {
                this.optionsCurrency = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsCurrency = []
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
            paramsSearch.category = 5
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
      remoteMethodProvince(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getProvinceList(paramsSearch).then(
              res => {
                this.optionsProvince = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsProvince = []
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
      // 货品列表顺序
      rowClassName({ row, rowIndex }) {
        row.xh = rowIndex + 1
      },
      // 选中新建表单货品项
      handleDetailSelectionChange(selection) {
        if (selection.length > 1) {
          this.$refs.tableAdd.clearSelection()
          this.$refs.tableAdd.toggleRowSelection(selection.pop())
        } else {
          this.checkedDetail = selection
        }
      },
      // 选中编辑表单货品项
      handleDetailSelectionChangeEdit(selection) {
        if (selection.length > 1) {
          this.$refs.tableEdit.clearSelection()
          this.$refs.tableEdit.toggleRowSelection(selection.pop())
        } else {
          this.checkedDetailEdit = selection
        }
      },
      // 删除选中表单货品项
      handleDeleteDetails() {
        if (this.checkedDetail.length === 0) {
          this.$alert('请先选择要删除的数据', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.OrderDetailsList.splice(this.checkedDetail[0].xh - 1, 1)
        }
      },
      // 删除选中编辑表单货品项
      handleDeleteDetailsEdit() {
        if (this.checkedDetailEdit.length === 0) {
          this.$alert('请先选择要删除的数据', '提示', {
            confirmButtonText: '确定'
          })
        } else {
          this.OrderDetailsList.splice(this.checkedDetailEdit[0].xh - 1, 1)
        }
      },
      // 删除全部表单货品项
      handleDeleteAllDetails() {
        this.OrderDetailsList = undefined
      },
      // 删除编辑全部表单货品项
      handleDeleteAllDetailsEdit() {
        this.OrderDetailsList = undefined
      },
      // 添加表单货品项
      handleAddDetails() {
        if (this.OrderDetailsList === undefined) {
          this.OrderDetailsList = []
        }
        const obj = {
          id: 'n'
        }
        this.OrderDetailsList.push(obj)
      },
      // 添加编辑表单货品项
      handleAddDetailsEdit() {
        if (this.OrderDetailsList === undefined) {
          this.OrderDetailsList = []
        }
        const obj = {
          id: 'n'
        }
        this.OrderDetailsList.push(obj)
        console.log(this.OrderDetailsList)
      },
      rowStyle({ row, rowIndex}) {
        let row_style = {}
        if (row.is_staff === 1) {
          row_style = {
            backgroundColor: '#db8449'
          }
        } else if (row.is_staff === 0) {
          row_style = {
            backgroundColor: '#e49e61'
          }
        }
        return row_style
      },
      // 重置筛选
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
