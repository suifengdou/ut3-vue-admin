import request from '@/utils/request'


// 获取列表
export function getJobOrderDetailsAccept(params) {
  return request({
    url: '/workorder/job/joborderdetailsaccept/',
    method: 'get',
    params
  })
}

// 创建工单
export function createJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateJobOrderDetailsAccept(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/workorder/job/joborderdetailsaccept/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/excel_import/`,
    method: 'patch',
    data
  })
}

// 导入文档
export function fileImportJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/file_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/check/`,
    method: 'patch',
    data
  })
}

// 锁定工单
export function signJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/sign/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectJobOrderDetailsAccept(data) {
  return request({
    url: `/workorder/job/joborderdetailsaccept/reject/`,
    method: 'patch',
    data
  })
}

