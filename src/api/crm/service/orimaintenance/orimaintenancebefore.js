import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriMaintenanceBeforeList(params) {
  return request({
    url: '/crm/service/orimaintenancebefore/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriMaintenanceBefore(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/orimaintenancebefore/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function batchSignOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/batch_sign/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function batchTextOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/batchtext/`,
    method: 'patch',
    data
  })
}

// 设置预约
export function setAppointmentOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/set_appointment/`,
    method: 'patch',
    data
  })
}

// 重置预约
export function setRecoverOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/set_recover/`,
    method: 'patch',
    data
  })
}
