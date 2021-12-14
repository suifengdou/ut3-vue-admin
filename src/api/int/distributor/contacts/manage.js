import request from '@/utils/request'

export function getContactsList(params) {
  return request({
    url: '/int/intdistributor/contacts/',
    method: 'get',
    params
  })
}

// 创建
export function createContacts(data) {
  return request({
    url: '/int/intdistributor/contacts/',
    method: 'post',
    data
  })
}

// 修改
export function updateContacts(id, data) {
  return request({
    url: `/int/intdistributor/contacts/${id}/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportContacts(data) {
  return request({
    url: `/int/intdistributor/contacts/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportContacts(data) {
  return request({
    url: `/int/intdistributor/contacts/export/`,
    method: 'patch',
    data
  })
}






