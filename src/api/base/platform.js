import request from '@/utils/request'

export function getPlatformList(params) {
  return request({
    url: '/base/platform/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createPlatform(data) {
  return request({
    url: '/base/platform/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updatePlatform(id, data) {
  return request({
    url: `/base/platform/${id}/`,
    method: 'patch',
    data
  })
}
