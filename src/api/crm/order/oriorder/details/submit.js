import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriOrderDetailsSubmit(params) {
  return request({
    url: '/crm/order/oriorderdetailssubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriOrderDetailsSubmit(data) {
  return request({
    url: `/crm/order/oriorderdetailssubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriOrderDetailsSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/order/oriorderdetailssubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriOrderDetailsSubmit(data) {
  return request({
    url: `/crm/order/oriorderdetailssubmit/export/`,
    method: 'patch',
    data
  })
}
// 导出工单
export function exportSrcTidsOriOrderDetailsSubmit(data) {
  return request({
    url: `/crm/order/oriorderdetailssubmit/export_src_tids/`,
    method: 'patch',
    data
  })
}
// 导入工单
export function excelImportOriOrderDetailsSubmit(data) {
  return request({
    url: `/crm/order/oriorderdetailssubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriOrderDetailsSubmit(data) {
  return request({
    url: `/crm/order/oriorderdetailssubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriOrderDetailsSubmit(data) {
  return request({
    url: `/crm/order/oriorderdetailssubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriOrderDetailsSubmit(data) {
  return request({
    url: `/crm/order/oriorderdetailssubmit/reject/`,
    method: 'patch',
    data
  })
}

