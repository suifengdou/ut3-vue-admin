import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/token/',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/auth/users/users/get_user_info/',
    method: 'get'
  })
}

// 获取用户组列表
export function getUserList(params) {
  return request({
    url: '/auth/users/users/',
    method: 'get',
    params
  })
}

export function deleteUser(id) {
  const data = {
    'is_staff': 0,
    'is_active': 0
  }
  return request({
    url: `/auth/users/users/${id}/`,
    method: 'patch',
    data
  })
}

export function updateUser(id, data) {
  delete data.create_time
  delete data.update_time
  delete data.password
  return request({
    url: `/auth/users/users/${id}/`,
    method: 'patch',
    data
  })
}

export function createUser(data) {
  return request({
    url: `/auth/users/users/`,
    method: 'post',
    data
  })
}



export function updateUserPassword(data) {
  return request({
    url: `/auth/users/users/change_password/`,
    method: 'patch',
    data
  })
}


export function resetUserPassword(id, data) {
  return request({
    url: `/auth/users/users/${id}/reset_password/`,
    method: 'patch',
    data
  })
}
