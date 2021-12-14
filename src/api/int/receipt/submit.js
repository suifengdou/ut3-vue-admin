import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReceiptSubmitList(params) {
  return request({
    url: '/int/intreceipt/submit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createReceiptSubmit(data) {
  return request({
    url: `/int/intreceipt/submit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateReceiptSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/int/intreceipt/submit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportReceiptSubmit(data) {
  return request({
    url: `/int/intreceipt/submit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportReceiptSubmit(data) {
  return request({
    url: `/int/intreceipt/submit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkReceiptSubmit(data) {
  return request({
    url: `/int/intreceipt/submit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectReceiptSubmit(data) {
  return request({
    url: `/int/intreceipt/submit/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialReceiptSubmit(data) {
  return request({
    url: `/int/intreceipt/submit/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagReceiptSubmit(data) {
  return request({
    url: `/int/intreceipt/submit/reset_tag/`,
    method: 'patch',
    data
  })
}


