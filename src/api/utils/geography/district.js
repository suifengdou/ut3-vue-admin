import request from '@/utils/request'

// 国籍
// 获取列表
export function getDistrictList(params) {
  return request({
    url: '/utils/geography/district/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDistrict(data) {
  return request({
    url: `/utils/geography/district/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDistrict(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/utils/geography/district/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDistrict(data) {
  return request({
    url: `/utils/geography/district/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDistrict(data) {
  return request({
    url: `/utils/geography/district/excel_import/`,
    method: 'post',
    data
  })
}

