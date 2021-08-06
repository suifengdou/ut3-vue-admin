import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderHandle(params) {
  return request({
    url: '/workorder/storage/swohandle/',
    method: 'get',
    params
  })
}


// 更新工单
export function updateWorkOrderHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/storage/swohandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderHandle(data) {
  return request({
    url: `/workorder/storage/swohandle/export/`,
    method: 'patch',
    data
  })
}


// 审核工单
export function checkWorkOrderHandle(data) {
  return request({
    url: `/workorder/storage/swohandle/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderHandle(data) {
  return request({
    url: `/workorder/storage/swohandle/reject/`,
    method: 'patch',
    data
  })
}
