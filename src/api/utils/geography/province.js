import request from '@/utils/request'

// 国籍
// 获取列表
export function getProvinceList(params) {
  return request({
    url: '/utils/geography/province/',
    method: 'get',
    params
  })
}

// 创建工单
export function createProvince(data) {
  return request({
    url: `/utils/geography/province/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateProvince(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/utils/geography/province/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportProvince(data) {
  return request({
    url: `/utils/geography/province/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportProvince(data) {
  return request({
    url: `/utils/geography/province/excel_import/`,
    method: 'post',
    data
  })
}

