import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogTBDetailSubmitList(params) {
  return request({
    url: '/crm/dialog/dialogtbdetailsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogTBDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogTBDetailSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/dialog/dialogtbdetailsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogTBDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailsubmit/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogTBDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogTBDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailsubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogTBDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogTBDetailSubmit(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailsubmit/reject/`,
    method: 'patch',
    data
  })
}

