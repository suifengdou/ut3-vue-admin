import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogTBDetailList(params) {
  return request({
    url: '/crm/dialog/dialogtbdetail/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogTBDetail(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogTBDetail(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/dialog/dialogtbdetail/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogTBDetail(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogTBDetail(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogTBDetail(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogTBDetail(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/check/`,
    method: 'patch',
    data
  })
}

// 强制审核
export function mandatoryCheckDialogTBDetail(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/mandatory_check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogTBDetail(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/reject/`,
    method: 'patch',
    data
  })
}

