import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderSubmit(params) {
  return request({
    url: '/workorder/dealers/dwosubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealers/dwosubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/dealers/dwosubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealers/dwosubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealers/dwosubmit/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealers/dwosubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealers/dwosubmit/reject/`,
    method: 'patch',
    data
  })
}
