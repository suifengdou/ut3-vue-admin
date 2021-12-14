import request from '@/utils/request'

export function getCurrencyList(params) {
  return request({
    url: '/int/intaccount/currency/',
    method: 'get',
    params
  })
}

// 创建
export function createCurrency(data) {
  return request({
    url: '/int/intaccount/currency/',
    method: 'post',
    data
  })
}

// 修改
export function updateCurrency(id, data) {
  return request({
    url: `/int/intaccount/currency/${id}/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportCurrency(data) {
  return request({
    url: `/int/intaccount/currency/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportCurrency(data) {
  return request({
    url: `/int/intaccount/currency/export/`,
    method: 'patch',
    data
  })
}






