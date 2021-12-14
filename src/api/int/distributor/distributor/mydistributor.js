import request from '@/utils/request'

export function getMyDistributorList(params) {
  return request({
    url: '/int/intdistributor/myselfdistributor/',
    method: 'get',
    params
  })
}

// 创建
export function createMyDistributor(data) {
  return request({
    url: '/int/intdistributor/myselfdistributor/',
    method: 'post',
    data
  })
}

// 修改
export function updateMyDistributor(id, data) {
  return request({
    url: `/int/intdistributor/myselfdistributor/${id}/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportMyDistributor(data) {
  return request({
    url: `/int/intdistributor/myselfdistributor/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportMyDistributor(data) {
  return request({
    url: `/int/intdistributor/myselfdistributor/export/`,
    method: 'patch',
    data
  })
}






