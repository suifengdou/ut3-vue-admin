import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInboundDetailList(params) {
  return request({
    url: '/psi/inbound/inbounddetail/',
    method: 'get',
    params
  })
}

// 创建工单
export function createInboundDetail(data) {
  return request({
    url: `/psi/inbound/inbounddetail/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateInboundDetail(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/psi/inbound/inbounddetail/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportInboundDetail(data) {
  return request({
    url: `/psi/inbound/inbounddetail/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportInboundDetail(data) {
  return request({
    url: `/psi/inbound/inbounddetail/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkInboundDetail(data) {
  return request({
    url: `/psi/inbound/inbounddetail/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectInboundDetail(data) {
  return request({
    url: `/psi/inbound/inbounddetail/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getInboundDetailManageList(params) {
  return request({
    url: '/psi/inbound/inboundmanage/',
    method: 'get',
    params
  })
}
