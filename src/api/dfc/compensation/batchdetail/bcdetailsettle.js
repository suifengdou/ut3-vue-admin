import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBCDetailSettleList(params) {
  return request({
    url: '/dfc/compensation/bcdetailsettle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBCDetailSettle(data) {
  return request({
    url: `/dfc/compensation/bcdetailsettle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBCDetailSettle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/compensation/bcdetailsettle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBCDetailSettle(data) {
  return request({
    url: `/dfc/compensation/bcdetailsettle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBCDetailSettle(data) {
  return request({
    url: `/dfc/compensation/bcdetailsettle/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核
export function checkBCDetailSettle(data) {
  return request({
    url: `/dfc/compensation/bcdetailsettle/check/`,
    method: 'patch',
    data
  })
}

// 重置
export function resetBCDetailSettle(data) {
  return request({
    url: `/dfc/compensation/bcdetailsettle/reset/`,
    method: 'patch',
    data
  })
}



