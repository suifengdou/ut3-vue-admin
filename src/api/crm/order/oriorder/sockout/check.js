import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriOrderStockOutCheck(params) {
  return request({
    url: '/crm/order/oriorderstockoutcheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriOrderStockOutCheck(data) {
  return request({
    url: `/crm/order/oriorderstockoutcheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriOrderStockOutCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/order/oriorderstockoutcheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriOrderStockOutCheck(data) {
  return request({
    url: `/crm/order/oriorderstockoutcheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriOrderStockOutCheck(data) {
  return request({
    url: `/crm/order/oriorderstockoutcheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriOrderStockOutCheck(data) {
  return request({
    url: `/crm/order/oriorderstockoutcheck/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriOrderStockOutCheck(data) {
  return request({
    url: `/crm/order/oriorderstockoutcheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriOrderStockOutCheck(data) {
  return request({
    url: `/crm/order/oriorderstockoutcheck/reject/`,
    method: 'patch',
    data
  })
}

