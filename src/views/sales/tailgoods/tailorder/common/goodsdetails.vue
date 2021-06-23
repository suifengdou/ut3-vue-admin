<template>
  <div class="tailorder-goods-common-container">
    <div class="tableTitle">
      <el-row :gutter="20">
        <el-col :span="5" class="titleBar">
          <div class="grid-content bg-purple">
            <el-tooltip class="item" effect="dark" content="快捷搜索" placement="top-start">
              <el-input v-model="params.sent_smartphone" class="grid-content bg-purple" placeholder="请输入收件人手机" @keyup.enter.native="fetchData">
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
                    <el-row :gutter="20" />
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="源单号" prop="order_id">
                        <el-input v-model="params.order_id" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="收件人" prop="sent_consignee">
                        <el-input v-model="params.sent_consignee" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6">
                        <el-form-item label="手机" prop="sent_smartphone">
                          <el-input v-model="params.sent_smartphone" type="text" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="货品总数" prop="quantity">
                          <el-input v-model="params.quantity" type="text" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="6"><el-form-item label="尾货订单总价" prop="amount">
                        <el-input v-model="params.amount" type="text" />
                      </el-form-item></el-col>
                      <el-col :span="6"><el-form-item label="订单留言" prop="message">
                        <el-input v-model="params.message" type="text" />
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
            <el-tooltip class="item" effect="dark" content="点击绿色按钮进入编辑" placement="top-start">
              <el-button class="page-button" type="success" size="mini"><span>{{ scope.row.id }}</span></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺"
          prop="shop"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.shop }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原始单号"
          prop="order_id"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="网名"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_consignee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收件人"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_consignee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          prop="sent_address"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_smartphone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发货条件"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.deliver_condition }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="优惠金额"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.discounts }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮费"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.post_fee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品价格"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品总价"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="应收合计"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商家编码"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品名称"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.goods_nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品数量"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单类别"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.order_category }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="买家留言"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="省"
          prop="sent_province"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_province }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="市"
          prop="sent_city"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_city }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="区"
          prop="sent_district"
          sortable="custom"
          :sort-orders="['ascending','descending']"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sent_district }}</span>
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
    <!--页脚-->
    <div class="tableFoots">
      <center>
        <el-pagination background layout="total, prev, pager, next, jumper" :total="totalNum" :page-size="pageSize" @current-change="handleCurrentChange" />
      </center>
    </div>
  </div>
</template>

<script>
import { getTailOrderGoodsCommonList, exportTailOrderGoodsCommonCheck } from '@/api/sales/tailgoods/togoods'
import { getShopList } from '@/api/base/shop'
import { getCompanyList } from '@/api/base/company'
import { getGoodsList } from '@/api/base/goods'
import { getCityList } from '@/api/utils/geography'
import moment from 'moment'
import XLSX from 'xlsx'
export default {
  name: 'TailorderSubmit',
  data() {
    return {
      DataList: [],
      tableLoading: false,
      totalNum: 0,
      pageSize: 30,
      selectNum: 0,
      tableData: {
      },
      params: {
        page: 1,
        allSelectTag: 0
      }
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
      getTailOrderGoodsCommonList(this.params).then(
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
            exportTailOrderGoodsCommonCheck(this.params).then(
              res => {
                res.data = res.data.map(item => {
                  return {
                    店铺: item.shop,
                    原始单号: item.order_id,
                    网名: item.sent_consignee,
                    收件人: item.sent_consignee,
                    地址: item.sent_address,
                    手机: item.sent_smartphone,
                    发货条件: item.deliver_condition,
                    优惠金额: item.discounts,
                    邮费: item.post_fee,
                    货品价格: item.settlement_price,
                    货品总价: item.settlement_amount,
                    商家编码: item.goods_id,
                    货品名称: item.goods_nickname,
                    货品数量: item.quantity,
                    订单类别: item.order_category,
                    买家留言: item.message,
                    省: item.sent_province,
                    市: item.sent_city,
                    区: item.sent_district,
                    创建者: item.creator,
                    创建时间: item.create_time
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
