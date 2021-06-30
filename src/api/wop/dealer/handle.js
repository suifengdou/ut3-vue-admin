import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderHandle(params) {
  return request({
    url: '/workorder/dealer/dowhandle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderHandle(data) {
  return request({
    url: `/workorder/dealer/dowhandle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/dealer/dowhandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderHandle(data) {
  return request({
    url: `/workorder/dealer/dowhandle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderHandle(data) {
  return request({
    url: `/workorder/dealer/dowhandle/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderHandle(data) {
  return request({
    url: `/workorder/dealer/dowhandle/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderHandle(data) {
  return request({
    url: `/workorder/dealer/dowhandle/reject/`,
    method: 'patch',
    data
  })
}
