import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMOExportCheck(params) {
  return request({
    url: '/dfc/manualorder/moexportcheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMOExportCheck(data) {
  return request({
    url: `/dfc/manualorder/moexportcheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMOExportCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/dfc/manualorder/moexportcheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMOExportCheck(data) {
  return request({
    url: `/dfc/manualorder/moexportcheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMOExportCheck(data) {
  return request({
    url: `/dfc/manualorder/moexportcheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function getOrderIdMOExportCheck(data) {
  return request({
    url: `/dfc/manualorder/moexportcheck/export_order_id/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMOExportCheck(data) {
  return request({
    url: `/dfc/manualorder/moexportcheck/reject/`,
    method: 'patch',
    data
  })
}





























