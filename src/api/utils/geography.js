import request from '@/utils/request'

export function getCityList(params) {
  return request({
    url: '/utils/geography/city/',
    method: 'get',
    params
  })
}
