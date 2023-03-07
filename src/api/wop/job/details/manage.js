import request from '@/utils/request'


// 获取列表
export function getJobOrderDetails(params) {
  return request({
    url: 'workorder/job/joborderdetailsmanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportJobOrderDetails(data) {
  return request({
    url: `/workorder/job/joborderdetailsmanage/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogJobOrderDetails(data) {
  return request({
    url: `/workorder/job/joborderdetailsmanage/get_log_details/`,
    method: 'patch',
    data
  })
}


// 查询日志
export function getFilesJobOrderDetails(data) {
  return request({
    url: `/workorder/job/joborderdetailsmanage/get_file_details/`,
    method: 'patch',
    data
  })
}

