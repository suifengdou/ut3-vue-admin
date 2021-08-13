import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getManualOrderSubmitList(params) {
  return request({
    url: '/dfc/manualorder/mosubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateManualOrderSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/manualorder/mosubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getManualOrderManageList(params) {
  return request({
    url: '/dfc/manualorder/momanage/',
    method: 'get',
    params
  })
}
