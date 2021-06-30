import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderFinanceHandle(params) {
  return request({
    url: '/workorder/express/ewofinancehandle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderFinanceHandle(data) {
  return request({
    url: `/workorder/express/ewofinancehandle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderFinanceHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/express/ewofinancehandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderFinanceHandle(data) {
  return request({
    url: `/workorder/express/ewofinancehandle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderFinanceHandle(data) {
  return request({
    url: `/workorder/express/ewofinancehandle/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderFinanceHandle(data) {
  return request({
    url: `/workorder/express/ewofinancehandle/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderFinanceHandle(data) {
  return request({
    url: `/workorder/express/ewofinancehandle/reject/`,
    method: 'patch',
    data
  })
}
