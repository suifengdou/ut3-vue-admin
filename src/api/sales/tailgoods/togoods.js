import request from '@/utils/request'

// 二手尾货单发货明细操作API
// 获取列表
export function getTailOrderGoodsCommonList(params) {
  return request({
    url: '/sales/tailgoods/togoodscommon/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportTailOrderGoodsCommon(data) {
  return request({
    url: `/sales/tailgoods/togoodscommon/export/`,
    method: 'patch',
    data
  })
}

// 设置特殊订单
export function setTailOrderGoodsCommon(data) {
  return request({
    url: `/sales/tailgoods/togoodscommon/set_special/`,
    method: 'patch',
    data
  })
}

// 恢复订单标签
export function recoverTailOrderGoodsCommon(data) {
  return request({
    url: `/sales/tailgoods/togoodscommon/recover/`,
    method: 'patch',
    data
  })
}

// 回流尾货单发货明细操作API
// 获取列表
export function getTailOrderGoodsSpecialList(params) {
  return request({
    url: '/sales/tailgoods/togoodsspecial/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportTailOrderGoodsSpecial(data) {
  return request({
    url: `/sales/tailgoods/togoodsspecial/export/`,
    method: 'patch',
    data
  })
}

// 设置特殊订单
export function setTailOrderGoodsSpecial(data) {
  return request({
    url: `/sales/tailgoods/togoodsspecial/set_special/`,
    method: 'patch',
    data
  })
}

// 恢复订单标签
export function recoverTailOrderGoodsSpecial(data) {
  return request({
    url: `/sales/tailgoods/togoodsspecial/recover/`,
    method: 'patch',
    data
  })
}
