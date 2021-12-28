import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderHandle(params) {
  return request({
    url: '/workorder/satisfaction/oswohandle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/oswohandle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/oswohandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/oswohandle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/oswohandle/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/oswohandle/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/oswohandle/check/`,
    method: 'patch',
    data
  })
}

// 修复工单
export function fixWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/oswohandle/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/oswohandle/reject/`,
    method: 'patch',
    data
  })
}
