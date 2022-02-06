import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getIntPurchaseOrderManageList(params) {
  return request({
    url: '/int/intpurchase/manage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportIntPurchaseOrderManage(data) {
  return request({
    url: `/int/intpurchase/manage/export/`,
    method: 'patch',
    data
  })
}





