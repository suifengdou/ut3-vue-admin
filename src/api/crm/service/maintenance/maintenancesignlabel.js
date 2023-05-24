import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMaintenanceSignLabel(params) {
  return request({
    url: '/crm/service/maintenancesignlabel/',
    method: 'get',
    params
  })
}


// 更新工单
export function updateMaintenanceSignLabel(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/maintenancesignlabel/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMaintenanceSignLabel(data) {
  return request({
    url: `/crm/service/maintenancesignlabel/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMaintenanceSignLabel(data) {
  return request({
    url: `/crm/service/maintenancesignlabel/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function signAreaMaintenanceSignLabel(data) {
  return request({
    url: `/crm/service/maintenancesignlabel/sign_area/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMaintenanceSignLabel(data) {
  return request({
    url: `/crm/service/maintenancesignlabel/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMaintenanceSignLabel(data) {
  return request({
    url: `/crm/service/maintenancesignlabel/reject/`,
    method: 'patch',
    data
  })
}

