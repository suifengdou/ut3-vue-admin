import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import ElementUI from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response
    return res
  },
  error => {
    // console.log(error.response)
    if (error.response.status === 401) {
      if (error.response.data.code === 'token_not_valid') {
        MessageBox.confirm('登陆超时，请重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (error.response.data.code === 'user_inactive') {
        MessageBox.confirm('用户未激活', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: '用户名密码错误，请重新输入',
          type: 'error',
          duration: 5 * 1000
        })
        // console.log(error)
        return Promise.reject(error)
      }
      location.reload()
    }
    if (error.response.status === 403) {
      MessageBox.confirm('您没有使用的权限，请联系管理员获得权限后操作', '权限不足', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(error.response)
      })
    }
    // console.log('err' + error)// for debug
    // console.log("I'm processing")
    // ElementUI.Notification({
    //   title: '警告',
    //   message: error.response.data,
    //   type: 'warning',
    //   duration: 0
    // })
    return Promise.reject(error.response)
  }
)

export default service
