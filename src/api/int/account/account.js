import request from '@/utils/request'

export function getAccountList(params) {
  return request({
    url: '/int/intaccount/account/',
    method: 'get',
    params
  })
}

// 创建
export function createAccount(data) {
  return request({
    url: '/int/intaccount/account/',
    method: 'post',
    data
  })
}

// 修改
export function updateAccount(id, data) {
  return request({
    url: `/int/intaccount/account/${id}/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportAccount(data) {
  return request({
    url: `/int/intaccount/account/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportAccount(data) {
  return request({
    url: `/int/intaccount/account/export/`,
    method: 'patch',
    data
  })
}






