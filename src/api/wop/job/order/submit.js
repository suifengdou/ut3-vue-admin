import request from '@/utils/request'


// 获取列表
export function getJobOrderSubmit(params) {
  return request({
    url: '/workorder/job/jobordersubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createJobOrderSubmit(data) {
  return request({
    url: `/workorder/job/jobordersubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateJobOrderSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/job/jobordersubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportJobOrderSubmit(data) {
  return request({
    url: `/workorder/job/jobordersubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportJobOrderSubmit(data) {
  return request({
    url: `/workorder/job/jobordersubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入文档
export function fileImportJobOrderSubmit(data) {
  return request({
    url: `/workorder/job/jobordersubmit/file_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixJobOrderSubmit(data) {
  return request({
    url: `/workorder/job/jobordersubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkJobOrderSubmit(data) {
  return request({
    url: `/workorder/job/jobordersubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectJobOrderSubmit(data) {
  return request({
    url: `/workorder/job/jobordersubmit/reject/`,
    method: 'patch',
    data
  })
}

