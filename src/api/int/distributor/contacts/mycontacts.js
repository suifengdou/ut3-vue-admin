import request from '@/utils/request'

export function getMyContactsList(params) {
  return request({
    url: '/int/intdistributor/myselfcontacts/',
    method: 'get',
    params
  })
}

// 创建
export function createMyContacts(data) {
  return request({
    url: '/int/intdistributor/myselfcontacts/',
    method: 'post',
    data
  })
}

// 修改
export function updateMyContacts(id, data) {
  return request({
    url: `/int/intdistributor/myselfcontacts/${id}/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportMyContacts(data) {
  return request({
    url: `/int/intdistributor/myselfcontacts/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportMyContacts(data) {
  return request({
    url: `/int/intdistributor/myselfcontacts/export/`,
    method: 'patch',
    data
  })
}






