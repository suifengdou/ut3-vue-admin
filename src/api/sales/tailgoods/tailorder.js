import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function gettailorderCommonList(params) {
  return request({
    url: '/sales/tailgoods/tailordercommon/',
    method: 'get',
    params
  })
}

// 更新工单
export function updatetailorderCommon(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/tailordercommon/${id}/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportTailOrderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exporttailorderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checktailorderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/check/`,
    method: 'patch',
    data
  })
}

// 修复工单
export function fixTailOrderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejecttailorderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/reject/`,
    method: 'patch',
    data
  })
}

// 设置重损仓发货
export function setUsedtailorderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/set_used/`,
    method: 'patch',
    data
  })
}

// 设置非重损发货
export function setRetreadtailorderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/set_retread/`,
    method: 'patch',
    data
  })
}

// 设置特殊订单
export function setSpecialtailorderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/set_special/`,
    method: 'patch',
    data
  })
}

// 恢复订单标签
export function recovertailorderCommon(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/recover/`,
    method: 'patch',
    data
  })
}


// 回流二手发货单操作API
// 获取列表
export function gettailorderSpecialList(params) {
  return request({
    url: '/sales/tailgoods/tailorderspecial/',
    method: 'get',
    params
  })
}

// 更新工单
export function updatetailorderSpecial(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/tailorderspecial/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exporttailorderSpecial(data) {
  return request({
    url: `/sales/tailgoods/tailorderspecial/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checktailorderSpecial(data) {
  return request({
    url: `/sales/tailgoods/tailorderspecial/check/`,
    method: 'patch',
    data
  })
}

// 修复工单
export function fixTailOrderSpecial(data) {
  return request({
    url: `/sales/tailgoods/tailorderspecial/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejecttailorderSpecial(data) {
  return request({
    url: `/sales/tailgoods/tailorderspecial/reject/`,
    method: 'patch',
    data
  })
}


// 原始发票申请单（外埠）操作API
// 获取列表
export function gettailorderCheckList(params) {
  return request({
    url: '/sales/tailgoods/tailordercheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createtailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/tailordercheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updatetailorderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/tailordercheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exporttailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/tailordercheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImporttailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/tailordercheck/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checktailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/tailordercheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejecttailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/tailordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function setLogisticstailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/tailordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function recovertailorderCheck(data) {
  return request({
    url: `/sales/tailgoods/oritailordercheck/reject/`,
    method: 'patch',
    data
  })
}

// 尾货冲销明细验证表操作API
// 获取列表
export function gettailtoexpenseList(params) {
  return request({
    url: '/sales/tailgoods/tailtoexpense/',
    method: 'get',
    params
  })
}


// 尾货管理明细操作API
// 获取列表
export function getTailOrderList(params) {
  return request({
    url: '/sales/tailgoods/tailorder/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportTailOrder(data) {
  return request({
    url: `/sales/tailgoods/tailordercommon/export/`,
    method: 'patch',
    data
  })
}


