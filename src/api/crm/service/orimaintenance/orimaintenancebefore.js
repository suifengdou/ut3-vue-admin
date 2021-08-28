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
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/service/orimaintenancebefore/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/`,
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
export function checkOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriMaintenanceBefore(data) {
  return request({
    url: `/crm/service/orimaintenancebefore/reject/`,
    method: 'patch',
    data
  })
}

