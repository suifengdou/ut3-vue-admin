import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrder(params) {
  return request({
    url: '/workorder/express/ewocreate/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrder(data) {
  return request({
    url: `/workorder/express/ewocreate/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrder(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/express/ewocreate/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrder(data) {
  return request({
    url: `/workorder/express/ewocreate/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrder(data) {
  return request({
    url: `/workorder/express/ewocreate/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrder(data) {
  return request({
    url: `/workorder/express/ewocreate/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrder(data) {
  return request({
    url: `/workorder/express/ewocreate/reject/`,
    method: 'patch',
    data
  })
}
