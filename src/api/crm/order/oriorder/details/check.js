import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriOrderDetailsCheck(params) {
  return request({
    url: '/crm/order/oriorderdetailscheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriOrderDetailsCheck(data) {
  return request({
    url: `/crm/order/oriorderdetailscheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriOrderDetailsCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/order/oriorderdetailscheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriOrderDetailsCheck(data) {
  return request({
    url: `/crm/order/oriorderdetailscheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriOrderDetailsCheck(data) {
  return request({
    url: `/crm/order/oriorderdetailscheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriOrderDetailsCheck(data) {
  return request({
    url: `/crm/order/oriorderdetailscheck/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriOrderDetailsCheck(data) {
  return request({
    url: `/crm/order/oriorderdetailscheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriOrderDetailsCheck(data) {
  return request({
    url: `/crm/order/oriorderdetailscheck/reject/`,
    method: 'patch',
    data
  })
}

