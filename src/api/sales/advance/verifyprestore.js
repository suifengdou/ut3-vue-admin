import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getVerifyprestoreList(params) {
  return request({
    url: '/sales/advance/verifyprestore/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportVerifyprestore(data) {
  return request({
    url: `/sales/advance/verifyprestore/export/`,
    method: 'patch',
    data
  })
}
