import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getIntPurchaseOrderSubmitList(params) {
  return request({
    url: '/int/intpurchase/submit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createIntPurchaseOrderSubmit(data) {
  return request({
    url: `/int/intpurchase/submit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateIntPurchaseOrderSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/int/intpurchase/submit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportIntPurchaseOrderSubmit(data) {
  return request({
    url: `/int/intpurchase/submit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportIntPurchaseOrderSubmit(data) {
  return request({
    url: `/int/intpurchase/submit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkIntPurchaseOrderSubmit(data) {
  return request({
    url: `/int/intpurchase/submit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectIntPurchaseOrderSubmit(data) {
  return request({
    url: `/int/intpurchase/submit/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialIntPurchaseOrderSubmit(data) {
  return request({
    url: `/int/intpurchase/submit/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagIntPurchaseOrderSubmit(data) {
  return request({
    url: `/int/intpurchase/submit/reset_tag/`,
    method: 'patch',
    data
  })
}


