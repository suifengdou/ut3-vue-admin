import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getInvoiceCheckList(params) {
  return request({
    url: '/workorder/satisfaction/invoicecheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInvoiceCheck(data) {
  return request({
    url: `/workorder/satisfaction/invoicecheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInvoiceCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/invoicecheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInvoiceCheck(data) {
  return request({
    url: `/workorder/satisfaction/invoicecheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInvoiceCheck(data) {
  return request({
    url: `/workorder/satisfaction/invoicecheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportInvoiceCheck(data) {
  return request({
    url: `/workorder/satisfaction/invoicecheck/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInvoiceCheck(data) {
  return request({
    url: `/workorder/satisfaction/invoicecheck/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function fixInvoiceCheck(data) {
  return request({
    url: `/workorder/satisfaction/invoicecheck/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInvoiceCheck(data) {
  return request({
    url: `/workorder/satisfaction/invoicecheck/reject/`,
    method: 'patch',
    data
  })
}
