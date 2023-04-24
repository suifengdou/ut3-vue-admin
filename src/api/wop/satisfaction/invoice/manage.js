import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getInvoiceManageList(params) {
  return request({
    url: '/workorder/satisfaction/invoicemanage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInvoiceManage(data) {
  return request({
    url: `/workorder/satisfaction/invoicemanage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInvoiceManage(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/satisfaction/invoicemanage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInvoiceManage(data) {
  return request({
    url: `/workorder/satisfaction/invoicemanage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInvoiceManage(data) {
  return request({
    url: `/workorder/satisfaction/invoicemanage/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportInvoiceManage(data) {
  return request({
    url: `/workorder/satisfaction/invoicemanage/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInvoiceManage(data) {
  return request({
    url: `/workorder/satisfaction/invoicemanage/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function fixInvoiceManage(data) {
  return request({
    url: `/workorder/satisfaction/invoicemanage/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInvoiceManage(data) {
  return request({
    url: `/workorder/satisfaction/invoicemanage/reject/`,
    method: 'patch',
    data
  })
}
