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

// 退款单审核操作API
// 获取列表
export function getRefundOrderCheckList(params) {
  return request({
    url: '/sales/tailgoods/refundordercheck/',
    method: 'get',
    params
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

// 审核工单
export function checkRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/check/`,
    method: 'patch',
    data
  })
}

// 驳回单据
export function rejectRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 设置处理标记
export function setHandledRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/set_handled/`,
    method: 'patch',
    data
  })
}

// 恢复标记
export function recoverRefundOrderCheck(data) {
  return request({
    url: `/sales/tailgoods/refundordercheck/recover/`,
    method: 'patch',
    data
  })
}

// 尾货退款单管理操作API
// 获取列表
export function getRefundOrderManageList(params) {
  return request({
    url: '/sales/tailgoods/refundordermanage/',
    method: 'get',
    params
  })
}

// 导出单据
export function exportRefundOrderManage(data) {
  return request({
    url: `/sales/tailgoods/refundordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 退款单收货操作API
// 获取列表
export function getROGoodsReceivalList(params) {
  return request({
    url: '/sales/tailgoods/rogoodsreceival/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateROGoodsReceival(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/rogoodsreceival/${id}/`,
    method: 'patch',
    data
  })
}

// 设置处理标记
export function setHandledROGoodsReceival(data) {
  return request({
    url: `/sales/tailgoods/rogoodsreceival/set_handled/`,
    method: 'patch',
    data
  })
}

// 初始化单据
export function recoverROGoodsReceival(data) {
  return request({
    url: `/sales/tailgoods/rogoodsreceival/recover/`,
    method: 'patch',
    data
  })
}

// 审核单据
export function checkROGoodsReceival(data) {
  return request({
    url: `/sales/tailgoods/rogoodsreceival/check/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportROGoodsReceival(data) {
  return request({
    url: `/sales/tailgoods/rogoodsreceival/export/`,
    method: 'patch',
    data
  })
}

// 退款单收货管理API
// 获取列表
export function getROGoodsManageList(params) {
  return request({
    url: '/sales/tailgoods/rogoodsmanage/',
    method: 'get',
    params
  })
}

