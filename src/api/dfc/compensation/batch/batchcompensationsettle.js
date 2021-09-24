import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBatchCompensationSettleList(params) {
  return request({
    url: '/dfc/compensation/batchcompensationsettle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBatchCompensationSettle(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsettle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBatchCompensationSettle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/compensation/batchcompensationsettle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBatchCompensationSettle(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsettle/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBatchCompensationSettle(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsettle/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkBatchCompensationSettle(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsettle/check/`,
    method: 'patch',
    data
  })
}

