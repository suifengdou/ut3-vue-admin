import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getStatementList(params) {
  return request({
    url: '/sales/advance/statements/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportStatement(data) {
  return request({
    url: `/sales/advance/statements/export/`,
    method: 'patch',
    data
  })
}
