import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderHandle(params) {
  return request({
    url: '/workorder/express/ewohandle/',
    method: 'get',
    params
  })
}

// 更新工单
export function updateWorkOrderHandle(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/express/ewohandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入图片
export function photoImportWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/reject/`,
    method: 'patch',
    data
  })
}

// 设置丢失
export function setLossingWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/set_lossing/`,
    method: 'patch',
    data
  })
}

// 设置重置
export function recoverWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/recover/`,
    method: 'patch',
    data
  })
}

// 设置重置
export function batchSuggestionWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/batchtext/`,
    method: 'patch',
    data
  })
}

// 设置重置
export function setReturnWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/set_return/`,
    method: 'patch',
    data
  })
}

// 设置重置
export function setReturnTrackIDWorkOrderHandle(data) {
  return request({
    url: `/workorder/express/ewohandle/set_return_trackid/`,
    method: 'patch',
    data
  })
}
