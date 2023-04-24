import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBCDetailSubmitList(params) {
  return request({
    url: '/dfc/compensation/bcdetailsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBCDetailSubmit(data) {
  return request({
    url: `/dfc/compensation/bcdetailsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBCDetailSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/dfc/compensation/bcdetailsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBCDetailSubmit(data) {
  return request({
    url: `/dfc/compensation/bcdetailsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBCDetailSubmit(data) {
  return request({
    url: `/dfc/compensation/bcdetailsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkBCDetailSubmit(data) {
  return request({
    url: `/dfc/compensation/bcdetailsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectBCDetailSubmit(data) {
  return request({
    url: `/dfc/compensation/bcdetailsubmit/reject/`,
    method: 'patch',
    data
  })
}

