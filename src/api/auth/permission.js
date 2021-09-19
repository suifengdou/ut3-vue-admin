import request from '@/utils/request'

export function getPermissionsList(params) {
  return request({
    url: `/auth/permission/`,
    method: 'get',
    params
  })
}
