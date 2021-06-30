import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderSupplierHandle(params) {
  return request({
    url: '/workorder/express/ewosupplierhandle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderSupplierHandle(data) {
  return request({
    url: `/workorder/express/ewosupplierhandle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderSupplierHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/express/ewosupplierhandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderSupplierHandle(data) {
  return request({
    url: `/workorder/express/ewosupplierhandle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderSupplierHandle(data) {
  return request({
    url: `/workorder/express/ewosupplierhandle/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderSupplierHandle(data) {
  return request({
    url: `/workorder/express/ewosupplierhandle/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderSupplierHandle(data) {
  return request({
    url: `/workorder/express/ewosupplierhandle/reject/`,
    method: 'patch',
    data
  })
}
