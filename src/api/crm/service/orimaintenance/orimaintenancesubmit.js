import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriMaintenanceSubmitList(params) {
  return request({
    url: '/crm/service/orimaintenancesubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancesubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriMaintenanceSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/service/orimaintenancesubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancesubmit/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancesubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancesubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancesubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriMaintenanceSubmit(data) {
  return request({
    url: `/crm/service/orimaintenancesubmit/reject/`,
    method: 'patch',
    data
  })
}

