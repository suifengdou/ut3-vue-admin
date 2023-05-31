import request from '@/utils/request'

//
export function getServiceOrder(params) {
  return request({
    url: '/crm/service/serviceorderchart/',
    method: 'get',
    params
  })
}
