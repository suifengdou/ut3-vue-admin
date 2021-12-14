import request from '@/utils/request'

// 二手尾货单发货明细操作API
// 获取列表
export function getBillsList(params) {
  return request({
    url: '/sales/tailgoods/tgaccount/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportBills(data) {
  return request({
    url: `/sales/tailgoods/tgaccount/export/`,
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
