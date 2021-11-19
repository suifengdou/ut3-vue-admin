<template>
  <div class="company-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.name" class="grid-content bg-purple" placeholder="请输入平台名称" @keyup.enter.native="fetchData">
                <el-button slot="append" icon="el-icon-search" @click="fetchData" />
              </el-input>
            </el-tooltip>
          </div>

        </el-col>
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="点击弹出导入界面" placement="top-start">
              <el-button type="success" @click="handleImport">导入</el-button>
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
                      <el-col :span="6"><el-form-item label="创建者" prop="creator">
                        <el-input v-model="params.creator" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="平台名称" prop="category">
                        <el-select
                          v-model="params.category"
                          filterable
                          default-first-option
                          reserve-keyword
                          placeholder="请选择类型"
                        >
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
        <el-table-column label="ID">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击绿色按钮进入编辑" placement="top-start">
              <el-tag type="success"  @click="handleEdit(scope.row)"><span>{{ scope.row.id }}</span></el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="公司简称"
          prop="name"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="公司全称"
          prop="company"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="公司税号"
          prop="tax_fil_number"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.tax_fil_number }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="公司类型"
          prop="category"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.category.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="普票限额"
          prop="spain_invoice"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.spain_invoice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="专票限额"
          prop="special_invoice"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.special_invoice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="折扣率"
          prop="discount_rate"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.discount_rate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="order_status"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_status.name }}</span>
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
            <span>相关信息</span>
          </div>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="公司简称" prop="name">
              <el-input v-model="formAdd.name" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="公司类型" prop="category">
              <template>
                <el-select
                  v-model="formAdd.category"
                  filterable
                  default-first-option
                  reserve-keyword
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionsCategory"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="公司全称" prop="company">
              <el-input v-model="formAdd.company" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="公司税号" prop="tax_fil_number">
              <el-input v-model="formAdd.tax_fil_number" placeholder="请输入名称" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="普票限额" prop="spain_invoice">
              <el-input v-model="formAdd.spain_invoice" placeholder="请输入名称" />
            </el-form-item></el-col>
            <el-col :span="8"><el-form-item label="专票限额" prop="special_invoice">
              <el-input v-model="formAdd.special_invoice" placeholder="请输入名称" />
            </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"><el-form-item label="折扣率" prop="discount_rate">
              <el-input v-model="formAdd.discount_rate" placeholder="请输入名称" />
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
                <el-col :span="8"><el-form-item label="公司简称" prop="name">
                  <el-input v-model="formEdit.name" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="公司类型" prop="category">
                  <template>
                    <el-select
                      v-model="formEdit.category"
                      filterable
                      default-first-option
                      reserve-keyword
                      placeholder="请选择类型"
                    >
                      <el-option
                        v-for="item in optionsCategory"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </template>
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="公司全称" prop="company">
                  <el-input v-model="formEdit.company" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="公司税号" prop="tax_fil_number">
                  <el-input v-model="formEdit.tax_fil_number" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="普票限额" prop="spain_invoice">
                  <el-input v-model="formEdit.spain_invoice" placeholder="请输入名称" />
                </el-form-item></el-col>
                <el-col :span="8"><el-form-item label="专票限额" prop="special_invoice">
                  <el-input v-model="formEdit.special_invoice" placeholder="请输入名称" />
                </el-form-item></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8"><el-form-item label="折扣率" prop="discount_rate">
                  <el-input v-model="formEdit.discount_rate" placeholder="请输入名称" />
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
    导入模态窗
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
              <el-button type="primary" @click="importExcel">导入文件</el-button>
              <el-button type="error" @click="closeImport">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

    </el-dialog>
    <!--页脚-->
    <div class="tableFoots">
      <center>
        <el-pagination background layout="total, prev, pager, next, jumper" :total="totalNum" :page-size="pageSize" @current-change="handleCurrentChange" />
      </center>
    </div>
    <!--<div class="photo-container">-->
      <!--<img src="http://ut3s2.oss-cn-beijing.aliyuncs.com/2021%2F11%2F16%2F2021111683878c91171338902e0fe0fb97a8c47a.png" />-->
    <!--</div>-->
  </div>

</template>

<script>
import { getCompanyList, createCompany, updateCompany, excelImportCompany } from '@/api/base/company'
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
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      importVisible: false,
      formAdd: {},
      formEdit: {},
      importFiles: [],
      optionsCategory: [
        {
          label: '本埠公司',
          value: 0
        },
        {
          label: '物流快递',
          value: 1
        },
        {
          label: '仓库存储',
          value: 2
        },
        {
          label: '生产制造',
          value: 3
        },
        {
          label: '经销代理',
          value: 4
        },
        {
          label: '小狗体系',
          value: 5
        },
        {
          label: '其他类型',
          value: 6
        }
      ],
      rules: {
        name: [
          { required: true, message: '请选择店铺', trigger: 'blur' }
        ]
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
      // console.log(this.params.create_time)
      if (typeof (this.params.create_time) !== 'undefined') {
        if (this.params.create_time.length === 2) {
          this.params.create_time_after = moment.parseZone(this.params.create_time[0]).local().format('YYYY-MM-DD HH:MM:SS')
          this.params.create_time_before = moment.parseZone(this.params.create_time[1]).local().format('YYYY-MM-DD HH:MM:SS')
        }
      }
      getCompanyList(this.params).then(
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
      createCompany(this.formAdd).then(
        () => {
          this.fetchData()
          this.handleCancelAdd()
        }
      ).catch(
        (error) => {
          this.$notify({
            title: '更新错误',
            message: error.data,
            type: 'error',
            duration: 0
          })
          this.handleCancelAdd()
          this.fetchData()
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
      this.formEdit.order_status = this.formEdit.order_status.id
      this.formEdit.category = this.formEdit.category.id
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
        updateCompany(id, data).then(
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
            this.dialogVisibleEdit = false
            this.fetchData()
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
    // 导入
    getFile(event) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.importFiles.push(event.target.files[i])
        console.log(this.importFiles)
      }
    },
    importExcel() {
      const importformData = new FormData()
      for (let i = 0; i < this.importFiles.length; i++) {
        importformData.append('files', this.importFiles[i])
      }
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.tableLoading = true
      excelImportCompany(importformData, config).then(
        res => {
          this.$notify({
            title: '导入结果',
            message: res.data,
            type: 'success',
            duration: 0
          })
        },
        error => {
          this.$notify({
            title: '导入错误',
            message: error,
            type: 'error',
            duration: 0
          })
        }
      ).catch(
        () => {
          console.log('1')
        }
      )
      this.$refs.files.type = 'text'
      this.$refs.files.value = ''
      this.$refs.files.type = 'file'
      this.closeImport()
      this.tableLoading = false
      this.fetchData()
    },
    closeImport() {
      this.importVisible = false
    },
    handleImport() {
      this.importVisible = true
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
