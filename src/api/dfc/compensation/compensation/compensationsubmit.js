import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCompensationSubmitList(params) {
  return request({
    url: '/dfc/compensation/compensationsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/compensationsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCompensationSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/compensation/compensationsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/compensationsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/compensationsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/compensationsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCompensationSubmit(data) {
  return request({
    url: `/dfc/compensation/compensationsubmit/reject/`,
    method: 'patch',
    data
  })
}

