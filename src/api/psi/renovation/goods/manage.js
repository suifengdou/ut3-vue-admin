import request from '@/utils/request'

// 原始ERP订单管理操作API
// 获取列表
export function getRenovationManage(params) {
  return request({
    url: '/psi/renovation/renovationmanage/',
    method: 'get',
    params
  })
}

export function exportRenovationManage(data) {
  return request({
    url: '/psi/renovation/renovationmanage/export/',
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogRenovationManage(data) {
  return request({
    url: `/psi/renovation/renovationmanage/get_log_details/`,
    method: 'patch',
    data
  })
}
