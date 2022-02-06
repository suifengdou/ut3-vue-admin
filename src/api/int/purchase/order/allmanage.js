import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getIntPurchaseOrderAllManageList(params) {
  return request({
    url: '/int/intpurchase/allmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportIntPurchaseOrderAllManage(data) {
  return request({
    url: `/int/intpurchase/allmanage/export/`,
    method: 'patch',
    data
  })
}





