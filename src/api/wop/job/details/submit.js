import request from '@/utils/request'


// 获取列表
export function getJobOrderDetailsSubmit(params) {
  return request({
    url: '/workorder/job/joborderdetailssubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createJobOrderDetailsSubmit(data) {
  return request({
    url: `/workorder/job/joborderdetailssubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateJobOrderDetailsSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/job/joborderdetailssubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportJobOrderDetailsSubmit(data) {
  return request({
    url: `/workorder/job/joborderdetailssubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportJobOrderDetailsSubmit(data) {
  return request({
    url: `/workorder/job/joborderdetailssubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入文档
export function fileImportJobOrderDetailsSubmit(data) {
  return request({
    url: `/workorder/job/joborderdetailssubmit/file_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixJobOrderDetailsSubmit(data) {
  return request({
    url: `/workorder/job/joborderdetailssubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkJobOrderDetailsSubmit(data) {
  return request({
    url: `/workorder/job/joborderdetailssubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectJobOrderDetailsSubmit(data) {
  return request({
    url: `/workorder/job/joborderdetailssubmit/reject/`,
    method: 'patch',
    data
  })
}

