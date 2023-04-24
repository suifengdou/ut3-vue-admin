import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriInboundList(params) {
  return request({
    url: '/psi/inbound/oriinboundsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriInbound(data) {
  return request({
    url: `/psi/inbound/oriinboundsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriInbound(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/psi/inbound/oriinboundsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriInbound(data) {
  return request({
    url: `/psi/inbound/oriinboundsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriInbound(data) {
  return request({
    url: `/psi/inbound/oriinboundsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriInbound(data) {
  return request({
    url: `/psi/inbound/oriinboundsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriInbound(data) {
  return request({
    url: `/psi/inbound/oriinboundsubmit/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getOriInboundManageList(params) {
  return request({
    url: '/psi/inbound/oriinboundmanage/',
    method: 'get',
    params
  })
}
