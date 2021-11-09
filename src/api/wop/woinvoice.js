import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getOriInvoiceListApplicate(params) {
  return request({
    url: '/workorder/invoice/oriinvoiceapp/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriInvoiceApplicate(data) {
  data.process_tag = 7
  return request({
    url: `/workorder/invoice/oriinvoiceapp/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriInvoiceApplicate(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/invoice/oriinvoiceapp/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriInvoiceApplicate(data) {
  return request({
    url: `/workorder/invoice/oriinvoiceapp/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriInvoiceApplicate(data) {
  return request({
    url: `/workorder/invoice/oriinvoiceapp/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriInvoiceApplicate(data) {
  return request({
    url: `/workorder/invoice/oriinvoiceapp/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriInvoiceApplicate(data) {
  return request({
    url: `/workorder/invoice/oriinvoiceapp/reject/`,
    method: 'patch',
    data
  })
}

// 发票提交操作API
// 获取列表
export function getOriInvoiceListSubmit(params) {
  return request({
    url: '/workorder/invoice/oriinvoicesub/',
    method: 'get',
    params
  })
}
// 原始发票工单提交API
// 创建工单
export function createOriInvoiceSubmit(data) {
  return request({
    url: `/workorder/invoice/oriinvoicesub/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriInvoiceSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/invoice/oriinvoicesub/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriInvoiceSubmit(data) {
  return request({
    url: `/workorder/invoice/oriinvoicesub/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriInvoiceSubmit(data) {
  return request({
    url: `/workorder/invoice/oriinvoicesub/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriInvoiceSubmit(data) {
  return request({
    url: `/workorder/invoice/oriinvoicesub/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriInvoiceSubmit(data) {
  return request({
    url: `/workorder/invoice/oriinvoicesub/reject/`,
    method: 'patch',
    data
  })
}

// 工单驳回到经销商
export function rejectDealerOriInvoiceSubmit(data) {
  return request({
    url: `/workorder/invoice/oriinvoicesub/reject_dealer/`,
    method: 'patch',
    data
  })
}

// 原始发票开票操作API
// 获取列表
export function getOriInvoiceListHandle(params) {
  return request({
    url: '/workorder/invoice/oriinvoicehand/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateOriInvoiceHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/invoice/oriinvoicehand/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriInvoiceHandle(data) {
  return request({
    url: `/workorder/invoice/oriinvoicehand/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriInvoiceHandle(data) {
  return request({
    url: `/workorder/invoice/oriinvoicehand/check/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkUpackOriInvoiceHandle(data) {
  return request({
    url: `/workorder/invoice/oriinvoicehand/check_unpack/`,
    method: 'patch',
    data
  })
}

// 驳回工单
export function rejectOriInvoiceHandle(data) {
  return request({
    url: `/workorder/invoice/oriinvoicehand/reject/`,
    method: 'patch',
    data
  })
}

// 原始发票开票管理API
// 获取列表
export function getOriInvoiceListManage(params) {
  return request({
    url: '/workorder/invoice/oriinvoicemanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportOriInvoiceManage(params) {
  return request({
    url: `/workorder/invoice/oriinvoicemanage/export/`,
    method: 'get',
    params
  })
}

// 发票开票操作API
// 获取列表
export function getInvoiceListHandle(params) {
  return request({
    url: '/workorder/invoice/invoicehand/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateInvoiceHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/invoice/invoicehand/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInvoiceHandle(data) {
  return request({
    url: `/workorder/invoice/invoicehand/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInvoiceHandle(data) {
  return request({
    url: `/workorder/invoice/invoicehand/check/`,
    method: 'patch',
    data
  })
}

// 驳回工单
export function rejectInvoiceHandle(data) {
  return request({
    url: `/workorder/invoice/invoicehand/reject/`,
    method: 'patch',
    data
  })
}

// 发票开票管理API
// 获取列表
export function getInvoiceListManage(params) {
  return request({
    url: '/workorder/invoice/invoicemanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportInvoiceManage(data) {
  return request({
    url: `/workorder/invoice/invoicemanage/export/`,
    method: 'patch',
    data
  })
}

// 发票快递单
// 获取列表
export function getDeliverList(params) {
  return request({
    url: '/workorder/invoice/deliverhandle/',
    method: 'get',
    params
  })
}

// 更新快递单
export function updateDeliver(id, data) {
  console.log(data)
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/invoice/deliverhandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出快递单
export function exportDeliver(data) {
  return request({
    url: `/workorder/invoice/deliverhandle/export/`,
    method: 'patch',
    data
  })
}

// 导入快递单
export function excelImportDeliver(data) {
  return request({
    url: `/workorder/invoice/deliverhandle/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核快递单
export function checkDeliver(data) {
  return request({
    url: `/workorder/invoice/deliverhandle/check/`,
    method: 'patch',
    data
  })
}

// 原始发票快递单管理API
// 获取列表
export function getDeliverManage(params) {
  return request({
    url: '/workorder/invoice/delivermanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportDeliverManage(data) {
  return request({
    url: `/workorder/invoice/delivermanage/export/`,
    method: 'patch',
    data
  })
}



// 获取列表
export function getOTODetailsManage(params) {
  return request({
    url: '/workorder/invoice/oriinvoicegoods/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportOTODetails(data) {
  return request({
    url: `/workorder/invoice/oriinvoicegoods/export/`,
    method: 'patch',
    data
  })
}
