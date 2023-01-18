import request from '@/utils/request'


// 获取列表
export function getLabelCustomer(params) {
  return request({
    url: '/crm/label/labelcustomer/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabelCustomer(data) {
  return request({
    url: `/crm/label/labelcustomer/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabelCustomer(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/label/labelcustomer/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabelCustomer(data) {
  return request({
    url: `/crm/label/labelcustomer/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabelCustomer(data) {
  return request({
    url: `/crm/label/labelcustomer/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixLabelCustomer(data) {
  return request({
    url: `/crm/label/labelcustomer/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkLabelCustomer(data) {
  return request({
    url: `/crm/label/labelcustomer/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectLabelCustomer(data) {
  return request({
    url: `/crm/label/labelcustomer/reject/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogLabelCustomer(data) {
  return request({
    url: `/crm/label/labelcustomer/get_log_details/`,
    method: 'patch',
    data
  })
}


