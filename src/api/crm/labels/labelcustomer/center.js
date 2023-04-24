import request from '@/utils/request'


// 获取列表
export function getLabelCustomerCenter(params) {
  return request({
    url: '/crm/label/labelcustomer/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabelCustomerCenter(data) {
  return request({
    url: `/crm/label/labelcustomer/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabelCustomerCenter(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/label/labelcustomer/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabelCustomerCenter(data) {
  return request({
    url: `/crm/label/labelcustomer/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabelCustomerCenter(data) {
  return request({
    url: `/crm/label/labelcustomer/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixLabelCustomerCenter(data) {
  return request({
    url: `/crm/label/labelcustomer/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkLabelCustomerCenter(data) {
  return request({
    url: `/crm/label/labelcustomer/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectLabelCustomerCenter(data) {
  return request({
    url: `/crm/label/labelcustomer/reject/`,
    method: 'patch',
    data
  })
}

