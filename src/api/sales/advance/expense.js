import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getExpenseList(params) {
  return request({
    url: '/sales/advance/expense/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportExpense(data) {
  return request({
    url: `/sales/advance/expense/export/`,
    method: 'patch',
    data
  })
}
