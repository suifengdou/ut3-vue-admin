import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getExpendlistList(params) {
  return request({
    url: '/sales/advance/expendlist/',
    method: 'get',
    params
  })
}

// 创建工单
export function createExpendlist(data) {
  return request({
    url: `/sales/advance/expendlist/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateExpendlist(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/advance/expendlist/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportExpendlist(data) {
  return request({
    url: `/sales/advance/expendlist/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportExpendlist(data) {
  return request({
    url: `/sales/advance/expendlist/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkExpendlist(data) {
  return request({
    url: `/sales/advance/expendlist/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectExpendlist(data) {
  return request({
    url: `/sales/advance/expendlist/reject/`,
    method: 'patch',
    data
  })
}
