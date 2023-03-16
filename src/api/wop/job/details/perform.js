import request from '@/utils/request'


// 获取列表
export function getJobOrderDetailsPerform(params) {
  return request({
    url: '/workorder/job/joborderdetailsperform/',
    method: 'get',
    params
  })
}

// 创建工单
export function createJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateJobOrderDetailsPerform(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/job/joborderdetailsperform/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入文档
export function fileImportJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/file_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/fix/`,
    method: 'patch',
    data
  })
}

// 锁定工单
export function batchTextJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/batchtext/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/check/`,
    method: 'patch',
    data
  })
}
// 锁定工单
export function signJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/sign/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectJobOrderDetailsPerform(data) {
  return request({
    url: `/workorder/job/joborderdetailsperform/reject/`,
    method: 'patch',
    data
  })
}

