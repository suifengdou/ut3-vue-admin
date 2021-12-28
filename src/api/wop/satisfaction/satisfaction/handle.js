import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderHandle(params) {
  return request({
    url: '/workorder/satisfaction/swohandle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/swohandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/check/`,
    method: 'patch',
    data
  })
}

// 领取工单
export function takeoverWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/take_over/`,
    method: 'patch',
    data
  })
}

// 修复工单
export function fixWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊工单
export function setSpecialWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/swohandle/set_special/`,
    method: 'patch',
    data
  })
}


