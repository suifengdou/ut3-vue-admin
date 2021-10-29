import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderManage(params) {
  return request({
    url: '/workorder/dealerparts/dpmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportWorkOrderManage(data) {
  return request({
    url: `/workorder/dealerparts/dpmanage/export/`,
    method: 'patch',
    data
  })
}
