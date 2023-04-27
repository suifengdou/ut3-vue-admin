import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriMaintenanceGoods(params) {
  return request({
    url: '/crm/service/orimaintenancegoods/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriMaintenanceGoods(data) {
  return request({
    url: `/crm/service/orimaintenancegoods/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriMaintenanceGoods(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/service/orimaintenancegoods/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriMaintenanceGoods(data) {
  return request({
    url: `/crm/service/orimaintenancegoods/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriMaintenanceGoods(data) {
  return request({
    url: `/crm/service/orimaintenancegoods/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriMaintenanceGoods(data) {
  return request({
    url: `/crm/service/orimaintenancegoods/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriMaintenanceGoods(data) {
  return request({
    url: `/crm/service/orimaintenancegoods/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriMaintenanceGoods(data) {
  return request({
    url: `/crm/service/orimaintenancegoods/reject/`,
    method: 'patch',
    data
  })
}


// 查询日志
export function getLogOriMaintenanceGoods(data) {
  return request({
    url: `/crm/service/orimaintenancegoods/get_log_details/`,
    method: 'patch',
    data
  })
}

