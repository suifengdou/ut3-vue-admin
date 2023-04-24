import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBMSOrderList(params) {
  return request({
    url: '/crm/order/bmsordersubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBMSOrder(data) {
  return request({
    url: `/crm/order/bmsordersubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBMSOrder(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/order/bmsordersubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBMSOrder(data) {
  return request({
    url: `/crm/order/bmsordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBMSOrder(data) {
  return request({
    url: `/crm/order/bmsordersubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkBMSOrder(data) {
  return request({
    url: `/crm/order/bmsordersubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectBMSOrder(data) {
  return request({
    url: `/crm/order/bmsordersubmit/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getBMSOrderManageList(params) {
  return request({
    url: '/crm/order/bmsordermanage/',
    method: 'get',
    params
  })
}
