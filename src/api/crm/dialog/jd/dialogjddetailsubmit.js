import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogJDDetailSubmitList(params) {
  return request({
    url: '/crm/dialog/dialogjddetailsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogJDDetailSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/reject/`,
    method: 'patch',
    data
  })
}

