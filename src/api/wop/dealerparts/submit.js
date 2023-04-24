import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderSubmit(params) {
  return request({
    url: '/workorder/dealerparts/dpsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealerparts/dpsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/dealerparts/dpsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealerparts/dpsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealerparts/dpsubmit/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealerparts/dpsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealerparts/dpsubmit/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealerparts/dpsubmit/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagWorkOrderSubmit(data) {
  return request({
    url: `/workorder/dealerparts/dpsubmit/reset_tag/`,
    method: 'patch',
    data
  })
}


