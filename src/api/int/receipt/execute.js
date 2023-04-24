import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReceiptExecuteList(params) {
  return request({
    url: '/int/intreceipt/execute/',
    method: 'get',
    params
  })
}

// 创建工单
export function createReceiptExecute(data) {
  return request({
    url: `/int/intreceipt/execute/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateReceiptExecute(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/int/intreceipt/execute/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportReceiptExecute(data) {
  return request({
    url: `/int/intreceipt/execute/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportReceiptExecute(data) {
  return request({
    url: `/int/intreceipt/execute/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkReceiptExecute(data) {
  return request({
    url: `/int/intreceipt/execute/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectReceiptExecute(data) {
  return request({
    url: `/int/intreceipt/execute/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialReceiptExecute(data) {
  return request({
    url: `/int/intreceipt/execute/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function createStatementReceiptExecute(data) {
  return request({
    url: `/int/intreceipt/execute/create_statement/`,
    method: 'patch',
    data
  })
}


