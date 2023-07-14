import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInboundDetailValid(params) {
  return request({
    url: '/psi/inbound/inbounddetailvalid/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInboundDetailValid(data) {
  return request({
    url: `/psi/inbound/inbounddetailvalid/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInboundDetailValid(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/psi/inbound/inbounddetailvalid/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInboundDetailValid(data) {
  return request({
    url: `/psi/inbound/inbounddetailvalid/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInboundDetailValid(data) {
  return request({
    url: `/psi/inbound/inbounddetailvalid/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInboundDetailValid(data) {
  return request({
    url: `/psi/inbound/inbounddetailvalid/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInboundDetailValid(data) {
  return request({
    url: `/psi/inbound/inbounddetailvalid/reject/`,
    method: 'patch',
    data
  })
}


