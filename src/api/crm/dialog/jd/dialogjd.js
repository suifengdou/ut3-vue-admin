import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogJDList(params) {
  return request({
    url: '/crm/dialog/dialogjd/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogJD(data) {
  return request({
    url: `/crm/dialog/dialogjd/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogJD(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/dialog/dialogjd/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogJD(data) {
  return request({
    url: `/crm/dialog/dialogjd/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogJD(data) {
  return request({
    url: `/crm/dialog/dialogjd/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogJD(data) {
  return request({
    url: `/crm/dialog/dialogjd/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogJD(data) {
  return request({
    url: `/crm/dialog/dialogjd/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogJD(data) {
  return request({
    url: `/crm/dialog/dialogjd/reject/`,
    method: 'patch',
    data
  })
}

