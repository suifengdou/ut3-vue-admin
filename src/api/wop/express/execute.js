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
  delete data.create_time
  delete data.update_time
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
