import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCompensationList(params) {
  return request({
    url: '/dfc/compensation/compensation/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCompensation(data) {
  return request({
    url: `/dfc/compensation/compensation/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCompensation(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/dfc/compensation/compensation/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCompensation(data) {
  return request({
    url: `/dfc/compensation/compensation/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCompensation(data) {
  return request({
    url: `/dfc/compensation/compensation/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCompensation(data) {
  return request({
    url: `/dfc/compensation/compensation/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCompensation(data) {
  return request({
    url: `/dfc/compensation/compensation/reject/`,
    method: 'patch',
    data
  })
}

