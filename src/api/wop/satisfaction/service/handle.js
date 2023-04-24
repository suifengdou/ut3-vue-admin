import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getServiceWorkOrderHandle(params) {
  return request({
    url: '/workorder/satisfaction/servicehandle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createServiceWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/servicehandle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateServiceWorkOrderHandle(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/satisfaction/servicehandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportServiceWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/servicehandle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportServiceWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/servicehandle/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportServiceWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/servicehandle/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkServiceWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/servicehandle/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function fixServiceWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/servicehandle/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectServiceWorkOrderHandle(data) {
  return request({
    url: `/workorder/satisfaction/servicehandle/reject/`,
    method: 'patch',
    data
  })
}



