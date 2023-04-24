import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getServiceWorkOrderMyself(params) {
  return request({
    url: '/workorder/satisfaction/servicemyself/',
    method: 'get',
    params
  })
}

// 创建工单
export function createServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/servicemyself/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateServiceWorkOrderMyself(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/satisfaction/servicemyself/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/servicemyself/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/servicemyself/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function photoImportServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/servicemyself/photo_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/servicemyself/check/`,
    method: 'patch',
    data
  })
}


// 修复工单
export function fixServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/servicemyself/fix/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectServiceWorkOrderMyself(data) {
  return request({
    url: `/workorder/satisfaction/servicemyself/reject/`,
    method: 'patch',
    data
  })
}



