import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriMaintenance(params) {
  return request({
    url: '/crm/service/orimaintenance/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/get_log_details/`,
    method: 'patch',
    data
  })
}

