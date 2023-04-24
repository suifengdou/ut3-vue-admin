import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBatchCompensationSubmitList(params) {
  return request({
    url: '/dfc/compensation/batchcompensationsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBatchCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBatchCompensationSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/dfc/compensation/batchcompensationsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBatchCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBatchCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkBatchCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectBatchCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/batchcompensationsubmit/reject/`,
    method: 'patch',
    data
  })
}

