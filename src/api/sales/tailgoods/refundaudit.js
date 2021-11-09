import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getRefundOrderAuditList(params) {
  return request({
    url: '/sales/tailgoods/refundorderaudit/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportRefundOrderAudit(data) {
  return request({
    url: `/sales/tailgoods/refundorderaudit/export/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkRefundOrderAudit(data) {
  return request({
    url: `/sales/tailgoods/refundorderaudit/check/`,
    method: 'patch',
    data
  })
}
