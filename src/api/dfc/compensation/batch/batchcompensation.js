import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBatchCompensationList(params) {
  return request({
    url: '/dfc/compensation/batchcompensation/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBatchCompensation(data) {
  return request({
    url: `/dfc/compensation/batchcompensation/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBatchCompensation(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/compensation/batchcompensation/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBatchCompensation(data) {
  return request({
    url: `/dfc/compensation/batchcompensation/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBatchCompensation(data) {
  return request({
    url: `/dfc/compensation/batchcompensation/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkBatchCompensation(data) {
  return request({
    url: `/dfc/compensation/batchcompensation/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectBatchCompensation(data) {
  return request({
    url: `/dfc/compensation/batchcompensation/reject/`,
    method: 'patch',
    data
  })
}

