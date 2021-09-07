import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriCallLogList(params) {
  return request({
    url: '/crm/callcenter/oricalllog/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriCallLog(data) {
  return request({
    url: `/crm/callcenter/oricalllog/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriCallLog(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/callcenter/oricalllog/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriCallLog(data) {
  return request({
    url: `/crm/callcenter/oricalllog/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriCallLog(data) {
  return request({
    url: `/crm/callcenter/oricalllog/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriCallLog(data) {
  return request({
    url: `/crm/callcenter/oricalllog/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriCallLog(data) {
  return request({
    url: `/crm/callcenter/oricalllog/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriCallLog(data) {
  return request({
    url: `/crm/callcenter/oricalllog/reject/`,
    method: 'patch',
    data
  })
}

