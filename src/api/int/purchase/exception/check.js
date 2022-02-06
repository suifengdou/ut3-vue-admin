import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getExceptionIPOCheckList(params) {
  return request({
    url: '/int/exceptionipo/check/',
    method: 'get',
    params
  })
}

// 创建工单
export function createExceptionIPOCheck(data) {
  return request({
    url: `/int/exceptionipo/check/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateExceptionIPOCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/int/exceptionipo/check/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportExceptionIPOCheck(data) {
  return request({
    url: `/int/exceptionipo/check/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportExceptionIPOCheck(data) {
  return request({
    url: `/int/exceptionipo/check/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkExceptionIPOCheck(data) {
  return request({
    url: `/int/exceptionipo/check/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectExceptionIPOCheck(data) {
  return request({
    url: `/int/exceptionipo/check/reject/`,
    method: 'patch',
    data
  })
}

// 设置完成工单
export function setEndExceptionIPOCheck(data) {
  return request({
    url: `/int/exceptionipo/check/set_end/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetExceptionIPOCheck(data) {
  return request({
    url: `/int/exceptionipo/check/reset_tag/`,
    method: 'patch',
    data
  })
}

