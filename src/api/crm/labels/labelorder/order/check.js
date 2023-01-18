import request from '@/utils/request'


// 获取列表
export function getLabelCustomerOrderCheck(params) {
  return request({
    url: '/crm/label/labelcustomerordercheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabelCustomerOrderCheck(data) {
  return request({
    url: `/crm/label/labelcustomerordercheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabelCustomerOrderCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/label/labelcustomerordercheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabelCustomerOrderCheck(data) {
  return request({
    url: `/crm/label/labelcustomerordercheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabelCustomerOrderCheck(data) {
  return request({
    url: `/crm/label/labelcustomerordercheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixLabelCustomerOrderCheck(data) {
  return request({
    url: `/crm/label/labelcustomerordercheck/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkLabelCustomerOrderCheck(data) {
  return request({
    url: `/crm/label/labelcustomerordercheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectLabelCustomerOrderCheck(data) {
  return request({
    url: `/crm/label/labelcustomerordercheck/reject/`,
    method: 'patch',
    data
  })
}

