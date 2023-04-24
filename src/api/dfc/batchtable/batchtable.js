import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBatchTableSubmitList(params) {
  return request({
    url: '/dfc/batchdata/batchtablesubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBatchTableSubmit(data) {
  return request({
    url: `/dfc/batchdata/batchtablesubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBatchTableSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/dfc/batchdata/batchtablesubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBatchTableSubmit(data) {
  return request({
    url: `/dfc/batchdata/batchtablesubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBatchTableSubmit(data) {
  return request({
    url: `/dfc/batchdata/batchtablesubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkBatchTableSubmit(data) {
  return request({
    url: `/dfc/batchdata/batchtablesubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectBatchTableSubmit(data) {
  return request({
    url: `/dfc/batchdata/batchtablesubmit/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getBatchTableManageList(params) {
  return request({
    url: '/dfc/batchdata/batchtablemanage/',
    method: 'get',
    params
  })
}

// 导入工单
export function excelImportBatchTableManage(data) {
  return request({
    url: `/dfc/batchdata/batchtablemanage/excel_import/`,
    method: 'patch',
    data
  })
}
