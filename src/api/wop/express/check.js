import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderCheck(params) {
  return request({
    url: '/workorder/express/ewocheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderCheck(data) {
  return request({
    url: `/workorder/express/ewocheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/express/ewocheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderCheck(data) {
  return request({
    url: `/workorder/express/ewocheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderCheck(data) {
  return request({
    url: `/workorder/express/ewocheck/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderCheck(data) {
  return request({
    url: `/workorder/express/ewocheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderCheck(data) {
  return request({
    url: `/workorder/express/ewocheck/reject/`,
    method: 'patch',
    data
  })
}

// 设置预约
export function setAppointmentWorkOrderCheck(data) {
  return request({
    url: `/workorder/express/ewocheck/set_appointment/`,
    method: 'patch',
    data
  })
}

// 重置预约
export function setRecoverWorkOrderCheck(data) {
  return request({
    url: `/workorder/express/ewocheck/set_recover/`,
    method: 'patch',
    data
  })
}

