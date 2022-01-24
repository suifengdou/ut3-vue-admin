import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderMyself(params) {
  return request({
    url: '/workorder/satisfaction/swomyself/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/swomyself/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderMyself(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/swomyself/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/swomyself/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/swomyself/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/swomyself/photo_import/`,
    method: 'put',
    data
  })
}

// 审核工单
export function checkWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/swomyself/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function createServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/swomyself/create_service/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/swomyself/reject/`,
    method: 'patch',
    data
  })
}
