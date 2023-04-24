import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceJudgmentList(params) {
  return request({
    url: '/crm/service/maintenancejudgment/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMaintenanceJudgment(data) {
  return request({
    url: `/crm/service/maintenancejudgment/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMaintenanceJudgment(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/maintenancejudgment/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenanceJudgment(data) {
  return request({
    url: `/crm/service/maintenancejudgment/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenanceJudgment(data) {
  return request({
    url: `/crm/service/maintenancejudgment/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixMaintenanceJudgment(data) {
  return request({
    url: `/crm/service/maintenancejudgment/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenanceJudgment(data) {
  return request({
    url: `/crm/service/maintenancejudgment/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMaintenanceJudgment(data) {
  return request({
    url: `/crm/service/maintenancejudgment/reject/`,
    method: 'patch',
    data
  })
}

