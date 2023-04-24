import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getLabel(params) {
  return request({
    url: '/crm/label/label/',
    method: 'get',
    params
  })
}

// 创建工单
export function createLabel(data) {
  return request({
    url: `/crm/label/label/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateLabel(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/label/label/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportLabel(data) {
  return request({
    url: `/crm/label/label/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportLabel(data) {
  return request({
    url: `/crm/label/label/excel_import/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogLabel(data) {
  return request({
    url: `/crm/label/label/get_log_details/`,
    method: 'patch',
    data
  })
}

