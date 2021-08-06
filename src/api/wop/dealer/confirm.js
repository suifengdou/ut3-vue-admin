import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderConfirm(params) {
  return request({
    url: '/workorder/dealers/dwoconfirm/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateWorkOrderConfirm(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/dealers/dwoconfirm/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderConfirm(data) {
  return request({
    url: `/workorder/dealers/dwoconfirm/export/`,
    method: 'patch',
    data
  })
}

// 设置工单
export function setConfirmWorkOrderConfirm(data) {
  return request({
    url: `/workorder/dealers/dwoconfirm/set_confirm/`,
    method: 'patch',
    data
  })
}


// 审核工单
export function checkWorkOrderConfirm(data) {
  return request({
    url: `/workorder/dealers/dwoconfirm/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderConfirm(data) {
  return request({
    url: `/workorder/dealers/dwoconfirm/reject/`,
    method: 'patch',
    data
  })
}
