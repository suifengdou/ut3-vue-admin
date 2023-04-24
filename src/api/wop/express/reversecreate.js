import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReverseWorkOrder(params) {
  return request({
    url: '/workorder/express/eworeversecreate/',
    method: 'get',
    params
  })
}

// 创建工单
export function createReverseWorkOrder(data) {
  return request({
    url: `/workorder/express/eworeversecreate/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateReverseWorkOrder(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/express/eworeversecreate/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportReverseWorkOrder(data) {
  return request({
    url: `/workorder/express/eworeversecreate/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportReverseWorkOrder(data) {
  return request({
    url: `/workorder/express/eworeversecreate/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkReverseWorkOrder(data) {
  return request({
    url: `/workorder/express/eworeversecreate/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectReverseWorkOrder(data) {
  return request({
    url: `/workorder/express/eworeversecreate/reject/`,
    method: 'patch',
    data
  })
}
