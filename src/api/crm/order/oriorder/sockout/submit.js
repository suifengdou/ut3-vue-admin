import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriOrderStockOutSubmit(params) {
  return request({
    url: '/crm/order/oriorderstockoutsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriOrderStockOutSubmit(data) {
  return request({
    url: `/crm/order/oriorderstockoutsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriOrderStockOutSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/order/oriorderstockoutsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriOrderStockOutSubmit(data) {
  return request({
    url: `/crm/order/oriorderstockoutsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportSrcTidsOriOrderStockOutSubmit(data) {
  return request({
    url: `/crm/order/oriorderstockoutsubmit/export_src_tids/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriOrderStockOutSubmit(data) {
  return request({
    url: `/crm/order/oriorderstockoutsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriOrderStockOutSubmit(data) {
  return request({
    url: `/crm/order/oriorderstockoutsubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriOrderStockOutSubmit(data) {
  return request({
    url: `/crm/order/oriorderstockoutsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriOrderStockOutSubmit(data) {
  return request({
    url: `/crm/order/oriorderstockoutsubmit/reject/`,
    method: 'patch',
    data
  })
}

