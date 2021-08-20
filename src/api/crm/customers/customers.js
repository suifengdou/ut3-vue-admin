import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCustomerList(params) {
  return request({
    url: '/crm/customers/csmanage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCustomer(data) {
  return request({
    url: `/crm/customers/csmanage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCustomer(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/customers/csmanage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCustomer(data) {
  return request({
    url: `/crm/customers/csmanage/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCustomer(data) {
  return request({
    url: `/crm/customers/csmanage/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCustomer(data) {
  return request({
    url: `/crm/customers/csmanage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCustomer(data) {
  return request({
    url: `/crm/customers/csmanage/reject/`,
    method: 'patch',
    data
  })
}
