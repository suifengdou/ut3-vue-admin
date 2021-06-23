import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getAccountList(params) {
  return request({
    url: '/sales/advance/account/',
    method: 'get',
    params
  })
}

// 创建工单
export function createAccount(data) {
  return request({
    url: `/sales/advance/account/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateAccount(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/advance/account/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportAccount(data) {
  return request({
    url: `/sales/advance/account/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportAccount(data) {
  return request({
    url: `/sales/advance/account/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkAccount(data) {
  return request({
    url: `/sales/advance/account/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectAccount(data) {
  return request({
    url: `/sales/advance/account/reject/`,
    method: 'patch',
    data
  })
}

// 账户查询（可外埠）操作API
// 获取列表
export function getMyAccountList(params) {
  return request({
    url: '/sales/advance/myaccount/',
    method: 'get',
    params
  })
}
