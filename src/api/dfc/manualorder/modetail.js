import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMODetailList(params) {
  return request({
    url: '/dfc/manualorder/mogoodsmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportMODetail(data) {
  return request({
    url: `/dfc/manualorder/mogoodsmanage/`,
    method: 'patch',
    data
  })
}
