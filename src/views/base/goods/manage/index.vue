<template>
  <div class="goods-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.name" class="grid-content bg-purple" placeholder="请输入货品名称" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="支持多个编码查询" placement="top-start">
              <el-input v-model="params.goods_id_range" class="grid-content bg-purple" placeholder="请输入货品编码" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

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
                      <el-col :span="6"><el-form-item label="机器排序" prop="goods_number">
                        <el-input v-model="params.goods_number" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="货品类别" prop="category">
                        <el-select
                          v-model="params.category"
                          filterable
                          default-first-option
                          remote
                          reserve-keyword
                          placeholder="例如吸尘器等"
                          :remote-method="remoteMethodGoodsCategory"
                        >
                          <el-option
                            v-for="item in optionsGoodsCategory"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="货品属性" prop="goods_attribute">
                        <el-select
                          v-model="params.goods_attribute"
                          filterable
                          default-first-option
                          reserve-keyword
                          placeholder="请选择属性"
                        >
                          <el-option
                            v-for="item in optionsGoodsAttribute"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
                      </el-form-item></el-col>
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
        style="width: 100%"
        @sort-change="onSortChange"
      >
        <el-table-column label="ID">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击绿色按钮进入编辑" placement="top-start">
              <el-tag type="success" @click="handleEdit(scope.row)"><span>{{ scope.row.id }}</span></el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="货品名称"
          prop="name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品编码"
          prop="goods_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品类别"
          prop="category"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.category.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品属性"
          prop="goods_attribute"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_attribute.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="机器排序"
          prop="goods_number"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="规格"
          prop="size"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.size }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="长"
          prop="width"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.width }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="宽"
          prop="height"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.height }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="高"
          prop="depth"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.depth }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          prop="weight"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.weight }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="爆炸图号"
          prop="catalog_num"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.catalog_num }}</span>
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
            <span>平台相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="货品名称" prop="name">
              <el-input v-model="formAdd.name" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="货品编码" prop="goods_id">
              <el-input v-model="formAdd.goods_id" placeholder="请输入编码" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="货品类别" prop="category">
              <template>
                <el-select
                  v-model="formAdd.category"
                  filterable
                  default-first-option
                  remote
                  reserve-keyword
                  placeholder="请选择类别"
                  :remote-method="remoteMethodGoodsCategory"
                >
                  <el-option
                    v-for="item in optionsGoodsCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="货品属性" prop="goods_attribute">
              <template>
                <el-select
                  v-model="formAdd.goods_attribute"
                  filterable
                  default-first-option
                  reserve-keyword
                  placeholder="请选择属性"
                >
                  <el-option
                    v-for="item in optionsGoodsAttribute"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">

            <el-col :span="8"><el-form-item label="机器排序" prop="goods_number">
              <el-input v-model="formAdd.goods_number" placeholder="请输入排序" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="规格" prop="size">
              <el-input v-model="formAdd.size" placeholder="请输入规格" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="长" prop="width">
              <el-input v-model="formAdd.width" placeholder="请输入长" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="宽" prop="height">
              <el-input v-model="formAdd.height" placeholder="请输入宽" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="高" prop="depth">
              <el-input v-model="formAdd.depth" placeholder="请输入高" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="重量" prop="weight">
              <el-input v-model="formAdd.weight" placeholder="请输入重量" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="爆炸图号" prop="catalog_num">
              <el-input v-model="formAdd.catalog_num" placeholder="请输入爆炸图号" />
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
            ref="FormEdit"
            label-width="80px"
            size="mini"
            :model="formEdit"
            :rules="rules"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>相关信息</span>
              </div>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="货品名称" prop="name">
                  <el-input v-model="formEdit.name" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="货品编码" prop="goods_id">
                  <el-input v-model="formEdit.goods_id" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="货品类别" prop="category">
                  <template>
                    <el-select
                      v-model="formEdit.category"
                      filterable
                      default-first-option
                      remote
                      reserve-keyword
                      placeholder="请选择类别"
                      :remote-method="remoteMethodGoodsCategory"
                    >
                      <el-option
                        v-for="item in optionsGoodsCategory"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="货品属性" prop="goods_attribute">
                  <template>
                    <el-select
                      v-model="formEdit.goods_attribute"
                      filterable
                      default-first-option
                      reserve-keyword
                      placeholder="请选择属性"
                    >
                      <el-option
                        v-for="item in optionsGoodsAttribute"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">

                <el-col :span="8"><el-form-item label="机器排序" prop="goods_number">
                  <el-input v-model="formEdit.goods_number" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="规格" prop="size">
                  <el-input v-model="formEdit.size" placeholder="请输入规格" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="长" prop="width">
                  <el-input v-model="formEdit.width" placeholder="请输入长" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="宽" prop="height">
                  <el-input v-model="formEdit.height" placeholder="请输入宽" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="高" prop="depth">
                  <el-input v-model="formEdit.depth" placeholder="请输入高" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="重量" prop="weight">
                  <el-input v-model="formEdit.weight" placeholder="请输入重量" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="爆炸图号" prop="catalog_num">
                  <el-input v-model="formEdit.catalog_num" placeholder="请输入爆炸图号" />
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
import { getGoodsList, createGoods, updateGoods, getGoodsCategoryList, excelImportGoods, exportGoods, getLogGoods } from '@/api/base/goods'
import moment from 'moment'
export default {
  name: 'OriInvoiceSubmit',
  data() {
    return {
      DataList: [],
      tableLoading: false,
      totalNum: 0,
      pageSize: 30,
      params: {
        page: 1
      },
      logViewVisible: false,
      logDetails: [],
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      formAdd: {},
      formEdit: {},
      optionsGoodsCategory: [],
      optionsGoodsAttribute: [
        {
          label: '整机',
          value: 1
        },
        {
          label: '配件',
          value: 2
        },
        {
          label: '礼品',
          value: 3
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        goods_id: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择类别', trigger: 'blur', type: 'number' }
        ],
        goods_attribute: [
          { required: true, message: '请选择属性', trigger: 'blur', type: 'number' }
        ],
        goods_number: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表
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
      getGoodsList(this.params).then(
        res => {
          this.DataList = res.data.results
          this.totalNum = res.data.count
          this.tableLoading = false
          console.log(res.data.results)
        }
      ).catch(
        (error) => {
          this.$notify({
            title: '更新错误',
            message: error.data,
            type: 'error',
            duration: 0
          })
        }
      )
    },
    // 跳转页面
    handleCurrentChange(val) {
      this.params.page = val
      this.fetchData()
    },
    // 添加
    add() {
      this.dialogVisibleAdd = true
    },
    // 提交添加
    handleSubmitAdd() {
      console.log(this.formAdd)
      createGoods(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch(
        (error) => {
          this.$notify({
            title: '创建错误',
            message: error.data,
            type: 'error',
            duration: 0
          })
        }
      )
    },
    // 关闭添加界面
    handleCancelAdd() {
      this.dialogVisibleAdd = false
      this.$refs.handleFormAdd.resetFields()
    },
    // 编辑
    handleEdit(values) {
      console.log(values)
      this.formEdit = { ...values }

      this.optionsGoodsCategory = [{ label: this.formEdit.category.name, value: this.formEdit.category.id }]
      this.formEdit.category = this.formEdit.category.id

      this.formEdit.goods_attribute = this.formEdit.goods_attribute.id

      this.dialogVisibleEdit = true
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      this.$refs.FormEdit.validate(valid => {
        if (!valid) {
          return
        }
        const { id, ...data } = this.formEdit
        console.log(data)
        updateGoods(id, data).then(
          () => {
            this.dialogVisibleEdit = false
            this.fetchData()
          }).catch(
          (error) => {
            this.$notify({
              title: '更新错误',
              message: error.data,
              type: 'error',
              duration: 0
            })
          }
        )
      })
    },
    // 关闭修改界面
    handleCancelEdit() {
      this.dialogVisibleEdit = false
      this.$refs.FormEdit.resetFields()
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
    remoteMethodGoodsCategory(query) {
      console.log(query)
      if (query !== '') {
        setTimeout(() => {
          const paramsSearch = {}
          paramsSearch.name = query
          getGoodsCategoryList(paramsSearch).then(
            res => {
              this.optionsGoodsCategory = res.data.results.map(item => {
                return { label: item.name, value: item.id }
              })
            }
          )
        }, 200)
      } else {
        this.options = []
      }
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
            excelImportGoods(importformData, config).then(
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
              }).catch(
              (error) => {
                this.$notify({
                  title: '更新错误',
                  message: error.data,
                  type: 'error',
                  duration: 0
                })
                instance.confirmButtonLoading = false
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
          this.$notify({
            title: '更新错误',
            message: error.data,
            type: 'error',
            duration: 0
          })
          instance.confirmButtonLoading = false
          done()
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
      getLogGoods(data).then(
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
            exportGoods(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    货品名称: item.name,
                    商家编码: item.goods_id,
                    货品类别: item.category.name,
                    货品属性: item.goods_attribute.name,
                    货品排序: item.goods_number,
                    规格: item.size,
                    长: item.width,
                    宽: item.height,
                    高: item.depth,
                    重量: item.weight,
                    爆炸图号: item.catalog_num
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
