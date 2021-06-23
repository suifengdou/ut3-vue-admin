import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getVerifyexpenseList(params) {
  return request({
    url: '/sales/advance/verifyexpense/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportVerifyexpense(data) {
  return request({
    url: `/sales/advance/verifyexpense/export/`,
    method: 'patch',
    data
  })
}

