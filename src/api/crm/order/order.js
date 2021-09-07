import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOrderList(params) {
  return request({
    url: '/crm/order/ordersubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOrder(data) {
  return request({
    url: `/crm/order/ordersubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOrder(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/order/ordersubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOrder(data) {
  return request({
    url: `/crm/order/ordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOrder(data) {
  return request({
    url: `/crm/order/ordersubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOrder(data) {
  return request({
    url: `/crm/order/ordersubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOrder(data) {
  return request({
    url: `/crm/order/ordersubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOrder(data) {
  return request({
    url: `/crm/order/ordersubmit/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getOrderManageList(params) {
  return request({
    url: '/crm/order/ordermanage/',
    method: 'get',
    params
  })
}
