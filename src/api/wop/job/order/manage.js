import request from '@/utils/request'


// 获取列表
export function getJobOrder(params) {
  return request({
    url: '/workorder/job/jobordermanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportJobOrder(data) {
  return request({
    url: `/workorder/job/jobordermanage/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogJobOrder(data) {
  return request({
    url: `/workorder/job/jobordermanage/get_log_details/`,
    method: 'patch',
    data
  })
}


// 查询日志
export function getFilesJobOrder(data) {
  return request({
    url: `/workorder/job/jobordermanage/get_file_details/`,
    method: 'patch',
    data
  })
}

