import request from '@/utils/request'

export function getIntDistributorList(params) {
  return request({
    url: '/int/intdistributor/distributor/',
    method: 'get',
    params
  })
}

// 创建
export function createIntDistributor(data) {
  return request({
    url: '/int/intdistributor/distributor/',
    method: 'post',
    data
  })
}

// 修改
export function updateIntDistributor(id, data) {
  return request({
    url: `/int/intdistributor/distributor/${id}/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportIntDistributor(data) {
  return request({
    url: `/int/intdistributor/distributor/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportIntDistributor(data) {
  return request({
    url: `/int/intdistributor/distributor/export/`,
    method: 'patch',
    data
  })
}






