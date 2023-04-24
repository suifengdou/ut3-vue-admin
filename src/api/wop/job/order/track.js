import request from '@/utils/request'


// 获取列表
export function getJobOrderTrack(params) {
  return request({
    url: '/workorder/job/jobordertrack/',
    method: 'get',
    params
  })
}

// 创建工单
export function createJobOrderTrack(data) {
  return request({
    url: `/workorder/job/jobordertrack/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateJobOrderTrack(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/workorder/job/jobordertrack/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportJobOrderTrack(data) {
  return request({
    url: `/workorder/job/jobordertrack/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportJobOrderTrack(data) {
  return request({
    url: `/workorder/job/jobordertrack/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入文档
export function fileImportJobOrderTrack(data) {
  return request({
    url: `/workorder/job/jobordertrack/file_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixJobOrderTrack(data) {
  return request({
    url: `/workorder/job/jobordertrack/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkJobOrderTrack(data) {
  return request({
    url: `/workorder/job/jobordertrack/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectJobOrderTrack(data) {
  return request({
    url: `/workorder/job/jobordertrack/reject/`,
    method: 'patch',
    data
  })
}

