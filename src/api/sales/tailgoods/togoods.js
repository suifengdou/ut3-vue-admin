import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getTailOrderGoodsCommonList(params) {
  return request({
    url: '/sales/tailgoods/togoodscommon/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportTailOrderGoodsCommonCheck(params) {
  return request({
    url: `/sales/tailgoods/togoodscommon/export/`,
    method: 'get',
    params
  })
}
