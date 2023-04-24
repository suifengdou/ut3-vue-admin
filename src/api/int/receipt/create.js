import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReceiptCreateList(params) {
  return request({
    url: '/int/intreceipt/create/',
    method: 'get',
    params
  })
}

// 创建工单
export function createReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateReceiptCreate(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/int/intreceipt/create/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/reset_tag/`,
    method: 'patch',
    data
  })
}

// 导入图片
export function photoImportReceiptCreate(data) {
  return request({
    url: `/int/intreceipt/create/photo_import/`,
    method: 'patch',
    data
  })
}


