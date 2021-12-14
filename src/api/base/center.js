import request from '@/utils/request'

export function getCenterList(params) {
  return request({
    url: '/base/center/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createCenter(data) {
  return request({
    url: '/base/center/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateCenter(id, data) {
  return request({
    url: `/base/center/${id}/`,
    method: 'patch',
    data
  })
}
