<template>
  <div class="invoice-submit-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.mobile" class="grid-content bg-purple" placeholder="请输入手机" @keyup.enter.native="fetchData">
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
                      <el-col :span="6"><el-form-item label="服务单" prop="swo_order">
                        <el-input v-model="params.swo_order__order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="来源单号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6" />
                      <el-col :span="6" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8"><el-form-item label="发货编号" prop="erp_order_id">
                        <el-input v-model="params.erp_order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="8"><el-form-item label="手机" prop="mobile">
                        <el-input v-model="params.mobile" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="4" />
                      <el-col :span="4" />
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8"><el-form-item label="用户ID" prop="nickname">
                        <el-input v-model="params.nickname" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="8"><el-form-item label="诉求" prop="demand">
                        <el-input v-model="params.demand" type="text" />
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
      >
        <el-table-column
          label="ID"
        >
          <template slot-scope="scope">
            <el-tag type="success"><span>{{ scope.row.id }}</span></el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="UT单号"
          prop="erp_order_id"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.erp_order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="错误原因"
          prop="mistake_tag"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mistake_tag.name }}</span>
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
          label="网名"
          prop="nickname"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="收件人"
          prop="receiver"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.receiver }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          prop="address"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="手机"
          prop="mobile"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="货品"
          prop="goods_detail"
        >
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.goods_details">
              <el-tag type="success" size="mini" effect="dark"><span>{{ item.name.name }}*{{ item.quantity }}</span></el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="省"
          prop="province"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.province.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="市"
          prop="city"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.city.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="区"
          prop="district"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.district.name }}</span>
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
          label="创建部门"
          prop="department"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.department.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单号"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
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
    getInvoiceManageList,
    exportInvoiceManage,
  } from '@/api/wop/satisfaction/invoice/manage'
  import { getShopList } from '@/api/base/shop'
  import { getCompanyList } from '@/api/base/company'
  import { getGoodsList } from '@/api/base/goods'
  import { getCustomerList } from '@/api/crm/customers/customers'
  import { getCityList } from '@/api/utils/geography/city'
  import { getDistrictList } from '@/api/utils/geography/district'
  import moment from 'moment'
  import XLSX from 'xlsx'
  export default {
    name: 'InvoiceManage',
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
        formAdd: {},
        formEdit: {},
        importFile: {},
        optionsCustomer: [],
        optionsDepartment: [],
        optionsCompany: [],
        optionsPlatform: [],
        optionsProvince: [],
        optionsCity: [],
        optionsDistrict: [],
        optionsGoods: [],
        optionsCategory: [
          {
            value: 1,
            label: '发出货品'
          },
          {
            value: 2,
            label: '退回货品'
          },
          {
            value: 3,
            label: '单纯费用'
          },
          {
            value: 4,
            label: '单纯收入'
          },
        ],
        OrderDetailsList: [],
        oriInvoiceGoodsListEdit: [],
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
        getInvoiceManageList(this.params).then(
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
        let attrStr
        const transFieldStr = ['mistake_tag', 'process_tag', 'department', 'order_status', 'province', 'city', 'district', 'department']
        for (attrStr in transFieldStr) {
          this.formEdit[transFieldStr[attrStr]] = this.formEdit[transFieldStr[attrStr]].id
        }

        this.optionsCustomer = [{ label: this.formEdit.customer.name, value: this.formEdit.customer.id }]
        this.formEdit.customer = this.formEdit.customer.id

        this.optionsGoods = this.formEdit.goods_details.map(item => {
          return { label: item.name.name, value: item.name.id }
        })
        console.log(this.optionsGoods)

        this.OrderDetailsList = []
        let index
        for (index in this.formEdit.goods_details) {
          this.formEdit.goods_details[index].xh = index + 1
          this.formEdit.goods_details[index].goods_name = this.formEdit.goods_details[index].name.id
          this.OrderDetailsList.push(this.formEdit.goods_details[index])
          console.log(this.OrderDetailsList)
        }
      },
      // 提交编辑完成的数据
      handleSubmitEdit() {
        this.$refs.handleFormEdit.validate(valid => {
          if (!valid) {
            return
          }
          this.formEdit.goods_details = this.OrderDetailsList
          const { id, ...data } = this.formEdit
          updateInvoiceManage(id, data).then(
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
        console.log(this.OrderDetailsList)
        this.formAdd.goods_details = this.OrderDetailsList
        createInvoiceManage(this.formAdd).then(
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
              exportInvoiceManage(this.params).then(
                res => {
                  res.data = res.data.map(item => {
                    return {
                      店铺: item.shop.name,
                      网名: item.nickname,
                      收件人: item.receiver,
                      地址: item.address,
                      手机: item.mobile,
                      订单号: item.order_id,
                      单据类型: item.order_category.name,
                      机器序列号: item.m_sn,
                      故障部位: item.broken_part,
                      故障描述: item.description,
                      客服: item.servicer,
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
      // 提交编辑完成的数据
      selectExpress(row) {
        console.log(row)
        const { id, ...details } = row
        const data = {
          assign_express: details.assign_express.id
        }
        console.log(data, id)
        updateInvoiceManage(id, data).then(
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
      remoteMethodCustomer(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getCustomerList(paramsSearch).then(
              res => {
                this.optionsCustomer = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsCustomer = []
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
          this.optionsCity = []
        }
      },
      remoteMethodDistrict(query) {
        if (query !== '') {
          // console.log("我准备开始检索啦")
          setTimeout(() => {
            // console.log("我是真正的开始检索啦")
            const paramsSearch = {}
            paramsSearch.name = query
            getCityList(paramsSearch).then(
              res => {
                this.optionsDistrict = res.data.results.map(item => {
                  return { label: item.name, value: item.id }
                })
              }
            )
          }, 200)
        } else {
          this.optionsDistrict = []
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
        if (row.process_tag.id === 1) {
          row_style = {
            backgroundColor: '#db8449'
          }
        } else if (row.process_tag.id === 2) {
          row_style = {
            backgroundColor: '#e49e61'
          }
        } else if (row.process_tag.id === 3) {
          row_style = {
            backgroundColor: '#f39800'
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
