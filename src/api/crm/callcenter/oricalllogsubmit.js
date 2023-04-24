import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getOriCallLogSubmitList(params) {
  return request({
    url: '/crm/callcenter/oricalllogsubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createOriCallLogSubmit(data) {
  return request({
    url: `/crm/callcenter/oricalllogsubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateOriCallLogSubmit(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/callcenter/oricalllogsubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportOriCallLogSubmit(data) {
  return request({
    url: `/crm/callcenter/oricalllogsubmit/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportOriCallLogSubmit(data) {
  return request({
    url: `/crm/callcenter/oricalllogsubmit/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixOriCallLogSubmit(data) {
  return request({
    url: `/crm/callcenter/oricalllogsubmit/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkOriCallLogSubmit(data) {
  return request({
    url: `/crm/callcenter/oricalllogsubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectOriCallLogSubmit(data) {
  return request({
    url: `/crm/callcenter/oricalllogsubmit/reject/`,
    method: 'patch',
    data
  })
}

