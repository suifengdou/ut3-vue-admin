import request from '@/utils/request'

// 国籍
// 获取列表
export function getNationalityList(params) {
  return request({
    url: '/utils/geography/nationality/',
    method: 'get',
    params
  })
}

// 创建工单
export function createNationality(data) {
  return request({
    url: `/utils/geography/nationality/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateNationality(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/utils/geography/nationality/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportNationality(data) {
  return request({
    url: `/utils/geography/nationality/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportNationality(data) {
  return request({
    url: `/utils/geography/nationality/excel_import/`,
    method: 'post',
    data
  })
}

