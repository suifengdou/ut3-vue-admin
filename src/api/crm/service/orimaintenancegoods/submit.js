import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriMaintenanceGoodsSubmit(params) {
  return request({
    url: '/crm/service/orimaintenancegoodssubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriMaintenanceGoodsSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function decryptOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/decrypt/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/reject/`,
    method: 'patch',
    data
  })
}

// 设置预约
export function setAppointmentOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/set_appointment/`,
    method: 'patch',
    data
  })
}

// 重置预约
export function setRecoverOriMaintenanceGoodsSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancegoodssubmit/set_recover/`,
    method: 'patch',
    data
  })
}
