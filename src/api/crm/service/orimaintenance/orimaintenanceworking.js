import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriMaintenanceWorkingList(params) {
  return request({
    url: '/crm/service/orimaintenanceworking/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriMaintenanceWorking(data) {
  return request({
    url: `/crm/service/orimaintenanceworking/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriMaintenanceWorking(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/service/orimaintenanceworking/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriMaintenanceWorking(data) {
  return request({
    url: `/crm/service/orimaintenanceworking/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriMaintenanceWorking(data) {
  return request({
    url: `/crm/service/orimaintenanceworking/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriMaintenanceWorking(data) {
  return request({
    url: `/crm/service/orimaintenanceworking/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriMaintenanceWorking(data) {
  return request({
    url: `/crm/service/orimaintenanceworking/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriMaintenanceWorking(data) {
  return request({
    url: `/crm/service/orimaintenanceworking/reject/`,
    method: 'patch',
    data
  })
}

