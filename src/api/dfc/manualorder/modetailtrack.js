import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMODetailTrackList(params) {
  return request({
    url: '/dfc/manualorder/mogoodstrack/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportMODetailTrack(data) {
  return request({
    url: `/dfc/manualorder/mogoodstrack/export/`,
    method: 'patch',
    data
  })
}
