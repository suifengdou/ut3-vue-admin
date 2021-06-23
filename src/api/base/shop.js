import request from '@/utils/request'

export function getShopList(params) {
  return request({
    url: '/base/shop/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createShop(data) {
  return request({
    url: '/base/shop/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateShop(id, data) {
  return request({
    url: `/base/shop/${id}/`,
    method: 'patch',
    data
  })
}
