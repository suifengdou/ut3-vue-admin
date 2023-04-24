import request from '@/utils/request'


// 获取列表
export function getLabelCustomerOrderDetailsSubmit(params) {
  return request({
    url: '/crm/label/labelcustomerorderdetailssubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabelCustomerOrderDetailsSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetailssubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabelCustomerOrderDetailsSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/label/labelcustomerorderdetailssubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabelCustomerOrderDetailsSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetailssubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabelCustomerOrderDetailsSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetailssubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function signLabelCustomerOrderDetailsSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetailssubmit/sign/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkLabelCustomerOrderDetailsSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetailssubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectLabelCustomerOrderDetailsSubmit(data) {
  return request({
    url: `/crm/label/labelcustomerorderdetailssubmit/reject/`,
    method: 'patch',
    data
  })
}

