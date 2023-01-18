import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriOrderManage(params) {
  return request({
    url: '/crm/order/oriordermanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportOriOrderManage(data) {
  return request({
    url: `/crm/order/oriordermanage/export/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriOrderManage(data) {
  return request({
    url: `/crm/order/oriordermanage/fix/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogOriOrderManage(data) {
  return request({
    url: `/crm/order/oriordermanage/get_log_details/`,
    method: 'patch',
    data
  })
}