<template>
  <div class="groups-container">
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisibleEdit"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template>
        <div class="FormEdit">
          <el-form
            ref="formEdit"
            label-width="80px"
            size="mini"
            :model="formEdit"
          >
            <el-form-item label="原密码" prop="password">
              <el-input v-model="formEdit.password" placeholder="请输入原密码" />
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
              <el-input v-model="formEdit.new_password" type="password" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item label="重复密码" prop="pwd_repeat">
              <el-input v-model="formEdit.pwd_repeat" type="password" placeholder="请重复密码" />
            </el-form-item>
            <el-form-item size="large">
              <div class="btn-warpper">
                <el-button type="primary" @click="handleSubmitEdit">立即修改</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { updateUserPassword } from '@/api/auth/user'
export default {
  name: 'ResetPassword',
  data() {
    return {
      dialogVisibleEdit: true,
      formEdit: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit() {
      console.log()
    },
    // 提交编辑完成的数据
    handleSubmitEdit() {
      const { ...data } = this.formEdit
      console.log(data)
      updateUserPassword(data).then(
        () => {
          this.$store.dispatch('user/logout')
          this.$router.push(`/login`)
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
    }
  }
}
</script>

<style lang="scss" scoped>

.el-transfer-panel__list.is-filterable{
  width:400px !important;
  height:500px !important;
}

.el-transfer-panel{
  width: 400px !important;
  height: 500px !important;
}

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

.el-transfer-panel {
  width: 400px;
}
</style>
