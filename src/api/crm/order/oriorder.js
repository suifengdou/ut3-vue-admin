import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriOrderList(params) {
  return request({
    url: '/crm/order/oriordersubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriOrder(data) {
  return request({
    url: `/crm/order/oriordersubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriOrder(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/order/oriordersubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriOrder(data) {
  return request({
    url: `/crm/order/oriordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriOrder(data) {
  return request({
    url: `/crm/order/oriordersubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriOrder(data) {
  return request({
    url: `/crm/order/oriordersubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriOrder(data) {
  return request({
    url: `/crm/order/oriordersubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriOrder(data) {
  return request({
    url: `/crm/order/oriordersubmit/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getOriOrderManageList(params) {
  return request({
    url: '/crm/order/oriordermanage/',
    method: 'get',
    params
  })
}
