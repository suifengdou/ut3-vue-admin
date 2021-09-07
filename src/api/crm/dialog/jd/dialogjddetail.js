import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogJDDetailList(params) {
  return request({
    url: '/crm/dialog/dialogjddetail/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogJDDetail(data) {
  return request({
    url: `/crm/dialog/dialogjddetail/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogJDDetail(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/dialog/dialogjddetail/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogJDDetail(data) {
  return request({
    url: `/crm/dialog/dialogjddetail/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogJDDetail(data) {
  return request({
    url: `/crm/dialog/dialogjddetail/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogJDDetail(data) {
  return request({
    url: `/crm/dialog/dialogjddetail/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogJDDetail(data) {
  return request({
    url: `/crm/dialog/dialogjddetail/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogJDDetail(data) {
  return request({
    url: `/crm/dialog/dialogjddetail/reject/`,
    method: 'patch',
    data
  })
}

