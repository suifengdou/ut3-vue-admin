import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getInvoiceCreateList(params) {
  return request({
    url: '/workorder/satisfaction/invoicecreate/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInvoiceCreate(data) {
  return request({
    url: `/workorder/satisfaction/invoicecreate/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInvoiceCreate(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/invoicecreate/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInvoiceCreate(data) {
  return request({
    url: `/workorder/satisfaction/invoicecreate/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInvoiceCreate(data) {
  return request({
    url: `/workorder/satisfaction/invoicecreate/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportInvoiceCreate(data) {
  return request({
    url: `/workorder/satisfaction/invoicecreate/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInvoiceCreate(data) {
  return request({
    url: `/workorder/satisfaction/invoicecreate/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function fixInvoiceCreate(data) {
  return request({
    url: `/workorder/satisfaction/invoicecreate/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInvoiceCreate(data) {
  return request({
    url: `/workorder/satisfaction/invoicecreate/reject/`,
    method: 'patch',
    data
  })
}
