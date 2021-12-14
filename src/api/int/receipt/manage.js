import request from '@/utils/request'

// 原始发票申请单（外埠）操作API
// 获取列表
export function getReceiptManageList(params) {
  return request({
    url: '/int/intreceipt/manage/',
    method: 'get',
    params
  })
}

// 创建工单
export function createReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/`,
    method: 'post',
    data
  })
}

// 更新工单
export function updateReceiptManage(id, data) {
  delete data.create_time
  delete data.update_time
  return request({
    url: `/int/intreceipt/manage/${id}/`,
    method: 'patch',
    data
  })
}

// 导出工单
export function exportReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/export/`,
    method: 'patch',
    data
  })
}

// 导入工单
export function excelImportReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/excel_import/`,
    method: 'patch',
    data
  })
}

// 审核工单
export function checkReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/check/`,
    method: 'patch',
    data
  })
}

// 取消工单
export function rejectReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/reject/`,
    method: 'patch',
    data
  })
}

// 设置特殊
export function setSpecialReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/set_special/`,
    method: 'patch',
    data
  })
}

// 重置标记
export function resetTagReceiptManage(data) {
  return request({
    url: `/int/intreceipt/manage/reset_tag/`,
    method: 'patch',
    data
  })
}


