<template>
  <div class="user-form">
    <el-form
      ref="form"
      label-width="80px"
      size="mini"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="名称" prop="username">
        <el-input v-model="form.username" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="重复密码" prop="pwd_repeat">
        <el-input v-model="form.pwd_repeat" type="password" placeholder="请重复密码" />
      </el-form-item>
      <el-form-item label="是否管理员" prop="is_superuser">
        <el-switch
          v-model="form.is_superuser"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item label="名字" prop="first_name">
        <el-input v-model="form.first_name" placeholder="请输入名字" />
      </el-form-item>
      <el-form-item label="姓" prop="last_name">
        <el-input v-model="form.last_name" placeholder="请输入姓" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="员工状态" prop="is_staff">
        <el-switch
          v-model="form.is_staff"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item label="激活状态" prop="is_active">
        <el-switch
          v-model="form.is_active"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nick">
        <el-input v-model="form.nick" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item label="组" prop="groups">
        <template>
          <el-select
            v-model="form.groups"
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
          <el-button type="danger" @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitForm">立即保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getGroupsList } from '@/api/auth/groups'
export default {
  name: 'UserForm',
  props: {
    isLoading: {
      required: true,
      type: Boolean
    }

    // optionsAuthors: [],
    // optionsPublisher: []
  },
  data() {
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
    }
    return {
      form: {
        type: Object,
        default() {
          return {
            id: '',
            username: '',
            password: '',
            pwd_repeat: '',
            is_superuser: false,
            first_name: '',
            last_name: '',
            email: '',
            is_staff: true,
            is_active: true,
            nick: '',
            groups: []
          }
        }
      },
      paramsGroup: {
        name: '',
        page: 1
      },
      paramsUserPermission: {
        name: '',
        page: 1
      },
      optionsGroups: [],
      optionsUserPermissions: [],
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        pwd_repeat: [
          { required: true, message: '请重复密码', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur', required: true }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(value) == false) {
                callback(new Error('邮箱格式错误'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }
        // console.log(this.form)
        this.$emit('submit', this.form)
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    searchOptionGroup(query) {
      const params = {}
      console.log(query)
      params.name = query
      getGroupsList(params).then(
        res => {
          this.optionsGroups = res.data.results.map(item => {
            return { label: item.name, value: item.id }
          })
        }
      )
    }
  }
}
</script>

<style lang='scss' scoped>
  .user-form {
    position: relative;
    display: block;
    .btn-wrapper {
      text-align: right;
    }
  }
</style>
