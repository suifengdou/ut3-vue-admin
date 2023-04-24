import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderCheck(params) {
  return request({
    url: '/workorder/dealers/dwocheck/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateWorkOrderCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/dealers/dwocheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderCheck(data) {
  return request({
    url: `/workorder/dealers/dwocheck/export/`,
    method: 'patch',
    data
  })
}
// 设置工单
export function setConfirmWorkOrderCheck(data) {
  return request({
    url: `/workorder/dealers/dwocheck/set_confirm/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderCheck(data) {
  return request({
    url: `/workorder/dealers/dwocheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderCheck(data) {
  return request({
    url: `/workorder/dealers/dwocheck/reject/`,
    method: 'patch',
    data
  })
}
