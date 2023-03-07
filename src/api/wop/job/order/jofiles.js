import request from '@/utils/request'


// 获取列表
export function getJobFile(params) {
  return request({
    url: '/workorder/job/jofiles/',
    method: 'get',
    params
  })
}


// 查询日志
export function deleteJobFile(data) {
  return request({
    url: `/workorder/job/jofiles/delete_file/`,
    method: 'patch',
    data
  })
}

