import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenancePartSummary(params) {
  return request({
    url: '/crm/service/maintenancepartsummary/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMaintenancePartSummary(data) {
  return request({
    url: `/crm/service/maintenancepartsummary/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMaintenancePartSummary(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/maintenancepartsummary/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenancePartSummary(data) {
  return request({
    url: `/crm/service/maintenancepartsummary/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenancePartSummary(data) {
  return request({
    url: `/crm/service/maintenancepartsummary/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixMaintenancePartSummary(data) {
  return request({
    url: `/crm/service/maintenancepartsummary/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenancePartSummary(data) {
  return request({
    url: `/crm/service/maintenancepartsummary/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMaintenancePartSummary(data) {
  return request({
    url: `/crm/service/maintenancepartsummary/reject/`,
    method: 'patch',
    data
  })
}


// 查询日志
export function getLogMaintenancePartSummary(data) {
  return request({
    url: `/crm/service/maintenancepartsummary/get_log_details/`,
    method: 'patch',
    data
  })
}
