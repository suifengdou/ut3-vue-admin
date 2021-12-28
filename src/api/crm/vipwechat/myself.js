import request from '@/utils/request'

// 原始ERP订单申请单操作API
// 获取列表
export function getVIPWechatMyselfList(params) {
  return request({
    url: '/crm/vipwechat/vipwmyself/',
    method: 'get',
    params
  })
}

// 创建工单
export function createVIPWechatMyself(data) {
  return request({
    url: `/crm/vipwechat/vipwmyself/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateVIPWechatMyself(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/crm/vipwechat/vipwmyself/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportVIPWechatMyself(data) {
  return request({
    url: `/crm/vipwechat/vipwmyself/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportVIPWechatMyself(data) {
  return request({
    url: `/crm/vipwechat/vipwmyself/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkVIPWechatMyself(data) {
  return request({
    url: `/crm/vipwechat/vipwmyself/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectVIPWechatMyself(data) {
  return request({
    url: `/crm/vipwechat/vipwmyself/reject/`,
    method: 'patch',
    data
  })
}
