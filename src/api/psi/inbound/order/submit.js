import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInboundSubmit(params) {
  return request({
    url: '/psi/inbound/inboundsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInboundSubmit(data) {
  return request({
    url: `/psi/inbound/inboundsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInboundSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/psi/inbound/inboundsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInboundSubmit(data) {
  return request({
    url: `/psi/inbound/inboundsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInboundSubmit(data) {
  return request({
    url: `/psi/inbound/inboundsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInboundSubmit(data) {
  return request({
    url: `/psi/inbound/inboundsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInboundSubmit(data) {
  return request({
    url: `/psi/inbound/inboundsubmit/reject/`,
    method: 'patch',
    data
  })
}


