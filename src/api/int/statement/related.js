import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getStatementRelatedList(params) {
  return request({
    url: '/int/instatement/related/',
    method: 'get',
    params
  })
}

// 创建工单
export function createStatementRelated(data) {
  return request({
    url: `/int/instatement/related/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateStatementRelated(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/int/instatement/related/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportStatementRelated(data) {
  return request({
    url: `/int/instatement/related/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportStatementRelated(data) {
  return request({
    url: `/int/instatement/related/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkStatementRelated(data) {
  return request({
    url: `/int/instatement/related/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectStatementRelated(data) {
  return request({
    url: `/int/instatement/related/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialStatementRelated(data) {
  return request({
    url: `/int/instatement/related/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagStatementRelated(data) {
  return request({
    url: `/int/instatement/related/reset_tag/`,
    method: 'patch',
    data
  })
}

// 导入图片
export function photoImportStatementRelated(data) {
  return request({
    url: `/int/instatement/related/photo_import/`,
    method: 'patch',
    data
  })
}


