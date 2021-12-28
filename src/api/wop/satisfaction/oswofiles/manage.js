import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getOSWOFiles(params) {
  return request({
    url: '/workorder/satisfaction/oswofiles/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOSWOFiles(data) {
  return request({
    url: `/workorder/satisfaction/oswofiles/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOSWOFiles(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/oswofiles/${id}/`,
    method: 'patch',
    data
  })
}

// 更新工单
export function deleteOSWOFiles(id) {
  return request({
    url: `/workorder/satisfaction/oswofiles/${id}/`,
    method: 'delete',
  })
}

// 导出工单
export function exportOSWOFiles(data) {
  return request({
    url: `/workorder/satisfaction/oswofiles/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOSWOFiles(data) {
  return request({
    url: `/workorder/satisfaction/oswofiles/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportOSWOFiles(data) {
  return request({
    url: `/workorder/satisfaction/oswofiles/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOSWOFiles(data) {
  return request({
    url: `/workorder/satisfaction/oswofiles/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOSWOFiles(data) {
  return request({
    url: `/workorder/satisfaction/oswofiles/reject/`,
    method: 'patch',
    data
  })
}
