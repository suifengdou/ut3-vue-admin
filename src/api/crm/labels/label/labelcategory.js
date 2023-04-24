import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getLabelCategory(params) {
  return request({
    url: '/crm/label/labelcategory/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabelCategory(data) {
  return request({
    url: `/crm/label/labelcategory/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabelCategory(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/label/labelcategory/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabelCategory(data) {
  return request({
    url: `/crm/label/labelcategory/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabelCategory(data) {
  return request({
    url: `/crm/label/labelcategory/excel_import/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogLabelCategory(data) {
  return request({
    url: `/crm/label/labelcategory/get_log_details/`,
    method: 'patch',
    data
  })
}

