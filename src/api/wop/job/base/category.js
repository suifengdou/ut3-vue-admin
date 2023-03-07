import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getJobCategory(params) {
  return request({
    url: '/workorder/job/jobcategory/',
    method: 'get',
    params
  })
}

// 创建工单
export function createJobCategory(data) {
  return request({
    url: `/workorder/job/jobcategory/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateJobCategory(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/job/jobcategory/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportJobCategory(data) {
  return request({
    url: `/workorder/job/jobcategory/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportJobCategory(data) {
  return request({
    url: `/workorder/job/jobcategory/excel_import/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogJobCategory(data) {
  return request({
    url: `/workorder/job/jobcategory/get_log_details/`,
    method: 'patch',
    data
  })
}

