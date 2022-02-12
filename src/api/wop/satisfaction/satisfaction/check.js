import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderCheckList(params) {
  return request({
    url: '/workorder/satisfaction/swocheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/swocheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/photo_import/`,
    method: 'put',
    data
  })
}

// 审核工单
export function checkWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function createServiceWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/create_service/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderCheck(data) {
  return request({
    url: `/workorder/satisfaction/swocheck/reject/`,
    method: 'patch',
    data
  })
}
