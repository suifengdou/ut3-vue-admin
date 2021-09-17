import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getBCDetailList(params) {
  return request({
    url: '/dfc/compensation/bcdetail/',
    method: 'get',
    params
  })
}

// 创建工单
export function createBCDetail(data) {
  return request({
    url: `/dfc/compensation/bcdetail/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateBCDetail(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/dfc/compensation/bcdetail/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportBCDetail(data) {
  return request({
    url: `/dfc/compensation/bcdetail/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportBCDetail(data) {
  return request({
    url: `/dfc/compensation/bcdetail/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkBCDetail(data) {
  return request({
    url: `/dfc/compensation/bcdetail/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectBCDetail(data) {
  return request({
    url: `/dfc/compensation/bcdetail/reject/`,
    method: 'patch',
    data
  })
}

