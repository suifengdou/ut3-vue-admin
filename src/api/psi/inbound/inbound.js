import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInboundCheckList(params) {
  return request({
    url: '/psi/inbound/inboundcheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInboundCheck(data) {
  return request({
    url: `/psi/inbound/inboundcheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInboundCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/psi/inbound/inboundcheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInboundCheck(data) {
  return request({
    url: `/psi/inbound/inboundcheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInboundCheck(data) {
  return request({
    url: `/psi/inbound/inboundcheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInboundCheck(data) {
  return request({
    url: `/psi/inbound/inboundcheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInboundCheck(data) {
  return request({
    url: `/psi/inbound/inboundcheck/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getInboundManageList(params) {
  return request({
    url: '/psi/inbound/inboundmanage/',
    method: 'get',
    params
  })
}
