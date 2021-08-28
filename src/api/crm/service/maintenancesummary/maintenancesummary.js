import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceSummaryList(params) {
  return request({
    url: '/crm/service/maintenancesummary/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMaintenanceSummary(data) {
  return request({
    url: `/crm/service/maintenancesummary/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMaintenanceSummary(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/service/maintenancesummary/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenanceSummary(data) {
  return request({
    url: `/crm/service/maintenancesummary/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenanceSummary(data) {
  return request({
    url: `/crm/service/maintenancesummary/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixMaintenanceSummary(data) {
  return request({
    url: `/crm/service/maintenancesummary/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenanceSummary(data) {
  return request({
    url: `/crm/service/maintenancesummary/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMaintenanceSummary(data) {
  return request({
    url: `/crm/service/maintenancesummary/reject/`,
    method: 'patch',
    data
  })
}

