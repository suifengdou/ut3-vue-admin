import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceOrderSummary(params) {
  return request({
    url: '/crm/service/maintenanceordersummary/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMaintenanceOrderSummary(data) {
  return request({
    url: `/crm/service/maintenanceordersummary/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMaintenanceOrderSummary(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/maintenanceordersummary/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenanceOrderSummary(data) {
  return request({
    url: `/crm/service/maintenanceordersummary/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenanceOrderSummary(data) {
  return request({
    url: `/crm/service/maintenanceordersummary/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixMaintenanceOrderSummary(data) {
  return request({
    url: `/crm/service/maintenanceordersummary/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenanceOrderSummary(data) {
  return request({
    url: `/crm/service/maintenanceordersummary/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function oriRecountMaintenanceOrderSummary(data) {
  return request({
    url: `/crm/service/maintenanceordersummary/ori_recount/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLoMaintenanceOrderSummary(data) {
  return request({
    url: `/crm/service/maintenanceordersummary/get_log_details/`,
    method: 'patch',
    data
  })
}
