import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReceiptCheckList(params) {
  return request({
    url: '/int/intreceipt/check/',
    method: 'get',
    params
  })
}

// 创建工单
export function createReceiptCheck(data) {
  return request({
    url: `/int/intreceipt/check/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateReceiptCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/int/intreceipt/check/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportReceiptCheck(data) {
  return request({
    url: `/int/intreceipt/check/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportReceiptCheck(data) {
  return request({
    url: `/int/intreceipt/check/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkReceiptCheck(data) {
  return request({
    url: `/int/intreceipt/check/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectReceiptCheck(data) {
  return request({
    url: `/int/intreceipt/check/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialReceiptCheck(data) {
  return request({
    url: `/int/intreceipt/check/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagReceiptCheck(data) {
  return request({
    url: `/int/intreceipt/check/reset_tag/`,
    method: 'patch',
    data
  })
}


