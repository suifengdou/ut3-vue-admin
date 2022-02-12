import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderConfirmList(params) {
  return request({
    url: '/workorder/satisfaction/swoconfirm/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderConfirm(data) {
  return request({
    url: `/workorder/satisfaction/swoconfirm/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderConfirm(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/satisfaction/swoconfirm/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderConfirm(data) {
  return request({
    url: `/workorder/satisfaction/swoconfirm/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderConfirm(data) {
  return request({
    url: `/workorder/satisfaction/swoconfirm/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportWorkOrderConfirm(data) {
  return request({
    url: `/workorder/satisfaction/swoconfirm/photo_import/`,
    method: 'put',
    data
  })
}

// 审核工单
export function checkWorkOrderConfirm(data) {
  return request({
    url: `/workorder/satisfaction/swoconfirm/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function createServiceWorkOrderConfirm(data) {
  return request({
    url: `/workorder/satisfaction/swoconfirm/create_service/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderConfirm(data) {
  return request({
    url: `/workorder/satisfaction/swoconfirm/reject/`,
    method: 'patch',
    data
  })
}
