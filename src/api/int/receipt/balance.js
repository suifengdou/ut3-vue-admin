import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReceiptBalanceList(params) {
  return request({
    url: '/int/intreceipt/balance/',
    method: 'get',
    params
  })
}

// 创建工单
export function createReceiptBalance(data) {
  return request({
    url: `/int/intreceipt/balance/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateReceiptBalance(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/int/intreceipt/balance/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportReceiptBalance(data) {
  return request({
    url: `/int/intreceipt/balance/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportReceiptBalance(data) {
  return request({
    url: `/int/intreceipt/balance/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkReceiptBalance(data) {
  return request({
    url: `/int/intreceipt/balance/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectReceiptBalance(data) {
  return request({
    url: `/int/intreceipt/balance/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialReceiptBalance(data) {
  return request({
    url: `/int/intreceipt/balance/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagReceiptBalance(data) {
  return request({
    url: `/int/intreceipt/balance/reset_tag/`,
    method: 'patch',
    data
  })
}


