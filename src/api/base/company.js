import request from '@/utils/request'

export function getCompanyList(params) {
  return request({
    url: '/base/company/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createCompany(data) {
  return request({
    url: '/base/company/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateCompany(id, data) {
  return request({
    url: `/base/company/${id}/`,
    method: 'patch',
    data
  })
}
