import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCustomerLabel(params) {
  return request({
    url: '/crm/customers/cslabels/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCustomerLabel(data) {
  return request({
    url: `/crm/customers/cslabels/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCustomerLabel(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/customers/cslabels/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCustomerLabel(data) {
  return request({
    url: `/crm/customers/cslabels/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCustomerLabel(data) {
  return request({
    url: `/crm/customers/cslabels/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function createJobCustomerLabel(data) {
  return request({
    url: `/crm/customers/cslabels/create_job/`,
    method: 'patch',
    data
  })
}

export function createJobForceCustomerLabel(data) {
  return request({
    url: `/crm/customers/cslabels/create_job_force/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCustomerLabel(data) {
  return request({
    url: `/crm/customers/cslabels/reject/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function getLogCustomerLabel(data) {
  return request({
    url: `/crm/customers/cslabels/get_log_details/`,
    method: 'patch',
    data
  })
}

