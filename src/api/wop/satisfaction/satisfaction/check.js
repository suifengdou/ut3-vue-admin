import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderCheckList(params) {
  return request({
    url: '/workorder/satisfaction/swocheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/swocheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/check/`,
    method: 'patch',
    data
  })
}

