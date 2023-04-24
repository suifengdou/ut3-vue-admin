import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceList(params) {
  return request({
    url: '/crm/service/maintenance/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMaintenance(data) {
  return request({
    url: `/crm/service/maintenance/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMaintenance(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/maintenance/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenance(data) {
  return request({
    url: `/crm/service/maintenance/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenance(data) {
  return request({
    url: `/crm/service/maintenance/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixMaintenance(data) {
  return request({
    url: `/crm/service/maintenance/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenance(data) {
  return request({
    url: `/crm/service/maintenance/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMaintenance(data) {
  return request({
    url: `/crm/service/maintenance/reject/`,
    method: 'patch',
    data
  })
}

