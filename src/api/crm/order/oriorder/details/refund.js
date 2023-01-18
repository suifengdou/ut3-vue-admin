import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriOrderDetailsRefund(params) {
  return request({
    url: '/crm/order/oriorderdetailsrefund/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriOrderDetailsRefund(data) {
  return request({
    url: `/crm/order/oriorderdetailsrefund/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriOrderDetailsRefund(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/order/oriorderdetailsrefund/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriOrderDetailsRefund(data) {
  return request({
    url: `/crm/order/oriorderdetailsrefund/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriOrderDetailsRefund(data) {
  return request({
    url: `/crm/order/oriorderdetailsrefund/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriOrderDetailsRefund(data) {
  return request({
    url: `/crm/order/oriorderdetailsrefund/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriOrderDetailsRefund(data) {
  return request({
    url: `/crm/order/oriorderdetailsrefund/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriOrderDetailsRefund(data) {
  return request({
    url: `/crm/order/oriorderdetailsrefund/reject/`,
    method: 'patch',
    data
  })
}

