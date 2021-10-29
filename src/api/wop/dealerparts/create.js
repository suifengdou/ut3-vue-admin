import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getWorkOrderCreate(params) {
  return request({
    url: '/workorder/dealerparts/dpcreate/',
    method: 'get',
    params
  })
}

// 创建工单
export function createWorkOrderCreate(data) {
  return request({
    url: `/workorder/dealerparts/dpcreate/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateWorkOrderCreate(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/dealerparts/dpcreate/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportWorkOrderCreate(data) {
  return request({
    url: `/workorder/dealerparts/dpcreate/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportWorkOrderCreate(data) {
  return request({
    url: `/workorder/dealerparts/dpcreate/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkWorkOrderCreate(data) {
  return request({
    url: `/workorder/dealerparts/dpcreate/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectWorkOrderCreate(data) {
  return request({
    url: `/workorder/dealerparts/dpcreate/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialWorkOrderCreate(data) {
  return request({
    url: `/workorder/dealerparts/dpcreate/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagWorkOrderCreate(data) {
  return request({
    url: `/workorder/dealerparts/dpcreate/reset_tag/`,
    method: 'patch',
    data
  })
}


