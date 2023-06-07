import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderManage(params) {
  return request({
    url: '/workorder/express/ewomanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportWorkOrderManage(data) {
  return request({
    url: `/workorder/express/ewomanage/export/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function getLogWorkOrderManage(data) {
  return request({
    url: `/workorder/express/ewomanage/get_log_details/`,
    method: 'patch',
    data
  })
}
