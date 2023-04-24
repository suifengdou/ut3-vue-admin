import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogTBList(params) {
  return request({
    url: '/crm/dialog/dialogtb/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogTB(data) {
  return request({
    url: `/crm/dialog/dialogtb/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogTB(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/dialog/dialogtb/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogTB(data) {
  return request({
    url: `/crm/dialog/dialogtb/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogTB(data) {
  return request({
    url: `/crm/dialog/dialogtb/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogTB(data) {
  return request({
    url: `/crm/dialog/dialogtb/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogTB(data) {
  return request({
    url: `/crm/dialog/dialogtb/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogTB(data) {
  return request({
    url: `/crm/dialog/dialogtb/reject/`,
    method: 'patch',
    data
  })
}

