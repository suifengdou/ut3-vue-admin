import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getSWOPFilesList(params) {
  return request({
    url: '/workorder/satisfaction/swopfiles/',
    method: 'get',
    params
  })
}

// 创建工单
export function createSWOPFilesList(data) {
  return request({
    url: `/workorder/satisfaction/swopfiles/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateSWOPFiles(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/satisfaction/swopfiles/${id}/`,
    method: 'patch',
    data
  })
}

// 更新工单
export function deleteSWOPFiles(id) {
  return request({
    url: `/workorder/satisfaction/swopfiles/${id}/`,
    method: 'delete',
  })
}

// 导出工单
export function exportSWOPFiles(data) {
  return request({
    url: `/workorder/satisfaction/swopfiles/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportSWOPFiles(data) {
  return request({
    url: `/workorder/satisfaction/swopfiles/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportSWOPFiles(data) {
  return request({
    url: `/workorder/satisfaction/swopfiles/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkSWOPFiles(data) {
  return request({
    url: `/workorder/satisfaction/swopfiles/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectSWOPFiles(data) {
  return request({
    url: `/workorder/satisfaction/swopfiles/reject/`,
    method: 'patch',
    data
  })
}
