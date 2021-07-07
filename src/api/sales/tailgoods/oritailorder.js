import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getOritailorderSubmitList(params) {
  return request({
    url: '/sales/tailgoods/oritailordersubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOritailorderSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/oritailordersubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/reject/`,
    method: 'patch',
    data
  })
}

// 设置重损仓发货
export function setUsedOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/set_used/`,
    method: 'patch',
    data
  })
}

// 设置非重损发货
export function setRetreadOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/set_retread/`,
    method: 'patch',
    data
  })
}

// 设置特殊订单
export function setSpecialOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/set_special/`,
    method: 'patch',
    data
  })
}

// 恢复订单标签
export function recoverOritailorderSubmit(data) {
  return request({
    url: `/sales/tailgoods/oritailordersubmit/recover/`,
    method: 'patch',
    data
  })
}

// 原始发票申请单（外埠）操作API
// 获取列表
export function getOritailorderCheckList(params) {
  return request({
    url: '/sales/tailgoods/oritailordercheck/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateOritailorderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/oritailordercheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出单据
export function exportOritailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/oritailordercheck/export/`,
    method: 'patch',
    data
  })
}

// 审核单据
export function checkOritailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/oritailordercheck/check/`,
    method: 'patch',
    data
  })
}

// 审核拆单单据
export function checkSplitOritailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/oritailordercheck/check_split/`,
    method: 'patch',
    data
  })
}

// 驳回工单
export function rejectOritailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/oritailordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊订单
export function setLogisticsOritailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/oritailordercheck/set_logistics/`,
    method: 'patch',
    data
  })
}

// 恢复订单标签
export function recoverOritailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/oritailordercheck/recover/`,
    method: 'patch',
    data
  })
}

// 原始尾货单管理操作API
// 获取列表
export function getOritailorderManageList(params) {
  return request({
    url: '/sales/tailgoods/oritailorder/',
    method: 'get',
    params
  })
}
