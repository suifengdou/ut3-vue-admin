import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogOWSubmitList(params) {
  return request({
    url: '/crm/dialog/dialogowsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogOWSubmit(data) {
  return request({
    url: `/crm/dialog/dialogowsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogOWSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/dialog/dialogowsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogOWSubmit(data) {
  return request({
    url: `/crm/dialog/dialogowsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogOWSubmit(data) {
  return request({
    url: `/crm/dialog/dialogowsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogOWSubmit(data) {
  return request({
    url: `/crm/dialog/dialogowsubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogOWSubmit(data) {
  return request({
    url: `/crm/dialog/dialogowsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogOWSubmit(data) {
  return request({
    url: `/crm/dialog/dialogowsubmit/reject/`,
    method: 'patch',
    data
  })
}

