import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInboundValid(params) {
  return request({
    url: '/psi/inbound/inboundvalid/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInboundValid(data) {
  return request({
    url: `/psi/inbound/inboundvalid/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInboundValid(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/psi/inbound/inboundvalid/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInboundValid(data) {
  return request({
    url: `/psi/inbound/inboundvalid/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInboundValid(data) {
  return request({
    url: `/psi/inbound/inboundvalid/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInboundValid(data) {
  return request({
    url: `/psi/inbound/inboundvalid/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInboundValid(data) {
  return request({
    url: `/psi/inbound/inboundvalid/reject/`,
    method: 'patch',
    data
  })
}


