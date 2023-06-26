import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getMOExportSubmitList(params) {
  return request({
    url: '/dfc/manualorder/moexport/',
    method: 'get',
    params
  })
}

// 创建工单
export function createMOExportSubmit(data) {
  return request({
    url: `/dfc/manualorder/moexport/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateMOExportSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/dfc/manualorder/moexport/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportMOExportSubmit(data) {
  return request({
    url: `/dfc/manualorder/moexport/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportMOExportSubmit(data) {
  return request({
    url: `/dfc/manualorder/moexport/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkMOExportSubmit(data) {
  return request({
    url: `/dfc/manualorder/moexport/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectMOExportSubmit(data) {
  return request({
    url: `/dfc/manualorder/moexport/reject/`,
    method: 'patch',
    data
  })
}


// 取消工单
export function batchSignMOExportSubmit(data) {
  return request({
    url: `/dfc/manualorder/moexport/batch_sign/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getMOExportManageList(params) {
  return request({
    url: '/dfc/manualorder/moexportmanage/',
    method: 'get',
    params
  })
}















