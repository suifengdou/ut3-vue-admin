import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getServicerList(params) {
  return request({
    url: '/crm/dialog/servicer/',
    method: 'get',
    params
  })
}

// 创建
export function createServicer(data) {
  return request({
    url: `/crm/dialog/servicer/`,
    method: 'post',
    data
  })
}

// 更新
export function updateServicer(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/dialog/servicer/${id}/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportServicer(data) {
  return request({
    url: `/crm/dialog/servicer/export/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportServicer(data) {
  return request({
    url: `/crm/dialog/servicer/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixServicer(data) {
  return request({
    url: `/crm/dialog/servicer/fix/`,
    method: 'patch',
    data
  })
}

// 审核
export function checkServicer(data) {
  return request({
    url: `/crm/dialog/servicer/check/`,
    method: 'patch',
    data
  })
}

// 取消
export function rejectServicer(data) {
  return request({
    url: `/crm/dialog/servicer/reject/`,
    method: 'patch',
    data
  })
}

