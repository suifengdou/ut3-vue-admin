import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getDialogTBDetailMyselfList(params) {
  return request({
    url: '/crm/dialog/dialogtbdetailmyself/',
    method: 'get',
    params
  })
}

// 创建工单
export function createDialogTBDetailMyself(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailmyself/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateDialogTBDetailMyself(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/dialog/dialogtbdetailmyself/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportDialogTBDetailMyself(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailmyself/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportDialogTBDetailMyself(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailmyself/excel_import/`,
    method: 'patch',
    data
  })
}

// 校正
export function fixDialogTBDetailMyself(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailmyself/fix/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkDialogTBDetailMyself(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailmyself/check/`,
    method: 'patch',
    data
  })
}


// 强制审核
export function mandatoryCheckDialogTBDetailMyself(data) {
  return request({
    url: `/crm/dialog/dialogtbdetail/mandatory_check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectDialogTBDetailMyself(data) {
  return request({
    url: `/crm/dialog/dialogtbdetailmyself/reject/`,
    method: 'patch',
    data
  })
}

