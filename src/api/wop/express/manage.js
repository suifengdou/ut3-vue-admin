import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderManage(params) {
  return request({
    url: '/workorder/express/ewomanage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderManage(data) {
  return request({
    url: `/workorder/express/ewomanage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderManage(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/express/ewomanage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderManage(data) {
  return request({
    url: `/workorder/express/ewomanage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderManage(data) {
  return request({
    url: `/workorder/express/ewomanage/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderManage(data) {
  return request({
    url: `/workorder/express/ewomanage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderManage(data) {
  return request({
    url: `/workorder/express/ewomanage/reject/`,
    method: 'patch',
    data
  })
}
