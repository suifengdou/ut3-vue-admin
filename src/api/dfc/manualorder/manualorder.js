import request from '@/utils/request'

// 获取列表
export function getManualOrderSubmitList(params) {
  return request({
    url: '/dfc/manualorder/mosubmit/',
    method: 'get',
    params
  })
}

// 创建
export function createManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/`,
    method: 'post',
    data
  })
}

// 更新
export function updateManualOrderSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/manualorder/mosubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出
export function exportManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入
export function excelImportManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核
export function checkManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消
export function rejectManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagManualOrderSubmit(data) {
  return request({
    url: `/dfc/manualorder/mosubmit/reset_tag/`,
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


export function exportManualOrderManage(data) {
  return request({
    url: '/dfc/manualorder/momanage/export/',
    method: 'patch',
    data
  })
}
