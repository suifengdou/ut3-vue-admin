import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceGoodsSubmit(params) {
  return request({
    url: '/crm/service/maintenancegoodssubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMaintenanceGoodsSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/maintenancegoodssubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function decryptMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/decrypt/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/reject/`,
    method: 'patch',
    data
  })
}

// 设置预约
export function setAppointmentMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/set_appointment/`,
    method: 'patch',
    data
  })
}

// 重置预约
export function setRecoverMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/maintenancegoodssubmit/set_recover/`,
    method: 'patch',
    data
  })
}
