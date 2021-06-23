import request from '@/utils/request'

// 预存充值（外埠）操作API
// 获取列表
export function getPrestoreSubmitList(params) {
  return request({
    url: '/sales/advance/prestoresubmit/',
    method: 'get',
    params
  })
}

// 创建工单
export function createPrestoreSubmit(data) {
  return request({
    url: `/sales/advance/prestoresubmit/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updatePrestoreSubmit(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/advance/prestoresubmit/${id}/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkPrestoreSubmit(data) {
  return request({
    url: `/sales/advance/prestoresubmit/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectPrestoreSubmit(data) {
  return request({
    url: `/sales/advance/prestoresubmit/reject/`,
    method: 'patch',
    data
  })
}

// 预存充值（财务）操作API
// 获取列表
export function getPrestoreCheckList(params) {
  return request({
    url: '/sales/advance/prestorecheck/',
    method: 'get',
    params
  })
}

// 更新工单
export function updatePrestoreCheck(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/sales/advance/prestorecheck/${id}/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkPrestoreCheck(data) {
  return request({
    url: `/sales/advance/prestorecheck/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectPrestoreCheck(data) {
  return request({
    url: `/sales/advance/prestorecheck/reject/`,
    method: 'patch',
    data
  })
}

// 预存充值管理界面（针对不同身份显示不同的内容）操作API
// 获取列表
export function getPrestoreManageList(params) {
  return request({
    url: '/sales/advance/prestoremanage/',
    method: 'get',
    params
  })
}

// 导出工单
export function exportPrestoreManage(data) {
  return request({
    url: `/sales/advance/prestoremanage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportPrestore(data) {
  return request({
    url: `/sales/advance/prestore/excel_import/`,
    method: 'post',
    data
  })
}

// 审核工单
export function checkPrestore(data) {
  return request({
    url: `/sales/advance/prestore/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectPrestore(data) {
  return request({
    url: `/sales/advance/prestore/reject/`,
    method: 'patch',
    data
  })
}
