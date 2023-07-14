import request from '@/utils/request'

// 获取列表
export function getRenovationSubmit(params) {
  return request({
    url: '/psi/renovation/renovationsubmit/',
    method: 'get',
    params
  })
}

// 创建
export function createRenovationSubmit(data) {
  return request({
    url: `/psi/renovation/renovationsubmit/`,
    method: 'post',
    data
  })
}

// 更新
export function updateRenovationSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/psi/renovation/renovationsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportRenovationSubmit(data) {
  return request({
    url: `/psi/renovation/renovationsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportRenovationSubmit(data) {
  return request({
    url: `/psi/renovation/renovationsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核
export function checkRenovationSubmit(data) {
  return request({
    url: `/psi/renovation/renovationsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消
export function rejectRenovationSubmit(data) {
  return request({
    url: `/psi/renovation/renovationsubmit/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialRenovationSubmit(data) {
  return request({
    url: `/psi/renovation/renovationsubmit/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagRenovationSubmit(data) {
  return request({
    url: `/psi/renovation/renovationsubmit/reset_tag/`,
    method: 'patch',
    data
  })
}

