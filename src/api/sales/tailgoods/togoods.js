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
export function exportTailOrderGoodsCommon(params) {
  return request({
    url: `/sales/tailgoods/togoodscommon/export/`,
    method: 'get',
    params
  })
}


// 回流尾货单发货明细操作API
// 获取列表
export function getTailOrderGoodsSpecialList(params) {
  return request({
    url: '/sales/tailgoods/togoodscommon/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportTailOrderGoodsSpecial(params) {
  return request({
    url: `/sales/tailgoods/togoodscommon/export/`,
    method: 'get',
    params
  })
}
