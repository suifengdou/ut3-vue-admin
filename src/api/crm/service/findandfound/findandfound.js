import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getFindAndFoundList(params) {
  return request({
    url: '/crm/service/findandfound/',
    method: 'get',
    params
  })
}

// 创建工单
export function createFindAndFound(data) {
  return request({
    url: `/crm/service/findandfound/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateFindAndFound(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/service/findandfound/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportFindAndFound(data) {
  return request({
    url: `/crm/service/findandfound/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportFindAndFound(data) {
  return request({
    url: `/crm/service/findandfound/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixFindAndFound(data) {
  return request({
    url: `/crm/service/findandfound/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkFindAndFound(data) {
  return request({
    url: `/crm/service/findandfound/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectFindAndFound(data) {
  return request({
    url: `/crm/service/findandfound/reject/`,
    method: 'patch',
    data
  })
}

