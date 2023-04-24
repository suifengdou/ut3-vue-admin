import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogOWDetailList(params) {
  return request({
    url: '/crm/dialog/dialogowdetail/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogOWDetail(data) {
  return request({
    url: `/crm/dialog/dialogowdetail/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogOWDetail(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/dialog/dialogowdetail/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogOWDetail(data) {
  return request({
    url: `/crm/dialog/dialogowdetail/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogOWDetail(data) {
  return request({
    url: `/crm/dialog/dialogowdetail/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogOWDetail(data) {
  return request({
    url: `/crm/dialog/dialogowdetail/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogOWDetail(data) {
  return request({
    url: `/crm/dialog/dialogowdetail/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogOWDetail(data) {
  return request({
    url: `/crm/dialog/dialogowdetail/reject/`,
    method: 'patch',
    data
  })
}

