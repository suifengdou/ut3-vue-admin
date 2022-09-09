import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCallLogHandle(params) {
  return request({
    url: '/crm/callcenter/callloghandle/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCallLogHandle(data) {
  return request({
    url: `/crm/callcenter/callloghandle/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCallLogHandle(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/callcenter/callloghandle/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCallLogHandle(data) {
  return request({
    url: `/crm/callcenter/callloghandle/export/`,
    method: 'patch',
    data
  })
}


// 校正
export function fixCallLogHandle(data) {
  return request({
    url: `/crm/callcenter/callloghandle/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCallLogHandle(data) {
  return request({
    url: `/crm/callcenter/callloghandle/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCallLogHandle(data) {
  return request({
    url: `/crm/callcenter/callloghandle/reject/`,
    method: 'patch',
    data
  })
}

