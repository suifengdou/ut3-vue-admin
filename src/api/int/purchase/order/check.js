import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getIntPurchaseOrderCheckList(params) {
  return request({
    url: '/int/intpurchase/check/',
    method: 'get',
    params
  })
}


// 更新工单
export function updateIntPurchaseOrderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/int/intpurchase/check/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportIntPurchaseOrderCheck(data) {
  return request({
    url: `/int/intpurchase/check/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportIntPurchaseOrderCheck(data) {
  return request({
    url: `/int/intpurchase/check/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkIntPurchaseOrderCheck(data) {
  return request({
    url: `/int/intpurchase/check/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectIntPurchaseOrderCheck(data) {
  return request({
    url: `/int/intpurchase/check/reject/`,
    method: 'patch',
    data
  })
}



