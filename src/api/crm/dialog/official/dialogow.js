import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogOWList(params) {
  return request({
    url: '/crm/dialog/dialogow/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogOW(data) {
  return request({
    url: `/crm/dialog/dialogow/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogOW(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/dialog/dialogow/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogOW(data) {
  return request({
    url: `/crm/dialog/dialogow/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogOW(data) {
  return request({
    url: `/crm/dialog/dialogow/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogOW(data) {
  return request({
    url: `/crm/dialog/dialogow/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogOW(data) {
  return request({
    url: `/crm/dialog/dialogow/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogOW(data) {
  return request({
    url: `/crm/dialog/dialogow/reject/`,
    method: 'patch',
    data
  })
}

