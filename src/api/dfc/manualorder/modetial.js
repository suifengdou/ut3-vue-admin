import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMODetialList(params) {
  return request({
    url: '/dfc/manualorder/mogoodsmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportMODetial(data) {
  return request({
    url: `/dfc/manualorder/mogoodsmanage/`,
    method: 'patch',
    data
  })
}
