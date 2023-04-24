import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCallLogExecute(params) {
  return request({
    url: '/crm/callcenter/calllogexecute/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCallLogExecute(data) {
  return request({
    url: `/crm/callcenter/calllogexecute/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCallLogExecute(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/callcenter/calllogexecute/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCallLogExecute(data) {
  return request({
    url: `/crm/callcenter/calllogexecute/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCallLogExecute(data) {
  return request({
    url: `/crm/callcenter/calllogexecute/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixCallLogExecute(data) {
  return request({
    url: `/crm/callcenter/calllogexecute/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCallLogExecute(data) {
  return request({
    url: `/crm/callcenter/calllogexecute/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCallLogExecute(data) {
  return request({
    url: `/crm/callcenter/calllogexecute/reject/`,
    method: 'patch',
    data
  })
}

