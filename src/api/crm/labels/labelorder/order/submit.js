import request from '@/utils/request'


// 获取列表
export function getLabelCustomerOrderSubmit(params) {
  return request({
    url: '/crm/label/labelcustomerordersubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabelCustomerOrderSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerordersubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabelCustomerOrderSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/label/labelcustomerordersubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabelCustomerOrderSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabelCustomerOrderSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerordersubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixLabelCustomerOrderSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerordersubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkLabelCustomerOrderSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerordersubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectLabelCustomerOrderSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerordersubmit/reject/`,
    method: 'patch',
    data
  })
}

