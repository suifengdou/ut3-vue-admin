import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderManage(params) {
  return request({
    url: '/workorder/dealers/dwomanage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderManage(data) {
  return request({
    url: `/workorder/dealers/dwomanage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderManage(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/dealers/dwomanage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderManage(data) {
  return request({
    url: `/workorder/dealers/dwomanage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderManage(data) {
  return request({
    url: `/workorder/dealers/dwomanage/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderManage(data) {
  return request({
    url: `/workorder/dealers/dwomanage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderManage(data) {
  return request({
    url: `/workorder/dealers/dwomanage/reject/`,
    method: 'patch',
    data
  })
}
