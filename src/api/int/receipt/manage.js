import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReceiptManageList(params) {
  return request({
    url: '/int/intreceipt/manage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/export/`,
    method: 'patch',
    data
  })
}


