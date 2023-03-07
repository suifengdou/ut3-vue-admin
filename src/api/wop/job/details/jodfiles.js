import request from '@/utils/request'


// 获取列表
export function getJobDetailsFile(params) {
  return request({
    url: '/workorder/job/jodfiles/',
    method: 'get',
    params
  })
}


// 查询日志
export function deleteJobDetailsFile(data) {
  return request({
    url: `/workorder/job/jodfiles/delete_file/`,
    method: 'patch',
    data
  })
}

