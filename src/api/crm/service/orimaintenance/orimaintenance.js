import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriMaintenanceList(params) {
  return request({
    url: '/crm/service/orimaintenance/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriMaintenance(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/service/orimaintenance/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriMaintenance(data) {
  return request({
    url: `/crm/service/orimaintenance/reject/`,
    method: 'patch',
    data
  })
}

