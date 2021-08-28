import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceSubmitList(params) {
  return request({
    url: '/crm/service/maintenancesubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/maintenancesubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMaintenanceSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/service/maintenancesubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/maintenancesubmit/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/maintenancesubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/maintenancesubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/maintenancesubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/maintenancesubmit/reject/`,
    method: 'patch',
    data
  })
}

