import request from '@/utils/request'

export function getWarehouseList(params) {
  return request({
    url: '/base/warehouse/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createWarehouse(data) {
  return request({
    url: '/base/warehouse/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateWarehouse(id, data) {
  return request({
    url: `/base/warehouse/${id}/`,
    method: 'patch',
    data
  })
}

export function getWarehouseTypeList(params) {
  return request({
    url: '/base/warehousetype/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createWarehouseType(data) {
  return request({
    url: '/base/warehousetype/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateWarehouseType(id, data) {
  return request({
    url: `/base/warehousetype/${id}/`,
    method: 'patch',
    data
  })
}
