import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getCSGoods(params) {
  return request({
    url: '/crm/csgoods/manage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createCSGoods(data) {
  return request({
    url: `/crm/csgoods/manage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateCSGoods(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/csgoods/manage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportCSGoods(data) {
  return request({
    url: `/crm/csgoods/manage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportCSGoods(data) {
  return request({
    url: `/crm/csgoods/manage/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkCSGoods(data) {
  return request({
    url: `/crm/csgoods/manage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectCSGoods(data) {
  return request({
    url: `/crm/csgoods/manage/reject/`,
    method: 'patch',
    data
  })
}

// 查询日志
export function getLogCSGoods(data) {
  return request({
    url: `/crm/csgoods/manage/get_log_details/`,
    method: 'patch',
    data
  })
}
