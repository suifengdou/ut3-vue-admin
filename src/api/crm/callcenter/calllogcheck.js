import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCallLogCheck(params) {
  return request({
    url: '/crm/callcenter/calllogcheck/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/calllogcheck/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCallLogCheck(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/callcenter/calllogcheck/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/calllogcheck/export/`,
    method: 'patch',
    data
  })
}


// 校正
export function fixCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/calllogcheck/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/calllogcheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCallLogCheck(data) {
  return request({
    url: `/crm/callcenter/calllogcheck/reject/`,
    method: 'patch',
    data
  })
}

