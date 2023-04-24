import request from '@/utils/request'


// 获取列表
export function getJobOrderDetailsCheck(params) {
  return request({
    url: '/workorder/job/joborderdetailscheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createJobOrderDetailsCheck(data) {
  return request({
    url: `/workorder/job/joborderdetailscheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateJobOrderDetailsCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/job/joborderdetailscheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportJobOrderDetailsCheck(data) {
  return request({
    url: `/workorder/job/joborderdetailscheck/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportJobOrderDetailsCheck(data) {
  return request({
    url: `/workorder/job/joborderdetailscheck/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入文档
export function fileImportJobOrderDetailsCheck(data) {
  return request({
    url: `/workorder/job/joborderdetailscheck/file_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixJobOrderDetailsCheck(data) {
  return request({
    url: `/workorder/job/joborderdetailscheck/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkJobOrderDetailsCheck(data) {
  return request({
    url: `/workorder/job/joborderdetailscheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectJobOrderDetailsCheck(data) {
  return request({
    url: `/workorder/job/joborderdetailscheck/reject/`,
    method: 'patch',
    data
  })
}

