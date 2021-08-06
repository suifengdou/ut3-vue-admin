import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderCheck(params) {
  return request({
    url: '/workorder/storage/swocheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderCheck(data) {
  return request({
    url: `/workorder/storage/swocheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/storage/swocheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderCheck(data) {
  return request({
    url: `/workorder/storage/swocheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderCheck(data) {
  return request({
    url: `/workorder/storage/swocheck/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderCheck(data) {
  return request({
    url: `/workorder/storage/swocheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderCheck(data) {
  return request({
    url: `/workorder/storage/swocheck/reject/`,
    method: 'patch',
    data
  })
}
