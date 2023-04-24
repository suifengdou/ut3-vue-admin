import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriCallLogCheck(params) {
  return request({
    url: '/crm/callcenter/oricalllogcheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriCallLogCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/callcenter/oricalllogcheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function signOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/sign/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function setallOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/setall/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/oricalllogcheck/reject/`,
    method: 'patch',
    data
  })
}

