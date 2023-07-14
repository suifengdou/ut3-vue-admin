import request from '@/utils/request'

export function getBom(params) {
  return request({
    url: '/base/bom/',
    method: 'get',
    params
  })
}

// 创建用户组
export function createBom(data) {
  return request({
    url: '/base/bom/',
    method: 'post',
    data
  })
}

// 修改用户组
export function updateBom(id, data) {
  return request({
    url: `/base/bom/${id}/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBom(data) {
  return request({
    url: `/base/bom/excel_import/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBom(data) {
  return request({
    url: `/base/bom/export/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogBom(data) {
  return request({
    url: `/base/bom/get_log_details/`,
    method: 'patch',
    data
  })
}
