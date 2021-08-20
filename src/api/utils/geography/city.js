import request from '@/utils/request'

// 国籍
// 获取列表
export function getCityList(params) {
  return request({
    url: '/utils/geography/city/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCity(data) {
  return request({
    url: `/utils/geography/city/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCity(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/utils/geography/city/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCity(data) {
  return request({
    url: `/utils/geography/city/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCity(data) {
  return request({
    url: `/utils/geography/city/excel_import/`,
    method: 'post',
    data
  })
}

