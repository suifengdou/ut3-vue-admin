import request from '@/utils/request'

export function getDepartmentList(params) {
  return request({
    url: '/base/department/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createDepartment(data) {
  return request({
    url: '/base/department/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateDepartment(id, data) {
  return request({
    url: `/base/department/${id}/`,
    method: 'patch',
    data
  })
}
