import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderExecute(params) {
  return request({
    url: '/workorder/satisfaction/swoexecute/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderExecute(data) {
  return request({
    url: `/workorder/satisfaction/swoexecute/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderExecute(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/swoexecute/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderExecute(data) {
  return request({
    url: `/workorder/satisfaction/swoexecute/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderExecute(data) {
  return request({
    url: `/workorder/satisfaction/swoexecute/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportWorkOrderExecute(data) {
  return request({
    url: `/workorder/satisfaction/swoexecute/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderExecute(data) {
  return request({
    url: `/workorder/satisfaction/swoexecute/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function createServiceWorkOrderExecute(data) {
  return request({
    url: `/workorder/satisfaction/swoexecute/create_service/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderExecute(data) {
  return request({
    url: `/workorder/satisfaction/swoexecute/reject/`,
    method: 'patch',
    data
  })
}
