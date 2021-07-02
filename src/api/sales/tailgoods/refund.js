import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getRefundOrderSubmitList(params) {
  return request({
    url: '/sales/tailgoods/refundordersubmit/',
    method: 'get',
    params
  })
}
// 创建工单
export function createRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateRefundOrderSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/refundordersubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/check/`,
    method: 'patch',
    data
  })
}

// 修复工单
export function fixTailOrderCommon(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/reject/`,
    method: 'patch',
    data
  })
}

// 设置重损仓发货
export function setUsedRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/set_used/`,
    method: 'patch',
    data
  })
}

// 设置非重损发货
export function setRetreadRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/set_retread/`,
    method: 'patch',
    data
  })
}

// 设置特殊订单
export function setSpecialRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/set_special/`,
    method: 'patch',
    data
  })
}

// 恢复订单标签
export function recoverRefundOrderSubmit(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/recover/`,
    method: 'patch',
    data
  })
}

// 原始发票申请单（外埠）操作API
// 获取列表
export function getRefundOrderCheckList(params) {
  return request({
    url: '/sales/tailgoods/refundordercheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateRefundOrderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/refundordercheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function setLogisticsRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function recoverRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 原始发票申请单（外埠）操作API
// 获取列表
export function getRefundOrderManageList(params) {
  return request({
    url: '/sales/tailgoods/refundordermanage/',
    method: 'get',
    params
  })
}
