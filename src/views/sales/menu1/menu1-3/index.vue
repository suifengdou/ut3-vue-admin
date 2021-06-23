<template functional>
  <div style="padding:30px;">
    <el-button type="primary" icon="el-icon-plus" size="mini" @click="addRow">添加</el-button>
    <el-table
      ref="tb"
      v-loading="loading"
      :data="bcglXiangXiList"
      :row-class-name="rowClassName"
      @selection-change="handleDetailSelectionChange"
    >
      <el-table-column type="selection" width="30" align="center" />
      <el-table-column label="序号" align="center" prop="xh" width="50" />
      <el-table-column label="开始时间/最早时间-结束时间/最晚时间" width="250" prop="sjfw">
        <template slot-scope="scope">
          <el-time-picker
            v-model="bcglXiangXiList[scope.row.xh-1].sjfw"
            is-range
            format="HH:mm"
            value-format="HH:mm"
            :style="{width: '100%'}"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            clearable
          />

        </template>
      </el-table-column>
      <el-table-column label="最小井下累计时间-最大井下累计时间" width="250" prop="jxsjfw">
        <template slot-scope="scope">
          <el-time-picker
            v-model="bcglXiangXiList[scope.row.xh-1].jxsjfw"
            is-range
            format="HH:mm"
            value-format="HH:mm"
            :style="{width: '100%'}"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="至"
            clearable
            @change="changejxsjfw(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'UsersContainer',
  data() {
    return {
      bcglXiangXiList: [],
      checkedDetail: []
    }
  },
  created() {
    console.log('11111111')
  },
  methods: {
    addRow() {
      console.log('1111234243243241111')
    },
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    handleDetailSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.tb.clearSelection()
        this.$refs.tb.toggleRowSelection(selection.pop())
      } else {
        this.checkedDetail = selection
      }
    },
    handleDeleteDetails() {
      if (this.checkedDetail.length == 0) {
        this.$alert('请先选择要删除的数据', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.bcglXiangXiList.splice(this.checkedDetail[0].xh - 1, 1)
      }
    },
    handleDeleteAllDetails() {
      this.bcglXiangXiList = undefined
    },
    handleAddDetails() {
      console.log('我是添加一行')
      if (this.bcglXiangXiList == undefined) {
        this.bcglXiangXiList = new Array()
      }
      const obj = {}
      obj.ts = '1'
      obj.dkdd = '1'
      obj.sjfw = ['07:00', '07:30']
      obj.jxsjfw = ['06:00', '12:00']

      this.bcglXiangXiList.push(obj)
    }
  }
}
</script>
