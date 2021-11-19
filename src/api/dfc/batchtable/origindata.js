import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriginDataSubmitList(params) {
  return request({
    url: '/dfc/batchdata/origindatasubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriginDataSubmit(data) {
  return request({
    url: `/dfc/batchdata/origindatasubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriginDataSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/batchdata/origindatasubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriginDataSubmit(data) {
  return request({
    url: `/dfc/batchdata/origindatasubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriginDataSubmit(data) {
  return request({
    url: `/dfc/batchdata/origindatasubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriginDataSubmit(data) {
  return request({
    url: `/dfc/batchdata/origindatasubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriginDataSubmit(data) {
  return request({
    url: `/dfc/batchdata/origindatasubmit/reject/`,
    method: 'patch',
    data
  })
}

// 原始ERP订单管理操作API
// 获取列表
export function getOriginDataManageList(params) {
  return request({
    url: '/dfc/batchdata/origindatamanage/',
    method: 'get',
    params
  })
}

export function exportOriginDataManage(params) {
  return request({
    url: '/dfc/batchdata/origindatamanage/export/',
    method: 'get',
    params
  })
}
