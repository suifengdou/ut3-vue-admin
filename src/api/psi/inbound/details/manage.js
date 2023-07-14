import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getInboundDetail(params) {
  return request({
    url: '/psi/inbound/inbounddetail/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportInboundDetail(data) {
  return request({
    url: `/psi/inbound/inbounddetail/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogInboundDetail(data) {
  return request({
    url: `/psi/inbound/inbounddetail/get_log_details/`,
    method: 'patch',
    data
  })
}


