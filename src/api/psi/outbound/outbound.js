import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOutboundList(params) {
  return request({
    url: '/psi/outbound/outboundsubimt/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOutbound(data) {
  return request({
    url: `/psi/outbound/outboundsubimt/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOutbound(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/psi/outbound/outboundsubimt/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOutbound(data) {
  return request({
    url: `/psi/outbound/outboundsubimt/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOutbound(data) {
  return request({
    url: `/psi/outbound/outboundsubimt/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOutbound(data) {
  return request({
    url: `/psi/outbound/outboundsubimt/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOutbound(data) {
  return request({
    url: `/psi/outbound/outboundsubimt/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getOutboundManageList(params) {
  return request({
    url: '/crm/order/ordermanage/',
    method: 'get',
    params
  })
}
