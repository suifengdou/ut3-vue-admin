import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getSpecialistList(params) {
  return request({
    url: '/crm/vipwechat/specialist/',
    method: 'get',
    params
  })
}

// 创建工单
export function createSpecialist(data) {
  return request({
    url: `/crm/vipwechat/specialist/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateSpecialist(id, data) {
  delete data.created_time
  delete data.updated_time
  return request({
    url: `/crm/vipwechat/specialist/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportSpecialist(data) {
  return request({
    url: `/crm/vipwechat/specialist/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportSpecialist(data) {
  return request({
    url: `/crm/vipwechat/specialist/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkSpecialist(data) {
  return request({
    url: `/crm/vipwechat/specialist/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectSpecialist(data) {
  return request({
    url: `/crm/vipwechat/specialist/reject/`,
    method: 'patch',
    data
  })
}
