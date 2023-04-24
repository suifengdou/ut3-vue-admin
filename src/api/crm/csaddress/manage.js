import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCSAdress(params) {
  return request({
    url: '/crm/csaddress/manage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCSAdress(data) {
  return request({
    url: `/crm/csaddress/manage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCSAdress(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/csaddress/manage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCSAdress(data) {
  return request({
    url: `/crm/csaddress/manage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCSAdress(data) {
  return request({
    url: `/crm/csaddress/manage/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCSAdress(data) {
  return request({
    url: `/crm/csaddress/manage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCSAdress(data) {
  return request({
    url: `/crm/csaddress/manage/reject/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogCSAdress(data) {
  return request({
    url: `/crm/csaddress/manage/get_log_details/`,
    method: 'patch',
    data
  })
}

