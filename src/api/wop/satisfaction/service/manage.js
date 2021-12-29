import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getServiceWorkOrderManage(params) {
  return request({
    url: '/workorder/satisfaction/servicemanage/',
    method: 'get',
    params
  })
}


// 导出工单
export function exportServiceWorkOrderManage(data) {
  return request({
    url: `/workorder/satisfaction/servicemanage/export/`,
    method: 'patch',
    data
  })
}






