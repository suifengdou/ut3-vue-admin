import request from '@/utils/request'

export function getGroupsList(params) {
  return request({
    url: '/auth/groups/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createGroup(data) {
  return request({
    url: '/auth/groups/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateGroup(id, data) {
  return request({
    url: `/auth/groups/${id}/`,
    method: 'patch',
    data
  })
}

