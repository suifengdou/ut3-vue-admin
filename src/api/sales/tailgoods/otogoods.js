import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getOTOgoodsList(params) {
  return request({
    url: '/sales/tailgoods/otogoods/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOTOgoods(data) {
  return request({
    url: `/sales/tailgoods/otogoods/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOTOgoods(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/tailgoods/otogoods/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOTOgoods(data) {
  return request({
    url: `/sales/tailgoods/otogoods/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOTOgoods(data) {
  return request({
    url: `/sales/tailgoods/otogoods/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkOTOgoods(data) {
  return request({
    url: `/sales/tailgoods/otogoods/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOTOgoods(data) {
  return request({
    url: `/sales/tailgoods/otogoods/reject/`,
    method: 'patch',
    data
  })
}
