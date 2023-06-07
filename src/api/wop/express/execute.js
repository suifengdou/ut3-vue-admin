import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderExecute(params) {
  return request({
    url: '/workorder/express/ewoexecute/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateWorkOrderExecute(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/express/ewoexecute/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderExecute(data) {
  return request({
    url: `/workorder/express/ewoexecute/export/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function photoImportWorkOrderExecute(data) {
  return request({
    url: `/workorder/express/ewoexecute/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderExecute(data) {
  return request({
    url: `/workorder/express/ewoexecute/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderExecute(data) {
  return request({
    url: `/workorder/express/ewoexecute/reject/`,
    method: 'patch',
    data
  })
}

// 设置执行内容
export function batchFeedbackWorkOrderExecute(data) {
  return request({
    url: `/workorder/express/ewoexecute/batchtext/`,
    method: 'patch',
    data
  })
}
// 设置执行内容
export function setReturnWorkOrderExecute(data) {
  return request({
    url: `/workorder/express/ewoexecute/set_return/`,
    method: 'patch',
    data
  })
}

// 设置执行内容
export function setReturnTrackIDWorkOrderExecute(data) {
  return request({
    url: `/workorder/express/ewoexecute/set_return_trackid/`,
    method: 'patch',
    data
  })
}
