import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInboundManage(params) {
  return request({
    url: '/psi/inbound/inboundmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportInboundManage(data) {
  return request({
    url: `/psi/inbound/inboundmanage/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogInboundManage(data) {
  return request({
    url: `/psi/inbound/inboundmanage/get_log_details/`,
    method: 'patch',
    data
  })
}


