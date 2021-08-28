import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCallLogList(params) {
  return request({
    url: '/crm/callcenter/calllog/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCallLog(data) {
  return request({
    url: `/crm/callcenter/calllog/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCallLog(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/callcenter/calllog/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCallLog(data) {
  return request({
    url: `/crm/callcenter/calllog/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCallLog(data) {
  return request({
    url: `/crm/callcenter/calllog/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixCallLog(data) {
  return request({
    url: `/crm/callcenter/calllog/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCallLog(data) {
  return request({
    url: `/crm/callcenter/calllog/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCallLog(data) {
  return request({
    url: `/crm/callcenter/calllog/reject/`,
    method: 'patch',
    data
  })
}

