import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogJDWordsList(params) {
  return request({
    url: '/crm/dialog/dialogjdbwords/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogJDWords(data) {
  return request({
    url: `/crm/dialog/dialogjdbwords/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogJDWords(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/dialog/dialogjdbwords/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogJDWords(data) {
  return request({
    url: `/crm/dialog/dialogjdbwords/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogJDWords(data) {
  return request({
    url: `/crm/dialog/dialogjdbwords/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogJDWords(data) {
  return request({
    url: `/crm/dialog/dialogjdbwords/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogJDWords(data) {
  return request({
    url: `/crm/dialog/dialogjdbwords/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogJDWords(data) {
  return request({
    url: `/crm/dialog/dialogjdbwords/reject/`,
    method: 'patch',
    data
  })
}

