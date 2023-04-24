import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderAudit(params) {
  return request({
    url: '/workorder/storage/swoaudit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderAudit(data) {
  return request({
    url: `/workorder/storage/swoaudit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderAudit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/storage/swoaudit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderAudit(data) {
  return request({
    url: `/workorder/storage/swoaudit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderAudit(data) {
  return request({
    url: `/workorder/storage/swoaudit/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderAudit(data) {
  return request({
    url: `/workorder/storage/swoaudit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderAudit(data) {
  return request({
    url: `/workorder/storage/swoaudit/reject/`,
    method: 'patch',
    data
  })
}
