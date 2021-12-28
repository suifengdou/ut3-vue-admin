import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderCreate(params) {
  return request({
    url: '/workorder/satisfaction/oswocreate/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderCreate(data) {
  return request({
    url: `/workorder/satisfaction/oswocreate/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderCreate(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/oswocreate/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderCreate(data) {
  return request({
    url: `/workorder/satisfaction/oswocreate/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderCreate(data) {
  return request({
    url: `/workorder/satisfaction/oswocreate/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportWorkOrderCreate(data) {
  return request({
    url: `/workorder/satisfaction/oswocreate/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderCreate(data) {
  return request({
    url: `/workorder/satisfaction/oswocreate/check/`,
    method: 'patch',
    data
  })
}

// 修复工单
export function fixWorkOrderCreate(data) {
  return request({
    url: `/workorder/satisfaction/oswocreate/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderCreate(data) {
  return request({
    url: `/workorder/satisfaction/oswocreate/reject/`,
    method: 'patch',
    data
  })
}
