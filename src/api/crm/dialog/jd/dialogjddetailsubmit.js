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
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/export/`,
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
export function collectDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/collect/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function abandonDialogJDDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogjddetailsubmit/abandon/`,
    method: 'patch',
    data
  })
}

